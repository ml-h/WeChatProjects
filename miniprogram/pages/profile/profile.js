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
      { text: '我的收藏', url: 'collect', icon: '../../images/shoucang.png', tips: '' },
      { text: '上传题目', url: '../shangchuan_timu/shangchuan_timu', icon: '../../images/wendang.png', tips: '' },
      { text: '上传文档', url: '../shangchuan_doc/shangchuan_doc', icon: '../../images/wenjian.png', tips: '' },
      { text: '我的动态', url: '../history_dongtai/history_dongtai', icon: '../../images/lishi.png', tips: '' },
      { text: '我的客服', url: 'kufu', icon: '../../images/kefu.png', tips: '' },

    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo) {
      that.setUserInfo(app.globalData.userInfo);
    } else if (that.data.canIUse) {
      app.userInfoReadyCallback = res => {
        that.setUserInfo(res.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          that.setUserInfo(res.userInfo);
        }
      })
    }
  },
  
  getUserInfo: function (e) {
    this.setUserInfo(e.detail.userInfo);
  },

  setUserInfo: function (userInfo) {
    if (userInfo != null) {
      app.globalData.userInfo = userInfo
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
  },

})

















































