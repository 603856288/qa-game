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
  hideResult:function(){
    
  },
  onShareAppMessage: function () {
    return {
      title: '小信老师',
      path: '/pages/index/index'
    }
  }

});
