//index.js
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
   pingjia:0,
   loadingHidden:false,
   xuanze:['A','B','C','D','E','F','G'],
   answer:"",
   analyse:"",
  },

  onLoad: function(option) {
    console.log(option)
    db.collection('up_timu').doc(option.id).get().then(res=>{
        this.setData({
         content:res.data.content,
         answer:res.data.answer,
         analyse:res.data.analyse,
         choice:res.data.choice,
          type:option.type,
          timu_id:option.id,
          con_img:res.data.con_img,
          ans_img:res.data.ans_img,
          status:res.data.timu_status,
          loadingHidden:true,
          op:option.op
        })
    })
   
  },
   // 预览图片
   previewImg: function(e) {
    //获取当前图片的下标
    var url =[]
    url.push(e.currentTarget.dataset.url);

    wx.previewImage({
      //当前显示图片
      current: url[0],
      //所有图片
      urls: url
    })
  },

  pingjia:function(e){
    if(this.data.pingjia===0){
    const _ = db.command
     var operate=e.currentTarget.dataset.operate
      db.collection('up_timu').doc(this.data.timu_id).update({
        data:{
          score:_.inc(parseInt(operate))
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
      db.collection('up_timu').doc(this.data.timu_id).get().then(res=>{
        console.log("文档分数",res.data.score,this.data.timu_id)
        if(res.data.score>5){
          wx.cloud.callFunction({
            name:"update_timu",
            data:{
              id:this.data.timu_id
              
            }
          }).then(res=>{
            console.log(res)
          })
        }
      })
    }
      
  
})
