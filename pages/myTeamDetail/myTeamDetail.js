// pages/myTeamDetail/myTeamDetail.js
var id = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['比赛', '运动', '其他'],
    list: [],
    user: '',
    state: '',
    createTime: '',
    num: 0,
    teamNum: 0,
    teamTile: '',
    teamLogo: '',
    btn: '',
    myTeamId: '',
    teamHeat: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
    this.setData({
      btn: options.btn,
      myTeamId: options.myTeamId,
    })
    this.getDetail()
    let phone = wx.getStorageSync('phone')
    this.setData({
      user: phone, //发起人
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

  getDetail() {
    wx.cloud.database().collection('team')
      .doc(id)
      .get()
      .then(res => {
        console.log('队伍详情页请求成功', res.data)
        this.setData({
          list: res.data,
          state: res.data.state,
          createTime: res.data.initiationTime,
          num: res.data.joinNum,
          teamNum: res.data.teamNum,
          teamTile: res.data.teamTile,
          teamLogo: res.data.teamLogo,
          teamHeat: res.data.teamHeat,
        })
        // console.log("list", res.data.state)

      })
      .catch(err => {
        console.log('队伍详情页请求失败', err)
      })
  },

  edit(){

  },
  
  dismiss(){

  },


})