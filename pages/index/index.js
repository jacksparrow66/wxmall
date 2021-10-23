//Page Object

// 导入封装的网络请求函数
import {
  request
} from '../../request/index.js'

Page({
  data: {
    // 存放轮播图数据
    SwiperList: [],
    // 存放导航数据
    CategoryList: [],
    // 存放楼层数据
    FloorList: []
  },
  //options(Object)
  onLoad: function (options) {
    // 调用获取轮播图数据
    this.getSwiperList();
    // 调用获取导航数据
    this.getCategoryList();
    // 调用获取楼层数据
    this.getFloorList();
  },


  // 获取轮播图数据的方法
  async getSwiperList() {
    const result = await request({
      url: '/home/swiperdata'
    })
    this.setData({
      SwiperList: result
    })
  },

  // 获取导航数据的方法
  async getCategoryList() {
    const result = await request({
      url: '/home/catitems'
    })
    this.setData({
      CategoryList: result
    })
  },

  // 获取楼层数据的方法
  async getFloorList() {
    const result = await request({
      url: '/home/floordata'
    })
    this.setData({
      FloorList: result
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});