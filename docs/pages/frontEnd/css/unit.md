---
autoGroup-1: CSS常用属性
title: Unit
date: 2019-12-28
categories:
- FrontEnd
tags:
- CSS
---

## 1. 基本尺寸单位

|  单位      |描述       |
|--|--|
|  %      |百分比     |
|  in     |英寸       |
|  cm     |厘米       |
|  mm     |毫米       |
|  em     |相对父元素的大小倍放|
|  ex     |一个 ex 是一个字体的 x-height。 (x-height 通常是字体尺寸的一半。)       |
|  pt     | 磅 (1 pt 等于 1/72 英寸)      |
|  pc     | 12 点活字 (1 pc 等于 12 点)      |
|  px     | 像素 (计算机屏幕上的一个点)     |

## 2. 常用单位

|  单位      |描述       |
|--|--|
|em|基于祖先（逐级向上找，设置了size的祖先元素）元素的大小倍放|
|rem|（ root em ）简写rem，相对于根元素（html标签）的size进行倍放，易于统一管理所有字体的大小|
|vw / vh |Viewport Width、Viewport Height是基于视图窗口的单位，此外还有vmin、vmax|

### 2.1 vw / vh举例

缩放窗口，`#test1` 正方形等比缩放。

```html
  <body>
    <div id="main">
      <div id="test1">test1</div>
    </div>
  </body>
```

```css
   #main{
       width: 100vw;
       height: 100vw;
       /* width: 100vh;
       height: 100vh; */
       background-color: #b8860b;
   }
   #test1{
       width: 50%;
       height: 50%;
       background-color: #a1a08d;
   }
```
