const host = require('../../utils/data.js').host;
const nIndex = require('../../utils/data.js').nIndex;
const app = getApp();
Page({
  data: {
    avatarUrl:wx.getStorageSync('avatarUrl'),
    nickName:wx.getStorageSync('nickName'),
    resultShow:false,
    showRight:false,
    qaIndex:0,
    time:12,
    timer:null,
    list:[],
    question:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    result:true,
    qaId:'',
    chooseArr:[],
    needGzh:1
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showLoading();
    var param={
      'openId':wx.getStorageSync('openId')
    }
    wx.request({
      url: host + '/api/challenge', // 目标服务器 url
      dataType: 'json',
      method: 'POST',
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        var res = res.data;
        console.log(res.data)
        this.setData({
          list:res.data
        })
        this.showQA();
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
  },
  showQA:function(){
    var self = this;
    var index = self.data.qaIndex;
    if(index>11){
      self.submitChallenge(true);
      return false;
    }else{
      self.setData({
        qaId:this.data.list[index].id,
        time:this.data.list[index].answerTime,
        question:this.data.list[index].title,
        option1:this.data.list[index].option1,
        option2:this.data.list[index].option2,
        option3:this.data.list[index].option3,
        option4:this.data.list[index].option4,
        answer:this.data.list[index].answer
      })
    }
    clearInterval(self.data.timer);
    self.data.timer = setInterval(function(){
      if(self.data.time>0){
        self.data.time--;
        self.setData({
          time:self.data.time
        })
      }else{
        clearInterval(self.data.timer);
        var answer = self.data.answer;
        var arr = self.data.chooseArr,obj={};
        obj.qId = self.data.qaId;
        obj.result = false;
        arr.push(obj);
        console.log(arr)
        if(index>3&&index<7){
          self.isNeedGzh();
        }else{
          self.setData({
            needGzh:1
          })
        }
        self.setData({
          resultShow:true,
          myAnswerRight:answer,
          chooseArr:arr
        })

        if(index>6){
          self.submitChallenge(false);
        }  
      }
    },1000);

  },
  closeBtn:function(){
    this.submitChallenge(false);
  },
  chooseOne:function(e){
    var self = this;
    var index = e.currentTarget.dataset.index;
    var answer = self.data.answer;
    var qaIndex = self.data.qaIndex;
    if(answer == index){
      self.setData({
        result:true,
        myAnswerRight:answer,
        showRight:true
      })
      setTimeout(function(){
        self.setData({
          showRight:false,
          myAnswerRight:0,
          myAnswerError:0
        })
        self.addOne();
      },1000)
    }else{
      if(qaIndex>3&&qaIndex<7){
        self.isNeedGzh();
      }else{
        self.setData({
          needGzh:1
        })
      }
      self.setData({
        result:false,
        resultShow:true,
        myAnswerRight:answer,
        myAnswerError:index
      })
      if(qaIndex>6){
        self.submitChallenge(false);
      }  
    }
    var arr = self.data.chooseArr,obj={};
    obj.qId = self.data.qaId;
    obj.result = self.data.result;
    arr.push(obj);
    console.log(arr)
    self.setData({
      chooseArr:arr
    })
  },
  addOne:function(){
    var self = this;
    var qaIndex = self.data.qaIndex+1;
    self.setData({
      qaIndex:qaIndex
    })
    self.showQA();
  },
  isNeedGzh:function(){
    var self = this;
    var param = {
      openId:wx.getStorageSync('openId')
    }
    wx.showLoading();
    wx.request({
      url: host + '/api/isAtten', // 目标服务器 url
      dataType: 'json',
      data:param,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        var isNeed = res.data.data;
        self.setData({
          needGzh:isNeed
        })
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
  },
  submitChallenge:function(tf){
    var self = this;
    var param = {
      openId:wx.getStorageSync('openId'),
      result:tf,
      detail:JSON.stringify(this.data.chooseArr)
    }
    wx.showLoading();
    wx.request({
      url: host + '/api/submitChallenge', // 目标服务器 url
      dataType: 'json',
      data:param,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(tf)
        if(!tf){
           wx.redirectTo({
            url:"/pages/fail/fail?qaIndex=" + self.data.qaIndex
          }) 
        }else{
          wx.redirectTo({
            url:"/pages/success/success"
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
  onShareAppMessage: function () {
    var self = this;
    var qaIndex = self.data.qaIndex;
    var openId = wx.getStorageSync('openId');
    return {
      title: '小信老师',
      path: '/pages/index/index?recommendOpenId=' + openId,
      success:function(e){
        if(e.shareTickets){
          self.setData({
            resultShow:false,
            showRight:false,
            myAnswerRight:0,
            myAnswerError:0
          })
          self.addOne();
        }else{
          wx.showModal({
            title: '提示',
            content: "请转发到群！",
            showCancel:false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    }
  }
});
