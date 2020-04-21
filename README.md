# 微信小程序与webview交互demo

在微信小程序里，webviewH5向miniProgram通讯只能通过[postMessage](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)函数

然而这个函数却很鸡肋，小程序官方文档是这样描述的：`向小程序发送消息，会在特定时机（小程序后退、组件销毁、分享）触发组件的message事件`

而且小程序官方文档里没有提到miniProgram如何向webviewH5通讯

在这个demo中, 展示了我是如何让webviewH5和miniProgram互相通讯

其实原理很简单:

-  webviewH5 --> miniProgram
    - 通过js调用微信JSSDK的`wx.miniProgram.navigateTo`方法跳转到小程序的指定页面并且把参数当做query带给小程序原生页面

-  miniProgram --> webviewH5
    - webview组件存在一个src属性, 用于展示指定的h5页面, 
    - webview组件上的src属性如果只是改变了hash值, 当前组件上的页面是不会刷新的. 所以我们可以利用这个特性在miniProgram页面把想要传递给webviewH5的信息带到当前webview组件的src上. 当然, 是操作当前src的hash值

### 运行使用

```shell
    小程序开发者工具导入微信小程序demo源码, 在/pages/index/index.js中修改webview组件访问地址指向webview.html的http地址
```

### 效果预览

success.gif: [http://cdn.mrabit.com/webview_success.gif](http://cdn.mrabit.com/webview_success.gif)

failure.gif: [http://cdn.mrabit.com/webview_failure.gif](http://cdn.mrabit.com/webview_failure.gif)

cancel.gif: [http://cdn.mrabit.com/webview_cancel.gif](http://cdn.mrabit.com/webview_cancel.gif)

### 文件目录

```
.
├── README.md
├── webview                     // 微信小程序demo源码
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── miniprogram_npm
│   │   └── qs
│   │       ├── index.js
│   │       └── index.js.map
│   ├── package-lock.json
│   ├── package.json
│   ├── pages
│   │   ├── index               // 存在webviewH5组件的页面
│   │   │   ├── index.js
│   │   │   ├── index.json
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   └── pay                 // miniProgram原生页面
│   │       ├── pay.js
│   │       ├── pay.json
│   │       ├── pay.wxml
│   │       └── pay.wxss
│   ├── project.config.json
│   ├── sitemap.json
│   └── utils                   // 工具类, miniProgram --> webviewH5的主要代码逻辑存放在这里
│       └── util.js
└── webview.html                // 微信小程序webviewH5组件所使用的的h5页面源码
```