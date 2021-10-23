export const showModal = (title) => {
    return new Promise((resolve,reject) => {
        wx.showModal({
            title: title,
            content: '确定操作？',
            success:  (res) => {
              resolve(res)
            },
            fail: (result) => { 
                reject(result)
             }
          })
    } )
  }
  export const showToast = (title,image="",icon="none") => {
    return new Promise ((resolve,reject) => {
        wx.showToast({
            title: title,
            icon: icon,
            image: image,
            duration: 1500,
            mask: false,
            success: (result)=>{
                resolve(result)
            },
            fail: ()=>{
                reject()
            },
            complete: ()=>{}
        });
    })
  }
  export const login = () => {
      return new Promise((resolve,reject) => {
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result)
            },
            fail: (res)=>{
                reject(res)
            },
            complete: ()=>{}
          });
      })
  }