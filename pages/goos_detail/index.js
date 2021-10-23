// pages/goos_detail/index.js

// 导入网络请求封装函数
import {
  request
} from '../../request/index.js'
import {
  showToast
} from '../../utils/asyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储商品详情的数据
    goodsObj: {},
    // 轮播默认数据，如果接口中没有轮播数据，就使用这个
    swiperdata: ["https://i.bmp.ovh/imgs/2021/10/a7d78e946a959b0e.jpg", "https://s3.bmp.ovh/imgs/2021/10/84e38d2b1ac0045d.jpeg", "https://s3.bmp.ovh/imgs/2021/10/94fdb65d724c882c.jpeg"],
    // 商品是否收藏
    isCollect: false
  },
  goodsInfo: {},


  // 浏览足迹的方法
  lookFootPrint() {
    let lookFootPrint = wx.getStorageSync('lookFootPrint') || [];
    const index = lookFootPrint.findIndex (v=>v.goods_id==this.goodsInfo.goods_id)
    // index等于-1说明，数组中没有这个商品，如果等于-1说明没有
    // 如果没有就添加进数组中，如果有，就吧这个商品提前到最前面
    if(index!=-1) {
      lookFootPrint = lookFootPrint.filter(v=>v.goods_id!=this.goodsInfo.goods_id) 
      console.log(lookFootPrint);
      lookFootPrint.unshift(this.goodsInfo)     
    }else{
      lookFootPrint.unshift(this.goodsInfo)
    }
    wx.setStorageSync("lookFootPrint", lookFootPrint);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options
    const {
      goods_id
    } = options
    // 调用获取商品数据的方法
    this.getGoodsDetails(goods_id)
    // 调用浏览足迹的方法
  },

  // 发送网络请求获取商品详情的数据
  async getGoodsDetails(goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    })
    this.goodsInfo = goodsObj
    // 设置num的作用：为了后面点击添加购物车就有一个原本的num值，然后多次添加就增加 num 的值
    this.goodsInfo.num = 1
    // 设置checked的作用是：给后面购物车的复选框使用
    this.goodsInfo.checked = true
    let collect = wx.getStorageSync("collect") || []
    let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id)
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // 部分iphone手机 不能识别  webp 图片格式
        // 最好找到后台 让他进行修改
        // 临时自己改 确保后台存在 1.webp => 1.jpg
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
      },
      isCollect
    })
    this.lookFootPrint()
  },

  // 点击轮播出现大图片
  handleSwiperClick(e) {
    const urls = this.goodsInfo.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    // 这2个是在接口获取轮播图没有数据的时候，使用的轮播点击方法数据存储
    const urls2 = this.data.swiperdata
    const current2 = e.currentTarget.dataset.swiper
    // 在这个数组是[]的时候说明接口中的数据是空的没有数据，
    // 这个时候就不能在像之前一样使用原来放大图片的url了
    // 这里就是判断是不是[],通过判断数据的长度，如果是0，说明数组是空数组，
    // 就使用自己定义的轮播数据
    if (this.data.goodsObj.pics.length == 0) {
      // 显示大图片
      wx.previewImage({
        current: current2, // 当前显示图片的http链接
        urls: urls2 // 需要预览的图片http链接列表
      })
    } else {
      console.log("b");
      wx.previewImage({
        current, // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
      })
    }
  },

  // 点击加入购物车触发的函数
  handleJoinCartClick() {
    // 1. 先去获取本地存储中的数据
    let cart = wx.getStorageSync("cart") || [];
    // 2. 查询本地存储数据中是否已经有该商品，如果有就直接数量加1，如果没有就添加该商品
    let index = cart.findIndex(v => v.goods_id == this.goodsInfo.goods_id);
    // 3. 判断index的值，如果存在该商品index的值就会是索引，如果没有，index就会是-1
    if (index == -1) {
      // 运行到这里说明本地存储数据中，没有当前这个商品
      cart.push(this.goodsInfo);
      // 弹窗提示加入成功
      wx.showToast({
        title: '添加购物车成功',
        icon: 'success',
        mask: true, //在显示动画的过程中，禁止用户点击
      });
    } else {
      // 运行到这里说明本地存储中有当前商品，只需要商品的 num 值自增 1 就可以了
      wx.showToast({
        title: '商品数量加 1 ',
        icon: 'success',
        mask: true,
      });
      // 商品的 num 值自增
      cart[index].num++
    }
    wx.setStorage({
      key: 'cart',
      data: cart,
    });
  },

  // 点击收藏触发的函数
  handleshoucang() {
    let isCollect = false
    // 1. 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || []
    // 2. 判断该商品是否被收藏过了
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
    // 当index ==-1时候说明数组中没有这个商品
    // 当index!=-1时候说明数组中没有这个商品
    if (index == -1) {
      // index是-1说明数组中没有这个商品
      showToast('收藏成功', '', 'success')
      collect.push(this.goodsInfo)
      isCollect = true
    } else {
      // 收藏过
      showToast('取消收藏成功', '', 'success')
      collect.splice(index, 1)
      isCollect = false
    }
    this.setData({
      isCollect
    })
    wx.setStorageSync("collect", collect);
  }
})