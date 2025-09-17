---
autoGroup-2: React
title: React Context
date: 2021-07-25
categories:
  - FrontEnd
tags:
  - Framework
  - React
---

```js
//ThemeTest.js 组件
import React from 'react'

const ThemeButton = class extends React.Component {
  render() {
    return <button theme={this.props.theme}>BUTTON</button>
  }
}

function ToolBar(props) {
  return (
    <div>
      <ThemeButton theme={props.theme} />
    </div>
  )
}

class ThemeTest extends React.Component {
  render() {
    return (
      <div>
        <ToolBar theme={this.props.theme} />
      </div>
    )
  }
}

export default ThemeTest
```

```js
import './App.css'
import ThemeTest from './ThemeTest'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeTest theme="dark" />
      </header>
    </div>
  )
}

export default App
```

<!-- ![](https://tva1.sinaimg.cn/large/008i3skNly1gsvj85azqjg30sw0dwdoz.gif) -->
<iframe src="https://tva1.sinaimg.cn/large/008i3skNly1gsvj85azqjg30sw0dwdoz.gif" 
frameborder="no" loading="lazy" height="500" width="100%"></iframe>

`App` 组件引入 `ThemeTest` 组件，并传入 `theme="dark"` 属性，目的是改变 `ThemeButton` 组件的 `theme` 属性。此时利用 `props` 向下传递，会依次经过 `ThemeTest` => `ToolBar` => `ThemeButton`，`theme` 属性对于中间的 `ToolBar` 组件来说没有什么用，但是由于承担传递任务，它上面就会堆积这些 `props`，当需要传递的属性越来越多的时候，对于 `ToolBar` 这样的中间组件来说这些 `props` 使得其可维护性变差，也就是 `props drilling`。

:::tip
这时就可以使用 `Context`，可以避免通过中间组件元素传递 `props`。`Context` 的设计目的是为了共享对于一个组件树来说是 `全局` 的属性，例如当前认证的用户、主题或首选语言等。
:::

```js
import React from 'react'
//创建一个默认的ThemeContext
const ThemeContext = React.createContext('light')

const ThemeButton = class extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext
  render() {
    return <button theme={this.context}>BUTTON</button>
  }
}

//作为中间组件，没有再用props来传递theme
function ToolBar() {
  return (
    <div>
      <ThemeButton />
    </div>
  )
}

class ThemeTest extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <div>
        <ThemeContext.Provider value="dark">
          <ToolBar />
        </ThemeContext.Provider>
      </div>
    )
  }
}

export default ThemeTest
```

<!-- ![](https://tva1.sinaimg.cn/large/008i3skNly1gsvjsa4uncg30sw0dwh4e.gif) -->
<iframe src="https://tva1.sinaimg.cn/large/008i3skNly1gsvjsa4uncg30sw0dwh4e.gif" 
frameborder="no" loading="lazy" height="500" width="100%"></iframe>

可以看到上图中，中间组件 `ToolBar` 上没有 `props` 来传递 `theme`

:::warning
**⚠️ 注意：**

**1. Context 主要应用场景在于很多 `不同层级` 的组件需要访问一些同样的数据。需谨慎使用，因为这会使得组件的复用性变差。**

**2. 如果只是想避免层层传递一些属性，`组件组合（component composition）`有时候是一个比 `context` 更好的解决方案。**
:::
