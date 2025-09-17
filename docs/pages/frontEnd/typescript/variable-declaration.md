---
autoGroup-1: TS基础概念和用法
title: 数组｜元组类型变量声明
date: 2021-05-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

## 1. 数组

### 1.1 数组元素类型一致

- `Array<类型>`

```ts
// 需求: 要求定义一个数组, 这个数组中将来只能存储数值类型的数据
let arr: Array<number>; // 表示定义了一个名称叫做arr的数组, 这个数组中将来只能够存储数值类型的数据
arr = [1, 3, 5];
// arr1 = ['a', 3, 5]; // 报错
console.log(arr);
```

- `类型[]`

```ts
// 需求: 要求定义一个数组, 这个数组中将来只能存储字符串类型的数据
let arr: string[]; // 表示定义了一个名称叫做arr的数组, 这个数组中将来只能够存储字符串类型的数据
arr = ['a', 'b', 'c'];
// arr = [1, 'b', 'c']; // 报错
console.log(arr);
```

### 1.2 数组元素类型不一致

- 联合类型声明数组 `(类型 1 | 类型 2)[]`

```ts
let arr: (number | string)[];
// 表示定义了一个名称叫做arr的数组, 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
arr = [1, 'b', 2, 'c'];
// arr3 = [1, 'b', 2, 'c', false]; // 报错
console.log(arr);
```

- 任意类型元素的数组 `any[]`

```ts
let arr: any[]; // 表示定义了一个名称叫做arr的数组, 这个数组中将来可以存储任意类型的数据
arr = [1, 'b', false];
console.log(arr);
```

### 1.3 严格限制类型和长度

- 元组类型 [string, number, boolean]

`TS中的元组类型其实就是数组类型的扩展,元组用于保存定长定数据类型的数据`

```ts
let arr: [string, number, boolean];

// 表示定义了一个名称叫做arr的元组, 这个元组中将来可以存储3个元素, 第一个元素必须是字符串类型, 第二个元素必须是数字类型, 第三个元素必须是布尔类型

arr = ['a', 1, true];
// arr = ['a', 1, true, false]; // 超过指定的长度会报错
arr = ['a', 1, true];
console.log(arr);
```
