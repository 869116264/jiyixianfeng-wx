// pages/validationCode/validationCode.js
var timer = require('../../utils/timer.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    captchaLabel: '获取验证码',
    seconds: timer.length,
    captchaDisabled: false,
    password_display: false,
    phone: null,
    captchaChecked: false,
  },
  refreshNumber: function (event) {
    this.setData({
      phone: event.detail.value
    })
    console.log(this.data.phone)
  },
  captcha: function () {
    var t = this;
    wx.request({
      method: 'POST',
      url: 'https://igulu.net/api/student/getVetifyCodeWithoutCookie',
      data: { "phone_number": this.data.phone },
      success: function (res) {
        console.log(res);
        t.setData({
          captchaDisabled: true
        });
        t.setData({
          captchaLabel: '重发(' + timer.length + ')'
        });
        var interval = setInterval(() => {
          timer.countdown(t);
        }, 1000);
        setTimeout(function () {
          clearInterval(interval);
        }, timer.length * 1000);
      }
    })
  },


  checkCaptcha: function (e) {
    var t = this
    console.log(e.detail.value)
    wx.request({
      method: 'POST',
      url: 'https://igulu.net/api/student/checkVerifyCode',
      data: {
        'verity_code': e.detail.value,
        'phone_number': this.data.phone
      },
      success: function (res) {
        console.log(res)
        if (res.data.message == '验证通过') {
          t.setData({
            captchaChecked: true
          })
        }
      }
    })
  },

  reset: function (e) {
    if (e.detail.value.password != e.detail.value.confirmPassword || !(e.detail.value.password) || e.detail.value.tel.length == 0) {
      wx.showToast({
        title: '信息有误',
        icon: 'none'
      })
    }
    console.log(e)
    wx.request({
      url: 'https://igulu.net/api/student/resetPassword',
      method: 'POST',
      data: {
        'phone_number': e.detail.value.tel,
        'password': e.detail.value.password,
        'verity_code': e.detail.value.code
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '重置成功',
            icon: 'success'
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: '信息有误',
            icon: 'none'
          })
        }
      }
    })
  },

  switchPasswordDisplay: function () {
    this.setData({
      password_display: !(this.data.password_display)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})