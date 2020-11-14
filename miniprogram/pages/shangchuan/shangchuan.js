const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '上传文档'
    })
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
    if(!app.is_login()){
      wx.navigateTo({
        url: '../login/login'
      })
  }
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

    wx.setNavigationBarTitle({
      title: '我的上传'
    })

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
  up_doc: function (options) {
    wx.navigateTo({
          url: '../up_doc/up_doc'
 })  
 },
 up_timu: function (options) {
  wx.navigateTo({
        url: '../up_timu/up_timu'
})  
},
fankui:function (options) {
  wx.navigateTo({
        url: '../fankui/fankui' 
  })
 }

})