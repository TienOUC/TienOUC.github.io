<template>
  <div class="ti-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TiCheckboxGroup',
  props: {
    value: {
      type: Array
    }
  },
  provide () {
    return {
      checkboxGroup: this
    }
  }
}
</script>

<style></style>
