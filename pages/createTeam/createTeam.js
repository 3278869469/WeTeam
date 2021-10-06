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
    teamHeat: 0, //活动热度
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
      isLogin: isLogin,
      initiator: phone, //发起人
    })
    console.log(phone)
    if (!this.data.isLogin) {
      wx.reLaunch({
        url: '../login/login'
      })
    } else {
      this.init()
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
    // this.init()
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
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var date = Y + "-" + M + "-" + D;

    this.setData({
      teamTile: '',
      active: '', //活动分区
      teamDetail: '',
      teamLogo: '/icons/logo2.jpg',
      teamNum: '',
      joinNum: 1,
      initiationTime: date, //发起时间
      changeTime: date, //上一次修改的时间
      startTime: '',
      endTime: '',
      state: '组队中', //状态
      teamHeat: 0, //活动热度
      school: '',
      area: '',
    })
  },

  teamTileInput: function (e) {
    this.setData({
      teamTile: e.detail.value
    })
    console.log(this.data.teamTile)
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
        console.log('图片上成功', res)
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

  addTeamData() {
    let that = this
    console.log(that.data.teamTile)
    if (that.data.teamTile == '') {
      wx.showToast({
        title: '队伍名称不能为空',
        icon: 'none'
      })
    } else if (that.data.active == '') {
      wx.showToast({
        title: '请选择分区',
        icon: 'none'
      })
    } else if (that.data.teamDetail == '') {
      wx.showToast({
        title: '请描述队伍详情',
        icon: 'none'
      })
    } else if (that.data.teamNum == '') {
      wx.showToast({
        title: '请输入队伍人数',
        icon: 'none'
      })
    } else if (that.data.startTime == '') {
      wx.showToast({
        title: '请选择活动开始时间',
        icon: 'none'
      })
    } else if (that.data.endTime == '') {
      wx.showToast({
        title: '请选择活动结束时间',
        icon: 'none'
      })
    } else if (that.data.school == '') {
      wx.showToast({
        title: '请输入活动高校',
        icon: 'none'
      })
    } else if (that.data.area == '') {
      wx.showToast({
        title: '请选择活动地区',
        icon: 'none'
      })
    } else {

      wx.cloud.database().collection('team').add({
          data: {
            // teamId: that.data.teamId,
            teamTile: that.data.teamTile,
            active: that.data.active, //活动分区
            teamDetail: that.data.teamDetail,
            teamLogo: that.data.teamLogo,
            initiator: that.data.initiator, //发起人
            teamNum: that.data.teamNum,
            joinNum: that.data.joinNum,
            initiationTime: that.data.initiationTime, //发起时间
            changeTime: that.data.changeTime, //上一次修改的时间
            startTime: that.data.startTime,
            endTime: that.data.endTime,
            state: that.data.state, //状态
            teamHeat: that.data.teamHeat, //活动热度
            school: that.data.school,
            area: that.data.area,
          },
          success(res) {
            wx.showToast({
              title: '发布成功',
            })
            that.init()
          },
          fail(err) {
            wx.showToast({
              title: '发布失败',
              icon: 'none'
            })
          }
        })
    }

  }

})