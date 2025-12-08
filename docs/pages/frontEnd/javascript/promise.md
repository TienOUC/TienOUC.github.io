---
autoGroup-5: 其他
title: Promise实现
date: 2022-03-02
categories:
  - FrontEnd
tags:
  - JavaScript
---

实现 Promise 核心代码：

- 构造器
- then 方法

# 构造器实现

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  #state = PENDING
  #result = undefined

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data)
    }

    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }

    #changeState(state, result){
      if(this.#state !== PENDING) return

        this.#state = state
        this.#result = result
    }

    try{
      executor(resolve, reject)
    } catch(err){
      reject(err)
    }
  }
}
```

# then 方法实现

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/20251125170808329.png)

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #state = PENDING
  #result = undefined
  #handlers = []

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data)
    }

    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }

    #changeState(state, result){
      if (this.#state !== PENDING) return

      this.#state = state
      this.#result = result
      this.#run()
    }

    #runOne(cb, resolve, reject){
      this.#runMicroTask(() => {
      if (typeof cb !== 'function') {
        const settled = this.#state === FULFILLED ? resolve : reject
        settled(this.#result)
        return
      }
      try {
        const data = cb(this.#result)
        if (this.#isPromise(data)) {
          data.then(resolve, reject)
        } else {
          resolve(data)
        }
       }
      catch (err) {
        reject(err)
       }
      })
     }

    #isPromise(value){
      if (typeof value !== null && (typeof value === 'object' || typeof value === 'function')) {
        return typeof value.then === 'function'
      }
      return false
    }

    #runMicroTask(func){
      // node环境
      if (typeof process === 'object' && typeof process.nextTick === 'function') {
        process.nextTick(func);
      }
      // 浏览器环境
      else if (typeof MutationObserver === 'function') {
        const ob = new MutationObserver(func);
        const textNode = document.createTextNode('1');
        ob.observe(textNode, {
          characterData: true
        });
        textNode.data = '2';
      } else {
        setTimeout(func, 0)
      }

    }

    #run(){
      if (this.#state === PENDING) return
      while (this.#handlers.length) {
        const {onFulfilled, onRejected, resolve ,reject} = this.#handlers.shift()
        if (this.#state === FULFILLED) {
          this.#runOne(onFulfilled, resolve, reject)
        }else {
          this.#runOne(onRejected, resolve, reject)
        }
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
     }

    then(onFulfilled, onRejected){
      return new MyPromise((resolve, reject) => {
        this.#handlers.push({
          onFulfilled,
          onRejected,
          resolve,
          reject
        })
        this.#run()
      })
    }
  }
}
```
