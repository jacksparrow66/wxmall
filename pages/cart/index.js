// pages/cart/index.js
import {
  showModal,
  showToast
} from '../../utils/asyncWX'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放位置信息
    address: {},
    // 存储购物车内商品的信息
    cart: [],
    // 存储是否全部选中
    isAllChecked: false,
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
    let address = wx.getStorageSync("address");
    let cart = wx.getStorageSync('cart') || [];
    this.setData({
      address
    })
    this.setCart(cart)
  },

  // 点击添加收货地址
  handleGetAddress() {
    wx.chooseAddress({
      success: (result) => {
        result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
        wx.setStorageSync("address", result);
      },
      fail: () => {},
      complete: () => {}
    });
  },

  // 点击商品的勾选框
  handleItemChange(e) {
    const {
      id
    } = e.currentTarget.dataset
    let cart = this.data.cart;
    const index = cart.findIndex(v => v.goods_id == id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },

  // 点击加减触发的函数
  async handleChangenum(e) {
    // 获取data-自定义属性的值
    const {
      id
    } = e.currentTarget.dataset
    let {
      operation
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    // 通过id获取到商品的下标
    const index = cart.findIndex(v => v.goods_id == id)
    let num = cart[index].num
    if (operation == 'reduce') {
      if (num == 1) {
        // 这一步很有必要喔，因为后面咋if判断中的this不再是指向page，if里面的this是undefind
        var that = this
        // 显示弹窗的那个已经被封装了
        let showMOdal = await showModal("数量小于1会被删除喔")
        console.log(showMOdal);
        if (showMOdal.confirm) {
            cart[index].num -= 1
            cart.splice(index, 1);
            that.setCart(cart)
        }
      } else {
        cart[index].num -= 1
        this.setCart(cart)
      }
    } else {
      cart[index].num += 1
      // 调用封装的方法，去重新获取全选，总价格，总数量等
      this.setCart(cart)
    }
  },

  // 点击结算触发的函数
  async handlejoin_buy () {
    // 1. 先判断是否填写了收货地址
    const {address,totalNum} = this.data;
    if(!address.userName) {
      await showToast('请填写收货地址');
      return
    }
    // 2. 判断是否勾选了商品
    if(totalNum==0) {
      await showToast('请勾选需要的商品');
      return
    }
    // 3. 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  },

  // 封装的方法，用来重新计算 总价格，总数量， 全选。
  setCart(cart) {
    let totalPrice = 0
    let totalNum = 0
    // 让他本来就是true，然后只要循环到有一个的checked是false，就让他变成false，
    let isAllChecked = true
    cart.forEach(ele => {
      if (ele.checked) {
        totalPrice += ele.num * ele.goods_price
        totalNum += ele.num
      } else {
        // 如果运行到这里。说明有一个商品没有被勾选，这个时候全选按钮就不能勾选
        isAllChecked = false
      }
    });
    // 判断数组是否为空，如果是空就让全选框显示不勾选
    isAllChecked = cart.length == 0 ? false : isAllChecked;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      isAllChecked
    })
    wx.setStorageSync("cart", cart);
  }
})