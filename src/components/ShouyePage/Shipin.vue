<template>
  <div class="index">
    <div class="myTable">
        <div class="r1"></div>
        <div class="r2"></div>
        <div class="r3"></div>
        <div class="r4"></div>
      <vxe-table
        max-height="690px"
        border="none"
        align="center"
        :cell-class-name="cellClassName"
        :data="tableData1"
      >
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
        <vxe-column field="lj" title="链接"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData1: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com"
        }
      ]
    };
  },
  methods: {
    cellClassName({ column }) {
      if (column.property == "lj") {
        return "active";
      } else {
        return "col-active";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.myTable {
    display: flex;
    align-items: center;
    justify-content: center;
  height: 750px;
  background: #121531;
  border: 2px solid #1794e4;
  box-shadow: 0px 0px 30px 0px rgba(23, 148, 228, 0.86) inset;
  position: relative;
  .r1 {
    position: absolute;
    width: 30px;
    height: 30px;
    border-top: 2px solid #04f9db;
    border-left: 2px solid #04f9db;
    top: -2px;
    left: -2px;
  }
  .r2 {
    position: absolute;
    width: 30px;
    height: 30px;
    border-top: 2px solid #04f9db;
    border-right: 2px solid #04f9db;
    top: -2px;
    right: -2px;
  }
  .r3 {
    position: absolute;
    width: 30px;
    height: 30px;
    border-bottom: 2px solid #04f9db;
    border-left: 2px solid #04f9db;
    bottom: -2px;
    left: -2px;
  }
  .r4 {
    position: absolute;
    width: 30px;
    height: 30px;
    border-bottom: 2px solid #04f9db;
    border-right: 2px solid #04f9db;
    bottom: -2px;
    right: -2px;
  }
}
/deep/ .vxe-table {
  //  box-shadow: 0px 0px 30px 0px rgba(23, 148, 228, 0.86) inset;
  //
  width: calc(100% - 70px);
  margin: 0 34px;
}
/deep/ .vxe-header--column {
  background: #121531;
  color: #ffffff;
}
// /deep/ .vxe-header--column.col_10 {
//   background: #121531;
//   color: #04F9DB;
// }
/deep/ .vxe-body--column.col-active {
  background: #121531;
  color: #ffffff;
}
/deep/ .vxe-body--column.active {
  background: #121531;
  color: #04f9db;
}
/deep/ .body--wrapper {
  background-color: #121531 !important;
}
/deep/ .vxe-table--header {
  border-bottom: 2px solid rgba(23, 148, 228, 0.57);
}
</style>