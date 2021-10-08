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
    searchInp: "",
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
    this.getMyTeam()
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
          list: res.data,
          n: res.data.length,
        })
        console.log(this.data.n)
      })
      .catch(err => {
        console.log("查询失败", err)
      })
  },

  goDetail(e) {
    console.log('点击跳转队伍id', e.currentTarget.dataset.myTeamId)
    wx.navigateTo({
      url: '/pages/teamDetail/teamDetail?id=' + e.currentTarget.dataset.id + '&btn=' + '退出队伍' + '&myTeamId=' + e.currentTarget.dataset.myTeamId,
    })
  },

  search(e) {
    let str = e.detail.value

    wx.cloud.database().collection("myTeam").where({ //collectionName 表示欲模糊查询数据所在collection的名
        teamTile: { //teamTile表示欲模糊查询数据所在列的名
          $regex: '.*' + str + '.*', //str表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: 'i' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).get()
      .then(res => {
        console.log('搜索成功', res)
        this.setData({
          list: res.data
        })
      }).catch(err => {
        console.log('搜索失败', err) //打印错误信息
      })
  },

})