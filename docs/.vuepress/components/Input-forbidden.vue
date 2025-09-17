<template>
  <div>
    <ti-input placeholder="禁用 ..." type="text" disabled></ti-input>
  </div>
</template>

<script>
import TiInput from "../../../src/input";

export default {
  name: "Input-forbidden",
  components: {
    TiInput,
  },
  data() {
    return {
      inputValue: "",
    };
  },
};
</script>

<style lang="scss"></style>
