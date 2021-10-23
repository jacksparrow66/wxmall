// pages/search/index.js

import {
  showToast
} from '../../utils/asyncWX'
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索推荐  数据
    searchGoods: [],
    // 控制取消按钮显示还是隐藏
    isShow:true,
    // input搜索框的值
    InputValue:''
  },
  Timeid: -1,
  handleInputChange(e) {
    // 1. 获取输入框的值
    const {
      value
    } = e.detail
    // 2. 检测合法性
    if (!value.trim()) {
      // showToast('请输入搜索值')
      return
    }
    this.setData({
      isShow:false,
      InputValue:value
    })
    // 运行到这里说明搜索值合法，不是空字符串
    // 设置防抖
    clearTimeout(this.Timeid)
    this.Timeid = setTimeout(() => {
      this.search(value)
    }, 1000);
  },

  // 发送网络请求获取搜索建议  数据
  async search(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    })
    this.setData({
      searchGoods: res
    })
  },

  // 点击取消触发的函数
  handlebtn () {
    this.setData({
      InputValue:'',
      isShow:true,
      searchGoods:[]
    })
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