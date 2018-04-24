// pages/blogaward/blogaward.js
const host = require('../../utils/data.js').host;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  receiveaward:function(){
    wx.showLoading();
    var param={
      'openId':wx.getStorageSync('openId')
    }
    wx.request({
      url: host + '/api/getAttenChallengeCount', // 目标服务器 url
      dataType: 'json',
      method: 'POST',
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        var resDict = res.data;
        var msg = resDict.msg
        wx.showModal({
          title: '温馨提示',
          content: msg,
          showCancel:false,
          success: function(res) {
            console.log((res));
            wx.switchTab({
              url:"/pages/index/index"
            })
            // if (res.confirm) {
            //   wx.redirectTo({
            //     url: '/pages/index/index'
            //   })
            // } else if (res.cancel) {
            // }
          }
        })
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
  },

})
