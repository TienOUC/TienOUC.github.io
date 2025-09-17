<template>
  <div>
    <ti-checkbox-group v-model="hobby">
      <ti-checkbox label="选项 A"></ti-checkbox>
      <ti-checkbox label="选项 B"></ti-checkbox>
      <ti-checkbox label="选项 C"></ti-checkbox>
    </ti-checkbox-group>
  </div>
</template>

<script>
import TiCheckbox from "../../../src/checkbox"
import TiCheckboxGroup from "../../../src/checkbox-group";
export default {
  name: "CheckboxGroup",
  components: {
    TiCheckbox,
    TiCheckboxGroup
  },
  data() {
    return {
      hobby: ["选项 A", "选项 B"],
    }
  }
}
</script>

<style lang="scss"></style>
