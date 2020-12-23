// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
let db=cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
if(event.didian=='east1'){
  db.collection('NowUser').doc("sum").update({
    data:{  
       sum:_inc(1),
      east1:event.sum
    }
})}else if(event.didian=='east2'){
  db.collection('NowUser').doc("sum").update({
    data:{
      sum:_inc(1),
      east2:event.sum
    }
})}else if(event.didian=='east3'){
  db.collection('NowUser').doc("sum").update({
    data:{   sum:_inc(1),
      east3:event.sum
    }
})}if(event.didian=='west1'){
  db.collection('NowUser').doc("sum").update({
    data:{   sum:_inc(1),
      west1:event.sum
    }
})}else if(event.didian=='west2'){
  db.collection('NowUser').doc("sum").update({
    data:{   sum:_inc(1),
      west2:event.sum
    }
})}else if(event.didian=='west3'){
  db.collection('NowUser').doc("sum").update({
    data:{   sum:_inc(1),
      west3:event.sum
    }
})}else{
    db.collection('NowUser').doc("sum").update({
      data:{
        sum:_inc(1),
        lab:event.sum
      }
  })
}
  return await db.collection('NowUser').doc(event.didian).update({
        data:{
          room:event.room,
          sum:event.sum
        }
  })

}