---
autoGroup-5: 其他
title: 继承
sidebarDepth: 2
date: 2020-12-14
categories:
  - FrontEnd
tags:
  - JavaScript
---

继承：就是利用原型让一个引用类型继承另一个引用类型的属性和方法。

## 1. 原型链（继承）

- 超类型的引用属性被子类型继承后，子类型的某个实例修改该属性，其他子类型实例中的该属性也会跟着被修改。
- 在创建子类型的实例时，不能向超类型的构造函数传递参数（ 直白点说是没有办法在不影响所有对象实例的前提下，给超类型的构造函数传递参数 ）。

```js
function SuperType() {
	this.colors = ['red', 'green'];
}
function SubType() {}

SubType.prototype = new SuperType();

let subInstance_1 = new SubType();
subInstance_1.colors.push('black');
console.log(subInstance_1.colors); // ['red', 'green', 'black']

let subInstance_2 = new SubType();
console.log(subInstance_2.colors); // ['red', 'green', 'black'] 注意⚠️ 实例2中的属性跟着实例1的修改变化
```

## 2. 借用构造函数

- 在子类型构造函数的内部调用超类型构造函数。
- 方法都在构造函数内定义，因此函数复用就不可行了，而且在超类型的原型中定义的方法，对子类型而言是不可见的。

```js
function SuperType(name) {
	this.name = name;
	this.colors = ['red', 'green'];
}
function SubType() {
	// call或者apply继承SuperType
	SuperType.call(this, 'subName');
	this.age = 29;
}

let subInstance_1 = new SubType();
console.log(subInstance_1.name); // subName
console.log(subInstance_1.age); // 29
subInstance_1.colors.push('black');
console.log(subInstance_1.colors); // ['red', 'green', 'black']

let subInstance_2 = new SubType();
console.log(subInstance_2.colors); // ['red', 'green']
```

## 3. 组合继承

- 会调用两次超类型的构造函数，一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。
- 下面例子中，在第一调用 SuperType 构造函数时，SubType.prototype 会得到两个属性：`name` 和 `colors` ，他们都是 SuperType 的属性，此时位于 SubType 的原型中。当调用 SubType 构造函数时，又会调用一次 SuperType 构造函数，此时在新对象上创建了实例属性 `name` 和 `colors` ，这两个属性会屏蔽掉原型中的同名属性。

```js
function SuperType(name) {
	this.name = name;
	this.colors = ['red', 'green'];
}

SuperType.prototype.sayName = function() {
	console.log(this.name);
};

function SubType(name, age) {
	// 继承SuperType的属性
	SuperType.call(this, name); // 第二次调用 SuperType()
	// 子类型自定义属性
	this.age = age;
}

//继承方法
SubType.prototype = new SuperType(); // 第一次调用 SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.getAge = function() {
	console.log(this.age);
};

let p1 = new SubType('Tom', 18);
p1.colors.push('black');
console.log(p1.colors); // ['red', 'green', 'black']
p1.sayName(); // Tom
p1.getAge(); // 18

let p2 = new SubType('Jerry', 22);
console.log(p2.colors); // ['red', 'green']
p2.sayName(); // Jerry
p2.getAge(); // 22
```

## 4. 原型式继承

- 简单继承完全可胜任，但包含的引用类型属性依然会共享（下例 friends）。

```js
// 在object()函数内部，先创建一个临时构造函数，然后将传入的对象作为这个临时构造函数的原型，最后返回这个临时类型的新实例，本质就是object()对传入的对象执行了一次浅拷贝。
function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}

let person = {
	name: 'Tom',
	friends: ['Tom', 'Jerry'],
};

let p1 = object(person);
p1.name = 'Poter';
p1.friends.push('Lili');
console.log(p1.friends); //["Tom", "Jerry", "Lili"]

let p2 = object(person);
p2.name = 'Sam';
p2.friends.push('Cheery');
console.log(p2.friends); //["Tom", "Jerry", "Lili", "Cheery"]
```

## 5. 寄生式继承

- 创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象。
- 缺点：函数无法复用

```js
function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}

function createOne(obj) {
	//通过调用函数创建一个新对象（任何能够返回新对象的函数都可，此处以前面的object()函数举例）
	var clone = object(obj);
	// 以某种方式来增强这个对象
	clone.sayHi = function() {
		console.log('hi~');
	};
	return clone;
}

var person = {
	name: 'Tom',
	friends: ['Tom', 'Jerry'],
};

let p1 = createOne(person);
p1.sayHi();

let p2 = createOne(person);
p2.friends.push('Mark');

console.log(p1.name);
console.log(p2.friends);

// 基于person对象返回了一个新对象，新对象继承了 person的属性，且有自定义的方法sayHi()，这里注意到person中的引用类型属性friends依然会共享，新对象的某一个实例改变这个属性值，其他实例随之改变。
```

## 6. 寄生组合式继承

- 解决了组合式继承中调用两次超类型构造函数，且新对象中的属性会屏蔽掉原型中同名属性的问题。
- 通过借用构造函数来继承属性，通过原型链混成形式继承方法（不必为来指定子类型的原型而调用超类型的构造函数，所需的只是超类型原型的一个副本，本质就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型）。

```js
// 基本模式
function inheritPrototype(subType, superType) {
	// 创建对象
	var prototype = object(superType.prototype);
	// 增强对象
	prototype.constructor = subType;
	// 制定对象
	subType.prototype = prototype;
}
```

```js
function SuperType(name) {
	this.name = name;
	this.colors = ['red', 'green'];
}

SuperType.prototype.sayName = function() {
	console.log(this.name);
};

function SubType(name, age) {
	SuperType.call(this, name);
	this.age = age;
}

inheritPrototype(subType, superType);
SubType.prototype.getAge = function() {
	console.log(this.age);
};
```
