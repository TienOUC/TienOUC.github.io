---
autoGroup-2: React
title: React Hooks
date: 2021-07-29
categories:
  - FrontEnd
tags:
  - Framework
  - React
---

`React v16.8` 的新特性，是一些可以在函数组件里 **钩入** `React state` 及 `生命周期` 等特性的 `函数`。使得开发者在不编写 `class` 的情况下使用 `state` 及其他特性。

**`Hook` 可以在无需修改组件结构的情况下复用状态逻辑。**

## 1. 使用规则

:::danger

- 不能在 `if` `switch` `for` 等条件分支中使用。
- 在函数组件最顶层调用。

:::

## 2. 常用 Hook

### 2.1 State Hook

`useState` 类似与 `calss` 组件的 `this.setState`

```js
import React, { useState } from 'react'

export default function Hooks() {
  //解构,useState() 返回 [count初始值，setCount函数]
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={handleClick}>Add count</button>
    </div>
  )
}
```

```js
import React, { useState } from 'react'

export default function Hooks() {
  const [count, setCount] = useState({ type: 'add', value: 0 })

  const handleClick = () => {
    setCount((preCount) =>
      preCount.type === 'add'
        ? { ...preCount, value: preCount.value + 1 }
        : preCount
    )
  }

  return (
    <div>
      <p>count: {count.value}</p>
      <button onClick={handleClick}>Add count</button>
    </div>
  )
}
```

### 2.2 Effect Hook

`useEffect` 就是一个 `Effect Hook`，给函数组件增加了操作副作用的能力。它跟 `class` 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

:::tip

**副作用:** 在 React 组件中执行数据获取、订阅或者手动修改 DOM 等操作（可以简单理解为函数与外部的交互）。

:::

```js
import React, { useEffect } from 'react'

export default function Hooks() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
    console.log(`setCount:${count}`)
  }

  useEffect(() => {
    document.title = `you click ${count} times.`
    console.log(`useEffect:${count}`)
  })

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={handleClick}>Add count</button>
    </div>
  )
}
```

### 2.3 Context Hook

::: warning

`useContext(ThemeContext)`相当于 `class` 组件中的 `static contextType = ThemeContext` 。

`useContext(ThemeContext)` 只是让你能够读取 `context` 的值以及**订阅** `context` 的变化。你仍然需要在上层组件树中使用 `<ThemeContext.Provider>` 来为下层组件提供 `context`。

:::

```js
import React, { useContext } from 'react'

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}

const ThemeContext = React.createContext(themes.light)

function Hooks() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  const theme = useContext(ThemeContext)
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  )
}
```
