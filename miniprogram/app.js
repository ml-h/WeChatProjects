//app.js

//测试
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'test-yan-3gp1h1ez7f7c6a02',
        traceUser: true,
      })
    }
    this.globalData = {
      openid:""
    }
    this.loadUserInfo();
  },
  
  globalData: {
    userInfo: null,
  },
  is_login:function(){
    if(this.globalData.userInfo){
      return true;
    }else{
      return false;
    }
  },
  setUserInfo:function(userInfo){
    this.globalData.userInfo=userInfo;
  },
  loadUserInfo:function(){
    const that=this
    wx.getSetting({
      success:res=>{
        const isUserInfo=res.authSetting['scope.userInfo'];
        if(isUserInfo){
          wx.getUserInfo({
            success:res=>{
              const userInfo=res.userInfo;
              that.globalData.userInfo=userInfo;
            }
          });
          wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
              console.log('[云函数] [login] user openid: ', res.result.openid)
              // console.log(res)
              const openId = res.result.openid
              
              that.globalData.openid = openId
              console.log(that.globalData)
              // console.log(app.globalData.openid);
            }
          })
        }
      }
    })
  }
})
