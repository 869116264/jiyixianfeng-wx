              // pages/setPassword/setPassword.js
var cookie = require('../../utils/cookie.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password_display1: false,
    password_display2: false,
  },
  switchPasswordDisplay1: function () {
    this.setData({
      password_display1: !(this.data.password_display1)
    })
  },
  switchPasswordDisplay2: function () {
    this.setData({
      password_display2: !(this.data.password_display2)
    })
  },
  sendSetPassword: function (e) {
    if (e.detail.value['newPassword'] == e.detail.value['confirmNewPassword']) {
      wx.request({
        url: 'https://igulu.net/api/student/changePassword',
        method: 'POST',
        header: cookie.cookie_header(),
        data: {
          'password': e.detail.value['newPassword']
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
            })
          } else {
            wx.showToast({
              title: '操作失败',
              icon: 'none',
            })
          }
        }
      })
      wx.switchTab({
        url: '../mine/mine',
      })
    } else {
      wx.showToast({
        title: '操作失败',
        icon: 'none',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(cookie.cookie_header())

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