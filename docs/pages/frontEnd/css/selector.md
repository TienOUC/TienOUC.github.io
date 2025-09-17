---
title: CSS Selector
date: 2019-12-28
categories:
  - FrontEnd
tags:
  - CSS
---

id、 class、 tag-name 选择器略

## 1. 示例结构

```html
<body>
  <div class="main">
    <div>
      main下的第一层div
      <div></div>
    </div>
    <div>main下的第一层div</div>
    <p class="content"></p>
    <p>content后紧跟的第一个p</p>
    <div>main下的第一层div</div>
    <p>
      content后间隔的p
      <a href="https://www.baidu.com" title="baidu">Baidu</a>
      <a href="http://www.sina.com" title="sina">Sina</a>
      <a href="https://www.tencent.com" title="tencent">Tencent</a>
      <span>
        <a href="http://www.baidu.com" title="baidu">内嵌的a</a>
      </span>
    </p>
    <div><p>content后div中嵌套的p</p></div>
  </div>
</body>
```

```css
div,
p {
  height: 50px;
  background-color: #cd5c5c;
}

/* 选择.main下处于第一层级的所有div子元素 */
.main > div {
  background-color: gray;
}

/*选择.conten后紧跟的p元素（唯一）*/
.content + p {
  background-color: #3ea2d8;
}

/*选择.content后处于同一层级的所有p元素*/
.content ~ p {
  border-radius: 12px;
}

/* 选择所有title属性值为baidu的a元素 */
a[title='baidu'] {
  color: aqua;
}

/* 选择href属性值以https开头的所有a元素 */
a[href^='https'] {
  border: 1px solid black;
}

/* 选择href属性值以sina.com结尾的所有a元素 */
a[href$='sina.com'] {
  font-size: 2rem;
}

/* 选择href属性值中有关键字 tencent 的所有a元素 */
a[href*='tencent'] {
  border-radius: 24px;
}
```

效果：
![](https://tva1.sinaimg.cn/large/008i3skNly1gsizc4i1dwj30ti0hpgna.jpg)

## 2. 说明

- `>`

A > B 选择 A 下处于第一层级的所有 B 子元素

```css
/* 选择.main下处于第一层级的所有div子元素 */
.main > div {
  background-color: gray;
}
```

- `+`

A + B 选择 A 后紧跟的 B 元素（唯一）

```css
/*选择.conten后紧跟的p元素（唯一）*/
.content + p {
  background-color: #3ea2d8;
}
```

- `~`  
  A ~ B 选择 A 后处于同一层级的所有 B 元素

```css
/*选择.content后处于同一层级的所有p元素*/
.content ~ p {
  border-radius: 12px;
}
```

- attribute selector

```css
/* 选择所有title属性值为baidu的a元素 */
a[title='baidu'] {
  color: aqua;
}

/* 选择href属性值以https开头的所有a元素 */
a[href^='https'] {
  border: 1px solid black;
}

/* 选择href属性值以sina.com结尾的所有a元素 */
a[href$='sina.com'] {
  font-size: 2rem;
}

/* 选择href属性值中有关键字 tencent 的所有a元素 */
a[href*='tencent'] {
  border-radius: 24px;
}
```
