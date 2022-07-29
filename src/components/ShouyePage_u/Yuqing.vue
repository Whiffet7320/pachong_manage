<template>
  <div class="index">
    <div class="myTable">
      <div class="r1"></div>
      <div class="r2"></div>
      <div class="r3"></div>
      <div class="r4"></div>
      <div class="items" @scroll.passive="scroll1($event)">
        <div class="item" v-for="item in tableData1" :key="item.id">
          <div class="tit1">{{item.comment_content}}</div>
          <div class="tit2">
            <div class="txt2-1">{{item.comment_time}}</div>
            <!-- <div class="txt2-2">回复</div> -->
          </div>
          <div class="tit3">
            <div class="t3-left">
              <div class="txx1">链接：{{item.new_url}}</div>
              <div style="margin:0 30px" class="txx1">来源：{{item.source}}</div>
              <!-- <div style="cursor: pointer;" class="txx1">移动至新闻</div> -->
            </div>
            <!-- <div class="t3-right">
              <div class="txx1">关注度：1万+</div>
              <div style="margin-left:26px" class="txx1">转发情况：1万+</div>
            </div>-->
          </div>
        </div>
      </div>
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
      const res = await this.$api.comment_list({
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
    scroll1(e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (scrollBottom == 0) {
        console.log("滚动条到底了");
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
  .items {
    margin: 20px 34px;
    height: 710px;
    overflow-y: scroll;
    padding: 0 10px;
    .item {
      padding: 28px 0;
      border-bottom: 1px solid #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .tit1 {
        font-size: 20px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.87);
        line-height: 24px;
      }
      .tit2 {
        display: flex;
        align-items: center;
        margin-top: 6px;
        .txt2-1 {
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Medium; //aaa
          font-weight: 500; //aa
          color: rgba(255, 255, 255, 0.78);
          letter-spacing: 1.8px;
        }
        .txt2-2 {
          cursor: pointer;
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Medium; //aaa
          font-weight: 500; //aa
          color: #04f9db;
          margin-left: 30px;
          letter-spacing: 1.8px;
        }
      }
      .tit3 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        .t3-left {
          display: flex;
          align-items: center;
          .txx1 {
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            color: #ffffff;
            letter-spacing: 1.8px;
          }
        }
        .t3-right {
          display: flex;
          align-items: center;
          .txx1 {
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            color: #ffffff;
            letter-spacing: 1.8px;
          }
        }
      }
    }
  }
}
</style>