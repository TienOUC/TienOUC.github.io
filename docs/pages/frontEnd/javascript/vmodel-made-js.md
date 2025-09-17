---
autoGroup-5: 其他
title: 原生JS实现双向数据绑定
date: 2020-05-15
isTimeLine: true
categories:
  - FrontEnd
tags:
  - JavaScript
---

两种方法实现双向数据绑定

## 1. Object.defineProperty

核心方法是 `Object.defineProperty(obj, 'newProperty', {define})`

三个参数：

- `obj`: 要定义属性的对象
- `newProperty`: 要定义或者修改的属性的名称
- `define`: 将被定义或者修改的属性的描述  


```html
<input type="text" id="input" />
<p id="showText"></p>
```

```js
let obj = {};
Object.defineProperty(obj, 'newProp', {
	get: function() {
		return obj;
	},
	set: function(newVal) {
		document.getElementById('input').value = newVal;
		document.getElementById('showText').innerHTML = newVal;
	},
});
document.addEventListener('keyup', (e) => {
	obj.newProp = e.target.value;
});
```

**效果：**  
![](https://tva1.sinaimg.cn/large/0081Kckwly1gjybswg9u2g30ds09oaak.gif)

## 2. Proxy 代理

```html
<body>
	<h3 v-bind="content">这是content，我会更新</h3>
	<input type="text" v-model="content" />
	<input type="text" v-model="content" />
	<hr />
	<h3 v-bind="title">这是title，我会更新</h3>
	<input type="text" v-model="title" />
</body>
```

```js
<script>
      function View() {
        let proxy = new Proxy({}, {
            get(obj, property) {},
            set(obj, property, value) {
              // console.log(value)
              // console.log(property)
              document
                .querySelectorAll(`[v-model="${property}"]`)
                .forEach((item) => {
                  item.value = value
                })

              // 重新渲染 v-bind 绑定的标签
              document
                .querySelectorAll(`[v-bind="${property}"]`)
                .forEach((item) => {
                  item.innerHTML = value
                })
            },
          }
        )
        this.init = function () {
          const els = document.querySelectorAll('[v-model]')
          els.forEach((item) => {
            item.addEventListener('keyup', function () {
              proxy[this.getAttribute('v-model')] = this.value
            })
          })
        }
      }
      new View().init()
</script>
```

**效果：**  
![](https://tva1.sinaimg.cn/large/0081Kckwly1gkkixo60msg30m80cl42q.gif)
