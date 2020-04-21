let Qs = require("qs");

/**
 * 描述： 设置 webview 页面操作完成给H5页面的回调事件， 并且返回webview页面
 * @param: data {Object} 参数
 * @param: callback {Object} 传给H5页面的参数
 */
export function setPageCallBack(
  data = {
    href: "",
    hash: "",
    uuid: "",
  },
  callback = {
    errNo: -1,
    errMsg: "未执行回调直接返回",
    res: {},
  }
) {
  console.info("回调事件的参数", data);
  var pages = getCurrentPages();
  console.log("我是获取的pages栈----------------------", pages);
  var currPage = pages[pages.length - 1]; //当前页面
  //上一个页面 （index page）
  var prevPage = pages[pages.length - 2];
  let {
    href,
    hash,
    uuid
  } = data;
  let visitUrl = getWebviewHref(href, hash, uuid, callback);
  console.log(`设置webview的url为：${visitUrl}`);
  prevPage.setData({
    visitUrl,
  });
  // 关闭当前webview
  wx.navigateBack();
}

/**
 * 配置webview来源地址
 * @param {*} href webview的文件目录地址
 * @param {*} hash webview的hash路由地址
 * @param {*} uuid webview页面传入的uuid
 * @param {*} callback 回调给webview的callback字符串
 */
export function getWebviewHref(href, hash, uuid, callback) {
  // 取url的query参数
  // 单独处理hash的query参数
  let query = Qs.parse(hash.split("?")[1]);
  if (typeof callback === "object") callback = JSON.stringify(callback);
  Object.assign(query, {
    uuid,
    callback,
  });
  hash = hash.split("?")[0];
  // 防止当前webview的url不存在hash出错
  hash = hash || "#";
  if (JSON.stringify(query) !== "{}") {
    hash += "?" + Qs.stringify(query);
  }
  return href + hash;
}