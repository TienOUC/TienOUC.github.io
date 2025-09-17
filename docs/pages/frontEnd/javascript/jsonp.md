---
autoGroup-5: 其他
title: 'Jsonp封装'
date: 2020-03-01
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 封装

```js
function jsonp(options) {
	//动态创建 Script 标签
	var script = document.createElement('script');

	var params = '';
	for (var attr in options.data) {
		params += '&' + attr + '=' + options.data[attr];
	}

	var fnName =
		'jsonp' +
		Math.random()
			.toString()
			.replace('.', '');

	//用 window 把 success 函数挂载到全局
	window[fnName] = options.success;

	//为 scriptb 标签添加 src 属性
	script.src = options.url + '?callback=' + fnName + params;

	//将 script 标签添加到 body
	document.body.appendChild(script);

	//script 标签加载完成时，服务器返回的函数已执行，所以在此之后移除 script 标签
	script.onload = function() {
		document.body.removeChild(script);
	};
}
```

## 2. 请求举例

```js
jsonp({
	type: 'get',
	url: 'http://www.xxx.com/get', //非同源地址
	data: {
		name: 'ABC',
		age: 20,
	},
	success: function(data) {},
	error: function(data) {},
});

//服务器端用(express 框架)用 res.jsonp({name: 'ABC', age: 20})返回需要调用的函数名和数据给客户端
```
