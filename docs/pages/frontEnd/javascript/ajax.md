---
autoGroup-5: 其他
title: 'Ajax封装'
date: 2020-03-02
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. Ajax 请求步骤

```js
// 1.初始化实例
let request = new XMLHttpRequest();
// 2.设置回调函数
request.onreadystatechange = function() {
	if (request.status == 200 && request.readyState == 4) {
		//...
		console.log('successed');
	} else {
		//...
		console.log('failed');
	}
};
// 3.配置请求信息
request.open('GET', url);
// 4.发送请求
request.send();
```

## 2. 请求举例

随机数据源：[Mock.js](http://mockjs.com/examples.html)

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Ajax</title>
		<script src="https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.1-beta3/mock-min.js"></script>
		<script src="./ajax.js"></script>
	</head>
	<body>
		<div>
			Ajax request data from Mockjs
			<ul id="content"></ul>
		</div>
	</body>
</html>
```

```js
let url = 'http://api.com';
let data = Mock.mock(url, {
	'user|5': [
		{
			name: '@cname', //中文名称
			'age|1-100': 100, //100以内随机整数
			birthday: '@date("yyyy-MM-dd")', //日期
			city: '@city(false)', //中国城市
		},
	],
});

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		let data = JSON.parse(xhr.responseText);
		let userList = data.user;
		const fragment = document.createDocumentFragment();
		userList.forEach((item) => {
			console.log(item);
			const li = document.createElement('li');
			li.innerHTML = `姓名：${item.name} 年龄：${item.age} 籍贯：${item.city} 生日：${item.birthday} `;
			fragment.appendChild(li);
		});
		document.getElementById('content').appendChild(fragment);
	}
};
xhr.open('GET', url, true);
xhr.send();
```

![](https://tva1.sinaimg.cn/large/008i3skNly1gtzy34kpa4j60w00l7aba02.jpg)

## 3. Ajax 封装

```js
function ajax(options) {
	//默认值
	var defaults = {
		type: 'get',
		url: '',
		data: {},
		header: {
			'Context-Type': 'application/x-www-form-urlencoded',
		},
		success: function() {},
		error: function() {},
	};

	//使用options对象中的属性覆盖defaults对象中的属性（Object.assign会改变原对象）
	Object.assign(defaults, options);

	var xhr = new XMLHttpRequest();
	var params = ''; //请求参数变量

	//循环用户传递进来的对象格式参数，并将其转换成字符串格式
	for (var attr in defaults.data) {
		params += attr + '=' + defaults.data[attr] + '&';
	}
	params = params.sunstr(0, params.length - 1); //截掉最后面的 &

	//判断请求类型
	if (defaults.type == 'get') {
		defaults.url = defaults.url + '?' + params;
	}
	xhr.open(defaults.type, defaults.url);

	if (defaults.type == 'post') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //post请求必须设置RequestHeader
		xhr.send(params);
	} else {
		xhr.send();
	}

	xhr.onload = function() {
		var contentType = xhr.getResponseHeader('Content-Type');
		var responseText = xhr.responseText;

		//若响应类型中包含application/json，则将json字符串转换为json对象
		if (contentType.includes('application/json')) {
			responseText = JSON.parse(responseText);
		}
		if (xhr.status == 200) {
			//若使用xhr.onreadystatechange()时则要判断  xhr.readyState == 4 && xhr.status == 200
			return defaults.success(responseText, xhr);
		} else {
			defaults.error(responseText, xhr);
		}
	};
}
```

## 4. 请求举例

```js
ajax({
	type: 'get',
	url: 'http://localhost:3000/get',
	data: {
		name: 'name',
		age: 20,
	},
	header: {
		'Context-Type': 'applicatoion/json',
	},
	success: function(data, xhr) {},
	error: function(error, xhr) {},
});
```
