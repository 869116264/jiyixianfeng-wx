//signin.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isSignIn: true,
    buttonText: '登录',
    hintText:'没有账号？立即注册！'
  },
  switchSign: function (e) {
    if (this.data.isSignIn) {
      console.log('switch to sign on')
      this.setData({
        isSignIn: false,
        buttonText: '注册',
        hintText: '已有账号？立即登录！'
      })
    }
    else {
      console.log('switch to sign in')
      this.setData({
        isSignIn: true,
        buttonText: '登录',
        hintText: '没有账号？立即注册！'
      })
    }
  },
  submit: function (e) {
    // TODO
  }
})
