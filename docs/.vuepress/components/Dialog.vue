<template>
  <div>
    <ti-button type="primary" @click="dialogVisible = true"
      >点击显示 Dialog</ti-button
    >
    <ti-dialog
      width="30%"
      top="200px"
      title="Dialog标题"
      :visible.sync="dialogVisible"
      @opened="open"
      @closed="close"
    >
      <ul>
        <li>Dialog内容 1</li>
        <li>Dialog内容 2</li>
        <li>Dialog内容 3</li>
      </ul>
      <template v-slot:footer>
        <ti-button @click="dialogVisible = false">取 消</ti-button>
        <ti-button type="primary" @click="dialogVisible = false"
          >确 定</ti-button
        >
      </template>
    </ti-dialog>
  </div>
</template>

<script>
import TiButton from "../../../src/button";
import TiSwitch from "../../../src/switch";
import TiDialog from "../../../src/dialog";
import "../../../src/fonts/font.scss";
export default {
  name: "Dialog",
  components: {
    TiButton,
    TiSwitch,
    TiDialog,
  },

  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    open() {
      console.log("对话框显示了");
    },
    close() {
      console.log("对话框关闭了");
    }
  }
};
</script>

<style lang="scss"></style>
