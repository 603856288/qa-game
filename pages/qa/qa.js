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
    chooseArr:[]
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
      wx.redirectTo({
        url:"/pages/success/success"
      })
      return false;
    }else{
      self.setData({
        qaId:this.data.list[index].id,
        question:this.data.list[index].title,
        option1:this.data.list[index].option1,
        option2:this.data.list[index].option2,
        option3:this.data.list[index].option3,
        option4:this.data.list[index].option4,
        answer:this.data.list[index].answer
      })
    }
    if(index<4){
      self.setData({
        time:12
      })
    }else if(index>3&&index<9){
      self.setData({
        time:8
      })
    }else if(index>8&&index<11){
      self.setData({
        time:5
      })
    }else{
      self.setData({
        time:3
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

        self.setData({
          resultShow:true,
          myAnswerRight:answer,
          chooseArr:arr
        })
      }
    },1000);

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
      self.setData({
        result:false,
        resultShow:true,
        myAnswerRight:answer,
        myAnswerError:index
      })
      if(qaIndex>3){
        self.submitChallenge(false);
        wx.redirectTo({
          url:"/pages/fail/fail?qaIndex=" + qaIndex
        })
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
  submitChallenge:function(tf){
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
        'token':''
      },
      success: (res) => {

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
    return {
      title: '小信老师',
      path: '/pages/index/index',
      success:function(e){
        console.log(e)
        self.setData({
          resultShow:false,
          showRight:false,
          myAnswerRight:0,
          myAnswerError:0
        })
        self.addOne();
      }
    }
  }

});
