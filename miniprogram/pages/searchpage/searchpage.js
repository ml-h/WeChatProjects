// 搜索界面
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:""
  },
  input: function(e) {//接受输入值
    this.setData({
      key: e.detail.value
    })
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

  },
  searchclick :function(e){
    if(this.data.key.length>0){
      wx.navigateTo({
        url: '../../pages/souResult/souResult?key='  + this.data.key,
      })  
    }else{
      console.log("不支持无关键词搜索")
      wx.showToast({
        title: "请输入关键词",
        duration:2000,
        icon:'none'
      })
    }
  }
})