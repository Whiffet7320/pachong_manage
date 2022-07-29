<template>
  <div id="app">
    <template v-if="false">
      <Layout v-if="user_level == 1 || user_level == 3" />
      <LayoutU v-else />
    </template>

    <Layout />
  </div>
</template>

<script>
import Layout from "./components/Layout";
import LayoutU from "./components/Layout_u";
export default {
  name: "App",
  components: {
    Layout,
    LayoutU,
  },
  data() {
    return {
      user_level: null,
    };
  },
  created() {
    this.user_level = sessionStorage.getItem("user_level");
    console.log(this.user_level);
    document.title = "今日教育";
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/reset.css";
/deep/ .el-dialog {
  border-radius: 10px;
}
</style>
<style lang="scss">
.el-picker-panel {
  background: #388bf4;
  border: 0px solid #388bf4;
  .el-date-table td.in-range div,
  .el-date-table td.in-range div:hover {
    background-color: #4e6b97 !important;
  }
  td.prev-month {
    color: #606266;
  }
  .el-date-table td.next-month {
    color: #606266;
  }
  .el-date-picker__header {
    margin: 12px 12px 0px 12px;
    .el-picker-panel__icon-btn {
      color: #ffffff;
    }
    .el-date-picker__header-label {
      color: #ffffff;
    }
  }
  .el-picker-panel__content {
    .today {
      span {
        color: #ffffff;
        font-weight: 500; //aa
      }
    }
    .el-date-table td span {
      line-height: 26px;
    }
    .el-date-table td.current:not(.disabled) span {
      background: #0053bc;
    }
  }
  th {
    color: #ffffff;
  }
  .available {
    color: #ffffff;
  }
}
.el-popconfirm__main {
  font-size: 12px;
  margin: 4px 0 10px 0;
  display: flex;
  justify-content: center;
}
.el-popover {
  padding: 0;
  border: 0;
  transform: translateY(-6px);
  border-radius: 18px;
  .el-checkbox {
    width: 160px;
    margin-bottom: 10px;
    display: inline-block;
    margin-right: 0px;

    .el-checkbox__label {
      font-size: 12px;
    }
  }
}
.el-dialog.myZhanghaoDia {
  background: #122549;
  .el-dialog__title {
    color: #ffffff;
  }
  .el-dialog__close {
    color: #ffffff;
  }
  .el-form-item__label {
    color: #ffffff;
  }
}
.myPop-box {
  width: 555px;
  height: 540px;
  background: #122549;
  border-radius: 12px;
  .navv1 {
    height: 74px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 2px solid #10183c;
    .tit1 {
      width: 418px;
    }
    .el-button {
      padding: 9px 26px;
      background: #388bf4;
      border: 2px solid #388bf4;
      color: #ffffff;
    }
  }
  .navv2 {
    padding: 0 20px;
    .tit1 {
      margin-top: 20px;
      font-size: 12px;
      font-family: PingFang SC, PingFang SC-Medium; //aaa
      // font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500; //aa
      color: #ffffff;
    }
    .tit2 {
      margin-top: 10px;
      width: 515px;
      height: 400px;
      background: #10183c;
      border-radius: 8px;
      padding: 12px 8px;
      .el-tag {
        margin: 0 6px 12px 6px;
      }
    }
  }
}
</style>

