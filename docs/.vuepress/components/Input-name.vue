<template>
  <div>
      <!-- input 组件 -->
      <ti-input
        placeholder="输入用户名"
        type="text"
        v-model="model.username"
        clearable
      ></ti-input>
  </div>
</template>

<script>
import TiInput from "../../../src/input";
import "../../../src/fonts/font.scss";
export default {
  name: "Input-name",
  components: {
    TiInput,
  },
  data() {
    return {
      model: {
        username: ""
      }
    }
  }
}
</script>

<style lang="scss"></style>
