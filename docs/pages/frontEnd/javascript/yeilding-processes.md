---
autoGroup-4: 高级技巧
title: Yeilding Processes
date: 2021-11-21
categories:
  - FrontEnd
tags:
  - JavaScript
---

与桌面应用可以动态调整运行所需内存和处理器时间不同的是，运行在浏览器中的 `JavaScript` 都被分配了一个确定数量的资源，是有严格限制的。当 `JavaScript` 代码运行超过特定的时间或者语句数量就会被阻止继续执行，但实际开发中难免会遇到过长、过深嵌套的函数调用或者大数组的循环处理，为了解决这些问题就有了定时器及分块的解决方案。

例如：对于一个 **非必须同步完成** 并且 **非必须按照顺序完成** 的大数组循环处理来说，就可以使用定时器分割这个循环处理，即 **数组分块**（`array chunking`） 技术。基本模式如下：

- 模式

```js
setTimeout(function() {
	//取出下一个元素并处理
	var item = array.shift();
	process(item);

	//若还有元素，再设置另一个定时器
	if (array.length > 0) {
		setTimeout(arguments.callee, 100); //arguments.callee调用同一个匿名函数
	}
}, 100);
```

- 分块函数实现

```js
function chunk(array, process, context) {
	setTimeout(function() {
		var item = array.shift();
		process.call(context, item);

		if (array.length > 0) {
			setTimeout(arguments.callee, 100);
		}
	}, 100);
}
```

`chunk()` 方法接受三个参数：要处理的项目的数组 `array`，用于处理项目的函数 `process`，以及可选的运行该函数的环境 `context`。函数内部用了之前描述过的基本模式，通过 `ca11()` 调用的 `pocess()` 函数，这样可以设置一个合适的执行环境（如果必须），定时器的时间间隔是需求而定。

**注意**

传递给`chunk()` 函数的数组是用作一个队列的，因此上述方法在处理数据的同时，数组的元素也在发生变化，想保持原数组不变，则应该将原数组的拷贝传递给 `chunk()` 函数。
