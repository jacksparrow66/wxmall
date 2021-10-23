// 1. 页面加载的时候
// 1. 从缓存中获取购物车数据，渲染到页面中
// 这些数据  checked =true
// 2. 微信支付
// 1. 那些人 那些账号 可以实现微信支付
// 1. 企业账号
// 2. 企业账号的小程序后台中  必须  给开发者 添加白名单  
//  1.一个appid可以同时绑定多个开发者
// 2. 这些开发者就可以公用这个appid 和它的开发权限
// 3. 判断支付
// 1.先判断缓存中有没有token
// 2.没有就先去跳转到授权页面，进行获取token
// 3.有token
import {
  request
} from '../../request/index';
import {
  showToast,
  showModal
} from '../../utils/asyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放位置信息
    address: {},
    // 存储的是准备付款的信息
    cart: [],
    // 存储是否全部选中
    // 存储总价格
    totalPrice: 0,
    // 存储勾选的总数量
    totalNum: 0
  },

  onLoad() {

  },
  /**
   * 生命周期函数--监听页面加载
   */

  onShow() {
    // 去浏览器缓存中获取数据出来，然后渲染到页面上
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v => v.checked)
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(ele => {
      if (ele.checked) {
        totalPrice += ele.num * ele.goods_price
        totalNum += ele.num
      }
    });
    // 判断数组是否为空，如果是空就让全选框显示不勾选
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },

  // 点击支付触发的函数
  async handleOrderPay() {
    const {
      confirm
    } = await showModal('你确定支付吗？弄错概不退款喔')
    if (confirm) {
      let StorageCart = wx.getStorageSync("cart");
      const cart = StorageCart.filter(v=>!v.checked)
      wx.setStorageSync("cart", cart);
      wx.navigateBack({
        delta: 1
      });
      await showToast('你还真付啊', '../../icon/索隆.png');
    }
  }
})