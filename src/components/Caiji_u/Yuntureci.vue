<template>
  <div class="index">
    <div class="nav1 bt">
      <div class="n1-tit1">添加关键词设定</div>
      <div class="n3-tit2">
        <el-button @click="tuichu" type="primary" icon="el-icon-switch-button"
          >退出</el-button
        >
      </div>
      <!-- <div class="titt">
        <div class="n1-tit2">
          <div class="txt2-1">选择日期：</div>
        </div>
        <div class="n1-tit3">
          <el-date-picker @change="changeTime" value-format="yyyy-MM-dd" size="mini" v-model="time" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div> -->
    </div>
    <div class="nav2">
      <div class="n2-tit1">采集</div>
      <i class="el-icon-arrow-right"></i>
      <div class="n2-tit2">添加关键词设定</div>
    </div>
    <div class="nav3">
      <div class="n3-tit1">
        <el-input
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="keyword"
        >
          <el-button @click="searchKey"  style="color:#fff;border:#409eff" slot="append">搜索</el-button>
        </el-input>
      </div>
      <!-- <div class="n3-tit2">
        <el-button @click="zqDialogVisible = true" type="primary" icon="el-icon-plus"
          >摘取关键词</el-button
        >
      </div> -->
      <div class="n3-tit3">
        <!-- <div @click="changeIndex(1)" :class="{'btn':true,'active':nowIndex == 1}">新闻</div>
        <div @click="changeIndex(2)" :class="{'btn':true,'active':nowIndex == 2}">舆情</div>
        <div
          @click="changeIndex(3)"
          style="margin-right:10px"
          :class="{'btn':true,'active':nowIndex == 3}"
        >视频</div>-->
        <!-- <div class="myPopover">
          <el-popover placement="bottom-start" :visible-arrow="false" trigger="click">
            <div class="myPop-box">
              <div class="navv1">
                <div class="tit1">
                  <el-input size="small" v-model="tagVal" placeholder="添加屏蔽关键词"></el-input>
                </div>
                <el-button @click="addTag" size="small">添加</el-button>
              </div>
              <div class="navv2">
                <div class="tit1">已屏蔽关键词</div>
                <div class="tit2">
                  <el-tag
                    v-for="item in tagList"
                    :key="item.id"
                    @close="removeTag(item)"
                    size="small"
                    closable
                  >{{item.keyword}}</el-tag>
                </div>
              </div>
            </div>
            <el-button size="mini" slot="reference">
              屏蔽关键词
              <i class="el-icon-plus"></i>
            </el-button>
          </el-popover>
        </div> -->
      </div>
    </div>
    <div class="nav4 nav1">
      <!-- <div class="titt1 titt">
        <div class="n1-tit2">
          <div class="txt2-1">发布日期：</div>
        </div>
        <div class="n1-tit3">
          <el-date-picker size="mini"  value-format="yyyy-MM-dd" v-model="time2" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <div class="titt2">
        <el-button size="mini" type="primary">批量发布</el-button>
        <el-button size="mini" type="danger">批量删除</el-button>
      </div> -->
    </div>
    <div class="myTable">
      <vxe-table
        height="554"
        border="none"
        ref="xTable1"
        :data="tableData"
        @checkbox-all="selectAllEvent1"
        @checkbox-change="selectChangeEvent1"
      >
        <!-- <vxe-column show-overflow type="checkbox" width="60"></vxe-column> -->
        <vxe-column show-overflow field="title" title="关键词"></vxe-column>
        <vxe-column show-overflow field="num" title="次数"></vxe-column>
        <vxe-column show-overflow field="news_title" title="标题"></vxe-column>
        <!-- <vxe-column show-overflow field="content" title="内容"></vxe-column> -->
        <vxe-column show-overflow field="age" title="链接">
          <template #default="{ row }">
            <a
              style="color: #333"
              :href="`${row.new_url}`"
              target="_black"
              >{{ row.new_url }}</a
            >
          </template>
        </vxe-column>
        <vxe-column show-overflow width="200" field="address" title="采集来源">
          <template #default="{ row }">
            <div class="cjyl">
              <div
                :class="{
                  dian: true,
                  success: row.from_isuser == 0,
                  fail: row.from_isuser == 1,
                }"
              ></div>
              <div class="txt">{{ row.from_user }}</div>
            </div>
          </template>
        </vxe-column>
        <vxe-table-column width="90">
          <template slot-scope="scope">
            <div style="display: flex">
              <!-- <el-button size="mini" type="info" @click="tabEdit(scope.row)"
                >编辑</el-button
              > -->
              <!-- <el-button size="mini" type="primary" @click="tabFabu(scope.row)"
                >发布</el-button
              > -->
              <el-button size="mini" type="danger" @click="tabDel(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-pagination
        class="fenye"
        :pager-count="5"
        @current-change="this.handleCurrentChange"
        :current-page="this.redulianjiebiaoPage"
        :page-size="9"
        layout="total, prev, pager, next"
        :total="this.total"
      ></el-pagination>
    </div>
    <!-- 摘取关键词 -->
    <el-dialog
      title="摘取关键词"
      :visible.sync="zqDialogVisible"
      width="555px"
      :before-close="zqHandleClose"
      custom-class="myZhanghaoDia"
    >
      <div class="myPopover">
        <div class="myPop-box">
          <div class="navv1">
            <div class="tit1">
              <el-input
                size="small"
                v-model="tagVal"
                placeholder="输入需要摘取的关键词"
              ></el-input>
            </div>
            <el-button @click="addTag" size="small">摘取</el-button>
          </div>
          <div class="navv2">
            <div class="tit1">已摘取关键词</div>
            <div class="tit2">
              <el-tag
                v-for="item in tagList"
                :key="item.id"
                @close="removeTag(item)"
                size="small"
                closable
                >{{ item.title }}</el-tag
              >
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 修改关键词 -->
    <el-dialog
      title="修改关键词"
      :visible.sync="xgDialogVisible"
      width="555px"
      :before-close="xgHandleClose"
      custom-class="myZhanghaoDia"
    >
    <div class="myAddForm">
        <el-form
          :model="addForm"
          ref="addForm"
          label-width="100px"
          class="demo-addForm"
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="关键词：">
                <el-input
                  size="small"
                  v-model="addForm.title"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button style="width:100%" size="small" type="primary" @click="AddOnSubmit"
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
    ...mapState(["redulianjiebiaoPage"]),
  },
  watch: {
    redulianjiebiaoPage: function (page) {
      this.$store.commit("redulianjiebiaoPage", page);
      this.getData();
    },
  },
  data() {
    return {
      zqDialogVisible: false,
      total: 150,
      keyword: "",
      time: "",
      time2: "",
      nowIndex: 1,
      tagVal: "",
      tagList: [],
      tableData: [],
       xgDialogVisible:false,
      addForm:{
         title:'',
      },
      xgId:'',
    };
  },
  created() {
    this.$store.commit('redulianjiebiaoPage',1)
    this.getGjcData();
    this.getData();
  },
  mounted() {
    var arr = this.tableData.filter((ele) => {
      return ele.sex == "Women";
    });
    this.$refs.xTable1.setCheckboxRow(arr, true);
  },
  methods: {
    xgHandleClose(){
      this.xgDialogVisible = false;
    },
    searchKey(){
      this.$store.commit("redulianjiebiaoPage", 1);
      this.getData()
    },
    async getData() {
      const res = await this.$api.hotwords_list({
        keyword:this.keyword,
        page: this.redulianjiebiaoPage,
        pagesize: 9
      });
      this.tableData = res.list;
      this.total = res.total
    },
    async AddOnSubmit(){
      const res = await this.$api.update_hotwords({
        id:this.xgId,
        title : this.addForm.title,
      })
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getData();
        this.xgDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    tabEdit(row) {
      this.xgId = row.id;
      this.addForm.title = row.title
      this.xgDialogVisible = true
    },
    async tabDel(row){
      const res = await this.$api.del_hotwords({
        id:row.id
      })
      if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
    },
    zqHandleClose() {
      this.zqDialogVisible = false;
    },
    async getGjcData() {
      const res = await this.$api.keyword_list({
        day: this.time ? this.time : "",
        page: 1,
        pagesize: 1000000,
      });
      this.tagList = res.list;
    },
    tuichu() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      sessionStorage.setItem("user_level", '');
      this.$router.push({ path: "/Shouye" });
      this.$router.go(0);
    },
    changeTime() {
      this.getGjcData();
    },
    changeIndex(i) {
      this.nowIndex = i;
    },
    selectAllEvent1() {
      const records = this.$refs.xTable1.getCheckboxRecords();
      this.arr1 = [];
      records.forEach((ele) => {
        this.arr1.push(ele.id);
      });
    },
    selectChangeEvent1() {
      const records = this.$refs.xTable1.getCheckboxRecords();
      // console.log(checked ? "勾选事件" : "取消事件", records);
      this.arr1 = [];
      records.forEach((ele) => {
        this.arr1.push(ele.id);
      });
    },
    async addTag() {
      if (this.tagVal) {
        const res = await this.$api.add_keyword({
          name: this.tagVal,
          day: this.time2 ? this.time2 : "",
        });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.tagVal = "";
          this.getGjcData();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    // selectAllChangeEvent1() {},
    // selectChangeEvent1() {},
    async removeTag(tag) {
      // this.tagList.splice(this.tagList.indexOf(tag), 1);
      const res = await this.$api.del_keyword({
        id: tag.id,
      });
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getGjcData();
      } else {
        this.$message.error(res.msg);
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("redulianjiebiaoPage", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--primary{
  border-color: #909399;
}
.index {
  padding: 0 10px;
}
.nav1.bt {
  justify-content: space-between;
}
.nav1 {
  display: flex;
  align-items: flex-end;
  // align-content: center;
  .n3-tit2 {
    /deep/ .el-button {
      padding: 0;
      height: 40px;
      width: 80px;
      background: transparent;
      color: #333333;
    }
  }
  .n1-tit1 {
    font-size: 30px;
    font-family: PingFang SC, PingFang SC-Medium; //aaa
    font-weight: 500; //aa
    color: #333;
    margin-right: 20px;
  }
  .titt {
    display: flex;
    align-items: center;
    .n1-tit2 {
      display: flex;
      align-content: center;
      .txt2-1 {
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium; //aaa
        font-weight: 500; //aa
        color: #333;
      }
    }
    .n1-tit3 {
      width: 130px;
      /deep/ .el-date-editor {
        width: 100%;
      }
      /deep/ .el-input__inner {
        background: #fff;
        border: 0;
        color: #333;
      }
    }
  }
}
.nav2 {
  margin-top: 6px;
  display: flex;
  align-items: center;
  .n2-tit1 {
    font-size: 12px;
    font-family: PingFang SC, PingFang SC-Medium; //aaa
    font-weight: 500; //aa
    color: #8291a9;
  }
  .el-icon-arrow-right {
    color: #8291a9;
    font-size: 14px;
    margin: 0 4px;
  }
  .n2-tit2 {
    font-size: 12px;
    font-family: PingFang SC, PingFang SC-Medium; //aaa
    font-weight: 500; //aa
    color: #333;
  }
}
.nav3 {
  margin-top: 22px;
  display: flex;
  align-items: center;
  .n3-tit1 {
    margin-right: 12px;
    width: 280px;
    /deep/ .el-input__inner {
      // background-color: #1f2935 !important;
      border: 0;
      padding: 0 20px 0 36px;
    }
    /deep/ .el-input-group__append {
      background: transparent;
      border: 1px solid #409eff !important;
      button.el-button {
        background-color: #409eff !important;
        color: #333;
        border-radius: 0;
      }
    }
  }
  .n3-tit2 {
    /deep/ .el-button {
      padding: 0;
      height: 40px;
      width: 120px;
      background: transparent;
      color: #333333;
    }
  }
  .n3-tit3 {
    display: flex;
    align-items: flex-end;
    margin-left: 10px;
    .btn.active {
      background: #122549;
      border: 1px solid #388bf4;
      color: #388bf4;
      line-height: 38px;
    }
    .btn {
      cursor: pointer;
      margin-left: 8px;
      width: 60px;
      height: 40px;
      background: #808080;
      border-radius: 5px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium; //aaa
      font-weight: 500; //aa
      color: #333;
      letter-spacing: 0.18px;
    }
    .myPopover {
      .el-icon-plus {
        margin-left: 4px;
      }
      .el-button {
        background: #122549;
        border: 0;
        padding: 9px 15px 7px 15px;
        color: #ffffff;
      }
    }
  }
}
.nav4 {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  .titt1 {
    display: flex;
    align-items: center;
  }
  .titt2 {
    display: flex;
    align-items: center;
  }
}
.myTable {
  margin-top: 10px;
  .cjyl {
    display: flex;
    align-items: center;
    .dian {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dian.success {
      background: #5cd56c;
    }
    .dian.fail {
      background: #ff6b6b;
    }
    .txt {
      margin-left: 10px;
      color: #333;
    }
  }
  /deep/ .vxe-table--header-wrapper {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  /deep/ .vxe-header--column {
    background: #eef6fe;
    color: #409eff;
  }
  /deep/ .vxe-table--header {
    // border-bottom: 2px solid #BABABA;
  }
  /deep/ .body--wrapper {
    background-color: #fff;
  }
  /deep/ .vxe-body--row {
    border-bottom: 2px solid #BABABA !important;
    // border-right: 2px solid #BABABA !important;
    // &:nth-child(3n) {
    //   border-right: 0px solid #10183c !important;
    // }
  }
  /deep/ .vxe-table--render-default .vxe-cell {
    // width: 100px !important;
    word-break: inherit;
  }
  /deep/ .vxe-table--body {
    border-collapse: collapse;
    width: 100%;
    /deep/ .vxe-table--render-default .vxe-cell {
      width: 200px !important;
      word-break: inherit;
    }
    tbody {
      width: inherit;
      // display: flex;
      flex-wrap: wrap;
    }
  }
  // /deep/ .vxe-body--row {
  //   td:nth-of-type(2) {
  //     width: 358px;
  //   }
  // }
  // /deep/ .vxe-body--row{
  //   :nth-child(1){
  //     width: 358px;
  //   }
  // }
  // /deep/ .vxe-body--column{
  //   :nth-child(2){
  //     width: 358px;
  //   }
  // }
  /deep/ .vxe-cell--label {
    color: #333;
  }
  /deep/ .vxe-checkbox--icon:before {
    // background-color: #1f2935;
    border: 1px solid #8291a9;
  }
}
.fenye {
  margin-top: 30px;
  float: right;
  /deep/ .el-pagination__total {
    color: #333;
  }
  /deep/ .btn-prev {
    background-color: #fff !important;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    i {
      color: #333;
    }
  }
  /deep/ .btn-next {
    background-color: #fff !important;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    i {
      color: #333;
    }
  }
  /deep/ .el-pager {
    li {
      background: #fff;
      min-width: 28px;
    }
    .number {
      color: #333;
    }
    .number.active {
      color: #409eff;
    }
  }
}
/deep/ .el-dialog__body{
  padding: 0 !important;
}
.myPopover {
  // transform: translateY(-30px);
  .el-icon-plus {
    margin-left: 4px;
  }
  /deep/ .el-input__inner{
    background-color: transparent;
    color: #ffffff;
  }
  /deep/ .el-tag{
    background-color: transparent;
    color: #ffffff;
  }
  // .el-button {
  //   background: #122549;
  //   border: 0;
  //   padding: 9px 15px 7px 15px;
  //   color: #ffffff;
  // }
}
</style>