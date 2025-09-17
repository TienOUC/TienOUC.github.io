---
autoGroup-5: 其他
title: Js事件委托/代理
date: 2019-06-16
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 概念

事件委托也叫事件代理，是利用 DOM 元素的事件冒泡，将需要在子元素上响应的事件委托在其父元素上，让父元素进行事件监听，避免了内存和性能的不必要消耗。

## 2. 举例说明

点击列表的每一个 li，console 打印出 innerHTML，直觉上最先想到的就是给每一个 li 都绑定 click 事件。但这种方法有个弊端就是当有很多个 li 元素的时候，需要遍历每一个 li，为其绑定事件，这会占用更多的内存，导致性能变差。另外，还有个问题就是，下例中当点击 button 新增一个 li 后，我们再去点击这个新增的 li，并不能获取到 innerHTML 内容。

```html
<body>
	<div>
		<ul id="list">
			<li>项目1</li>
			<li>项目2</li>
			<li>项目3</li>
		</ul>
		<button id="btn">点击新增项目</button>
	</div>
	<script src="./index.js"></script>
</body>
```

```js
// 封装addEventListener
function bindEvent(ele, type, fn) {
	ele.addEventListener(type, fn);
}

const list = document.getElementById('list');
const lis = document.getElementsByTagName('li');
const btn = document.getElementById('btn');

//将获取的所有li元素组成的类数组转换成数组
lisArray = Array.prototype.slice.call(lis);

// 遍历每一个li，分别绑定click事件
lisArray.forEach((li) => {
	bindEvent(li, 'click', () => {
		console.log(li.innerHTML);
	});
});

//点击button添加新的li
btn.addEventListener('click', () => {
	const li = document.createElement('li');
	li.textContent = '新增项目';
	list.appendChild(li);
});
```

所以，我们可以利用事件冒泡，将 li 上的 click 事件委托到其父元素 ul 上，代码修改如下：

```js
const list = document.getElementById('list');
list.addEventListener('click', (event) => {
	const target = event.target;
	console.log(target.innerHTML);
});

//点击button添加新的li
btn.addEventListener('click', () => {
	const li = document.createElement('li');
	li.textContent = '新增项目';
	list.appendChild(li);
});
```

这样一来，只有被选中的 li 触发（冒泡）了委托在父元素 ul 上的监听事件，未选中的不会触发，避免了内存和性能的不必要消耗。

> 适合事件委托的事件包括：click、mousedown、mouseup、keydown 、keyup 、keypress  
> mouseover 和 mouseout 实际处理起来有点麻烦，具体视实际情况而定。

**实际开发中要避免 JS 引擎的不必要（频繁）启动，以便优化性能。**
