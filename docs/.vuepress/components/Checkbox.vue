<template>
  <div>
    <ti-checkbox v-model="active" name="checkbox">
      <span>选项内容</span>
    </ti-checkbox>
  </div>
</template>

<script>
import TiCheckbox from "../../../src/checkbox";
export default {
  name: "Checkbox",
  components: {
    TiCheckbox,
  },
  data() {
    return {
      active: true,
    };
  },
};
</script>

<style></style>
