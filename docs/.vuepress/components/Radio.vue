<template>
  <div>
    <ti-radio label="男" v-model="gender"></ti-radio>
    <ti-radio label="女" v-model="gender"></ti-radio>
  </div>
</template>

<script>
import TiRadio from "../../../src/radio";
export default {
  name: "Radio",
  components: {
    TiRadio,
  },
  data() {
    return {
      gender: "男",
    };
  },
};
</script>

<style lang="scss"></style>
