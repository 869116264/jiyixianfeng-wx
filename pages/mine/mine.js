// pages/mine/mine.js
var cookie = require('../../utils/cookie.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    stageName: ["未选择", "入党申请人", "推优对象", "积极分子", "发展对象", "预备党员", "正式党员"],
    party_branch_name: ['未选择', '本科生第一党支部', '本科生第二党支部', '本科生第三党支部', '学生第一党支部', '学生第二党支部', '研究生第一党支部', '研究生第二党支部', '研究生第三党支部', '研究生第四党支部', '研究生第五党支部', '研究生第六党支部', '研究生第七党支部', '研究生第八党支部', '研究生第九党支部', '研究生第十党支部', '研究生第十一党支部', '研究生第十二党支部'],
  },
  navigateToLogin: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  navigateToSetPassword: function (e) {
    wx.navigateTo({
      url: '../setPassword/setPassword',
    })
  },

  edit: function (e) {
    wx.navigateTo({
      url: '../editInfo/editInfo?' + e.currentTarget.id + '=' + this.data[e.currentTarget.id],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://igulu.net/api/student/message',
      header: cookie.cookie_header(),
      success: function (res) {
        that.setData({
          user: res.data
        })
      }
    })
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