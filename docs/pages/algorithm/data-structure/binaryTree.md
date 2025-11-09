---
autoGroup-0: Binary Tree
title: 二叉树基本概念和DSF、BSF
sidebarDepth: 4
date: 2022-04-21
categories:
  - Algorithm
tags:
  - Data Structure
---

## 1. 基本概念

:::tip

1. 定义  
   二叉树由节点（Node） 和边（Edge） 组成，满足：  
   有且仅有一个根节点（无父节点的节点）  
   每个节点最多有两个子节点，分别称为左子节点（Left Child）和右子节点（Right Child）  
   没有子节点的节点称为叶子节点（Leaf Node）  
   除根节点外，每个节点有且仅有一个父节点

2. 核心术语  
   节点深度：从根节点到当前节点的路径上的节点数（根节点深度 = 1）  
   节点高度：从当前节点到最远叶子节点的路径上的节点数（叶子节点高度 = 1）  
   树的深度 / 高度：根节点的高度（即整棵树的最大深度）  
   子树：以某个节点为根的局部树形结构（左子树 = 左子节点 + 其后代，右子树同理）

3. 可视化示例（经典二叉树）

```plaintext
        3        // 根节点（深度=1，高度=3）
       / \
      9  20      // 9是左子节点（叶子节点，高度=1）；20是右子节点（深度=2）
        /  \
       15   7    // 15、7是叶子节点（深度=3，高度=1）
```

4. 二叉树的应用场景

- 搜索与排序：二叉搜索树、红黑树用于高效查找（如数据库索引）、排序；
- 算法题：递归 / 回溯（如 N 皇后问题）、动态规划（如二叉树的最大路径和）的核心载体；
- 文件系统：操作系统的文件目录结构（本质是多叉树，二叉树是其简化模型）；
- 表达式求值：后缀表达式（逆波兰表达式）可通过二叉树构建和遍历实现；
- 缓存淘汰：LRU 缓存的底层实现可基于二叉搜索树优化。
  :::

## 2. DFS

### 2.1 前序遍历

```javascript
/**
 * 二叉树的前序遍历
 * 前序遍历顺序：根节点 -> 左子树 -> 右子树
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {Array} - 按前序遍历顺序存储的节点值数组
 */
function preorderTraversal(root) {
  // 用于存储遍历结果的数组
  const res = [];

  /**
   * 递归遍历函数
   * @param {TreeNode} node - 当前遍历的节点
   */
  function traverse(node) {
    // 基线条件：如果节点为空，则返回
    if (node === null) return;
    // 访问根节点，将节点值加入结果数组
    res.push(node.val);
    // 递归遍历左子树
    traverse(node.left);
    // 递归遍历右子树
    traverse(node.right);
  }

  // 从根节点开始遍历
  traverse(root);
  // 返回遍历结果
  return res;
}
```

### 2.2 中序遍历

```javascript
/**
 * 二叉树的中序遍历
 * 中序遍历顺序：左子树 -> 根节点 -> 右子树
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {Array} - 按中序遍历顺序存储的节点值数组
 */
function inorderTraversal(root) {
  // 用于存储遍历结果的数组
  const res = [];

  /**
   * 递归遍历函数
   * @param {TreeNode} node - 当前遍历的节点
   */
  function traverse(node) {
    // 基线条件：如果节点为空，则返回
    if (node === null) return;
    // 先递归遍历左子树
    traverse(node.left);
    // 访问根节点，将节点值加入结果数组
    res.push(node.val);
    // 再递归遍历右子树
    traverse(node.right);
  }

  // 从根节点开始遍历
  traverse(root);
  // 返回遍历结果
  return res;
}
```

### 2.3 后序遍历

```javascript
function postorderTraversal(root) {
  const res = [];
  function traverse(node) {
    if (node === null) return;
    traverse(node.left);
    traverse(node.right);
    res.push(node.val);
  }
  traverse(root);
  return res;
}
```

## 2. BFS(层序遍历)

```javascript
function levelOrderTraversal(root){
  // 边界情况
  if(root === null) return []
  // 结果数组
  const res = []
  // 初始化队列，放入根节点
  const queue = [root]

  // 队列不为空时循环遍历
  while(queue.length){
    //从队列头部取出节点
    const node = queue.shift()
    // 访问取出的节点
    res.push(node.val)
    // 将上一步取出节点的左右子节点依次压入队列
    if(node.left) queue.push(node.left)
    if(node.right) queue.push(node.right)
  }

  rerurn res
}

```

## 3. 二叉树最大深度

### 3.1 DFS 递归求解最大深度

```js
// DFS 递归求解最大深度
function maxDepth(root) {
  // 边界条件 空节点深度为0
  if (!root) return 0;
  // 递归左右子树
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  // 返回子树最大深度 + 1（根节点）
  return Math.max(leftDetph, rightdepth) + 1;
}
```

### 3.2 BFS 迭代解法

```js
// BFS 迭代解法
function maxDepth(root) {
  if (!root) return 0;

  const queue = [root];
  let depth = 0;

  while (queue.legth > 0) {
    const levelSize = queue.legth;
    // 遍历当前层所有节点
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      // 左右子节点入队
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // 遍历完一层，深度 + 1
    depth++;
  }
  return depth;
}
```

## 4. 常见二叉树分类

### 4.1 满二叉树（Full Binary Tree）

> 定义：所有非叶子节点都有两个子节点，且所有叶子节点在同一层  
> 性质：深度为 h 的满二叉树，节点总数 = 2ⁿ - 1（n 为深度）

```plaintext
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

### 4.2 完全二叉树（Complete Binary Tree）

> 定义：按「层序遍历顺序」（从上到下、从左到右）填充节点，中间不允许有空缺（叶子节点只能在最下层或次下层，且最下层叶子靠左排列）  
> 应用：堆排序的底层结构（大顶堆、小顶堆），便于用数组存储（节点 i 的左子节点 = 2i，右子节点 = 2i+1）

```plaintext
        1
       / \
      2   3
     / \ /
    4  5 6
```

### 4.3 二叉搜索树（BST，Binary Search Tree）

> 定义：满足「左子树所有节点值 < 根节点值 < 右子树所有节点值」的二叉树（左小右大），且左右子树也需满足该规则。  
> 核心优势：中序遍历结果为升序数组，支持高效的查找、插入、删除（平均时间复杂度 O (logn)）

```plaintext
        5
       / \
      3   7
     / \ / \
    2  4 6  8
```

### 4.4 平衡二叉树（Balanced Binary Tree）

> 定义：左右子树的高度差（平衡因子）的绝对值 ≤ 1，且左右子树也为平衡二叉树  
> 作用：解决二叉搜索树的退化问题，保证查找、插入、删除的时间复杂度稳定在 O (logn)  
> 常见类型：AVL 树（严格平衡，平衡因子 = 左高 - 右高）、红黑树（近似平衡，通过颜色翻转和旋转维持平衡）
