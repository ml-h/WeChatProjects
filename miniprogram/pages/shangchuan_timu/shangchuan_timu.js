// pages/shangchuan_timu/shangchuan_timu.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false,
    author:'',
    timu:''
  },
  get_data: function(e){
    db.collection("up_timu").where({
      _openid:e
    }).get().then(res=>{
      // console.log("题目列表",res.data)
        this.setData({
          timu:res.data,
          loadingHidden:true
        })
        
    })
  },
  getOpenid(){
    // 获取当前用户的openID
    wx.cloud.callFunction({
      name:"login",
      data:{}
    }).then(res=>{
      // res.result.data 是用户数据
      console.log("获取openID成功 ",res.result.openid)
      // 获取用户收藏的试题
      this.get_data(res.result.openid)
    })
    .catch(res=>{
      console.log("获取openID 失败",res)
    })
   
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: '上传题目'
    })
    

    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOpenid()
  },

fankui(e) {
  wx.navigateTo({
        url: '../fankui_timu/fankui_timu?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type,
  })
 },
 timu_dongtai:function(e){
   wx.navigateTo({
     url: '../timu_dongtai/timu_dongtai?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type+"&op=1",
   })
  },
  up:function() {
    wx.showActionSheet({
      itemList: ['上传简答题', '上传选择题'],
      success: function(res) {
        if(res.tapIndex==0){
          wx.navigateTo({
            url: '../up_timu/up_timu'
    })  
        }else if(res.tapIndex==1){
          wx.navigateTo({
            url: '../up_xuanze/up_xuanze'
    })  
        }
      },
      fail: function(res) {
          console.log(res.errMsg)
      }
  })
  },
  
})