---
autoGroup-2: React
title: React高阶组件（HOC）
date: 2021-07-25
categories:
  - FrontEnd
tags:
  - Framework
  - React
---

## 1. 概念

`HOC ( Higher Order Component )` 是用于复用组件逻辑的一种高级技巧。  
高阶组件本质是一个参数为组件，返回值为新组件的函数。

## 2. 示例

以示例说明，下面有两个显示当前视窗宽高的组件 `Sub` `Foo` ，其数据逻辑部分代码一样，只有 `render` 渲染的 `DOM` 部分有区别（一个是 `<p>` ，另一个是 `<button>`）。

```js
import React from 'react'

let Sub = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xPos: document.documentElement.clientWidth,
      yPos: document.documentElement.clientHeight,
    }
  }
  getPos = () => {
    this.setState({
      xPos: document.documentElement.clientWidth,
      yPos: document.documentElement.clientHeight,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.getPos)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getPos)
  }

  render() {
    return (
      <div>
        <h3>Sub Component</h3>
        <p>
          x: {this.state.xPos}, y: {this.state.yPos}
        </p>
      </div>
    )
  }
}

let Foo = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xPos: document.documentElement.clientWidth,
      yPos: document.documentElement.clientHeight,
    }
  }

  getPos = () => {
    this.setState({
      xPos: document.documentElement.clientWidth,
      yPos: document.documentElement.clientHeight,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.getPos)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getPos)
  }

  render() {
    return (
      <div>
        <h3>Foo Component</h3>
        <button>
          x: {this.state.xPos}, y: {this.state.yPos}
        </button>
      </div>
    )
  }
}

class Hoc extends React.Component {
  render() {
    return (
      <div>
        <Sub />
        <Foo />
      </div>
    )
  }
}

export default Hoc
```

<!-- ![](https://tva1.sinaimg.cn/large/008i3skNly1gsvs9ksrt4g30t60dwb2a.gif) -->

<iframe src="https://tva1.sinaimg.cn/large/008i3skNly1gsvs9ksrt4g30t60dwb2a.gif" 
frameborder="no" loading="lazy" height="500" width="100%"></iframe>

可以看到 `Sub` `Foo` 这两个组件的逻辑部分代码一样，那能不能复用呢？答案是能，这就是接下来引出的`高阶组件 HOC`。

```js
import React from 'react'
// 声明一个高阶组件（函数），将上述 Sub和Foo组件相同的逻辑代码抽离到该高阶组件内
const higherOrderComponent = (Component) => {
  return class Container extends React.Component {
    state = {
      xPos: document.documentElement.clientWidth,
      yPos: document.documentElement.clientHeight,
    }

    getPos = () => {
      this.setState({
        xPos: document.documentElement.clientWidth,
        yPos: document.documentElement.clientHeight,
      })
    }

    componentDidMount() {
      window.addEventListener('resize', this.getPos)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.getPos)
    }
    // 使用ES6 扩展语法将state传递给下面render中返回的的Component（这里是Sub和Foo组件，也就是入参）
    render() {
      return <Component {...this.state} />
    }
  }
}

// Sub 和 Foo 组件通过 props 接收 state
let Sub = class extends React.Component {
  render() {
    return (
      <div>
        <h3>Sub Component</h3>
        <p>
          x: {this.props.xPos}, y: {this.props.yPos}
        </p>
      </div>
    )
  }
}

let Foo = class extends React.Component {
  render() {
    return (
      <div>
        <h3>Foo Component</h3>
        <button>
          x: {this.props.xPos}, y: {this.props.yPos}
        </button>
      </div>
    )
  }
}

//执行高阶组件（相当于将数据逻辑注入了入参组件，其实这里是给入参组件包了一层容器组件 Container，即高阶组件内返回的 Container 组件）
const HocSub = higherOrderComponent(Sub)
const HocFoo = higherOrderComponent(Foo)

class Hoc extends React.Component {
  render() {
    // 引入高阶组件返回的新组件
    return (
      <div>
        <HocSub />
        <HocFoo />
      </div>
    )
  }
}

export default Hoc
```

<!-- ![](https://tva1.sinaimg.cn/large/008i3skNly1gsvt2nuwl6g30t60dwe82.gif) -->

<iframe src="https://tva1.sinaimg.cn/large/008i3skNly1gsvt2nuwl6g30t60dwe82.gif" 
frameborder="no" loading="lazy" height="500" width="100%"></iframe>
