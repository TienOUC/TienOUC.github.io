---
# autoGroup-5: 其他
title: Request
date: 2020-05-19
categories:
- Backend
tags:
- Python
---

```py
import urllib.parse
import urllib.request
import json

endpoint = 'https://zhibo.sina.com.cn/api/zhibo/feed'
_params = {
  "page": 1,
  "page_size": 100,
  "zhibo_id": 152,
  "tag_id": 0,
  "dire": 'f',
  "dpc": 1,
  "type": 0
}

#把parmas转换为url编码
params = urllib.parse.urlencode(_params)

#params注入，拼接url
url = endpoint + '?' + params

#如果有header的话，在Request第二个参数注入
# request = urllib.request.Request(url, header)
request = urllib.request.Request(url)

#请求结果
response = urllib.request.urlopen(request).read()

#读取结果
result_data = json.loads(response)

# print(result_data)
# 把数据以json格式写入同目录下的.json文件
try:
    with open('./test.json', 'w', encoding = 'utf8') as json_file:
        json.dump(result_data, json_file, ensure_ascii = False)
    # with 关键字自带close（with是try-finally的简写，但不完全相同）
    # print(json_file.closed)  // True
except ValueError as err:
    print(err)
```