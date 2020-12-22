var that
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    openid: '',
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title:'数据加载中',
    })
    that = this;
    that.data.id = options.id;
    that.data.openid = options.openid;
    
    wx.hideLoading()
    
  },
  

  bindKeyInput(e) {
    that.data.content = e.detail.value;
  },

  saveReplay: function() {
    if (this.data.content.trim() != ''){
      db.collection('replay').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          content: that.data.content,
          date: new Date(),
          r_id: that.data.id,
          u_id: that.data.openid,
          t_id: that.data.id,
        },
        success: function(res) {
          wx.showToast({
            title: '回复成功',
          })
          setTimeout(function() {
            wx.navigateBack({
              url: "../homeDetail/homeDetail?id=" + that.data.id + "&openid=" + that.data.openid
            })
          }, 1500)
  
        },
        fail: console.error
      })
    }else {
      wx.showToast({
        icon: 'none',
        title: '写点东西吧',
      })
    }
    
  }

})