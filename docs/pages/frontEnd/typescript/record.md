---
autoGroup-2: TS进阶
title: TS进阶——Record & Readonly
date: 2022-10-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

## 1. Record

先看源码

```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

`keyof any` 相当于联合类型 `string | number | symbol`, Record 既约束了 key，也约束了 value

示例：

```ts
type Person = {
  name: string;
  age: number;
  text: string;
};

type key = 'string | number';
type p = Record<key, Person>;
```

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202301271839750.png)

## 2. Readonly

`Readonly` 和 `Partial` 类似，只不过是把所有属性设置为只读。

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202301271826748.png)

```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```
