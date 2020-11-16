const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  changepage:function(event){
    if(!app.is_login()){
      wx.navigateTo({
        url: '../login/login'
      })
  }else{
    console.log("跳转页面",event.target.dataset.course)
    // 跳转到页面 zhenti,并携带参数
    wx.navigateTo({
      url:'../zhenti/zhenti?course='+ event.target.dataset.course,
    })
  }
  },
  
  changepage3:function(){
    if(!app.is_login()){
      wx.navigateTo({
        url: '../login/login'
      })
  }else{
    wx.navigateTo({
      url:'../tongkaoshiti/tongkaoshiti',
    })
  }
  },
  changepage4:function(){
    if(!app.is_login()){
      wx.navigateTo({
        url: '../login/login'
      })
  }else{
    wx.navigateTo({
      url:'../feitongkao/feitongkao',
    })}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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