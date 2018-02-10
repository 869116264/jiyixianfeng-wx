//signin.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isSignIn: true,
  },
  switchSign: function (e) {
    if (this.data.isSignIn) {
      console.log('switch to sign on')
      this.setData({
        isSignIn: false,
      })
    }
    else {
      console.log('switch to sign in')
      this.setData({
        isSignIn: true,
      })
    }
  }
})
