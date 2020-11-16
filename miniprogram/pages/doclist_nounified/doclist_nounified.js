// pages/doclist_nounified/doclist_nounified.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var paper_type=options.id
    db.collection('FeiTongKao').where({
     paper_type: paper_type // 填入当前用户 openid
    }).get({
      success:res=>{
        
        this.setData({
          dataObj:res.data
        })
      }
    })
    

  },


  download(event){
    console.log("点击获取的数据",event.currentTarget.dataset.item.paper_url)
    wx.navigateTo({
      url: '../../pages/download/download?id='+event.currentTarget.dataset.item.paper_url,
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