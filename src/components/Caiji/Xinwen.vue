<template>
  <div class="index">
    <div class="nav1">
      <div class="n1-tit1">{{titleName}}</div>
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
      <div class="n2-tit1">历史发布</div>
      <i class="el-icon-arrow-right"></i>
      <div class="n2-tit2">{{titleName}}</div>
    </div>
    <div class="nav3">
      <div class="n3-tit1">
        <el-input placeholder="热度链接" prefix-icon="el-icon-search" v-model="keyword"></el-input>
      </div>
      <div class="n3-tit2">
        <el-button type="primary" icon="el-icon-plus"></el-button>
      </div>
      <div class="n3-tit3">
        <div @click="changeIndex(1)" :class="{'btn':true,'active':nowIndex == 1}">新闻</div>
        <div @click="changeIndex(2)" :class="{'btn':true,'active':nowIndex == 2}">舆情</div>
        <div
          @click="changeIndex(3)"
          style="margin-right:10px"
          :class="{'btn':true,'active':nowIndex == 3}"
        >视频</div>
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
      <div class="titt2">
        <el-button size="mini" type="primary">批量发布</el-button>
        <el-button size="mini" type="danger">批量删除</el-button>
      </div>
    </div>
    <div class="myTable">
      <vxe-table
        height="536"
        border="none"
        ref="xTable1"
        :data="tableData"
        @checkbox-all="selectAllChangeEvent1"
        @checkbox-change="selectChangeEvent1"
      >
        <vxe-column show-overflow type="checkbox" width="60"></vxe-column>
        <vxe-column show-overflow field="name" title="来源"></vxe-column>
        <vxe-column show-overflow field="sex" title="标题"></vxe-column>
        <vxe-column show-overflow field="age" title="链接">
          <template #default="{ row }">
            <a
              style="color:#ffffff"
              :href="`https://www.baidu.com/${row.name}`"
              target="_black"
            >https://www.baidu.com/{{row.name}}</a>
          </template>
        </vxe-column>
        <vxe-column show-overflow field="address" title="采集来源">
          <template #default="{ row }">
            <div class="cjyl">
              <div :class="{'dian':true,'success':row.age>25,'fail':row.age<=25}"></div>
              <div class="txt">{{row.address}}</div>
            </div>
          </template>
        </vxe-column>
        <vxe-table-column width="214">
          <template slot-scope="scope">
            <div style="display:flex">
              <el-button size="mini" type="info" @click="yidongYuqin(scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" @click="yidongYuqin(scope.row)">发布</el-button>
              <el-button size="mini" type="danger" @click="yidongYuqin(scope.row)">删除</el-button>
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-pagination
        class="fenye"
        :pager-count="5"
        @current-change="this.handleCurrentChange"
        :current-page="this.fabuXinwenPage"
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
    ...mapState(["fabuXinwenPage", "caijiFabuName"])
  },
  watch: {
    fabuXinwenPage: function(page) {
      this.$store.commit("fabuXinwenPage", page);
      this.getData();
    },
    caijiFabuName: function() {
      if (this.caijiFabuName == "新闻") {
        this.nowIndex = 1;
      } else if (this.caijiFabuName == "舆情") {
        this.nowIndex = 2;
      } else if (this.caijiFabuName == "视频") {
        this.nowIndex = 3;
      }
    },
    nowIndex: function() {
      if (this.nowIndex == 1) {
        this.titleName = "新闻";
      } else if (this.nowIndex == 2) {
        this.titleName = "舆情";
      } else if (this.nowIndex == 3) {
        this.titleName = "视频";
      }
      this.$store.commit("caijiFabuName", this.titleName);
    }
  },
  data() {
    return {
      titleName: "新闻",
      total: 150,
      keyword: "",
      time: "",
      time2: "",
      nowIndex: 1,
      tagVal: "",
      tagList: [],
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc"
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "Women",
          age: 22,
          address: "Guangzhou"
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          age: 32,
          address: "Shanghai"
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "Women",
          age: 23,
          address: "test abc"
        },
        {
          id: 10005,
          name: "Test5",
          role: "Develop",
          sex: "Women",
          age: 30,
          address: "Shanghai"
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "Women",
          age: 23,
          address: "test abc"
        },
        {
          id: 10005,
          name: "Test5",
          role: "Develop",
          sex: "Women",
          age: 30,
          address: "Shanghai"
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "Women",
          age: 23,
          address: "test abc"
        },
        {
          id: 10005,
          name: "Test5",
          role: "Develop",
          sex: "Women",
          age: 30,
          address: "Shanghai"
        }
      ]
    };
  },
  created() {},
  mounted() {
    var arr = this.tableData.filter(ele => {
      return ele.sex == "Women";
    });
    this.$refs.xTable1.setCheckboxRow(arr, true);
  },
  methods: {
    changeIndex(i) {
      this.nowIndex = i;
      this.$store.commit("fabuXinwenPage", 1);
    },
    addTag() {
      if (this.tagVal) {
        this.tagList.push({
          name: this.tagVal
        });
        this.tagVal = "";
      }
    },
    removeTag(tag) {
      this.tagList.splice(this.tagList.indexOf(tag), 1);
    },
    selectAllChangeEvent1() {},
    selectChangeEvent1() {},
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("fabuXinwenPage", val);
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
  }
  /deep/ .vxe-table--body {
    border-collapse: collapse;
  }
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