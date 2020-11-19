const app=new App()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paperList:[{"":""}],//页面要展示的题目url
    course:"",
    shoucang:false,
    openid:"",
    collectPaperurl:[],//用户收藏的试题列表
    length:"",
    id:1,
    day:7,
    loadingHidden:false

  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 初始化真题页面时会从数据库获取试题列表
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.course+"真题" ,
    })
    if(options.type==="1"){
      var dbname="TongKao"
    }else if(options.type==="2"){
      console.log("FeiTongKao")
      var dbname="FeiTongKao"
    }else{
      var dbname="ZhuanYeKe"
    }
    this.setData({
      // 得到参数科目所属的数据库名称Politics_papers
      dbname:dbname,
      course:options.course,
    })
    // 获取当前用户的openID,成功后调用getCollectPaperurl，再调用getPaperList
    this.getOpenid()
  },

  // 获取用户id  调用getCollectPaperurl（）
getOpenid(){
      // 获取当前用户的openID
      wx.cloud.callFunction({
        name:"login",
        data:{}
      }).then(res=>{
        // res.result.data 是用户数据
        console.log("获取openID成功 ",res.result.openid)
        // 获取用户收藏的试题
        // this.getCollectPaperurl(res.result.openid)
        this.setData({
          openid:res.result.openid
        })
        this.getPaperList()
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
    console.log("获取收藏返回：",res)
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
        loadingHidden:true,
        collectPaperurl:res.result.data[0].star_docUrl
      })
    }
  })
},
starDoc:function(event){
  console.log("文档item",event.target.dataset.item)
  if(event.target.dataset.collect=="true"){
    wx.cloud.callFunction({
      name:"starDoc",
      data:{
        action:"cancel",
        id:this.data.openid,
        url:event.target.dataset.paperurl,
        // title:event.target.dataset.title,
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
  }else{
    wx.cloud.callFunction({
      name:"starDoc",
      data:{
        action:"star",
        id:this.data.openid,
        url:event.target.dataset.paperurl,
        // title:event.target.dataset.title,
        doc:event.target.dataset.item
      }
    }).then(res=>{

      // 获取收藏成功后的paperurl列表,更新collectPaperurl
      this.getStarurl(this.data.openid)
      wx.showToast({
        icon:"success",
        title: '收藏成功',
      })
    })
  }
},



// 获取试题文档列表
getPaperList(){
  let that = this;
  // that.data.course是云数据库中存放文档的集合名
  wx.cloud.database().collection(that.data.dbname).where({
    paper_type:this.data.course,
    status:true
  }).get({
    success(res){
      // console.log("从数据库获取数据成功,页面试题文档 ",res.data)
      that.setData({
        paperList:res.data,
        length:res.data.length
      })
    }
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