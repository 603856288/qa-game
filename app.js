//app.js
const {WeToast} = require('./components/wetoast/wetoast.js');
const host = require('./utils/data.js').host;

App({
  WeToast,
  onLaunch: function () {
    this.getLogin();
  },
  getLogin:function(){
    var self = this;
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    wx.login({
      success: function(res) {
        //console.log(res)
        if (res.code) {
          //发起网络请求
          wx.showLoading();
          var param = {
            'code' : res.code
          }
          wx.request({
            url: host + "/api/login",
            method: "POST",
            data: param,
            header: { "content-type": 'application/x-www-form-urlencoded' },
            success: (res => {
              wx.setStorageSync('token',res.data.data.token.access_token);
              wx.setStorageSync('openId',res.data.data.user.openId);
              wx.getUserInfo({
                success: function(res) {
                  var rawData = res.rawData;
                  rawData = JSON.parse(rawData);
                  wx.setStorageSync('nickName',rawData.nickName);
                  wx.setStorageSync('avatarUrl',rawData.avatarUrl);
                  wx.setStorageSync('gender',rawData.gender);
                  /*var encryptedData = res.encryptedData;
                  var iv = res.iv;
                  var thirdSession = wx.getStorageSync('thirdSession');
                  var param = {
                     'encryptedData': encryptedData,
                     'iv':iv,
                     'thirdSession':thirdSession
                  }
                  wx.request({
                    url: host + "/common/decodeUserInfo",
                    method: "POST",
                    data: param,
                    header: { "content-type": 'application/x-www-form-urlencoded' },
                    success: (res => {
                      var res = res.data;
                      self.globalData.isLogin = true;
                      if(res.respCode=='000000'&&cb){
                        cb();
                      }
                    }),
                    fail: (error => {
                      wx.hideLoading();
                    })
                  }) */
                }
              })
            }),
            fail: (error => {
              
            }),
            complete: (res) => {
              wx.hideLoading();
            }
          })
        } else {
          //console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail:function(e){
        //console.log(e)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})