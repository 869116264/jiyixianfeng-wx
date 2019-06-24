function getCookieHeader() {
  return {
    'content-type': 'application/json',
    'cookie': wx.getStorageSync('sessionid')
  }
}

module.exports = {
  cookie_header: getCookieHeader
}