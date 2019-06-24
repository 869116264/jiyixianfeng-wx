// pages/development/development.js
var cookie = require('../../utils/cookie.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    activityArray: [],
    stageName: ["未选择", "入党申请人", "推优对象", "积极分子", "发展对象", "预备党员", "正式党员"],
    creditDistance: 16,
    monthDistance: 0,
  },

  openActivityDetail: function(e) {
    wx.navigateTo({
      url: '../activityDetail/activityDetail?id=' + e.currentTarget["id"],
    })
  },

  navigateToSelfActivityList: function(e) {
    wx.navigateTo({
      url: '../selfActivityList/selfActivityList',
    })
  },

  navigateToAnnualReport: function(e) {
    wx.navigateTo({
      url: '../annualReport/annualReport',
    })
  },

  navigateToFootprint: function(e) {
    wx.navigateTo({
      url: '../footprint/footprint',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: 'https://igulu.net/api/student/stage',
      header: cookie.cookie_header(),
      success: function (res) {
        that.setData({
          creditDistance: res.data.credit_distance,
          monthDistance: res.data.month_distance,
        })
        const rate = wx.getSystemInfoSync().windowWidth / 375
        // console.log(that.data.creditDistance)
        // var that = this
        const ctx = wx.createCanvasContext('canvas')
        ctx.setFillStyle('#f8f4ed')
        ctx.fillRect(0, 0, 375 * rate, 75 * rate)
        ctx.draw(true)

        ctx.moveTo(28 * rate, 38 * rate)
        ctx.lineTo(347 * rate, 38 * rate)
        ctx.setStrokeStyle('#bdbdbd')
        ctx.setLineWidth(7 * rate)
        ctx.setLineCap('round')
        ctx.stroke()

        ctx.draw(true)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('center')
        ctx.setFillStyle('#bdbdbd')
        ctx.fillText('16学时', 347 * rate, 60 * rate)

        console.log(that.data.creditDistance)
        if (that.data.creditDistance == 0) {
          ctx.moveTo(28 * rate, 38 * rate)
          ctx.lineTo((28 + (347 - 28) / 16 * (16 - that.data.creditDistance)) * rate, 38 * rate)
          ctx.setStrokeStyle('#ffbe00')
          ctx.setLineWidth(7 * rate)
          ctx.setLineCap('round')
          ctx.stroke()
          ctx.drawImage('../../resources/icon/development/running.png', 338 * rate, 8 * rate, 18 * rate, 26 * rate)
          ctx.draw(true)
        } else if (that.data.creditDistance < 16) {
          ctx.moveTo(28 * rate, 38 * rate)
          ctx.lineTo((28 + (347 - 28) / 16 * (16 - that.data.creditDistance)) * rate, 38 * rate)
          ctx.setStrokeStyle('#ffbe00')
          ctx.setLineWidth(7 * rate)
          ctx.setLineCap('round')
          ctx.stroke()
          ctx.drawImage('../../resources/icon/development/running.png', ((28 + (347 - 28) / 16 * (16 - that.data.creditDistance)) - 4) * rate, 8 * rate, 18 * rate, 26 * rate)
          ctx.draw(true)
        }

        ctx.draw(true)
      }
    })
    // const rate = wx.getSystemInfoSync().windowWidth / 375
    // // console.log(that.data.creditDistance)
    // var that = this
    // const ctx = wx.createCanvasContext('canvas')
    // ctx.setFillStyle('#f8f4ed')
    // ctx.fillRect(0, 0, 375 * rate, 75 * rate)
    // ctx.draw(true)

    // ctx.moveTo(28 * rate, 38 * rate)
    // ctx.lineTo(347 * rate, 38 * rate)
    // ctx.setStrokeStyle('#bdbdbd')
    // ctx.setLineWidth(7 * rate)
    // ctx.setLineCap('round')
    // ctx.stroke()

    // ctx.draw(true)

    // ctx.setFontSize(12 * rate)
    // ctx.setTextAlign('center')
    // ctx.setFillStyle('#bdbdbd')
    // ctx.fillText('16学时', 347 * rate, 60 * rate)

    // console.log(that.data.creditDistance)
    // if (that.data.creditDistance == 0) {
    //   ctx.moveTo(28 * rate, 38 * rate)
    //   ctx.lineTo((28 + (347 - 28) / 16 * (16 - that.data.creditDistance)) * rate, 38 * rate)
    //   ctx.setStrokeStyle('#ffbe00')
    //   ctx.setLineWidth(7 * rate)
    //   ctx.setLineCap('round')
    //   ctx.stroke()
    //   ctx.drawImage('../../resources/icon/development/running.png', 338 * rate, 8 * rate, 18 * rate, 26 * rate)
    //   ctx.draw(true)
    // } else if (that.data.creditDistance < 16) {
    //   ctx.moveTo(28 * rate, 38 * rate)
    //   ctx.lineTo((28 + (347 - 28) / 16 * (16 - that.data.creditDistance)) * rate, 38 * rate)
    //   ctx.setStrokeStyle('#ffbe00')
    //   ctx.setLineWidth(7 * rate)
    //   ctx.setLineCap('round')
    //   ctx.stroke()
    //   ctx.drawImage('../../resources/icon/development/running.png', ((28 + (347 - 28) / 16 * (16 - that.data.creditDistance)) - 4) * rate, 8 * rate, 18 * rate, 26 * rate)
    //   ctx.draw(true)
    // }

    // ctx.draw(true)
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
    var that = this
    wx.request({
      url: 'https://igulu.net/api/getUserSignUpAndEndedActivity',
      header: cookie.cookie_header(),
      success: function(res) {
        console.log(res.data)
        that.setData({
          activityArray: res.data
        })
      }
    })
    wx.request({
      url: 'https://igulu.net/api/student/message',
      header: cookie.cookie_header(),
      success: function(res) {
        console.log(res.data)
        that.setData({
          user: res.data,
        })
      }
    })
    wx.request({
      url: 'https://igulu.net/api/student/stage',
      header: cookie.cookie_header(),
      success: function(res) {
        console.log(res)
        that.setData({
          creditDistance: res.data.credit_distance,
          monthDistance: res.data.month_distance,
        })
      }
    })

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