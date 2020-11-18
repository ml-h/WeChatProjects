Page({
  
  data: {
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectShow2: false,
    //下拉列表的数据
    selectData: ['01 哲学', '02 经济学','03 法学', '04 教育学','05 文学','06 历史学', '07 理学','08 工学','09 农学', '10 医学','11 军事学','12 管理学','13 艺术学'],
    selectData2:['0101 哲学'],
    index: 0,//选择的下拉列表下标
    index2:0,
    selectPaperType: ['哲学', '经济学','法学', '教育学','文学','历史学', '理学','工学','农学', '医学','军事学','管理学','艺术学'],
    index: 0,//选择的下拉列表下标
    paperurl:"",
    tempfile_url0:"",//临时
    tempfile_url:"",//存到数据库
    tempfile_name:"",
    tempfile_size:"",
    tempfile_type:"",
    tempfile_time:"",
    choose_paper:"",//选择上传的文件后页面显示文件图标
    course_type:""//下拉框中选择的科目分类
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

 

  // 点击下拉显示框
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '上传文档'
    }),
    this.setData({
      select:this.data.selectData[this.data.index],
      select2:this.data.selectData2[this.data.index2]
    })
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
    this.setData({
      index2: Index2,
      selectShow2: !this.data.selectShow2,
      select2:this.data.selectData2[this.data.index2]
    });
  },

  // 选择要上传的文档
  upload_paper(){
    let that=this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success (res) {
        wx.showToast({
          icon:"success",
          title: '选择文件成功',
        })
        // console.log("调用云函数",res)
        var date= new Date();
        var myDate =date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        that.data.tempfile_url0=res.tempFiles[0].path
        that.data.tempfile_time=myDate
        that.data.tempfile_size=res.tempFiles[0].size
        that.data.tempfile_name=res.tempFiles[0].name
        that.data.tempfile_type=res.tempFiles[0].type
        that.setData({
          tempfile_name:res.tempFiles[0].name,
          choose_paper:true
        })
        
      }
    })
  },
// 点击上传按钮，上传到云端
upload_paper_yun(){
   wx.cloud.uploadFile({  
    //存储的路径 科目分类/时间+文件名
    cloudPath:"feiTongKao"+"/"+this.data.selectPaperType[this.data.index]+'/'+new Date().getTime()+this.data.tempfile_name,
    filePath:this.data.tempfile_url0,
    success:res=>{
      this.data.tempfile_url=res.fileID
        this.add_paperList()
      // 把文件信息存储到云数据库
    },fail:res=>{
      console.error
      wx.showToast({
        icon:"fail",
        title: '上传文件失败',
      })
    }
  })
},

// 把文件信息存储到云数据库
  add_paperList(){
    // 存储到相应类别的数据库集合中 this.data.selectPaperType[13]
    wx.cloud.database().collection("FeiTongKao").add({
      data:{
        paper_name:this.data.tempfile_name,
        paper_FileID:this.data.tempfile_url,
        paper_size:this.data.tempfile_size,
        paper_time:this.data.tempfile_time,
        paper_type:this.data.selectData2[this.data.index2],
        paper_loader:"题库",
        status:true
      },
      success:res=>{
        wx.showToast({
          icon:"success",
          title: '上传文件成功',
        })
      },fail:res=> { console.log(res) }
    })
  },

}
)