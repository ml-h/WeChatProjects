// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var id=event.id;
  var  paper_fileID=event.paper_fileID;
  db.collection('topic').doc(id).update({
        data: {
          paper_status:"已纳入题库"
        }
    })
    db.collection('FeiTongKao').where({
        paper_FileID:paper_fileID
      }).update({
        data: {
         status:true
        }
      })
    }
