<template>
  <div>
    <ti-form :model="model" label-width="">
      <!-- input 输入框 -->
      <ti-form-item label="账 户：">
        <ti-input
          placeholder="请输入用户名"
          v-model="model.username"
          type="text"
          clearable
        ></ti-input>
      </ti-form-item>
      <ti-form-item label="密 码：">
        <ti-input
          placeholder="请输入密码"
          v-model="model.uservalue"
          type="password"
          showPassword
        ></ti-input>
      </ti-form-item>
      <!-- radio-group组件 -->
      <ti-form-item>
        <ti-radio-group v-model="gender">
          性 别：
          <ti-radio label="男"></ti-radio>
          <ti-radio label="女"></ti-radio>
        </ti-radio-group>
      </ti-form-item>
      <!-- checkbox-group 组件 -->
      <ti-form-item>
        <ti-checkbox-group v-model="hobby">
          爱 好：
          <ti-checkbox label="看书"></ti-checkbox>
          <ti-checkbox label="唱歌"></ti-checkbox>
          <ti-checkbox label="跳舞"></ti-checkbox>
        </ti-checkbox-group>
      </ti-form-item>
      <!-- switch按钮 -->
      <ti-form-item label="同 意：">
        <ti-switch v-model="model.active"></ti-switch>
      </ti-form-item>
      <!-- 点击弹出dialog -->
      <ti-form-item>
        <ti-button type="primary" @click="dialogVisible = true">点击显示Dialog</ti-button>
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
            <ti-button type="primary" @click="dialogVisible = false">确 定</ti-button>
          </template>
        </ti-dialog>
      </ti-form-item>
    </ti-form>
  </div>
</template>

<script>
import TiButton from "../../../src/button";
import TiInput from "../../../src/input";
import TiDialog from "../../../src/dialog";
import TiSwitch from "../../../src/switch";
import TiRadio from "../../../src/radio";
import TiCheckbox from "../../../src/checkbox";
import TiCheckboxGroup from "../../../src/checkbox-group";
import TiRadioGroup from "../../../src/radio-group";
import TiFormItem from "../../../src/form-item";
import TiForm from "../../../src/form";
import "../../../src/fonts/font.scss";
export default {
  name: "FormItem",
  components: {
    TiButton,
    TiDialog,
    TiInput,
    TiSwitch,
    TiCheckbox,
    TiCheckboxGroup,
    TiRadio,
    TiRadioGroup,
    TiForm,
    TiFormItem,
  },
  data() {
    return {
      dialogVisible: false,
      gender: "男",
      username: "",
      active: false,
      hobby: ["看书", "跳舞"],
      model: {
        username: "",
        uservalue: "",
        active: false
      }
    }
  },
  methods: {
    fn() {
      console.log("test");
    },
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
