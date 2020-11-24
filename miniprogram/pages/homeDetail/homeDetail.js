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
    loadingHidden:false
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
   * 跳转回复页面
   */
  onReplayClick(event){
      const userInfo=event.detail.userInfo;
      if(userInfo){
        wx.navigateTo({
          url: "../replay/replay?id=" + that.data.id + "&openid=" + that.data.openid
        });
      }


}
})