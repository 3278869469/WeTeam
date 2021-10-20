// pages/teamDetail/teamDetail.js
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
    // console.log("id:",id)
    // console.log('myTeamId:',myTeamId)

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

  btnFuc() {
    if (this.data.btn == '加入队伍') {
      this.addTeam()
    } else if (this.data.btn == '退出队伍') {
      this.delTeam()
    }
  },

  addTeam() {
    console.log(this.data.teamNum)
    if (this.data.teamNum - this.data.num > 0) {
      console.log("未满人")
      wx.cloud.callFunction({
          name: 'addMyTeam',
          data: {
            userId: this.data.user,
            teamId: id,
            state: this.data.state,
            createTime: this.data.createTime,
            teamTile: this.data.teamTile,
            teamLogo: this.data.teamLogo,
          }
        })
        .then(res => {
          console.log("加入成功", res)
          
          console.log('num = ', this.data.num)
          console.log('teamHeat = ', this.data.teamHeat+1)
          wx.cloud.callFunction({
              name: 'addTeam',
              data: {
                id: id,
                joinNum: (this.data.num + 1),
                teamHeat: (this.data.teamHeat + 1),
              }
            })
            .then(res => {
              console.log('调用云函数成功', res.result.errMsg)
              wx.showToast({
                title: '成功加入',
              })
              this.getDetail()
            })
            .catch(err => {
              console.log('云函数调用失败', err)
              wx.showToast({
                title: '加入失败',
                icon: 'none'
              })
            })
        })
        .catch(err => {
          console.log("加入失败", err)
          wx.showToast({
            title: '加入失败',
            icon: 'none'
          })
        })
    } else {
      wx.showToast({
        title: '队伍已满人',
        icon: 'none'
      })
    }
  },

  delTeam() {
    console.log("myTeamId:", id)
    wx.cloud.callFunction({
        name: 'delMyTeam',
        data: {
          id: id
        }
      })
      .then(res => {
        console.log("退出成功", res)
        wx.showToast({
          title: '成功退出',
        })
      })
      .catch(err => {
        console.log("退出失败", err)
        wx.showToast({
          title: '退出失败',
          icon: 'none'
        })
      })
  },

})