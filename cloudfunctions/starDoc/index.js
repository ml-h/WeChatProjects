// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let action=event.action;
  let openid=event.id;
  if(action=="get"){
    return await db.collection("Star_Doc").where({
      user_id:openid
    }).get()
  }else if(action=="addUser"){
    return await  db.collection("Star_Doc").add({
          data:{
            user_id:openid,
            star_docUrl:[],
            // star_docName:[]
            doc:[]
          }
      })
    }else if(action=="cancel"){
      return await db.collection("Star_Doc").where({
        user_id:openid
      }).update({
        data:{
          star_docUrl: _.pull(event.url),
          // star_docName:_.pull(event.title)
          doc:_.pull(event.doc)
        }
        })
  }else{
    return await db.collection("Star_Doc").where({
      user_id:openid
    }).update({
      data:{
        star_docUrl: _.push(event.url),
        // star_docName:_.push(event.title)
        doc:_.push(event.doc)
      }
      })
  }
}