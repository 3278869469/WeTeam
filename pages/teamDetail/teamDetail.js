// pages/teamDetail/teamDetail.js
var id = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['比赛', '运动', '其他'],
    // user: '',
    // state: '',
    // createTime: '',
    // num: 0,
    // teamNum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
    this.getDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
    let phone = wx.getStorageSync('phone')
    this.setData({
      user: phone, //发起人
    })

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

          state:res.data.state,
          createTime: res.data.initiationTime,
          num:res.data.state.joinNum,
          teamNum:res.data.state.teamNum,
        })
      })
      .catch(err => {
        console.log('队伍详情页请求失败', err)
      })
  },

  addTeam() {
    if (this.teamNum - this.num > 0) {
      wx.cloud.database().collection('myTeam').add({
        data: {
          userId: this.user,
          teamId: id,
          state: this.state,
          createTime: this.createTime,
        }
      })
        .then(res => {
          num = num+1
          wx.cloud.callFunction({
              name: 'addTeam',
              data: {
                id: id,
                teamNum: num
              }
            })
            .then(res => {
              console.log('调用云函数成功', res.result.errMsg)
            })
            .catch(err => {
              console.log('云函数调用失败', err)
            })

          wx.showToast({
            title: '成功加入',
          })
        })
        .catch(err => {
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

})