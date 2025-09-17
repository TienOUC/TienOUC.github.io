---
autoGroup-5: 其他
title: Proxy实现表单拦截校验
date: 2020-03-02
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. Proxy 实现表单拦截校验

```html
<body>
	<input type="text" validate rule="max:12,min:3" placeholder="最小3，最大12个字符" />
	<input type="text" validate rule="max:3,isNumber" placeholder="最大3个数字" />
</body>
```

```js
    <script>
      'use strict'
      class Validate {
        max(value, len) {
          return value.length <= len
        }
        min(value, len) {
          return value.length >= len
        }
        isNumber(value) {
          return /^\d+$/.test(value)
        }
      }

      function ProxyFactory(target) {
        return new Proxy(target, {
          get(target, key) {
            return target[key]
          },
          set(target, key, el) {
            // console.log(key)
            // console.log(el)
            const rule = el.getAttribute('rule')
            const validate = new Validate()
            let state = rule.split(',').every((rule) => {
              const info = rule.split(':')
              return validate[info[0]](el.value, info[1])
            })
            // console.log(state)
            el.classList[state ? 'remove' : 'add']('error')
            return true
          },
        })
      }
      const proxy = ProxyFactory(document.querySelectorAll('[validate]'))
      //   console.log(proxy)
      proxy.forEach((item, i) => {
        item.addEventListener('keyup', function () {
          proxy[i] = this
        })
      })
    </script>
```

**效果：**  
![](https://tva1.sinaimg.cn/large/0081Kckwly1gl1jyjxfg1g30hk0c00ti.gif)
