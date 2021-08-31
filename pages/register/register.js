// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    repassword: ''
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

  },

  // 获取输入手机号 
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
  // 获取输入确认密码 
  passwordReinput: function (e) {
    this.setData({
      repassword: e.detail.value
    })
  },

  register: function () {
    let that = this
    let str = /^1\d{10}$/
    let pass = /^[a-zA-Z]\w{5,17}$/
    // 是否为空效验
    if (this.data.phone.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      // 手机号正则效验
    } else if (this.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
    } else if (this.data.repassword.length == 0) {
      wx.showToast({
        title: '必须确认密码',
        icon: 'none'
      })
    } else if (!str.test(this.data.phone)) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
    } else if (!pass.test(this.data.password)) {
      wx.showToast({
        title: '密码必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线',
        icon: "none"
      })
    } else if (this.data.repassword != this.data.password) {
      wx.showToast({
        title: '密码不一致',
        icon: "none"
      })
    } else {
      wx.cloud.database().collection('user').where({
          phone: this.data.phone
        })
        .get()
        .then(res => {
          if (res.data.length == 0) {
            //通过判断data数组长度是否为0来进行下一步的逻辑处理
            wx.cloud.database().collection('user').add({
              data: {
                phone: this.data.phone,
                password: this.data.password,
                nickname: "",
                sex: "",
                age: "",
                address: "",
                shool: "",
                mail: "",
                headportrait: "",
              },
              success(res) {
                wx.showToast({
                  title: '注册成功',
                })
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              },
              fail(err) {
                wx.showToast({
                  title: '注册失败',
                })
              }
            })
          } else {
            wx.showToast({
              title: '账号已存在',
              icon: 'none'
            })
          }
        })
        .catch(err => {
          console.log("获取错误", err)
        })

    }
  },
})