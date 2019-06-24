// pages/selfValidate/selfValidate.js
var cookie = require('../../utils/cookie.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArray: ['未选择', '组织生活', '理论学习', '实践学习', '其他活动', '专题培训'],
    date: '未选择',
    type: 0,
    selected1: true,
    selected2: false,
    selected3: false,
    credit: 0,
    activity_id: null,
    activity: {},
    items: [{
        name: '1',
        value: '集体合照'
      },
      {
        name: '2',
        value: '活动邀请函'
      },
      {
        name: '3',
        value: '参与证明书'
      },
      {
        name: '4',
        value: '其它'
      }
    ]
  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  switchTab: function(e) {
    console.log(e.target.id)
    this.setData({
      selected1: false,
      selected2: false,
      selected3: false,
    })
    if (e.target.id == "select1") {
      this.setData({
        selected1: true
      })
    }
    if (e.target.id == "select2") {
      this.setData({
        selected2: true
      })
    }
    if (e.target.id == "select3") {
      this.setData({
        selected3: true
      })
    }
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTypeChange: function(e) {
    this.setData({
      type: e.detail.value
    })
  },
  bindCreditChange: function(e) {
    this.setData({
      credit: e.detail.value
    })
  },
  submit: function(e) {
    console.log(e);
    console.log(this.data.date, this.data.type, this.data.credit)
    if (this.data.date == '未选择'){
      wx.showToast({
        title: '时间未填写',
        icon: 'none'
      })
    } else if (this.data.type == 0) {
      wx.showToast({
        title: '活动类型未选择',
        icon: 'none'
      })
    } else if (!(e.detail.value.title)) {
      wx.showToast({
        title: '标题未填写',
        icon: 'none'
      })
    } else if (!(e.detail.value.host)) {
      wx.showToast({
        title: '主办方未填写',
        icon: 'none'
      })
    } else if (!(e.detail.value.location)) {
      wx.showToast({
        title: '活动地点未填写',
        icon: 'none'
      })
    } else if (!(e.detail.value.content)) {
      wx.showToast({
        title: '活动内容未填写',
        icon: 'none'
      })
    } else if (!(e.detail.value.experience)) {
      wx.showToast({
        title: '心得内容未填写',
        icon: 'none'
      })
    } else if (!(e.detail.value.experience_title)) {
      wx.showToast({
        title: '心得标题未填写',
        icon: 'none'
      })
    } else {
      if (this.data.activity_id == null) {
        wx.request({
          url: 'https://igulu.net/api/addAutonomousActivity',
          method: 'POST',
          header: cookie.cookie_header(),
          data: {
            name: e.detail.value.title,
            host: e.detail.value.host,
            time: this.data.date,
            location: e.detail.value.location,
            type: this.data.type,
            hours: this.data.credit,
            content: e.detail.value.content,
            experience: e.detail.value.experience,
            experience_title: e.detail.value.experience_title,
          },
          success: function(res) {
            console.log(res)
            if (res.data.code == 200) {
              wx.showToast({
                title: '提交成功',
              })
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showToast({
                title: '信息有误',
                icon: 'none'
              })
            }
          }
        })
      } else {
        var t = this
        wx.request({
          url: 'https://igulu.net/api/updateAutonomousActivity',
          method: 'POST',
          header: cookie.cookie_header(),
          data: {
            id: t.data.activity_id,
            name: e.detail.value.title,
            host: e.detail.value.host,
            time: this.data.date,
            location: e.detail.value.location,
            type: this.data.type,
            hours: this.data.credit,
            content: e.detail.value.content,
            experience: e.detail.value.experience,
            experience_title: e.detail.value.experience_title,
          },
          success: function(res) {
            console.log(res)
            if (res.data.code == 200) {
              wx.showToast({
                title: '提交成功',
              })
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showToast({
                title: '信息有误',
                icon: 'none'
              })
            }
          }
        })
      }

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var t = this
    this.setData({
      activity_id: options.id
    })
    console.log(this.data)
    if (this.data.activity_id) {
      wx.request({
        url: 'https://igulu.net/api/administer/getAutonomousActivity',
        method: 'POST',
        header: cookie.cookie_header(),
        data: {
          id: options.id
        },
        success: function(res) {
          console.log(res)
          t.setData({
            activity: res.data,
            date: res.data.time,
            credit: res.data.hours,
            type: res.data.type,
          })
        }
      })
    }
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