const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      my_upDoc:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
      db.collection('topic').where({
        open_id:app.globalData._id,
        type:2
      }).get().then(res=>{
        this.setData({
          my_upDoc:res.data
        })
      })
      console.log(this.data.my_upDoc)
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
  //   if(!app.is_login()){
  //     wx.navigateTo({
  //       url: '../login/login'
  //     })
  // }
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
  up_doc: function (options) {
    wx.navigateTo({
          url: '../up_doc/up_doc'
 })  
 },

fankui:function (e) {
  wx.navigateTo({
        url: '../fankui/fankui?title='+e.currentTarget.dataset.title+'&score='+e.currentTarget.dataset.score+'&status='+e.currentTarget.dataset.status
  })
 }

})