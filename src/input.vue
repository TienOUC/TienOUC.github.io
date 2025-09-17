<template>
  <div>
    <div class="ti-input" :class="{ 'ti-input_suffix': showSuffix }">
      <input
        class="ti-input_inner"
        :class="{ 'is-disabled': disabled }"
        :placeholder="placeholder"
        :type="showPassword ? (showPasswordVisable ? 'text' : 'password') : type"
        :name="name"
        :disabled="disabled"
        :value="value"
        @input="handleInput"
      />
      <span class="ti-input_suffix" v-if="showSuffix">
        <i v-if="clearable && value" class="ti-input-icon ti-icon-circle-close ti-input-clear" @click="clear"></i>
        <i v-if="showPassword && value" class="ti-input-icon ti-icon-view ti-input-clear" @click="handlePassword"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TiInput',
  data () {
    return {
      showPasswordVisable: false
    }
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showSuffix () {
      return this.clearable || this.showPassword
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
    },
    clear () {
      this.$emit('input', '')
    },
    handlePassword () {
      this.showPasswordVisable = !this.showPasswordVisable
    }
  }
}
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
