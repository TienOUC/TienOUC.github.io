---
title: 设计模式——Observer
date: 2022-01-01
categories:
  - FrontEnd
tags:
  - DesignPattern
---

## 1. 什么是观察者模式

观察者模式是一种行为型模式，定义了对象间的一种  `一对多` 的依赖关系，当被观察者对象（Subject）的状态发生改变的时候，所有依赖它的对象（观察者 Observer）都会得到通知，并自动更新。

```js
class Subject{
  constructor(){
    this.Observers = []
  }
  add(observer){
    this.Observers.push(observer)
  }
  remove(observer) { 
    this.Observers = this.Observers.filter(item => item !== observer)
  }
  notify() { 
    this.Observers.forEach(item => item.update())
  }
}

class Observer { 
  constructor(name) { 
    this.name = name 
  }
  update() { 
    console.log(`name: ${this.name}`)
  }
}

const subject = new Subject()
const observer1 = new Observer('observer1')
const observer2 = new Observer('observer2')

subject.add(observer1)
subject.add(observer2)
subject.notify()
// name: observer1
// name: observer2

subject.remove(observer1)
subject.notify() // name: observer2
```
