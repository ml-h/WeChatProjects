// pages/homepage/homepage.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    
    records: [],
    loadingHidden:false
   },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      // 获取当前用户的openID
      wx.cloud.callFunction({
        name:"login",
        data:{}
      }).then(res=>{
        // res.result.data 是用户数据
        this.setData({
          openid:res.result.openid
        })
        db.collection('study_record').where({
          _openid:this.data.openid
        }).orderBy('time', 'desc').get().then(res=>{
          this.setData({
            records: res.data,
            loadingHidden:true
          })
          wx.hideNavigationBarLoading(); //隐藏加载
          wx.stopPullDownRefresh();
        })
      })
     
  },


  

})