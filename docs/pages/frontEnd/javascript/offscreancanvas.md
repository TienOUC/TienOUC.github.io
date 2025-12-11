# 一、OffscreenCanvas 是什么？

[MDN-OffscreenCanvas](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas)

OffscreenCanvas 是 HTML Canvas API 的扩展特性（实验），是一个脱离 DOM 树的独立画布对象，核心作用是将画布的渲染操作与 UI 主线程分离，允许在 Web Worker（后台线程） 中执行图形绘制逻辑。

## 1. 与传统 canvas 的核心区别

| 特性     | 传统 canvas                        | OffscreenCanvas            |
| -------- | ---------------------------------- | -------------------------- |
| DOM 依赖 | 必须绑定页面中的 canvas 元素       | 无 DOM 依赖，可独立创建    |
| 渲染线程 | 只能在 UI 主线程执行               | 可在 Web Worker 中执行     |
| 性能瓶颈 | 易被主线程的 UI 操作、布局计算阻塞 | 避免主线程阻塞，渲染更流畅 |

## 2. 核心能力

- 多渲染上下文支持：兼容 2D、WebGL 1/2、WebGPU 等，覆盖简单 2D 到高性能 3D 渲染需求。
- 零拷贝数据传递：支持 Transferable Objects，通过 postMessage 传递画布控制权或大数据（如 ImageBitmap），无拷贝开销。
- 灵活创建方式：
  - 从现有 canvas 转移控制权：canvas.transferControlToOffscreen()
  - 独立创建：new OffscreenCanvas(width, height)

# 二、OffscreenCanvas 的主要使用场景

核心价值是解放主线程、提升渲染性能，适用于渲染压力大、高频重绘或大数据处理的场景。

## 1. 高性能 Web 游戏开发

- 场景背景：游戏需 60fps+ 渲染循环，传统 canvas 易被主线程任务阻塞导致掉帧。
- 解决思路：Worker 处理渲染逻辑（场景绘制、动画、粒子效果），主线程处理用户输入和游戏逻辑（碰撞检测）。
- 典型例子：WebGL/WebGPU 3D 游戏、像素游戏、多人在线游戏（MMO）。

## 2. 大数据量数据可视化

- 场景背景：十万级数据点图表、GIS 地图、金融交易数据等绘制占用大量主线程资源。
- 解决思路：Worker 完成数据计算 / 格式化，通过 OffscreenCanvas 绘制；主线程仅处理交互控制（缩放、筛选）。
- 典型例子：
  - 地理信息：GIS 矢量图层渲染
  - 科学可视化：气象数据分布图

# 三、使用注意事项

- 浏览器兼容性：Chrome/Firefox/Edge 支持完善；Safari 16+ 支持 2D 上下文，17+ 逐步支持 WebGL。
- 无 DOM 访问：Worker 中无法使用 document、element.style，画布样式 / 尺寸需通过 postMessage 传递。
- 数据传递优化：优先使用 Transferable Objects 传递大数据，避免结构化克隆开销。
- 上下文特性差异：部分渲染上下文方法在 Worker 中存在限制（如早期 2D 上下文 measureText()），需测试适配。

# 四、示例代码

## 1. 主线程代码

```js
// 获取页面 canvas 元素
const canvas = document.querySelector('canvas');
// 转移控制权到 OffscreenCanvas
const offscreen = canvas.transferControlToOffscreen();

// 创建 Web Worker
const worker = new Worker('canvas-worker.js');
// 传递 OffscreenCanvas 到 Worker（使用 Transferable 转移）
worker.postMessage({ type: 'init', canvas: offscreen }, [offscreen]);

// 传递尺寸更新参数
worker.postMessage({
  type: 'resize',
  width: canvas.width,
  height: canvas.height
});
```

## 2. Worker 线程代码

```js
let offscreenCanvas;
let ctx;

// 监听主线程消息
self.onmessage = (e) => {
  switch (e.data.type) {
    case 'init':
      offscreenCanvas = e.data.canvas;
      ctx = offscreenCanvas.getContext('2d');
      render(); // 启动渲染循环
      break;
    case 'resize':
      offscreenCanvas.width = e.data.width;
      offscreenCanvas.height = e.data.height;
      break;
  }
};

// 渲染循环（随机绘制圆形）
function render() {
  // 清空画布
  ctx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

  // 绘制随机颜色、位置的圆
  ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
  ctx.beginPath();
  ctx.arc(
    Math.random() * offscreenCanvas.width,
    Math.random() * offscreenCanvas.height,
    20,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // 持续渲染（60fps）
  requestAnimationFrame(render);
}
```
