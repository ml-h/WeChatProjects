// miniprogram/pages/map.js
const db=wx.cloud.database()
var sum=[]
var numbercolor = {
 9:'#CE0000',
 8:'#EA0000',
 7:'#FF0000',
 6:'#FF2D2D',
 5:'#FF5151',
 4:'ff7575',
 3:'#FF9797',
 2:'#FFB5B5',
 1:'#FFD2D2',
 0:'#FFFFFF',
}
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
          // content: "图书馆",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          borderRadius: 10,
          anchorY:20,
          bgColor:'#CE0000',
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },
      {
        id: 1,
        latitude: 26.05852004,
        longitude: 119.19560049,
        // alpha:0,
        callout:{
          // content: "西三",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          borderRadius: 10,
          anchorY:30,
          bgColor:'#CE0000',
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },{
        id: 2,
        latitude: 26.05892704,
        longitude: 119.19546049,
        // alpha:0,
        callout:{
          // content: "西二",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          anchorY:30,
          bgColor:'#CE0000',
          borderRadius: 10,
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
          // content: "西一",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          anchorY:30,
          bgColor:'#CE0000',
          borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },
      {
        id: 4,
        latitude: 26.06045704,
        longitude: 119.19636049,
        // alpha:0,
        callout:{
          // content: "东一",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          anchorY:30,
          bgColor:'#CE0000',
          borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },
      {
        id: 5,
        latitude: 26.06065704,
        longitude: 119.196706049,
        // alpha:0,
        callout:{
          // content: "东二",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          anchorY:10,
          bgColor:'#CE0000',
          borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },
      {
        id: 6,
        latitude: 26.06086704,
        longitude: 119.197406049,
        // alpha:0,
        callout:{
          // content: "东三",
          padding:10,
          display:'ALWAYS',
          textAlign:'center',
          anchorY:30,
          bgColor:'#CE0000',
          borderRadius: 10,
          // borderColor:'#ff0000',
          // borderWidth: 2,
        }
      },
    ]
  },
  ser:function(e){
    db.collection("NowUser").where({
      _id:"sum"
    })
    .get().then(res=>{
      var number0 = 10- Math.floor( (res.data[0].lab)/20%10)
      var number1 =10- Math.floor((res.data[0].west3)/20%10)
      var number2 =10-Math.floor( (res.data[0].west2)/20%10)
      var number3 =10-Math.floor( (res.data[0].west1)/20%10)
      var number4 =10-Math.floor( (res.data[0].east1)/20%10)
      var number5 = 10-Math.floor((res.data[0].east2)/20%10)
      var number6 = 10-Math.floor((res.data[0].east3)/20%10)
      console.log(number0,number1,number2,number3)
      this.setData({
        ['markers[0].callout.bgColor']:numbercolor[number0],
        ['markers[1].callout.bgColor']:numbercolor[number1],
        ['markers[2].callout.bgColor']:numbercolor[number2],
        ['markers[3].callout.bgColor']:numbercolor[number3],
        ['markers[4].callout.bgColor']:numbercolor[number4],
        ['markers[5].callout.bgColor']:numbercolor[number5],
        ['markers[6].callout.bgColor']:numbercolor[number6],
      })

    })
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
      url: '/pages/star/star?id=' + id
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ser()
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
