// pages/souResult/souResult.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:"",
    
  },
  
  
  getData(){
    db.collection("Tilist").get({
      success:res=>{
        // console.log("题目集")
        // console.log(res.data)
        this.setData({
          dataObj:res.data
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()

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
  detailclick(event){
    console.log("点击获取的数据",event.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: '../../pages/Tidetails/Tidetails?id='+event.currentTarget.dataset.item._id,
    })  
    
 
    
  }
})