// pages/star_timu/star_timu.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false,
    dataObj:"",
    ids:[],//用于标识每道题
    openid:"",
    // isCollected:false,
    isC:[]//标识状态
  },

  handleCollection:function(event){
    console.log("点击事件id",event.target.dataset.item)
   for(let i in this.data.ids){
     if(this.data.ids[i]==event.target.dataset.item){
       var isCollected = this.data.isC[i]
       var id = i//下标
       break
     }
   }
   if(isCollected){//取消
     wx.cloud.callFunction({
       name:"tiCollected",
       data:{
         action:"cancel",
         id:this.data.openid,
         ti_Data:this.data.dataObj[id]
       }
     }).then(res=>{
      //  this.getStarurl(this.data.openid)
       wx.showToast({
         icon:"success",
         title: '取消收藏成功',
       })
     })
     var iscc = this.data.isC//刷新idC
     iscc[id] = !isCollected
     this.setData({
       isC:iscc
     })
     wx.getStorage({//刷新缓存
       key:'isCollected',
       success:(res)=>{
         let obj = res.data;
         //如果有,则刷新,没有则追加
         obj[this.data.ids[id]] = !isCollected;
         wx.setStorage({
           key: 'isCollected',
           data: obj,
           success: () => {
           }
         });
       }
     })
   }else{
     wx.cloud.callFunction({
       name:"tiCollected",
       data:{
         action:"star",
         id:this.data.openid,
         ti_Data:this.data.dataObj[id]
       }
     }).then(res=>{
       // res.result.data 是用户数据
       // console.log("向云数据库里del数据success",res)
       // 获取收藏成功后的paperurl列表,更新collectPaperurl
      //  this.getStarurl(this.data.openid)
       wx.showToast({
         icon:"success",
         title: '收藏成功',
       })
       var iscc = this.data.isC//刷新idC
       iscc[id] = !isCollected
       this.setData({
         isC:iscc
       })
       wx.getStorage({
         key:'isCollected',
         success:(res)=>{
           let obj = res.data;
           //如果有,则刷新,没有则追加
           obj[this.data.ids[id]] = !isCollected;
           wx.setStorage({
             key: 'isCollected',
             data: obj,
             success: () => {
             }
           });
         }
       })
     })
   }   
      
       // let isCollected = !this.data.isCollected
       // this.setData({
       //   isCollected:isCollected
       // })  
       //点击收藏图标后缓存数据到本地
       //把data中的index放到新let出来的index中,因为下面要把index也存进去,要用index来判断你收藏了哪个页面
       // let { index } = this.data;
       //首先去看一下缓存的数据
 },

  getData(openid){
    db.collection("tiCollected").where({
      user_id:openid
    }).get().then(res=>{
      console.log("获取成功",res)
      this.setData({
        loadingHidden:true,
        dataObj:res.data[0].tiData
      })
      let idss = [];
      let isc = [];
      for(let each of res.data[0].tiData){
        idss.push(each._id);
        isc.push(true)
      }
      this.setData({
        ids:idss,
        isC:isc
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.callFunction({
      name:"login",
      data:{}
    }).then(res=>{
        // res.result.data 是用户数据
        console.log("获取openID成功 ",res.result.openid)
        // 获取用户收藏的试题
        // this.getCollectPaperurl(res.result.openid)
        that.getData(res.result.openid)
        that.setData({
          openid:res.result.openid
        })
    }).catch(res=>{
      console.log("获取openID 失败",res)
    })
  },


  detailclick(event){
    // console.log("搜索结果界面",this.data)
    // console.log("点击获取的数据",event.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: '../../pages/Tidetails/Tidetails?id='+event.currentTarget.dataset.item._id,
    })  
  }
})

