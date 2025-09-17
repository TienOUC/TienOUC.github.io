---
title: Web Components
date: 2023-01-01
categories:
  - FrontEnd
tags:
  - JavaScript
---

Web components 是原生的组件化开发技术，它可以让我们创建自定义的 HTML 元素，并且功能和样式都会封装在组件内部，不影响其它的元素。

## 1. Web Components 的构成

Web Components 里有三个概念，分别是自定义元素，Shadow DOM（影子 DOM） 和 HTML 模板。其中：

- 自定义元素是通过在 JavaScript 中继承 HTMLElement 或者现有的HTML DOM 对象来实现的。自定义元素有 4 个生命周期钩子，分别为 `connectedCallback()`、`disconnectedCallback()`、`adoptedCallback()`、`attributeChangedCallback()`，分别会在元素挂载时、卸载时、移动时、属性变化时调用。
- Shadow DOM 与普通的 document 对象几乎一样，但是专门用来操作自定义的 HTML 元素的，它也是一个树形结构，但是 Shadow DOM 完全独立于普通 DOM，相当于是一个隔离区，需要把它挂载到一个普通的 DOM 节点上。
- HTML 模板是为了方便编写自定义元素的 HTML 代码和 CSS 样式的，它包括两个标签 `<template />` 和 `<slot />`，其中 `<slot />` 与 Vue 中的 slot 类似，用于指定一些占位的插槽，后边可以用真实的元素替换掉。

## 2. 示例

一个简单的用户信息展示卡片

```js
function createUserInfoComponent() {
  const template = document.createElement("template");
  template.innerHTML = `
    <style>
    #header-avatar{
      cursor: pointer;
    }
    .info-container-hide {
      display: none;
      opacity: 0;
      transition: all .2s ease;
    }

    .info-container {
      position: absolute;
      top: 52px;
      right: 0;
      padding: 6px;
      width: 240px;
      background-color: #fff;
      box-shadow: 0px 20px 80px rgba(22, 25, 29, 0.07), 0px 30px 120px rgba(22, 25, 29, 0.08), inset 2px 2px 1px #FFFFFF;
      border-radius: 9px;
    }

    .user-info {
      display: flex;
      align-items: center;
      padding: 10px;

    }

    .user-avatar {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      font-weight: 400;
      font-size: 20px;
      line-height: 20px;
      color: #0161EF;
      background-color: #ECF5FF;
      border-radius: 50%;
      border: 1px solid #F3F5F6;

    }

    .user-avatar img {
      width: 100%;
      height: 100%;
    }

    .right-part {
      display: flex;
      flex-direction: column;
      padding-left: 6px;
    }

    .user-name {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #2B323B;
      /* $gray-2 */
    }

    .user-tel {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #576575;
    }

    .divider {
      margin: 6px 0;
      widows: 100%;
      height: 1px;
      background-color: #E2E5E9;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      padding: 12px;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #2B323B;
    }

    .logout-btn:hover {
      cursor: pointer;
      background: rgba(108, 126, 147, 0.08);
      border-radius: 4px;
    }

    .btn-text {
      padding-left: 4px;
    }
  </style>

  <div class='user-avatar' id='header-avatar'></div>
  <div class='info-container info-container-hide' id='info-container'>
    <div class='user-info'>
      <div class='user-avatar' id='user-avatar'></div>
      <div class='right-part'>
        <span class='user-name' id='user-name'></span>
        <span class='user-tel' id='user-tel'></span>
      </div>
    </div>
    <div class='divider'></div>
    <div class='logout-btn' id='logout-btn'>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5H10.5C11.0523 1.5 11.5 1.94771 11.5 2.5V5.375H10.5V2.5H4.3561L6.40614 3.41113C6.76727 3.57163 7 3.92975 7 4.32494V12.5H10.5V11.625H11.5V12.5C11.5 13.0523 11.0523 13.5 10.5 13.5H7V14.2306C7 14.9543 6.25515 15.4383 5.59386 15.1444L1.9454 13.5229C1.67455 13.4025 1.5 13.1339 1.5 12.8375V2.25ZM2.5 12.6751L6 14.2306V4.32494L2.5 2.76939V12.6751Z"
          fill="#2B323B" />
        <path
          d="M12.7929 9H8.5V8H12.7929L11.6465 6.85353L12.3536 6.14642L14.7071 8.49998L12.3536 10.8535L11.6465 10.1464L12.7929 9Z"
          fill="#2B323B" />
      </svg>
      <div class='btn-text'>退出登录</div>
    </div>
  </div>
`;

  class UserInfo extends HTMLElement {
    constructor () {
      super();
      this.attachShadow({ mode: "open" }).appendChild(
        template.content.cloneNode(true)
      );
      this.headerAvatar = this.shadowRoot.querySelector("#header-avatar");
      this.infoContainer = this.shadowRoot.querySelector("#info-container");
      this.userAvatar = this.shadowRoot.querySelector("#user-avatar");
      this.userName = this.shadowRoot.querySelector("#user-name");
      this.userTel = this.shadowRoot.querySelector("#user-tel");
      this.logoutBtn = this.shadowRoot.querySelector("#logout-btn");
      this.showUserInfo = false;
    }

    static get observedAttributes() {
      return ['name', 'avatar', 'tel'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      if (attr === "name") {
        this.userName.textContent = newValue;
      }
      if (attr === "tel") {
        this.userTel.textContent = newValue;
      }
      if (attr === 'avatar') {
        if (!newValue) {
          this.userAvatar.textContent = this.userName.textContent.slice(0, 1);
          this.headerAvatar.textContent = this.userName.textContent.slice(0, 1);
          this.userAvatar.style.borderColor = '#CCE4FF';
          this.headerAvatar.style.borderColor = '#CCE4FF';
        } else {
          const img = document.createElement("img");
          img.setAttribute('src', newValue);
          this.userAvatar.appendChild(img);
          this.headerAvatar.appendChild(img.cloneNode());
          this.userAvatar.style.borderColor = '#F3F5F6';
          this.headerAvatar.style.borderColor = '#F3F5F6';
        }
      }
    }

    toggleUserInfo() {
      this.showUserInfo = !this.showUserInfo;
      if (this.showUserInfo) {
        this.infoContainer.classList.remove('info-container-hide');
      } else {
        this.infoContainer.classList.add('info-container-hide');
      }
    }

    closeUserInfoCard() {
      const html = document.querySelector('html')
      html.addEventListener('click', () => {
        this.infoContainer.classList.add('info-container-hide');
      })

    }

    logout() {
      const headerAppointBtn = document.querySelector(".appoint-btn");
      const goAppBtn = document.querySelector(".go-app");
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const userInfoEle = document.querySelector('user-info');
      const loginBtn = document.querySelector(".login-btn");
      const publicTel = document.querySelector('.tel-public-box');

      fetch("/api/logout", {
        method: "POST",
        headers: {
          "X-Org-Id": userInfo.orgId,
          "X-Token": userInfo.session,
          "X-User-Id": userInfo.userId
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.code === 20000) {
            const date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = `session=""; path=/; expires=${date.toGMTString()}`;
            headerAppointBtn.style.display = 'block';
            goAppBtn.style.display = 'none';
            userInfoEle.style.display = 'none';
            loginBtn.style.display = 'block';
            localStorage.removeItem('userSession');
            localStorage.removeItem('userInfo');
            publicTel.style.right = '252px';
          }
        })
        .catch((error) => {
          throw new Error(error)
        });
    }

    connectedCallback() {
      this.headerAvatar.addEventListener("click", this.toggleUserInfo.bind(this));
      this.logoutBtn.addEventListener("click", this.logout.bind(this));
      const html = document.querySelector('html');
      const userInfoELe = document.querySelector('user-info')
      html.addEventListener('click', (event) => {
        if (event.target != userInfoELe) {
          this.infoContainer.classList.add('info-container-hide');
        }
      }, true)
    }

    disconnectedCallback() {
      this.headerAvatar.removeEventListener("click", this.toggleUserInfo());
      this.logoutBtn.removeEventListener("click", this.logout.bind());
    }
  }

  customElements.define("user-info", UserInfo);
}

export { createUserInfoComponent }
```

**使用**

```js
// 动态设置 name, avatar, tel 属性
<user-info name='name' avatar='avatar' tel='tel'></user-info>

// 合理利用 Web Components 周期函数，实现代码复用（组件逻辑内聚）
// 属性扩展：observedAttributes 监听属性， attributeChangedCallback 周期函数执行对应逻辑

// ESM 模式引入
import { createUserInfoComponent } from '../js/components/UserInfo.js'
createUserInfoComponent();
```

## 3. 抽离样式

- 1. `@import`

```js
class UserInfo extends HTMLElement {
    constructor () {
        super();
        // 附加Shadow DOM
        this.attachShadow({
            mode: 'open'
        });
        // 创建样式
        let node = document.createElement('style');
        node.innerHTML = `@import './user-info.css';`;
        this.shadowRoot.append(node);
    }
}
```

- 2. `fetch获取`

```js
class UserInfo extends HTMLElement {
    constructor () {
        super();
        // 附加Shadow DOM
        this.attachShadow({
            mode: 'open'
        });
        // 获取样式
        fetch('./user-info.css').then(response => response.text()).then(data => {
            let node = document.createElement('style');
            node.innerHTML = data;
            this.shadowRoot.appendChild(node);
        });
    }
   
}
```

- 3.  `import CSS module `

```js
import styles from './user-info.css';
class UserInfo extends HTMLElement {
    constructor () {
        super();

        let shadow = this.attachShadow({
            mode: 'open'
        });
        shadow.adoptedStyleSheets = [styles];
    }
}
```

`adoptedStyleSheets` 这个API方法是随着样式表构造（Constructed StyleSheets）一起出现的。   
存在与 `shadowRoot` 和 `document` 两个对象上，用来设置样式。   
[MDN - adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets#specifications)