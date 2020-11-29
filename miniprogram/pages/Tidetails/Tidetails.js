// 题目详情界面
const db=wx.cloud.database();
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:"",
    id:'',//用于标识每道题的状态
    openid:"",
    isCollected:false
  },

  getOpenid(){
  // 获取当前用户的openID
  wx.cloud.callFunction({
    name:"login",
    data:{}
  }).then(res=>{

    // res.result.data 是用户数据
    console.log("获取openID成功 ",res.result.openid)
    // 获取用户收藏的试题
    // this.getCollectPaperurl(res.result.openid)
    this.setData({
      openid:res.result.openid
    })
  })
  .catch(res=>{
    console.log("获取openID 失败",res)
  })
 
  },
  
  getStarurl(openid){
  wx.cloud.callFunction({
    name:"tiCollected",
    data:{
      action:"get",
      id:openid
    }
  }).then(res=>{
    console.log("获取收藏返回：",res)
    if(res.result.data.length==0){// res.result.data 是用户数据
      console.log("该用户还没收藏")
      wx.cloud.callFunction({
        name:"tiCollected",
        data:{
          action:"addUser",
          id:openid
        }
      })
      wx.cloud.callFunction({
        name:"tiCollected",
        data:{
          action:"star",
          id:this.data.openid,
          ti_Data:this.data.detail
        }
      })
      console.log("收藏成功")
    }else{
      // this.setData({
      //   collectPaperurl:res.result.data[0].star_docUrl
      // })
    }
  })
  },

  handleCollection(){
    if(this.data.isCollected){//取消
      wx.cloud.callFunction({
        name:"tiCollected",
        data:{
          action:"cancel",
          id:this.data.openid,
          ti_Data:this.data.detail
        }
      }).then(res=>{
        this.getStarurl(this.data.openid)
        wx.showToast({
          icon:"success",
          title: '取消收藏成功',
        })
      })
    }else{
      wx.cloud.callFunction({
        name:"tiCollected",
        data:{
          action:"star",
          id:this.data.openid,
          ti_Data:this.data.detail
        }
      }).then(res=>{
        // res.result.data 是用户数据
        // console.log("向云数据库里del数据success",res)
        // 获取收藏成功后的paperurl列表,更新collectPaperurl
        this.getStarurl(this.data.openid)
        wx.showToast({
          icon:"success",
          title: '收藏成功',
        })
      })
    }
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected:isCollected
    })  
    //点击收藏图标后缓存数据到本地
    //把data中的index放到新let出来的index中,因为下面要把index也存进去,要用index来判断你收藏了哪个页面
    // let { index } = this.data;
    //首先去看一下缓存的数据
    wx.getStorage({
      key:'isCollected',
      success:(res)=>{
        let obj = res.data;
        //如果有,则刷新,没有则追加
        obj[this.data.id] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid()
    // console.log("详情页接收的id",options.id)
    wx.cloud.database().collection("Tilist")
    .doc(options.id)
    .get()
    .then(res=>{
      console.log("详情页成功",res)
      this.setData({
        detail:res.data,
        id:options.id,
        type:res.data.type
      })
    })
    .catch(res=>{
      console.log("详情页失败",res)
    })
      //根据本地缓存的数据判读用户是否收藏当前文章
      let detailStorage  = wx.getStorageSync('isCollected')
      // let { index } = this.data;
      //如果没有收藏
      if (!detailStorage){
        //初始化一个空的对象
        wx.setStorageSync('isCollected', {});
      }
      //如果收藏了
      if (detailStorage[options.id]){
        this.setData({
          isCollected: true
        })
      }
  
    // wx.cloud.callFunction({
    //   name:"tiCollected",
    //   data:{
    //     action:"get",
    //     id:openid
    //   }
    // }).then(res=>{
    //   if(res.result.data.length!=0){
    //     this.setData({
    //       isCollected:true
    //     })
    //   }
      
    // })

  },


})