---
# autoGroup-5: 其他
title: Decorator(装饰器)
date: 2020-04-19
categories:
- Backend
tags:
- Python
---

输出小于10000的所有质数，并打印程序执行耗时

```py
import time
def is_prime(num):
    if num < 2:
        return False
    elif num == 2:
        return True
    else:
        for i in range(2, num):
            if(num % i == 0):
                return False
        return True

def prime_nums():
    t1 = time.time()
    for i in range(2, 10000):
        if(is_prime(i)):
            print(i)
    t2 = time.time()
    print(t2 - t1)  

prime_nums()    #输出 < 10000 的质数，耗时0.8771088123321533

```

为了不重复相同的代码，现在我们想把计算耗时的代码抽离出来，这就用到了 `decorator`

```py
import time

# 装饰器
def display_time(func):
    def wrapper():
        t1 = time.time()
        func()      # 这里的func()就是执行了prime_nums()
        t2 = time.time()
        # print(t2 - t1)  
        print('Total time: {:.4}s'.format(t2 - t1))
    return wrapper

#输出质数
def is_prime(num):
    if num < 2:
        return False
    elif num == 2:
        return True
    else:
        for i in range(2, num):
            if(num % i == 0):
                return False
        return True

# 在执行函数前面用@引入装饰器函数
@display_time
def prime_nums():
    for i in range(2, 10000):
        if(is_prime(i)):
            print(i)

# 同样会输出小于10000的所有质数，并打印所耗时长
```

当 `prime_nums` 有返回值时该怎么修改装饰器呢， 例如这里我们让 `prime_nums` 函数返回符合条件的质数总个数

```py
import time

# 装饰器
def display_time(func):
    def wrapper():
        t1 = time.time()
        result = func()      # 使用result接收count
        t2 = time.time()
        # print(t2 - t1)  
        print('Total time: {:.4}s'.format(t2 - t1))
        return result         #将result也就是count返回出去
    return wrapper

#输出质数
def is_prime(num):
    if num < 2:
        return False
    elif num == 2:
        return True
    else:
        for i in range(2, num):
            if(num % i == 0):
                return False
        return True

# 在执行函数前面用@引入装饰器函数
@display_time
def prime_nums():
    count = 0 
    for i in range(2, 10000):
        if(is_prime(i)):
            count += 1
    return count

# 同样会输出小于10000的所有质数，并打印所耗时长
```
当`prime_nums` 有参数时该怎么修改装饰器呢， 例如这里我们让 `prime_nums` 函数带一个 `maxnum` 的形参

```py
import time
def display_time(func):
    def wrapper(*args):     #传入参数（即 maxnum），*表示可以接收多个参数
        t1 = time.time()
        result = func(*args)        #传入参数（即 maxnum），*表示可以接收多个参数
        t2 = time.time()
        # print(t2 - t1)  
        print('Total time: {:.4}s'.format(t2 - t1))
        return result
    return wrapper


def is_prime(num):
    if num < 2:
        return False
    elif num == 2:
        return True
    else:
        for i in range(2, num):
            if(num % i == 0):
                return False
        return True

@display_time
def prime_count(maxnum):
    count = 0
    for i in range(2, maxnum):
        if(is_prime(i)):
            count += 1
    return count

cont = prime_count(10000)
print(cont) # 0.41106200218200684   1229
```
