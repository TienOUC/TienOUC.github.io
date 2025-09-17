<template>
  <div class="ti-form-item">
    <label class="ti-form-label" :style="{'width': this.Form.labelWidth}">{{ label }}</label>
    <div class="ti-form-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TiFormItem',
  props: {
    label: String
  },
  inject: ['Form']
}
</script>

<style lang="scss">
.ti-form-item {
  margin-bottom: 25px;
  .ti-form-label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  .ti-form-item-content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    overflow: hidden;
  }
}
</style>
