// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数

exports.main = async (event, context) => {
 if(event.action=="update_push"){ //更新 添加收藏
  return await cloud.database().collection("User_Collect_Papers")
  .where({
    User_openid:event.id
  })
  .update({
    data:{collect_paper: _.push(event.paperurl)},
    success:res=>{
      console.log("cloud向云数据库里更新用户数据success",res)
    }
  })
 }else if(event.action=="update_del"){//取消收藏

  return await cloud.database().collection("User_Collect_Papers")
  .where({
    User_openid:event.id
  })
  .update({
    data:{collect_paper: _.pull(event.paperurl)},
    success:res=>{
      console.log("cloud向云数据库里del更新用户数据success",res)

    }
  })
 }
 else{//查询
  console.log("cloud云函数 getUserPapers调用",event)
  return await cloud.database().collection("User_Collect_Papers")
  .where({
    User_openid:event.id
  })
  .get({
    // data:{collect_paper: _.push(event.paperurl)},
    success:res=>{
      console.log("cloud向云数据库里查询用户数据success",res)
    }
  })

 }



  
}