---
autoGroup-2: IDE
title: 使用 TRAE 30分钟极速开发一款划词中英互译浏览器插件
isTimeLine: true
date: 2025-11-08
categories:
  - Tools
tags:
  - IDE
  - Tools
---

# 划词翻译助手 - Chrome 浏览器插件

一个简单易用的 Chrome 浏览器插件，支持页面划词翻译功能，实现中英文自动互译。[Github 仓库链接](https://github.com/TienOUC/translate-plugin)

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/20251108192416345.gif)

## 功能特点

- ✅ **页面划词翻译**：在任何网页上划选文本即可自动翻译
- ✅ **智能语言检测**：自动识别源语言并翻译成目标语言
- ✅ **双向翻译**：中文 → 英文，英文 → 中文自动切换
- ✅ **多 API 优先级**：优先使用百度翻译，失败回退 Google，最终 LibreTranslate
- ✅ **优雅弹窗**：美观的翻译结果展示界面
- ✅ **暗色模式**：支持系统暗色模式
- ✅ **翻译统计**：记录翻译使用次数
- ✅ **响应式设计**：适配不同屏幕尺寸
- ✅ **Ant Design 紧凑风格**：弹出页采用 Ant Design 紧凑样式与暗色自适应

## 安装方法

### 1. 下载插件

将本项目的所有文件下载到本地文件夹。

### 2. 加载插件到 Chrome

1.  打开 Chrome 浏览器，输入地址：`chrome://extensions/`
2.  开启右上角的"开发者模式"
3.  点击"加载已解压的扩展程序"
4.  选择包含插件文件的文件夹
5.  插件图标将出现在浏览器工具栏中

### 3. 使用插件

1.  在任意网页上划选需要翻译的文本
2.  自动弹出翻译结果
3.  点击弹窗外部关闭翻译窗口

## 文件结构

    chrome-translation-extension/
    ├── manifest.json           # 插件配置
    ├── content.js              # 内容脚本（划词与翻译逻辑）
    ├── styles.css              # 页面内翻译弹窗样式
    ├── popup.html              # 扩展弹出页
    ├── popup.css               # 弹出页样式（Ant Design 紧凑）
    ├── popup.js                # 弹出页脚本（环境守卫、开关等）
    ├── icons/                  # 扩展图标（PNG+SVG）
    │   ├── icon16.png / icon16.svg
    │   ├── icon24.png          # 工具栏推荐尺寸
    │   ├── icon32.png / icon32.svg
    │   ├── icon48.png / icon48.svg
    │   ├── icon64.png / icon64.svg
    │   └── icon128.png / icon128.svg
    └── README.md               # 说明文档

## 技术实现

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/20251108201424449.webp)

### 翻译 API 优先级

- **百度翻译（首选）**：`https://api.fanyi.baidu.com/api/trans/vip/translate`
  - 需要在扩展中配置 `appid` 与 `key`（见下文“配置百度翻译”）。
  - 接口签名：`md5(appid + q + salt + key)`。
- **Google 翻译（回退）**：`https://translate.googleapis.com/translate_a/single`
  - `sl=auto` 自动检测源语言；如百度不可用则回退。
- **LibreTranslate（最终回退）**：`https://libretranslate.de/translate`
  - 在上述两者均失败时作为兜底。

### 核心功能

- **文本选择监听**：使用`mouseup`事件监听文本选择
- **弹窗定位**：基于鼠标位置智能定位
- **样式注入**：CSS 样式自动注入到所有网页
- **消息通信**：内容脚本与弹出窗口间的通信

### 用户体验

- **延迟显示**：避免干扰正常文本选择操作
- **智能定位**：防止弹窗超出屏幕边界
- **响应式设计**：适配移动设备和桌面设备
- **暗色模式**：根据系统设置自动切换

## 设置选项

点击插件图标可打开设置面板：

- **启用自动翻译**：开启/关闭划词翻译功能
- **显示发音**：显示单词发音（开发中功能）
- **翻译统计**：查看今日和累计翻译次数
- **测试翻译**：在当前页面测试翻译功能
- **清除统计**：重置翻译统计数据

## 图标配置（Manifest V3）

为确保工具栏与扩展管理页图标显示一致，推荐使用 PNG 并配置如下：

    "icons": {
      "16": "icons/icon16.png",
      "32": "icons/icon32.png",
      "48": "icons/icon48.png",
      "64": "icons/icon64.png",
      "128": "icons/icon128.png"
    },
    "action": {
      "default_title": "划词翻译助手",
      "default_popup": "popup.html",
      "default_icon": {
        "16": "icons/icon16.png",
        "24": "icons/icon24.png",
        "32": "icons/icon32.png"
      }
    }

注：工具栏推荐 `16/24/32`；管理页与商店常用 `16/32/48/64/128`。

## 配置百度翻译

扩展首次运行前，请在浏览器控制台为扩展写入百度凭证：

    chrome.storage.sync.set({
      baiduAppId: "你的appid",
      baiduAppKey: "你的key"
    });

并在 `manifest.json` 的 `host_permissions` 中加入：

    "host_permissions": [
      "https://translate.googleapis.com/*",
      "https://api-free.deepl.com/*",
      "https://api.fanyi.baidu.com/*"
    ]

## 注意事项

1.  **网络要求**：需要网络连接才能使用翻译功能
2.  **API 限制**：免费 API 有使用频率限制，请勿过度使用
3.  **隐私保护**：插件仅在本地处理文本，不会上传用户数据
4.  **兼容性**：支持 Chrome 88+ 版本
5.  **本地预览**：可用 `python3 -m http.server 8001` 预览 `popup.html`；本地预览无扩展环境，`chrome.*` API 在代码中已做守卫处理。

## 感言

这是我第一次学习开发浏览器插件，AI Coding 效率就是高呀～
