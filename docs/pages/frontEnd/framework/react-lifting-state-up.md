---
autoGroup-2: React
title: React状态提升
date: 2021-07-24
categories:
  - FrontEnd
tags:
  - Framework
  - React
---

## 1. Lifting State Up

React 数据流是通过 `props` 自上而下地单向传递，当多个组件需要反应相同的数据变化时，因为 React 中组件只能维护自身的 `state` ，不能修改其他组件的 `state` ，所以把共享状态提升到这些组件最近的共同父组件中即可实现多组件共享相同的 `state`。

## 2. 示例

```js
import React from 'react'

//=============子组件--添加数据=============
const AddMsg = class extends React.Component {
  handleAdd() {
    this.props.addCount(1)
  }

  render() {
    return (
      <div>
        <span>添加 {this.props.number} 条信息</span>
        <button onClick={this.handleAdd.bind(this)}>Add message</button>
      </div>
    )
  }
}

//=============子组件--删除数据=============
const DelMsg = class extends React.Component {
  handelDel() {
    this.props.delCount(1)
  }

  render() {
    return (
      <div>
        <span>删除 {this.props.number} 条信息</span>
        <button onClick={this.handelDel.bind(this)}>Del message</button>
      </div>
    )
  }
}

// =============父组件--显示总消息数=============
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { number: 0 }
  }

  addNum(count) {
    this.setState(function(preNumber) {
      return { number: preNumber.number + count }
    })
  }

  delNum(count) {
    this.setState(function(preNumber) {
      return { number: preNumber.number - count }
    })
  }
  // 父组件通过props将state和方法（addNum & delNum）传递给子组件
  // 子组件通过属性（addCount & delCount）接收父组件的（addNum & delNum）方法
  // 并调用，即可实现修改父组件的state（父组件方法中通过 this.setState() 实现修改 state）
  render() {
    return (
      <div>
        <h3>消息总数：{this.state.number}</h3>
        <AddMsg number={this.state.number} addCount={this.addNum.bind(this)} />
        <br />
        <DelMsg number={this.state.number} delCount={this.delNum.bind(this)} />
      </div>
    )
  }
}

export default Counter
```

## 3. 结合了函数式组件和箭头函数的简写形式

```js
import React from 'react'

function AddMsg(props) {
  return (
    <div>
      <span>添加 {props.number} 条消息</span>
      <button
        onClick={() => {
          props.addCount(1)
        }}
      >
        Add Msg
      </button>
    </div>
  )
}

function DelMsg(props) {
  return (
    <div>
      <span>删除 {props.number} 条消息</span>
      <button
        onClick={() => {
          props.delCount(1)
        }}
      >
        Del Msg
      </button>
    </div>
  )
}

class Count extends React.Component {
  constructor(props) {
    super(props)
    this.state = { number: 0 }
  }

  // add msg
  addNum = (count) => {
    this.setState((preNumber) => {
      return { number: preNumber.number + count }
    })
  }
  //delete msg
  delNum = (count) => {
    this.setState((preNumber) => {
      return { number: preNumber.number - count }
    })
  }

  render() {
    const num = this.state.number
    return (
      <div>
        <h3>消息总数：{num}</h3>
        <AddMsg number={num} addCount={this.addNum} />
        <br />
        <DelMsg number={num} delCount={this.delNum} />
      </div>
    )
  }
}

export default Count
```
