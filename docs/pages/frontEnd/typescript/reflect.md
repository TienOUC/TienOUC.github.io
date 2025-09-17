---
autoGroup-2: TS进阶
title: TS进阶——Proxy & Reflect
date: 2022-10-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

## Reflect

与大多数全局对象不同 `Reflect` 并非一个构造函数，所以不能通过 `new` 运算符对其进行调用，或者将 `Reflect` 对象作为一个函数来调用，其所有属性和方法都是静态的（就像 `Math` 对象）。

`Reflect.get(target, property, receiver)`  
`Reflect.get` 方法查找并返回 `target` 对象的 `property` 属性，如果没有该属性返回 `undefined`

`Reflect.set(target, property, value, receiver)`  
`Reflect.set` 方法设置 `target` 对象的 `property` 属性等于 `value。`

```ts
const proxy = (object: any, key: any) => {
  return new Proxy(object, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      return Reflect.set(target, prop, value, receiver);
    }
  });
};

const logAccess = <T>(object: T, key: keyof T): T => {
  return proxy(object, key);
};

const obj = { name: 'xxx', age: 22 };
const man = logAccess(obj, 'name');
man.age = 30;
man.name = 'Wolverine';
console.log(man); // { name: 'Wolverine', age: 30 }
```
