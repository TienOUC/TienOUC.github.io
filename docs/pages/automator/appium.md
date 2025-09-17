---
autoGroup-0: Framework
title: Appium之android app自动化测试
sidebarDepth: 2
date: 2021-04-21
categories:
  - Automator
tags:
  - Testing
  - Framework
---

`Genymotion + Appium + Python` 是主流的移动端 App 自动化测试解决方案之一，本文记录该方案的 Android App 自动化测试环境搭建 (**macOS-11.x**) 及 demo 演示。

### 1. 环境搭建

#### 1.1 JDK

[:link: Oracle 官方下载](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
[:link: 华为 JDK 镜像下载](https://mirrors.huaweicloud.com/java/jdk/11.0.1+13/)

以华为镜像为例，安装完成后在终端输入 `java --version` 、`javac --version` 检查是否安装成功。

![](https://tva1.sinaimg.cn/large/008i3skNly1gqtmn9pusfj30sw0iwdgw.jpg)

配置环境变量

```shell
# JDK环境变量
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.1.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH:.

#如果是JDK8及以前的版本，还需要下面这一句
#export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
```

![](https://tva1.sinaimg.cn/large/008i3skNly1gqtmc4qfdpj30sw0jlmy2.jpg)

#### 1.2 Android SDK

终端输入 `brew install android-sdk` 安装 Android SDK，也可以用 Android Studio 安装，然后配置环境变量。

```shell
# SDK环境变量，第一行安装路径需据实修改
export ANDROID_HOME=/Users/opt/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### 1.3 Genymotion

选择 Desktop 版本 [:link: Genymotion 官方下载](https://www.genymotion.com/download/)，注意系统要求（ VM 安装这里不赘述 ）。

![](https://tva1.sinaimg.cn/large/008i3skNly1gqtmi1g9kaj30sw0gr0to.jpg)

点击右上角 `+` 号，设置或者自定义测试环境机型。  
![](https://tva1.sinaimg.cn/large/008i3skNly1gqtmifqmpfj30sw0k9mze.jpg)

Genymotion Shell 自打开显示相关机型信息即成功。

#### 1.4 Appium

[:link: Appium Github Repo](https://github.com/appium/appium-desktop/releases/tag/v1.21.0)

安装 `appium-python`库，终端输入 `pip3 install appium-python-client` （Python3）。

设置 `JAVA_HOME` 、 `ANDROID_HOME` 环境变量。

![](https://tva1.sinaimg.cn/large/008i3skNly1gqtmfqzl6hj30sw0qvtaq.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNly1gqtmzd72g7j30sw0j1t9n.jpg)

#### 1.5 运行 adb 命令测试

- 终端输入 `adb shell dumpsys window | grep mCurrentFocus` 获取 Package / Activity。
- 有多个设备时，会提示 `adb: more than one device and emulator`， 输入 `adb kill-server` 或者 `adb -s 设备名 shell` 指定设备即可。
- `adb devices` 查看连接设备信息。

![](https://tva1.sinaimg.cn/large/008i3skNly1gqtmowec6kj30sw0jl75h.jpg)

### 2. 示例

自动打开 Setting 5 秒重置回到 Home 页面

```python
from appium import webdriver
import time
# 自动打开 Setting 然后重置回到 Home 页面
config = {
    # 测试平台
    "platformName": "Android",
    # 版本号
    "platformVersion": "10",
    # 设备名，andriod可以为空，ios必须填写
    "deviceName": "192.168.56.101:5555",
    # Setting 包名
    "appPackage": "com.android.settings",
    # Setting 界面名
    "appActivity": "com.android.settings.Settings",
    # 是否重置
    "noRest": False
}

driver = webdriver.Remote("http://127.0.0.1:4723/wd/hub", config)
time.sleep(5)
driver.quit()
```

<!-- ![](https://tva1.sinaimg.cn/large/008i3skNly1gqtvsrye5hj30sw0g9mz0.jpg) -->

<!-- ![](https://tva1.sinaimg.cn/large/008i3skNly1gqtvt23pr8g30sw0g9dp0.gif)  -->

<iframe src="https://tva1.sinaimg.cn/large/008i3skNly1gqtvt23pr8g30sw0g9dp0.gif" 
frameborder="no" loading="lazy" height="585" width="100%"></iframe>
