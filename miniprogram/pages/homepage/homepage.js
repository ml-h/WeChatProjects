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
    isPraised:false,
    currentIndex: 0,
    currentIndex1: 0,
    currentIndex2: 0,
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
    wx.cloud.init({
      env: app.globalData.evn
    })
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });


    
  },

  initImageSize:function(){
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    // const weiboWidth = windowWidth-40;
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


  onShow: function() {
    that.getData();
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
          // console.log("数据：" + res.data)
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

  onPraiseTap: function(event){
    const that = this;
    const weiboIndex = event.currentTarget.dataset.weibo;
    const topic = that.data.topics[weiboIndex];
    /*wx.cloud.callFunction({
      name:"praise",
      success: res => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
        data:{
          weiboId=topic._id
        }
        
        //that.userInfo.openId=openId;
      }
    })*/
    /*wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      }
    })*/
    const openId=app.globalData.openid
    //const openId = this.userInfo.openId;
   // console.log(app.globalData);
    let isPraised=false;
    if(topic.praises){
      topic.praises.forEach((value,index) => {
        if(value==openId){
          console.log("!!!!!!!!!!!!!!!!!");
          isPraised=true;
        }
      })
    }
    if(!isPraised){
      console.log("+++++++++++++++++++++++");
      
      //console.log(openId);
      wx.cloud.callFunction({
        name:"praise",
        data:{
          weiboId:topic._id
        },
        success: res => {
          if(!topic.praises){
            topic.praises=[openId];
            console.log("++++++++++++++++++yes");
          }else{
            topic.praises.push(openId);
            console.log("++++++++++++++++++no");
          }
          const topics=that.data.topics;
          console.log(weiboIndex);
          topics[weiboIndex]=topic;
          that.setData({
            topics:topics
          })
          console.log(topics[weiboIndex].praises);
        }
      })
    }
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
              console.log(tempTopic);
              temp.push(tempTopic);
            }

            var totalTopic = {};
            totalTopic = that.data.topics.concat(temp);

            console.log(totalTopic);
            that.setData({
              topics: totalTopic,
            })
          } else {
            wx.showToast({
              title: '已经到底了',
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '已经到底了',
      })
    }

  },

  doc_dongtai:function(e){
    wx.navigateTo({
      url: '../doc_dongtai/doc_dongtai?id='+e.currentTarget.dataset.id,
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

  }
  

})