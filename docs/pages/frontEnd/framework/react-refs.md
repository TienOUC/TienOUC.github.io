---
autoGroup-2: React
title: React Refs转发
date: 2021-07-25
categories:
  - FrontEnd
tags:
  - Framework
  - React
---

## 1. Refs

Refs 提供了一种方式，可以通过其访问 DOM 节点或在 render 方法中创建的 React 元素。  
典型的 React 数据流中， props 是父子组件交互的唯一方式，要修改子组件，就要通过新的 props 来重新渲染这个子组件，在某些情况下，需要在典型数据流之外来修改子组件（React 组件的实例或 DOM 节点），此时就可以通过 Refs 来修改。

- 何时使用
  > 1. 管理聚焦
  > 2. 触发强制动画
  > 3. 集成第三方 DOM 库......

:::tip
`refs` 在 `componentDidMount` 和 `componentDidUpdate` 之前更新
:::

## 2. 原生 DOM 节点 refs

### 2.1 示例一

点击文本，控制台打印出被点击的 DOM 节点（绑定了 ref）。

- class 组件

```js
import React from 'react'

class Refs extends React.Component {
  //1.使用 React.createRef()创建
  constructor(props) {
    super(props)
    this.myRefs = React.createRef()
  }
  //3.通过this.myRfes.current获取DOM
  handleClick() {
    const node = this.myRefs.current
    console.log(node) // 4.输出<div>Refs</div>这个原生DOM节点
  }
  //2.给DOM元素绑定ref={this.myRefs}
  render() {
    return (
      <div onClick={this.handleClick.bind(this)} ref={this.myRefs}>
        Refs
      </div>
    )
  }
}

export default Refs
```

- 函数组件

```js
import React from 'react'

function Refs() {
  const myRefs = React.createRef()
  const handleClick = () => {
    const node = myRefs.current
    console.log(node)
  }

  return (
    <div onClick={handleClick} ref={myRefs}>
      Refs
    </div>
  )
}

export default Refs
```

### 2.2 示例二

点击按钮聚焦 input 输入框。

- class 组件

```js
import React from 'react'

class CustomInput extends React.Component {
  constructor(props) {
    super(props)
    //React.createRef()创建focusInput
    this.focusInput = React.createRef()
  }
  // 聚焦绑定ref属性的原生DOM节点
  handleClick() {
    this.focusInput.current.focus()
  }

  render() {
    return (
      <div>
        <input ref={this.focusInput} />
        <br />
        <input
          type="button"
          onClick={this.handleClick.bind(this)}
          value="点击按钮聚焦上面的输入框"
        />
      </div>
    )
  }
}

export default CustomInput
```

- 函数组件

```js
import React from 'react'

function CustomInput() {
  const focusInput = React.createRef()
  const handleClick = () => {
    focusInput.current.focus()
  }

  return (
    <div>
      <input ref={focusInput} />
      <br />
      <input
        type="button"
        onClick={handleClick}
        value="点击按钮聚焦上面的输入框"
      />
    </div>
  )
}

export default CustomInput
```

## 3. 类组件添加 refs

`ContainerCustom` 组件中的 `this.customRef`指向 `CustomInput` 组件的实例，`ContainerCustom` 组件挂载时调用了 `CustomInput` 组件中的 `handleFocus` 方法，使得 `CustomInput` 中的 `input` 自动对焦。

```js
import React from 'react'

//子组件
const CustomInput = class extends React.Component {
  constructor(props) {
    super(props)
    //React.createRef()创建focusInput
    this.focusInput = React.createRef()
  }
  // 聚焦绑定ref属性的原生DOM节点
  handleFocus() {
    this.focusInput.current.focus()
  }

  render() {
    return (
      <div>
        <input ref={this.focusInput} />
        <br />
        <input type="button" value="input自动聚焦测试" />
      </div>
    )
  }
}

// 父组件
class ContainerCustom extends React.Component {
  constructor(props) {
    super()
    this.customRef = React.createRef()
  }

  componentDidMount() {
    console.log(this.customRef.current) // 打印 CustomInput 组件实例
    this.customRef.current.handleFocus()
  }

  render() {
    //下面的ref，即 this.customRef 指向的是类组件 CustomInput 的实例
    return (
      <div>
        <CustomInput ref={this.customRef} />
      </div>
    )
  }
}

export default ContainerCustom
```

:::warning
**若上述例子中将子组件 `CustomInput` 改成函数式组件，父组件 `ContainerCustom` 依然保持为 `class` 组件，此时，若想在函数式子组件 `CustomInput` 上添加 `ref`，则不会成功，因为函数式组件没有实例。**
:::

这种情况有其他的解决方案 `React.forwardRef()`。
