// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    id: '',
    nickname: '',
    sex: '',
    age: '',
    address: '',
    phone: '',
    shool: '',
    mail: '',
    headportrait: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let phone = wx.getStorageSync('phone')
    this.setData({
      edit: false,
      phone: phone
    })
    this.getData()
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

  // 按钮，判断是否为可编辑状态，改变编辑状态
  edit() {
    // 编辑资料状态
    if (this.data.edit) {
      if (this.data.nickname == '') {
        wx.showToast({
          title: '昵称不能为空',
          icon: 'none'
        })
      } else if (this.data.address == '') {
        wx.showToast({
          title: '地址不能为空',
          icon: 'none'
        })
      } else if (this.data.shool == '') {
        wx.showToast({
          title: '学校不能为空',
          icon: 'none'
        })
      } else {
        console.log(this.data.id)
        this.editData()
      }
    }
    // 查看资料状态
    else {
      this.getData()
      this.setData({
        edit: true,
      })

    }
  },

  // 获取昵称
  nicknameInput: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  // 获取性别
  sexInput: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },

  // 获取年龄
  ageInput: function (e) {
    this.setData({
      age: e.detail.value
    })
  },

  // 获取地址
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  // 获取学校
  shoolInput: function (e) {
    this.setData({
      shool: e.detail.value
    })
  },

  // 获取邮箱
  mailInput: function (e) {
    this.setData({
      mail: e.detail.value
    })
  },

  getData() {
    // 云函数入口
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
          id: temp._id,
          nickname: temp.nickname,
          sex: temp.sex,
          age: temp.age,
          address: temp.address,
          shool: temp.shool,
          mail: temp.mail,
          headportrait: temp.headportrait
        })
      }).catch(err => {
        console.log('数据库检索错误', err) //打印错误信息
      })
  },

  editData() {
    // 云函数调用
    wx.cloud.callFunction({
        name: 'upUserData',
        data: {
          id: this.data.id,
          nickname: this.data.nickname,
          sex: this.data.sex,
          age: this.data.age,
          address: this.data.address,
          shool: this.data.shool,
          mail: this.data.mail,
          headportrait:this.data.headportrait,
        }
      })
      .then(res => {
        wx.showToast({
          title: '修改成功'
        })
        this.setData({
          edit: false,
        })
      })
      .catch(err => {
        console.log(err)
        wx.showToast({
          title: '修改失败',
          icon: 'none'
        })
      })
  },

  // 点击更换手机相册或者电脑本地图片   
  headimage: function () {
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
          headportrait: res.tempFilePaths
        })
      }
    })
  },

})