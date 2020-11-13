Page({

  
  data: {
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['01 哲学', '02 经济学','03 法学', '04 教育学','05 文学','06 历史学', '07 理学','08 工学','09 农学', '10 医学','11 军事学','12 管理学','13 艺术学'],
    //下拉列表的数据
    index: 0,//选择的下拉列表下标
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
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  }
})