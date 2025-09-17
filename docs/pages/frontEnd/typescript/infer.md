---
autoGroup-2: TS进阶
title: TS进阶——infer
date: 2022-10-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

## 1. infer

定义一个类型,如果是数组类型,就返回数组元素的类型,否则就传入什么类型就返回什么类型。

```ts
type Type<T> = T extends Array<any> ? T[number] : T;

type A = Type<(string | number)[]>;
type B = Type<boolean>;
```

`infer` 可以简化上述写法

```ts
type Type<T> = T extends Array<infer U> ? U : T;

type A = Type<(string | number)[]>;
type B = Type<boolean>;
```

## 2. infer 妙用

### 2.1 提取第一个元素

```ts
type Arr = ['a', 'b', 'c'];
type First<T extends any[]> = T extends [infer first, ...any[]] ? first : [];

type FirstItem = First<Arr>;
```

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202301272300869.png)

### 2.2 提取最后一个元素

```ts
type Arr = ['a', 'b', 'c'];
type Last<T extends any[]> = T extends [...any[], infer last] ? last : [];

type LastItem = Last<Arr>;
```

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202301272303327.png)

### 2.3 删除最后一个元素

```ts
type Arr = ['a', 'b', 'c'];
type Pop<T extends any[]> = T extends [...(infer Rest), unknown] ? Rest : [];

type PopItem = Pop<Arr>;
```

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202301272305930.png)

### 2.4 删除第一个元素

```ts
type Arr = ['a', 'b', 'c'];
type Shift<T extends any[]> = T extends [unknown, ...(infer Rest)] ? Rest : [];

type ShiftItem = Shift<Arr>;
```

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202301272306055.png)

### 2.5 递归

翻转数组

```ts
type Arr = [1, 2, 3, 4];
type RevertArr<T extends any[]> = T extends [infer first, ...(infer rest)]
  ? [...RevertArr<rest>, first]
  : T;

type RArr = RevertArr<Arr>;
```

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202301272315431.png)
