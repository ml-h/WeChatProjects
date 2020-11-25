// pages/up_timu/up_timu.js
const db=wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    author:'',
    content:'',
    answer:'',
    pinglun:[],
    shoucang:false
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
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  input1: function(e) {//接受题目
    // console.log("题目 ",e.detail.value)
    this.setData({
      content: e.detail.value
    })
    console.log(this.data)
  },
  input2: function(e) {//接受答案
    // console.log("答案 ",e.detail.value)
    this.setData({
      answer: e.detail.value
    })
    console.log(this.data)
  },
  searchclick: function(){
    db.collection("up_timu").add({
      data:{
        'author':this.data.author,
        'content':this.data.content,
        'answer':this.data.answer,
        'pinglun':this.data.pinglun,
        'shoucang':this.data.shoucang
      }
    }).then(res=>{
      wx.showToast({
        title: '上传成功',
        duration:1500,
        success(){
          wx.navigateTo({
            url: '../../pages/shangchuan_timu/shangchuan_timu',
          }) 
        }
      })
    }).catch(err=>{
      wx.showToast({
        title: '抱歉',
      })
      console.log("上传失败：",err)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})