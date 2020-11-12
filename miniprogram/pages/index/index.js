//index.js
//获取应用实例
const app = getApp()

Page({
  onWriteWeiboTap:function(event){
    wx.showActionSheet({
      itemList: ['上传题目','发表看法'],
      success:res=> {
        const tapIndex = res.tapIndex;
        wx.navigateTo({
          url: '../up/up?type='+tapIndex,
        })
      }
    })
   
  }
})
