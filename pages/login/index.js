<<<<<<< HEAD

// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    let isLogin = wx.getStorageSync('isLogin')
    this.setData({
      userInfo: userInfo,
      isLogin: isLogin
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

  },

  login() {
    console.log('登录点击事件')
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('授权成功', res.userInfo)
        let userInfo = res.userInfo
        this.setData({
          isLogin: true,
          userInfo: userInfo
        })
        wx.setStorageSync('userInfo', userInfo)
        wx.setStorageSync('isLogin', true)
      },
      fail: (err) => {
        console.log('授权失败', err)
      }
    })
  },

  loginOut() {
    this.setData({
      isLogin: false,
      userInfo: null
    })
    wx.setStorageSync('userInfo', null)
    wx.setStorageSync('isLogin', false)
  }
})
=======
Page({
  getUserProfile(e){
    console.log(e);
  }
})
>>>>>>> master
