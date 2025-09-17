---
title: Linux服务器运行Node脚本爬取数据
date: '2020-05-20'
isTimeLine: true
categories:
  - Server
tags:
  - Linux
  - Node
---

:::tip
Selenium & NodeJS & chromedriver  
:::

<!-- CentOS <Badge text="v7.6" type="warning"/> -->
<!-- more -->

## 1. 安装 Selenium

`pip install selenium`

## 2. 安装 Chrome 和 chromedriver

### 2.1 Chrome

因国内无法访问 Google，所以需要自己配置 yum 源，在目录 `/etc/yum.repos.d/` 下新建 `google-chrome.repo` 文件，

```
cd /etc/yum.repos.d/

vim google-chrome.repo
```

写入如下内容:

```
[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch
enabled=1
gpgcheck=1
gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub
```

然后执行

`yum -y install google-chrome-stable --nogpgcheck`

- 安装路径是：\opt\google\chrome

此时 chrome 安装成功！

### 2.2 chromedriver

去[ chromedriver 官网 ](https://sites.google.com/a/chromium.org/chromedriver/downloads)下载与 `chrome版本号` 对应的 `chromedriver`压缩包 ，解压后放在脚本所在目录下

```
[root@blog server]# ls
app.js  chromedriver_linux64.zip chromedriver  crawler.js
```

## 3. 运行脚本

### 3.1 服务器终端模式

需要修改 google-chrome 文件

```
vim /opt/google/chrome/google-chrome  // vim打开文件，最后一行做如下修改：

- exec -a "$0" "$HERE/chrome" "$@" $HOME
+ exec -a "$0" "$HERE/chrome" "$@" --no-sandbox --headless $HOME
```

### 3.2 服务器 GUI 模式

root 用户下，找到`/usr/share/applications/Google Chrome.desktop`，鼠标右键弹出菜单->属性->命令，

由原来的字符串`/usr/bin/google-chrome-stable %U`修改为：

`/usr/bin/google-chrome-stable %U --no-sandbox`

然后，把文件 Google Chrome.desktop 拷贝一份到桌面。

最后启动脚本即可。

爬虫示例：

```js
// 爬取万矿疫情数据  需注册账号并登陆才能爬取数据，官方Web API使用说明 :（ https://www.windquant.com/qntcloud/help/id-fdc2e335-7f50-4b63-b79c-07a2582cf15c）
const dataUrl = 'https://www.windquant.com/qntcloud/data/edb?userid=43a1bf78-8e78-48b7-bdff-65e041ffe268&indicators=S6274770,S6274772,S6274771,S6274773,S6274775,S6274778,S6274777,S6274776,S6274780,S6274782,S6274784&startdate=2020-01-20&enddate=2020-05-05'

function getHistorydata () {
    superagent.get(dataUrl)
      .then(res => {
        fs.writeFile(path.join(__dirname, './historyData.json'), res.text, err => {
          if (err) throw err;
          console.log('historyData.json写入成功');
        })
      })
      .catch(err => {
        throw err
      });
  }

 // 引入selenium 和 node nodeSchedule模块
const { Builder, By, Key, until } = require('selenium-webdriver')
const nodeSchedule = require('node-schedule')

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get(
      'https://www.windquant.com/cas/login?service=https%3A%2F%2Fwww.windquant.com%2Fqntcloud%2Flogin%2Fcas.go'
    )
    await driver.findElement(By.id('username')).sendKeys('万矿ID', Key.TAB)
    await driver.findElement(By.id('password')).sendKeys('密码', Key.RETURN)
    await driver.wait(until.titleIs('万矿-高端量化分析云平台-Wind'), 1000)
  } finally {
      // 每天的凌晨1点1分30秒触发
      nodeSchedule.scheduleJob('30 1 1 * * *', function () {
        getHistorydata();
      });
    })
  }
})();
```

## 4. 项目展示（Covid-19）

**Echarts 学习实践，赶在国内疫情末尾写了个疫情展示页面**

:link: [ 展示页面 ](https://covid.dodolo.top)

![](https://tva1.sinaimg.cn/large/007S8ZIlly1geqw7nzb2yj30xc0hfju5.jpg)

![](https://tva1.sinaimg.cn/large/007S8ZIlly1geqw7npy4ij30xc0hcq60.jpg)

- **重构：**
  [covid19](https://github.com/TienOUC/covid19)

<!-- <iframe
        style="height: 4580px; width: 100%; background-color: #ffffff;"
        frameborder="0"
        loading="lazy"
        src="https://covid.dodolo.top/"
      >
</iframe> -->
<div style="position: relative; padding: 30% 45%;">
	<iframe 
    loading="lazy"
		style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
	  src="https://covid.dodolo.top/"
		border="0" 
		frameborder="no" 
		framespacing="0" 
		allowfullscreen="true" 
	>
	</iframe>
</div>

### 4.1 使用

> a. 安装依赖包  
> b. `server` 目录下先修改`crawler.js`中的万矿 ID 和万矿密码，然后 `node crawler.js app.js` 启动即可（首次启动需修改 `crawler.js` 中的抓取时间，不然要等好久才会有数据哒！）  
> c. [Linux 服务器运行 Node.js 脚本爬取数据](https://www.dodolo.top/pages/server/linuxServer.html#_4-1-%E4%BD%BF%E7%94%A8)  
> d. 图形界面下把与 Chrome 版本对应的 chromedriver 文件放在脚本目录即可

### 4.2 注意事项

- flexible.js

修改了 `flexible.js` 默认的宽度分割

```js
 function setRemUnit () {
+    var rem = docEl.clientWidth / 32;
     docEl.style.fontSize = rem + "px";
  }
```

所以引入的是本地的 `flexible.js`，你可以根据自身需求来选择。  
**`flexible.js` 安装**

`npm i -S flexible.js` 安装 `npm` 包，然后用以下两种方式引入

```js
import flexible from 'flexible.js'; // 1.引入页面适应模块 flexible
flexible();
```

或者

```js
require('flexible.js')(); // 2.或者require引入
```

- CleanWebpackPlugin 插件

我使用的 `webpack` 是 `4.43.0` 版本，在引入 `CleanWebpackPlugin` 插件时发现老版本的引入写法已经弃用了，新版本的引入方法是

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 这里必须这样引入，不然会报错，原写法改了
...

配置：
new CleanWebpackPlugin(),
```

### 4.3 数据源及定时抓取

#### 4.3.1 丁香园

`https://ncov.dxy.cn/ncovh5/view/pneumonia`

#### 4.3.2 万矿

需注册万矿账号
[官方 Web API 使用说明](https://www.windquant.com/qntcloud/help/id-fdc2e335-7f50-4b63-b79c-07a2582cf15c)

#### 4.3.3 微博热搜词

API: `https://s.weibo.com/top/summary?cate=realtimehot`

<!-- > 以上数据均用 NodeJS nodeSchedule 定时抓取，数据的延迟取决于你的抓取时间设置，我们是练习使用，不要过度调用接口，让疫情数据及时更新到更有价值的地方去。 -->

### 4.4 Node nodeSchedule 的用法

```js
const schedule = require('node-schedule');

const scheduleCronstyle = () => {
  //每分钟的第30秒定时执行一次:
  schedule.scheduleJob('30 * * * * *', () => {
    console.log('scheduleCronstyle:' + new Date());
  });
};
scheduleCronstyle();
```

`*` 代表通配符

```js
*  *  *  *  *  *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │  |
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

6 个占位符从左到右分别代表：秒、分、时、日、月、周几

`*` 表示通配符，匹配任意，当秒是 `*` 时，表示任意秒数都触发，其它类推

示例：

```js
每分钟的第30秒触发： '30 * * * * *'

每小时的1分30秒触发 ：'30 1 * * * *'

每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'

每月的1日1点1分30秒触发 ：'30 1 1 1 * *'

2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

每周1的1点1分30秒触发 ：'30 1 1 * * 1'
```

每个参数还可以传入数值范围:

```js
const task1 = () => {
  //每分钟的1-10秒都会触发，其它通配符依次类推
  schedule.scheduleJob('1-10 * * * * *', () => {
    console.log('scheduleCronstyle:' + new Date());
  });
};

task1();
```

### 4.5 最后

代码写的很乱，后续有空了会抽离优化，或者考虑重构，多端适配也需要优化，目前就先这样吧。
