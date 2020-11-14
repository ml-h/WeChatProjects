Page({
  
  data: {
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectShow2: false,
    //下拉列表的数据
    selectData: ['01 哲学', '02 经济学','03 法学', '04 教育学','05 文学','06 历史学', '07 理学','08 工学','09 农学', '10 医学','11 军事学','12 管理学','13 艺术学'],
    selectData2:['0101 哲学'],
    index: 0,//选择的下拉列表下标
    index2:0,
    selectPaperType: ['Philosophy_papers', 'Economics_papers','Law_papers', 'Education_papers','Literature_papers','History_papers', 'Science_papers','Engineer_papers','Agriculture_papers', 'Medical_papers','Stragetics_papers','Management_papers','Art_papers','Politics_papers'],
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
    console.log(Index2)
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
        console.log("调用云函数",res)
        that.data.tempfile_url0=res.tempFiles[0].path
        that.data.tempfile_time=res.tempFiles[0].time
        that.data.tempfile_size=res.tempFiles[0].size
        that.data.tempfile_name=res.tempFiles[0].name
        that.data.tempfile_type=res.tempFiles[0].type
        that.setData({
          choose_paper:true
        })
        
      }
    })
  },
// 点击上传按钮，上传到云端
upload_paper_yun(){
  console.log(this.data.selectData[1],this.data.selectData[this.data.index],this.data.selectPaperType[13])
  wx.cloud.uploadFile({  
    //存储的路径 科目分类/时间+文件名
    cloudPath:this.data.selectPaperType[this.data.index]+'/'+new Date().getTime()+this.data.tempfile_name,
    filePath:this.data.tempfile_url0,
    success:res=>{
      console.log("文件信息 ",res)
      this.data.tempfile_url=res.fileID
      console.log("文件信息 ",res)
      wx.showToast({
        icon:"success",
        title: '上传文件成功',
      })
      // 把文件信息存储到云数据库
      this.add_paperList()
    },fail:console.error
  })
},

// 把文件信息存储到云数据库
  add_paperList(){

    var date= new Date();
    var myDate =date.getHours()+':'+date.getMinutes()+'  '+date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    // 存储到相应类别的数据库集合中 this.data.selectPaperType[13]
    console.log("database ",this.data.selectPaperType[this.data.index])
    wx.cloud.database().collection(this.data.selectPaperType[this.data.index]).add({
      data:{
        paper_name:this.data.tempfile_name,
        paper_url:this.data.tempfile_url,
        paper_size:this.data.tempfile_size,
        paper_time: myDate,
        paper_loader:"题库",
      },
      success(res){
        console.log("试题信息存储到数据库success",res)
      },fail(res) { console.log(res) }
    })

  }

})