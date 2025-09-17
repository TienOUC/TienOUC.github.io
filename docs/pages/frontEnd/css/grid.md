---
autoGroup-2: 主流布局方式
title: Grid
date: 2020-02-21
categories: 
- FrontEnd
tags:
- CSS
---

## 1. 基本概念
Grid 布局是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局，比Flex布局更加强大。采用网格布局的区域，称为"容器"（container），容器内部采用网格定位的子元素，称为"项目"（item）。
## 2. 容器属性
### 2.1 display

`display: gird;`指定一个容器采用网格布局   

 **⚠️注意：设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-\*等设置都将失效。**   

### 2.2 grid-template-columns/items

`grid-template-columns`定义每一列的列宽，`grid-template-rows`定义每一行的行高   
- repeat()   
列宽与行高可以使用绝对单位和百分比，也可以使用`repeat()`函数，例如

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
}

// 或者重复某一模式
.container {
  display: grid;
  grid-template-columns: repeat(2, 100px 20px 80px);
}
```   

- auto-fill   
有时，单元格的大小是固定的，但是容器的大小不确定，`auto-fill` 可以让每行自动填充满列数
```css
// 每列宽100px，每行自动填充，直到容器不能容纳为止
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

- fr   
`fr`是(fraction)的缩写，用来表示比例关系
```css
//第一列和第二列等宽
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

// 第二列是第一列的2倍宽
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

//第一列定宽150px，第三列宽度是第二列的2倍
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```
- minmax()   
`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。  
```css
//第三列最小宽度200px，最大宽度与前两列等宽
.container {
  display: grid;
  grid-template-columns: 1fr 1fr minmax(200px, 1fr);
}
```

- auto      
`auto`浏览器自适应
```css
//第一、三列定宽100px，中间第二列自适应容器剩余的宽度
.container {
  display: grid;
  grid-template-columns: 100px auto 100px;
}
```

- 网格线的名称   
grid-template-columns属性和grid-template-rows属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。
```css
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```
方括号里面依次是这八根线的名字。
网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`。

- 布局实例   
grid-template-columns属性对于网页布局非常有用。两栏式布局只需要一行代码。
```css
//左边栏设为70%，右边栏设为30% 
.wrapper {
  display: grid;
  grid-template-columns: 70% 30%;
  
  //左边定宽，右边calc计算占满剩余空间(与auto效果一样，但更灵活，可以是任意vw)  
  grid-template-columns: 300px calc(100vw - 300px);

  //传统的十二网格布局
  grid-template-columns: repeat(12, 1fr);
}
```
### 2.3 grid-row(columns)-gap / grid-gap
```css
.container {
  grid-row-gap: 20px;      //行间距
  grid-column-gap: 20px;   //列间距
}
```
grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式，语法如下。   
```css
.container{
  //省略第二个值时，默认和第一个值相等
  grid-gap: <grid-row-gap> <grid-column-gap>;
}

```
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphem68zoyj30mz0djglt.jpg)

### 2.4 grid-template-areas

```css
//划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}

//多个单元格合并成一个区域
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a a a'
                       'b b b'
                       'c c c';
}

//中间一列为点，表示没有用到该单元格，或者该单元格不属于任何区域
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a . c'
                       'd . f'
                       'g . i';
}
```
**⚠️注意：区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。比如，区域名为header，则起始位置的水平网格线和垂直网格线叫做`header-start`，终止位置的水平网格线和垂直网格线叫做`header-end`。**

### 2.5 grid-auto-flow

默认row，即先行后列排列item   
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphf3nrq4lj30mz0djdg0.jpg)

`grid-auto-flow: column;`先列后行
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphf404b0vj30mz0djq34.jpg)

### 2.6 justify-items / align-items / place-items

单元格内容对齐   
> ➀ start：对齐单元格的起始边缘。   
> ➁ end：对齐单元格的结束边缘。   
> ➂ center：单元格内部居中。   
> ➃ stretch：拉伸，占满单元格的整个宽度（默认值)   
```css
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```
简写 `place-items: <align-items> <justify-items>;` 如果省略第二个值，则浏览器认为与第一个值相等。
### 2.7 justify-content/align-content/place-content

整个内容区域在容器里面的对齐方式   
```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}
```
以justify-content属性为例（红色虚线框代表container）

`justify-content: start;`   
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphfkx4i0nj30n60dfaa5.jpg)

`justify-content: end;`   
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphfl3fowwj30n60dfwel.jpg)

`justify-content: center;`     
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphflwme37j30n60dfq31.jpg)

`justify-content: stretch;`项目大小没有指定时，拉伸占据整个网格容器   
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphfp3p7cwj30n60dfjrh.jpg)

`justify-content: space-around;`每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。   
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphfv72tsnj30n60dfwel.jpg)

`justify-content: space-between;`项目与项目的间隔相等，项目与容器边框之间没有间隔   
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphfsh9hnbj30n60df3ym.jpg)

`justify-content: space-evenly;`项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔   
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphfrcu512j30n60dft8t.jpg)

简写`place-content: <align-content> <justify-content>` 如果省略第二个值，浏览器就会假定第二个值等于第一个值。

### 2.8 3.8 grid-auto-columns(rows)

item位置被指定在现有网格之外时，会自动生成多余的网格，例如 3 x 3 排列   

 ```css
 .container div:nth-child(8) {
  background-color: #8ab2b8;
  grid-row-start: 4;
  grid-column-start: 2;
}
.container div:nth-child(9) {
  background-color: #cdfa72;
  grid-row-start: 5;
  grid-column-start: 3;
}
 ```  

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphgyrwkg1j30n70gp74j.jpg)

## 3. 项目属性

### 3.1 grid-column-start/grid-column-end/grid-row-start/grid-row-end

使用这四个属性，如果产生了项目的重叠，则使用z-index属性指定项目的重叠顺序。 

> ➀ grid-column-start属性：左边框所在的垂直网格线   
> ➁ grid-column-end属性：右边框所在的垂直网格线  
> 简写 ` grid-column`   
> ➂ grid-row-start属性：上边框所在的水平网格线   
> ➃ grid-row-end属性：下边框所在的水平网格线   
> 简写 ` grid-row` 
  
可以使用 `span` 关键字，表示跨越了几个单元格，例如：

```css
.item-1 {
  grid-column-start: span 2;
}
```

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphy4z0gp0j30o30gat97.jpg)

### 3.2 grid-column/grid-row 
3.1中属性的简写形式

```css
.item {
  grid-column: <start-line> / <end-line>;
  grid-row: <start-line> / <end-line>;
}

-------------------------
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

-------------------------
//也可以使用span关键字
.item-1 {
  background: #b03532;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
/* 等同于 */
.item-1 {
  background: #b03532;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}

-------------------------
//斜杠以及后面的部分可以省略，默认跨越一个网格
.item-1 {
  grid-column: 1;
  grid-row: 1;
}
```

### 3.3 grid-area
`grid-area`属性指定项目放在哪一个区域。

```css
.item-4 {
  grid-area: f;
}
```

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphyn3v74nj30o30et74r.jpg)

`grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。   

```css
.item {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
//示例
.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```

### 3.4 justify-self/align-self/place-self

`justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。   

`align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

```css
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```
> start：对齐单元格的起始边缘。   
> end：对齐单元格的结束边缘。   
> center：单元格内部居中。   
> stretch：拉伸，占满单元格的整个宽度（默认值）。   

示例：   
```css
.item-1  {
  justify-self: start;
}
```
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphyts8xaij30mv0dl3yp.jpg)

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式，如果省略第二个值，place-self属性会认为这两个值相等。

示例：  
```css
.item-2  {
place-self: center center;
}
```
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gphyv8llz2j30mv0dl74h.jpg)
