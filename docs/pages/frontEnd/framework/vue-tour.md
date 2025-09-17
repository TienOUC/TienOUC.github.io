---
autoGroup-1: Vue
title: 'vue-tour二次封装'
date: 2023-7-22
categories:
  - FrontEnd
tags:
  - Framework
  - Vue
---

## 1. 安装 [vue-tour](https://pulsardev.github.io/vue-tour/)

`npm install vue-tour`

## 2. 二次封装

核心点：

```html
<template v-for="(_, slotName) in $scopedSlots" #[slotName]="slotProps">
  <slot :name="slotName" v-bind="slotProps" :tour="tour"></slot>
</template>
```

```html
<template>
  <div class="demo-tour">
    <v-tour
      ref="v-tour"
      :name="name"
      :steps="customSteps"
      :callbacks="callbacks"
      :options="options"
    >
      <template slot-scope="tour">
        <Transition name="fade">
          <v-step
            v-if="tour.steps[tour.currentStep]"
            :key="tour.currentStep"
            :step="tour.steps[tour.currentStep]"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :skip="tour.skip"
            :finish="tour.finish"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
          >
            <template
              v-for="(_, slotName) in $scopedSlots"
              #[slotName]="slotProps"
            >
              <slot :name="slotName" v-bind="slotProps" :tour="tour"></slot>
            </template>

            <div slot="actions">
              <div
                v-if="steps.length === 1"
                class="v-step__buttons v-step__single-buttons"
              >
                <div
                  v-if="knowMore"
                  class="v-step__button-more v-step__button"
                  @click="callbacks.onMore(tour)"
                >
                  了解更多
                </div>
                <div
                  class="v-step__button-know v-step__button"
                  @click="handleFinish(tour)"
                >
                  我知道了
                </div>
              </div>

              <div v-else class="v-step__buttons">
                <div
                  class="v-step__button v-step__button-skip"
                  @click="tour.skip"
                >
                  跳过
                </div>
                <div>
                  <div
                    v-if="knowMore"
                    class="v-step__button-more v-step__button"
                    @click="callbacks.onMore(tour)"
                  >
                    了解更多
                  </div>
                  <div
                    v-if="tour.currentStep !== 0"
                    class="v-step__button v-step__button-previous"
                    @click="tour.previousStep"
                  >
                    <i class="iconfont icon-back"></i>
                    上一步
                  </div>
                  <div
                    v-if="tour.currentStep !== steps.length - 1"
                    class="v-step__button v-step__button-next"
                    @click="tour.nextStep"
                  >
                    下一步
                    <i class="iconfont icon-right"></i>
                  </div>
                  <div
                    v-if="tour.currentStep === steps.length - 1"
                    class="v-step__button v-step__button-finish"
                    @click="handleFinish(tour)"
                  >
                    完成
                  </div>
                </div>
              </div>
            </div>
          </v-step>
        </Transition>
      </template>
    </v-tour>
  </div>
</template>

<script>
  export default {
    name: 'DemoTour',
    inheritAttrs: false,
    props: {
      // 唯一
      name: {
        type: String,
        default: ''
      },
      steps: {
        type: Array,
        default: () => []
      },
      // 了解更多按钮可配置，默认不展示
      knowMore: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        default: () => ({})
      },
      callbacks: {
        onStart: () => {},
        onPreviousStep: () => {},
        onNextStep: () => {},
        onStop: () => {},
        onSkip: () => {},
        onFinish: () => {},
        onMore: () => {}
      }
    },

    computed: {
      customSteps() {
        return this.steps.map((item) => {
          const formatStepOption = {
            header: {
              title: item.title
            },
            content: item.content,
            target: item.target,
            params: {
              highlight: true,
              enableScrolling: false,
              placement: item.placement || 'bottom'
            }
          };
          return formatStepOption;
        });
      }
    },
    methods: {
      start() {
        if (this.name && localStorage.getItem(this.name) !== 'true') {
          this.$tours[this.name].start();
        }
      },
      handleFinish(tour) {
        localStorage.setItem(this.name, true);
        tour.finish();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import url('vue-tour/dist/vue-tour.css');
  .demo-tour {
    .v-tour {
      ::v-deep {
        .v-step {
          padding: 16px;
          min-width: 320px;
          max-width: fit-content;
          border-radius: 7px;

          // background-color: $blue-5;
          background-color: #0078ff;
          .v-step__header {
            margin: 0;
            padding: 0;
            font-size: 16px;
            font-weight: 600;
            border-radius: 7px;
            text-align: left;
            background-color: #0078ff;
            line-height: 24px;
            > div {
              font-size: 16px;
            }
          }
          .v-step__content {
            margin: 0;
            padding: 8px 0 16px;
            text-align: left;
            white-space: pre-wrap;
            line-height: 20px;
          }
          .v-step__buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .v-step__button {
              display: inline-flex;
              align-items: center;
              margin: 0;
              padding: 6px 8px;
              height: unset;
              font-size: 14px;
              border: none;
              border-radius: 5px;
              background: rgba(255, 255, 255, 0.2);
              line-height: 16px;
              .icon-back {
                margin-right: 4px;
              }
              .icon-right,
              .icon-check {
                margin-left: 4px;
              }
            }
            .v-step__button-skip,
            .v-step__button-more {
              color: #fff;
              background-color: transparent;
              &:hover {
                background: rgba(255, 255, 255, 0.4);
              }
            }
            .v-step__button-know,
            .v-step__button-previous,
            .v-step__button-next,
            .v-step__button-stop,
            .v-step__button-finish {
              margin-left: 8px;
              color: #0078ff;
              background: #fff;
              &:hover {
                background: rgba(255, 255, 255, 0.8);
              }
            }
            .v-step__button-more {
              background-color: transparent;
            }
          }
          .v-step__single-buttons {
            justify-content: flex-end;
          }
          .v-step__arrow {
            &::before {
              // background-color: $blue-5;
              background-color: #0078ff;
            }
          }
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>

<style lang="scss">
  #app .v-tour__target--highlighted {
    box-shadow: none !important;
  }
</style>
```

## Demo 示例

```html
<el-button class="start-btn" size="mini" type="primary" @click="startSingleTour"
  >默认单步</el-button
>
<div class="dom-list">
  <div class="dom-item">
    <span data-v-step="single-1">Step</span>
  </div>
</div>
<DemoTour ref="single" name="single" :steps="singleStep" :callbacks="callbacks">
</DemoTour>

<script>
  export default {
    data() {
      return {
        singleStep: [
          {
            title: '标题',
            content: '这是一段很长长长长长长长长长长长长长长长的内容',
            target: '[data-v-step="single-1"]' // 模块-功能-step-id
          }
        ],
        callbacks: {
          onMore: this.getMoreTourInfo
        }
      };
    },

    methods: {
      startSingleTour() {
        this.$refs['single'].start();
      },
      getMoreTourInfo(tour) {
        console.log(tour);
        alert('more action!');
      }
    }
  };
</script>
```

```html
<div>
  <el-button size="mini" type="primary" @click="startMultipleTour"
    >默认多步</el-button
  >
  <div class="dom-list">
    <div class="dom-item">
      <span data-v-step="multiple-1">Step1</span>
    </div>
    <div class="dom-item">
      <span data-v-step="multiple-2">Step2</span>
    </div>
    <div class="dom-item">
      <span data-v-step="multiple-3">Step3</span>
    </div>
  </div>

  <DemoTour
    ref="multiple"
    name="multiple"
    :steps="steps"
    :callbacks="callbacks"
  ></DemoTour>
</div>

<script>
  export default {
    data() {
      return {
        callbacks: {
          onMore: this.getMoreTourInfo
        },
        steps: [
          {
            title: '标题1',
            content: '这是一段很长长长长长长长长长长长长长长长的内容1',
            target: '[data-v-step="multiple-1"]' // 模块-功能-step-id
          },
          {
            title: '标题2',
            content: '这是一段很长长长长长长长长长长长长长长长的内容2',
            target: '[data-v-step="multiple-2"]'
          },
          {
            title: '标题3',
            content: '这是一段很长长长长长长长长长长长长长长长的内容3',
            target: '[data-v-step="multiple-3"]',
            placement: 'right'
          }
        ]
      };
    },

    methods: {
      getMoreTourInfo(tour) {
        console.log(tour);
        alert('more action!');
      },
      startMultipleTour() {
        this.$refs['multiple'].start();
      }
    }
  };
</script>
```

```html
<div>
  <el-button size="mini" type="primary" @click="startTour"
    >自定义内容插槽</el-button
  >
  <div class="dom-list">
    <div class="dom-item">
      <span data-v-step="content-slot-1">Step1</span>
    </div>
    <div class="dom-item">
      <span data-v-step="content-slot-2">Step2</span>
    </div>
    <div class="dom-item">
      <span data-v-step="content-slot-3">Step3</span>
    </div>
  </div>

  <DemoTour ref="content-slot" name="content-slot" :steps="steps">
    <template #content="{ tour }">
      <template v-if="tour.currentStep === 0">
        <img
          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        />
      </template>
      <template v-else-if="tour.currentStep === 1">
        <div style="padding: 16px">
          自定义内容2333333
        </div>
      </template>
      <template v-else-if="tour.currentStep === 2">
        <img
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          style="border-radius: 50%"
        />
      </template>
    </template>
  </DemoTour>
</div>

<script>
  export default {
    data() {
      return {
        steps: [
          {
            title: '标题1',
            target: '[data-v-step="content-slot-1"]' // 模块-功能-step-id
          },
          {
            title: '标题2',
            target: '[data-v-step="content-slot-2"]'
          },
          {
            title: '标题3',
            target: '[data-v-step="content-slot-3"]',
            placement: 'right'
          }
        ]
      };
    },

    methods: {
      startTour() {
        this.$refs['content-slot'].start();
      }
    }
  };
</script>
```

```html
<div>
  <el-button size="mini" type="primary" @click="startActionsSlotTour"
    >自定义底部插槽</el-button
  >
  <div class="dom-list">
    <div class="dom-item">
      <span data-v-step="actions-slot-1">Step1</span>
    </div>
    <div class="dom-item">
      <span data-v-step="actions-slot-2">Step2</span>
    </div>
    <div class="dom-item">
      <span data-v-step="actions-slot-3">Step3</span>
    </div>
  </div>

  <DemoTour ref="actions" name="actions-slot" :steps="steps">
    <template #actions="{ tour }">
      <template v-for="(_, index) in steps">
        <div
          v-if="index === tour.currentStep"
          :key="index + 'actions'"
          class="demo-step__btns"
        >
          <el-button
            type="text"
            size="mini"
            @click="tour.skip"
            style="color: #fff"
          >
            Skip
          </el-button>
          <div>
            <el-button
              v-if="
                  tour.currentStep !== 0 &&
                  tour.currentStep !== steps.length - 1
                "
              size="mini"
              type="primary"
              class="previous"
              @click="tour.previousStep"
            >
              Previous
            </el-button>
            <el-button
              v-if="tour.currentStep !== steps.length - 1"
              size="mini"
              type="primary"
              class="next"
              @click="tour.nextStep"
            >
              Next
            </el-button>
            <el-button
              v-if="tour.currentStep === steps.length - 1"
              size="mini"
              type="primary"
              class="next"
              @click="tour.finish"
            >
              Finish
            </el-button>
          </div>
        </div>
      </template>
    </template>
  </DemoTour>
</div>

<script>
  export default {
    data() {
      return {
        steps: [
          {
            title: '标题1',
            content: '这是一段很长长长长长长长长长长长长长长长的内容1',
            target: '[data-v-step="actions-slot-1"]' // 模块-功能-step-id
          },
          {
            title: '标题2',
            content: '这是一段很长长长长长长长长长长长长长长长的内容2',
            target: '[data-v-step="actions-slot-2"]'
          },
          {
            title: '标题3',
            content: '这是一段很长长长长长长长长长长长长长长长的内容3',
            target: '[data-v-step="actions-slot-3"]',
            placement: 'right'
          }
        ]
      };
    },

    methods: {
      startActionsSlotTour() {
        this.$refs['actions'].start();
      }
    }
  };
</script>
```

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202307222003119.gif)

## Attributes

| 参数      | 说明                                                                                 | 类型    | 可选值 | 默认值                                                                                                                                                      |
| :-------- | :----------------------------------------------------------------------------------- | :------ | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name      | 1. 用于对外暴露 vue-tour 的同名 start 方法<br/>2. 用于存入 localStorage，name 值唯一 | String  | 必选   | "demo-tour"                                                                                                                                                 |
| knowMore  | 了解更多功能                                                                         | Boolean | 可选   | false                                                                                                                                                       |
| steps     | 步骤配置                                                                             | Array   | 必选   | <strong>元素属性:</strong> <br/>title: "自定义"<br/> content: "自定义"<br/> target: "必填"<br/> placement: "选填(left, top, right, bottom)"， 默认值 bottom |
| options   | 全局配置属性对象                                                                     | Object  | 可选   | [vue-tour](https://github.com/pulsardev/vue-tour)                                                                                                           |
| callbacks | 回调方法映射对象                                                                     | Object  | 可选   | onStart <br> onPreviousStep<br> onNextStep<br> onStop<br> onSkip<br> onFinish <br/> onMore (可选回调参数 tour )                                             |

## Events

| 事件  | 说明                                                   | 回调参数 |
| :---- | :----------------------------------------------------- | :------- |
| start | 开始执行 tour，使用 `this.$refs[refName].start()` 调用 | -        |

## Scoped Slot

| name    | 说明                                |
| :------ | :---------------------------------- |
| header  | 自定义头部（使用方法参照上述 demo） |
| content | 自定义内容（使用方法参照上述 demo） |
| actions | 自定义行为（使用方法参照上述 demo） |
