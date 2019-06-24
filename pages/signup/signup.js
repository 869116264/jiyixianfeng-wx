// pages/signup/signup.js
var cookie = require('../../utils/cookie.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    branchIndex: 0,
    branches: ['未选择', '本科生第一党支部', '本科生第二党支部', '本科生第三党支部', '学生第一党支部', '学生第二党支部', '研究生第一党支部', '研究生第二党支部', '研究生第三党支部', '研究生第四党支部', '研究生第五党支部', '研究生第六党支部', '研究生第七党支部', '研究生第八党支部', '研究生第九党支部', '研究生第十党支部', '研究生第十一党支部', '研究生第十二党支部'],
  },
  pickerChange: function (event) {
    console.log(event.detail.value)
    this.setData({
      branchIndex: event.detail.value
    })
  },
  checkStudentID: function (e) {
  },
  signup: function (e) {
    var t = this
    if (this.data.branchIndex == 0 || e.detail.value['password'] != e.detail.value['confirmPassword'] || e.detail.value['password'].length == 0 || e.detail.value['name'] == 0) {
      wx.showToast({
        title: '信息有误',
        icon: 'none',
      })
    } else {
      wx.showLoading({
        title: '注册中'
      })
      wx.request({
        url: 'https://igulu.net/api/student/signUp',
        method: 'POST',
        data: {
          'number': e.detail.value['studentID'],
          'name': e.detail.value['name'],
          'party_branch_id': t.data.branchIndex,
          'password': e.detail.value['password']
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 500)
              }
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '注册失败',
              icon: 'none'
            })
          }
        }
      })
    }
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