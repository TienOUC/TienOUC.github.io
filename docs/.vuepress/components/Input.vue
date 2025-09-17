<template>
  <div>
    <div>
      <!-- input 组件 -->
      <ti-input
        placeholder="输入用户名"
        type="text"
        v-model="inputValue"
        clearable
      ></ti-input>
    </div>
    <br>
    <div>
      <ti-input
        placeholder="输入密码"
        type="password"
        v-model="inputValue"
        showPassword
      ></ti-input>
    </div>
    <br>
    <div>
      <ti-input placeholder="禁用 ..." type="text" disabled></ti-input>
    </div>
  </div>
</template>

<script>
import TiInput from "../../../src/input";
import "../../../src/fonts/font.scss";
export default {
  name: "Input",
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

<style lang="scss">
.ti-input {
  width: 180px;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .ti-input_inner {
    cursor: pointer;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #000;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}

.ti-input_suffix {
  .ti-input_inner {
    padding-right: 30px;
  }
  .ti-input_suffix {
    position: absolute;
    height: 100%;
    right: 10px;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    z-index: 900;
    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>
