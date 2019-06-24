// pages/completeInfo/completeInfo.js
var timer = require('../../utils/timer.js');
var cookie = require('../../utils/cookie.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    captchaLabel: '获取验证码',
    seconds: timer.length,
    captchaDisabled: false,
    isLoggedIn: false,
    identities: ["未选择", "入党申请人", "推优对象", "积极分子", "发展对象", "预备党员", "正式党员"],
    identityIndex: 0,
    phone: null,
    captchaChecked: false,
    date1: null,
    date2: null,
    date3: null,
    date4: null,
    date5: null
  },
  refreshNumber: function(event) {
    this.setData({
      phone: event.detail.value
    })
    console.log(this.data.phone)
  },
  pickerChange: function(event) {
    console.log(event.detail.value)
    this.setData({
      identityIndex: event.detail.value
    })
    this.setData({
      date1: null
    })
    this.setData({
      date2: null
    })
    this.setData({
      date3: null
    })
    this.setData({
      date4: null
    })
    this.setData({
      date5: null
    })
  },
  bindDateChange1: function (event) {
    console.log(event.detail.value)
    this.setData({
      date1: event.detail.value + ' 00:00:00'
    })
  },
  bindDateChange2: function (event) {
    console.log(event.detail.value)
    this.setData({
      date2: event.detail.value + ' 00:00:00'
    })
  },
  bindDateChange3: function (event) {
    console.log(event.detail.value)
    this.setData({
      date3: event.detail.value + ' 00:00:00'
    })
  },
  bindDateChange4: function (event) {
    console.log(event.detail.value)
    this.setData({
      date4: event.detail.value + ' 00:00:00'
    })
  },
  bindDateChange5: function (event) {
    console.log(event.detail.value)
    this.setData({
      date5: event.detail.value + ' 00:00:00'
    })
  },
  checkCaptcha: function(e) {
    var t = this
    console.log(e.detail.value)
    wx.request({
      method: 'POST',
      url: 'https://igulu.net/api/student/checkVerifyCode',
      header: cookie.cookie_header(),
      data: {
        'verity_code': e.detail.value,
        'phone_number': this.data.phone
      },
      success: function(res) {
        console.log(res)
        if (res.data.message == '验证通过') {
          t.setData({
            captchaChecked: true
          })
        }
      }
    })
  },
  captcha: function(e) {
    var t = this
    console.log(e)
    wx.request({
      method: 'POST',
      url: 'https://igulu.net/api/student/getVerifyCode',
      header: cookie.cookie_header(),
      data: {
        'phone_number': t.data.phone
      },
      success: function(res) {
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
        (function() {
          clearInterval(interval);
        }, timer.length * 1000);
      }
    })

  },
  complete: function(e) {
    console.log(e)
    wx.request({
      url: 'https://igulu.net/api/student/complete',
      method: 'POST',
      header: cookie.cookie_header(),
      data: e.detail.value,
      success: function(res) {
        console.log(res)
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})