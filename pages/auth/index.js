// pages/auth/index.js
import {login} from '../../utils/asyncWX'
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async handelgetUserInfo (e) {
    // 1. 获取用户信息
    const {encryptedData,reaData,iv,signature} = e.detail;
    // 2. 获取小程序登入成功后的code
    const {code} = await login();
    const loginParams = {encryptedData,reaData,iv,signature};
    // 3. 发送网络请求获取token,请求已经无法请求到了，所以直接使用token
    const token = "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
  } 
})