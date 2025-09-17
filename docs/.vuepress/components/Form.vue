<template>
  <div>
    <ti-form label-width="400px" :model="model">
      <!-- <slot></slot> -->
      <table>
        <tr>
          <th align="left">消费项目</th>
          <th align="right">一月</th>
          <th align="right">二月</th>
        </tr>
        <tr>
          <td align="left">衣服</td>
          <td align="right">$241.10</td>
          <td align="right">$50.20</td>
        </tr>
        <tr>
          <td align="left">化妆品</td>
          <td align="right">$30.00</td>
          <td align="right">$44.45</td>
        </tr>
        <tr>
          <td align="left">食物</td>
          <td align="right">$730.40</td>
          <td align="right">$650.00</td>
        </tr>
        <tr>
          <th align="left">总计</th>
          <th align="right">$1001.50</th>
          <th align="right">$744.65</th>
        </tr>
      </table>
    </ti-form>
  </div>
</template>

<script>
import TiForm from "../../../src/form";
export default {
  name: "Form",
  components: {
    TiForm,
  },
  data() {
    return {
      model: {
        username: "",
      },
    };
  },
};
</script>

<style></style>
