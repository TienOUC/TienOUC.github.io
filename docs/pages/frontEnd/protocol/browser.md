---
autoGroup-1: HTTP
title: 浏览器缓存
date: 2020-03-02
categories: 
- FrontEnd
tags:
- Cookie
---

## 1. Cookie
HTTP Cookie（也叫 Web Cookie 或者浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，他会在浏览器下次向同一服务器再发起请求时被携发送到服务器上。通常，它用于告知服务器两个请求是否来自同浏览器，如保护用户的登录状态。Cookie 使基于无状态的HTTP协议记录稳定的状态信息成为可能。   

Cookie 曾被用户客户端数据存储，但因为额外的性能开销和随着 localStorage 、 sessionStorage、[IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 等技术的出现而逐渐被淘汰。

### 1.1 特点
+ 本身用于浏览器和server通讯，被借用来做本地存储
+ 最大存储数据上限 4kb

### 1.2 创建和生命周期
+ 创建
通过 `document.cookie` 属性可创建新的 Cookie，也可通过该属性访问非 HttpOnly 标记的 Cookie。

```
document.cookie = "yummy_cookie=choco"; 
document.cookie = "tasty_cookie=strawberry"; 
console.log(document.cookie); 
//  "yummy_cookie=choco; tasty_cookie=strawberry"
```

服务器使用 `Set-Cookie` 响应头部向用户代理（一般是浏览器）发送 Cookie 信息。例如：
```
Set-Cookie: <cookie名>=<cookie值>
```
服务器通过该头部告知客户端保存 Cookie 信息   
```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[页面内容]
```
现在，对该服务器发起的每一次新请求，浏览器都会将之前保存的Cookie信息通过 Cookie 请求头部再发送给服务器。
```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```
+ 生命周期

1. 会话期 Cookie ：仅在会话期内有效。会话期Cookie不需要指定过期时间（Expires）或者有效期（Max-Age）。***需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期Cookie 也会被保留下来，这会导致 Cookie 的生命周期无限期延长。***   

2. 持久性 Cookie ：其生命周期取决于过期时间（Expires）或有效期（Max-Age）指定的一段时间。例如  `Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;`
:::tip 注意：
当Cookie的过期时间被设定时，设定的日期和时间只与客户端相关，而不是服务端。
:::

### 1.3 使用场景
+ 会话状态管理（如用户登录状态、购物车、游戏分数或其他需要记录的信息）   
+ 个性化设置（用户自定义设置，主题等）  
+ 浏览器行为跟踪（如广告推荐等）  


## 2. localStorage
localStorage 可以作为浏览器的本地缓存方案，用来提升网页首屏渲染速度（根据第一次请求返回时，将一些不变的信息直接存储在本地）   

### 2.1 特点
+ 保存的数据永久储存（除非主动删除），下一次访问该网站的时候，网页可以直接读取之前保存的数据   
+ html5专门为存储设计，最大可存储 5MB
+ 仅在客户端使用，不和服务端进行通信   
   
### 2.2 存取数据     
其保存的数据是以键值对的形式存在的，且所有数据都是以文本格式保存的。    
+ 存入 `localStorage.setItem(key, value)`   
+ 读取 `localStorage.getItem(key)` 
+ 删除 `localStorage.removeItem(key)`， 删除所有保存的数据 `localStorage.clear()`   

### 2.3 使用场景  
localStorage在存储方面几乎没有特别的限制，理论上，一些 Cookie 无法胜任的、存储简单键值对的任务都可以交给 localStorage 来做。 比如考虑到其保存的数据是永久存储，因此可以用来存储一些内容稳定的资源，比如图片内容丰富的网站可以用其来存储 Base64 格式的图片字符串。

## 3. sessionStorage
数据只存在于当前会话，会话结束（浏览器或者标签页关闭）则清空，不同窗口打开的同源网站页面，sessionStorage 的内容无法共享，而 localStorage 和 Cookie 则可以共享。   

### 3.1 特点
+ 会话级别的浏览器存储   
+ 存储大小限制为 5MB   
+ 仅在客户端使用，不与服务端进行通信   
  
### 3.2 存取数据
+ 存入 `sessionStorage.setItem(key, value)`   
+ 读取 `sessionStorage.getItem(key)` 
+ 删除 `sessionStorage.removeItem(key)`， 删除所有保存的数据 `sessionStorage.clear()`

### 3.3 使用场景

sessionStorage 更适合用来存储生命周期和它同步的会话级别的信息，这些信息只适用于当前的会话。当你开启新的会话时，它也需要相应的更新或释放。比如微博就使用 sessionStorage 存储单次会话的浏览足迹，它会存一个 lasturl 键去对应你上一次访问的 url 地址。当你切换 url 的时候，这个键值就会更新；当你关闭页面的时候，这个键就会被释放。另外，还可对表单信息进行缓存，比如刷新时表单信息不会丢失。  

## 4. 总结图
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gpkjxrm9lcj30xu0u0mzj.jpg)
