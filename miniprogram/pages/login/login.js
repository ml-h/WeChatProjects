// pages/login/login.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad:function(options){
  },
  onGetUserInfoTap:function(event){
    // console.log(event);
    const userInfo=event.detail.userInfo;
    if(userInfo){
      app.setUserInfo(userInfo);
      wx.showToast({
        title: '授权成功！'
      });
      setTimeout(()=>{
        wx.navigateBack({});
      },1500);
    }
  }
})