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
    isLike: false,
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布动态',
    })
    wx.showLoading({
      title:'数据加载中',
    })
    that = this
    wx.hideLoading()

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
      count: 6,
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
              title: '上传成功',
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
    var str = randnum +"_"+ time.getMilliseconds() + ".png";
    return str;
  },

  /**
   * 发布
   */
  formSubmit: function(e) {
    console.log('图片：', that.data.images)

    this.data.content = e.detail.value['input-content'];
      if (this.data.images.length > 0) {
        this.saveDataToServer();
      } else if (this.data.content.trim() != '') {
        this.saveDataToServer();
      } else {
        wx.showToast({
          icon: 'none',
          title: '写点东西吧',
        })
      }
  },
  /**
   * 保存到发布集合中
   */
  saveDataToServer: function(event) {
    db.collection('topic').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        content: that.data.content,
        date: new Date(),
        images: that.data.images,
        user: app.globalData.userInfo,
        isLike: that.data.isLike,
        type:1
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





})