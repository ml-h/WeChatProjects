// pages/feitongkao/feitongkao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei: ['01哲学', '02经济学','03法学', '04教育学','05文学','06历史学', '07理学','08工学','09农学', '10医学','11军事学','12管理学','13艺术学'],
  
    zhuanye:['0101 哲学'],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  more:function(e){
    wx.cloud.callFunction({
      name:"query_zhuanye",
      data:{
        id:e.target.dataset.operate,
      }
    }).then(
      res=>{
      this.setData({
        zhuanye:res.result.data.list,
      })     
    }).catch(err=>{
      console.log("请求数据库错误"+err);
    });
  },

  lixue(event){
    console.log("点击获取的文档列表数据id",event.currentTarget.dataset.item)
    wx.navigateTo({
      // url: '../../pages/doclist_nounified/doclist_nounified?id='+event.currentTarget.dataset.item,
      url:'../zhenti/zhenti?type='+event.currentTarget.dataset.type+'&course='+event.currentTarget.dataset.course,
 
    })  
    
  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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