var can=wx.createCanvasContext('canvas');
// var myStar=false;
var db=wx.cloud.database();
const _ = db.command;
var stars=[];
var idurl = {
  0:["https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/3n.png?sign=069b57871efe462dbf5dba12154949d6&t=1608623368",
     "https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/3m.png?sign=9d555aa64039a02a16fd501a5057eef8&t=1608623334"],
  1:["https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/2n.png?sign=e4b43d42f7c92e6c0ee3dd31f084bdb5&t=1608623275",
     "https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/2m.png?sign=8d7f32260593df63a4d56c0ae961a58a&t=1608623226"],
  2:["https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/2n.png?sign=e4b43d42f7c92e6c0ee3dd31f084bdb5&t=1608623275",
     "https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/2m.png?sign=8d7f32260593df63a4d56c0ae961a58a&t=1608623226"],
  3:["https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/2n.png?sign=e4b43d42f7c92e6c0ee3dd31f084bdb5&t=1608623275",
     "https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/2m.png?sign=8d7f32260593df63a4d56c0ae961a58a&t=1608623226"],
  5:["https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/1n.png?sign=3a692208916197337023015d0523c1f5&t=1608620478",
     "https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/1m.png?sign=90c02276de9aa8b6ed098bbf074d2e5a&t=1608620586"],
  6:["https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/1n.png?sign=3a692208916197337023015d0523c1f5&t=1608620478",
    "https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/1m.png?sign=90c02276de9aa8b6ed098bbf074d2e5a&t=1608620586"],
  7:["https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/1n.png?sign=3a692208916197337023015d0523c1f5&t=1608620478",
     "https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/1m.png?sign=90c02276de9aa8b6ed098bbf074d2e5a&t=1608620586"],
}
var idname = {
  0:'图书馆',
  1:'西三',
  2:'西二',
  3:'西一',
  4:'东一',
  5:'东二',
  6:'东三',
}

/**定义星星 */

var starObj = function () {
  this.x;
  this.y;
  this.picNo;
  this.timer;
}

/**初始化数据 */

starObj.prototype.init = function (w=25,h=30,a,b) {
  this.x = Math.random() * w+a;
  this.y = Math.random() * h+b;
  this.picNo = Math.floor(Math.random()*10-3);
  this.timer = 0;
}
/**生成星星 */

starObj.prototype.draw = function (img='../../images/star1.png',width=4,height=4) {
  can.drawImage(img, this.picNo * 7, 0, 7, 7, this.x, this.y, width, height);
}
/**动起来 */

starObj.prototype.undate = function () {
  this.picNo += 1;
  if(this.picNo >= 7){
    this.picNo = 0;
  }

}
Page({

  /**

   * 页面的初始数据

   */

  data: {
   
    myStar:false,
    doc_id:['lab','west3','west2','west1','east1','east2','east3'],
    selectData:['101','102','103','104','105','106','107','108',
    '201','202','203','204','205','206','207','208',
    '301','302','303','304','305','306','307','308',
    '401','402','403','404','405','406','407','408',
    '501','502','503','504','505','506','507','508'],
    selectShow: false,
    index: 0,//选择的下拉列表下标
    selectData2:['1','2','3','4','5','6','7','8','9'],
    selectShow2: false,
    index2: 0,//选择的下拉列表下标
    notice:"点击教室查看当前教室人数",
    sum:0,
    num:80, //生成星星数量
    hiddenmodalput: true,
    room:[],
    room_num:[],

  },
  onShow: function (options) {
    can.draw(false)
  },
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
    // 点击下拉列表
    optionTap(e) {
      let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      console.log(Index)
      this.setData({
        index: Index,
        selectShow: !this.data.selectShow,
        select:this.data.selectData[this.data.index]
      });
    },
    selectTap2() {
      this.setData({
        selectShow2: !this.data.selectShow2
      });
    },
      // 点击下拉列表
      optionTap2(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
          index2: Index,
          selectShow2: !this.data.selectShow2,
          select2:this.data.selectData2[this.data.index2]
        });
      },
local:function(e){
  // console.log(e.detail)
  var x=e.detail.x;
  var y=e.detail.y;
  var height=this.data.height;
  var bottom=this.data.bottom+0.1;
  var flag=1;
    if(bottom!=0.78){
        if(y<bottom*height&&y>height*0.85*bottom){
          var c=0;
      }else if(y<0.85*bottom*height&&y>height*0.7*bottom){
          var c=1;
        }else if(y<0.7*bottom*height&&y>height*0.55*bottom){
        var c=2;
      }else if(y<0.55*bottom*height&&y>height*0.4*bottom){
        var c=3;
      }else if(y<0.4*bottom*height&&y>height*0.2*bottom){
        var c=4;
      }else{
      flag=0;
      }
      if(x<0.125*this.data.width){
        var r=0;
      }else if(x<0.25*this.data.width){
        var r=1;
      }else if(x<0.375*this.data.width){
        var r=2;
      }else if(x<0.5*this.data.width){
        var r=3;
      }else if(x<0.625*this.data.width){
        var r=4;
      }else if(x<0.75*this.data.width){
        var r=5;
      }else if(x<0.875*this.data.width){
        var r=6;
      }else if(x<this.data.width){
        var r=7;
    }else{
        flag=0;
      }
      if(flag==1){
      this.setData({
        notice:"教室:"+this.data.room[c*8+r]+",当前人数:"+this.data.room_num[c*8+r]
      })
    }
  }else{
    if(y<bottom*height&&y>height*0.92*bottom){
      var c=0;
  }else if(y<0.92*bottom*height&&y>height*0.88*bottom){
      var c=1;
    }else if(y<0.88*bottom*height&&y>height*0.76*bottom){
    var c=2;
  }else if(y<0.76*bottom*height&&y>height*0.64*bottom){
    var c=3;
  }else if(y<0.64*bottom*height&&y>height*0.5*bottom){
    var c=4;
  }else{
  flag=0;
  }
  if(flag==1){
    this.setData({
      notice:"第:"+(c+1)+"层,当前人数:"+this.data.room_num[c]
    })
  }
  }
},
  /**

   * 生命周期函数--监听页面加载

   */
  onLoad: function (options) {
    // this.judge()
    var id = options.id
    wx.setNavigationBarTitle({
      title: idname[id]
    })
    if(options.id==0){
      this.setData({
        selectData:['一楼','二楼','三楼','四楼','五楼'],
      })
    }
    can.draw(false, function (e) {
      console.log('draw callback')
    })
    var time=new Date().getHours()
    // time=10;
    if(time>17||time<6){
      this.setData({
        select_id:options.id,
        title:idname[id],
       bc_url:idurl[id][0],
         dis:options.id>3?0.13:(options.id==0?0.1:0.125),
         bottom:options.id>3?0.7:(options.id==0?0.68:0.65),
        height: wx.getSystemInfoSync().windowHeight,
        width: wx.getSystemInfoSync().windowWidth
      })
    }else{
      this.setData({
        select_id:options.id,
        title:idname[id],
        dis:options.id>3?0.13:(options.id==0?0.1:0.125),
        bottom:options.id>3?0.7:(options.id==0?0.68:0.65),
      bc_url:idurl[id][1],
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })  }
    db.collection("NowUser").doc(this.data.doc_id[options.id]).get()
    .then(res => {
      this.setData({
        rooms:res.data.room
      })
      for(var r in res.data.room.valueOf()){
        this.data.room.push(r)
        this.data.room_num.push(res.data.room[r])
      }
      /* 批量生成星星 并且初始化 */
      var s=0;
      var dis=this.data.dis;
      var bottom=this.data.bottom;
    
      if(bottom!=0.68){
      for(var j=0;j<39;j++){
        // console.log(0.15*(j%7),(0.7- Math.floor(j/7)*0.13))
        for (var i = 0; i <this.data.room_num[j]; i++,s++) {
          var obj = new starObj();
          stars.push(obj);
          stars[s].init(30,25,0.13*(j%8)*this.data.width,(bottom- Math.floor(j/8)*dis)*this.data.height);
        }
    }}else{
        for(var j=0;j<5;j++){
          // console.log(0.15*(j%7),(0.7- Math.floor(j/7)*0.13))
          for (var i = 0; i <this.data.room_num[j]; i++,s++) {
            var obj = new starObj();
            stars.push(obj);
      
            stars[s].init(200,12,0.15*this.data.width,(bottom+0.06- Math.floor(j%5)*0.07)*this.data.height);
          }
        }
    }
    this.setData({
      sum:s
    })
    this.gameloop(); //进行
    // can.draw();
    })
    .catch(err => {
      console.error(err)
    })

  },
// drawMe(){
//   this.data.myStar=true
//   var obj = new starObj();
//   this.data.stars.push(obj);
//   this.data.stars[this.data.sum].init(0.13*(this.data.index%8)*this.data.width,(0.7- Math.floor(this.data.index/8)*this.data.dis)*this.data.height);
// },

  /**进行*/

  gameloop(){
    setTimeout(this.gameloop, 300);
    this.drawStars();
  },

  /**生成动起来 **/

  drawStars(){
    for (var i = 0; i <this.data.sum; i++) { 
      stars[i].undate();
      stars[i].draw();
    }
    if(this.data.myStar){
      stars[i].undate();
      stars[i].draw('../../images/star2.png',10,10);
    }
    can.draw();
  },





  /**

   * 生命周期函数--监听页面初次渲染完成

   */

  onReady: function () {

   

  },

  modalinput:function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
 

  confirm:function() {
    if(/^\d+$/.test(this.data.study_time)){
    this.getOpenid(this.data.selectData[this.data.index])
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  }else{
      wx.showToast({
        title: '请输入数字！',
        icon:'none'
      })
  }
  },
  input1: function(e) {//接受题目
    this.setData({
      study_time: e.detail.value
    })
  },
  // 获取用户id  调用getCollectPaperurl（）
  getOpenid(room){
    // 获取当前用户的openID
    wx.cloud.callFunction({
      name:"login",
      data:{}
    }).then(res=>{
      this.setData({
        openid:res.result.openid,
        sum:this.data.sum+1
      })
      var month=new Date().getMonth()+1
      this.data.rooms[room]=this.data.rooms[room]+1;
      wx.cloud.callFunction({
        name:"map_star",
        data:{
          didian:this.data.doc_id[this.data.select_id],
          room:this.data.rooms,
          sum:this.data.sum+1
        }
      }).then(res=>{
        console.log(res)
      })
      db.collection('study_record').add({
        data:{
        userId:this.data.openid,
        room_name:this.data.selectData[this.data.index],
        didian:this.data.doc_id[this.data.select_id],
        time: new Date().getFullYear()+"/"+month+"/"+new Date().getDate(),
        start_time: new Date().getTime(),
        study_time:this.data.study_time,
        room:this.data.title+"-"+room,
        }
      }).then(res=>{
        wx.showToast({
          title: '选择成功',
          icon: 'success',
        })
      }).catch(err=>{
        wx.showToast({
          title: '选择失败，请再次尝试',
          icon:'none'
        })
      }) 
     

    })
    .catch(res=>{
      console.log("获取openID 失败",res)
      wx.showToast({
        title: '选择失败，请再次尝试',
      })
    })
  
},  
  select:function() {
    console.log(this.data.hiddenmodalput)
    this.setData({
      hiddenmodalput: false
    })
  },

  // judge(){
  //   db.collection("study_record").where({
  //       _openid:this.data.openid
  //   }).get().then(res=>{
  //     var nowTime=new Data().time();
  //     for(var rec in res.data){
  //         if(rec.start_time+60*res.study_time*1000<nowTime){
  //           wx.cloud.callFunction({
  //             name:"map",
  //             data:{
  //               didian:this.data.doc_id[this.data.select_id],
  //               room:this.data.rooms,
  //               sum:this.data.sum+1
  //             }
  //           })
  //         }
  //     }
  //   })
  // }



 



 

})