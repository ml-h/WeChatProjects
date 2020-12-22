// pages/profile/profile.js
//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menuitems: [
      { text: '收藏文档', url: '../star_doc/star_doc', icon: '../../images/star.png', tips: '' },
      { text: '上传文档', url: '../shangchuan_doc/shangchuan_doc', icon: '../../images/wenjian.png', tips: '' },
      { text: '收藏题目', url: '../star_timu/star_timu', icon: '../../images/shoucang.png', tips: '' },
      { text: '上传题目', url: '../shangchuan_timu/shangchuan_timu', icon: '../../images/wendang.png', tips: '' },
      { text: '我的动态', url: '../history_dongtai/history_dongtai', icon: '../../images/lishi.png', tips: '' },
      { text: '自习记录', url: '../study_record/study_record', icon: '../../images/lishi.png', tips: '' },
      { text: '我的客服', url: '../kefu/kefu', icon: '../../images/kefu.png', tips: '' },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.is_login()){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
      console.log("用户已登录", this.data.userInfo)
    }else{
      console.log("用户未登录", this.data.userInfo)
    }
  },
  onShow: function (options) {
    if(app.is_login()){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
      console.log("用户已登录", this.data.userInfo)
    }else{
      console.log("用户未登录", this.data.userInfo)
    }
  },

  tiaozhuan:function(event){
      const userInfo=event.detail.userInfo;
      if(userInfo){
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  }
},
getUserInfo:function(event){
  console.log(event);
  const userInfo=event.detail.userInfo;
  if(userInfo){
    this.setData({
      userInfo:event.detail.userInfo,
      hasUserInfo:true
    })
    app.setUserInfo(userInfo);
  }
}

})

















































