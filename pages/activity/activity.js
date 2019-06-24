// pages/activity/activity.js

var cookie = require('../../utils/cookie.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    activityArray: null,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    acts: [],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 1000
  },
  openActivityDetail: function (e) {
    wx.navigateTo({
      url: '../activityDetail/activityDetail?id=' + e.currentTarget["id"],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this
    // wx.request({  // banner
    //   url: 'https://igulu.net/',
    //   header: cookie.cookie_header(),
    //   success: function (e) {
    //     // that.setData({

    //     // })
    //   }
    // })
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
    var that = this
    wx.request({  // isInfoCompleted
      url: 'https://igulu.net/api/student/message',
      header: cookie.cookie_header(),
      success: function (res) {
        console.log(res)
        if (res.data.need_vertify == 4) {
          wx.showModal({
            title: '完善信息',
            content: '快来完善信息，让组织找到你吧！',
            showCancel: false,
            confirmColor: "#ffbe00",
            success: function (res) {
              wx.navigateTo({
                url: '../completeInfo/completeInfo',
              })
            }
          })
        }
      }
    })
    // wx.request({  // banner
    //   url: 'https://igulu.net/',
    //   header: cookie.cookie_header(),
    //   success: function (e) {
    //     // that.setData({

    //     // })
    //   }
    // })

    wx.request({  // activity list
      url: 'https://igulu.net/api/getToBeContinuedActivity',
      header: cookie.cookie_header(),
      success: function (res) {
        console.log(res.data)  
        that.setData({
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