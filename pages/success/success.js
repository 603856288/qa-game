const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    avatarUrl:wx.getStorageSync('avatarUrl'),
    nickName:wx.getStorageSync('nickName'),
    resultShow:true
  },
  onLoad() {
    new app.WeToast();//加载错误提示框
  },
  moreChance:function(){
    wx.navigateTo({
      url:"/pages/moreChance/moreChance"
    })
  },
  returnIndex:function(){
    wx.switchTab({
      url:"/pages/index/index"
    })
  },
  continue:function(){
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
        var challengeHaveCount = res.data.challengeHaveCount;
        if(challengeHaveCount>0){
          wx.redirectTo({
            url: '/pages/ready/ready'
          })
        }else{
          this.wetoast.toast({
              title: "今天挑战机会已用完，请明天再来！",
              duration: 2000
          })
        }
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });    
  },
  myInfo:function(){
    wx.navigateTo({
      url:"/pages/information/information"
    })
  },
  onShareAppMessage: function () {
    var openId = wx.getStorageSync('openId');
    return {
      title: '小信老师',
      path: '/pages/index/index?recommendOpenId=' + openId
    }
  }

});
