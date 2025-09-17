---
autoGroup-2: 主流布局方式
title: Flex
date: 2019-12-01
categories: 
- FrontEnd
tags:
- CSS
---

## 1. Flex 三大要素

轴向、对齐、弹性

### 1.1 轴向

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk6h63hbe2j30m80bymyy.jpg)   
   
元素横向沿着主轴方向依次排列，换行时沿着交叉轴的方向依次排列

- `flex-direction` 修改主轴方向
  > 1. row
  > 2. row-reverse
  > 3. column
  > 4. column-reverse

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk6gwnjfapj30m80cr40i.jpg)

- `flex-wrap` 修改交叉轴方向
  > 1. wrap
  > 2. wrap-reverse

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk6h2kwyuqj30m809a0u4.jpg)
::: tip Tip:
主轴和交叉轴共 8 种组合  
:::

### 1.2 对齐

- `justify-content` 主轴对齐方式

> 1. flex-start 左对齐
> 2. flex-end 右对齐
> 3. center 居中对齐
> 4. space-between 两端对齐
> 5. space-around 分散对齐
> 6. space-evenly 间距相等

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk6hhnq0okg30m809xn26.gif)

- `align-items` 交叉轴对齐方式（单行）
  > 1. flex-start
  > 2. flex-end
  > 3. center
  > 4. stretch
  > 5. baseline

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk6hv86a9og30m809g43c.gif)

- `align-content` 交叉轴对齐方式（多行相对于容器对齐）
  > 1. flex-start
  > 2. flex-end
  > 3. center
  > 4. stretch
  > 5. space-between
  > 6. space-around

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk6hyrmdtqg30m80acgx6.gif)

:::tip Tip
结合使用，可以让元素整体在容器的交叉轴上居中，又让子元素在其所在行的交叉轴上居中
:::

### 1.3 弹性

- `flex-grow`
  > 1. 0 (默认值，表示不放大）
  > 2. 0 ~ 1 取值，表示该元素会挤占剩余空间的 x 倍，详见下图（ `flex: 1;` === `flex: 1 1 auto;` 是三个属性的简写，分别对应 `flex: grow（1） shrink（1，可选） basis(auto，可选)` ）

![flex-grow](https://tva1.sinaimg.cn/large/0081Kckwly1gk6kawp4vvg30m80ft7n6.gif)
:::details 点击查看代码

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  header,
  footer {
    width: 100%;
    height: 80px;
    background-color: #7fffd4;
  }
  .container {
    width: 800px;
    background-color: #fff8dc;
    margin: 0 auto;
    display: flex;
  }
  .left,
  .center,
  .right {
    height: calc(100vh - 160px);
  }
  .left {
    width: 200px;
    background-color: #a3e264;
    /* flex-shrink: 0; */
  }
  .center {
    flex: 1;
    /* flex-basis: 400px; */
    /* min-width: 200px; */
    background-color: #d2691e;
  }
  .right {
    width: 200px;
    background-color: #6495ed;
    /* flex-shrink: 0; */
  }
</style>
<body>
  <header>header</header>
  <div class="container">
    <div class="left">left</div>
    <div class="center">center</div>
    <div class="right">right</div>
  </div>
  <footer>footer</footer>
</body>
```

:::

- `flex-shrink`

  > 1. 1 (默认值，表示缩小）
  > 2. 0 ~ 1 取值，表示项目在空间不足时等比缩小 x 倍

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk6l80itwig30m80egajs.gif)
:::details 点击查看代码
```html
<style>
    * {
      margin: 0;
      padding: 0;
    }
    header,
    footer {
      width: 100%;
      height: 80px;
      background-color: #7fffd4;
    }
    .container {
      width: 450px;
      padding: 30px;
      background-color: #fff8dc;
      margin: 0 auto;
      display: flex;
    }
    .left,
    .center,
    .right {
      height: calc(100vh - 160px);
    }
    .left {
      width: 200px;
      background-color: #a3e264;
      flex-shrink: 0;
    }
    .center {
      flex: 1 1 400px;
      background-color: #d2691e;
    }
    .right {
      width: 200px;
      background-color: #6495ed;
      flex-shrink: 0;
    }
  </style>
  <body>
    <header>header</header>
    <div class="container">
      <div class="left">left</div>
      <div class="center">center</div>
      <div class="right">right</div>
    </div>
    <footer>footer</footer>
  </body>
```
:::

- `flex-basis`

> 1. auto（默认） -- 初始宽度为元素内容的大小或者设置的宽度值
> 2. px 值 -- 初始宽度为 flex-basis 的值
> 3. 百分比 -- 初始宽度为占父容器的比例
> 4. 0 / 0% -- 初始宽度为 0

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk6ih6x89vj30m80d2400.jpg)

设置项目宽度，其与 `width` 同时存在时，权重高于 `width` ，但最终计算但尺寸会受限于 `min-width / max-width`
  
**举例：**

```css
.a {
  flex-basis: 100px;
  min-width: 200px;
}
/* 虽然a元素的初始宽度由 felx-basis 决定是100px， 
    但最终展示宽度是 200px */
```
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gpg53w19nkj31p90u0aew.jpg)
