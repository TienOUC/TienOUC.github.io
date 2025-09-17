---
autoGroup-4: 高级技巧
title: Function Overloading
date: 2021-12-19
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 函数重载

函数名相同，函数的参数列表不同（参数个数、参数类型），根据参数的不同之行不同的操作。

举例：

```js
function overload(a) {
	console.log("one argument");
}

function overload(a, b) {
	console.log("two argument");
}

// java(支持重载)
overload(1); //one argument
overload(1, 2); //two argument

// js（没有真正意义上的函数重载）
// 在JavaScript中，同一个作用域，出现两个名字一样的函数，后面的会覆盖前面的，所以 JavaScript 没有真正意义的重载。
overload(1); //two argument
overload(1, 2); //two argument
```

## 2. JS 实现函数重载

JS 中模拟实现函数重载

### 2.1 通过 arguments 对象实现

`arguments` 对象，是函数内部的一个类数组对象，它里面保存着调用函数时，传递给函数的所有参数。

```js
function overload() {
	if (arguments.length === 1) {
		console.log("one argument");
	}
	if (arguments.length === 2) {
		console.log("two argument");
	}
}

overload(0); //one argument
overload(0, 1); //two argument
```

**缺点：当 arguments 很多的时候，书写麻烦。**

### 2.2 利用闭包

- 举例：

有一个 `users` 对象，`users` 对象的 `values` 属性中存着一些名字。
一个名字由两部分组成，空格左边的是 `first-name` ，空格右边的是 `last-name`，如下：

```js
var users = {
	values: ["Dean Edwards", "Alex Russell", "Dean Tom"],
};
```

需要在 users 对象 中添加一个 `find` 方法，

> 当不传任何参数时， 返回整个`users .values`；  
> 当传一个参数时，就把 `first-name` 跟这个参数匹配的元素返回；  
> 当传两个参数时，则把 `first-name` 和 `last-name` 都匹配的返回。

这个需求中 `find` 方法 需要根据参数的个数不同而执行不同的操作，下来我们通过一个 `addMethod` 函数，来在 `users` 对象中添加这个 `find` 方法。

`addMethod` 函数，它接收 3 个参数

> 第一个：要绑定方法的对象  
> 第二个：绑定的方法名称  
> 第三个：需要绑定的方法

除了利用 `arguments` 对象，还用了 `函数的 length 属性`。

```js
function fn(a, b) {
	console.log(arguments.length);
}
console.log(fn.length); // 2 (函数的 length 是函数定义时形参的个数)
fn("a"); // 1  (arguments.length 是调用函数时，实际传给函数几个参数)
```

`addMethod` 方法

```js
function addMethod(object, name, fn) {
	// 先把原来的object[name] 方法，保存在old中
	var old = object[name];

	// 重新定义 object[name] 方法
	object[name] = function() {
		// 如果函数需要的参数 和 实际传入的参数 的个数相同，就直接调用fn
		if (fn.length === arguments.length) {
			return fn.apply(this, arguments);

			// 如果不相同,判断old 是不是函数，
			// 如果是就调用old，也就是刚才保存的 object[name] 方法
		} else if (typeof old === "function") {
			return old.apply(this, arguments);
		}
	};
}
```

使用这个 `addMethod` 函数

```js
// 不传参数时，返回整个values数组
function find0() {
	return this.values;
}
// 传一个参数时，返回firstName匹配的数组元素
function find1(firstName) {
	var ret = [];
	for (var i = 0; i < this.values.length; i++) {
		if (this.values[i].indexOf(firstName) === 0) {
			ret.push(this.values[i]);
		}
	}
	return ret;
}
// 传两个参数时，返回firstName和lastName都匹配的数组元素
function find2(firstName, lastName) {
	var ret = [];
	for (var i = 0; i < this.values.length; i++) {
		if (this.values[i] === `${firstName} ${lastName}`) {
			ret.push(this.values[i]);
		}
	}
	return ret;
}
// 给 users 对象添加处理 [没有参数] 的方法
addMethod(users, "find", find0);

// 给 users 对象添加处理 [一个参数] 的方法
addMethod(users, "find", find1);

// 给 users 对象添加处理 [两个参数] 的方法
addMethod(users, "find", find2);

console.log(users.find()); //["Dean Edwards", "Alex Russell", "Dean Tom"]
console.log(users.find("Dean")); //["Dean Edwards", "Dean Tom"]
console.log(users.find("Dean", "Edwards")); //["Dean Edwards"]
```

![截屏2021-12-19 21.34.20](https://raw.githubusercontent.com/TienOUC/blog-img/main/%E6%88%AA%E5%B1%8F2021-12-19%2021.34.20.png)

## 3. 总结

**重载其实是把多个功能相近的函数合并为一个函数，重复利用了函数名。**

**不要把一些根本不相关的函数合为一个函数，那样并没有什么意义。**

虽然 JavaScript 并没有真正意义上的重载，但是重载的效果在 JavaScript 中却非常常见，比如 数组的 `splice()` 方法，一个参数可以删除，两个参数可以删除一部分，三个参数可以删除完了，再添加新元素。
再比如 `parseInt()` 方法 ，传入一个参数，就判断是用十六进制解析，还是用十进制解析，如果传入两个参数，就用第二个参数作为数字的基数，来进行解析。

上述实现重载效果的方法，本质都是对参数进行判断，不管是判断参数个数，还是判断参数类型，都是根据参数的不同，来决定执行什么操作的。
