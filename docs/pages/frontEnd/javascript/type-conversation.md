---
autoGroup-5: 其他
title: '隐式类型转换的妙用'
date: 2019-10-19
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 可变数组求和举例

- Eg:

```js
function foo(...a) {
	var sum = 0;
	a.forEach((item) => {
		sum += item;
	});
	return sum;
}
console.log(foo(1, 2, 3, '4', 11));
```

**输出:**

```
[Running] node "Untitled-1.js"
6411
```

- 类型转换

```js
function foo(...a) {
	var sum = 0;
	a.forEach((item) => {
		sum += item * 1; // *1 隐式类型转换,把'4' 转换成4
	});
	return sum;
}
console.log(foo(1, 2, 3, '4', 11));
```

**输出:**

```
[Running] node "Untitled-1.js"
21
```
