//var host = 'https://t-minapp-digital.zhongan.com';
var host = 'https://u-minapp-digital.zhongan.com';
//var host = 'https://minapp-digital.zhongan.com';
//var host = 'http://192.168.35.73:8080'

var postType = {
	"1":"送修",
	"2":"寄修",
	"3":"上门维修"
}
//维修方式

var status = {
	"1":"已下单",
	"2":"已接单",
	"3":"已支付",
	"4":"已取消",
	"5":"待支付"
}

//订单状态
var payStatus = {
  "9000": "订单支付成功",
  "8000": "正在处理中",
  "4000": "订单支付失败",
  "6001": "用户中途取消",
  "6002": "网络连接出错",
  "99": "用户点击忘记密码导致快捷界面退出(only iOS)"
}
//支付状态

//1:维修补偿保险1.99，2：0.66 ，3.patica
var responsibility = {
  "1": "1次维修费用补偿",
  "2": "1次屏幕维修",
  "3": "1次屏幕维修"
}
//1:维修补偿保险1.99，2：0.66 ，3.patica
var responsibility_inner = {
  "1": ['保险期限内，因发生非主观故意的意外事故，导致您合法拥有的手机遭受物理性损坏且无法正常使用的，在保单载明的维修机构维修时，','众安保险负责赔偿被保险人一次维修费用补偿（不直接给付现金），在维修时直接抵扣维修总金额的10%且最高不超过赔偿限额199元。','维修补偿一经赔付，本保险合同保险责任终止。'],
  "2": ['保险期限内，因发生非主观故意的意外事故，导致您合法拥有的手机的屏幕遭受物理性损坏且无法正常使用的，在保单载明的维修机构维修时，','众安保险负责赔偿被保险人一次维修费用补偿（不直接给付现金），在维修时直接抵扣保额，','维修补偿一经赔付，本保险合同保险责任终止。'],
  "3": ['在保险期间内，因发生非主观故意的意外事故，导致被保险人所投保的设备的屏幕因外力破损且无法正常使用的，则由保险人在保险金额内为设备持有人提供一次换屏服务。','','']
}
//保单列表状态
var orderStatus = {
  "0": "待生效",
  "1": "保障中",
  "2": "理赔中",
  "3": "已理赔",
  "4": "已失效",
  "5": "已退保"
}

//保单按钮标题
var buttonTitle = {
  "0": "",
  "1": "申请理赔",
  "2": "查看理赔",
  "3": "查看理赔",
  "4": "",
  "5": ""
}
module.exports = {
  PostType: postType,
  Status: status,
  responsibility: responsibility,
  responsibility_inner: responsibility_inner,
  orderStatus,
  buttonTitle,
  host:host
}
