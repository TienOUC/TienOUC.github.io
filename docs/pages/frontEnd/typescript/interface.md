---
autoGroup-1: TS基础概念和用法
title: 接口
date: 2021-05-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

## 1. interface

接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

## 2. 定义接口

```ts
//定义接口
interface IPerson {
  firstName: string
  lastName: string
  sayHi: () => string
}
// 定义变量
var customer: IPerson = {
  firstName: 'Tom',
  lastName: 'Hanks',
  sayHi: (): string => {
    return 'Hi there'
  },
}

console.log(customer.sayHi())
```

编译成 js 后如下，可以看到接口并没有被编译成 js

```js
'use strict'
var customer = {
  firstName: 'Tom',
  lastName: 'Hanks',
  sayHi: function() {
    return 'Hi there'
  },
}
console.log(customer.sayHi()) //Hi there
```

- 联合类型接口

```ts
interface RunOptions {
  program: string
  commandline: string[] | string | (() => string)
}

// commandline 是字符串
var options: RunOptions = { program: 'test1', commandline: 'Hello' }
console.log(options.commandline)

// commandline 是字符串数组
options = { program: 'test1', commandline: ['Hi', 'TS'] }
console.log(options.commandline[0])
console.log(options.commandline[1])

// commandline 是一个函数表达式
options = {
  program: 'test1',
  commandline: () => {
    return '**Hello World**'
  },
}
```

编译后

```js
'use strict'
// commandline 是字符串
var options = { program: 'test1', commandline: 'Hello' }
console.log(options.commandline)
// commandline 是字符串数组
options = { program: 'test1', commandline: ['Hi', 'TS'] }
console.log(options.commandline[0])
console.log(options.commandline[1])
// commandline 是一个函数表达式
options = {
  program: 'test1',
  commandline: function() {
    return '**Hello World**'
  },
}
var fn = options.commandline
console.log(fn())
```

- 接口和数组

```ts
interface Namelist {
  [index: number]: string
}
```

- 接口继承
  `child_interface_name extends super_interface_name`

  多继承 `,` 隔开 `interface Child extends Parent1, Parent2 { }`

```ts
interface Person {
  age: number
}

interface Student extends Person {
  grade: string
}

var drummer = <Student>{
  age: 17,
  grade: 'senior',
}
//  drummer.age = 17
//  drummer.grade = "senior"
console.log('年龄:  ' + drummer.age)
console.log('年级:  ' + drummer.grade)
```
