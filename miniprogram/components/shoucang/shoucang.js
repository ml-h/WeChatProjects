// components/shoucang/shoucang.js
let shoucang=false
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl:"../../images/shoucang2.png"
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    saveClick(){
      if(shoucang){
        this.setData({
          imgUrl:"../../images/shoucang2.png"
        })
        shoucang=false
      }else{
        this.setData({
          imgUrl:"../../images/shoucang.png"
        })
        shoucang=true
      }
    },

  }
})
