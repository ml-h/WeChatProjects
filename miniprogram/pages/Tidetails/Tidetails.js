// 题目详情界面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("详情页接收的id",options.id)
    wx.cloud.database().collection("Tilist")
    .doc(options.id)
    .get()
    .then(res=>{
      console.log("详情页成功",res)
      this.setData({
        detail:res.data
      })
    })
    .catch(err=>{
      console.log("详情页失败",err)
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