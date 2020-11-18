// 下载文档页面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var pdfUrl=options.id
    wx.showLoading({
      title: '数据加载中',
    })
    console.log("*****详情页接收的id",options)
    this.setData({
      fileId:options.fileId,
      title:options.title,
      date:options.date,
      loder:options.loder,
      size:options.size
    })
    wx.hideLoading()

  },

  download:function(){
    wx.showLoading({
      title: '数据加载中',
    })

    console.log("下载文件url",this.data.fileId)
    wx.cloud.downloadFile({
      fileID: this.data.fileId,
       success: res => {
      console.log("下载成功云存储里的试题文档",res)
       wx.openDocument({
        // res.tempFilePath下载文档成功后的链接
        filePath: res.tempFilePath,
        success: function (res) {
          console.log('打开文档成功success',res)
        }
      })
    },
    fail: err => {
      // handle error
      console.log('打开文档失败',err)
      wx.showToast({
        icon:'none',
        title: '预览失败',
      })
    }
   
  })
  wx.hideLoading()
    // wx.cloud.downloadFile({
    //   fileID: this.data.fileId
    // }).then(res => {
    //  if(res.statusCode===200){
    //   wx.openDocument({
    //     filePath:res.tempFilePath
    //   })
    //  }
    // }).catch(error => {
    //   console.log(res)
    //   wx.showToast({
    //     icon:'none',
    //     title: '文件预览失败',
    //   })
    // })
  }
})