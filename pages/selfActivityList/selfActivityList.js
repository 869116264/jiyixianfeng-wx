// pages/selfActivityList/selfActivityList.js

var cookie = require('../../utils/cookie.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusList: ['', '待审核', '已通过', '未通过'],
    activityArray: []
  },

  navigateToSelfValidate: function (e) {
    wx.navigateTo({
      url: '../selfValidate/selfValidate',
    })
  },

  openActivityDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../selfValidate/selfValidate?id=' + e.currentTarget.id
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
    var t = this
    wx.request({
      url: 'https://igulu.net/api/student/getAutonomousActivitys',
      header: cookie.cookie_header(),
      success: function (res) {
        console.log(res)
        t.setData({
          activityArray: res.data
        })
      }
    })

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