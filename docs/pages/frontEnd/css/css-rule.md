---
title: CSS书写规范
date: 2019-12-28
categories:
  - FrontEnd
tags:
  - CSS
---

## 1. CSS 书写顺序：

- 位置属性(`position`, `top`, `right`, `z-index`, `display`, `float` 等)
- 大小(`width`, `height`, `padding`, `margin`)
- 文字系列(`font`, `line-height`, `letter-spacing`, `color`, `text-align` 等)
- 背景(`background`, `border` 等)
- 其他(`animation`, `transition` 等)

## 2. CSS 语法：

- 命名一般为小写英文字母。
- 为了代码的易读性，在每个声明块的左花括号前添加一个空格。
- 每条声明语句的 `:` 后应该插入一个空格。
- 所有声明语句都应当以分号结尾。
- 对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如 `.5`代替 `0.5`；`-.5px` 代替 `-0.5px`）。
- 十六进制值应该全部小写，例如 `#fff`。
- 尽量使用简写形式的十六进制值，例如用 `#fff` 代替 `#ffffff`。
- 避免为 0 值指定单位，例如，用 `margin: 0;` 代替 `margin: 0px;`。
