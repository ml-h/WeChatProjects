//index.js
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
   pingjia:0
  },

  onLoad: function(option) {
    db.collection('topic').doc(option.id).get().then(res=>{
        this.setData({
          paper_name:res.data.paper_name,
          fileId:res.data.paper_FileID,
          id:option.id,
          status:res.data.paper_status,
        })
    })
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

  pingjia:function(e){
    if(this.data.pingjia===0){
  const _ = db.command
   var operate=e.currentTarget.dataset.operate
      db.collection('topic').doc(this.data.id).update({
        data:{
          pingjia_fenshu:_.inc(parseInt(operate))
        }
      }).then(
      
      this.setData({
        pingjia:1
      }),
      this.juedge(),
       wx.showToast({
         title: '评价成功，感谢您的参与!',
       })
     
      )
    }else{
      wx.showToast({
        icon:'none',
        title: '您已经评价了',
      })
    }
    },
    // 判断文档分数
    juedge(){
      db.collection('topic').doc(this.data.id).get().then(res=>{
        if(res.data.pingjia_fenshu>5){
          db.collection('topic').doc(this.data.id).update({
            data: {
              paper_status:"已纳入题库"
            }
          }),
          db.collection('FeiTongKao').where({
            paper_fileID:this.fileId
          }).update({
            data: {
             staus:true
            }
          })
        }
      })
    }
  
})
