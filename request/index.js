// 这个的作用是在那些一次发送多个请求的时候，防止还有没有返回数据就关闭了wx.hideLoading
let ajaxTimeCount = 0;

export const request = (params) => {
    return new Promise((resolve, reject) => {
        const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1';

        // 显示加载中的效果
        wx.showLoading({
            title: "加载中",
            mask: true,
        });
        // 每次发送网络请求之前就会先自增1，如果网络请求结束就会减少回来，
        ajaxTimeCount++
        wx.request({
            ...params, //结构，把参数对象解析成字符串
            url: baseURL + params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimeCount--
                // 只有在当次数为0的时候，说明所有的网络请求数据都请求完成了
                if (ajaxTimeCount == 0) {
                    wx.hideLoading();
                }
            }
        })
    })
}
