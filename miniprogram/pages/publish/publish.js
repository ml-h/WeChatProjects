var that
const db = wx.cloud.database();
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    images: [],
    user: {},
    isPraised:""
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '发布动态',
    })
    // wx.showLoading({
    //   title: '数据加载中',
    // })
    that = this
    // this.getUserInfo()
    this.setData({
      userInfo:{
        "nickName":options.nickName,
        "avatarUrl":options.avatarUrl
      }
    })
  },
  /**
   * 获取填写的内容
   */
  getTextAreaContent: function(event) {
    that.data.content = event.detail.value;
  },

  /**
   * 选择图片
   */
  chooseImage: function(event) {
    wx.chooseImage({
      count: 9,
      success: function(res) {
        wx.showLoading({
          title: '正在上传图片',
        })
        // 设置图片
        that.setData({
          images: res.tempFilePaths,
        })
        that.data.images = []
        // console.log(res.tempFilePaths)
        for (var i in res.tempFilePaths) {
          // 将图片上传至云存储空间
          wx.cloud.uploadFile({
            // 指定要上传的文件的小程序临时文件路径
            cloudPath: that.timetostr(new Date()),
            filePath: res.tempFilePaths[i],
            // 成功回调
            success: res => {
              that.data.images.push(res.fileID)
              console.log("上传至数据库：",res)
            },fail:res=>{
              console.log(res)
            }
          })
        }
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '图片上传成功',
            })
          },
        })
      },
    })
  },
  /**
   * 图片路径格式化
   */
  timetostr(time){
    var randnum = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    var str ="shequ_imgs/"+ randnum +"_"+ time.getMilliseconds() + ".png";
    return str;
  },

  
  /**
   * 保存到发布集合中
   */
  saveDataToServer: function(event) {
    db.collection('topic').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        content: that.data.content,
        time: new Date().getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDate()+' '+new Date().getHours()+":"+new Date().getMinutes(),
        date: new Date(),
        prise_num:0,
        images: that.data.images,
        user: that.data.userInfo,
        type:1,
       isPraised:false
      },
      success: function(res) {
        // 清空数据
        that.data.content = "";
        that.data.images = [];

        that.setData({
          textContent: '',
          images: [],
        })

        that.showTipAndSwitchTab();

      },
    })
  },
  /**
   * 添加成功添加提示，切换页面
   */
  showTipAndSwitchTab: function(event) {
    wx.showToast({
      title: '上传动态成功',
    })
    wx.switchTab({
      url: '../homepage/homepage',
    })
  },
  /**
   * 删除图片
   */
  removeImg: function(event) {
    var position = event.currentTarget.dataset.index;
    this.data.images.splice(position, 1);
    // 渲染图片
    this.setData({
      images: this.data.images,
    })
  },
  // 预览图片
  previewImg: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
      //当前显示图片
      current: this.data.images[index],
      //所有图片
      urls: this.data.images
    })
  },


  /**
   * 发布
   */
  formSubmit: function(e) {
    console.log('图片：', that.data.images)
    this.data.content = e.detail.value['input-content'];
    let textareaVal = this.data.content;
    
    if ((this.data.images.length > 0) || (this.data.content.trim() != '')){
      // 调用云函数
      wx.cloud.callFunction({
        name: 'msgSecCheck', 
        data: {
          content: textareaVal
        }
      }).then(res => {
        console.log(res);
        const errcode = res.result.data.errcode;
        // 检测结果
        if (errcode == 87014){
          wx.showModal({
            title: '提示',
            content: '内容含有敏感内容,请重新输入',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }else{
                console.log('用户点击取消')
              }
            }
          })
          
        }else{
          // 检测合格，保存到发布集
          this.saveDataToServer();
        }
      }).catch(err => {
        // 失败时,也就是违规做一些用户提示,或者禁止下一步操作等之类的业务逻辑操作
        console.log(err);
        wx.showModal({
          title: '提示',
          content: '内容含有敏感内容,请重新输入',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }else{
              console.log('用户点击取消')
            }
          }
        })
      })

    } else {
      wx.showToast({
        icon: 'none',
        title: '写点东西吧',
      })
    }  
   
  },



})