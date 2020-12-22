// pages/homepage/homepage.js
var that
const app = getApp()
var util = require('../../utils/util.js');
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 0,
    topics: [],
    priseDongtai:[],
    isPraised:false,
    currentIndex: 0,
    currentIndex1: 0,
    currentIndex2: 0,
    show:'one',
    imgList: [{
      img: "https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/%E5%9B%BE%E6%A0%87/fzu1.png?sign=ae23e42dc51b5c57255639a883dfe0cc&t=1605663522" //轮播图片
    },
    {
      img: "https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/%E5%9B%BE%E6%A0%87/fzu2.png?sign=9cdd7a1f19b822748119aff2460e9dab&t=1605663659"
    },
    {
      img: "https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/%E5%9B%BE%E6%A0%87/fzu3.png?sign=0f0c1e4bcfdcc47d44b1dbd786b1563f&t=1605663594"
    }
    ],
    loadingHidden:false
  
   },
 
   changeSwiper: function (e) {
     this.setData({
       currentIndex: e.detail.current
     })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initImageSize()
    that = this
    // wx.cloud.init({
    //   env: 'test-yan-3gp1h1ez7f7c6a02',
    //   traceUser: true,
    // })
    that.getOpenid()

  },

  initImageSize:function(){
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const weiboWidth = 253;
    const twoImageSize = (weiboWidth-2.5)/2
    const threeImageSize = (weiboWidth-2.5*2)/3
    this.setData({
      twoImageSize:twoImageSize,
      threeImageSize:threeImageSize
    })
  },

  onWriteWeiboTap:function(event){
    const userInfo=event.detail.userInfo;
    if(userInfo){
      wx.navigateTo({
         url: '../publish/publish?nickName='+userInfo.nickName+'&avatarUrl='+userInfo.avatarUrl
      });
    }

  },

  /**
   * 获取列表数据
   * 
   */
  getData: function(start=0) {
    const db = wx.cloud.database();
    db.collection('topic')
      .orderBy('date', 'desc')
      .get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          that.data.topics = res.data;
          that.setData({
            topics: that.data.topics,
            loadingHidden:true
          })

          wx.hideNavigationBarLoading(); //隐藏加载
          wx.stopPullDownRefresh();
        },
        fail: function(event) {
          wx.hideNavigationBarLoading(); //隐藏加载
          wx.stopPullDownRefresh();
        }
      })

  },

 
  /**
   * item 点击
   */
  onItemClick: function(event) {
    var id = event.currentTarget.dataset.topicid;
    var openid = event.currentTarget.dataset.openid;
    wx.navigateTo({
      url: "../homeDetail/homeDetail?id=" + id + "&openid=" + openid
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.getData();
  },
onShow:function(){
this.getData()
},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var temp = [];
    // 获取后面十条
    if (this.data.topics.length < this.data.totalCount) {
      const db = wx.cloud.database();
      db.collection('topic').get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          if (res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
              var tempTopic = res.data[i];

              temp.push(tempTopic);
            }

            var totalTopic = {};
            totalTopic = that.data.topics.concat(temp);

            
            that.setData({
              topics: totalTopic,
            })
          } else {
            wx.showToast({
              title: '已经到底了',
              icon:'none'
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '已经到底了',
        icon:'none'
      })
    }

  },

  doc_dongtai:function(e){
    wx.navigateTo({
      url: '../doc_dongtai/doc_dongtai?id='+e.currentTarget.dataset.id,
    })
  },
  timu_dongtai:function(e){
    wx.navigateTo({
      url: '../timu_dongtai/timu_dongtai?id='+e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type+"&op=0",
    })
  },



  xiala:function(e){
    wx.showLoading({
      title: '正在加载',
    })
    wx.cloud.callFunction({
      name:"login",
      data:{}
    }).then(res=>{
      wx.hideLoading()
      if(e.currentTarget.dataset.openid==res.result.openid){
        wx.showModal({
          title: '提示',
          content: '确定删除该条动态',
          success: function (res) {
            if (res.confirm) {
              db.collection('topic').doc(e.currentTarget.dataset.topicid).remove().then(res=>{
                wx.showToast({
                  title: '删除成功',
                })
                that.getData();
                })
            } 
          }
        })
      }
    })

  },
  
  // 获取用户id  调用getCollectPaperurl（）
  getOpenid(){
    // 获取当前用户的openID
    wx.cloud.callFunction({
      name:"login",
      data:{}
    }).then(res=>{
      
      this.setData({
        openid:res.result.openid
      })
      this.getData()
      this.getPrise(that.data.openid)
    })
    .catch(res=>{
      console.log("获取openID 失败",res)
    })
  
},  
getPrise(openid){
  wx.cloud.callFunction({
    name:"prise",
    data:{
      action:"get",
      userid:openid
    }
  }).then(res=>{
    if(res.result.data.length==0){
      wx.cloud.callFunction({
        name:"prise",
        data:{
          action:"addUser",
          userid:openid
        }
      })
    }else{
      this.setData({
        loadingHidden:true,
        priseDongtai:res.result.data[0].priseDongtai
      })
    }
  })
},
PriseTap:function(event){
  if(event.currentTarget.dataset.status=="true"){
    console.log("取消点赞")
    wx.cloud.callFunction({
      name:"prise",
      data:{
        action:"cancel",
        userid:that.data.openid,
        topicId:event.currentTarget.dataset.topicid,
      }
    }).then(res=>{
      this.getData()
      this.getPrise(that.data.openid)
    })
  }else{
    console.log("点赞")
    wx.cloud.callFunction({
      name:"prise",
      data:{
        action:"prise",
        userid:that.data.openid,
        topicId:event.currentTarget.dataset.topicid,
      }
    }).then(res=>{
      // console.log(res)
      // that.data.priseDongtai.push(event.currentTarget.dataset.topicid)
      this.getData()
      this.getPrise(that.data.openid)
     })
   
  }
},
jubao:function(event){

  wx.showModal({
    title: '提示',
    content: '确认要举报该条动态？',
    success: function (res) {
      if (res.confirm) {
        console.log(event.currentTarget.dataset.topicid)
        console.log(that.data.openid)
        // 获取该动态的举报信息
        wx.cloud.callFunction({
          name:"jubao",
          data:{
            action:"get",
            userid:that.data.openid,
            topicId:event.currentTarget.dataset.topicid,
          }
        }).then(res=>{
          console.log("查询结果aa",res)
          console.log("查询结果aa",res.result.data.length)

          // 没有被举报过
         if(res.result.data.length==0){
           console.log(that.data.openid,"hjadgyidsc")
          wx.cloud.callFunction({
            name:"jubao",
            data:{
              action:"new",
              userid:that.data.openid,
              topicId:event.currentTarget.dataset.topicid,
            }
          }).then(res=>{
            console.log(res,"第一次举报add")
            wx.showToast({
              title: '举报成功',
            })
          })
         }else{
          console.log(res.result.data[0].user_id.length)
          console.log("用户id",that.data.openid)
          var f=0;
          // 不能重复举报
          for(var i=0;i<res.result.data[0].user_id.length;i++){
            if(res.result.data[0].user_id[i]==that.data.openid){
              f=1;
              wx.showToast({
                title: '不能重复举报',
              })
              break;
            }
          }
     
          // 增加举报
          if(f==0){
            console.log("增加举报")
            wx.cloud.callFunction({
              name:"jubao",
              data:{
                action:"add",
                userid:that.data.openid,
                topicId:event.currentTarget.dataset.topicid,
              }
            }).then(res=>{
              console.log(res,"add")
              wx.showToast({
                title: '举报成功',
              })
            })
          }
          
         // 判断是否可以删除
         if(res.result.data[0].user_id.length>6){
           console.log("执行删除")
                wx.cloud.callFunction({
                  name:"jubao",
                  data:{
                    // action:"prise",
                    action:"delete",
                    userid:that.data.openid,
                    topicId:event.currentTarget.dataset.topicid,
                  }
                }).then(res=>{
                  console.log(res,"del")
                })
         }
         }

         })
        
      }
   }
  })

},
change:function(e){
console.log(e)
if(e.target.activeKey=='one'){
  this.setData({
    show:e.detail.activeKey,
  })
}else{
  this.setData({
    show:e.detail.activeKey,
  })
}


}

})