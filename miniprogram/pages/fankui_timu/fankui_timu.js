// pages/fankui_timu/fankui_timu.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false,
    timu:""
  },
  get_data:function(e){
    db.collection("up_timu").where({
      _id:e
    }).get().then(res=>{
      console.log(res.data)
      this.setData({
        timu:res.data,
        loadingHidden:true
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '用户反馈'
    })
    console.log("反馈页接收的id",options.id)
    this.get_data(options.id)
  },

})