<template>
  <div>
    <!-- switch开关按钮 -->
    <ti-switch
      name="username"
      v-model="active"
      active-color="#FF5252"
      inactive-color="#03A9F4"
    ></ti-switch>
  </div>
</template>

<script>
import TiSwitch from "../../../src/switch";
export default {
  name: "ti-Switch",
  components: {
    TiSwitch,
  },
  data() {
    return {
      active: false,
    }
  }
}
</script>

<style lang="scss"></style>
