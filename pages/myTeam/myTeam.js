// pages/myTeam/myTeam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    phone: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let phone = wx.getStorageSync('phone')
    this.setData({
      phone: phone,
    })
    this.init()

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

  init() {
    // 云函数调用
    wx.cloud.database().collection('team').where({
        initiator: this.data.phone
      }).get()
      .then(res => {
        console.log('队伍列表申请成功', res)
        this.setData({
          list: res.data
        })
      }).catch(err => {
        console.log('数据库检索错误', err) //打印错误信息
      })
  },

  goDetail(e) {
    console.log('点击跳转队伍id', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/myTeamDetail/myTeamDetail?id=' + e.currentTarget.dataset.id,
    })
  },

})