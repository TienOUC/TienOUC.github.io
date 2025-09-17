---
autoGroup-2: React
title: React生命周期
date: 2021-07-25
categories:
  - FrontEnd
tags:
  - Framework
  - React
---

## 1. 挂载

当组件实例被创建并插入 DOM 节点时，其生命周期调用顺序如下：

:::warning

1. constructor()
2. static getDerivedStateFromProps()
3. render()
4. componentDidMount()

:::

## 2. 更新

当组件的 state 或者 props 变化时会触发更新，此时生命周期调用顺序如下：

:::warning

1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()

:::

## 3. 卸载

当组件从 DOM 中移除时会调用如下方法：

:::warning

1. componentWillUnmount()

:::

## 4. 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

:::warning

1. static getDerivedStateFromError()
2. componentDidCatch()

:::

常用周期函数

![常用周期函数](https://tva1.sinaimg.cn/large/008i3skNly1gsx2qx3vhdj60v40bbjsm02.jpg)

包含不常用周期函数

![包含不常用周期函数](https://tva1.sinaimg.cn/large/008i3skNly1gsx2qulx6wj30v40ha768.jpg)
