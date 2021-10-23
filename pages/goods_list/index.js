// pages/goods_list/index.js
// 导入网络请求封装函数
import {
  request
} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs的数据
    tabs: [{
        id: 0,
        status: true,
        title: '综合'
      }, {
        id: 1,
        status: false,
        title: '销量'
      },
      {
        id: 2,
        status: false,
        title: '价格'
      },
    ],
    // 存放商品列表的数据
    goods_list: []
  },
  QueryInfo: {
    query: '',
    cid: '',
    // 页码数
    pagenum: 1,
    // 每页多少条数据
    pagesize: 10
  },
  tatilpage: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsInfo()
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

  // 获取商品数据
  async getGoodsInfo() {
    const result = await request({
      url: "/goods/search",
      data: this.QueryInfo
    })
    const total = result.total
    this.tatilpage = Math.ceil(total / this.QueryInfo.pagesize)
    this.setData({
      goods_list: [...this.data.goods_list, ...result.goods],
    })
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
  },

  // 滑动到最底部触发这个函数
  onReachBottom() {
    if (this.QueryInfo.pagesize >= this.tatilpage) {
      console.log("没有下一页了");
      wx.showToast({
        title: '没有下一页了，老铁',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
    } else {
      wx.showToast({
        title: '正在加载下一页',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
      this.QueryInfo.pagesize++
      this.getGoodsInfo();
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    // 重置商品列表
    this.data.goods_list = [];
    // 重置页码数
    this.QueryInfo.pagenum = 1;
    // 重新获取商品列表数据
    this.getGoodsInfo();
  }
})