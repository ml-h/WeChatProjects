// pages/up_timu/up_timu.js
const db=wx.cloud.database();
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ans_type:1,
    con_type:1,
    author:'',
   answer_img:'',
    content_img:'',
    pinglun:[],
    shoucang:false,
    images:[],
    content:'',
    con_img:'',
    answer:'',
    ans_img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '上传题目'
    })
    wx.getUserInfo({
    success:res=>{
      const userInfo=res.userInfo;
      this.setData({
          author:userInfo.nickName,
          user:{
            nickName:userInfo.nickName,
            avatarUrl:userInfo.avatarUrl
          }
        })
      }
    })
  },
    chooseImage(event) {
      // console.log(event.currentTarget.dataset.op)
        wx.chooseImage({
          count: 1,
          success: res=>{
            if(event.currentTarget.dataset.op==0){
              this.setData({
                      content_img:res.tempFilePaths[0],
                    })
              }else{
                      this.setData({
                        answer_img:res.tempFilePaths[0],
                      })
              }
          },
          fail:res=>{
            wx.showToast({
              title: '图片选择失败',
              icon:'none'
            })
          }
        })
      },
        // 预览图片
  previewImg: function (e) {
    //所有图片
     var img=[]
    if(e.currentTarget.dataset.op==0){
      img.push(this.data.content_img)
    }else{
      img.push(this.data.answer_img)
    }
    wx.previewImage({
      //当前显示图片
      current: img[0],
      urls:img
    })
  },
      
/**
   * 删除图片
   */
  removeImg: function(e) {
    if(e.currentTarget.dataset.op==0)
    this.setData({
      content_img:""
    })
    else
    this.setData({
      answer_img:""
    })
  },
  searchclick:function(){
    if(this.data.content_img==''&&this.data.content==''){
      wx.showToast({
        title: '题目不能为空',
        icon:'none'
      })
    }else if(this.data.answer_img==''&&this.data.answer==''){
      wx.showToast({
        title: '答案不能为空',
        icon:'none'
      })
    }else{
      wx.showLoading({
        title:"正在上传"
      })
    }
    if(this.data.content_img!=''&&this.data.answer_img!=''){
      console.log("上传图片")
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定要上传的文件的小程序临时文件路径
          cloudPath: this.timetostr(new Date()),
          filePath: this.data.content_img,
          // 成功回调
          success: res => {
              this.setData({
                con_img:res.fileID
              })
              wx.cloud.uploadFile({
                cloudPath: this.timetostr(new Date()),
                filePath: this.data.answer_img,
                // 成功回调
                success: res => {
                    this.setData({
                      ans_img:res.fileID
                    })
                    this.add_timu()
                  },
                  fail:err=>{
                    wx.showToast({
                      title: '上传失败',
                      icon:'none'
                    })
                    wx.hideLoading()
                    console.log("上传失败：",err)
                  }
                })
          },
          fail:err=>{
            wx.showToast({
              title: '上传失败',
              icon:'none'
            })
            wx.hideLoading()
            console.log("上传失败：",err)
          }
        })
    }
    else if(this.data.content_img!=''){
      console.log("上传题目图片")
      wx.cloud.uploadFile({
        cloudPath: this.timetostr(new Date()),
        filePath: this.data.content_img,
        // 成功回调
        success: res => {
            this.setData({
              con_img:res.fileID
            })
            this.add_timu()
          },
          fail:err=>{
            wx.showToast({
              title: '上传失败',
              icon:'none'
            })
            wx.hideLoading()
            console.log("上传失败：",err)
          }
        })
    }
    else if(this.data.answer_img!=''){
      console.log("上传答案图片")
      wx.cloud.uploadFile({
        cloudPath: this.timetostr(new Date()),
        filePath: this.data.answer_img,
        // 成功回调
        success: res => {
            this.setData({
              ans_img:res.fileID
            })
            this.add_timu()
          },
          fail:res=>{
            wx.showToast({
              title: '上传失败',
            })
            wx.hideLoading()
            console.log("上传失败：",err)
          }
        })
    }else{
      this.add_timu()
    }
  
},
  add_timu(){
    console.log("上传题库中")
    db.collection("up_timu").add({
      data:{
        author:this.data.author,
        content:this.data.content,
        answer:this.data.answer,
        con_img:this.data.con_img,
        ans_img:this.data.ans_img,
        score:0,
        timu_status:"正在审核",
        status:false,
        pinglun:this.data.pinglun,
        status:this.data.shoucang,
        type:3
      }
    }).then(res=>{
      this.add_dongtai(res._id)
    }).catch(err=>{
      wx.showToast({
        title: '上传失败',
      })
      wx.hideLoading()
      console.log("上传失败：",err)
    })
  },
  // 自动上传题目动态到社区
  add_dongtai(timu_id){
    console.log("上传社区中")
    var month=new Date().getMonth()+1
    wx.cloud.database().collection('topic').add({
      data: {
        date: new Date(),
        timu_id:timu_id,
        content:this.data.content,
        con_img:this.data.con_img,
        time: new Date().getFullYear()+"/"+month+"/"+new Date().getDate()+' '+new Date().getHours()+":"+new Date().getMinutes(),
        user:this.data.user,
        type:3
      }     
        }).then(res=>{
          wx.hideLoading()
          wx.showToast({
            title: '上传成功',
            duration:1500,
          })
          this.setData({
            answer_img:'',
            content_img:'',
            answer:'',
            content:''
          })
        }).catch(err=>{
          wx.showToast({
            title: '上传失败',
          })
          wx.hideLoading()
          console.log("上传失败：",err)
        })
      },

  timetostr(time){
    var randnum = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    var str ="timu/"+ randnum +"_"+ time.getMilliseconds() + ".png";
    return str;
  },
  input1: function(e) {//接受题目
    this.setData({
      content: e.detail.value
    })
  },
  input2: function(e) {//接受答案
    this.setData({
      answer: e.detail.value
    })
  },
  changeType:function(e){
    var op=e.currentTarget.dataset.op
    if(op==0){
      this.setData({
        con_type:1,
        content_img:""
      })
    }else if(op==1){
      this.setData({
        con_type:2,
        content:""
      })
    }else if(op==2){
      this.setData({
        ans_type:1,
        answer_img:""
      })
    }else{
      this.setData({
        ans_type:2,
        answer:""
      })
    }
  }
})