---
autoGroup-5: 其他
title: 登陆请求拦截
date: 2020-03-02
publish: false
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 路由拦截

在定义路由的时候多添加一个字段 `requireAuth`， 用于判断该路由的访问是否需要登录，若用户已登录，则顺利进入路由，否则跳转至登录页面

```js
const routes = [
	{
		path: '/',
		name: '/',
		component: Index,
	},
	{
		path: '/myIndex',
		name: 'myIndex',
		meta: {
			requireAuth: true, //添加该字段，表示进入这个路由是需要登录的
		},
		component: myIndex,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
];
```

定义完路由之后，利用 vue-router 提供的钩子函数 `beforeEach()` 对路由进行判断

```js
router.beforeEach((to, from, next) => {
	// 判断该路由是否需要登录权限
	if ((to.meta, requireAuth)) {
		// 通过vuex state获取当前的token是否存在
		if (store.state.token) {
			next();
		} else {
			next({
				path: '/login',
				// 将跳转的路由path作为参数，登录成功后跳转到该路由
				query: { redirect: to.fullPath },
			});
		}
	} else {
		next();
	}
});
```

每个钩子方法接收三个参数：

- 1. to:（Route）即将要进入的目标路由对象。
- 2. from: (Route) 当前导航正要离开的路由。
- 3. next: （Function）一定要调用这个方法来 resolve 当前钩子。执行效果以来 next 方法的调用参数。
     > next(): 进行管道中的下一个钩子。若全部钩子执行完毕，则导航的状态就是 confirmed 。  
     > next(false): 终端当前的导航，若浏览器的 URL 改变（用户手动或者浏览器后退），那么 URL 地址会重置到 from 路由对应的地址。  
     > next('/')或者 next({path: '/'})跳转到一个不同的地址。当前的导航就被中断，然后已经一个新的导航。

**确保要调用 next 方法，否则钩子就不会被 resolved**  
`to.meta` 中是自定义数据，包括最开始定义的 `requireAuth` 字段。通过这个字段来判断该路由是否需要登录权限。需要的话，同时当前应用不存在 `token`，则跳转到登录页面进行登录，成功后跳转到目标路由。

## 2. http 拦截器

路由拦截知识简单的前端路由控制，并不能真正地阻止用户访问需要登录权限的路由。还有一种情况是：当前 `token` 失效了，但是 `token` 依然保存在本地，此时访问需要登录权限的路由时，实际上应该让用户重新登录。这时候就需要结合 **http 拦截器 + 后端接口返回的状态码** 来判断。

axios 的拦截器可通过配置 http response interceptor，当后端接口返回 `401 Unauthorized` 时，让用户重新登录。

```js
// http request 拦截器
axios.interceptors.request.use(
	(config) => {
		// 判断是否存在token，如果存在的话，则每个http header都加上token
		if (store.state.token) {
			config.headers.Authorization = `token ${store.state.token}`;
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	(response) => {
		// 方法一: 根据返回信息
		// response 的信息内容不同, 如请求成功, 但提示Token 超时,
		// 这是 也可以 弹框 提示, 也可以直接跳转至登录页, 例如
		if (response.data.message.indexOf('Token') > -1) {
			router.replace({
				path: 'login',
				query: { redirect: router.currentRoute.fullPath },
			});
		}
		return response;
	},
	(error) => {
		if (error.response) {
			// 方法二: 根据返回状态
			switch (error.response.status) {
				case 401:
					// 返回 401 清除token信息并跳转到登录页面
					store.commit(types.LOGOUT);
					router.replace({
						path: 'login',
						query: { redirect: router.currentRoute.fullPath },
					});
			}
		}
		return Promise.reject(error.response.data); // 返回接口返回的错误信息
	}
);
```
