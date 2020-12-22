// miniprogram/pages/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
        id: 0,
        latitude: 26.05902704,
        longitude: 119.19766049,
        alpha:0,
        callout:{
          // content: "0图书馆",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          borderRadius: 10,
          anchorY:20,
          borderColor:'#000000',
          borderWidth: 0,
        }
      },
      {
        id: 1,
        latitude: 26.05852004,
        longitude: 119.19560049,
        // alpha:0,
        callout:{
          // content: "1西三",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          // borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },{
        id: 2,
        latitude: 26.05892704,
        longitude: 119.19546049,
        // alpha:0,
        callout:{
          // content: "2西二",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          // borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },
      {
        id: 3,
        latitude: 26.059402704,
        longitude: 119.19546049,
        // alpha:0,
        callout:{
          // content: "3西一",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          // borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },
      // {
      //   id: 4,
      //   latitude: 26.06002704,
      //   longitude: 119.19546049,
      //   // alpha:0,
      //   callout:{
      //     // content: "4中楼",
      //     padding:10,
      //     display:'ALWAYS',
      //     textAlign:'center',
      //     // borderRadius: 10,
      //     // borderColor:'#ff0000',
      //     // borderWidth: 2,
      //   }
      // },
      {
        id: 5,
        latitude: 26.06045704,
        longitude: 119.19636049,
        // alpha:0,
        callout:{
          // content: "5东一",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          // borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },
      {
        id: 6,
        latitude: 26.06066704,
        longitude: 119.196706049,
        // alpha:0,
        callout:{
          // content: "6东二",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          // borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },
      {
        id: 7,
        latitude: 26.06086704,
        longitude: 119.197406049,
        // alpha:0,
        callout:{
          // content: "7东三",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          // borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },
    ]
  },
  
  toaddress:function(e){
    console.log(e)
    var id =e.markerId
    console.log(id)
    // wx.openLocation({
    //   latitude: this.data.markers[id].latitude,
    //   longitude: this.data.markers[id].longitude,
    // })
    wx.navigateTo({
      url: '/pages/up_doc/up_doc'
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

  }
})
