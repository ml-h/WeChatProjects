var can;

var stars = [];
var myStar=false;
var db=wx.cloud.database();
/**定义星星 */

var starObj = function () {
  this.x;
  this.y;
  this.picNo;
  this.timer;
}

/**初始化数据 */

starObj.prototype.init = function (a,b) {
  this.x = Math.random() * 25+a;
  this.y = Math.random() * 30+b;
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
  var flag=1;
      if(x<0.125*this.data.width){
        var r=0;
          if(y<0.8*this.data.height&&y>this.data.height*0.7){
              var c=0;
          }else if(y<0.7*this.data.height&&y>this.data.height*0.55){
              var c=1;}
          else if(y<0.55*this.data.height&&y>this.data.height*0.45){
            var c=2;}
          else if(y<0.45*this.data.height&&y>this.data.height*0.35){
            var c=3;
          }
          else if(y<0.35*this.data.height&&y>this.data.height*0.15){
            var c=4;
        }else{
          flag=0;
        }
      }else if(x<0.25*this.data.width){
        var r=1;
        if(y<0.8*this.data.height&&y>this.data.height*0.7){
          var c=0;
      }else if(y<0.7*this.data.height&&y>this.data.height*0.55){
          var c=1;}
      else if(y<0.55*this.data.height&&y>this.data.height*0.45){
        var c=2;}
      else if(y<0.45*this.data.height&&y>this.data.height*0.35){
        var c=3;
      }
    else if(y<0.35*this.data.height&&y>this.data.height*0.15){
        var c=4;
      }else{
        flag=0;
      }
      }else if(x<0.375*this.data.width){
        var r=2;
        if(y<0.8*this.data.height&&y>this.data.height*0.7){
          var c=0;
      }else if(y<0.7*this.data.height&&y>this.data.height*0.55){
          var c=1;}
      else if(y<0.55*this.data.height&&y>this.data.height*0.45){
        var c=2;}
      else if(y<0.45*this.data.height&&y>this.data.height*0.35){
        var c=3;
      }
    else if(y<0.35*this.data.height&&y>this.data.height*0.15){
        var c=4;
      }else{
        flag=0;
      }
      }else if(x<0.5*this.data.width){
        var r=3;
        if(y<0.8*this.data.height&&y>this.data.height*0.7){
          var c=0;
      }else if(y<0.7*this.data.height&&y>this.data.height*0.55){
          var c=1;}
      else if(y<0.55*this.data.height&&y>this.data.height*0.45){
        var c=2;}
      else if(y<0.45*this.data.height&&y>this.data.height*0.35){
        var c=3;
      }
    else if(y<0.35*this.data.height&&y>this.data.height*0.15){
        var c=4;
      }else{
        flag=0;
      }
      }else if(x<0.625*this.data.width){
        var r=4;
        if(y<0.8*this.data.height&&y>this.data.height*0.7){
          var c=0;
      }else if(y<0.7*this.data.height&&y>this.data.height*0.55){
          var c=1;}
      else if(y<0.55*this.data.height&&y>this.data.height*0.45){
        var c=2;}
      else if(y<0.45*this.data.height&&y>this.data.height*0.35){
        var c=3;
      }
    else if(y<0.35*this.data.height&&y>this.data.height*0.15){
        var c=4;
      }else{
        flag=0;
      }
      }else if(x<0.75*this.data.width){
        var r=5;
        if(y<0.8*this.data.height&&y>this.data.height*0.7){
          var c=0;
      }else if(y<0.7*this.data.height&&y>this.data.height*0.55){
          var c=1;}
      else if(y<0.55*this.data.height&&y>this.data.height*0.45){
        var c=2;}
      else if(y<0.45*this.data.height&&y>this.data.height*0.35){
        var c=3;
      }
    else if(y<0.35*this.data.height&&y>this.data.height*0.15){
        var c=4;
      }else{
        flag=0;
      }
      }else if(x<0.875*this.data.width){
        var r=6;
        if(y<0.8*this.data.height&&y>this.data.height*0.7){
          var c=0;
        }else if(y<0.7*this.data.height&&y>this.data.height*0.55){
            var c=1;}
        else if(y<0.55*this.data.height&&y>this.data.height*0.45){
          var c=2;}
        else if(y<0.45*this.data.height&&y>this.data.height*0.35){
          var c=3;
        }
    else if(y<0.35*this.data.height&&y>this.data.height*0.15){
        var c=4;
      }else{
        flag=0;
      }
      }else if(x<this.data.width){
        var r=7;
        if(y<0.8*this.data.height&&y>this.data.height*0.7){
          var c=0;
        }else if(y<0.7*this.data.height&&y>this.data.height*0.55){
            var c=1;}
        else if(y<0.55*this.data.height&&y>this.data.height*0.45){
          var c=2;}
        else if(y<0.45*this.data.height&&y>this.data.height*0.35){
          var c=3;
        }
      else if(y<0.35*this.data.height&&y>this.data.height*0.15){
          var c=4;
        }else{
          flag=0;
        }
    }
      else{
        flag=0;
      }
      if(flag==1){
      this.setData({
        notice:"教室:东2-"+this.data.room[c*8+r]+",当前人数:"+this.data.room_num[c*8+r]
      })
    }
},
  /**

   * 生命周期函数--监听页面加载

   */

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '东二'
    })
    var time=new Date().getHours()
    // time=10;
    if(time>17||time<6){
      this.setData({
       bc_url:"https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/1n.png?sign=3a692208916197337023015d0523c1f5&t=1608620478",
        height: wx.getSystemInfoSync().windowHeight,
        width: wx.getSystemInfoSync().windowWidth
      })
    }else{
      this.setData({
      bc_url:"https://7465-test-yan-3gp1h1ez7f7c6a02-1304167464.tcb.qcloud.la/map/1m.png?sign=90c02276de9aa8b6ed098bbf074d2e5a&t=1608620586",
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })  }
    db.collection("NowUser").doc("east2").get()
    .then(res => {
      for(var r in res.data.room.valueOf()){
        this.data.room.push(r)
        this.data.room_num.push(res.data.room[r])
      }
      can = wx.createCanvasContext('canvas');
      /* 批量生成星星 并且初始化 */
      var s=0;
   
      for(var j=0;j<39;j++){
        // console.log(0.15*(j%7),(0.7- Math.floor(j/7)*0.13))
        for (var i = 0; i <this.data.room_num[j]; i++,s++) {
          var obj = new starObj();
          stars.push(obj);
          stars[s].init(0.13*(j%8)*this.data.width,(0.7- Math.floor(j/8)*0.13)*this.data.height);
        }
    }
    this.setData({
      sum:s
    })
    this.gameloop(); //进行

    can.draw();
    })
    .catch(err => {
      console.error(err)
    })

  },
drawMe(){
  myStar=true
  var obj = new starObj();
  stars.push(obj);
  stars[this.data.sum].init(0.13*(this.data.index%8)*this.data.width,(0.7- Math.floor(this.data.index/8)*0.13)*this.data.height);
},

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
    if(myStar){
      stars[i].undate();
      stars[i].draw('../common/images/star2.png',10,10);
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

  confirm:function(e) {
    console.log(e)
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })

    this.drawMe()
  },
  select:function() {
    console.log(this.data.hiddenmodalput)
    this.setData({

      hiddenmodalput: false
    })
  },





 



 

})