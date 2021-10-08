//index.js  
//获取应用实例  
var app = getApp()  
Page({  
  data: {  
    movies:[  
    {url:'/icons/logo2宽.jpg'} ,  
    {url:'/icons/top1.JPG'} ,  
    {url:'/icons/top2.JPG'} ,  
    {url:'/icons/top3.JPG'}, 
    ],
    contentitems:['','','','','',''],
    list:[],
  },
  onLoad: function () {  
    this.getRecommend()

  },

  // 页面跳转
  moreTeam(){
    wx.switchTab({ 
      url: '../team/team', 
      }) 
  },

  getRecommend(){
    wx.cloud.database().collection('team').orderBy('teamHeat', 'desc').limit(6).get()
    .then(res => {
      console.log('队伍列表申请成功', res)
      this.setData({
        list: res.data
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


})