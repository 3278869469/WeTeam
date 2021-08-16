// pages/logins/logins.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    codebtn: '发送验证码',
    disabled: false,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取输入账号 
  phone: function (e) {
    let phone = e.detail.value;
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!reg.test(phone)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: "none",
        duration: 2000
      })
      return false;
    }
    this.setData({
      phone: e.detail.value
    })
  },
  //发送验证码
  sendcode() {
    let that = this;
    let phone = this.data.phone;
    wx.request({
      url: 'http://www.tp6.com/lx/login/phonecode',
      data: {
        phone
      },
      dataType: 'json',
      success: ({
        data
      }) => {
        console.log(data);
        if (data.code == 200) {
          wx.showToast({
            title: '验证码已发送.请注意接收',
            icon: "success"
          })
          let time = 60;
          var timers = setInterval(function () {
            time--;
            if (time > 0) {
              that.setData({
                codebtn: time,
                disabled: true
              });
            } else {
              that.setData({
                codebtn: '发送验证码',
                disabled: false
              });
              clearInterval(timers)
            }
          }, 1000)
        } else {
          wx.showToast({
            title: data.msg,
            icon: "none",
            duration: 2000
          })
        }
      }
    })
  },

  // 登录处理
  login: function (evt) {
    // console.log(evt);
    var that = this;
    let val = evt.detail.value;
    if (val.phone == "") {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (val.code == "" || isNaN(val.code) || val.code.length != 4) {
      wx.showToast({
        title: '验证码格式不正确',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else {
      wx.request({
        url: 'http://www.tp6.com/lx/login/phone', // 仅为示例，并非真实的接口地址
        method: 'post',
        data: {
          username: that.data.username,
          password: that.data.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res);
          if (res.data.code == "200") {
            wx.switchTab({
              url: '/pages/list/list',
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  }
})