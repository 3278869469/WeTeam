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
    searchInp:"",
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
      url: '/pages/teamDetail/teamDetail?id=' + e.currentTarget.dataset.id +'&btn='+'加入队伍',
    })
  },

  search(e){
    let str = e.detail.value

    wx.cloud.database().collection("team").where({	 	//collectionName 表示欲模糊查询数据所在collection的名
       teamTile:{								//teamTile表示欲模糊查询数据所在列的名
         $regex:'.*' + str + '.*',		//str表示欲查询的内容，‘.*’等同于SQL中的‘%’
         $options: 'i'							//$options:'1' 代表这个like的条件不区分大小写,详见开发文档
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

});