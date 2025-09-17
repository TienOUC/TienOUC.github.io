---
autoGroup-1: TS基础概念和用法
title: 类
date: 2021-05-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

```ts
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  sayHi() {
    return `Hi, my name is ${this.name}`
  }
}

var Jothy = new Person('Jothy')
console.log(Jothy.sayHi())
```

编译后

```js
'use strict'
var Person = /** @class */ (function() {
  function Person(name) {
    this.name = name
  }
  Person.prototype.sayHi = function() {
    return 'Hi, my name is ' + this.name
  }
  return Person
})()
var Jothy = new Person('Jothy')
console.log(Jothy.sayHi())
```
