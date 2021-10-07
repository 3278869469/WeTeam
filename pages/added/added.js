// pages/added/added.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    isLogin: false,
    list: [],
    n: 0,
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
    if (!this.data.isLogin) {
      wx.reLaunch({
        url: '../login/login'
      })
    }

    this.getMyTeam()
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

  getMyTeam() {
    wx.cloud.database().collection('myTeam').where({
        userId: this.data.phone
      }).get()
      .then(res => {
        console.log("查新成功", res)
        this.setData({
          list:res.data,
          n:res.data.length,
        })
        console.log(this.data.n)
      })
      .catch(err => {
        console.log("查询失败", err)
      })
  },

})