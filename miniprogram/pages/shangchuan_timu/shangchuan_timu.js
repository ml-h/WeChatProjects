// pages/shangchuan_timu/shangchuan_timu.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false,
    author:'',
    timu:''
  },
  get_data: function(e){
    db.collection("up_timu").where({
      _openid:e
    }).get().then(res=>{
      // console.log("题目列表",res.data)
        this.setData({
          timu:res.data,
          loadingHidden:true
        })
        
    })
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
      that.get_data(res.result.openid)
    })
    .catch(res=>{
      console.log("获取openID 失败",res)
    })
   
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: '上传题目'
    })
    var that = this

    that.getOpenid()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.get_data()
  },

   up_timu: function (options) {
  wx.navigateTo({
        url: '../up_timu/up_timu'
})  
},
up_xuanze: function (options) {
  wx.navigateTo({
        url: '../up_xuanze/up_xuanze'
})  
},

fankui(e) {
  wx.navigateTo({
        url: '../fankui_timu/fankui_timu?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type,
  })
 },
 timu_dongtai:function(e){
   wx.navigateTo({
     url: '../timu_dongtai/timu_dongtai?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type+"&op=1",
   })
  }
})