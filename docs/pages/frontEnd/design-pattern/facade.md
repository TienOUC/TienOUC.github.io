---
title: 设计模式——Facade
date: 2021-12-26
categories:
  - FrontEnd
tags:
  - DesignPattern
---

## 1. 简述

### 1.1 什么是外观模式

外观模式：就是提供一个统一的接口去访问多个子系统的多个不同的接口，为子系统中的一组接口提供统一的高层接口。使得子系统更容易使用，不仅简化类中的接口，而且实现调用者和接口的解耦。

### 1.2 为什么需要外观模式

外观模式可以让我们间接调用子系统，从而避免因直接访问子系统而产生不必要的错误。

### 1.3 适用场景

- JS 中常常用于解决浏览器兼容性问题。

### 1.4 优缺点

- **优点：** 易于使用，而且本身也比较轻量级。
- **缺点：** 连续使用时会产生一定的性能问题，因为在每次调用时都要检测功能的可用性。

### 1.5 JS 中实现外观模式

#### 1.5.1 简单示例

```js
// a.js
export default {
	getA(params) {
		// do something...
	},
};

// b.js
export default {
	getB(params) {
		// do something...
	},
};

// app.js  外观模式为子系统提供同一的高层接口
import A from "./a";
import B from "./b";
export default {
	A,
	B,
};
```

```js
// 通过同一接口调用子系统
import app from "./app";

app.A.getA(params);
app.B.getB(params);
```

#### 1.5.2 浏览器兼容

使用外观模式通过检测浏览器特性的方式来创建一个跨浏览器的使用方法。

```js
function addEvent(dom, type, fn) {
	if (dom.addEventListener) {
		// 支持DOM2级事件处理方法的浏览器
		dom.addEventListener(type, fn, false);
	} else if (dom.attachEvent) {
		// 不支持DOM2级但支持attachEvent
		dom.attachEvent("on" + type, fn);
	} else {
		dom["on" + type] = fn; // 都不支持的浏览器
	}
}

const myInput = document.getElementById("myinput");
addEvent(myInput, "click", function() {
	console.log("绑定 click 事件");
});
```

解决一些其他的浏览器兼容性问题：

```js
const getEvent = function(event) {
	// 获取事件对象
	return event || window.event; // IE下window.event
};

const getTarget = function(event) {
	// 获取事件元素
	const event = getEvent(event);
	return event.target || event.srcElement; // IE下event.srcElement
};

const preventDefault = function(event) {
	// 阻止默认事件
	const event = getEvent(event);
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	} // IE下
};

const cancelBubble = function(event) {
	const event = getEvent(event);
	if (event.stopPropagation) {
		event.stopPropagation();
	} else {
		event.cancelBubble = true;
	} // IE下
};

document.onclick = function(e) {
	preventDefault(e);
	if (getTarget(e) !== document.getElementById("myinput")) {
		console.log("外观模式");
	}
};
```

## 2. 与适配器模式的区别

- 适配器模式是将一个对象包装起来以改变其接口，而外观模式是将一群对象包装起来以简化其接口。

- 适配器是将接口转换为不同接口，而外观模式是提供一个统一的接口来简化接口。
