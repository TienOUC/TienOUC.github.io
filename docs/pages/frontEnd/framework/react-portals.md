---
autoGroup-2: React
title: React Portals
date: 2021-07-29
categories:
  - FrontEnd
tags:
  - Framework
  - React
---

## 1. Portal

Portal 是一种将子节点渲染到存在于父组件之外的 DOM 节点的解决方案。

:::tip

ReactDOM.createPortal(child, container)

参数：

- `child`： 是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。
- `container`：是一个 DOM 元素。

:::

## 2. 示例

给 `<div id="app-root"></div>`节点内渲染一个 `div`，点击实现 `count` 自增。  
给兄弟节点`<div id="modal-root"></div>`内渲染一个 `button`，也能够点击实现 `count` 自增。

```html
<!-- 引入script文件 -->
<head>
  <script
    src="https://unpkg.com/react@16/umd/react.development.js"
    crossorigin
  ></script>
  <script
    src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    crossorigin
  ></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>

<body>
  <div id="app-root"></div>
  <div id="modal-root"></div>
</body>
```

```js
<script type="text/babel">
const appRoot = document.getElementById('app-root')
const modalRoot = document.getElementById('modal-root')

// =========Modal 组件===========
class Modal extends React.Component {
  el = document.createElement('div')

// 2. Modal组件挂载时，将this.el插入到modalRoot，即`#modal-root`内部
  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }
//1. 使用ReactDOM.createPortal实现
//这里的第一个参数this.props.children就是Button
  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

// =========Button组件===========
class Button extends React.Component {
  render() {
    return <button>Add Button</button>
  }
}

// =========App组件===========
class App extends React.Component {
  state = { count: 0 }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 })
  }
// 3. Modal+Button的React元素树渲染到App元素节点下
  render() {
    return (
      <div onClick={this.handleClick}>
        <p>count: {this.state.count}</p>
        <Modal>
          <Button />
        </Modal>
      </div>
    )
  }
}

//4. App元素树渲染到appRoot下，即`#app-root`节点
ReactDOM.render(<App />, appRoot)

// ReactDOM.render(<Button />, modalRoot)
</script>
```

<!-- ![](https://tva1.sinaimg.cn/large/008i3skNly1gsy48lmwhdg30su0hy4qp.gif) -->
<iframe src="https://tva1.sinaimg.cn/large/008i3skNly1gsy48lmwhdg30su0hy4qp.gif" 
frameborder="no" loading="lazy" height="646" width="100%"></iframe>

:::warning

真实 DOM 树结构却是 `button` 渲染在 `#app-root` 的兄弟节点 `#modal-root` 内，而不是 `#app-root` 内，两种树结构是不一样的。在 `#app-root` 里的 `App` 组件能够捕获到从兄弟节点 `#modal-root` 内的 `button` 冒泡上来的事件。

原因就是 React 元素树的结构是（父 -> 子） `App => Modal => Button`，冒泡依照元素树层级关系传递。
:::

## 3. Portal 使用场景

需要子组件能够在视觉上 **跳出** 其容器。例如，对话框、悬浮卡以及提示框。

## 4. 拓展

- 1. React 插槽和 Vue 插槽的区别

Vue 中通过 slot 给传递模版给组件，然后渲染。虽然 React 中没有 slot 的概念，但 React 中 JSX 和 DOM 都会被传入 props.children，类似于 Vue 的普通插槽实现。

上例中的 Modal 则可以实现类似 Vue 的具名插槽，例如：

```js
<Model>
  {{
    Header: <div>header slot</div>,
    Footer: <div>footer slot</div>,
  }}
</Model>
```

- 2. React 事件冒泡

按照 React 元素树冒泡 ( 参照上文的例子 )
