<template>
  <div id="app">
    <!-- 字体按钮 -->
    <div class="row">
      <ti-button icon="ti-icon-search" circle type="default"></ti-button>
      <ti-button icon="ti-icon-star-off" circle type="primary"></ti-button>
      <ti-button icon="ti-icon-edit" circle type="success"></ti-button>
      <ti-button icon="ti-icon-check" circle type="info"></ti-button>
      <ti-button icon="ti-icon-message" circle type="warning"></ti-button>
      <ti-button icon="ti-icon-delete" circle type="danger"></ti-button>
    </div>
  </div>
</template>

<script>
import TiButton from "../../../src/button";
import "../../../src/fonts/font.scss";
export default {
  name: "Button-icon",
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
