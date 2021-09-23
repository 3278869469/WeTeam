// pages/createTeam/createTeam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    isLogin: false,

    teamId: '',
    teamTile: '',
    active: '', //活动分区
    teamDetail: '',
    teamLogo: '/icons/logo2.jpg',
    initiator: '', //发起人
    teamNum: '',
    joinNum: '',
    initiationTime: '', //发起时间
    changeTime: '', //上一次修改的时间
    startTime: '',
    endTime: '',
    state: '', //状态
    teamHeat: '', //活动热度
    school: '',
    area: '',

    array: ['比赛', '运动', '其他'],
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

  teamTileInput: function (e) {
    this.setData({
      teamTile: e.detail.value
    })
  },

  selectActive: function (e) {
    this.setData({
      active: e.detail.value
    });
  },

  // 点击更换手机相册或者电脑本地图片   
  teamLogoImg: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9     
      sizeType: ['original', 'compressed'],
      // 指定是原图还是压缩图，默认两个都有     
      sourceType: ['album', 'camera'],
      // 指定来源是相册还是相机，默认两个都有   
      success: function (res) {
        console.log('图片上成功',res)
        _this.setData({
          teamLogo: res.tempFilePaths
        })
      }
    })
  },


  selectStartTime: function (e) {
    this.setData({
      startTime: e.detail.value
    });
  },

  teamDetailInput: function (e) {
    this.setData({
      teamDetail: e.detail.value
    })
  },

  teamNumInput: function (e) {
    this.setData({
      teamNum: e.detail.value
    })
  },

  schoolInput: function (e) {
    this.setData({
      school: e.detail.value
    })
  },

  selectArea: function (e) {
    this.setData({
      area: e.detail.value
    });
  },

  selectStartTime: function (e) {
    this.setData({
      startTime: e.detail.value
    });
  },

  selectEndTime: function (e) {
    this.setData({
      endTime: e.detail.value
    });
  },
  

})