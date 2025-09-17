---
autoGroup-2: TS进阶
title: TS进阶——Partial & Pick
date: 2022-10-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

## 1. Partial

什么是 `Partial` ?先看示例

```ts
type Person = {
  name: string;
  age: number;
  text: string;
};

type p = Partial<Person>;
```

此时 p 类型如下:

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202301271803904.png)

`Partial` 源码

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

> 1. `keyof T` 相当于联合类型 `'name' | 'age' | 'text'`
> 2. `in` 遍历上述联合类型，然后将所有属性设置为可选

**总结：** `Partial` 就是传入一个类型 T，基于传入类型 T 的所有属性生成一个全部属性都可选的新类型定义。

## 2. Pick

什么是 `Pick` ? 先看示例

```ts
type Person = {
  name: string;
  age: number;
  text: string;
};

type p = Pick<Person, 'name' | 'age'>;
```

此时 p 类型如下:

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202301271813727.png)

`Pick` 源码

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

> 1. `Pick` 接受连个参数，`目标对象 target` 和要`筛选的属性 key`
> 2. 源码中的 `K` 继承自 `keyof T`（target 对象的属性联合类型）

**总结：** `Pick` 就是从类型定义 T 的属性中，选取指定一组属性，返回一个新的类型定义。
