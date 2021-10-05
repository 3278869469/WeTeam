Page({
  data: {
    themeArr: {
      nickName: '全部',
      age: '同学校',
      tell: '同地区',
    },
    itemArr: [],
    aArr: {
      all: '全部',
      bisai: '比赛',
      sport: '运动',
      athor: '其他',
    },
    bArr: [],

    list: [],
  },

  onLoad: function (options) {
    this.init()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init()
  },

  init() {
    // 云函数调用
    wx.cloud.callFunction({
        name: 'getTeam',
      })
      .then(res => {
        console.log('队伍列表申请成功', res)
        this.setData({
          list: res.result.data
        })
      }).catch(err => {
        console.log('数据库检索错误', err) //打印错误信息
      })
  },

  goDetail(e){
    console.log('点击跳转队伍id', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/teamDetail/teamDetail?id=' + e.currentTarget.dataset.id,
    })
  },

});