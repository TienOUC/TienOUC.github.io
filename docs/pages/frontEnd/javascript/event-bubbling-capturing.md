---
autoGroup-5: 其他
title: Js事件冒泡与捕获
date: 2019-06-16
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1.事件传递有两种方式：冒泡与捕获。

事件传递定义了元素事件触发的顺序。 如果你将 `<p>` 元素插入到 `<div>`元素中，用户点击 `<p>` 元素, 哪个元素的 "click" 事件先被触发呢？

> 在冒泡中，内部元素的事件会先被触发，然后再触发外部元素，即： `<p>`元素的点击事件先触发，然后会触发 `<div>`元素的点击事件。
> 在捕获中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： `<div>`元素的点击事件先触发 ，然后再触发 `<p>`元素的点击事件。

`addEventListener()` 方法可以指定 "useCapture" 参数来设置传递类型：
`addEventListener(event, function, useCapture);`

> - **默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。**

**实例：**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>W3Cschool教程(w3cschool.cn)</title>
		<style>
			div {
				background-color: coral;
				border: 1px solid;
				padding: 50px;
			}
		</style>
	</head>
	<body>
		<p>实例演示了在添加不同事件监听时，冒泡与捕获的不同。</p>
		<div id="myDiv">
			<p id="myP">点击段落，我是冒泡。</p>
		</div>
		<br />
		<div id="myDiv2">
			<p id="myP2">点击段落，我是捕获。</p>
		</div>
		<script>
			document.getElementById('myP').addEventListener(
				'click',
				function() {
					alert('你点击了 P 元素!');
				},
				false
			);
			document.getElementById('myDiv').addEventListener(
				'click',
				function() {
					alert(' 你点击了 DIV 元素 !');
				},
				false
			);
			document.getElementById('myP2').addEventListener(
				'click',
				function() {
					alert('你点击了 P2 元素!');
				},
				true
			);
			document.getElementById('myDiv2').addEventListener(
				'click',
				function() {
					alert('你点击了 DIV2 元素 !');
				},
				true
			);
		</script>
	</body>
</html>
```

> **提示：DOM 事件流同时支持两种事件模型：捕获型事件和冒泡型事件，捕获型事件首先发生。捕获型事件和冒泡型事件会触及 DOM 中的所有对象，从 document 对象开始，也在 document 对象结束。**

## 2.浏览器支持

IE 8 及更早 IE 版本，Opera 7.0 及其更早版本不支持 addEventListener() 和 removeEventListener() 方法。但是，对于这类浏览器版本可以使用 detachEvent() 方法来移除事件句柄:

```js
element.attachEvent(event, function);
element.detachEvent(event, function);
```

**跨浏览器解决方法:**

```js
var x = document.getElementById('myBtn');
if (x.addEventListener) {
	// 所有主流浏览器，除了 IE 8 及更早版本
	x.addEventListener('click', myFunction);
} else if (x.attachEvent) {
	// IE 8 及更早版本
	x.attachEvent('onclick', myFunction);
}
```
