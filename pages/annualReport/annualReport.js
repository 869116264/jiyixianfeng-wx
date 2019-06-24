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
    image_data: {},
    achievement_count: 8,
    achi1: 5,
    achi2: 3
  },

  saveImage: function () {
    wx.showModal({
      title: '保存图片',
      content: '点击确认以保存图片',
      showCancel: true,
      confirmColor: "#ffbe00",
      success: function (res) {
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          success: function (res) {
            if (res.confirm){
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (res) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1000
                  })
                },
                fail: function (res) {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none',
                    duration: 1000
                  })
                },
              })
            }
          }
        }, this)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const rate = wx.getSystemInfoSync().windowWidth / 375
    console.log(rate)

    var that = this
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
    ctx.arc(320 * rate, 664 * rate, 10 * rate, 0, 0.5 * Math.PI)
    ctx.arc(55 * rate, 664 * rate, 10 * rate, 0.5 * Math.PI, 1 * Math.PI)
    ctx.closePath()
    ctx.setFillStyle("#ffffff")
    ctx.fill()
    ctx.draw(true)

    ctx.drawImage('../../resources/image/canvas/avatar.png', 150 * rate, 98 * rate, 75 * rate, 75 * rate)

    ctx.font = '10px Helvetica'
    ctx.setFontSize(25 * rate)
    ctx.setTextAlign('center')
    ctx.setFillStyle('#4a4a4a')
    ctx.fillText("“ 一心一意跟党走 ”", 187 * rate, 60 * rate)



    ctx.setLineWidth(0.5 * rate)
    ctx.beginPath()
    ctx.setLineDash([3 * rate, 3 * rate], 1.5 * rate)
    // ctx.setLineWidth(0.1 * rate)
    ctx.moveTo(60 * rate, 350 * rate)
    ctx.lineTo(315 * rate, 350 * rate)
    ctx.stroke()
    ctx.draw(true)

    ctx.setLineDash([3 * rate, 3 * rate], 1.5 * rate)
    ctx.beginPath()
    ctx.moveTo(60 * rate, 465 * rate)
    ctx.lineTo(315 * rate, 465 * rate)
    ctx.stroke()
    ctx.draw(true)

    ctx.drawImage('../../resources/image/canvas/app_qr_code.jpg', 145 * rate, 583 * rate, 85 * rate, 85 * rate)

    wx.request({
      url: 'https://igulu.net/api/student/annualReport',
      header: cookie.cookie_header(),
      success: function (res) {
        console.log(res.data)
        that.setData({
          image_data: res.data
        })
        var leftLength = 12 * (5 + identities[that.data.image_data.last_stage].length) * rate
        var rightLength = 18 * identities[that.data.image_data.now_stage].length * rate
        if ((that.data.image_data.last_stage) != (that.data.image_data.now_stage)){
        ctx.moveTo(153 * rate, 295 * rate)
        ctx.lineTo(222 * rate, 295 * rate)
        ctx.setStrokeStyle('#f6bf42')
        ctx.setLineWidth(1.5 * rate)
        ctx.stroke()
        ctx.drawImage('../../resources/image/canvas/arrow.png', 181.5 * rate, 289 * rate, 12 * rate, 12 * rate)
        ctx.draw(true)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('right')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('我从'.concat(identities[that.data.image_data.last_stage]).concat('成长为'), 187.5 * rate - (leftLength + rightLength) / 2 + leftLength, 260 * rate)

        ctx.setFontSize(18 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#f6bf42')
        ctx.fillText(identities[that.data.image_data.now_stage], 187.5 * rate - (leftLength + rightLength) / 2 + leftLength, 260 * rate)

        ctx.drawImage('../../resources/icon/development/stage_'.concat(that.data.image_data.last_stage).concat('_on.png'), 120 * rate, 280 * rate, 30 * rate, 30 * rate)
        ctx.drawImage('../../resources/icon/development/stage_'.concat(that.data.image_data.now_stage).concat('_on.png'), 225 * rate, 280 * rate, 30 * rate, 30 * rate)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('center')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText(identities[that.data.image_data.last_stage], 135 * rate, 330 * rate)
        ctx.fillText(identities[that.data.image_data.now_stage], 240 * rate, 330 * rate)
        }else{
          // ctx.moveTo(153 * rate, 295 * rate)
          // ctx.lineTo(222 * rate, 295 * rate)
          // ctx.setStrokeStyle('#f6bf42')
          // ctx.setLineWidth(1.5 * rate)
          // ctx.stroke()
          // ctx.drawImage('../../resources/icon/development/stage_'.concat(that.data.image_data.last_stage).concat('_on.png'), 172.5 * rate, 289 * rate, 30 * rate, 30 * rate)
          ctx.drawImage('../../resources/image/avatar/avatar_stage'.concat(that.data.image_data.last_stage).concat('.png'), 162.5 * rate, 275 * rate, 50 * rate, 50 * rate)
          ctx.draw(true)

          var firstLength = 12 * 12 * rate
          ctx.font = '10px Helvetica'
          var secondLength = 20 * rate
          console.log(secondLength)
          var thirdLength = 4 * 12 * rate
          var tot_length = firstLength + secondLength + thirdLength

          const leftMark = 190 * rate - tot_length / 2

          ctx.setFontSize(12 * rate)
          ctx.setTextAlign('right')
          ctx.setFillStyle('#4a4a4a')
          ctx.fillText('我已经成为'.concat(identities[that.data.image_data.last_stage]).concat('啦！接下来也要继续努力！'),  320 * rate, 260 * rate)
        }

        var total_count = 0
        var number1 = 0
        var number2 = 0
        var number3 = 0
        var number4 = 0
        var number5 = 0
        for (const index in that.data.image_data.activitys) {
          total_count += that.data.image_data.activitys[index].number
          if (that.data.image_data.activitys[index].type == '1') {
            number1 = that.data.image_data.activitys[index].number
          }
          if (that.data.image_data.activitys[index].type == '2') {
            number2 = that.data.image_data.activitys[index].number
          }
          if (that.data.image_data.activitys[index].type == '3') {
            number3 = that.data.image_data.activitys[index].number
          }
          if (that.data.image_data.activitys[index].type == '4') {
            number4 = that.data.image_data.activitys[index].number
          }
          if (that.data.image_data.activitys[index].type == '5') {
            number5 = that.data.image_data.activitys[index].number
          }
        }

        var firstLength = 12 * 12 * rate
        ctx.font = '10px Helvetica'
        var secondLength = 20 * rate
        console.log(secondLength)
        var thirdLength = 4 * 12 * rate
        var tot_length = firstLength + secondLength + thirdLength

        const leftMark = 190 * rate - tot_length / 2

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('我今年一共参加党组织活动', leftMark - 1 * rate, 378 * rate)

        ctx.setFontSize(18 * rate)
        ctx.setTextAlign('center')
        ctx.setFillStyle('#f6bf42')
        ctx.fillText(total_count, leftMark + firstLength + 10 * rate, 378 * rate)
        console.log(leftMark + firstLength)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('次，其中', leftMark + firstLength + secondLength + 1 * rate, 378 * rate)
        console.log(leftMark + firstLength + secondLength)

        ctx.drawImage('../../resources/icon/activity/type1.png', 82.5 * rate, 393 * rate, 30 * rate, 30 * rate)
        ctx.setFontSize(18 * rate)
        ctx.setTextAlign('right')
        ctx.setFillStyle('#f6bf42')
        ctx.fillText(number1, 97.5 * rate, 445 * rate)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('次', 97.5 * rate, 445 * rate)

        ctx.drawImage('../../resources/icon/activity/type2.png', 127.5 * rate, 393 * rate, 30 * rate, 30 * rate)
        ctx.setFontSize(18 * rate)
        ctx.setTextAlign('right')
        ctx.setFillStyle('#f6bf42')
        ctx.fillText(number2, 142.5 * rate, 445 * rate)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('次', 142.5 * rate, 445 * rate)

        ctx.drawImage('../../resources/icon/activity/type3.png', 172.5 * rate, 393 * rate, 30 * rate, 30 * rate)
        ctx.setFontSize(18 * rate)
        ctx.setTextAlign('right')
        ctx.setFillStyle('#f6bf42')
        ctx.fillText(number3, 187.5 * rate, 445 * rate)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('次', 187.5 * rate, 445 * rate)

        ctx.drawImage('../../resources/icon/activity/type4.png', 217.5 * rate, 393 * rate, 30 * rate, 30 * rate)
        ctx.setFontSize(18 * rate)
        ctx.setTextAlign('right')
        ctx.setFillStyle('#f6bf42')
        ctx.fillText(number4, 232.5 * rate, 445 * rate)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('次', 232.5 * rate, 445 * rate)

        ctx.drawImage('../../resources/icon/activity/type5.png', 262.5 * rate, 393 * rate, 30 * rate, 30 * rate)
        ctx.setFontSize(18 * rate)
        ctx.setTextAlign('right')
        ctx.setFillStyle('#f6bf42')
        ctx.fillText(number5, 277.5 * rate, 445 * rate)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('次', 277.5 * rate, 445 * rate)

        var firstLength = 9 * 12 * rate
        ctx.font = '10px Helvetica'
        var secondLength = 20 * rate
        console.log(secondLength)
        var thirdLength = 4 * 12 * rate
        var tot_length = firstLength + secondLength + thirdLength

        const leftMark2 = 190 * rate - tot_length / 2

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('我今年一共获得荣誉', leftMark - 1 * rate, 493 * rate)

        ctx.setFontSize(18 * rate)
        ctx.setTextAlign('center')
        ctx.setFillStyle('#f6bf42')
        ctx.fillText(that.data.achievement_count, leftMark + firstLength + 10 * rate, 493 * rate)
        console.log(leftMark + firstLength)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('次，其中', leftMark + firstLength + secondLength + 1 * rate, 493 * rate)
        console.log(leftMark + firstLength + secondLength)

        ctx.drawImage('../../resources/image/canvas/achi1.png', 125 * rate, 508 * rate, 40 * rate, 40 * rate)
        ctx.setFontSize(18 * rate)
        ctx.setTextAlign('right')
        ctx.setFillStyle('#f6bf42')
        ctx.fillText(that.data.achi1, 145 * rate, 570 * rate)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('次', 145 * rate, 570 * rate)

        ctx.drawImage('../../resources/image/canvas/achi2.png', 210 * rate, 508 * rate, 40 * rate, 40 * rate)
        ctx.setFontSize(18 * rate)
        ctx.setTextAlign('right')
        ctx.setFillStyle('#f6bf42')
        ctx.fillText(that.data.achi2, 230 * rate, 570 * rate)

        ctx.setFontSize(12 * rate)
        ctx.setTextAlign('left')
        ctx.setFillStyle('#4a4a4a')
        ctx.fillText('次', 230 * rate, 570 * rate)

        ctx.draw(true)
      }
    })

    wx.request({
      url: 'https://igulu.net/api/student/message',
      header: cookie.cookie_header(),
      success: function (res) {
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

  },

  saveImage: function () {
    wx.showModal({
      title: '保存图片',
      content: '点击确认以保存图片',
      showCancel: true,
      confirmColor: "#ffbe00",
      success: function (res) {
        if (res.confirm) {
          wx.canvasToTempFilePath({
            canvasId: 'canvas',
            success: function (res) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (res) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1000
                  })
                },
                fail: function (res) {
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