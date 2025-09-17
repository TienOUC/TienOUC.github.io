---
autoGroup-1: TS基础概念和用法
title: Mixins
date: 2021-05-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

## 1.对象混入

可以使用 es6 的 Object.assign 合并多个对象

```ts
interface Name {
  name: string;
}
interface Age {
  age: number;
}
interface Gender {
  gender: string;
}

let people1: Name = { name: 'xx' };
let people2: Age = { age: 20 };
let people3: Gender = { gender: '男' };

const people = Object.assign(people1, people2, people3);
```

此时 `people` 会被推断成一个交差类型 `Name & Age & Gender`;

## 2.类的混入

首先声明两个 `mixins` 类

```ts
class A {
  type: boolean = false;
  changeType() {
    this.type = !this.type;
  }
}

class B {
  name: string = '张三';
  getName(): string {
    return this.name;
  }
}
```

```ts
class C implements A, B {
  type: boolean;
  changeType: () => void;
  name: string;
  getName: () => string;
}
```

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202301262008988.png)

编译后

```js
var A = /** @class */ (function() {
  function A() {
    this.type = false;
  }
  A.prototype.changeType = function() {
    this.type = !this.type;
  };
  return A;
})();
var B = /** @class */ (function() {
  function B() {
    this.name = '张三';
  }
  B.prototype.getName = function() {
    return this.name;
  };
  return B;
})();
var C = /** @class */ (function() {
  function C() {}
  return C;
})();
```

混入操作

```ts
Mixins(C, [A, B]);
function Mixins(targetClass: any, itemClass: any[]) {
  itemClass.forEach((item) => {
    Object.getOwnPropertyNames(item.prototype).forEach((name) => {
      targetClass.prototype[name] = item.prototype[name];
    });
  });
}
```
