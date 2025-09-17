<template>
  <div id="app">
    <!-- 圆角按钮 -->
    <div class="row">
      <ti-button round type="default">圆角按钮</ti-button>
      <ti-button round type="primary">主要按钮</ti-button>
      <ti-button round type="success">成功按钮</ti-button>
      <ti-button round type="info">信息按钮</ti-button>
      <ti-button round type="warning">警告按钮</ti-button>
      <ti-button round type="danger">危险按钮</ti-button>
    </div>
  </div>
</template>

<script>
import TiButton from "../../../src/button";
export default {
  name: "Button-round",
  components: {
    TiButton,
  },
};
</script>

<style lang="scss">
.row {
  margin-bottom: 20px;
  .ti-button {
    margin-right: 10px;
    margin-bottom: 5px;
  }
}
</style>
