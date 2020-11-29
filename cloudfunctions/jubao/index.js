// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  db.collection("jubao").where({
    dongtai_id:event.id
  }).get().then(res=>{
    if(res.data.length==0){
      db.collection("jubao").add({
        data:{
          dongtai_id:event.id,
          num:1
        }
    })
    }else{
      db.collection("jubao").where({
        dongtai_id:event.id,
      }).update({
        data:{
          num:_.inc(1)
        }
    })
    }
  })
}