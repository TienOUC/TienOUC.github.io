---
autoGroup-1: CSS常用属性
title: "transform"
date: 2019-12-28
categories:
- FrontEnd
tags:
- CSS
---
:::tip
原理：计算机图形学中的2D矩阵变换，参考 :link: [CSS3:transform与transition背后的数学原理](https://www.cnblogs.com/winter-cn/archi\0/12/29/1919266.html)
:::

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>
      .mainDiv {
        width: 100px;
        height: 100px;
        margin: 100px auto;
        text-align: center;
        line-height: 100px;
        font-weight: bold;
        color: #ddd;
        background: #ddd;
        border: 1px solid #ddd;
        -webkit-transform: rotate(0deg) scale(1);
        -moz-transform: rotate(0deg) scale(1);
        transform: rotate(0deg) scale(1); //旋转0度，倍放1
        -webkit-transition: 2s; //  动画持续时间
        -moz-transition: 2s;
        transition: 2s;
      }
      .mainDiv:hover {
        -webkit-transform: rotate(720deg) scale(2);
        -moz-transform: rotate(720deg) scale(2);
        transform: rotate(720deg) scale(2);
        color: black;
        background: red;
        box-shadow: 5px 5px 5px gray;
      }
    </style>
    <title>css3特效</title>
  </head>
  <body>
    <div class="mainDiv">您好</div>
  </body>
</html>
```
![](https://tva1.sinaimg.cn/large/007S8ZIlly1ge5004nplyg308c08s0zo.gif)
