// pages/pay/pay.js
import {
  setPageCallBack
} from "../../utils/util.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    href: "", // 固定入参：webview页面传入的文件目录地址
    hash: "", // 固定入参：webview页面传入的hash路由地址
    uuid: "", // 固定入参：webview页面传入的uuid
    params: "", // webview带给当前页面的参数
    triggered: false, // 是否已触发回调的标记，在页面销毁时可判断是否执行回调
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(`webview传过来的入参：${options}`);
    let {
      href,
      hash,
      uuid,
      ...params
    } = options;
    if (params) {
      console.log('webview带给当前页面的参数是：' + JSON.stringify(params))
    }
    // url带过来的参数会被编码， 所以这里需要解码处理
    this.setData({
      href: decodeURIComponent(href),
      hash: decodeURIComponent(hash),
      uuid: decodeURIComponent(uuid),
      params,
      paramsToString: JSON.stringify(params)
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // 页面销毁， 还没执行过回调，默认失败
    if (!this.data.triggered) {
      setPageCallBack({
        href: this.data.href,
        hash: this.data.hash,
        uuid: this.data.uuid,
      });
    }
  },

  handleClickSuccess() {
    this.setData({
      triggered: true,
    });
    setPageCallBack({
      href: this.data.href,
      hash: this.data.hash,
      uuid: this.data.uuid,
    }, {
      errNo: 0,
      errMsg: "回调成功",
      res: {
        a: 1,
      },
    });
  },

  handleClickFailure() {
    this.setData({
      triggered: true,
    });
    setPageCallBack({
      href: this.data.href,
      hash: this.data.hash,
      uuid: this.data.uuid,
    }, {
      errNo: -1,
      errMsg: "回调失败",
      res: {},
    });
  },
});