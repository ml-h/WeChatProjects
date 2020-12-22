// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  // const openId = wxContext.OPENID;
  // const weiboRes = await db.collection('topic').orderBy('date', 'desc').get()
  // const topics = weiboRes;
  return await db.collection("topic").get()

  if(topics.length>0){
    topics.forEach((topic,index)=>{
      topic.isPraised=false;
      if(topic.praises&&topic.praises.length>0){
        topic.praises.forEach((praise,index)=>{
          if(praise==openId){
            topic.isPraised=true;
          }
        })
      }
    })
  }

}