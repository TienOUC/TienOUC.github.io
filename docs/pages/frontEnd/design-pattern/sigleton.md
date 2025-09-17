---
title: 设计模式——Singleton
date: 2021-12-20
categories:
  - FrontEnd
tags:
  - DesignPattern
---

## 1. 简述

### 1.1 什么是单例模式

单例模式：就是在整个运行时域，一个类只有一个实例对象。

### 1.2 为什么需要单例模式

因为某些复杂类的实例，其创建与销毁对性能消耗较大，如果频繁创建与销毁就会造成性能浪费。

例如：创建数据库链接对象是一个耗资源的操作，并且数据库链接完全是可复用的，此时就可以将数据库链接对象设计成单例的，这样只需要创建一次并且重复使用该对象即可，而不是每次访问数据库都去创建一个新的链接对象，频繁访问数据库的情景下每次都创建链接对象无疑会造成性能的极大浪费。

**单例模式的设计三要素：**

- 是否线程安全
- 是否懒加载
- 能否反射破坏 [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect) [JavaScript -- 代理和反射](https://juejin.cn/post/6926433030592528391)

**单例模式特点：**

- 类只有一个实例
- 全局可访问该实例
- 自行实例化
- 延迟执行

### 1.3 适用场景

维护一个全局实例对象

- 1. 引用第三方库（多次引用只会使用一个库引用，如 jQuery）
- 2. 弹窗（登录框，信息提示框）
- 3. 购物车 (一个用户只有一个购物车)
- 4. 全局态管理 store (Vuex / Redux)

### 1.4 优缺点

- **优点：** 适用于单一对象，只生成一个对象实例，避免频繁创建和销毁实例，减少内存占用。
- **缺点：** 不适用动态扩展对象，或需创建多个相似对象的场景。

**饿汉式：** 在第一次引用该类的时候就创建对象实例，而不管实际是否需要创建。

- 优点：写法简单，在类加载的时候就完成实例化，避免线程同步。
- 缺点：没有达到懒加载的效果，若果自始至终都没有用过这个对象，就会造成内存浪费。

**懒汉式：** 当程序第一次访问单例模式实例时才进行创建（延迟加载）。

- 优点： 懒加载

懒汉式实现方法有多种，具体使用哪一种要视实际情况使用（例如 JAVA 中多数情况下推荐双检锁的写法）

### 1.5 JS 中实现单例模式

#### 1.5.1 简单版

> 使用一个变量存储类实例对象（值初始为 null/undefined ）。进行类实例化时，判断类实例对象是否存在，存在则返回该实例，不存在则创建类实例后返回。多次调用类生成实例方法，返回同一个实例对象。

```js
let Singleton = function(name) {
 this.name = name;
 this.instance = null;
};

Singleton.prototype.getName = function() {
 console.log(this.name);
};

Singleton.getInstance = function(name) {
 if (!this.instance) {
  this.instance = new Singleton(name);
 }
 return this.instance;
};

let spy1 = Singleton.getInstance("James Bond");
let spy2 = Singleton.getInstance("007");

console.log(spy1.getName()); // 'James Bond'
console.log(spy2.getName()); // '007'
console.log(spy1 === spy2); // true
```

上述实现方法存在问题：

> 不够“透明”，无法使用 new 来进行类实例化，需约束该类实例化的调用方式： `Singleton.getInstance(...)`;  
> 管理单例的操作，与对象创建的操作、功能代码耦合在一起，不符合 “单一职责原则“

#### 1.5.2 透明版

> 实现 “透明版” 单例模式，解决问题：统一使用 new 操作符来获取单例对象， 而不是 `Singleton.getInstance(...)`。

```js
let CreateSingleton = (function() {
 let instance;
 return function(name) {
  if (instance) {
   return instance;
  }
  this.name = name;
  return (instance = this);
 };
})();

CreateSingleton.prototype.getName = function() {
 console.log(this.name);
};

let spy1 = new CreateSingleton("James Bond");
let spy2 = new CreateSingleton("007");

console.log(spy1.getName()); // 'James Bond'
console.log(spy2.getName()); // '007'
console.log(spy1 === spy2); // true
```

“透明版”单例模式解决了不够“透明”的问题，让我们我们可以使用 `new` 操作符来创建实例对象。

#### 1.5.3 代理版

> 通过“代理”的形式，解决问题：将管理单例操作，与对象创建操作进行拆分，实现更小的粒度划分，符合“单一职责原则”

```js
let ProxyCreateSingleton = (function() {
 let instance;
 return function(name) {
  // 代理函数仅作管控单例
  if (!instance) {
   instance = new Singleton(name);
  }
  return instance;
 };
})();

// 独立的Singleton类，处理对象实例
let Singleton = function(name) {
 this.name = name;
};

Singleton.prototype.getName = function() {
 console.log(this.name);
};

let spy1 = new CreateSingleton("James Bond");
let spy2 = new CreateSingleton("007");

console.log(spy1.getName()); // 'James Bond'
console.log(spy2.getName()); // '007'
console.log(spy1 === spy2); // true
```

#### 1.5.4 惰性单例模式

解决 “按需加载” 的问题。

**需求：页面弹窗提示，多次调用，都只有一个弹窗对象，只是展示信息内容不同。**

```js
let getSingleton = function(fn) {
 var result;
 return function() {
  return result || (result = fn.apply(this, arguments)); // 确定this上下文并传递参数
 };
};

let createAlertMessage = function(html) {
 var div = document.createElement("div");
 div.innerHTML = html;
 div.style.display = "none";
 document.body.appendChild(div);
 return div;
};

let createSingleAlertMessage = getSingleton(createAlertMessage);
document.body.addEventListener("click", function() {
 // 多次点击只会产生一个弹窗
 let alertMessage = createSingleAlertMessage("惰性单例模式");
 alertMessage.style.display = "block";
});
```

上述是一个通用的 “惰性单例” 的创建方式，如果还需要 `createLoginLayer` 登录框, `createFrame` Frame 框, 都可以调用 `getSingleton(...)` 生成对应实例对象的方法。

**补充:**

其实在JS中利用`Object.frezz(object)`也可以简单实现一个单例模式：

```js
let count = 0;
let Counter = Object.frezz({
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
})
export { Counter }
```
