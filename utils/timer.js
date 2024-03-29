var length = 60;

function countdown(that) {
  var seconds = that.data.seconds;
  var captchaLabel = that.data.captchaLabel;
  if (seconds <= 1) {
    captchaLabel = '获取验证码';
    seconds = length;
    that.setData({
      captchaDisabled: false
    });
  } else {
    captchaLabel = '重发(' + --seconds + ')'
  }
  that.setData({
    seconds: seconds,
    captchaLabel: captchaLabel
  });
}

module.exports = {
  countdown: countdown,
  length: length
}