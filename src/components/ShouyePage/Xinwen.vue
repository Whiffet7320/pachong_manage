<template>
  <div class="index">
    <div class="myTable">
      <div class="r1"></div>
      <div class="r2"></div>
      <div class="r3"></div>
      <div class="r4"></div>
      <vxe-table
        class="myTab"
        border="none"
        align="center"
        height="690"
        :cell-class-name="cellClassName"
        :data="tableData1"
        @scroll="scrollEvent"
      >
        <vxe-column field="title" show-overflow title="标题"></vxe-column>
        <vxe-column field="site_name" show-overflow title="作者"></vxe-column>
        <vxe-column field="content" show-overflow title="新闻内容"></vxe-column>
        <vxe-column field="hit_type" show-overflow title="关注度"></vxe-column>
        <vxe-column field="reptile_date" show-overflow title="发布时间"></vxe-column>
        <vxe-column field="lj" show-overflow title="链接">
          <template #default="{ row }">
            <a style="color:#04F9DB" :href="`${row.new_url}`" target="_black">{{row.new_url}}</a>
          </template>
        </vxe-column>
        <vxe-column field="source" show-overflow title="来源"></vxe-column>
        <!-- <vxe-table-column title="操作状态" width="100">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="yidongYuqin(scope.row)" type="text">移动至舆情</el-button>
                    </div>
                  </template>
        </vxe-table-column>-->
      </vxe-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["syStartTime", "syEndTime"])
  },
  data() {
    return {
      tableData1: [],
      page: 1
    };
  },
  created() {
    console.log(this.$route.params.site_id);
    this.getData();
  },
  methods: {
    async getData() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const res = await this.$api.news_list({
        site_id: this.$route.params.site_id,
        start_day: this.syStartTime,
        end_day: this.syEndTime,
        page: this.page,
        pagesize: 15
      });
      if (res.list) {
        this.tableData1 = this.tableData1.concat(res.list);
      } else {
        this.$message("没有更多了");
      }
      loading.close();
    },
    scrollEvent({ scrollTop, scrollHeight }) {
      if (scrollTop + 640 >= scrollHeight) {
        this.page++;
        this.getData();
      }
    },
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