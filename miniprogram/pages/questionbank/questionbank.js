const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  changepage:function(event){
  //   if(!app.is_login()){
  //     wx.navigateTo({
  //       url: '../login/login'
  //     })
  // }else{
    // console.log("跳转页面",event.target.dataset.course)
    // 跳转到页面 zhenti,并携带参数
    console.log(event)
    // const userInfo=event.detail.userInfo;
    // if(userInfo){
    wx.navigateTo({
      url:'../zhenti/zhenti?type='+event.currentTarget.dataset.type+'&course='+event.currentTarget.dataset.course,
    })
  // }
  },
  
  changepage3:function(event){
  //   if(!app.is_login()){
  //     wx.navigateTo({
  //       url: '../login/login'
  //     })
  // }else{
    const userInfo=event.detail.userInfo;
    // if(userInfo){
    wx.navigateTo({
      url:'../tongkaoshiti/tongkaoshiti',
    })
  // }
  },
  changepage4:function(event){
    //   if(!app.is_login()){
    //     wx.navigateTo({
    //       url: '../login/login'
    //     })
    // }else{
      const userInfo=event.detail.userInfo;
      // if(userInfo){
    wx.navigateTo({
      url:'../feitongkao/feitongkao',
    })
  // }
  },
  input: function(e) {//接受输入值
    this.setData({
      key: e.detail.value
    })
  },

  searchclick :function(e){
    if(this.data.key.length>0){
      wx.navigateTo({
        url: '../../pages/souResult/souResult?key='  + this.data.key,
      })  
    }else{
      console.log("不支持无关键词搜索")
      wx.showToast({
        title: "请输入关键词",
        duration:2000,
        icon:'none'
      })
    }
  }

})