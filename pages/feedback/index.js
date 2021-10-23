// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs的数据存储
    tabs: [{
      id: 0,
      status: true,
      title: '体验问题'
    }, {
      id: 1,
      status: false,
      title: '商品、商家投诉'
    }],
    // 选择图片的存储位置
    chooseImages: []
  },

  //  点击tabs触发的函数
  tabsItemChange(e) {
    // 获取被点击的标题索引
    const {
      index
    } = e.detail
    // 修改原数组
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => {
      i == index ? v.status = true : v.status = false
    });
    // 赋值到data
    this.setData({
      tabs
    })
  },

  // 点击+号添加图片触发的函数
  upimageClick() {
    // 调用小程序的选择图片API
    wx.chooseImage({
      // 同时选中图片的数量
      count: 9,
      // 图片的格式 原图 压缩
      sizeType: ['original', 'compressed'],
      // 图片来源  相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImages: [...this.data.chooseImages, ...result.tempFilePaths]
        })
      },
    });
  },

  handleClick (e){
    const {index} =e.currentTarget.dataset
    let {chooseImages} = this.data
    chooseImages.splice(index,1)
    this.setData({
      chooseImages
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})