// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let action=event.action;
  console.log("调用assget")
  // 获取该动态的举报信息
  if(action=="get"){
    console.log("调用get")
    let res= await db.collection("jubao").where({
      dongtai_id:event.topicId
    }).get()
    console.log(res)
    return res
  }
else if(action=="new"){
  return await db.collection("jubao").add({
    data:{
      dongtai_id:event.topicId,
      num:1,
      user_id:[event.userid]
    }
  })
}else if(action=="add"){
  console.log("增加的用户id",event.userid)
  return await db.collection("jubao").where({
    dongtai_id:event.topicId
  }).update({
    data:{
      // star_docUrl: _.push(event.url),
      user_id:_.push(event.userid),
      num:_.inc(1)
    }
})
}else if(action=="delete"){
  return await db.collection("jubao").where({
    dongtai_id:event.topicId
  }).remove()
}
}



