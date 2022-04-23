<template>
  <div class="index">
    <div class="nav1">
      <div class="n1-tit1">添加云图热词</div>
      <div class="titt">
        <div class="n1-tit2">
          <div class="txt2-1">选择日期：</div>
        </div>
        <div class="n1-tit3">
          <el-date-picker size="mini" v-model="time" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
    </div>
    <div class="nav2">
      <div class="n2-tit1">采集</div>
      <i class="el-icon-arrow-right"></i>
      <div class="n2-tit2">添加云图热词</div>
    </div>
    <div class="nav3">
      <div class="n3-tit1">
        <el-input placeholder="请输入云图热词" prefix-icon="el-icon-search" v-model="tagVal"></el-input>
      </div>
      <div class="n3-tit2">
        <el-button @click="addTag" type="primary" icon="el-icon-plus"></el-button>
      </div>
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
      <div class="titt1 titt">
        <div class="n1-tit2">
          <div class="txt2-1">发布日期：</div>
        </div>
        <div class="n1-tit3">
          <el-date-picker size="mini" v-model="time2" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <!-- <div class="titt2">
        <el-button size="mini" type="primary">批量发布</el-button>
        <el-button size="mini" type="danger">批量删除</el-button>
      </div> -->
    </div>
    <div class="myTable">
      <vxe-table
        height="536"
        border="none"
        ref="xTable1"
        :data="tagList"
        @checkbox-all="selectAllChangeEvent1"
        @checkbox-change="selectChangeEvent1"
      >
        <vxe-column type="checkbox" width="38"></vxe-column>
        <vxe-column field="keyword" title="热词搜索"></vxe-column>
        <vxe-table-column width="160">
          <template slot-scope="scope">
            <div style="display:flex;">
              <el-button size="mini" type="info" @click="yidongYuqin(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="removeTag(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["redulianjiebiaoPage"])
  },
  watch: {
    redulianjiebiaoPage: function(page) {
      this.$store.commit("redulianjiebiaoPage", page);
      this.getData();
    }
  },
  data() {
    return {
      total: 150,
      keyword: "",
      time: "",
      time2: "",
      nowIndex: 1,
      tagVal: "",
      tagList: [],
      tableData: []
    };
  },
  created() {
    this.getGjcData();
    // this.getData();
  },
  mounted() {
    var arr = this.tableData.filter(ele => {
      return ele.sex == "Women";
    });
    this.$refs.xTable1.setCheckboxRow(arr, true);
  },
  methods: {
    // async getData() {
    //   const res = await this.$api.config({
    //     day: this.time ? this.time : "",
    //     page: 1,
    //     pagesize: 1000000
    //   });
    //   this.tagList = res.list;
    // },
    async getGjcData() {
      const res = await this.$api.keyword_list({
        day: this.time ? this.time : "",
        page: 1,
        pagesize: 1000000
      });
      this.tagList = res.list;
    },
    changeTime() {
      this.getGjcData();
    },
    changeIndex(i) {
      this.nowIndex = i;
    },
    async addTag() {
      if (this.tagVal) {
        const res = await this.$api.add_keyword({
          name: this.tagVal,
          day: this.time2 ? this.time2 : ""
        });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.tagVal = "";
          this.getGjcData();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    selectAllChangeEvent1() {},
    selectChangeEvent1() {},
    async removeTag(tag) {
      // this.tagList.splice(this.tagList.indexOf(tag), 1);
      const res = await this.$api.del_keyword({
        id: tag.id
      });
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getGjcData();
      } else {
        this.$message.error(res.msg);
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("redulianjiebiaoPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  padding: 0 10px;
}
.nav1 {
  display: flex;
  align-items: flex-end;
  // align-content: center;
  .n1-tit1 {
    font-size: 30px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #ffffff;
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
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .n1-tit3 {
      width: 130px;
      /deep/ .el-date-editor {
        width: 100%;
      }
      /deep/ .el-input__inner {
        background: #122549;
        border: 0;
        color: #ffffff;
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
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #8291a9;
  }
  .el-icon-arrow-right {
    color: #8291a9;
    font-size: 14px;
    margin: 0 4px;
  }
  .n2-tit2 {
    font-size: 12px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #ffffff;
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
      background-color: #1f2935 !important;
      border: 0;
      padding: 0 20px 0 36px;
    }
  }
  .n3-tit2 {
    /deep/ .el-button {
      padding: 0;
      height: 40px;
      width: 40px;
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
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #ffffff;
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
      color: #ffffff;
    }
  }
  /deep/ .vxe-table--header-wrapper {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  /deep/ .vxe-header--column {
    background: #122549;
    color: #ffffff;
  }
  /deep/ .vxe-table--header {
    border-bottom: 2px solid #10183c;
  }
  /deep/ .body--wrapper {
    background-color: #122549;
  }
  /deep/ .vxe-body--row {
    border-bottom: 2px solid #10183c !important;
    border-right: 2px solid #10183c !important;
    width: 33.33%;
    &:nth-child(3n) {
      border-right: 0px solid #10183c !important;
    }
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
      display: flex;
      flex-wrap: wrap;
    }
  }
  /deep/ .vxe-body--row {
    td:nth-of-type(2) {
      width: 358px;
    }
  }
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
    color: #ffffff;
  }
  /deep/ .vxe-checkbox--icon:before {
    background-color: #1f2935;
    border: 1px solid #8291a9;
  }
}
.fenye {
  margin-top: 30px;
  float: right;
  /deep/ .el-pagination__total {
    color: #ffffff;
  }
  /deep/ .btn-prev {
    background-color: #122549 !important;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    i {
      color: #ffffff;
    }
  }
  /deep/ .btn-next {
    background-color: #122549 !important;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    i {
      color: #ffffff;
    }
  }
  /deep/ .el-pager {
    li {
      background: #122549;
      min-width: 28px;
    }
    .number {
      color: #ffffff;
    }
    .number.active {
      color: #409eff;
    }
  }
}
</style>