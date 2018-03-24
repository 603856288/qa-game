const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    resultShow:false
  },
  onLoad() {
    wx.showLoading();
    wx.request({
      url: host + '/api/challenge', // 目标服务器 url
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
  },
  hideResult:function(){
    
  },
  onShareAppMessage: function () {
    return {
      title: '众安手机保险 爱机无忧',
      path: '/pages/index/index'
    }
  }

});
