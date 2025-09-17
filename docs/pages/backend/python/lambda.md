---
# autoGroup-5: 其他
title: Lambda表达式
date: 2020-04-19
categories:
- Backend
tags:
- Python
---

::: tip
 在python里面，如果一个函数只有一句话的话，可以用一种叫lambda表达式的东西代替。
:::

- **示例一：**
```py
def power(x):
    return x * x

print(power(5))   # 25
```

上面的函数只有一个 `return` 语句，那么就可以用 `lambda` 表达式来简写

```py
power = lambda x: x * x

print(power(5))   # 25
```

- **示例二：**

```py
def sum(x, y):
    return x + y

print(sum(3, 4))  # 7
```
用 `lambda` 表达式简写

```py
sum = lambda x, y: x + y

print(sum(3, 4))  #7
```

- **示例三：**

[:link: test.csv ](https://github.com/TienOUC/dataset/blob/master/country/countries_zh.csv)

```py
countries = []
file = open('./test.csv', 'r')
for line in file:
    line = line.strip()
    arr = line.split(',')
    country_name = arr[1]
    capital = arr[3]
    population = int(arr[4])
    countries.append((country_name, capital, population))
file.close()

def population_incre(country):
    return country[2]

countries.sort(key = population_incre)

for country in countries:
    print(country)  #按人口总数升序排列

```

用 `lambda` 简写 `sort` 的 `key` ，省去了定义 `population_incre`  函数

```py
countries = []
file = open('./test.csv', 'r')

for line in file:
    line = line.strip()
    arr = line.split(',')
    country_name = arr[1]
    capital = arr[3]
    population = int(arr[4])
    countries.append((country_name, capital, population))

countries.sort(key = lambda country: country[2])

for country in countries:
    print(country)  #按人口总数升序排列
```

- **示例四：**

```py
def quadratic(a, b, c):
    return lambda x: a * pow(x, 2) + b * x + c

f = quadratic(2, -1, 1)   # f(x) = 2x² - x + 1
print(f(3))   #16
print(quadratic(2, -1, 1)(3))   #16
```