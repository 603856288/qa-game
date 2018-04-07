const host = require('../../utils/data.js').host;
const app = getApp();
Page({
  data: {
    resultShow:true,
    valueList:{
      name:"",
      phone:"",
      qq:"",
      wechat_id:""
    },
    regList:[{
      key:"name",
      text:"姓名不能为空",
      error:"姓名格式错误"
    },{
      key:"phone",
      text:"手机号不能为空",
      error:"手机号格式错误"
    },{
      key:"qq",
      text:"qq号不能为空",
      error:"qq号格式错误"
    },{
      key:"wechat_id",
      text:"微信号不能为空",
      error:"微信号格式错误"
    }]
  },
  onLoad() {
    new app.WeToast();//加载错误提示框
  },
  inputSave:function(e){
    var list = this.data.valueList;
    var val = e.detail.value;
    var key = e.currentTarget.dataset.key;
    //console.log(list)
    for(var i in list){
      if(i==key){
        list[i] = val;
      }
    }
    this.setData({
      valueList:list
    });
  },
  formSubmit:function(e){
    console.log(e)
    var obj = e.detail.value,tt="",self=this;
    
    var reg,noError,hasError;
    tt = this.data.regList;
    
    for(var i=0,j=tt.length;i<j;i++){

      for(var key in obj){
        if(tt[i].key == key){
          //console.log(tt[i]+":"+key);
          noError = tt[i].text;
          hasError = tt[i].error;
          switch(tt[i].key){
            case "phone":reg=/^1[0-9][0-9]\d{8}$/;break; //手机号
            default:reg=/.*/;break;   
          }
          if(reg){
            if(obj[key]==""){
              self.wetoast.toast({
                  title: noError,
                  duration: 1000
              })
              return false;
            }
           // console.log(reg.test(obj[key]));
            if(!reg.test(obj[key])){
              //console.log(key+"----"+reg+"---"+!reg.test(obj[key]));
              self.wetoast.toast({
                  title: hasError,
                  duration: 1000
              })
              return false;
            }
          }
        }  
      }
    }
    wx.showLoading();
    var param={
      'name':obj.name,
      'phone':obj.phone,
      'qq':obj.qq,
      'wechat_id':obj.wechat_id,
      'id':wx.getStorageSync('id'),
      'openId':wx.getStorageSync('openId')
    }
    wx.request({
      url: host + '/api/updateUser', // 目标服务器 url
      method: "POST",
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      dataType: 'json',
      success: (res) => {
        var res = res.data;
        self.wetoast.toast({
            title: "保存成功",
            duration: 1000
        })
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/index/index'
          })
        },1000)
      },
      fail: (res) => {
      
      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
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
