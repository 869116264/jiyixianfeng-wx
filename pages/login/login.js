// pages/login/login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentID: null,
    password: null,
    password_display: false,
    password_store: false,
  },
  navigateToRetrievePassword: function () {
    wx.navigateTo({
      url: '../validationCode/validationCode',
    })
  },
  navigateToSignUp: function () {
    wx.navigateTo({
      url: '../signup/signup',
    })
  },
  login: function (e) {
    console.log(e.detail)
    wx.showLoading({
      title: '登录中'
    })
    wx.request({
      url: 'https://igulu.net/api/student/signIn',
      method: 'POST',
      data: {
        'number': e.detail.value['studentID'],
        'password': e.detail.value['password']
      },
      success: function (res) {
          console.log(res)
        if (res.data.code == 200) {
          wx.hideLoading()
          wx.showToast({
            title: '登录成功',
            icon: 'success',
          })
          wx.setStorageSync('studentID', e.detail.value['studentID'])
          wx.setStorageSync('password', e.detail.value['password'])
          wx.setStorageSync("sessionid", 'lk=' + res.header["Set-Cookie"].split(";")[0].split("=")[1] + ';number=' + wx.getStorageSync('studentID') + ';'
          )
          wx.switchTab({
            url: '../activity/activity',
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: res.data.content,
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
  switchPasswordStore: function (e) {
    var that = this
    that.setData({
      password_store: !(that.data.password_store)
    })
    wx.setStorageSync('password_store', this.data.password_store)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('password_store')) {
      this.setData({
        studentID: wx.getStorageSync('studentID'),
        password: wx.getStorageSync('password'),
        password_store: wx.getStorageSync('password_store'),
      })
    }
    console.log(this.data.studentID)
    console.log(this.data.password)
    console.log(this.data.password_store)
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