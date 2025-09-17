---
autoGroup-5: 其他
title: 创建对象
sidebarDepth: 2
date: 2020-11-27
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 工厂模式

- 工厂模式虽然解决了创建多个相似对象的问题，但没有解决对象识别的问题（即如何知道一个对象的类型）。

```js
function createPerson(name, age, job) {
	var o = new Object();
	o.name = bane;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		console.log(this.name);
	};
	return o;
}

var person_1 = createPerson('A', 29, 'Engineer');
var person_2 = createPerson('B', 24, 'Doctor');
console.log(persoon_1); //{name: 'A', age: 29, job: 'Engineer'}
person_1.sayName(); // A
console.log(persoon_2); //{name: 'B', age: 27, job: 'Doctor'}
person_2.sayName(); // B
```

## 2. 构造函数模式

- 每个方法都要在每个实例上重新创建一遍（不同实例中的同名方法不相等）。

```js
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	// this.sayName = new Function("console.log(this.name)")  👈 这里可以将sayName方法定义转移到构造函数外部（全局作用域中）
	// 但其弊端就是该函数只能被某个对象调用，且对象要定义很多方法时就要在全局定义很多个函数，这就没有封装性可言了。
	// 这种方式创建的函数，会导致不同作用域链和标识符解析，所以不同实例中的同名方法不相等。 [注释1]
	this.sayName = sayName;
}

function sayName() {
	console.log(this.name);
}

let p1 = new Person('A', 18, 'ac');
let p2 = new Person('B', 20, 'bd');
console.log(p1.syaName == p2.sayName); //true 。  若像 [注释1] 处那样，将函数sayName写在构造函数内部，此处返回 false，因为对于每个实例来说，都重新创建了一个sayName函数（引用类型自然不相等）
```

**[new 关键字：](https://www.dodolo.top/pages/frontEnd/javascript/new.html)**

> 1. 创建一个新对象
> 2. 将构造函数的作用域赋给新对象（this 指向新对象）
> 3. 执行构造函数中的代码（为新对象添加属性）
> 4. 返回新对象

## 3. 原型模式

- 虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值，若在实例中添加了一个属性，且该属性与实例原型中某个属性同名，那就会在实例中创建该属性，原型中的同名属性会被屏蔽掉。

- 省略了为构造函数传递初始化参数步骤，导致所有实例在默认情况下都取得相同的属性值。

- 一个实例修改应用类型的属性，会导致所有实例对应的属性一起跟着改变。\[注释 2\]

```js
function Person() {}

Person.prototype.name = 'A';
Person.prototype.age = 29;
Person.prototype.job = 'Engineer';
Person.prototype.sayName = function() {
	console.log(this.name);
};

let p1 = new Person();
let p2 = new Person();

console.log(p1.sayName == p2.sayName); //true

p1.name = 'B';
console.log(p1.name); // B —— 来自实例属性（上一步实例中添加的属性屏蔽掉原型中的同名属性）
console.log(p2.name); // A —— 来自原型属性
```

优化写法

```js
function Person() {}

Person.prototype = {
	constructor: Person, // 注意⚠️ 字面量形式创建的对象重写了默认的 prototype 对象，因此 constructor 属性也就变成了新对象的 constructor 属性（指向 Object 构造函数），所以此处需修改其指向 Person 构造函数。另外，这种方式重设 constructor 属性会导致其 [[Enumerable]] 特性变为 true（原生默认false 不可枚举），可用 Object.defineproperty() 修改。
	name: 'A',
	age: 29,
	job: 'Engineer',
	friends: ['Tom', 'Jerry'], // [注释2]
	sayName: function() {
		console.log(this.name);
	},
};

let p1 = new Person();
let p2 = new Person();
p1.friends.push('Poter');

console.log(p1.friends); //["Tom", "Jerry", "Poter"]
console.log(p2.friends); //["Tom", "Jerry", "Poter"]
console.log(p1.friends == p2.friends); //true
```

## 4. 组合模式

**构造函数模式 + 原型模式** 组成的组合模式是创建自定义类型的最常见方法。

- 1. 构造函数定义实例属性。
- 2. 原型模式定义方法和共享属性。

```js
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ['Tom', 'Jerry'];
}

Person.prototype = {
	constructor: Person,
	sayName: function() {
		console.log(this.name);
	},
};

let p1 = new Person('A', 22, 'Engineer');
let p2 = new Person('B', 28, 'Doctor');
p1.friends.push('Poter');

console.log(p1.friends); //["Tom", "Jerry", "Poter"]
console.log(p2.friends); //["Tom", "Jerry"]
console.log(p1.sayName === p2.sayName); //true
```

## 5. 动态原型模式

- 通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。仅在初次调用构造函数时才会执行。使用该模式时不能使用字面量重写原型，否则在已经创建了实例的情况下重写原型，会切断现有实例与新原型之间的联系。

```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['Tom', 'Jerry'];

    if（typeof this.sayName != 'function'）{
        Person.prototype.sayName = function(){
            console.log(this.name);
        }
    }
}
```

## 6. 寄生构造函数模式

- 返回的对象与构造函数或者构造函数的原型属性之间没有关系（构造函数返回的对象与在构造函数外部创建的对象没有什么不同，因此不能用 instanceof 操作符来确定对象类型）。

```js
function Person(name, age, job) {
	var o = new Object();
	o.name = bane;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		console.log(this.name);
	};
	return o;
}

let p1 = new Person('A', 25, 'Doctor');
```

## 7. 稳妥构造函数模式

```js
function Person(name, age, job) {
	var o = new Object();
	//此处定义私有变量和函数

	// 添加方法
	o.sayName = function() {
		console.log(name);
	};
	return o;
}

let p = new Person((name: 'A'), (age: 27), (job: 'Doctor'));
console.log(p.sayName()); // A
```
