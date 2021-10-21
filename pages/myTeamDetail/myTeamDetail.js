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

    edit: true,
    btnString:"修改队伍信息",
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

  edit() {
    if(this.data.btnString == "修改队伍信息"){
      this.setData({
        edit: false,
        btnString:"保存"
      })
    }else{
      this.setData({
        edit: true,
        btnString:"修改队伍信息"
      })
    }
    

  },

  dismiss() {
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
    var nowDate = Y + "-" + M + "-" + D;
    console.log(nowDate)

    wx.cloud.database().collection('dismissTeam').add({
      data: {
        teamId:id,
        state:'已解散',
        dismissTime:nowDate,
        teamTile:this.data.teamTile,
        teamLogo:this.data.teamLogo
      },
      success(res) {
        wx.showToast({
          title: '解散成功',
        })
      },
      fail(err) {
        wx.showToast({
          title: '解散失败',
          icon: 'none'
        })
      }
    })

  },

  timeStamp(value) {
    let date = new Date(value*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let sdate = ("0" + date.getDate()).slice(-2);
    let hour = ("0" + date.getHours()).slice(-2);
    let minute = ("0" + date.getMinutes()).slice(-2);
    let second = ("0" + date.getSeconds()).slice(-2);
    // 拼接
    let result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute //+ ":" + second;
    //let result = month + "." + sdate //+ ":" + second;
    // 返回
    return result;
  },


})