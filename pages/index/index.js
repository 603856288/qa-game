const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    tabIndex:1
  },
  onLoad() {
    
  },
  tabChange:function(e){
    var self = this;
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index;
    self.setData({
      tabIndex:index
    })
  },
  onShareAppMessage: function () {
    return {
      title: '众安手机保险 爱机无忧',
      path: '/pages/index/index'
    }
  }

});
