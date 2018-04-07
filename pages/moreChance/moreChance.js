const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    
  },
  onLoad() {
    
  },
  onShareAppMessage: function () {
    var openId = wx.getStorageSync('openId');
    return {
      title: '小信老师',
      imageUrl: 'https://staticdaily.zhongan.com/website/open/assets/wp/qaGame/shareImg.png',
      path: '/pages/index/index?recommendOpenId=' + openId
    }
  }

});
