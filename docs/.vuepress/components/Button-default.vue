<template>
  <div id="app">
    <!-- 默认按钮 -->
    <div class="row">
      <ti-button type="default">默认按钮</ti-button>
      <ti-button type="primary">主要按钮</ti-button>
      <ti-button type="success">成功按钮</ti-button>
      <ti-button type="info">信息按钮</ti-button>
      <ti-button type="warning">警告按钮</ti-button>
      <ti-button type="danger">危险按钮</ti-button>
    </div>
  </div>
</template>

<script>
import TiButton from "../../../src/button";
export default {
  name: "Button-default",
  components: {
    TiButton,
  }
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
