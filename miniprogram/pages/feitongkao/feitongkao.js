// pages/feitongkao/feitongkao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // fenlei: ['01哲学', '02经济学','03法学', '04教育学','05文学','06历史学', '07理学','08工学','09农学', '10医学','11军事学','12管理学','13艺术学'],
    fenlei: [{
      name:'01哲学',
      type:'01'
    }, {
      name:'02经济学',
      type:'02'
    }, {
      name:'03法学',
      type:'03'
    }, {
      name:'04教育学',
      type:'04'
    }, {
      name:'05文学',
      type:'05'
    }, {
      name:'06历史学',
      type:'06'
    }, {
      name:'07理学',
      type:'07'
    }, {
      name:'08工学',
      type:'08'
    }, {
      name:'09农学',
      type:'09'
    }, {
      name:'09农学',
      type:'09'
    }, {
      name:'10医学',
      type:'10'
    }, {
      name:'11军事学',
      type:'11'
    }, {
      name:'12管理学',
      type:'12'
    }, {
      name:'13艺术学',
      type:'13'
    }],
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
      url:'../zhenti/zhenti?type='+event.currentTarget.dataset.type+'&course='+event.currentTarget.dataset.course,
    })  
    
  },








})