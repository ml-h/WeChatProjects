Page({
  data: {
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectShow2: false,
    //下拉列表的数据
    selectData: ['01 哲学', '02 经济学','03 法学', '04 教育学','05 文学','06 历史学', '07 理学','08 工学','09 农学', '10 医学','11 军事学','12 管理学','13 艺术学'],
    selectData2:['0101 哲学'],
    index: 0,//选择的下拉列表下标
    index2:0,
  },
  getData(){
    if((this.data.index+1)<10){
    var id="0"+(this.data.index+1).toString();}
    else{
      var id=(this.data.index+1).toString();
    }
    wx.cloud.callFunction({
      name:"query_zhuanye",
      data:{
        id:id
      }
    }).then(
      res=>{
      this.setData({
        selectData2:res.result.data.list
      })
      // console.log("这里是返回",res.result.data.list);
    }).catch(err=>{
      console.log("请求数据库错误"+err);
    });

  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '上传文档'
    }),
    this.setData({
      select:this.data.selectData[this.data.index],
      select2:this.data.selectData2[this.data.index2]
    })
  },
    // 点击下拉显示框
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
    this.getData();
  },



  selectTap2() {
    this.setData({
      selectShow2: !this.data.selectShow2
    });
  },
  // 点击下拉列表
  optionTap2(e) {
    let Index2 = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    console.log(Index2)
    this.setData({
      index2: Index2,
      selectShow2: !this.data.selectShow2,
      select2:this.data.selectData2[this.data.index2]
    });
  }

})