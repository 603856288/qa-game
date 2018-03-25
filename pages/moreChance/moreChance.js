const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    
  },
  onLoad() {
    
  },
  onShareAppMessage: function () {
    return {
      title: '小信老师',
      path: '/pages/index/index'
    }
  }

});
