---
autoGroup-2: React
title: React绑定this的几种方式
date: 2021-07-25
categories:
  - FrontEnd
tags:
  - Framework
  - React
---

## 1. bind()

```js
export default class BindThis extends React.Component {
  state = { count: 0 }

  handleClick() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick.bind(this)}>Button</button>
      </div>
    )
  }
}
```

上面的写法也可写成这样，在 `constructor` 中初始化绑定 `this`

```js
// constructor初始化绑定this
export default class BindThis extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>Button</button>
      </div>
    )
  }
}
```

## 2. 箭头函数

箭头函数绑定当前父级作用域的 this 指向 ( 实例 )

```js
export default class BindThis extends React.Component {
  state = { count: 0 }

  handleClick() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.handleClick()}>Button</button>
      </div>
    )
  }
}
```

新语法

```js
// handleClick = () => {} 在实例上绑定方法
export default class BindThis extends React.Component {
  state = { count: 0 }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>Button</button>
      </div>
    )
  }
// }
```
