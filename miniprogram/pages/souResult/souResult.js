// 搜索结果界面
const db=wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false,
    key:"",
    dataObj:"",
    ids:[],//用于标识每道题
    openid:"",
    // isCollected:false,
    isC:[]//标识状态
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
        }else{
          // this.setData({
          //   collectPaperurl:res.result.data[0].star_docUrl
          // })
        }
      })
      },

   handleCollection:function(event){
     console.log("点击事件id",event.target.dataset.item)
    for(let i in this.data.ids){
      if(this.data.ids[i]==event.target.dataset.item){
        var isCollected = this.data.isC[i]
        var id = i
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
        this.getStarurl(this.data.openid)
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
        this.getStarurl(this.data.openid)
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
  
  getData(){
    db.collection("Tilist").where(
    _.or([
      {
        content:db.RegExp({//content内容查询
            regexp:'.*'+this.data.key,
            option:'i'
        })
      },
      {
        anchor:db.RegExp({//anchor发布者查询
            regexp:'.*'+this.data.key,
            option:'i'
        })
      },
      {
        _id:db.RegExp({//_id查询
            regexp:'.*'+this.data.key,
            option:'i'
        })
      }
    ])
    ).get().then(res=>{
      this.setData({
        loadingHidden:true,
        dataObj:res.data
      })
      var that = this
      for(var i of res.data){//初始化
        // console.log(i)
        var value = i._id
        var arr = that.data.ids
        arr.push(value)
        that.setData({
          ids:arr
        })
        var isc = that.data.isC
        let detailStorage  = wx.getStorageSync('isCollected')
        if (detailStorage[value]){
          isc.push(true)
        }else{
          isc.push(false)
        }
        that.setData({
          isC:isc
        })
      }
    }).catch(err =>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getData()
    this.setData({
      key:options.key
    }),
    this.getData()
    this.getOpenid()
    let detailStorage  = wx.getStorageSync('isCollected')
    // let { index } = this.data;
    //如果没有收藏
    if (!detailStorage){
      //初始化一个空的对象
      wx.setStorageSync('isCollected', {});
    }
    console.log("搜索结果界面",this.data)
    //如果收藏了
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let isC_arr = []
    let detailStorage  = wx.getStorageSync('isCollected') 
    for(let each of this.data.ids){
      if (detailStorage[each]){
        isC_arr.push(true)
      }else{
        isC_arr.push(false)
      }
    }
    this.setData({
      isC:isC_arr
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  detailclick(event){
    console.log("搜索结果界面",this.data)
    console.log("点击获取的数据",event.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: '../../pages/Tidetails/Tidetails?id='+event.currentTarget.dataset.item._id,
    })  
    
 
    
  }
})