const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    avatarUrl:wx.getStorageSync('avatarUrl'),
    nickName:wx.getStorageSync('nickName'),
    resultShow:true,
    qaIndex:""
  },
  onLoad(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
    new app.WeToast();//加载错误提示框
    console.log(e)
    var qaIndex = e.qaIndex;
    this.setData({
      qaIndex:qaIndex
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
  findGzh:function(){
    this.setData({
      dialog_gzhShow:true
    })
  },
  hideDialog:function(){
    this.setData({
      dialog_gzhShow:false
    })
  },
  receiptShareSuccess : function(identify) {
    var paramVal={
      'recommendOpenId':identify,
      'openId':wx.getStorageSync('openId')
    }
    var that = this;
    wx.request({
      url: host + '/api/fromShare', // 目标服务器 url
      dataType: 'json',
      method: 'POST',
      data: paramVal,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync("token")
      },
      success: (res) => {
        console.log(res);
        if(res.data.error == 0){
          that.wetoast.toast({
              title: res.data.msg,
              duration: 2000
          }) 
        }else{
          // 回执失败
          if (res.data.msg) {
            that.wetoast.toast({
                title: res.data.msg,
                duration: 2000
            })            
          }
        }
      },
      fail: (res) => {

      },
      complete: (res) => {
        //wx.hideLoading();
      }
    });
  },
  onShareAppMessage: function () {
    var openId = wx.getStorageSync('openId');
    console.log(openId)
    var that = this;
    return {
      title: '小信老师',
      imageUrl: 'https://staticdaily.zhongan.com/website/open/assets/wp/qaGame/shareImg.png',
      path: '/pages/index/index?recommendOpenId=' + openId,
      success: function(res) {
        // 转发成功
        var tickets = res.shareTickets
        if (tickets.length>0) {
          var firstTicket = tickets[0]
          console.log(this);
          that.receiptShareSuccess(firstTicket)
        }
      },
      fail: function(res) {
        // 转发失败
        console.log(res)
      }
    }
  }

});
