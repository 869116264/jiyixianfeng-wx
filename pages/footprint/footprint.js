// pages/annualReport/annualReport.js
var cookie = require('../../utils/cookie.js');
const branches = ['未选择', '本科生第一党支部', '本科生第二党支部', '本科生第三党支部', '学生第一党支部', '学生第二党支部', '研究生第一党支部', '研究生第二党支部', '研究生第三党支部', '研究生第四党支部', '研究生第五党支部', '研究生第六党支部', '研究生第七党支部', '研究生第八党支部', '研究生第九党支部', '研究生第十党支部', '研究生第十一党支部', '研究生第十二党支部']
const identities = ["未选择", "入党申请人", "推优对象", "积极分子", "发展对象", "预备党员", "正式党员"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    pic_height: 1420,
    history: {
      stage: [{
          time: '2015-01-01',
          stage: 1,
          month: 1,
          hour: 12,
          badge: 8
        },
        {
          time: '2015-02-01',
          stage: 2,
          month: 1,
          hour: 12,
          badge: 8
        },
        {
          time: '2016-08-01',
          stage: 3,
          month: 6,
          hour: 18,
          badge: 3
        },
        {
          time: '2016-08-01',
          stage: 4,
          month: 6,
          hour: 18,
          badge: 3
        },
        {
          time: '2017-08-01',
          stage: 5,
          month: 12,
          hour: 36,
          badge: 9
        },
        {
          time: '2018-08-01',
          stage: 6,
          month: 12,
          hour: 36,
          badge: 8
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var t = this
    wx.request({
      url: 'https://igulu.net/api/student/history',
      header: cookie.cookie_header(),
      success: function(res) {
        console.log(res.data)
        t.setData({
          history: res.data
        })
        console.log(t.data.history)

        const rate = wx.getSystemInfoSync().windowWidth / 375
        console.log(rate)

        var that = t
        that.setData({
          pic_height: 750 + that.data.history.stage.length * 88
        })
        console.log(that.data.pic_height)
        const ctx = wx.createCanvasContext('canvas')
        ctx.setFillStyle('#f6bf42')
        ctx.fillRect(0, 0, 375 * rate, 710 * rate)

        ctx.beginPath()
        ctx.moveTo(24 * rate, 710 * rate)
        ctx.arc(34 * rate, 181 * rate, 10 * rate, 1 * Math.PI, 1.5 * Math.PI)
        ctx.arc(341 * rate, 181 * rate, 10 * rate, 1.5 * Math.PI, 2 * Math.PI)
        ctx.lineTo(351 * rate, 710 * rate)
        ctx.closePath()
        ctx.setFillStyle("#efeff4")
        ctx.fill()

        ctx.beginPath()
        ctx.arc(55 * rate, 145 * rate, 10 * rate, 1 * Math.PI, 1.5 * Math.PI)
        ctx.arc(320 * rate, 145 * rate, 10 * rate, 1.5 * Math.PI, 2 * Math.PI)
        ctx.arc(320 * rate, (that.data.pic_height / 2 - 46) * rate, 10 * rate, 0, 0.5 * Math.PI)
        ctx.arc(55 * rate, (that.data.pic_height / 2 - 46) * rate, 10 * rate, 0.5 * Math.PI, 1 * Math.PI)
        ctx.closePath()
        ctx.setFillStyle("#ffffff")
        ctx.fill()

        ctx.drawImage('../../resources/image/canvas/avatar.png', 150 * rate, 98 * rate, 75 * rate, 75 * rate)
        ctx.draw(true)

        ctx.font = '10px Helvetica'
        ctx.setFontSize(25 * rate)
        ctx.setTextAlign('center')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText("“ 一心一意跟党走 ”", 187 * rate, 60 * rate)

        ctx.drawImage('../../resources/image/canvas/app_qr_code.jpg', 145 * rate, (that.data.pic_height / 2 - 127) * rate, 85 * rate, 85 * rate)
        ctx.draw(true)


        var height = 250 * rate
        var index = 0
        that.data.history.stage.forEach(
          function(item) {
            ctx.setFontSize(12 * rate)
            ctx.setTextAlign('left')
            ctx.setFillStyle('#4a4a4a')
            ctx.fillText(item.time, 87 * rate, height)
            ctx.draw(true)
            ctx.setFontSize(12 * rate)
            ctx.setTextAlign('left')
            ctx.setFillStyle('#4a4a4a')
            ctx.fillText('成为'.concat(identities[item.stage]), 200 * rate, height)
            ctx.draw(true)
            ctx.drawImage('../../resources/icon/development/stage_'.concat(item.stage).concat('_on.png'), 160.5 * rate, height - 18 * rate, 27 * rate, 27 * rate)
            ctx.draw(true)
            if (index) {
              ctx.beginPath()
              ctx.setStrokeStyle('#f6bf42')
              ctx.setLineWidth(1 * rate)
              ctx.moveTo(174 * rate, height - 35 * rate)
              ctx.lineTo(174 * rate, height - 18 * rate)
              ctx.stroke()
              ctx.draw(true)
            }
            if (item.stage > 2) {
              ctx.setFontSize(9 * rate)
              ctx.setTextAlign('left')
              ctx.setFillStyle('#bdbdbd')
              ctx.fillText('累计时间'.concat(item.month).concat('个月 学时').concat(item.hour).concat('个'), 200 * rate, height + 13)
              ctx.draw(true)
              ctx.setFontSize(9 * rate)
              ctx.setTextAlign('left')
              ctx.setFillStyle('#bdbdbd')
              ctx.fillText('期间获得'.concat(item.badge).concat('个'), 200 * rate, height + 24)
              ctx.draw(true)
            }
            height += 44 * rate
            console.log(height)
            index++
          }
        )


        wx.request({
          url: 'https://igulu.net/api/student/message',
          header: cookie.cookie_header(),
          success: function(res) {
            console.log(res.data)
            that.setData({
              user: res.data,
            })

            ctx.setFontSize(18 * rate)
            ctx.setTextAlign('center')
            ctx.setFillStyle('#4a4a4a')
            ctx.fillText(res.data.name, 187 * rate, 200 * rate)
            ctx.setFontSize(12 * rate)
            ctx.setTextAlign('center')
            ctx.setFillStyle('#888888')
            ctx.fillText(branches[res.data.party_branch_id], 187 * rate, 219 * rate)

            ctx.draw(true)
          }
        })
      }
    })
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
  saveImage: function() {
    wx.showModal({
      title: '保存图片',
      content: '点击确认以保存图片',
      showCancel: true,
      confirmColor: "#ffbe00",
      success: function(res) {
        if (res.confirm) {
          wx.canvasToTempFilePath({
            canvasId: 'canvas',
            success: function(res) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function(res) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1000
                  })
                },
                fail: function(res) {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none',
                    duration: 1000
                  })
                },
              })
            }
          }, this)
        }
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