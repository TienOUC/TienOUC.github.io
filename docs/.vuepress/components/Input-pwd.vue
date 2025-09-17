<template>
  <div>
    <ti-input
      placeholder="输入密码"
      type="password"
      v-model="model.uservalue"
      showPassword
    ></ti-input>
  </div>
</template>

<script>
import TiInput from "../../../src/input";
import "../../../src/fonts/font.scss";
export default {
  name: "Input-pwd",
  components: {
    TiInput,
  },
  data() {
    return {
      model: {
        uservalue: ""
      }
    }
  }
}
</script>

<style lang="scss"></style>
