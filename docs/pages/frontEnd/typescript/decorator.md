---
autoGroup-1: TS基础概念和用法
title: 装饰器(Decorator)
date: 2021-05-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

:::warning
**实验属性** —— `tsconfig.json` 文件中需要设置 `"experimentalDecorators": true`
:::

## 1. 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。

```ts
// 定义一个类装饰器函数 他会把ClassA的构造函数传入你的watcher函数当做第一个参数
const watcher: ClassDecorator = (target: Function) => {
  target.prototype.getParams = <T>(params: T): T => {
    return params;
  };
};

// 使用的时候 直接通过@函数名使用
@watcher
class A {
  constructor() {}
}

const a = new A();
console.log((a as any).getParams('123')); // 123;
```

## 2. 装饰器工厂

其实也就是一个高阶函数,外层的函数接受值,里层的函数最终接受类的构造函数

```ts
const watcher = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getParams = <T>(params: T): T => {
      return params;
    };
    target.prototype.getOptions = (): string => {
      return name;
    };
  };
};

@watcher('name')
class A {
  constructor() {}
}

const a = new A();
console.log((a as any).getParams('123'));
```

## 3. 装饰器组合

```ts
const watcher = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getParams = <T>(params: T): T => {
      return params;
    };
    target.prototype.getOptions = (): string => {
      return name;
    };
  };
};
const watcher2 = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getNames = (): string => {
      return name;
    };
  };
};

@watcher2('name2')
@watcher('name')
class A {
  constructor() {}
}

const a = new A();
console.log((a as any).getOptions());
console.log((a as any).getNames());
```

## 4. 方法装饰器

返回三个参数

> 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
> 2. 成员的名字。
> 3. 成员的属性描述符。

```ts
[
  {},
  'setParasm',
  {
    value: [Function: setParasm],
    writable: true,
    enumerable: false,
    configurable: true
  }
]
```

```ts
const met: MethodDecorator = (...args) => {
  console.log(args);
};

class A {
  constructor() {}
  @met
  getName(): string {
    return 'xxx';
  }
}

const a = new A();
```

## 5. 属性装饰器

返回两个参数

> 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
> 2. 属性的名字。

```ts
const met: PropertyDecorator = (...args) => {
  console.log(args);
};

class A {
  @met
  name: string;
  constructor() {}
}

const a = new A();
```

## 6. 参数装饰器

返回三个参数

> 1. `对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
> 2. `成员的名字。
> 3. `参数在函数参数列表中的索引。

```ts
const met: ParameterDecorator = (...args) => {
  console.log(args);
};

class A {
  constructor() {}
  setParasm(@met name: string = '213') {}
}

const a = new A();
```
