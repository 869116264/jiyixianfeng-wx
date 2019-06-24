// pages/activityDetail/activityDetail.js

var cookie = require('../../utils/cookie.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: {},
    my_experience: null,
    user: {
      avatar: '../../resources/image/mascot/default_avatar.png',
      name: '王雪雪',
    },
    user_activity: {},
    experience_list: [],
    selected1: true,
    selected2: false,
    selected3: false,
    checkInLocation: '未定位',
    x: null,
    y: null,
    locationChosen: false,
  },
  navigateToEditExperience: function(e) {
    if (this.data.activity.applied) {
      wx.navigateTo({
        url: '../editExperience/editExperience?' + 'id=' + this.data.activity.id,
      })
    } else {
      wx.showToast({
        title: '无法编辑',
        icon: 'none'
      })
    }
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
      this.getMyExperience();
    }
  },
  chooseCheckInLocation: function(e) {
    console.log('choose');
    var t = this
    if (this.data.user_activity.state < 3) {
      wx.getLocation({
        success: function(res) {
          console.log(res)
          t.setData({
            checkInLocation: res.longitude.toString().substr(0, 10) + ',' + res.latitude.toString().substr(0, 10),
            locationChosen: true,
          })
          console.log(t.data.locationChosen, t.data.activity.applied, t.data.user_activity)
        },
      })
    }
  },
  switchLike: function(e) {
    let seq = e.currentTarget.id.split('_')[1]
    var o = this.data.experience_list[seq]
    if (o.liked) {
      o.liked = false
      o.thumbup_count--
    } else {
      o.liked = true
      o.thumbup_count++
    }
    console.log(o)
    var sliked = 'experience_list[' + seq + '].liked'
    var scnt = 'experience_list[' + seq + '].thumbup_count'
    var param = {}
    param[sliked] = o.liked
    param[scnt] = o.thumbup_count
    console.log(param)
    this.setData(param)
  },

  registerForActivity: function(e) {
    var that = this
    let ID = this.data.activity.id
    console.log(ID)
    wx.request({
      url: 'https://igulu.net/api/student/enroll',
      header: cookie.cookie_header(),
      method: 'POST',
      data: {
        activity_id: ID
      },
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            'activity.applied': true
          })
          wx.request({
            url: 'https://igulu.net/api/getStudentAndActivity',
            header: cookie.cookie_header(),
            method: 'POST',
            data: {
              activity_id: that.data.activity.id
            },
            success: function(res) {
              console.log(res);
              that.setData({
                user_activity: res.data[0]
              })
            }
          })
          wx.showToast({
            title: '报名成功',
            icon: 'success',
          })
        } else {
          wx.showToast({
            title: res.data.content,
            icon: 'none',
          })
        }
      }
    })
  },
  getMyExperience: function() {
    var t = this
    wx.request({
      url: 'https://igulu.net/api/getSingleExperience',
      header: cookie.cookie_header(),
      method: 'POST',
      data: {
        'activity_id': t.data.activity.id
      },
      success: function(res) {
        console.log('my', res.data);
        t.setData({
          my_experience: res.data.experience
        })
      }
    })
  },
  submitCheckInLocation: function(e) {
    var t = this
    if (this.data.locationChosen) {
      console.log({
        'activity_id': t.data.activity.id,
        'coordinate': t.data.checkInLocation
      })
      wx.request({
        url: 'https://igulu.net/api/student/sign',
        header: cookie.cookie_header(),
        method: 'POST',
        data: {
          'activity_id': t.data.activity.id,
          'coordinate': t.data.checkInLocation
        },
        success: function(res) {
          console.log(res)
          if (res.data.code == 200) {
            wx.request({
              url: 'https://igulu.net/api/getStudentAndActivity',
              header: cookie.cookie_header(),
              method: 'POST',
              data: {
                activity_id: t.data.activity.id
              },
              success: function(res) {
                console.log(res);
                t.setData({
                  user_activity: res.data[0]
                })
              }
            })
            wx.showToast({
              title: '签到成功',
              icon: 'success',
            })
          } else {
            wx.showToast({
              title: '签到失败',
              icon: 'none',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(options.id)
    this.setData({
      'activity.id': options.id
    })
    console.log(this.data.activity.id)
    wx.request({
      url: 'https://igulu.net/api/activity/get/' + options.id,
      header: cookie.cookie_header(),
      success: function(res) {
        console.log(res.data)
        that.setData({
          activity: res.data
        })
      }
    })
    wx.request({
      url: 'https://igulu.net/api/student/message',
      header: cookie.cookie_header(),
      success: function(res) {
        that.setData({
          user: res.data
        })
      }
    })
    wx.request({
      url: 'https://igulu.net/api/getStudentAndActivity',
      header: cookie.cookie_header(),
      method: 'POST',
      data: {
        activity_id: that.data.activity.id
      },
      success: function(res) {
        console.log(res);
        if (res.data.length == 1) {
          that.setData({
            user_activity: res.data[0],
            checkInLocation: (res.data[0].coordinate) ? (res.data[0].coordinate) : '未定位'
          })
          console.log(that.data.user_activity)
        }
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
    this.getMyExperience()
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
    var that = this
    wx.request({
      url: 'https://igulu.net/api/activity/get/' + this.data.activity.id,
      header: cookie.cookie_header(),
      success: function(res) {
        console.log(res.data)
        that.setData({
          activity: res.data
        })
      }
    })
    wx.request({
      url: 'https://igulu.net/api/student/message',
      header: cookie.cookie_header(),
      success: function(res) {
        that.setData({
          user: res.data
        })
      }
    })
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