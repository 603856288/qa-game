const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    avatarUrl:wx.getStorageSync('avatarUrl'),
    nickName:wx.getStorageSync('nickName'),
    resultShow:true
  },
  onLoad() {
    
  },
  moreChance:function(){
    wx.navigateTo({
      url:"/pages/moreChance/moreChance"
    })
  },
  myInfo:function(){
    wx.navigateTo({
      url:"/pages/information/information"
    })
  },
  onShareAppMessage: function () {
    return {
      title: '众安手机保险 爱机无忧',
      path: '/pages/index/index'
    }
  }

});
