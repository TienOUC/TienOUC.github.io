<template>
  <div id="app">
    <!-- 简单按钮 -->
    <div class="row">
      <ti-button plain type="default">简单按钮</ti-button>
      <ti-button plain type="primary">主要按钮</ti-button>
      <ti-button plain type="success">成功按钮</ti-button>
      <ti-button plain type="info">信息按钮</ti-button>
      <ti-button plain type="warning">警告按钮</ti-button>
      <ti-button plain type="danger">危险按钮</ti-button>
    </div>
  </div>
</template>

<script>
import TiButton from "../../../src/button";
export default {
  name: "Button-plain",
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
