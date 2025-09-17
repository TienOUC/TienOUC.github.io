<template>
  <label class="ti-radio" :class="{ 'is-checked': value === model }">
    <span class="ti-radio_input">
      <span class="ti-radio_inner"></span>
      <input
        :value="label"
        :name="name"
        v-model="model"
        class="ti-radio_original"
        type="radio"
      />
    </span>
    <span class="ti-radio_label"></span>
    <slot></slot>
    <template v-if="!$slots.default">{{ label }}</template>
  </label>
</template>
<script>
export default {
  name: "TiRadio",
  inject: {
    radioGroup: {
      default: "",
    },
  },
  props: {
    label: {
      type: [String, Number, Boolean],
      default: "",
    },
    value: null,
    name: {
      type: String,
      default: "",
    },
  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this.radioGroup.value : this.value;
      },
      set(value) {
        this.isGroup
          ? this.radioGroup.$emit("input", value)
          : this.$emit("input", value);
      },
    },
    isGroup() {
      return !!this.radioGroup;
    },
  },
};
</script>

<style lang="scss">
.ti-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  .htim-radio_input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .ti-radio_inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
    }
    .ti-radio_original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
  .ti-radio_label {
    font-size: 14px;
    padding-left: 5px;
  }
}
</style>
