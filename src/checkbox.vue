<template>
  <label class="ti-checkbox" :class="{ 'is-checked': isChecked }">
    <span class="ti-checkbox_input">
      <span class="ti-checkbox_inner"></span>
      <input
        :name="name"
        v-model="model"
        class="ti-checkbox_original"
        type="checkbox"
        :value="label"
      />
    </span>
    <span class="ti-checkbox_label"></span>
    <slot></slot>
    <template v-if="!$slots.default">{{ label }}</template>
  </label>
</template>

<script>
export default {
  name: 'TiCheckbox',
  inject: {
    checkboxGroup: {
      default: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    isGroup () {
      return !!this.checkboxGroup
    },
    isChecked () {
      // 若是group包裹，判断label是否在model中,若没有包裹，直接使用model
      return this.isGroup ? this.model.includes(this.label) : this.model
    },
    model: {
      get () {
        return this.isGroup ? this.checkboxGroup.value : this.value
      },
      set (value) {
        this.isGroup
          ? this.checkboxGroup.$emit('input', value)
          : this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss">
.ti-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  padding-left: 5px;
  margin-right: 20px;
  .ti-checkbox_input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .ti-checkbox_inner {
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
      &:after {
        box-sizing: content-box;
        content: '';
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }
    .ti-checkbox_original {
      opacity: 0;
      outline: none;
      position: absolute;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
    }
  }
  .ti-checkbox_label {
    display: inline-block;
    padding-left: 5px;
    line-height: 19px;
    font-size: 14px;
  }
}
.ti-checkbox.is-checked {
  .ti-checkbox_input {
    .ti-checkbox_inner {
      background-color: #409eff;
      border-color: #409eff;
      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }
    .hm-checkbox_original {
      opacity: 0;
      outline: none;
      position: absolute;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
    }
  }
  .ti-checkbox_label {
    color: #409eff;
  }
}
</style>
