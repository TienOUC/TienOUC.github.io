---
# autoGroup-5: 其他
title: Scrapy
date: 2021-06-02
categories:
- Backend
tags:
- Python
- Scrapy
---

## 摘要

- [ Scrapy ](https://scrapy.org/) 是由 `Python` 开发的一个快速、高层次的屏幕抓取和 web 抓取框架，用于抓取 web 站点并从中提取结构化的数据。   

- 可用于 `数据挖掘`、`监测`、`自动化测试`。

## 1. 安装（macOS）

```shell
# Python 3.8.8
# Scrapy 2.5.0
pip3 install scrapy

# 安装完成后使用 scrapy version -v 查看 scrapy 及其各依赖库、平台版本
(base) ➜  ~ scrapy version -v
Scrapy       : 2.5.0
lxml         : 4.6.3.0
libxml2      : 2.9.10
cssselect    : 1.1.0
parsel       : 1.6.0
w3lib        : 1.22.0
Twisted      : 21.2.0
Python       : 3.8.8 (default, Apr 13 2021, 12:59:45) - [Clang 10.0.0 ]
pyOpenSSL    : 20.0.1 (OpenSSL 1.1.1k  25 Mar 2021)
cryptography : 3.4.7
Platform     : macOS-10.16-x86_64-i386-64bit
(base) ➜  ~ 
```   
或者用 `Anaconda`（安装略）下载 `Scrapy`   
![](https://tva1.sinaimg.cn/large/008i3skNly1gr3ugooycvj30sw0j60tb.jpg)

- 框架示意图 
![](https://tva1.sinaimg.cn/large/008i3skNly1gr3v9m217lj30sw0lrq4w.jpg)

- **原理：**`Spider` 发起 `Request请求`（类封装url）， 经过中间件到达 `Engine`，`Engine` 接收到请求后，发送给 `Scheduler` 调度，`Scheduler` 再交给 `Downloader` 下载，返回 `Response对象`
给 `Spider`，`Spider` 对返回的 `Response对象` 进行解析，解析结果是 `Item` 就抛给 `Pipeline` 储存，是请求就扔给 `Engine` 继续发起请求，重复循环直到所有请求处理完成。

## 2. 命令

### 2.1 全局命令   
```shell
(base) ➜  ~ scrapy -h      
Usage:
  scrapy <command> [options] [args]

Available commands:
  bench         Run quick benchmark test    （测试本地硬件性能）
  commands      
  fetch         Fetch a URL using the Scrapy downloader     （取URL使用Scrapy下载）
  genspider     Generate new spider using pre-defined templates     （生成新的Spider预定义模版）
  runspider     Run a self-contained spider (without creating a project)      （运行单独的一个Spider文件）
  settings      Get settings values     （获取设置）
  shell         Interactive scraping console    （进入终端交互，调试）
  startproject  Create new project
  version       Print Scrapy version
  view          Open URL in browser, as seen by Scrapy （下载网页源码并在默认编辑器打开）
```

### 2.2  局部命令   

创建项目 `scrapy startproject top100mov`

```shell
(base) ➜ scrapy startproject top100mov         
New Scrapy project 'top100mov', using template directory '/Users/willtien/opt/anaconda3/lib/python3.8/site-packages/scrapy/templates/project', created in:
    /Volumes/Github HD/top100mov

You can start your first spider with:
    cd top100mov
    scrapy genspider example example.com
```

```shell
(base) ➜  ~ cd top100mov && scrapy -h
Scrapy 2.5.0 - project: top100mov

Usage:
  scrapy <command> [options] [args]

Available commands:
  bench         Run quick benchmark test
  check         Check spider contracts
  commands      
  crawl         Run a spider
  edit          Edit spider
  fetch         Fetch a URL using the Scrapy downloader
  genspider     Generate new spider using pre-defined templates
  list          List available spiders
  parse         Parse URL (using its spider) and print the results
  runspider     Run a self-contained spider (without creating a project)
  settings      Get settings values
  shell         Interactive scraping console
  startproject  Create new project
  version       Print Scrapy version
  view          Open URL in browser, as seen by Scrapy
```

使用预定义模版生成一个Spider `scrapy genspider top100mv bilibili.com`，目录 `spiders/top100mv.py`

- 项目目录   
```shell
top100mov
├── scrapy.cfg                          # Scrapy部署时的配置文件，定义了配置文件路径、部署相关信息等内容
├── top100mov
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-38.pyc
│   │   ├── items.cpython-38.pyc
│   │   ├── pipelines.cpython-38.pyc
│   │   └── settings.cpython-38.pyc
│   ├── items.py                        # Items定义抓取的数据结构
│   ├── middlewares.py                  # 定义Spider和Downloader的Middlewares中间件实现
│   ├── pipelines.py                    # 定义Item Pipeline的实现，即数据管道
│   ├── settings.py                     # 项目全局配置（其中 ROBOTSTXT_OBEY = True 设置是否遵守robots.txt rules）
│   └── spiders                         # 存放各个Spider
│       ├── __init__.py
│       ├── __pycache__
│       └── top100mv.py                 # 新建的Sipder文件
└── top100mv.json                       # 执行top100mv.py后输出的json格式数据文件
```

## 3. demo
抓取 bilibili 电影频道热播 top100 的`电影名`、`上映时间`、`评分`

### 3.1 文件定义

- 定义Item

```py
# items.py

import scrapy

class Top100MovItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    name = scrapy.Field()
    time = scrapy.Field()
    score = scrapy.Field()
```

- 修改seetings.py

```py
ITEM_PIPELINES = {
   'top100mov.pipelines.Top100MovPipeline': 300,
}
```

- 修改top100mv.py

```py
# top100mv.py

import scrapy
#导入Item类定义
from top100mov.items import Top100MovItem

class Top100mvSpider(scrapy.Spider):
    name = 'top100mv'
    allowed_domains = ['bilibili.com']
    #修改start_urls为电影热播TOP100的url
    start_urls = ['https://www.bilibili.com/v/popular/rank/movie']
    #response处理
    def parse(self, response):
        #电影信息列表
        mv_list = response.css('li.rank-item')
        for mv in mv_list:
            #实例化item
            item = Top100MovItem()
            #写入信息
            item['name'] = f'《{mv.css("a.title::text").extract_first()}》'
            item['time'] = mv.css('div.pgc-info::text').extract_first()
            item['score'] = mv.css('div.pts > div::text').extract_first()
            #抛出item至Pipeline存储
            yield item
```

若网站 `robots.txt` 拒绝爬取数据，可以将 `settings.py` 中的  `ROBOTSTXT_OBEY = True` 设置为 `Flase`。（爬取数据需遵守相关法律法规）      

执行 `scrapy crawl top100mv -o top100mv.json` ，项目根目录下生成 `top100mv.json` 文件。

```shell
(base) ➜  top100mov scrapy crawl top100mv -o top100mv.json           
2021-06-02 14:18:32 [scrapy.utils.log] INFO: Scrapy 2.5.0 started (bot: top100mov)
2021-06-02 14:18:32 [scrapy.utils.log] INFO: Versions: lxml 4.6.3.0, libxml2 2.9.10, cssselect 1.1.0, parsel 1.6.0, w3lib 1.22.0, Twisted 21.2.0, Python 3.8.8 (default, Apr 13 2021, 12:59:45) - [Clang 10.0.0 ], pyOpenSSL 20.0.1 (OpenSSL 1.1.1k  25 Mar 2021), cryptography 3.4.7, Platform macOS-10.16-x86_64-i386-64bit
2021-06-02 14:18:32 [scrapy.utils.log] DEBUG: Using reactor: twisted.internet.selectreactor.SelectReactor
2021-06-02 14:18:32 [scrapy.crawler] INFO: Overridden settings:
{'BOT_NAME': 'top100mov',
 'NEWSPIDER_MODULE': 'top100mov.spiders',
 'SPIDER_MODULES': ['top100mov.spiders']}
2021-06-02 14:18:32 [scrapy.extensions.telnet] INFO: Telnet Password: e45d00594b96f1e7
2021-06-02 14:18:33 [scrapy.middleware] INFO: Enabled extensions:
['scrapy.extensions.corestats.CoreStats',
 'scrapy.extensions.telnet.TelnetConsole',
 'scrapy.extensions.memusage.MemoryUsage',
 'scrapy.extensions.feedexport.FeedExporter',
 'scrapy.extensions.logstats.LogStats']
2021-06-02 14:18:33 [scrapy.middleware] INFO: Enabled downloader middlewares:
['scrapy.downloadermiddlewares.httpauth.HttpAuthMiddleware',
 'scrapy.downloadermiddlewares.downloadtimeout.DownloadTimeoutMiddleware',
 'scrapy.downloadermiddlewares.defaultheaders.DefaultHeadersMiddleware',
 'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware',
 'scrapy.downloadermiddlewares.retry.RetryMiddleware',
 'scrapy.downloadermiddlewares.redirect.MetaRefreshMiddleware',
 'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware',
 'scrapy.downloadermiddlewares.redirect.RedirectMiddleware',
 'scrapy.downloadermiddlewares.cookies.CookiesMiddleware',
 'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware',
 'scrapy.downloadermiddlewares.stats.DownloaderStats']
2021-06-02 14:18:33 [scrapy.middleware] INFO: Enabled spider middlewares:
['scrapy.spidermiddlewares.httperror.HttpErrorMiddleware',
 'scrapy.spidermiddlewares.offsite.OffsiteMiddleware',
 'scrapy.spidermiddlewares.referer.RefererMiddleware',
 'scrapy.spidermiddlewares.urllength.UrlLengthMiddleware',
 'scrapy.spidermiddlewares.depth.DepthMiddleware']
2021-06-02 14:18:33 [scrapy.middleware] INFO: Enabled item pipelines:
['top100mov.pipelines.Top100MovPipeline']
2021-06-02 14:18:33 [scrapy.core.engine] INFO: Spider opened
2021-06-02 14:18:33 [scrapy.extensions.logstats] INFO: Crawled 0 pages (at 0 pages/min), scraped 0 items (at 0 items/min)
2021-06-02 14:18:33 [scrapy.extensions.telnet] INFO: Telnet console listening on 127.0.0.1:6023
2021-06-02 14:18:33 [scrapy.downloadermiddlewares.redirect] DEBUG: Redirecting (302) to <GET https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D> from <GET https://www.bilibili.com/v/popular/rank/movie>
2021-06-02 14:18:33 [scrapy.core.engine] DEBUG: Crawled (200) <GET https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D> (referer: None)
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《生化危机：恶化》', 'score': '607487', 'time': '2008-10-18上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《欢乐糖果屋》', 'score': '111861', 'time': '1971-06-30上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《洛克》', 'score': '74362', 'time': '2013-09-02上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《让子弹飞》', 'score': '39916', 'time': '2010-12-16上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《王子复仇记》', 'score': '35407', 'time': '1948-05-06上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《超级大坏蛋》', 'score': '25965', 'time': '2010-11-05上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《虹猫蓝兔火凤凰》', 'score': '24976', 'time': '2010-02-05上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《上海堡垒》', 'score': '24231', 'time': '2019-08-09上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《寻汉计》', 'score': '22848', 'time': '2021-05-01上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《一秒钟》', 'score': '22538', 'time': '2020-11-27上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《正义联盟：扎克·施奈德版》', 'score': '20499', 'time': '2021-03-18上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《百万美元宝贝》', 'score': '19175', 'time': '2004-12-15上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《唐人街探案3》', 'score': '17139', 'time': '2021-02-12上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《温暖的抱抱》', 'score': '15632', 'time': '2020-12-31上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《夺宝奇兵》', 'score': '11947', 'time': '1981-06-12上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《罗小黑战记》', 'score': '11019', 'time': '2019-09-07上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《喜羊羊与灰太狼之牛气冲天》', 'score': '10242', 'time': '2009-01-16上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《夏目友人帐》', 'score': '10179', 'time': '2019-03-07上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《东方三侠》', 'score': '9480', 'time': '1993-02-12上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《第十一回》', 'score': '9309', 'time': '2021-04-02上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《你的名字。》', 'score': '9261', 'time': '2016-08-26上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《夺冠》', 'score': '8693', 'time': '2020-09-25上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《新神榜：哪吒重生》', 'score': '8248', 'time': '2021-02-12上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《邪不压正》', 'score': '8168', 'time': '2018-07-13上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《僵尸训练营》', 'score': '8015', 'time': '1990'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《Hello！树先生》', 'score': '7765', 'time': '2011-11-04上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《哆啦A梦：大雄的新恐龙》', 'score': '7700', 'time': '2020-12-11上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《蜘蛛侠：英雄归来》', 'score': '7562', 'time': '2017-09-08上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《玩命直播》', 'score': '7327', 'time': '2017-01-06上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《末日之战》', 'score': '7286', 'time': '2013-06-02上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《驯龙高手3》', 'score': '6777', 'time': '2019-03-01上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《紫罗兰永恒花园外传：永远与自动手记人偶》', 'score': '6571', 'time': '2020-01-10上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《天气之子》', 'score': '5990', 'time': '2019-11-01上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《城市猎人》', 'score': '5925', 'time': '2020-12-11上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《太阳照常升起》', 'score': '5755', 'time': '2007-09-21上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《功夫》', 'score': '5579', 'time': '2004-12-23上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《小兵张嘎》', 'score': '5264', 'time': '1963年'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《头文字D》', 'score': '5219', 'time': '2005-06-19上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《我在故宫修文物大电影》', 'score': '5186', 'time': '2016-12-16上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《猎杀T34》', 'score': '5143', 'time': '2020-12-11上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《姜子牙》', 'score': '5139', 'time': '2020-10-01上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《资本主义：一个爱情故事》', 'score': '5048', 'time': '2009-10-02上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《未来的未来》', 'score': '5037', 'time': '2020-11-06上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《西虹市首富》', 'score': '4844', 'time': '2018-07-27上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《谜情公寓》', 'score': '4765', 'time': '2004-09-03上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《灭绝》', 'score': '4604', 'time': '2018-07-27上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《游戏人生 零》', 'score': '4538', 'time': '2019-07-19上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《大块头有大智慧》', 'score': '4520', 'time': '2003-09-27上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《傲慢与偏见与僵尸》', 'score': '4358', 'time': '2016-02-05上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《哈利·波特与魔法石》', 'score': '4237', 'time': '2020-08-14上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《八月未央》', 'score': '4084', 'time': '2021-04-16上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《指环王2：双塔奇兵》', 'score': '3946', 'time': '2003-04-25上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《海绵宝宝》', 'score': '3911', 'time': '2015-12-01上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《哥斯拉2：怪兽之王》', 'score': '3879', 'time': '2019-05-31上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《指环王1：护戒使者》', 'score': '3836', 'time': '2002-04-04上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《窈窕淑女》', 'score': '3834', 'time': '1964-12-25上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《命运之夜——天之杯：恶兆之花》', 'score': '3681', 'time': '2019-01-11上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《夏洛特烦恼》', 'score': '3664', 'time': '2015-09-30上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《信条》', 'score': '3631', 'time': '2020-09-04上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《声之形》', 'score': '3570', 'time': '2017-09-08上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《我想吃掉你的胰脏》', 'score': '3559', 'time': '2019-01-18上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《无人区》', 'score': '3526', 'time': '2013-12-03上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《武林外传》', 'score': '3484', 'time': '2011-01-26上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《刀剑神域：序列之争》', 'score': '3441', 'time': '2017-09-15上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《命运之夜——天之杯II ：迷失之蝶》', 'score': '3423', 'time': '2019-07-12上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《名侦探柯南：绀青之拳》', 'score': '3384', 'time': '2019-09-13上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《教父》', 'score': '3383', 'time': '1972-03-15上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《我是你爸爸》', 'score': '3290', 'time': '2000-08-11上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《男儿本色》', 'score': '3281', 'time': '2007-07-19上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《姚明年》', 'score': '3215', 'time': '2004-09-16上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《八佰》', 'score': '3187', 'time': '2020-08-21上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《绣春刀》', 'score': '3131', 'time': '2014-08-07上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《肖申克的救赎》', 'score': '3110', 'time': '1994-09-23上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《哪吒之魔童降世》', 'score': '3044', 'time': '2019-07-26上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《疯狂原始人2》', 'score': '3026', 'time': '2020-11-27上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《神奇女侠1984》', 'score': '3020', 'time': '2020-12-18上映'}
2021-06-02 14:18:33 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《指环王3：王者归来》', 'score': '2962', 'time': '2004-03-12上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《建国大业》', 'score': '2872', 'time': '2009-09-16上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《哈利·波特与密室》', 'score': '2850', 'time': '2003-01-24上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《我不是药神》', 'score': '2832', 'time': '2018-07-05上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《终结者3》', 'score': '2814', 'time': '2003-08-29上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《查理和巧克力工厂》', 'score': '2767', 'time': '2005-07-15上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《海绵宝宝历险记》', 'score': '2633', 'time': '2004-11-19上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《深夜食堂》', 'score': '2626', 'time': '2015-01-13上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《环太平洋》', 'score': '2608', 'time': '2013-07-31上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《建党伟业》', 'score': '2563', 'time': '2011-06-15上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《星际穿越》', 'score': '2532', 'time': '2020-08-02上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《帝国的毁灭》', 'score': '2526', 'time': '2004-09-08上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《绿皮书》', 'score': '2512', 'time': '2019-03-01上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《招魂》', 'score': '2503', 'time': '2013-06-08上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《大侦探皮卡丘》', 'score': '2489', 'time': '2019-05-10上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《康斯坦丁：恶魔之城》', 'score': '2473', 'time': '2018-10-09上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《女王的柯基》', 'score': '2470', 'time': '2019-08-30上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《灵魂战车》', 'score': '2410', 'time': '2007-06-02上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《霍比特人1：意外之旅》', 'score': '2380', 'time': '2012-11-28上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《全职高手之巅峰荣耀》', 'score': '2352', 'time': '2019-08-16上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《恋上你的床》', 'score': '2343', 'time': '2003-07-25上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《怦然心动》', 'score': '2331', 'time': '2010-07-26上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《小教父》', 'score': '2331', 'time': '1983-03-25上映'}
2021-06-02 14:18:34 [scrapy.core.scraper] DEBUG: Scraped from <200 https://www.bilibili.com/v/popular/rank/movie?rt=V%2FymTlOu4ow%2Fy4xxNWPUZ23iQoiQpXQbwVei6zGj9Hk%3D>
{'name': '《建军大业》', 'score': '2317', 'time': '2017-07-27上映'}
2021-06-02 14:18:34 [scrapy.core.engine] INFO: Closing spider (finished)
2021-06-02 14:18:34 [scrapy.extensions.feedexport] INFO: Stored json feed (100 items) in: top100mv.json
2021-06-02 14:18:34 [scrapy.statscollectors] INFO: Dumping Scrapy stats:
{'downloader/request_bytes': 606,
 'downloader/request_count': 2,
 'downloader/request_method_count/GET': 2,
 'downloader/response_bytes': 27463,
 'downloader/response_count': 2,
 'downloader/response_status_count/200': 1,
 'downloader/response_status_count/302': 1,
 'elapsed_time_seconds': 0.820925,
 'feedexport/success_count/FileFeedStorage': 1,
 'finish_reason': 'finished',
 'finish_time': datetime.datetime(2021, 6, 2, 6, 18, 34, 36106),
 'httpcompression/response_bytes': 164537,
 'httpcompression/response_count': 1,
 'item_scraped_count': 100,
 'log_count/DEBUG': 102,
 'log_count/INFO': 11,
 'memusage/max': 52387840,
 'memusage/startup': 52383744,
 'response_received_count': 1,
 'scheduler/dequeued': 2,
 'scheduler/dequeued/memory': 2,
 'scheduler/enqueued': 2,
 'scheduler/enqueued/memory': 2,
 'start_time': datetime.datetime(2021, 6, 2, 6, 18, 33, 215181)}
2021-06-02 14:18:34 [scrapy.core.engine] INFO: Spider closed (finished)
(base) ➜  top100mov 
```