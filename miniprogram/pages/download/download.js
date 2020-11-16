// pages/download/download.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    

  },

  download:function(event){
    console.log("下载")
    console.log(event.currentTarget.dataset.url)
  
    wx.showLoading({
      title:'数据加载中',
    })
    
    wx.downloadFile({
      url:event.currentTarget.dataset.url,
      success:function(res){
        if(200 === res.statusCode){
          wx.openDocument({
            filePath:res.tempFilePath
          })
        }else{
          wx.showToast({
            title:'下载失败',
          })
        }       
      },
      fail:function(res){
        wx.showToast({
          title: '下载失败',
        })
      },
      complete:function(res){
        wx.hideLoading()
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pdfUrl=options.id
    console.log("*****详情页接收的id",options.id)
    this.setData({
      pdfUrl:options.id
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