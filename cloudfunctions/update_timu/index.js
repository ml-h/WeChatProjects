// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var id=event.id;
  db.collection('up_timu').doc(id).update({
        data: {
          timu_status:"已纳入题库"
        }
    })
    db.collection('up_timu').doc(id).get().then(res=>{
      db.collection('Tilist').add({
        data:res.data
      })
    })
    }
