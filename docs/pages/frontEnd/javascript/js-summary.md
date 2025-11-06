---
autoGroup-5: 其他
title: 前端基础知识回顾
date: 2020-01-15
isTimeLine: true
categories:
  - FrontEnd
tags:
  - Summary
# keys:
#  - '2b8f30efa99aa9180399597cc4e9a88d'
---

## 1. JavaScript

### 1.1 对象类型判断

- **typeof**
  > 只能判断区分基本类型， number、string、boolean、undefined、object 和 function，但数组和对象无法判断（如下所示，都输出 `object` ）

```js
console.log(typeof 1); // number
console.log(typeof 'abc'); // string
console.log(typeof true); // boolean
console.log(typeof []); // object  👈
console.log(typeof {}); // object  👈
console.log(typeof RegExp()); // object
console.log(typeof null); // object
console.log(typeof undefined); // undefined
console.log(typeof function() {}); // function
```

- **instanceof**

```js
let a = [],
  b = {};
console.log(a instanceof Array); // true
console.log(a instanceof Object); // true    👈  数组也是对象，所以为true
console.log(b instanceof Object); // true

let str = new String();
console.log(str instanceof String); // true
```

- **constructor**

```js
let o = {};
o.constructor == Object; //true
let arr = [];
arr.constructor == Array; //true
arr.constructor == Object; //false
```

> **注意！** constructor 属性是可以被修改的，会导致检测出的结果不正确，所以此方法不建议

- **Object.prototype.toString.call()**

::: danger
**最有效，推荐此方法**
:::

```js
console.log(Object.prototype.toString.call(123)); //[object Number]
console.log(Object.prototype.toString.call('abc')); //[object String]
console.log(Object.prototype.toString.call(undefined)); //[object Undefined]
console.log(Object.prototype.toString.call(true)); //[object Boolean]
console.log(Object.prototype.toString.call({})); //[object Object]
console.log(Object.prototype.toString.call([])); //[object Array]
console.log(Object.prototype.toString.call(function() {})); //[object Function]
console.log(Object.prototype.toString.call(null)); //[object Null]
```

### 1.2 数组判断方法

```js
let arr = []
1.  instanceof
    arr  instanceof Array

2. __proto__
   arr.__proto__  === Array.prototype

3. constructor
    arr.constructor === Array

4. Object.prototype.toString
   Object.prototype.toString.call(arr) === '[object Array]'

5. Array.isArray
    Array.isArray(arr)
```

::: warning

- 方法 1，2，3 主要是通过原型去判断的;
- 4 是通过 object 类型的副属性 class 去判断的，其中函数的 class 是 Function，结果是[object Function]， 普通的对象是 Object，结果是[object Object];
- 5 是 es6 新增的方法;
  :::

### 1.3 call、bind、apply

**_相同点_**

- 都能改变 this 指向
- 第一个参数都是 this

**_不同点_**

- call 的第二个参数是直接传入的，用 `,` 分割
- apply 的第二个参数是以数组形式传入的
- bind 返回的是一个函数

### 1.4 原生 JS 实现双向数据绑定

核心 `object.defineProperty()`

三个参数：

- 要定义属性的对象
- 要定义或者修改的属性的名称
- 将被定义或者修改的属性的描述

```html
<input type="text" id="inp" />
<p id="showText"></p>
```

```js
<script>
    var obj = {};
    Object.defineProperty(obj, "newProp", {
        get: function () {
            return obj;
        },
        set: function (newVal) {
            document.getElementById("inp").value = newVal;
            document.getElementById("showText").innerHTML = newVal;
        }
    })
    document.addEventListener("keyup", function (e) {
        obj.newProp = e.target.value;
    })
</script>
```

### 1.5 EventLoop

> 还是要看英文文档，一些中文文档会把人带偏的

- 调用栈（Call stack）
- 消息队列（Message Queue）
- 微任务队列（Micrtask Queue）

1. 从全局代码逐行开始，遇到函数调用，压入调用栈，被压入的函数叫做 `帧（frame）` ，函数返回后，从调用栈弹出
2. 异步操作中的 `Fetch、事件回调、setTimeout、setInterval` 压入消息队列
3. `Promise、async await` 创建的异步操作会压入微任务队列，在调用栈清空后立即执行，处理期间新加入的微任务也会一同执行

其调用顺序是 **调用栈清空后 ——> 立即执行微任务队列（处理期间新加入的微任务也会一同执行） ——> 执行消息队列**

[动画模拟](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIGNvbnNvbGUubG9nKCJmdWNrIik7CiAgICBjb25zb2xlLmxvZygiZnVjayBwbHVzIik7CiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIHRpbWVyKCkgewogICAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2xpY2tlZCB0aGUgYnV0dG9uIScpOyAgICAKICAgIH0sIDIwMDApOwp9KTsKCmZ1bmN0aW9uIGxvb3Aobil7CiAgICBmb3IobGV0IGkgPSAwO2kgPCBuOyBpKyspewogICAgICAgIGNvbnNvbGUubG9nKCJIaSEiKTsKICAgIH0KfQoKY29uc29sZS5sb2coIkhpISIpOwoKbG9vcCgzKTsKCnNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dCgpIHsKICAgIGNvbnNvbGUubG9nKCJDbGljayB0aGUgYnV0dG9uISIpOwp9LCA1MDAwKTsKCmxvb3AoNSk7Cgpjb25zb2xlLmxvZygiV2VsY29tZSB0byBsb3VwZS4iKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

## 2. CSS

### 2.1 import / link 区别

css 样式表引入的方式有 4 种：

1. 行内式  
   `使用style属性 <p style=""></p>`

2. 内嵌式  
   `使用style标签 <style></style>`

3. 外链式  
   `使用link标签 <link rel="stylesheet" href="">`

4. 使用@import 引入  
   `@import url;`

- **link 和 @import 的区别**
  > 1. link 属于 XHTML 标签，除了可加载 CSS 之外，还可以做很多事情，例如定义 RSS、rel 链接属性等； @import 是 css 提供的一种方式，只能加载 CSS
  > 2. 加载顺序： link 引入的样式会在页面加载时同时加载，而@import 引入的样式只会在页面加载完之后再加载，会造成页面闪烁
  > 3. 用 JS 控制 Dom 改变样式时，只能用 link，@import 则不支持（不是 Dom，不可控制）
  > 4. @import 可以在 css 中再次引入其他样式表，比如创建一个主样式表，在主样式表中再引入其他的样式表，如下所示：这样有利于修改和扩展。但是这样做有一个缺点，会对网站服务器产生过多的 HTTP 请求，以前是一个文件，而现在确实两个或更多的文件了，服务器压力增大，浏览量大的网站还是谨慎使用。

```css
　　@import “sub1.css”;
　　@import “sub2.css”;
　　sub1.css
　　———————-
　　p {color:red;}
　　sub2.css
　　———————-
　　.myclass {color:blue}
```

- **最优的@import 书写方式**

```css
@import 'style.css'
  //Windows IE4/ NS4, Mac OS X IE5, Macintosh IE4/IE5/NS4不识别
  @import 'style.css' //Windows IE4/ NS4, Macintosh IE4/NS4不识别
  @import url(style.css) //Windows NS4, Macintosh NS4不识别
  @import url('style.css') //Windows NS4, Mac OS X IE5, Macintosh IE4/IE5/NS4不识别
  @import url('style.css');
```

由上分析知道，`@import url(style.css)` 和 `@import url（"style.css"）` 是最优的选择，兼容的浏览器最多。从字节优化的角度来看 `@import url(style.css)` 最值得推荐。

### 2.2 css reset

> 不同浏览器的默认样式之间存在差别，例如 `ul` 默认带有缩进样式，IE 浏览器是用 `margin` 实现， 而 FirFox 浏览器是用 `padding` 实现，导致兼容问题、影响开发效率，所以用重新定义的标签样式覆盖浏览器默认样式。

常见 CSS reset

#### 2.1.1 Eric Meyer’s “Reset CSS” 2.0

```css
/** 
* Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/) 
* http://cssreset.com 
*/
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
```

#### 2.1.2 HTML5 Doctor CSS Reset

```css
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

body {
  line-height: 1;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

nav ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

a {
  margin: 0;
  padding: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

/* change colours to suit your needs */
ins {
  background-color: #ff9;
  color: #000;
  text-decoration: none;
}

/* change colours to suit your needs */
mark {
  background-color: #ff9;
  color: #000;
  font-style: italic;
  font-weight: bold;
}

del {
  text-decoration: line-through;
}

abbr[title],
dfn[title] {
  border-bottom: 1px dotted;
  cursor: help;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* change border colour to suit your needs */
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #cccccc;
  margin: 1em 0;
  padding: 0;
}

input,
select {
  vertical-align: middle;
}
```

#### 2.1.4 Yahoo! (YUI 3) Reset CSS

```css
/*
YUI 3.18.1 (build f7e7bcb)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
html {
  color: #000;
  background: #fff;
}
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
fieldset,
img {
  border: 0;
}
address,
caption,
cite,
code,
dfn,
em,
strong,
th,
var {
  font-style: normal;
  font-weight: normal;
}
ol,
ul {
  list-style: none;
}
caption,
th {
  text-align: left;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}
q:before,
q:after {
  content: '';
}
abbr,
acronym {
  border: 0;
  font-variant: normal;
}
sup {
  vertical-align: text-top;
}
sub {
  vertical-align: text-bottom;
}
input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  *font-size: 100%;
}
legend {
  color: #000;
}

#yui3-css-stamp.cssreset {
  display: none;
}
```

#### 2.1.5 Universal Selector ‘\*’ Reset

```css
/* cssreset.com */
* {
  margin: 0;
  padding: 0;
}
```

#### 2.1.6 Normalize.css 官网

内容较多，查看 Github Repo 👉👉👉 [ Normalize git 地址 ](https://github.com/necolas/normalize.css)

### 2.3 CSS 规范

**_Css 书写顺序：_**

- 位置属性(position, top, right, z-index, display, float 等)
- 大小(width, height, padding, margin)
- 文字系列(font, line-height, letter-spacing, color- text-align 等)
- 背景(background, border 等)
- 其他(animation, transition 等)

**_Css 语法：_**

- 命名一般为小写英文字母。
- 为了代码的易读性，在每个声明块的左花括号前添加一个空格。
- 每条声明语句的 `:` 后应该插入一个空格。
- 所有声明语句都应当以分号结尾。最后一条声明语句后面的分号是可选的，但是，如果省略这个分号，你的代码可能更易出错。
- 对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，.5 代替 0.5；-.5px 代替 -0.5px）。
- 十六进制值应该全部小写，例如，#fff。
- 尽量使用简写形式的十六进制值，例如，用 #fff 代替 #ffffff。
- 避免为 0 值指定单位，例如，用 margin: 0; 代替 margin: 0px;。

## 3. 前端安全

### 3.1 XSS

跨站请求攻击 ( Cross Site Scripting )  
通过`script`标签嵌入一段 JS 代码

### 3.2 CSRF

跨站请求伪造 ( Cross-site request forgery )  
常见手段是在用户保持登陆状态时，获取 cookie，利用`img`的 `src` 属性嵌入`get`请求，或者用 `iframe` 嵌入框架，伪造表单

## 4. 性能 & SEO 优化

### 4.1 SEO 优化

- 标签语义化
- `meta` 标签 `keywords` 、`description`
- SSR (server side render)
- 适当增加子域名，提升主域名权重，增加子域名当子域名的权重高的时候，会给主站也带来好的权重。
- 网址后缀和域名权重优化

### 4.2 性能优化

1. 减少 Http 请求数

   > - 设置 http 缓存 ： 首次加载时将常用资源缓存到浏览器本地
   > - 资源合并压缩 ： 打包工具压缩 （webpack）
   > - CSS Sprites ： 合并 CSS 图片减少请求次数 （雪碧图？）
   > - 懒加载 ： 只加载可见区域的资源

2. js 脚本置底加载
3. inline 脚本异步执行
4. 动态加载 js 模块
5. 代码优化
   > - 减少重排（重排必然导致重绘）

## 5. OSI 模型 & TCP/IP 模型

<!-- ### 5.1 模型概念
> 1、OSI（Open System Interconnect），即开放式系统互联。 一般都叫OSI参考模型，是ISO（国际标准化组织）组织在1985年研究的网络互联模型。

> 2、TCP/IP 协议栈是美国国防部高级研究计划局计算机网（ARPANET）和其后继因特网使用的参考模型。ARPANET是由美国国防部赞助的研究网络。最初，它只连接了美国境内的四所大学。随后的几年中，它通过租用的电话线连接了数百所大学和政府部门。最终ARPANET发展成为全球规模最大的互连网络-因特网。最初的ARPANET于1990年永久性地关闭。

> 3、ISO制定的OSI参考模型的过于庞大、复杂招致了许多批评。与此对照，由技术人员自己开发的TCP/IP协议栈获得了更为广泛的应用。    -->

### 5.1 TCP & IP 所属层

- TCP 属于传输层，提供可靠的字节流服务。所谓的字节流，其实就类似于信息切割，分片传输。

- IP 属于网络层。设计 IP 的目的是提高网络的可扩展性：一是解决互联网问题，实现大规模、异构网络的互联互通；二是分割顶层网络应用和底层网络技术之间的耦合关系，以利于两者的独立发展。根据端到端的设计原则，IP 只为主机提供一种无连接、不可靠的、尽力而为的数据报传输服务。

### 5.2 两种模型各层对应协议

OSI 七层模型记忆

- `物理` 系有一个叫 `链路` 的学生在 `网络` 上 `传输` 了一个 `会话`，`表示` 这是一个 `应用`

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghxa8c06n8j30r5093glt.jpg)

## 6. 协议

### 6.1 post 和 get

**_主要区别_**

1. 参数可见性与传输

- get 是将参数拼接进 url 向服务器发起请求 ，所以可见
- post 参数是在请求体中传输，不可见（相对 get 来说）

2. 缓存性

- get 请求浏览器会主动 cache
- post 请求默认浏览器不主动缓存（ 但可设置 ）

3. 传输数据的大小

- get 一般在 2-4k
- post 取决于配置文件的限制，理论上没上限

4. 编码方式

- get 只能是 url 编码
- post 支持多种编码方式（content-type： 文本、二进制、JSON 串等）

5. tcp 数据包

- get 请求会把 header 和 data 一次性发送给服务器，服务器返回 200 状态码，只有一个 TCP 数据包
- post 请求先发送 header，服务器返回 100 状态码，然后再发送 data，服务器返回 200 OK，有两个 TCP 数据包

## 7. 浏览器兼容问题解决方案

### 7.1 CSS hack

举例：请用 CSS 定义 p 标签，要求实现如下效果： 字体颜色在 IE6 下为黑色 （#000000），IE7 下为红色 （#ff0000），其他浏览器下为绿色（#00ff00）

```css
p {
  color: #00ff00;
  _color: #000000;
}
* + html p {
  color: #ff0000;
}
```

### 7.2 JS hack

### 7.3 条件注释

转载 :link: [博客园-墨韵明空](https://www.cnblogs.com/wymbk/p/5504492.html)

## 8. 工具类

### 8.1 Echarts 的实现原理

Echarts 是纯 JavaScript 实现，在 Canvas 上封装的 MVC 架构、以数据驱动的轻量级图形库

- `Storage(M) 模型层`：实现图形数据的 CURD（增删改查）管理。 **一个类似数据的仓库，提供各种数据的读、写、改、删等操作。**
- `Painter(V) 视图层`：实现 canvas 元素的生命周期管理，即视图渲染、更新控制、绘图。 **Painter 持有 Storage 对象，即：Painter 读取 Storage 进行绘图。**
- `Handler(C) 控制层`：事件交互处理，实现完整的 dom 事件模拟封装。 **Handler 持有了 Storage 对象和 Painter 对象，控制层对模型层有 CURD 关系，即：Handler 通过访问 Storage 对象提供的数据增删改查操作，实现事件交互处理所需的数据部分；控制层与视图层存在 call 关系，即：Handler 通过访问 Painter 对象提供的视图操作，实现事件交互处理的视图部分。**

<!-- ![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjqhetfkfrj315p0u0n1c.jpg)
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjqheto16dj30u03jc48t.jpg) -->
