// pages/category/index.js

// 导入发送网络请求的方法
import {
  request
} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边数据
    leftMenuList: [],
    // 右边数据
    rightMenuList: [],
    // 存储当前索引值
    currentIndex: 0,
    // 滚动距离顶部的距离
    scrollTop:0
  },
  // 接口返回的数据存放
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用获取分类数据的方法
    // 先判断本地存储的数据中，是否有数据， 如果有就不去进行重新获取数据，节约资源，
    let cates = wx.getStorageSync("cates");
    if (!cates) {
      this.getSwiperList()
    } else {
      // 查看数据是否超过了10s，如果超过了10s就重新发送请求获取数据
      if (Date.now() - cates.time > 1000 * 10) {
        this.getSwiperList()
      } else {
        // 可以使用旧的数据
        this.Cates = cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightMenuList = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },
  // 获取调用分类数据的方法
  async getSwiperList() {
    const result = await request({url: '/categories' })
    this.Cates = result;
      // 吧数据存储到本地资源中去
      wx.setStorageSync("cates", {
        time: Date.now(),
        data: this.Cates
      });
      let leftMenuList = this.Cates.map(v => v.cat_name);
      let rightMenuList = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightMenuList
      })
  },
  // 左侧菜单栏点击触发的函数
  left_menuclick(e) {
    let { index } = e.target.dataset
    let rightMenuList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      scrollTop:0,
      rightMenuList
    })
  },
})

  
  