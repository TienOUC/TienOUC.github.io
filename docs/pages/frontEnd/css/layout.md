---
autoGroup-2: 主流布局方式
title: 常见2列、3列布局
date: 2019-12-01
categories:
- FrontEnd
tags:
- CSS
---
## 1. 两列布局

+ 左侧定宽，右侧自适应   

### 1.1 float

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk67ae0y9zg30go09etha.gif)
::: details 点击查看代码
```html
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .main {
      height: calc(100vh - 30px);
      margin: 10px;
      border: 5px solid #45cdc3;
      background-color: #e4e6e5;
    }
    .a,
    .b {
      height: 100%;
      float: left;
      background-color: #e4d726;
    }
    .a {
      width: 300px;
    }
    .b {
      width: calc(100% - 300px);
      background-color: #e16830;
    }

  </style>
  <body>
    <div class="main">
      <div class="a">A</div>
      <div class="b">B</div>
    </div>
  </body>
```
:::
 
### 1.2 position

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk68ge4wbtg30go09x42c.gif)
::: details 点击查看代码
```html
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .main {
      height: calc(100vh - 30px);
      margin: 10px;
      border: 5px solid #45cdc3;
      background-color: #e4e6e5;
      position: relative;
    }
    .a,
    .b{
      height: 100%;
      background-color: #e4d726;
    }
    .a {
      width: 300px;
    }
    .b {
      background-color: #e16830;
      position: absolute;
      top: 0;
      left: 300px;
      right: 0;
    }
  </style>
  <body>
    <div class="main">
      <div class="a">A</div>
      <div class="b">B</div>
    </div>
  </body>
```
:::
 
### 1.3 display: inline-block

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk68p6ihfjg30go08m41b.gif)
::: details 点击查看代码
```html
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .main {
      height: calc(100vh - 30px);
      font-size: 0;  
      /* 这里 font-size: 0; 是解决行内相邻元素
      因为html标签代码换行导致的间隙问题 */
      margin: 10px;
      border: 5px solid #45cdc3;
      background-color: #e4e6e5;
    }
    .a,
    .b{
      height: 100%;
      font-size: 16px;
      background-color: #e4d726;
      display: inline-block;
    }
    .a {
      width: 300px;
    }
    .b {
      background-color: #e16830;
      width: calc(100% - 300px);
    }
  </style>
  <body>
    <div class="main">
      <div class="a">A</div>
      <div class="b">B</div>
    </div>
  </body>
```
:::


## 2. 三列布局

> 左右定宽，中间自适应

### 2.1 float
:link: [ 详见《圣杯布局》篇 ](https://tienouc.gitee.io/vuepress/pages/frontEnd/css/holy-grail-layout.html)

### 2.2 flex
:link: [ 详见《圣杯布局》篇 ](https://tienouc.gitee.io/vuepress/pages/frontEnd/css/holy-grail-layout.html)

### 2.3 grid
