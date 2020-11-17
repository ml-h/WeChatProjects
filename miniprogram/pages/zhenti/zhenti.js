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
    collectPaperurl:[""],
    length:"",
    id:1,
    day:7

  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 初始化真题页面时会从数据库获取试题列表
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.course ,
    })
    if(options.type==="1"){
      var dbname="TongKao"
    }else if(options.type==="2"){
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
    // this.getOpenid()
    this.getPaperList()
    
  },

  // 获取用户id和该用户收藏的题目url
getOpenid(){
      // 获取当前用户的openID
      wx.cloud.callFunction({
        name:"login",
        data:{}
      }).then(res=>{
        // res.result.data 是用户数据
        console.log("获取openID success",res.result.openid)
        // 获取用户收藏的试题
        this.getCollectPaperurl(res.result.openid)
        this.setData({
          openid:res.result.openid
        })
      })
      .catch(res=>{
        console.log("获取openID 失败",res)
      })
     
},

// 获取用户收藏的paperurl
getCollectPaperurl:function(u_openid){
  let that=this
// 调用cloud云函数查询或更新指定用户id的试题数据
  wx.cloud.callFunction({
    name:"updateUserPapers",
    data:{
      action:"get",
      id:u_openid,
    }
  }).then(res=>{
    // res.result.data 是用户数据
    console.log("向云数据库里查询数据success",res.result.data[0].collect_paper)
    that.setData({
      collectPaperurl:res.result.data[0].collect_paper
    })
    that.getPaperList()
  })
  .catch(res=>{
    console.log("向云数据库里查询数据失败",res)
  })
},

// 获取试题文档列表
getPaperList(){
  let that = this;
  // that.data.course是云数据库中存放文档的集合名
  if(that.data.dbname==="FeiTongKao"){
    wx.cloud.database().collection("FeiTongKao").where({
      paper_type:this.data.course,
      status:true
    }).get({
      success(res){
        that.setData({
          paperList:res.data,
          length:res.data.length
        })
      }
    })
  }else{
    wx.cloud.database().collection(that.data.dbname).where({
      paper_type:this.data.course
    }).get({
      success(res){
        that.setData({
          paperList:res.data,
          length:res.data.length
        })
      }
    })
  }
},

// 收藏试题
collectPaper:function(event){
 
  let that=this
  if(event.target.dataset.collect=="true"){
         // 调用cloud云函数删除指定用户id的试题数据
      wx.cloud.callFunction({
        name:"updateUserPapers",
        data:{
          action:"update_del",
          id:that.data.openid,
          paperurl:event.target.dataset.paperurl
        }
      }).then(res=>{
        // res.result.data 是用户数据
        console.log("向云数据库里del数据success",res)
        // 获取收藏成功后的paperurl列表,更新collectPaperurl
        that.getCollectPaperurl(that.data.openid)
        wx.showToast({
          icon:"success",
          title: '取消收藏成功',
        })
      })
      .catch(res=>{
        console.log("向云数据库里del数据失败",res)
      })
  }else{
      // 调用cloud云函数更新指定用户id的试题数据
      wx.cloud.callFunction({
        name:"updateUserPapers",
        data:{
          action:"update_push",
          id:that.data.openid,
          paperurl:event.target.dataset.paperurl
        }
      }).then(res=>{
        // res.result.data 是用户数据
        console.log("向云数据库里push更新数据success",res)
        // 获取收藏成功后的paperurl列表,更新collectPaperurl
        that.getCollectPaperurl(that.data.openid)
        wx.showToast({
          icon:"success",
          title: '收藏成功',
        })
      })
      .catch(res=>{
        console.log("向云数据库里push更新数据失败",res)
      })
  }
  

  
},


// 跳转到试题文档详情的页面
showPaper:function(event){
  console.log("试题详情")
  console.log(event)
},

//通过Url打开云存储里的试题文档
downLoadPaper:function(e){
  console.log(e)
  wx.navigateTo({
    url: '../download/download?title='+e.currentTarget.dataset.title+'&date='+
    e.currentTarget.dataset.date+'&loder='+ e.currentTarget.dataset.loder+'&fileId='+ e.currentTarget.dataset.fileid
    +'&size='+e.currentTarget.dataset.size
  })
  // console.log(event.target.dataset['paperurl'])
  // console.log("下载文档")
  // wx.cloud.downloadFile({
  //   fileID: event.target.dataset['paperurl'],
  //   success: res => {
  //     console.log("下载成功云存储里的试题文档",res)
  //     wx.openDocument({
  //       // res.tempFilePath下载文档成功后的链接
  //       filePath: res.tempFilePath,
  //       success: function (res) {
  //         console.log('打开文档成功success',res)
  //       }
  //     })
    // },
    // fail: err => {
    //   // handle error
    // }
  // })
}


})