---
autoGroup-5: 其他
title: '简单loading实现'
date: 2020-03-02
categories:
  - FrontEnd
tags:
  - JavaScript
---

### 1. 首页 HTML

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Loading</title>
		<script src="./loading.js"></script>
		<style>
			.main {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		</style>
	</head>
	<body>
		<div class="main">
			<h1>首页加载成功！</h1>
			<img src="https://images.app.goo.gl/CNJZDtvNuAWEepdS6" alt="" />
		</div>
	</body>
</html>
```

### 2. JS 逻辑

- `document.onreadystatechange`监测页面 DOM 加载 `document.readyState`判断 DOM 是否完成

```js
// 获取窗口宽高
var _PageHeight = document.documentElement.clientHeight,
	_PageWidth = document.documentElement.clientWidth;

// 自定义loading DOM节点
var loadingHtml =
	'<div id="loadingDiv" style="opacity:1; z-index: 10; background: #ffffff; position: absolute; top:0; left:0; width: ' +
	_PageWidth +
	'px; height: ' +
	_PageHeight +
	'px;"><div style="position: absolute; top: 50%; left: 50%; transform: translate: (-50%,-50%); background: url(img/loading.gif) no-repeat; width: 39px; height: 39px;"></div></div>';

// 显示loading
document.write(loadingHtml);

// 监听加载状态
document.onreadystatechange = completeLoading;

// 加载状态为complete时移除loading节点
function completeLoading() {
	if (document.readyState === 'complete') {
		var loadingMask = document.getElementById('loadingDiv');
		loadingMask.parentNode.removeChild(loadingMask);
	}
}
```

![](https://tva1.sinaimg.cn/large/008eGmZEly1godrqoze7eg30w30hsdfw.gif)
