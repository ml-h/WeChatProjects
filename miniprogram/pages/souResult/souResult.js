// 搜索结果界面
const db=wx.cloud.database()//数据库初始化
var i,j,k,count;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    key:"",
    dataObj:[]
    
  },
  
  // getData(){
  //   db.collection("Tilist").where({
  //     content: db.RegExp({
  //       regexp:'.*'+this.data.key,//正则匹配
  //       options:'i',//忽视大小写
  //     })
  //   }).get().then(res=>{
  //     console.log(res);
  //     this.setData({
  //       dataObj:res.data
  //     })
  //   }).catch(err =>{
  //     console.log(err)
  //   })
  // },
 
  getData(){
    db.collection("Tilist").where({
      // content: db.RegExp({
      //   regexp:'.*['+this.data.key+'].*',//正则匹配
      //   options:'i',//忽视大小写
      // })
    }).get().then(res=>{
      // console.log(res);
      // for(i of key){
        // value = res.data.content;
        for(j in res.data){
          // console.log(res.data[j].content)
          count=0;
          for(k in res.data[j].content){
            for(i in this.data.key){
              if(res.data[j].content[i]==this.data.key[k]){
                count++;
                break;
              }
            }
          }
          if(count/(this.data.key.length+res.data[j].content.length-count)>0){//相似度
            console.log(count/(this.data.key.length+res.data[j].content.length))
            // this.setData({
            //     dataObj:res.data[j]
            //   })
            this.data.dataObj.push(res.data[j])
            console.log(this.data.dataObj)
          }
        }
      // }

      // this.setData({
      //   dataObj:res.data
      // })
    }).catch(err =>{
      console.log(err)
    })
  },
  detailclick(event){
    console.log("点击获取的数据",event.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: '../../pages/Tidetails/Tidetails?id='+event.currentTarget.dataset.item._id,
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("搜索结果界面接受的key：",options.key)
    this.setData({
      key:options.key
    }),
    console.log(this.data)
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})