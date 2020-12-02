const db=wx.cloud.database();
const _ = db.command
Page({

data:{
  xuanze:['A','B','C','D','E','F','G'],
  bg:['background-color:rgb(146, 153, 153);','background-color:rgb(146, 153, 153);','background-color:rgb(146, 153, 153);'
  ,'background-color:rgb(146, 153, 153);','background-color:rgb(146, 153, 153);','background-color:rgb(146, 153, 153);','background-color:rgb(146, 153, 153);'],
  xuan_num:4,
  choice:[],
  content:"",
  answer:[],
},
xuan_num(e){
  const cur_num=this.data.xuan_num
  if(e.target.dataset.op=='-1'){
     
    if((cur_num-1)<2){
      wx.showToast({
        title: '选项不能少于2',
        icon:'none'
      })
    }else{
      var index=this.data.answer.indexOf(this.data.xuanze[cur_num-1])
    if(index>-1){
      this.data.answer.splice(index,1)
    }
    this.setData({
      xuan_num:cur_num-1
    })}
  }else{
    if((cur_num+1)>7){
      wx.showToast({
        title: '选项不能大于7',
        icon:'none'
      })
    }else{
    this.setData({
      xuan_num:cur_num+1
    })}
  }
},
content: function(e) {//接受题目
  this.setData({
    content: e.detail.value
  })
},
answer: function(e) {//接受答案
  var an=e.target.dataset.an
  var index= this.data.answer.indexOf(an)
  var change='bg['+e.target.dataset.index+']'
  // console.log(an,index)
  if(index==-1){
      this.data.answer.push(an),
      this.setData({
        [change]:'background-color:rgb(100, 153, 153)'
    })
  }else{
    this.data.answer.splice(index,1),  
    this.setData({
      [change]:'background-color:rgb(146, 153, 153)'
    })
  }
},

formSubmit:function(e){
  if(this.data.content==''){
    wx.showToast({
      title: '问题不能为空',
      icon:'none'
    })
  }else if(this.data.answer==''){
    wx.showToast({
      title: '答案不能为空',
      icon:'none'
    })
  }else if(e.detail.value.A==""||e.detail.value.B==""){
    wx.showToast({
      title: '选项不能为空',
      icon:'none'
    })
  }else{
    wx.showLoading({
      name:"正在上传"
    })
  db.collection("up_timu").add({
    data:{
      author:this.data.user.nickName,
      content:this.data.content,
      answer:this.data.answer.join(","),
      score:0,
      timu_status:"正在审核",
      status:false,
      choice:e.detail.value,
      pinglun:[],
      type:4
    }
  }).then(res=>{
    this.add_dongtai(res._id)
    wx.hideLoading()
    wx.showToast({
      title: '上传成功',
      duration:1500,
    })

  }).catch(err=>{
    wx.hideLoading()
    wx.showToast({
      title: '上传失败',
    })
    console.log("上传失败：",err)
  })
}
},
// 自动上传题目动态到社区
add_dongtai(timu_id){
  var month=new Date().getMonth()+1
  wx.cloud.database().collection('topic').add({
    data: {
      date: new Date(),
      timu_id:timu_id,
      content:this.data.content,
      time: new Date().getFullYear()+"/"+month+"/"+new Date().getDate()+' '+new Date().getHours()+":"+new Date().getMinutes(),
      user:this.data.user,
      type:4
    }     
      })
    },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '上传选择题'
    })
      wx.getUserInfo({
        success:res=>{
          const userInfo=res.userInfo;
            this.setData({
              user:{
                nickName:userInfo.nickName,
                avatarUrl:userInfo.avatarUrl
              }
            })
          }
        })
    }


})