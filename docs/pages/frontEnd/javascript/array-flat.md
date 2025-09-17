---
autoGroup-5: 其他
title: 数组扁平化
date: 2020-10-23
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 数组扁平化的几种方法

将多维数组转换成一个一维数组 `[1, [2, 3, [4, 5]]] ------> [1, 2, 3, 4, 5]`

```js
let arr = [1, 2, [3, 4], [5, [6, 7]]];
```

### 1.1 reduce

遍历数组每一项，若该项是数组则继续递归遍历，否则 concat

```js
function flatten(arr) {
	return arr.reduce((result, item) => {
		return result.concat(Array.isArray(item) ? flatten(item) : item);
	}, []);
}
// 调用返回  [1, 2, 3, 4, 5, 6, 7]
```

### 1.2 toString & split

```js
function flatten(arr) {
	return arr
		.toString()
		.split(',')
		.map((item) => {
			return Number(item);
		});
}
//调用返回  [1, 2, 3, 4, 5, 6, 7]
```

### 1.3 join & split

```js
function flatten(arr) {
	return arr
		.join(',')
		.split(',')
		.map((item) => {
			return item * 1;
		});
}
//调用返回  [1, 2, 3, 4, 5, 6, 7]
```

### 1.4 扩展运算符

```js
function flatten(arr) {
	while (arr.some((item) => Array.isArray(item))) {
		arr = [].concat(...arr);
	}
	return arr;
}
//调用返回  [1, 2, 3, 4, 5, 6, 7]
```

### 1.5 flat(depth)

参数：
-depth: 嵌套层数，在未知层数时，可以用 `Infinity` 作为参数

```js
arr.flat(Infinity);
//调用返回  [1, 2, 3, 4, 5, 6, 7]
```

### 总结

不管用上述哪种方法，均需结合使用场景选取，时间复杂度是首要需要考量的因素
