const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    resultShow:false
  },
  onLoad() {
    
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
