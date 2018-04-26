const host = require('../../utils/data.js').host;
const app_recover_share_icon = require('../../utils/data.js').app_recover_share_icon;

const app = getApp();
Page({
  data: {
    avatarUrl:wx.getStorageSync('avatarUrl'),
    nickName:wx.getStorageSync('nickName'),
    user_open_id: wx.getStorageSync('openId'),
    user_nick_name: wx.getStorageSync('nickName'),
    resultShow:true,
    isShowModel: false,//控制弹窗是否显示，默认不显示
  },
  onLoad(){
    new app.WeToast();//加载错误提示框
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow:function() {
    wx.showLoading({
        mask : true,}
    );
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
        this.setData({
          giftCount:res.data.giftCount,
          challengeTotalCount:res.data.challengeTotalCount,
          challengeHaveCount:res.data.challengeHaveCount
        })
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
  },
  hideResult:function(){

  },

  receiptShareSuccess: function (ticket, iv, encryptedData) {
      var paramVal={
        'openId':wx.getStorageSync('openId')
      }
      if (ticket) {
        paramVal.groupOpenId = ticket
      }
      if (iv) {
        paramVal.iv = iv
      }
      if (encryptedData) {
        paramVal.encryptedData = encryptedData
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
      var that = this;
      var title = '['+wx.getStorageSync('nickName')+"@我"+']'+'你有一款王者荣耀皮肤可以免费领取！赶紧去领取!'
      return {
        title: title,
        imageUrl: app_recover_share_icon,
        path: '/pages/index/index?recommendOpenId=' + openId,
        success: function(res) {
          // 转发成功
          console.log(res)
          var tickets = res.shareTickets
          if (tickets.length>0) {
            var firstTicket = tickets[0]
            wx.getShareInfo({
              shareTicket: firstTicket,
              success: (res) => {
                console.log(res)
                that.receiptShareSuccess(firstTicket, res.iv, res.encryptedData)
              },
            })
          }
        },
        fail: function(res) {
          // 转发失败
          console.log(res)
        }
      }
    },


     showModelAction: function () {
       console.log('showModelAction');
       this.showModel({
         ModelId: 1,
         ModelTitle: '温馨提示',
         ModelContent: "进入客服对话后，回复 \"1\" 关注公众号领取挑战次数+5"
       })
     },
      //调用模态弹窗
      showModel: function (e){
        //将传过来的标题和内容展示到弹窗上
        this.setData({
          isShowModel: true,
          ModelId: e.ModelId,
          ModelTitle: e.ModelTitle,
          ModelContent: e.ModelContent
        })
      },
      //取消事件
      cancel: function(e){
        if (e.currentTarget.dataset.modelid == 0){
          console.log("用户点击了取消(1)")
        } else if (e.currentTarget.dataset.modelid == 1){
          console.log("用户点击了取消(2)")
        }
        //关闭模态弹窗
        this.setData({
          isShowModel: false
        })
      },
      //确定事件
      confirm: function(e){
        this.setData({
          isShowModel: false
        })
      },

      onHide: function () {
        this.setData({
          isShowModel: false
        })
      },


  });
