---
title: 微信小程序云开发
date: 2020-06-09
isTimeLine: true
categories: 
- Miniprogram
tags:
- Miniprogram
---

:link: [ Demo 代码 ](https://github.com/TienOUC/MovieList)

## 1. 环境配置

在 app.js 里设置 env: '你的环境 ID'，环境 ID 在云开发的设置下可查看

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfm291keaoj30m8046glp.jpg)

## 2. 云函数

- 设置好当前环境后，在 cloudfunctions 路径下新建 Node.js 云函数

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfm29gp7xxj30m80m878g.jpg)

- 在新建的 sum 云函数文件夹下的 index.js 中写入如下 js 代码段

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfm29seg70j30m80got9q.jpg)

```js
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    sum: event.a + event.b,
  }
}
```

- 上传并部署

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfm2a874jrj30m80m843s.jpg)

- 云端测试，调用成功，返回 3

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfm2amtls1j30m80not9t.jpg)

- 在 miniprogram 路径下新建名为 test 的 Page，并在 test.js 中写入如下代码

```js
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "sum",
      data: {
        "a": 1,
        "b": 2
      }
    })
    .then( res=> {
      console.log(res.result)
    })
    .catch( err => {
      console.log(err)
    })
  }
```

- 然后在当前 page 编译，即可看到云函数返回值为 3

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfm2awl7njj30jy0l6mxw.jpg)

## 3. demo 展示

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfl510ux13g308s0fwnp9.gif)

## 4. 云存储

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfl56kp8ggj30m80iajsn.jpg)

## 5. 数据库

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gfl56l69esj30m80cuab0.jpg)

## 6.参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
