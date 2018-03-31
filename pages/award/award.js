const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    avatarUrl:wx.getStorageSync('avatarUrl'),
    nickName:wx.getStorageSync('nickName'),
    resultShow:true
  },
  onLoad() {
    wx.showLoading();
    var param={
      'openId':wx.getStorageSync('openId')
    }
    wx.request({
      url: host + '/api/getChallengeInfo', // 目标服务器 url
      dataType: 'json',
      method: 'POST',
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        var res = res.data;
        this.setData({
          giftCount:res.data.giftCount,
          challengeTotalCount:res.data.challengeTotalCount,
          challengeHaveCount:res.data.challengeHaveCount
        })
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
    var openId = wx.getStorageSync('openId');
    return {
      title: '小信老师',
      path: '/pages/index/index?recommendOpenId=' + openId
    }
  }

});
