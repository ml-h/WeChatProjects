// pages/shangchuan_timu/shangchuan_timu.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    author:'',
    timu:''
  },
  get_data: function(e){
    db.collection("up_timu").where({
      author:e
    }).get().then(res=>{
      // console.log("题目列表",res.data)
        this.setData({
          timu:res.data
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '上传题目'
    })
    var that = this
    wx.getUserInfo({
    success:res=>{
      const userInfo=res.userInfo;
      console.log(userInfo)
        that.setData({
          author:userInfo.nickName
        })
        that.get_data(userInfo.nickName)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.get_data()
  },

   up_timu: function (options) {
  wx.navigateTo({
        url: '../up_timu/up_timu'
})  
},

fankui(e) {
  // console.log(e.target.dataset.item)
  wx.navigateTo({
        url: '../fankui_timu/fankui_timu?id='+e.currentTarget.dataset.id,
  })
 }
})