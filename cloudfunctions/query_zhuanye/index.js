// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var id=event.id;
  var idx=event.list.idx
  return await db.collection('zhuanye_fenlei').get();
}