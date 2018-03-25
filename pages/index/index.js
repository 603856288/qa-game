const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    tabIndex:0
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showLoading();
    wx.request({
      url: host + '/api/iq', // 目标服务器 url
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync("token")
      },
      success: (res) => {
        var res = res.data;
        this.setData({
          menuList:res.data
        })
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });




  },
  tabChange:function(e){
    var self = this;
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index;
    self.setData({
      tabIndex:index
    })
  },
  go:function(){
    wx.redirectTo({
      url: '/pages/ready/ready'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '小信老师',
      path: '/pages/index/index'
    }
  }

});
