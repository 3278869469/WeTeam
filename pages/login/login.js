// //获取应用实例
// const app = getApp()

Page({
  data: {
    phone: '',
    password: ''
  },
  onLoad: function () {
    wx.cloud.init({
      traceUser: true,

    })
  },

  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录处理
  login: function () {
    let that = this
    let str = /^1\d{10}$/
    // 是否为空效验
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '手机号或密码不能为空',
        icon: 'none'
      })
      // 手机号正则效验
    } else if (!str.test(this.data.phone)) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
    } else {
      wx.cloud.database().collection('user').where({
        phone: this.data.phone
      }).get({
        success(res) {
          console.log('获取数据成功', res)
          let user = res.data[0]
          console.log('user', user)
          if (res.data.length == 0) {
            wx.showToast({
              title: '账号不存在',
              icon: 'none'
            })
          } else if (that.data.password == user.password) {
            wx.showToast({
              title: '登录成功',
            })
            // 保存用户的登录状态
            wx.setStorageSync('isLogin', true)
            wx.setStorageSync('phone', that.data.phone)
            // 跳转到个人中心页
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else {
            wx.showToast({
              title: '手机号或密码错误',
              icon: 'none'
            })
          }
        },
        fail(err) {
          console.log('获取数据失败', err)
        }
      })
    }
  },

  // 注册
  register() {
    // 跳转到注册界面
    wx.navigateTo({
      url: '../register/register'
    })
  }

})