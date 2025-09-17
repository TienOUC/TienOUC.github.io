---
autoGroup-1: CSS常用属性
title: position
date: 2019-12-28
categories:
  - FrontEnd
tags:
  - CSS
---

## 1. 属性

- static

  > 默认值，没有定位，元素出现在正常的文档流中, top, right, bottom, left 不生效

- relative

  > 生成相对定位元素，相对于其在正常文档流中的位置定位，元素没有脱离文档流

- absolute

  > 生成绝对定位元素，相对于其最近属性不为 static 的父元素进行定位，元素脱离文档流

- fixed

  > 生成绝对定位元素，相对于浏览器窗口进行定位

- sticky
  > 粘性定位，该定位基于用户滚动的位置。它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。

## 2. 示例

```html
<body>
  <div class="top">
    <div class="mid">
      <div class="foo"></div>
    </div>
  </div>
</body>
```

```css
* {
  margin: 0;
  padding: 0;
}
body {
  height: 1000px;
}
.top,
.mid,
.foo {
  width: 200px;
  height: 200px;
}

.top {
  background-color: #b61b1b;
  position: absolute;
  top: 10px;
}

.mid {
  background-color: #0eb13f;
  position: fixed;
  top: 30px;
}

.foo {
  background-color: #d4f080;
  position: absolute;
  top: 200px;
}
```

`.top` 元素距离其在正常文档流中的位置 `top: 10px`  
`.mid` 元素相对窗口顶部 `top: 30px` 滑动窗口不会变  
`.foo` 元素相对于`.mid` `top: 200px`,但受到 `.mid` 的 `fixed属性` 影响，自身也有了 fixed 行为

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghoi8dsrp7g30g80ncmz7.gif)
