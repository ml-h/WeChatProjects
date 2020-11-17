// 下载文档页面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    

  },

  download:function(){
    wx.cloud.downloadFile({
      fileID: this.data.fileId
    }).then(res => {
     if(res.statusCode===200){
      wx.openDocument({
        filePath:res.tempFilePath
      })
     }
    }).catch(error => {
      console.log(res)
      wx.showToast({
        icon:'none',
        title: '文件预览失败',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var pdfUrl=options.id
    console.log("*****详情页接收的id",options)
    this.setData({
      fileId:options.fileId,
      title:options.title,
      date:options.date,
      loder:options.loder,
      size:options.size
    })

  }
})