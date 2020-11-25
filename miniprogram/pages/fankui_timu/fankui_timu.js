// pages/fankui_timu/fankui_timu.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timu:""
  },
  get_data:function(e){
    db.collection("up_timu").where({
      _id:e
    }).get().then(res=>{
      console.log(res.data)
      this.setData({
        timu:res.data
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
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

  }
})