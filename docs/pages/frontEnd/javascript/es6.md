---
autoGroup-5: 其他
title: ES6
date: 2020-10-26
# sticky: 3
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 解构赋值

### 1.1 Array

- 一维数组

```js
let [a, b, c] = [1, 2, 3];
// a = 1
// b = 2
// c = 3
```

- 嵌套数组

```js
let [a, [[b], c]] = [1, [[2], 3]];
// a = 1
// b = 2
// c = 3
```

- 可忽略

```js
let [a, , b] = [1, 2, 3];
// a = 1
// b = 3
```

- 不完全解构

```js
let [a = 1, b] = []; // a = 1, b = undefined
```

- 扩展运算符

```js
let [a, ...b] = [1, 2, 3];
//a = 1
//b = [2, 3]
```

- 字符串
  > 解构的目标若为可遍历对象，皆可进行解构赋值( 可遍历对象即实现 Iterator 接口的数据 )

```js
let [a, b, c, d, e] = 'hello';
// a = 'h'
// b = 'e'
// c = 'l'
// d = 'l'
// e = 'o'
```

### 1.2 Object

- 基本

```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// foo = 'aaa'
// bar = 'bbb'

let { baz: foo } = { baz: 'ddd' };
// foo = 'ddd'
```

- **别名模式**

```js
let obj = { name: 'abc', age: 20 };
let { name: name1, age: age1 } = obj;
// name1 = 'abc'
// age1 = 20
```

- 扩展运算符

```js
let { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 };
// a = 10
// b = 20
// rest = {c: 30, d: 40}
```

- 解构默认值

```js
let { a = 10, b = 5 } = { a: 3 };
// a = 3; b = 5;
let { a: aa = 10, b: bb = 5 } = { a: 3 };
// aa = 3; bb = 5;
```

- 可嵌套可忽略

```js
let obj = { p: ['hello', { y: 'world' }] };
let {
 p: [x, { y }],
} = obj;
// x = 'hello'
// y = 'world'

let obj = { p: ['hello', { y: 'world' }] };
let {
 p: [x, {}],
} = obj;
// x = 'hello'
```

- 不完全解构

```js
let obj = { p: [{ y: 'world' }] };
let {
 p: [{ y }, x],
} = obj;
// x = undefined
// y = 'world'
```

## 2. let & const

- let / const

  > 1.不会进行变量提升  
  > 2.不会为全局变量 window 设置属性  
  > 3.不能重复声明，若重复声明，编译报错

- let / var
  > `let` 和 `var` 声明的变量可以重新赋值（更改指针指向）  
  > `const` 不可以重新赋值（指针指向不可更改，但指针所指向的堆内存中的数据结构可以发生更改，指针是存储在栈内存中）

## 3. Set & WeakSet

### 3.1 Set

Set 对象允许存储任何类型对唯一值（不重复）

**⚠️ 注意**

```js
let a = [1, 1, 3, 3, 4, {}, {}, false, false, true, 'true', NaN, NaN, null, null, undefined, undefined, [], []];
// [1, 3, 4, {…}, {…}, false, true, "true", NaN, null, undefined, Array(0), Array(0)]
```

### 3.1 WeakSet

成员对象只能是对象，成员对象不再被引用时，[垃圾回收机制](https://tienouc.gitee.io/vuepress/pages/frontEnd/javascript/Js%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E6%9C%BA%E5%88%B6%E5%8E%9F%E7%90%86.html)就会回收其所占的内存

## 4. Map & WeakMap

### 4.1 Map

> 与对象等不同点：Object 的键只能是字符串或者 Symbol

Map 对象保存键值对，键和值可以是任意类型

```js
var myMap = new Map();
var keyString = 'This is keyString';

myMap.set(keyString, "和键'This is keyString'关联的值");

myMap.get(keyString); // "和键'This is keyString'关联的值"
myMap.get('This is keyString'); // "和键'This is keyString'关联的值", 因为 keyString === 'This is keyString'
```

- 使用场景之一：**使用 Map 类型控制表单提交**

```html
<body>
 <form action="https://www.baidu.com" onsubmit="return post()">
  <label for="protocol">用户协议<input type="checkbox" id="protocol" error="请接受用户协议"/></label>
  <label for="student">我是学生<input type="checkbox" id="student" error="网站只对学生开放"/></label>
  <input type="submit" />
 </form>
 <script>
  function post() {
   let map = new Map();
   let inputs = document.querySelectorAll('[error]');
   inputs.forEach((item) => {
    map.set(item, {
     error: item.getAttribute('error'),
     status: item.checked,
    });
   });

   return [...map].every(([ele, config]) => {
    config.status || alert(config.error);
    return config.status;
   });
  }
 </script>
</body>
```

![](https://tva1.sinaimg.cn/large/008i3skNly1gqy9corjw2g30sx0hrn8d.gif)

### 4.2 WeakMap

其键只能是对象类型( 不可迭代，没有`keys()` 、`values()` 方法，主要用于对内存敏感的场景 ，一般开发很少用到，相关知识点暂时挂起，后续补齐示例)

## 5. Symbol

> ES6 引入的新的原始数据类型，表示独一无二的值，用来给对象定义唯一的属性名  
> 作为属性名时，是公有属性，可以被外部访问，但不会出现在 for in / for of 循环中，想要获取，只能通过 `Object.getOwnPropertySymbol()` 或者 `Reflect.ownKeys()` 取到

```js
const a = Symbol.for('a');
const b = Symbol.for('a');
const c = Symbol('a');
const d = Symbol('a');
const e = Symbol();
const f = Symbol();
console.log(a === b); //true
console.log(a === c); //false
console.log(b === c); // false
console.log(c === d); // false
console.log(Symbol.keyFor(a) === Symbol.keyFor(b)); // true
console.log(Symbol.keyFor(c) === Symbol.keyFor(d)); // true
console.log(Symbol.keyFor(e) === Symbol.keyFor(f)); // true
```

> Symbol.for创建的Symbol值声明在全局环境中，重复声明的时候会先在全局环境中找，若有，则指向第一个声明   
> Symbol.keyFor返回全局声明的Symbol类型的key（描述信息）

## 6. Promise

以同步形式（链式）呈现异步操作，解决多层回调嵌套的一种解决方案

实例创建

```js
var promise = new Promise(function(resolve, reject) {
 // 异步处理
 // 处理结束后、调用resolve 或 reject
});
```

### 6.1. 三态

- pending （进行中）
- fulfilled (已成功)
- rejected （已失败）

除了异步操作的结果，任何其他操作都无法改变这个状态；  
Promise 对象只有从 `pending` 变为 `fulfilled` 和从 `pending` 变为 `rejected` 的状态改变。只要处于 `fulfilled` 和 `rejected` ，状态就不会再变了，即 `resolved（已定型）`。

### 6.2 静态方法

#### 6.2.1 Promise.resolve() Promise.reject()

省略...

#### 6.2.2 Promise.all([promise1, promise2, ...])

```js
var p = Promise.all([p1, p2, p3]);
```

> Promise.all 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 对象的实例。（Promise.all 方法的参数不一定是数组，但是必须具有 iterator 接口，且返回的每个成员都是 Promise 实例。）

> 上例中 p 的状态由 p1、p2、p3 决定，分成两种情况。（1）只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。（2）只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

```js
let p1 = new Promise((resolve, reject) => {
 resolve('resolve-p1');
});

let p2 = new Promise((resolve, reject) => {
 reject('reject-p2');
});

let p3 = new Promise((resolve, reject) => {
 resolve('resolve-p3');
});

let p4 = new Promise((resolve, reject) => {
 reject('reject-p4');
});

Promise.all([p3, p1])
 .then((res) => {
  console.log(res);
 })
 .catch((err) => {
  console.log(err);
 }); // 按序输出["resolve-p3", "resolve-p1"]

Promise.all([p4, p3, p1, p2])
 .then((res) => {
  console.log(res);
 })
 .catch((err) => {
  console.log(err);
 }); // 仅输出第一个reject   reject-p4
```

#### 6.2.3 Promise.race([promise1, promise2, ...])

```js
var p = Promise.race([p1, p2, p3]);
```

> 上例中，只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的返回值

```js
let p1 = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve('success');
 }, 1000);
});

let p2 = new Promise((resolve, reject) => {
 setTimeout(() => {
  reject('failed');
 }, 500);
});

Promise.race([p1, p2])
 .then((result) => {
  console.log(result);
 })
 .catch((error) => {
  console.log(error); // 输出 'failed'
 });
```

#### 6.2.4 Promise.any()

接收一个 Promise 可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise (或者有多个 resolve 时返回第一个)，若全部 reject 则返回一个 promise 对象和 AggregateError 类型的实例

```js
let p1 = new Promise((resolve, reject) => {
 resolve('resolve-p1');
});

let p2 = new Promise((resolve, reject) => {
 reject('reject-p2');
});

let p3 = new Promise((resolve, reject) => {
 resolve('resolve-p3');
});

Promise.any([p2, p3, p1])
 .then((res) => console.log(res))
 .catch((err) => console.log(err));
// 输出 ‘resolve-p3’
```

```js
let p1 = new Promise((resolve, reject) => {
 reject('reject-p1');
});

let p2 = new Promise((resolve, reject) => {
 reject('reject-p2');
});

let p3 = new Promise((resolve, reject) => {
 reject('reject-p3');
});

let result = Promise.any([p2, p3, p1])
 .then((res) => console.log(res))
 .catch((err) => console.log(err));

console.log(result); //  Promise {<pending>} 和 AggregateError: All promises were rejected
```

### 6.2.5 Promise.allSettled()

```js
let p1 = new Promise((resolve, reject) => {
 resolve('resolve-p1');
});

let p2 = new Promise((resolve, reject) => {
 reject('reject-p2');
});

let p3 = new Promise((resolve, reject) => {
 resolve('resolve-p3');
});

Promise.allSettled([p2, p3, p1])
 .then((res) => console.log(res))
 .catch((err) => console.log(err));
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gl3st5gvdkj30f9046mx3.jpg)

## 7. 箭头函数

箭头函数表达式的语法比函数表达式更简洁，并且没有自己的 `this、arguments、super` 和 `new.target`。箭头函数更适用于本来应该需要匿名函数的地方，并且它们不能用作构造函数。

```js
class Person {
 constructor(name) {
  this.name = name;
 }
}

Object.assign(Person.prototype, {
 getName: () => {
  return this.name; // this 指向 window
 },
});

const me = new Person('Yokiijay');
console.log(me.getName()); // => undefined
```

由于箭头函数的 this 继承自上一层对象的 this (**_而 function 的 this 是当前调用自己的对象的 this_**),所以这里用箭头函数并拿不到 Person 对象下的 name 属性, 箭头函数声明的时候 context 就已经决定了

此时想拿到 name 属性， 可以利用穿透法

```js
var _this = this;
class Person {
 constructor(name) {
  _this.name = name;
 }
}
Object.assign(Person.prototype, {
 getName: () => {
  return this.name;
 },
});

const me = new Person('Yokiijay');
console.log(me.getName());
```

## 8. 继承

### 8.1 ES6 继承

### 8.2 ES5 & ES6 继承的区别

- ES5
  原型链继承
  > 利用原型让一个引用类型继承另一个引用类型的属性和方法，即让原型对象等于另一个类型的实例

```js
function SuperType() {
 this.property = true;
}
SuperType.prototype.getSuperValue = function() {
 return this.property;
};
function SubType() {
 this.subproperty = false;
}
// 继承类SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
 return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue()); // true
```

**区别**

- ES5 的继承实质是先创造子类的实例对象 `this`， 然后再将父类的方法属性添加到 `this` 上面（ `Parent.call(this)` ）。

- ES6 的继承实质是先将父类实例对象的属性和方法，加到 `this` 上面（所以必须先调用 `super` 方法），然后再用子类的构造函数修改 `this`。
  (**在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有 super 方法才能调用父类实例**)
