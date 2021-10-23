// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs的数据
    tabs: [{
        id: 0,
        status: true,
        title: '商品收藏'
      }, {
        id: 1,
        status: false,
        title: '品牌收藏'
      },
      {
        id: 2,
        status: false,
        title: '店铺收藏'
      }, {
        id: 3,
        status: false,
        title: '浏览足迹'
      },
    ],
    // 3个按钮的数据
    tips: [{
      status: true,
      tip: "全部"
    }, {
      status: false,
      tip: "正在热卖"
    }, {
      status: false,
      tip: "即将上线"
    }],
    // 被收藏的商品
    collect: [],
    // 浏览记录
    lookFootPrint:[]
  },
  // 点击三个按钮触发的函数
  handleTextClick(e) {
    const {
      index
    } = e.currentTarget.dataset
    let {
      tips
    } = this.data
    tips.forEach((v, i) => {
      v.status = i === index
    });
    this.setData({
      tips
    })
  },

  // tabs触发发送的函数
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取收藏的数据，渲染出来
    let collect = wx.getStorageSync('collect');
    // 获取浏览足迹数据，渲染
    let lookFootPrint =wx.getStorageSync("lookFootPrint");
    // 获取id的值，因为有的时候是不传递的值，所以如果id没有值就默认0
    const id = options.id || 0
    let {tabs} = this.data
    tabs.forEach((v,i) => {
      v.status=i==id
    });
    this.setData({
      collect,lookFootPrint,tabs
    })
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