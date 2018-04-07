const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    imgList:['https://staticdaily.zhongan.com/website/open/assets/wp/qaGame/3.png','https://staticdaily.zhongan.com/website/open/assets/wp/qaGame/2.png','https://staticdaily.zhongan.com/website/open/assets/wp/qaGame/1.png','https://staticdaily.zhongan.com/website/open/assets/wp/qaGame/0.png'],
    imgSrc:'https://staticdaily.zhongan.com/website/open/assets/wp/qaGame/3.png',
    time:0,
    avatarUrl:wx.getStorageSync('avatarUrl'),
    nickName:wx.getStorageSync('nickName')
  },
  onLoad() {
    var self = this;
    var timer = setInterval(function(){
      if(self.data.time<3){
        self.data.time++;
        self.setData({
          imgSrc:self.data.imgList[self.data.time]
        })
      }else{
        wx.redirectTo({
          url: '/pages/qa/qa'
        })
        clearInterval(timer);
      }
    },1000);
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
