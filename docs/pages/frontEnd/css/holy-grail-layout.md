---
autoGroup-2: 主流布局方式
title: "圣杯布局"
date: 2019-06-01
categories:
- FrontEnd
tags:
- CSS
---

## 1. float 实现
  :link: [ float 实现圣杯布局 ](https://tienouc.gitee.io/projects/src/holyGrail.html)     

+  建立框架

​ 先写 header, footer 和 container 三个 `<div>`

```html
<div id="header">#header</div>
<div id="container"></div>
<div id="footer">#footer</div>
```

​ 我们将 container 的内边距设置为左右两边各自的宽度。它看起来就像这样：

![1](https://tva1.sinaimg.cn/large/008eGmZEgy1gpi0ny4xuoj30f009qglt.jpg)

+ 加入三栏

​ 此时我们有了基本框架，可以把三栏塞进去了。

```html
<div id="header">#header</div>

<div id="container">
  <div id="center" class="column">#center</div>
  <div id="left" class="column">#left</div>
  <div id="right" class="column">#right</div>
</div>

<div id="footer">#footer</div>
```

​ 接着我们给每一栏配上合适的宽度，并将它们设为浮动。同时我们需要清除 footer 的上下环境，以免跟上面三栏一起浮动。

```css
#container .column {
  float: left;
}
#center {
  width: 100%;
}
#left {
  width: 200px; /*LC width */
}
#right {
  width: 200px; /*RC width */
}
#footer {
  clear: both;
}
```

​ 注意这里中间一栏的 100% 宽是基于它的父容器 container 的宽度而言的，由于 container 设置了内边距，因此中间栏看起来就处在了网页的中间，但左右两栏由于排在中间栏的后面，且因为空间不够被挤到了中间栏的下面，如下图所示：

![2](https://tva1.sinaimg.cn/large/008eGmZEgy1gpi0o06ijnj30f009q74k.jpg)

+ 把左侧栏放上去

​ 中间栏已经就位，剩下的事情就是把左右两栏放上去了，接下来我们先放左侧栏。
为了详述过程，这里将分为两个小步骤。首先，我们先将它的外边距设置为 -100%，这样一来，由于浮动的关系，左侧栏就能上位，与中间栏交叠在一起，并占据了左边。而右侧栏由于左侧栏的上位，自动向前浮动到了原来左侧栏的位置。

![3](https://tva1.sinaimg.cn/large/008eGmZEgy1gpi0o2jw89j30f009q3yr.jpg)

​ 接着我们要用到相对定位属性（relative），并设置一个与左侧栏等宽的偏移量：

```css
#container .column {
  float: left;
  position: relative;
}
#center {
  width: 100%;
}
#left {
  width: 200px; /*LC width */
  margin-left: -100%;
  right: 200px;
}
#right {
  width: 200px; /*RC width */
}
#footer {
  clear: both;
}
```

​ 可以看到，它设置的 right 属性就是相对于 container 的右边线向左偏移 200px，如此一来，它就完美地跑到了 container 左内边距的位置，也就是我们希望它呆的地方，如下图所示：

![4](https://tva1.sinaimg.cn/large/008eGmZEgy1gpi0o4y492j30f009qwen.jpg)

+  把右侧栏放上去

​ 最后，我们需要把右侧栏放上去，此时只需利用上面的原理把他放到 container 的右外边距的位置即可，我们需要再一次设置一个负外边距的值，它等于右侧栏的宽度：

```css
#right {
  width: 150px; /*RC width */
  margin-right: -150px;
}
```

​ 至此，所有的栏目都就位了

![5](https://tva1.sinaimg.cn/large/008eGmZEgy1gpi0o71wsuj30f009qt8o.jpg)

​ 具体代码如下：

```html
    <style>
      body {
        text-align: center;

        min-width: 550px;
      }
      #container {
        padding-left: 200px;
        padding-right: 150px;
      }
      #container .column {
        height: 200px;
        float: left;
        position: relative;
      }
      #center {
        width: 100%;
        background: #e9e9e9;
      }
      #left {
        width: 200px; /*LC width */
        margin-left: -100%;
        right: 200px;
        background: #1d9ee9;
      }
      #right {
        width: 150px; /*RC width */
        margin-right: -150px;
        background: #f46a3c;
      }
      #footer {
        clear: both;
      }
      #header,
      #footer {
        background-color: #0b0b0bb7;
      }
    </style>
  </head>
  <body>
    <div id="header">#header</div>

    <div id="container">
      <div id="center" class="column">#center</div>
      <div id="left" class="column">#left</div>
      <div id="right" class="column">#right</div>
    </div>

    <div id="footer">#footer</div>
  </body>
```
## 2. flex 实现
 :link: [Flex 实现圣杯布局](https://tienouc.gitee.io/projects/src/flex.html)

```html
  <header>header</header>
  <div class="main">
      <div class="left">left</div>
      <div class="center">center</div>
      <div class="right">right</div>
  </div>
  <footer>footer</footer>
```
```css
* {
  margin: 0;
  padding: 0;
}

header,
footer {
  width: 100vw;
  height: 80px;
  background-color: #af626c;
}

.main {
  background-color: #5b5959;
  display: flex;
}

.left, 
.center, 
.right{
  height: calc(100vh - 160px);
}

.left {
  width: 200px;
  background-color: #f2a548;
}

.center {
    /* flex-shrink 设置为0，当页面缩小至空间不够时，center元素定格在 flex-basis，不会进一步缩小  */
  flex: 1 0 auto;  
  flex-basis: 300px;        
  background-color: #0eb44e;
}

.right {
  width: 200px;
  background-color: #7c64e7;
}

/*
1. flex-grow 默认不放大（默认值：0），项目在有剩余空间的情况下是否放大（0 不放大， 1 放大）
eg: 共三个项目，前两个项目 flex-grow：0； 第三个项目 flex-grow：1；则是第三个项目铺满剩余空间（无论其自身是否有固定宽度都会铺满剩余空间）

2. flex-shrink 默认缩小（默认值： 1） 项目在空间不足时等比缩小（0 不缩小， 1 缩小）

3. flex-basis 默认auto，设置项目宽度，项目有 width 时，以 width 为自身宽度，但若设置了 flex-basis：[宽度值]；则该值权重最高，会覆盖 width
*/

```

## 3. grid 实现
 :link: [Grid 实现圣杯布局](https://tienouc.gitee.io/projects/src/grid.html)
```html
  <body>
    <header>#header</header>
    <div class="container">
      <div>
        <p>#left</p>
      </div>
      <div>
        <p>#center</p>
      </div>
      <div>
        <p>#right</p>
      </div>
    </div>
    <footer>#footer</footer>
  </body>
```

```css
html,
body {
  margin: 0;
  padding: 0;
  text-align: center;
}
header,
footer {
  height: 100px;
  background-color: #878b89;
}
.container {
  display: grid;
  grid-template-columns: 200px auto 300px;
  grid-template-rows: calc(100vh - 200px);
}
.container div:nth-child(1) {
  background-color: #fa8072;
}
.container div:nth-child(2) {
  background-color: #89fa72;
}
.container div:nth-child(3) {
  background-color: #7294fa;
}
```

