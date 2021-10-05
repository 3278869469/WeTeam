//index.js  
//获取应用实例  
var app = getApp()  
Page({  
  data: {  
    movies:[  
    {url:'https://i.niupic.com/images/2021/08/23/9sCg.png'} ,  
    {url:'https://i.niupic.com/images/2021/08/23/9sCh.jpg'} ,  
    {url:'https://i.niupic.com/images/2021/08/23/9sCi.png'} ,  
    {url:'https://i.niupic.com/images/2021/08/23/9sCk.png'}, 
    ],
    contentitems:['','','','','',''],
  },
  onLoad: function () {  
  },

  // 页面跳转
  moreTeam(){
    wx.switchTab({ 
      url: '../team/team', 
      }) 
  },
})