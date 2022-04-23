<template>
  <div class="index">
    <el-row>
      <div class="nav1">
        <div class="r1"></div>
        <div class="r2"></div>
        <div class="r3"></div>
        <div class="r4"></div>
        <div class="n1-content">
          <div @click="changeIndex(0)" :class="{'n1-txt':true,'active':syIndex == 0}">全部</div>
          <div
            @click="changeIndex(i+1,item)"
            v-for="(item,i) in navList"
            :key="item.id"
            :class="{'n1-txt':true,'active':syIndex == i+1}"
          >{{item.title}}</div>
        </div>
      </div>
    </el-row>
    <div class="nav2">
      <el-row :gutter="24">
        <!-- <el-col :span="7">
          <div class="n2-left">
            <div class="n2l-top">
              <div class="r1"></div>
              <div class="r2"></div>
              <div class="r3"></div>
              <div class="r4"></div>
              <div class="n2lt-content">
                <div class="tit1">
                  <div class="dian"></div>
                  <div class="txtt">热度词条</div>
                </div>
                <div class="items">
                  <div v-for="(item,i) in 10" :key="i" class="item">1、名师“领雁”助力教育“共富</div>
                </div>
              </div>
            </div>
            <div class="n2l-down">
              <div class="r1"></div>
              <div class="r2"></div>
              <div class="r3"></div>
              <div class="r4"></div>
              <div class="n2ld-content">
                <template>
                  <div v-show="isyuntu" class="tit1">
                    <div class="t1-l">
                      <div class="dian"></div>
                      <div class="txtt">热词云图</div>
                    </div>
                    <div class="t1-r" @click="isyuntu = false;myZoushi.setOption(option2);">
                      <div class="r1-r"></div>
                      <div class="r2-r"></div>走势图
                    </div>
                  </div>
                  <div v-show="isyuntu" class="reciyuntu">
                    <div style="height:260px" id="yuntu"></div>
                  </div>
                </template>
                <template>
                  <div v-show="!isyuntu" class="tit1">
                    <div class="t1-l">
                      <div class="dian"></div>
                      <div class="txtt">走势图</div>
                    </div>
                    <div class="t1-r" @click="isyuntu = true">
                      <div class="r1-r"></div>
                      <div class="r2-r"></div>热词云图
                    </div>
                  </div>
                  <div v-show="!isyuntu" @click="toZoushitu" class="zoushitu">
                    <div style="height:230px;width:380px;margin-top:6px" id="zoushi"></div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </el-col>-->
        <el-col :span="24">
          <div class="n2-right">
            <div class="r1"></div>
            <div class="r2"></div>
            <div class="r3"></div>
            <div class="r4"></div>
            <div class="n2r-content">
              <div class="n2r-tit1">
                <div class="left">
                  <div class="dian"></div>
                  <div @click="changeTabIndex(0)" :class="{'txt':true,active:sytableIndex == 0}">新闻</div>
                  <div @click="changeTabIndex(1)" :class="{'txt':true,active:sytableIndex == 1}">舆情</div>
                  <!-- <div @click="changeTabIndex(2)" :class="{'txt':true,active:sytableIndex == 2}">视频</div> -->
                </div>
                <div class="right">
                  <div @click="shuaxin" class="txt1">刷新</div>
                  <div class="txt2" @click="goToUrl">
                    更多
                    <i class="el-icon-d-arrow-right"></i>
                  </div>
                </div>
              </div>
              <vxe-table
                v-if="sytableIndex == 0"
                class="myTab"
                border="none"
                align="center"
                height="520"
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
                    <a
                      style="color:#04F9DB"
                      :href="`${row.new_url}`"
                      target="_black"
                    >{{row.new_url}}</a>
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
              <vxe-table
                v-else
                class="myTab"
                border="none"
                align="center"
                height="520"
                :cell-class-name="cellClassName"
                :data="tableData1"
                @scroll="scrollEvent"
              >
                <vxe-column field="news_name" show-overflow title="新闻标题"></vxe-column>
                <vxe-column field="site_name" show-overflow title="作者"></vxe-column>
                <vxe-column field="comment_content" show-overflow title="评论内容"></vxe-column>
                <vxe-column field="user_name" show-overflow title="评论用户"></vxe-column>
                <vxe-column field="comment_time" show-overflow title="发布时间"></vxe-column>
                <vxe-column field="lj" show-overflow title="链接">
                  <template #default="{ row }">
                    <a
                      style="color:#04F9DB"
                      :href="`${row.new_url}`"
                      target="_black"
                    >{{row.new_url}}</a>
                  </template>
                </vxe-column>
                <vxe-column field="source" show-overflow title="来源"></vxe-column>
                <!-- <vxe-table-column title="操作状态" width="100">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button size="small" @click="yidongYuqin(scope.row)" type="text">移动至新闻</el-button>
                    </div>
                  </template>
                </vxe-table-column>-->
              </vxe-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 移动到舆情 -->
    <el-dialog :visible.sync="dialogVisible1" width="586px" :before-close="handleClose1">
      <div class="dia1">
        <div class="txt1">确定将这条新闻信息移动至舆情中？</div>
        <div class="btns">
          <div @click="dialogVisible1 = false" class="btn1">取消</div>
          <div class="btn2">确定</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
// import wordCloud from 'echarts-wordcloud';
export default {
  computed: {
    ...mapState([
      "sytableIndex",
      "startTime",
      "endTime",
      "syStartTime",
      "syEndTime",
      "syIndex"
    ])
  },
  data() {
    return {
      isyuntu: true,
      tableData1: [],
      // sytableIndex: 1,
      option1: {},
      option2: {},
      myYuntu: null,
      keywords: null,
      myZoushi: null,
      dialogVisible1: false,
      navList: [],
      page: 1,
      scroll: true,
      site_id: ""
    };
  },
  created() {
    this.getxinwenData();
    const loading = this.$loading({
      lock: true,
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    setTimeout(() => {
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      }
      loading.close();
    }, 500);
  },
  mounted() {
    this.myYuntu = echarts.init(document.getElementById("yuntu"));
    this.keywords = [
      { name: "男神", value: 2.64 },
      { name: "好身材", value: 4.03 },
      { name: "校草", value: 4.95 },
      { name: "酷", value: 4.04 },
      { name: "时尚", value: 5.27 },
      { name: "阳光活力", value: 5.8 },
      { name: "初恋", value: 3.09 },
      { name: "英俊潇洒", value: 2.71 },
      { name: "霸气", value: 6.33 },
      { name: "腼腆", value: 2.55 },
      { name: "蠢萌", value: 1.88 },
      { name: "青春", value: 4.04 },
      { name: "网红", value: 2.87 },
      { name: "萌", value: 1.97 },
      { name: "认真", value: 2.53 },
      { name: "古典", value: 2.49 },
      { name: "温柔", value: 1.91 },
      { name: "有个性", value: 1.25 },
      { name: "可爱", value: 1.93 },
      { name: "幽默诙谐", value: 2.65 }
    ];
    this.option1 = {
      series: [
        {
          type: "wordCloud",
          sizeRange: [12, 20],
          rotationRange: [0, 0],
          rotationStep: 45,
          gridSize: 8,
          shape: "pentagon",
          width: "100%",
          height: "100%",
          textStyle: {
            color: function(e) {
              if (e.dataIndex == 2) {
                return "#FFBA00";
              } else {
                return "#ffffff";
              }
            }
          },
          data: this.keywords
        }
      ]
    };
    this.myYuntu.setOption(this.option1);
    this.myZoushi = echarts.init(document.getElementById("zoushi"));
    this.option2 = {
      legend: {
        data: ["频率"],
        x: "80%",
        textStyle: {
          fontSize: 12,
          color: "#ffffff",
          fontWeight: 700
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "14%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLine: {
          lineStyle: {
            // 设置x轴颜色
            color: "#1794E4"
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#fff"
          }
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            // 设置y轴颜色
            color: "#0C9DDB"
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#0c9ddb",
            fontWeight: 700
          }
        }
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          name: "频率",
          type: "line",
          stack: "Total",
          symbolSize: 4,
          itemStyle: {
            normal: {
              label: {
                show: true
              },
              borderColor: "#ffaea3", // 拐点边框颜色
              symbol: "circle",
              lineStyle: {
                width: 2, // 设置线宽
                color: "#ffaea3"
              }
            }
          }
        }
      ]
    };
    // this.myZoushi.setOption(this.option2);
  },
  methods: {
    async getxinwenData() {
      const res = await this.$api.site_list();
      this.navList = res.list;
      if (this.syIndex == 0) {
        this.site_id = 0;
      } else {
        this.site_id = this.navList[this.syIndex - 1].id;
      }
      console.log(this.site_id);
    },
    async getData() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const res = await this.$api.news_list({
        site_id: this.site_id,
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
    async getData2() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const res = await this.$api.comment_list({
        site_id: this.site_id,
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
      if (scrollTop + 470 >= scrollHeight) {
        this.page++;
        if (this.sytableIndex == 0) {
          this.getData();
        } else if (this.sytableIndex == 1) {
          this.getData2();
        }
      }
    },
    handleClose1() {
      this.dialogVisible1 = false;
    },
    changeIndex(i, item) {
      if (i == 0) {
        this.site_id = 0;
      } else {
        this.site_id = item.id;
      }
      this.$store.commit("syIndex", i);
      this.tableData1 = [];
      this.page = 1;
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      }
    },
    changeTabIndex(i) {
      // this.sytableIndex = i;
      this.$store.commit("sytableIndex", i);
      this.tableData1 = [];
      this.page = 1;
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      }
    },
    yidongYuqin(row) {
      console.log(row);
      this.dialogVisible1 = true;
    },
    shuaxin() {
      this.tableData1 = [];
      this.page = 1;
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      }
    },
    goToUrl() {
      if (this.sytableIndex == 0) {
        this.$router.push({
          name: "Xinwen",
          params: { site_id: this.site_id }
        });
      } else if (this.sytableIndex == 1) {
        this.$router.push({
          name: "Yuqing",
          params: { site_id: this.site_id }
        });
      } else if (this.sytableIndex == 2) {
        this.$router.push({ name: "Shipin" });
      }
    },
    toZoushitu() {
      this.$router.push({ name: "Zoushitu" });
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
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.myTab {
  /deep/ .el-button--text {
    color: #fff;
  }
}
/deep/ .vxe-body--column.col-active {
  line-height: 48px;
}
.nav1 {
  height: 63px;
  background: #121531;
  border: 2px solid #1794e4;
  box-shadow: 0px 0px 30px 0px rgba(23, 148, 228, 0.86) inset;
  position: relative;
  .r1 {
    position: absolute;
    width: 16px;
    height: 16px;
    border-top: 2px solid #04f9db;
    border-left: 2px solid #04f9db;
    top: -2px;
    left: -2px;
  }
  .r2 {
    position: absolute;
    width: 16px;
    height: 16px;
    border-top: 2px solid #04f9db;
    border-right: 2px solid #04f9db;
    top: -2px;
    right: -2px;
  }
  .r3 {
    position: absolute;
    width: 16px;
    height: 16px;
    border-bottom: 2px solid #04f9db;
    border-left: 2px solid #04f9db;
    bottom: -2px;
    left: -2px;
  }
  .r4 {
    position: absolute;
    width: 16px;
    height: 16px;
    border-bottom: 2px solid #04f9db;
    border-right: 2px solid #04f9db;
    bottom: -2px;
    right: -2px;
  }
  .n1-content::-webkit-scrollbar {
    width: 10px;
    height: 6px;
  }
  .n1-content::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: #02adf7;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  .n1-content::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #1b5aa9;
  }
  .n1-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow-x: scroll;
    .n1-txt {
      cursor: pointer;
      display: inline;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      color: #e8e8e8;
      letter-spacing: 0.18px;
      margin: 0 40px;
    }
    .n1-txt.active {
      color: #04f9db;
      font-size: 18px;
    }
  }
}
.nav2 {
  margin-top: 22px;
  .n2-left {
    .n2l-top {
      height: 302px;
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
      .n2lt-content {
        .tit1 {
          display: flex;
          align-items: center;
          margin-top: 30px;
          .dian {
            width: 8px;
            height: 8px;
            background: #04f9db;
            border-radius: 50%;
            margin: 0 8px 0 12px;
          }
          .txtt {
            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #04ffe0;
            letter-spacing: 2px;
          }
        }
        .items {
          margin: 8px 22px 10px 18px;
          height: 220px;
          overflow-y: scroll;
          .item {
            border-bottom: 1px solid rgba(255, 255, 255, 0.31);
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #ffffff;
            letter-spacing: 1.6px;
            height: 42px;
            line-height: 42px;
          }
        }
      }
    }
    .n2l-down {
      margin-top: 18px;
      height: 330px;
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
      .n2ld-content {
        .tit1 {
          margin-top: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .t1-l {
            display: flex;
            align-items: center;
            .dian {
              width: 8px;
              height: 8px;
              background: #04f9db;
              border-radius: 50%;
              margin: 0 8px 0 12px;
            }
            .txtt {
              font-size: 20px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              color: #04ffe0;
              letter-spacing: 2px;
            }
          }
          .t1-r {
            cursor: pointer;
            margin-right: 20px;
            width: 74px;
            height: 28px;
            border: 1px solid #1794e4;
            box-shadow: 0px 0px 20px 0px #1794e4 inset;
            font-size: 12px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: center;
            line-height: 28px;
            color: #ffffff;
            letter-spacing: 1.2px;
            position: relative;
            .r1-r {
              position: absolute;
              width: 6px;
              height: 14px;
              border-top: 2px solid #04f9db;
              border-left: 2px solid #04f9db;
              top: -2px;
              left: -2px;
            }
            .r2-r {
              position: absolute;
              width: 6px;
              height: 14px;
              border-bottom: 2px solid #04f9db;
              border-right: 2px solid #04f9db;
              bottom: -2px;
              right: -2px;
            }
          }
        }
        .reciyuntu {
          height: 300px;
        }
        .zoushitu {
          display: flex;
          align-items: center;
          #zoushi {
            margin: 0 auto;
          }
        }
      }
    }
  }
  .n2-right {
    height: 654px;
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
    .n2r-content {
      .n2r-tit1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px 28px;
        .left {
          display: flex;
          align-items: center;
          .dian {
            width: 8px;
            height: 8px;
            background: #04f9db;
            border-radius: 50%;
          }
          .txt {
            cursor: pointer;
            margin: 0 28px;
            font-size: 22px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #fff;
            letter-spacing: 2.2px;
          }
          .txt.active {
            color: #04ffe0;
          }
        }
        .right {
          display: flex;
          align-items: center;
          .txt1 {
            cursor: pointer;
            width: 62px;
            height: 28px;
            background: #2d8cf0;
            border-radius: 4px;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: center;
            line-height: 28px;
            color: #ffffff;
            letter-spacing: 1.6px;
          }
          .txt2 {
            cursor: pointer;
            margin-left: 18px;
            font-size: 12px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #ffffff;
            letter-spacing: 1.3px;
          }
        }
      }
    }
  }
}
.dia1 {
  .txt1 {
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: center;
    color: #0e0d0b;
    letter-spacing: 2.4px;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    .btn1 {
      cursor: pointer;
      width: 218px;
      height: 62px;
      border: 2px solid #388bf4;
      border-radius: 30px;
      font-size: 28px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      text-align: center;
      color: #388bf4;
      letter-spacing: 2.8px;
      line-height: 62px;
    }
    .btn2 {
      cursor: pointer;
      width: 218px;
      height: 62px;
      background: #388bf4;
      border-radius: 30px;
      width: 218px;
      height: 62px;
      background: #388bf4;
      border-radius: 30px;
      text-align: center;
      line-height: 62px;
      font-size: 28px;
      color: #fff;
      margin-left: 54px;
    }
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