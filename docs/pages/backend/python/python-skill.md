---
# autoGroup-5: 其他
title: Python常用技巧
date: 2020-05-19
categories:
- Backend
tags:
- Python
---

## 1. 三元运算
```py
num = 10
if num < 9:
    print('true')
else:
    print('false')

# 三元简写   
print( 'true' if num < 9 else 'false')  # 'false'
```

## 2. 变量交换 
```py
a, b = 2, 3

# 传统思维
temp = a 
a = b 
b = temp

# 简写
a, b = b, a # 3, 2
```

## 3. 字典合并（dictionary merging）

:::danger
⚠️注意，当存在同名健值对，后面的会覆盖掉前面的，因为dict类型不允许有同名键，而且键只能是不可变类型（数字、字符串、元组），列表就不能作为键使用。
:::

- `**`解包（unpacking）   
```py
a = {'name': 'abc', 'age': 19}
b = {'job': 'student', 'gender': 'male'}
c = {'name': 'ABC', 'age': 20}
print({**a, **b})   #{'name': 'abc', 'age': 19, 'job': 'student', 'gender': 'male'}
print({**a, **c})   #{'name': 'ABC', 'age': 20}   ## danger
```

- update()
```py
a = {'name': 'abc', 'age': 19}
b = {'job': 'student', 'gender': 'male'}
c = {'name': 'ABC', 'age': 20}

d = {}
d.update(a)
d.update(c)
print(d)    #{'name': 'abc', 'age': 19, 'job': 'student', 'gender': 'male'}
```

- 循环添加
```py
a = {'name': 'abc', 'age': 19}
b = {'job': 'student', 'gender': 'male'}
c = {'name': 'ABC', 'age': 20}

d = {}
for k,v in a.items():
    d[k] = v

for k,v in c.items():
    d[k] = v

print(d)        # {'name': 'ABC', 'age': 20}  ## danger
```

- dict()
```py
# 低版本适用
d = dict(a.items() + b.items())
```

## 4. 字符串格式化   
待拼接字符串变量，这里不使用 `urllib.parse.urlencode(_params)`
```py
url = 'https://zhibo.sina.com.cn/api/zhibo/feed'
_params = {
  "page": 1,
  "page_size": 100,
  "zhibo_id": 152,
  "tag_id": 0,
  "dire": 'f',
  "dpc": 1,
  "type": 0
}
```

- `+`拼接

```py
res = ''
for k in _params:
    res += '&' + str(k) + '=' + str(_params[k])

res = res[1:]   # 去掉首位多余的一个  &
url = url + '?' + res[1:]   
print(url)  # https://zhibo.sina.com.cn/api/zhibo/feed?age=1&page_size=100&zhibo_id=152&tag_id=0&dire=f&dpc=1&type=0
```

- `s%`拼接
```py
res = ''
for k in _params:
    res += '&%s=%s' % (str(k), _params[k])

url = 's%?s%' % (url, res[1:])  
print(url)  # https://zhibo.sina.com.cn/api/zhibo/feed?age=1&page_size=100&zhibo_id=152&tag_id=0&dire=f&dpc=1&type=0
```

- `''.format()`
```py
res = ''
for k in _params:
    res += '&{}={}'.format(str(k), _params[k])

url = '{}?{}'.format(url, res[1:])
print(url)  # https://zhibo.sina.com.cn/api/zhibo/feed?age=1&page_size=100&zhibo_id=152&tag_id=0&dire=f&dpc=1&type=0
```

- `f-string` 
:::tip
v3.6以上
:::   

```py
res = ''
for k in _params:
    res += f'&{k}={_params[k]}'

res = res[1:]   # 去掉首位多余的一个  &
url = f'{url}?{res[1:]}' 
print(url)  # https://zhibo.sina.com.cn/api/zhibo/feed?age=1&page_size=100&zhibo_id=152&tag_id=0&dire=f&dpc=1&type=0
```

## 5. 列表解析（List Comprehension）
- 循环
```py
fruit  = ['apple', 'pear', 'banana', 'cheery']

for i in range(len(fruit)):
   fruit[i] = fruit[i].upper()

print(fruit)    #['APPLE', 'PEAR', 'BANANA', 'CHEERY']
```
- 列表构造
```py
fruit  = ['apple', 'pear', 'banana', 'cheery']
fruit = [x.upper() for x in fruit] 
print(fruit)    #['APPLE', 'PEAR', 'BANANA', 'CHEERY']

# 扩展 #只大写首字母
fruit = [x[:1].upper() + x[1:] for x in fruit]  
print(fruit)    #['Apple', 'Pear', 'Banana', 'Cheery']
```
## 6. 序列解包（Sequence Unpacking）
```py
name = 'ABC 123'
str_list = name.split()
print(str_list[0])  #'ABC'
print(str_list[1])  #'123'

a, b = name.split()
print(a)  #'ABC'
print(b)  #'123'
```

## 7. Enumerate 函数

```py
fruit  = ['apple', 'pear', 'banana', 'cheery']
a = []
b = []

for index, value in enumerate(fruit):
    a.append(index)
    b.append(value)

print(a)    #[0, 1, 2, 3]
print(b)    #['apple', 'pear', 'banana', 'cheery']
```

## 8. 按序遍历（Looping in Sorted Order）
```py
fruit  = ['apple', 'pear', 'banana', 'cheery']
a = []
b = []
# 反序 reversed(fruit)
for index, value in enumerate(sorted(fruit)):
    a.append(index)
    b.append(value)

print(a)    #[0, 1, 2, 3]
print(b)    #['apple', 'banana', 'cheery', 'pear']   按字母顺序输出sort()会改变原数组，sorted()会生成新数组
```
## 9. yield
```py
def fib(n):
    a = 0
    b = 1
    nums = []
    while a < n:
        nums.append(a)
        a, b = b , a + b
    return nums

for i in fib(30):
    print(i)
# 满足条件的元素全部压入nums列表之后才执行for循环

==============yield==============
def fib(n):
    a = 0
    b = 1
    while a < n:
        yield a     # 不用等全部列表元素循环压入结束，而是立马将 a 抛出去，常用于耗时操作
        a, b = b , a + b

for i in fib(30):
    print(i)
```

## 10. with & try...except
```py
file = open('./test.json', 'r')
...
file.close()

## 使用with语句就省去了close()
with open('./test.json', 'w', encoding = 'utf8') as json_file:
    json.dump(res_data, json_file, ensure_ascii = False)

## 想要处理err时候，用 try...except
try:
    with open('./test.json', 'w', encoding = 'utf8') as json_file:
        json.dump(res_data, json_file, ensure_ascii = False)
except ValueError as err:
    print(err)
```
