---
autoGroup-5: 其他
title: new
date: 2020-01-01
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 过程

创建类的新实例，必须调用 new 操作符，以这种方式调用构造函数实际经历了四步：

> 1. 创建一个新对象
> 2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
> 3. 执行构造函数中的代码（为这个新对象添加属性）
> 4. 返回新对象

## 2. 实现一个简单的 new 方法

```js
// 构造器函数
let Parent = function(name, age) {
	this.name = name;
	this.age = age;
};
Parent.prototype.sayName = function() {
	console.log(this.name);
};

// 自定义的new方法
let newMethod = function(Parent, ...rest) {
	// 1. 以构造器的prototype属性为原型，创建新对象
	let child = Object.create(Parent.prototype);

	//2.将this和调用参数传给构造器执行
	Parent.apply(child, rest);

	//3.返回第一步创建的对象
	return child;
};

// 创建实例，将构造器函数Parent与形参作为参数传入
const child = newMethod(Parent, 'A', 22);
child.sayName(); // A;

// 检验，与使用new效果相同
child instanceof Parent; //true
child.hasOwnProperty('name'); //true
child.hasOwnProperty('age'); //true
child.hasOwnProperty('sayName'); //false
```
