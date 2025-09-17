---
autoGroup-1: Vue
title: Vue响应式原理及2.x和3.x的区别
date: 2020-11-01
categories: 
- FrontEnd
tags:
- Framework
- Vue
---

### 1. Vue 响应原理
- Observe：遍历data中的属性，使用Object.defineProperty()的get/set进行劫持。
- Dep: 每个属性拥有自己的消息订阅器dep，用于存放所有订阅了该属性的对象。
- Watcher： 通过对dep实现响应式属性监听，监听到变动时，触发回调。


### 2. 2.x

### 3. 3.x


