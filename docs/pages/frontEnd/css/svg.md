---
autoGroup-3: 图形绘制
title: SVG
isTimeLine: true
date: 2020-03-12
categories:
  - FrontEnd
tags:
  - CSS
---

## 1. SVG 简介

SVG 意为可缩放矢量图形（Scalable Vector Graphics），是使用 XML 来描述二维图形和绘图程序的语言。

SVG 实例:

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

代码解析：

> 1. 第一行包含了 XML 声明。请注意 standalone 属性！该属性规定此 SVG 文件是否是"独立的"，或含有对外部文件的引用。
>
> 2. standalone="no" 意味着 SVG 文档会引用一个外部文件 - 在这里，是 DTD 文件。
>
> 3. 第二和第三行引用了这个外部的 SVG DTD。该 DTD 位于 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"。该 DTD 位于 W3C，含有所有允许的 SVG 元素。
>
> 4. SVG 代码以 `<svg>` 元素开始，包括开启标签 `<svg>` 和关闭标签 `</svg>` 。这是根元素。width 和 height 属性可设置此 SVG 文档的宽度和高度。version 属性可定义所使用的 SVG 版本，xmlns 属性可定义 SVG 命名空间。
>
> 5. SVG 的 `<circle>` 用来创建一个圆。cx 和 cy 属性定义圆中心的 x 和 y 坐标。如果忽略这两个属性，那么圆点会被设置为 (0, 0)。r 属性定义圆的半径。
>
> 6. stroke 和 stroke-width 属性控制如何显示形状的轮廓。我们把圆的轮廓设置为 2px 宽，黑边框。
>
> 7. fill 属性设置形状内的颜色。我们把填充颜色设置为红色。
>
> 8. 关闭标签的作用是关闭 SVG 元素和文档本身。

注释：所有的开启标签必须有关闭标签！

## 2. 嵌入 HTML

### 2.1 标签引入

- `<embed>` 标签
  > 优点：所有主要浏览器都支持，并允许使用脚本  
  > 缺点：不推荐在 HTML4 和 XHTML 中使用（但在 HTML5 允许）

语法:

```html
<embed src="circle1.svg" type="image/svg+xml" />
```

- `<object>` 标签
  > 优点：所有主要浏览器都支持，并支持 HTML4，XHTML 和 HTML5 标准  
  > 缺点：不允许使用脚本。

语法:

```html
<object data="circle1.svg" type="image/svg+xml"></object>
```

- `<iframe>` 标签
  > 优点：所有主要浏览器都支持，并允许使用脚本
  > 缺点：不推荐在 HTML4 和 XHTML 中使用（但在 HTML5 允许）

语法:

```html
<iframe src="circle1.svg"></iframe>
```

### 2.2 直接嵌入

在 Firefox、Internet Explorer9、谷歌 Chrome 和 Safari 中，你可以直接在 HTML 嵌入 SVG 代码。

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

### 2.3 `<a>`标签链接

可以用 `<a>` 标签链接到一个 SVG 文件

```html
<a href="circle1.svg">View SVG file</a>
```

## 3. 预定义形状及参数

:link: [ 预定义形状及参数 ](https://www.runoob.com/svg/svg-rect.html)

## 4. 示例

<iframe height="400" style="width: 100%;" scrolling="no" title="barChart-svg" src="https://codepen.io/Tienwill/embed/KKWjOgq?defaultTab=html%2Cresult&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Tienwill/pen/KKWjOgq">
  barChart-svg</a> by Tien (<a href="https://codepen.io/Tienwill">@Tienwill</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
