---
autoGroup-5: 其他
title: '跨域及几种解决方法'
sidebarDepth: 2
date: 2019-10-14
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 一、 **什么是跨域**

跨域：指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对 javascript 施加的安全限制。

例如：a 页面想获取 b 页面资源，如果 a、b 页面的协议、域名、端口、子域名不同，所进行的访问行动都是跨域的，而浏览器为了安全问题一般都限制了跨域访问，也就是不允许跨域请求资源。注意：跨域限制访问，其实是浏览器的限制。

> - **_同源策略：是指协议，域名，端口都要相同，其中有一个不同都会产生跨域_**

## 二、 **解决跨域的几种方法**

### 2.1 JSONP

**原理：** 动态创建一个 script 标签，动态加载一个 js 文件，载入成功之后会执行在 url 参数中指定的函数，并且把需要的 json 数据所谓参数传入。

> - **_只能传递 get 请求，有一定的限制_**

```js
// 原生方法
(function (window,document) {
    "use strict";
    var jsonp = function (url,data,callback) {

        // 1.将传入的data数据转化为url字符串形式
        // {id:1,name:'zhangsan'} => id=1&name=zhangsan
        var dataString = url.indexof('?') == -1? '?': '&';
        for(var key in data){
            dataString += key + '=' + data[key] + '&';
        };

        // 2 处理url中的回调函数
        // cbFuncName回调函数的名字 ：my_json_cb_名字的前缀 + 随机数（把小数点去掉）
        var cbFuncName = 'my_json_cb_' + Math.random().toString().replace('.','');
        dataString += 'callback=' + cbFuncName;

        // 3.创建一个script标签并插入到页面中
        var scriptEle = document.createElement('script');
        scriptEle.src = url + dataString;

        // 4.挂载回调函数
        window[cbFuncName] = function (data) {
            callback(data);
            // 处理完回调函数的数据之后，删除jsonp的script标签
            document.body.removeChild(scriptEle);
        }

        // 5.append到页面中
        document.body.appendChild(scriptEle);
    }

    // 因为jsonp是一个私有函数外部不能调用，所有jsonp函数作为window对象的一个方法，供外部调用
    window.$jsonp = jsonp;

})(window,document)

// 原生方式精简版
<script>
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.baidu.com/xx?a=b&callback=onBack';
    document.head.appendChild(script);

    // 回调执行函数
    function onBack(res) {
        alert(JSON.stringify(res));
    }
</script>


// jQuery
$.ajax({
    url: url,
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "callback",    // 自定义回调函数名
    data: {}
});

// 后端node.js代码
var querystring = require('querystring');
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
    var params = qs.parse(req.url.split('?')[1]);
    var fn = params.callback;

    // jsonp返回设置
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(fn + '(' + JSON.stringify(params) + ')');

    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
```

### 2.2 CORS 跨域资源共享

**原理：** 服务器端对于 CORS 的支持，设置 Access-Control-Allow-Origin 为你传输的 origin 的值，浏览器监测到响应的设置，支持跨域

> - **_跨域携带 cookies_**
> - **_优缺点：支持所有的请求类型，get、post、put、delete、updata 等等_**
> - **_所有浏览器都支持该功能(IE8+：IE8/9 需要使用 XDomainRequest 对象来支持 CORS）)，CORS 也已经成为主流的跨域解决方案_**

```js
// 原生
...
xhr.withCredentials = true
...

// jQuery
$.ajax({
    ...
   xhrFields: {
       withCredentials: true    // 前端设置是否带cookie
   },
   crossDomain: true,   // 会让请求头中包含跨域的额外信息，但不会含cookie
    ...
});

// axios
axios.defaults.withCredentials=true; // 让ajax携带cookie

//服务端设置
const app = express()
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // 访问控制允许来源：所有
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept') // 访问控制允许报头 X-Requested-With: xhr请求
  res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS') // 访问控制允许方法
  res.header('X-Powered-By', 'nodejs') // 自定义头信息，表示服务端用nodejs
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Max-Age', '600')
  next()
})

```

### 2.3 window.name + iframe 跨域

**原理：** 一般用于 iframe 的跨域问题，在一个窗口（window）的生命周期内，窗口载入的所有的页面都是共享一个 window.name 的，每个页面的 window.name 都有读写的权限，并且是持久存在一个再如果的所有页面中

> - **_优缺点：通过 iframe 的 src 属性由外域转向本地域，跨域数据即由 iframe 的 window.name 从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。window.name 支持非常长的 name 值(2MB)_**

```js
// 在A页面设置函数

var proxy = function(url, callback) {
	var state = 0;
	var iframe = document.createElement('iframe');

	// 加载跨域页面
	iframe.src = url;

	// onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
	iframe.onload = function() {
		if (state === 1) {
			// 第2次onload(同域proxy页)成功后，读取同域window.name中数据
			callback(iframe.contentWindow.name);
			destoryFrame();
		} else if (state === 0) {
			// 第1次onload(跨域页)成功后，切换到同域代理页面
			iframe.contentWindow.location = 'http://www.domain1.com/proxy.html';
			state = 1;
		}
	};

	document.body.appendChild(iframe);

	// 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）
	function destoryFrame() {
		iframe.contentWindow.document.write('');
		iframe.contentWindow.close();
		document.body.removeChild(iframe);
	}
};

// 请求跨域b页面数据
proxy('http://www.xxx.com/B.html', function(data) {
	alert(data);
});

// 在B页面设置window.name值
<script>window.name = 'B页面向A页面传递的数据';</script>;
```

### 2.4 H5 属性 window.postMessage

**原理：** postMessage 是 HTML5 XMLHttpRequest Level 2 中的 API，且是为数不多可以跨域操作的 window 属性之一，它可用于解决以下方面的问题：

> 1. 页面和其打开的新窗口的数据传递
> 2. 多窗口之间消息传递
> 3. 页面与嵌套的 iframe 消息传递
> 4. 上面三个场景的跨域数据传递

用法：postMessage(data,origin)方法接受两个参数
data： html5 规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用 JSON.stringify()序列化。
origin： 协议+主机+端口号，也可以设置为”\*”，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为”/”。

```js
 // A页面
<iframe id="iframe" src="http://www.B.com/b.html" style="display:none;"></iframe>
<script>
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            msg: 'xxx'
        };
        // 向B传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.B.com');
    };

    // 接受B返回数据
    window.addEventListener('message', function(e) {
        alert('data from B ---> ' + e.data);
    }, false);
</script>


// B页面
<script>
    // 接收A的数据
    window.addEventListener('message', function(e) {
        alert('data from A ---> ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回A
            window.parent.postMessage(JSON.stringify(data), 'http://www.A.com');
        }
    }, false);
</script>
```

### 2.5 nodejs 中间件代理跨域

**原理：** node 中间件实现跨域代理，原理大致与 nginx 相同，都是通过启一个代理服务器，实现数据的转发

node + vue + webpack-dev-server 代理接口跨域，在开发模式下，只需要配置 devServer=>proxy 即可

```js
module.exports = {
    entry: {},
    module: {},
    ...
    devServer: {
        historyApiFallback: true,
        proxy: [{
            target: 'http://www.B.com:8080',  // 代理跨域目标接口
            changeOrigin: true,
            cookieDomainRewrite: 'www.A.com'  // 可以为false，表示不修改
        }],
        noInfo: true
    }
}
```

在非框架类时 nodejs 使用 http-proxy-middleware

```js
var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

app.use(
	'/',
	proxy({
		// 代理跨域目标接口
		target: 'http://www.B.com:8080',
		changeOrigin: true,

		// 修改响应头信息，实现跨域并允许带cookie
		onProxyRes: function(proxyRes, req, res) {
			res.header('Access-Control-Allow-Origin', 'http://www.A.com');
			res.header('Access-Control-Allow-Credentials', 'true');
		},

		// 修改响应信息中的cookie域名
		cookieDomainRewrite: 'www.A.com', // 可以为false，表示不修改
	})
);

app.listen(5566);
console.log('Proxy server is listen at port 5566...');
```

---

## 三、Node.js 如何设置允许跨域

### 3.1 设置允许所有域名跨域：

```js
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
}
```

### 3.2 设置允许指定域名“http://www.ABC.com”跨域：

```js
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","http://www.ABC.com");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
}
```

### 3.3 设置允许多个域名跨域：

```js
app.all("*",function(req,res,next){
    if( req.headers.origin.toLowerCase() == "http://www.ABC.com"
        || req.headers.origin.toLowerCase() =="http://127.0.0.1" ) {
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
}
```

### 3.4 如果允许的域名较多，可以将允许跨域的域名放到数组当中：

```js
app.all("*",function(req,res,next){
    var orginList=[
        "http://www.ABC.com",
        "http://www.alibaba.com",
        "http://www.qq.com",
        "http://www.baidu.com"
    ]
    if(orginList.includes(req.headers.origin.toLowerCase())){
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin",req.headers.origin);
    }
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
}
```
