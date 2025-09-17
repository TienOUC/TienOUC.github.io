<template>
  <div>
    <ti-radio-group v-model="gender">
      <ti-radio label="group-1"></ti-radio>
      <ti-radio label="group-2"></ti-radio>
    </ti-radio-group>
  </div>
</template>

<script>
import TiRadio from "../../../src/radio";
import TiRadioGroup from "../../../src/radio-group";
export default {
  name: "RadioGroup",
  components: {
    TiRadio,
    TiRadioGroup,
  },
  data() {
    return {
      gender: "group-1",
    };
  },
};
</script>

<style lang="scss"></style>
