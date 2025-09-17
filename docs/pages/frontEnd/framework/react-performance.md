---
autoGroup-2: React
title: React性能优化
date: 2021-07-31
categories:
  - FrontEnd
tags:
  - Framework
  - React
---

## 1. 组件依赖项没有发生变化时，阻止执行组件的 render 方法

父组件传给子组件的属性值没有发生变化时，`React` 内部虽然已经做了将子组件复用的性能优化，但是依然执行了子组件的 `render` 方法，本示例就是探究在上述前提下如何阻止子组件执行 `render`方法，以进一步优化性能。

**示例：**

```js
import React, { useState } from 'react'

class Foo extends React.Component {
  render() {
    console.log('Foo render')
    return (
      <div>
        <p>{this.props.count}</p>
      </div>
    )
  }
}

function Performance() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>父组件count：{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Add Count
      </button>
      <Foo count={1} />
    </div>
  )
}

export default Performance
```

**此时父组件 `Performance` 传给 子组件 `Foo` 的 `count` 是`常量 1`，但是刷新页面点击 button 时，`Foo` 的 `render` 依然会执行（ `console.log('Foo render')执行打印'Foo render'` ），使用 `PureComponent` 或者 `memo` 可以阻止执行 `render` （在其 `依赖项 count` 没有发生变化时），这可以进一步优化性能。**

- 1.  `Foo` 为 `class` 组件的时候，使用 `PureComponent`

```js
class Foo extends React.PureComponent {
  render() {
    console.log('Foo render')
    return (
      <div>
        <p>{this.props.count}</p>
      </div>
    )
  }
}
```

此时再刷新页面点击 button ，在 `Foo` 的依赖项 `count` 没有发生变化的时候，`Foo` 组件的 `render` 不会执行（即不会打印 `'Foo render'`）。

- 2.  `Foo` 为函数组件的时候，使用 `memo`

将上述 Foo 类组件改为如下函数组件

```js
const Foo = (props) => {
  console.log('Foo render')
  return (
    <div>
      <p>{props.count}</p>
    </div>
  )
}
```

刷新页面点击 button，依然会执行 `console.log('Foo render')`，即组件 `Foo` 执行了 `render` 方法。

使用 memo 将组件包裹一下

```js
const Foo = memo((props) => {
  console.log('Foo render')
  return (
    <div>
      <p>{props.count}</p>
    </div>
  )
})
```

此时刷新页面再点击 button，`Foo` 组件就不会执行 `render` 方法了，即控制台不会打印`console.log('Foo render')`。

## 2. 子组件按依赖项变化调用父组件方法

```js
import React, { useState, memo } from 'react'

const Foo = memo((props) => {
  console.log('Foo render')
  return (
    <div>
      <ul>{props.refresh()}</ul>
    </div>
  )
})

function Performance() {
  const [range, setRange] = useState({ min: 0, max: 1000 })
  const [count, setCount] = useState(0)

  const refresh = () => {
    let list = []
    console.log('refresh function')
    for (let i = 0; i < range.max; i++) {
      list.push(<li key={i}>{i}</li>)
    }
    return list
  }

  return (
    <div>
      <h1>父组件count：{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Add Count
      </button>
      <Foo refresh={refresh} />
    </div>
  )
}

export default Performance
```

这里子组件 `Foo` 用了 `memo` 包裹，但是依然每次会调用父组件的 `refresh` 方法，这里想优化 `refresh` 的调用次数，就需要在父组件中使用 `useCallback`，修改父组件的 `refresh` 方法，并指定依赖项。

```js
function Performance() {
  const [range, setRange] = useState({ min: 0, max: 10000 })
  const [count, setCount] = useState(0)

  // useCallback(function, [依赖项])
  // 这里依赖项是[range]，当range发生变化时，子组件再次调用refresh方法
  // 若果写成空数组[]，则refresh除初次挂载之外，永远不会被再次调用。
  const refresh = useCallback(() => {
    let list = []
    console.log('refresh function')
    for (let i = 0; i < range.max; i++) {
      list.push(<li key={i}>{i}</li>)
    }
    return list
  }, [range])

  return (
    <div>
      <h1>父组件count：{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Add Count
      </button>
      <Foo refresh={refresh} />
    </div>
  )
}
```
