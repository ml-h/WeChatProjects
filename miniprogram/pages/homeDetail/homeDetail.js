var that
const db = wx.cloud.database();
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: {},
    id: '',
    openid: '',
    content:'',
    loadingHidden:false,
    focus: false,
    nickname:''

  },
  bindReply(e) {
    this.setData({
      focus: true
    });
  },
  contentInput(e) { //当输入框的值发生改变时，获取
    this.setData({
      content: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.data.id = options.id;
    that.data.openid = options.openid;
    this.initImageSize()
    // 获取话题信息
    db.collection('topic').doc(that.data.id).get({
      success: function(res) {
        that.topic = res.data;
        that.setData({
          topic: that.topic,
         
        })
      }
    })
   
  },

  initImageSize:function(){
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    // const weiboWidth = windowWidth-40;
    const weiboWidth = 253;
    const twoImageSize = (weiboWidth-2.5)/2
    const threeImageSize = (weiboWidth-2.5*2)/3
    console.log(twoImageSize)
    this.setData({
      twoImageSize:twoImageSize,
      threeImageSize:threeImageSize
    })
  },
  onShow: function() {
    // 获取回复列表
    that.getReplay()
  },

  getReplay: function() {
    // 获取回复列表
    db.collection('replay')
      .where({
        t_id: that.data.id
      })
      .get({
        success: function(res) {
          // res.data 包含该记录的数据
          console.log(res)
          that.setData({
            replays: res.data,
            loadingHidden:true
          })
        },
        fail: console.error
      })
  },
  /**
   * 刷新点赞icon
  //  */
  // refreshLikeIcon(isLike) {
  //   that.data.isLike = isLike
  //   that.setData({
  //     isLike: isLike,
  //   })
  // },
  // 预览图片
  previewImg: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;

    wx.previewImage({
      //当前显示图片
      current: this.data.topic.images[index],
      //所有图片
      urls: this.data.topic.images
    })
  },


  /**
   * 回复
   */
  onReplayClick(){
        var month=new Date().getMonth()+1
        
       wx.getUserInfo({
         success:(res)=>{
        this.data.nickname=res.nickname
         }
         
       })
       console.log("___"+res.nickname)
        if (this.data.content.trim() != ''){
          db.collection('replay').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              content: that.data.content,
              date: new Date(),
              time: new Date().getFullYear()+"/"+month+"/"+new Date().getDate()+' '+new Date().getHours()+":"+new Date().getMinutes(),
              r_id: that.data.id,
              u_id: that.data.openid,
              t_id: that.data.id
           
            },
            success: function(res) {
              wx.showToast({
                title: '回复成功',
              })
              that.getReplay()
              that.setData({
                content:''
              })
             
            },
            fail: console.error
          })
        }else {
          wx.showToast({
            icon: 'none',
            title: '写点东西吧',
          })
        }
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
          console.log(e)
          console.log("&&&&&"+e.currentTarget.dataset.item._openid)
          console.log("&&&&&&&"+res.result.openid)
          console.log(e.currentTarget.dataset.item._openid==res.result.openid)
          if(e.currentTarget.dataset.item._openid==res.result.openid){
            wx.showModal({
              title: '提示',
              content: '确定删除该条动态',
              success: function (res) {
                if (res.confirm) {
                  db.collection('replay').doc(e.currentTarget.dataset.item._id).remove().then(res=>{
                    wx.showToast({
                      title: '删除成功',
                    })
                    that.getReplay();
                    })
                } 
              }
            })
          }
        })
    
      },

})