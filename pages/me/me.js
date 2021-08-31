// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    isLogin: false,
    nickname: '',
    headportrait: '/icons/logo.PNG',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let phone = wx.getStorageSync('phone')
    let isLogin = wx.getStorageSync('isLogin')
    this.setData({
      phone: phone,
      isLogin: isLogin
    })
    this.getdata()
    if (!this.data.isLogin) {
      wx.reLaunch({
        url: '../login/login'
      })
    }
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
    this.getdata()
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

  getdata() {
    wx.cloud.database().collection("user").where({
        phone: this.data.phone
      })
      .get()
      .then(res => {
        let temp = res.data[0]
        console.log(res)
        this.setData({
          nickname: temp.nickname,
          headportrait: temp.headportrait,
        })
      })
      .catch(err => {

      })
  },

  personal() {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },

  aboutWe() {
    wx.navigateTo({
      url: '../aboutWe/aboutWe'
    })
  },

  more() {
    wx.navigateTo({
      url: '../more/more'
    })
  },

  message() {
    wx.navigateTo({
      url: '../message/message'
    })
  },

  teamHistory() {
    wx.navigateTo({
      url: '../teamHistory/teamHistory'
    })
  }

})