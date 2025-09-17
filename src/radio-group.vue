<template>
  <div class="ti-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TiRadioGroup',
  provide () {
    return {
      radioGroup: this
    }
  },
  props: {
    value: null
  }
}
</script>

<style></style>
