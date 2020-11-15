// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID;
  const weiboId = event.weiboId;
  return await db.collection("topic").doc(weiboId).update({
    data:{
      "praises":_.push(openId)
    }
  })
  
}