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
        that.setData({
          author:userInfo.nickName,
          user:{
            nickName:userInfo.nickName,
            avatarUrl:userInfo.avatarUrl
          }
        })
      }
    })
  },
  input1: function(e) {//接受题目
    this.setData({
      content: e.detail.value
    })
  },
  input2: function(e) {//接受答案
    this.setData({
      answer: e.detail.value
    })
  },
  searchclick: function(){
    db.collection("up_timu").add({
      data:{
        author:this.data.author,
        content:this.data.content,
        answer:this.data.answer,
        youYong:0,
        meiYong:0,
        timu_status:"正在审核",
        status:false,
        pinglun:this.data.pinglun,
        status:this.data.shoucang,
      }
    }).then(res=>{
      this.add_dongtai(res._id)
      wx.showToast({
        title: '上传成功',
        duration:1500,
      })

    }).catch(err=>{
      wx.showToast({
        title: '上传失败',
      })
      console.log("上传失败：",err)
    })
  },
  // 自动上传文档动态到社区
  add_dongtai(timu_id){
    wx.cloud.database().collection('topic').add({
      data: {
        date: new Date(),
        timu_id:timu_id,
        content:this.data.content,
        answer:this.data.answer,
        
        user:this.data.user,
        
        uploader:this.data.author,
        type:3
      }     
        })
      }
})