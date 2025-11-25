---
title: 设计模式——Pub/Sub
date: 2021-12-21
categories:
  - FrontEnd
tags:
  - DesignPattern
---

## 1. 简述

### 1.1 什么是发布订阅模式

基于一个事件（主题）通道，希望接收通知的对象 Subscriber 通过自定义事件订阅主题，被激活事件的对象 Publisher 通过发布主题事件的方式通知各个订阅该主题的 Subscriber 对象。

### 1.2 为什么需要发布订阅模式

发布订阅模式可以解耦发布者和订阅者，使得两者之间的依赖关系降低，降低了代码的耦合度，便于代码的维护和扩展。

### 1.3 适用场景

- 1. 异步编程
- 2. 跨模块通信
- 3. 事件总线

### 1.4 优缺点

- **优点：** 解耦，发布者和订阅者之间的依赖关系降低，便于代码的维护和扩展。
- **缺点：** 可能会导致内存泄漏，因为订阅者可能会一直存在于内存中，除非手动取消订阅。

### 1.5 JS 中实现发布订阅模式

```js
class EventEmitter {
  constructor() {
    // 存储事件和订阅者的映射关系
    // 结构：{eventName: {cb1, cb2, ...}}
    this.events = {};
  }

  // 订阅
  subscribe(eventName, cb) {
    // 若没有事件，则初始化空数组
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    // 将回调函数push进订阅者列表中
    this.events[eventName].push(cb);
  }

  // 发布
  publish(eventName, ...args) {
    // 若事件不存在 或 没有订阅者，则直接返回
    if (!this.events[eventName] || this.events[eventName].length === 0) {
      return;
    }
    // 遍历所有订阅者 ，执行其回调函数
    this.events[eventName].forEach((callback) => callback.apply(this, args));
  }

  //  取消订阅
  unsubscribe(eventName, cb) {
    // 若事件不存在，则直接返回
    if (!this.events[eventName]) return;
    // 查找事件，并移除订阅者的回调函数
    const index = this.events[eventName].indexOf(cb);
    if (index !== -1) {
      this.events[eventName].splice(index, 1);
      // 若事件已经没有订阅者，则删除该事件（节省空间）
      if (this.events[eventName].length === 0) {
        delete this.events[eventName];
      }
    }
  }
}
```
