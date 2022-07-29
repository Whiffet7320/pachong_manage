<template>
  <div class="index">
    <div class="nav2">
      <div class="r1"></div>
      <div class="r2"></div>
      <div class="r3"></div>
      <div class="r4"></div>
      <div class="cont">
        <div class="flex-n">
          <div class="c-nav1">账号管理</div>
          <el-button
            @click="zbListDialogVisible = true"
            size="small"
            type="primary"
            >组别管理</el-button
          >
        </div>
        <vxe-table
          class="myTab"
          border="none"
          :cell-class-name="cellClassName"
          :data="tableData1"
          height="550"
        >
          <vxe-column
            width="140"
            field="user_name"
            show-overflow
            title="账号"
          ></vxe-column>
          <vxe-column
            width="200"
            field="mobile"
            show-overflow
            title="手机号"
          ></vxe-column>
          <vxe-column
            width="200"
            field="realname"
            show-overflow
            title="姓名"
          ></vxe-column>
          <!-- <vxe-column field="qx" show-overflow title="权限"></vxe-column> -->
          <vxe-column
            field="groups_name"
            show-overflow
            title="权限"
          ></vxe-column>
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  size="mini"
                  type="primary"
                  @click="tabEdit(scope.row)"
                  >修改信息</el-button
                >
                <el-button size="mini" type="danger" @click="tabDel(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <!-- 添加/编辑账号 -->
    <el-dialog
      title="添加/编辑账号"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
      custom-class="myZhanghaoDia"
    >
      <div class="myAddForm">
        <el-form
          :model="addForm"
          ref="addForm"
          label-width="100px"
          class="demo-addForm"
        >
          <el-row v-if="isAdd">
            <el-col :span="20">
              <el-form-item label="用户名：">
                <el-input
                  size="small"
                  placeholder="请输入用户名"
                  v-model="addForm.username1"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="20">
              <el-form-item label="用户名：">
                <el-input
                  disabled
                  size="small"
                  placeholder="请输入用户名"
                  v-model="addForm.username"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="姓名：">
                <el-input size="small" v-model="addForm.realname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="手机：">
                <el-input size="small" v-model="addForm.mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="密码：">
                <el-input size="small" v-model="addForm.userpass"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="确认密码：">
                <el-input size="small" v-model="addForm.reuserpass"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="组别：">
                <el-select v-model="addForm.groups_id" placeholder="请选择">
                  <el-option
                    v-for="item in zbList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit"
                  >提交</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 组别管理 -->
    <el-dialog
      title="组别管理"
      :visible.sync="zbListDialogVisible"
      width="1300px"
      :before-close="zbListHandleClose"
      custom-class="myZhanghaoDia"
    >
      <vxe-table
        class="myTab"
        border="none"
        :cell-class-name="cellClassName"
        :data="zbList"
        height="550"
      >
        <vxe-column
          field="name"
          width="100"
          show-overflow
          title="组别名称"
        ></vxe-column>
        <vxe-column field="qx" show-overflow title="权限"></vxe-column>
        <vxe-table-column title="操作状态" width="120">
          <template slot-scope="scope">
            <div class="flex">
              <el-button
                size="mini"
                type="primary"
                @click="zbtabEdit(scope.row)"
                >修改信息</el-button
              >
              <!-- <el-button size="mini" type="danger" @click="tabDel(scope.row)"
                >删除</el-button
              > -->
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
    </el-dialog>
    <!-- 添加/编辑账号 -->
    <el-dialog
      title="添加/编辑账号"
      :visible.sync="addzbDialogVisible"
      width="700px"
      :before-close="addzbHandleClose"
      custom-class="myZhanghaoDia"
    >
      <div class="myAddForm">
        <el-form
          :model="addzbForm"
          ref="addzbForm"
          label-width="100px"
          class="demo-addForm"
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="组别名称：">
                <el-input
                  size="small"
                  placeholder="请输入用户名"
                  v-model="addzbForm.name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="权限：">
                <el-tree
                  default-expand-all
                  :data="quanxianList"
                  ref="tree"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                ></el-tree>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddzbOnSubmit"
                  >提交</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["redulianjiebiaoPage", "addDialogVisible", "isAdd"]),
  },
  watch: {
    redulianjiebiaoPage: function (page) {
      this.$store.commit("redulianjiebiaoPage", page);
      this.getData();
    },
    isAdd: function () {
      if (this.isAdd) {
        for (const key in this.addForm) {
          this.addForm[key] = "";
          this.addForm.username = "";
          // this.$refs.tree.setCheckedKeys([]);
        }
      }
    },
  },
  data() {
    return {
      tableData1: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      addForm: {
        username1: "",
        username: "",
        userpass: "",
        realname: "",
        mobile: "",
        reuserpass: "",
        groups_id:'',
      },
      // isAdd: false,
      quanxianList: [],
      // addDialogVisible: true
      zbList: [],
      zbListDialogVisible: false,
      addzbDialogVisible: false,
      addzbForm: {
        name: "",
      },
      zbId: "",
    };
  },
  created() {
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    this.getQXdata();
    const loading = this.$loading({
      lock: true,
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    setTimeout(() => {
      this.getData();
      loading.close();
    }, 500);
    this.getData2();
  },
  methods: {
    async AddzbOnSubmit() {
      var arr = [];
      arr = [
        ...this.$refs.tree.getCheckedKeys(false),
        ...this.$refs.tree.getHalfCheckedKeys(true),
      ];
      const res = await this.$api.update_admingroup({
        limit: [...new Set(arr)].toString(),
        name: this.addzbForm.name,
        id: this.zbId,
      });
      if (res.result == 1) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getData2();
        this.addzbDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    zbListHandleClose() {
      this.zbListDialogVisible = false;
    },
    addzbHandleClose() {
      this.addzbDialogVisible = false;
    },
    async getQXdata() {
      const res = await this.$api.limits();
      console.log(res);
      this.quanxianList = res.list;
      this.quanxianList = JSON.parse(
        JSON.stringify(this.quanxianList).replace(/name/g, "label")
      );
      this.quanxianList = JSON.parse(
        JSON.stringify(this.quanxianList).replace(/sub_menu/g, "children")
      );
    },
    async getData() {
      const res = await this.$api.adminuser_list({
        is_status: 0,
        page: 1,
        pagesize: 10000,
      });
      // this.tableData1 = res.list
      // res.list.forEach(async (ele) => {
      //   console.log(ele);
      //   ele.qx = "";
      //   ele.qxArr = ele.limits.split(",");
      //   ele.newQxArr = ele.limits.split(",");
      //   if (ele.newQxArr.indexOf("2") != -1) {
      //     if (
      //       ele.newQxArr.indexOf("6") != -1 &&
      //       ele.newQxArr.indexOf("7") != -1 &&
      //       ele.newQxArr.indexOf("9") != -1 &&
      //       ele.newQxArr.indexOf("8") != -1 &&
      //       ele.newQxArr.indexOf("10") != -1 &&
      //       ele.newQxArr.indexOf("3") != -1
      //     ) {
      //       console.log("have 2");
      //     } else {
      //       ele.newQxArr.remove("2");
      //     }
      //     if (ele.newQxArr.indexOf("6") != -1) {
      //       if (
      //         ele.newQxArr.indexOf("7") != -1 &&
      //         ele.newQxArr.indexOf("9") != -1 &&
      //         ele.newQxArr.indexOf("8") != -1
      //       ) {
      //         console.log("have 6");
      //       } else {
      //         ele.newQxArr.remove("6");
      //       }
      //     }
      //   }
      //   var arr = [];
      //   this.quanxianList.forEach((ele2) => {
      //     if (ele.qxArr.indexOf(ele2.id.toString()) != -1) {
      //       if (ele2.children.length > 0) {
      //         ele2.children.forEach((ele3) => {
      //           if (ele.qxArr.indexOf(ele3.id.toString()) != -1) {
      //             arr.push(`${ele2.label}-${ele3.label}`);
      //           }
      //         });
      //       } else {
      //         arr.push(ele2.label);
      //       }
      //     }
      //   });
      //   this.$set(ele, "qx", arr.toString());
      // });
      setTimeout(() => {
        this.tableData1 = res.list;
        // this.loading = false;
        console.log(this.tableData1);
      }, 500);
    },
    async getData2() {
      const res = await this.$api.admingroups_list({
        page: 1,
        pagesize: 1000,
      });
      // this.zbList = res.list;
      res.list.forEach(async (ele) => {
        console.log(ele);
        ele.qx = "";
        ele.qxArr = ele.limit.split(",");
        ele.newQxArr = ele.limit.split(",");
        if (ele.newQxArr.indexOf("2") != -1) {
          if (
            ele.newQxArr.indexOf("6") != -1 &&
            ele.newQxArr.indexOf("7") != -1 &&
            ele.newQxArr.indexOf("9") != -1 &&
            ele.newQxArr.indexOf("8") != -1 &&
            ele.newQxArr.indexOf("10") != -1 &&
            ele.newQxArr.indexOf("3") != -1
          ) {
            console.log("have 2");
          } else {
            ele.newQxArr.remove("2");
          }
          if (ele.newQxArr.indexOf("6") != -1) {
            if (
              ele.newQxArr.indexOf("7") != -1 &&
              ele.newQxArr.indexOf("9") != -1 &&
              ele.newQxArr.indexOf("8") != -1
            ) {
              console.log("have 6");
            } else {
              ele.newQxArr.remove("6");
            }
          }
          if (ele.newQxArr.indexOf("12") != -1) {
            if (
              ele.newQxArr.indexOf("13") != -1 &&
              ele.newQxArr.indexOf("14") != -1
            ) {
              console.log("have 12");
            } else {
              ele.newQxArr.remove("12");
            }
          }
        }
        var arr = [];
        this.quanxianList.forEach((ele2) => {
          if (ele.qxArr.indexOf(ele2.id.toString()) != -1) {
            if (ele2.children.length > 0) {
              ele2.children.forEach((ele3) => {
                if (ele.qxArr.indexOf(ele3.id.toString()) != -1) {
                  arr.push(`${ele2.label}-${ele3.label}`);
                }
              });
            } else {
              arr.push(ele2.label);
            }
          }
        });
        this.$set(ele, "qx", arr.toString());
      });
      setTimeout(() => {
        this.zbList = res.list;
        // this.loading = false;
        console.log(this.zbList);
      }, 500);
    },
    async tabDel(row) {
      const res = await this.$api.adminuser_del({ user_id: row.id });
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getData();
        this.$store.commit("addDialogVisible", false);
      } else {
        this.$message.error(res.msg);
      }
    },
    tabEdit(row) {
      this.id = row.id;
      this.addForm = { ...row };
      this.addForm.username = row.user_name;
      this.$store.commit("isAdd", false);
      this.$store.commit("addDialogVisible", true);
      // var arr = [];
      // row.newQxArr.forEach((ele) => {
      //   arr.push(Number(ele));
      // });
      // setTimeout(() => {
      //   console.log(arr, this.$refs);
      //   this.$refs.tree.setCheckedKeys(arr);
      // }, 300);
    },
    zbtabEdit(row) {
      this.zbId = row.id;
      this.addzbForm = { ...row };
      this.addzbDialogVisible = true;
      var arr = [];
      row.newQxArr.forEach((ele) => {
        arr.push(Number(ele));
      });
      setTimeout(() => {
        console.log(arr, this.$refs);
        this.$refs.tree.setCheckedKeys(arr);
      }, 300);
      console.log(arr)
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        // 添加
        const res = await this.$api.add_adminuser({
          ...this.addForm,
          username: this.addForm.username1,
        });
        console.log(res);
        if (res.result == 1) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.getData();
          this.$store.commit("addDialogVisible", false);
        } else {
          this.$message.error(res.msg);
        }
      } else {
        const res = await this.$api.update_adminuser({
          ...this.addForm,
          user_id: this.id,
        });
        console.log(res);
        if (res.result == 1) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.getData();
          this.$store.commit("addDialogVisible", false);
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    addHandleClose() {
      this.$store.commit("addDialogVisible", false);
      // this.addDialogVisible = false;
    },
    cellClassName({ column }) {
      if (column.property == "lj") {
        return "active";
      } else {
        return "col-active";
      }

      // if (column.property == "sex" && this.nowVip == 1) {
      //   return "col-active";
      // } else if (column.property == "age" && this.nowVip == 2) {
      //   return "col-active";
      // } else if (column.property == "address" && this.nowVip == 3) {
      //   return "col-active";
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  padding: 0 10px;
}
.nav2 {
  margin-top: 28px;
  height: 700px;
  background: #121531;
  border: 2px solid #1794e4;
  box-shadow: 0px 0px 30px 0px rgba(23, 148, 228, 0.86) inset;
  position: relative;
  .r1 {
    position: absolute;
    width: 46px;
    height: 46px;
    border-top: 3px solid #04f9db;
    border-left: 3px solid #04f9db;
    top: -2px;
    left: -2px;
  }
  .r2 {
    position: absolute;
    width: 46px;
    height: 46px;
    border-top: 3px solid #04f9db;
    border-right: 3px solid #04f9db;
    top: -2px;
    right: -2px;
  }
  .r3 {
    position: absolute;
    width: 46px;
    height: 46px;
    border-bottom: 3px solid #04f9db;
    border-left: 3px solid #04f9db;
    bottom: -2px;
    left: -2px;
  }
  .r4 {
    position: absolute;
    width: 46px;
    height: 46px;
    border-bottom: 3px solid #04f9db;
    border-right: 3px solid #04f9db;
    bottom: -2px;
    right: -2px;
  }
  .cont {
    .flex-n {
      display: flex;
      align-items: center;
      margin-top: 44px;
      margin-bottom: 20px;
    }
    .c-nav1 {
      margin-left: 54px;
      margin-right: 20px;
      font-size: 32px;
      font-family: PingFang SC, PingFang SC-Medium; //aaa
      font-weight: 500; //aa
      color: #04f9db;
      letter-spacing: 3.2px;
    }
    /deep/ .vxe-table {
      width: calc(100% - 70px);
      margin: 0 34px;
    }
    .myTab {
      /deep/ .el-button--text {
        color: #fff;
      }
      /deep/ .vxe-header--column {
        background: #121531;
        color: #ffffff;
      }
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
    }
  }
}
.myAddForm {
  /deep/ .el-form-item__label {
    color: #ffffff;
  }
  /deep/ .el-input.is-disabled {
    .el-input__inner {
      background-color: #ddd;
    }
  }
  .el-button {
    width: 100%;
  }
}
.myTab {
  /deep/ .el-button--text {
    color: #fff;
  }
  /deep/ .vxe-header--column {
    background: #121531;
    color: #ffffff;
  }
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
}
</style>