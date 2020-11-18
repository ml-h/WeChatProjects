const app=new App()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paperList:[],
    docName:[],//页面要展示的题目
    docUrl:[],
    course:"",
    shoucang:false,
    openid:"",
    length:0,
    id:1,
    day:7

  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 初始化真题页面时会从数据库获取试题列表
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: "收藏文档" ,
    })
    this.getOpenid()
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
        this.getStarurl(res.result.openid)
      })
      .catch(res=>{
        console.log("获取openID 失败",res)
      })
     
},

getStarurl(openid){
  wx.cloud.callFunction({
    name:"starDoc",
    data:{
      action:"get",
      id:openid
    }
  }).then(res=>{
    if(res.result.data.length==0){
      console.log("该用户还没收藏")
      wx.cloud.callFunction({
        name:"starDoc",
        data:{
          action:"addUser",
          id:openid
        }
      })
    }else{
      this.setData({
        paperList:res.result.data[0].doc,
        length:res.result.data[0].doc.length
      })
      console.log(this.data.paperList)
    }
  })
},
starDoc:function(event){
    wx.cloud.callFunction({
      name:"starDoc",
      data:{
        action:"cancel",
        id:this.data.openid,
        url:event.target.dataset.paperurl,
        doc:event.target.dataset.item
      }
    }).then(res=>{
      // res.result.data 是用户数据
      // console.log("向云数据库里del数据success",res)
      // 获取收藏成功后的paperurl列表,更新collectPaperurl
      this.getStarurl(this.data.openid)
      wx.showToast({
        icon:"success",
        title: '取消收藏成功',
      })
    })

},


// 跳转到试题文档详情的页面

//通过Url打开云存储里的试题文档
downLoadPaper:function(e){
  console.log("下载文档",e)
  wx.navigateTo({
    url: '../download/download?title='+e.currentTarget.dataset.title+'&date='+
    e.currentTarget.dataset.date+'&loder='+ e.currentTarget.dataset.loder+'&fileId='+ e.currentTarget.dataset.fileid
    +'&size='+Math.round(e.currentTarget.dataset.size/1024)
  })
}


})