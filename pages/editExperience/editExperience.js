// pages/editExperience/editExperience.js
var cookie = require('../../utils/cookie.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id: null,
    my_experience: null,
    my_title: null,
  },
  getMyExperience: function () {
    var t = this
    wx.request({
      url: 'https://igulu.net/api/getSingleExperience',
      header: cookie.cookie_header(),
      method: 'POST',
      data: { 'activity_id': this.data.activity.id },
      success: function (res) {
        console.log('my', res.data);
        t.setData({
          my_experience: res.data.experience,
          my_title: res.data.experience_title,
        })
      }
    })
  },
  submit: function (e) {
    console.log(e.detail.value)
    wx.request({
      url: 'https://igulu.net/api/student/uploadExperience',
      method: 'POST',
      header: cookie.cookie_header(),
      data: {
        activity_id: this.data.activity_id,
        experience: e.detail.value.experience,
        experience_title: e.detail.value.experience_title
      },
      success: function(res){
        console.log(res);
        if(res.data.code==200){
          wx.showToast({
            title: '编辑成功',
            icon: 'success'
          })
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: '编辑失败',
            icon: 'none'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activity_id: options.id
    })
    var t = this
    wx.request({
      url: 'https://igulu.net/api/getSingleExperience',
      header: cookie.cookie_header(),
      method: 'POST',
      data: { 'activity_id': this.data.activity_id },
      success: function (res) {
        console.log('my', res.data);
        t.setData({
          my_experience: res.data.experience,
          my_title: res.data.experience_title,
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