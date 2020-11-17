const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  changepage:function(event){
    if(!app.is_login()){
      wx.navigateTo({
        url: '../login/login'
      })
  }else{
    // console.log("跳转页面",event.target.dataset.course)
    // 跳转到页面 zhenti,并携带参数
    wx.navigateTo({
      url:'../zhenti/zhenti?type='+event.currentTarget.dataset.type+'&course='+event.currentTarget.dataset.course,
    })
  }
  },
  
  changepage3:function(){
    if(!app.is_login()){
      wx.navigateTo({
        url: '../login/login'
      })
  }else{
    wx.navigateTo({
      url:'../tongkaoshiti/tongkaoshiti',
    })
  }
  },
  changepage4:function(){
    if(!app.is_login()){
      wx.navigateTo({
        url: '../login/login'
      })
  }else{
    wx.navigateTo({
      url:'../feitongkao/feitongkao',
    })}
  }

})