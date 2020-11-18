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
    isLike: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    that = this;
    that.data.id = options.id;
    that.data.openid = options.openid;
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
            replays: res.data
          })
        },
        fail: console.error
      })
  },
  /**
   * 刷新点赞icon
   */
  refreshLikeIcon(isLike) {
    that.data.isLike = isLike
    that.setData({
      isLike: isLike,
    })
  },
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
  onReplayClick() {
    if(!app.is_login()){
      wx.navigateTo({
        url: '../login/login'
      })
  }else{
    wx.navigateTo({
      url: "../replay/replay?id=" + that.data.id + "&openid=" + that.data.openid
    })
  }
}
})