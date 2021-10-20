Page({
  data: {
    list: [],
    searchInp: "",
    menuTapCurrent1: 0,
    menuTapCurrent: 0,
    address: '',
    shool: '',
    phone: '',
  },

  onLoad: function (options) {
    this.init()

    let phone = wx.getStorageSync('phone')
    this.setData({
      phone: phone
    })
    wx.cloud.callFunction({
        name: 'getUserData',
        data: {
          phone: this.data.phone
        }
      })
      .then(res => {
        console.log('数据库检索成功', res) //打印返回结果
        let temp = res.result.data[0]
        // console.log(temp)
        this.setData({
          address: temp.address,
          shool: temp.shool,
        })
      }).catch(err => {
        console.log('数据库检索错误', err) //打印错误信息
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.GET()
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

  goDetail(e) {
    console.log('点击跳转队伍id', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/teamDetail/teamDetail?id=' + e.currentTarget.dataset.id + '&btn=' + '加入队伍',
    })
  },

  search(e) {
    let str = e.detail.value

    wx.cloud.database().collection("team").where({ //collectionName 表示欲模糊查询数据所在collection的名
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


  menuTap: function (e) {
    var current = e.currentTarget.dataset.current; //获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent: current
    });
    this.GET()
  },

  menuTap1: function (e) {
    var current1 = e.currentTarget.dataset.current1; //获取到绑定的数据
    //改变menuTapCurrent的值为当前选中的menu所绑定的数据
    this.setData({
      menuTapCurrent1: current1
    });
    this.GET()
  },

  GET() {
    if (this.data.menuTapCurrent == 0 && this.data.menuTapCurrent1 == 0) {
      this.init()
    } else if (this.data.menuTapCurrent == 1 && this.data.menuTapCurrent1 == 0) {
      wx.cloud.database().collection('team')
        .where({
          school: this.data.shool
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else if (this.data.menuTapCurrent == 2 && this.data.menuTapCurrent1 == 0) {
      wx.cloud.database().collection('team')
        .where({
          area: this.data.address
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else if (this.data.menuTapCurrent == 0 && this.data.menuTapCurrent1 == 1) {
      wx.cloud.database().collection('team')
        .where({
          active: "0"
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else if (this.data.menuTapCurrent == 1 && this.data.menuTapCurrent1 == 1) {
      wx.cloud.database().collection('team')
        .where({
          school: this.data.shool,
          active: "0"
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else if (this.data.menuTapCurrent == 2 && this.data.menuTapCurrent1 == 1) {
      wx.cloud.database().collection('team')
        .where({
          area: this.data.address,
          active: "0"
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else if (this.data.menuTapCurrent == 0 && this.data.menuTapCurrent1 == 2) {
      wx.cloud.database().collection('team')
        .where({
          active: "1"
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else if (this.data.menuTapCurrent == 1 && this.data.menuTapCurrent1 == 2) {
      wx.cloud.database().collection('team')
        .where({
          school: this.data.shool,
          active: "1"
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else if (this.data.menuTapCurrent == 2 && this.data.menuTapCurrent1 == 2) {
      wx.cloud.database().collection('team')
        .where({
          area: this.data.address,
          active: "1"
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else if (this.data.menuTapCurrent == 0 && this.data.menuTapCurrent1 == 3) {
      wx.cloud.database().collection('team')
        .where({
          active: "2"
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else if (this.data.menuTapCurrent == 1 && this.data.menuTapCurrent1 == 3) {
      wx.cloud.database().collection('team')
        .where({
          school: this.data.shool,
          active: "2"
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else if (this.data.menuTapCurrent == 2 && this.data.menuTapCurrent1 == 3) {
      wx.cloud.database().collection('team')
        .where({
          area: this.data.address,
          active: "2"
        })
        .get()
        .then(res => {
          console.log('搜索成功', res)
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log('搜索失败', err) //打印错误信息
        })

    } else {
      this.init()
    }
  },


});