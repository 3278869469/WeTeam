// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    nickname: '',
    sex: '',
    age: '',
    adress: '',
    phone: '',
    shool: '',
    mail: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let phone = wx.getStorageSync('phone')
    this.setData({
      edit: false,
      phone: phone
    })
    // wx.cloud.database().collection('user').where({
    //   phone = this.data.phone
    // })
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

  // 按钮，判断是否为可编辑状态，改变编辑状态
  edit() {
    // 编辑资料状态
    if (this.data.edit) {
      this.setData({
        edit: false,
      })
    }
    // 查看资料状态
    else {
      this.setData({
        edit: true,
      })
    }
  },

  // 获取昵称
  nicknameInput: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  // 获取性别
  sexInput: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },

  // 获取年龄
  ageInput: function (e) {
    this.setData({
      age: e.detail.value
    })
  },

  // 获取地址
  adressInput: function (e) {
    this.setData({
      adress: e.detail.value
    })
  },

  // 获取学校
  shoolInput: function (e) {
    this.setData({
      shool: e.detail.value
    })
  },

  // 获取邮箱
  mailInput: function (e) {
    this.setData({
      mail: e.detail.value
    })
  },


})