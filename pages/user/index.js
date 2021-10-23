// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储用户数据
    userInfo:{},
    // 收藏的数量
    collectNums:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  
  // 用户点击登入触发的函数
  handlegetuserinfo (e) {
    const {userInfo} = e.detail;
    let collect = wx.getStorageSync("collect")||[];
    let collectNums = collect.length
    wx.setStorageSync("userInfo", userInfo);
    this.setData({userInfo,collectNums})
  }
})