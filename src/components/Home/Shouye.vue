<template>
  <div class="index">
    <el-row v-if="isLogin != 'false' && user_level != 2 && isLogin != 'null' && isLogin != null">
      <div class="nav1">
        <div class="r1"></div>
        <div class="r2"></div>
        <div class="r3"></div>
        <div class="r4"></div>
        <div class="n1-content">
          <div
            @click="changeIndex(0)"
            :class="{ 'n1-txt': true, active: syIndex == 0 }"
          >
            全部
          </div>
          <div
            @click="changeIndex(i + 1, item)"
            v-for="(item, i) in navList"
            :key="item.id"
            :class="{ 'n1-txt': true, active: syIndex == i + 1 }"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </el-row>
    <div class="nav2">
      <el-row :gutter="24">
        <el-col :span="7">
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
                  <div
                    @click="toNewUrl(item)"
                    v-for="item in citiaoList"
                    :key="item.id"
                    class="item"
                  >
                    {{ item.title }}
                  </div>
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
                    <div
                      class="t1-r"
                      @click="
                        isyuntu = false;
                        myZoushi.setOption(option2);
                      "
                    >
                      <div class="r1-r"></div>
                      <div class="r2-r"></div>
                      走势图
                    </div>
                  </div>
                  <div v-show="isyuntu" class="reciyuntu">
                    <div style="height: 260px" id="yuntu"></div>
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
                      <div class="r2-r"></div>
                      热词云图
                    </div>
                  </div>
                  <div v-show="!isyuntu" @click="toZoushitu" class="zoushitu">
                    <div
                      style="height: 230px; width: 380px; margin-top: 6px"
                      id="zoushi"
                    ></div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="17">
          <div class="n2-right">
            <div class="r1"></div>
            <div class="r2"></div>
            <div class="r3"></div>
            <div class="r4"></div>
            <div class="n2r-content">
              <div class="n2r-tit1">
                <div class="left">
                  <div class="dian"></div>
                  <div
                    @click="changeTabIndex(0)"
                    :class="{ txt: true, active: sytableIndex == 0 }"
                  >
                    新闻
                  </div>
                  <div
                    v-if="user_level != '' && isLogin != 'false' && isLogin != 'null' && isLogin != null"
                    @click="changeTabIndex(1)"
                    :class="{ txt: true, active: sytableIndex == 1 }"
                  >
                    舆情
                  </div>
                  <div
                    v-if="user_level == 1 || user_level == 3"
                    @click="changeTabIndex(2)"
                    :class="{ txt: true, active: sytableIndex == 2 }"
                  >
                    视频
                  </div>
                  <div
                    v-if="user_level == 2"
                    @click="changeTabIndex(3)"
                    :class="{ txt: true, active: sytableIndex == 3 }"
                  >
                    发布(新闻)
                  </div>
                  <div
                    v-if="user_level == 2"
                    @click="changeTabIndex(4)"
                    :class="{ txt: true, active: sytableIndex == 4 }"
                  >
                    发布(舆情)
                  </div>
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
                <vxe-column
                  field="title"
                  show-overflow
                  title="标题"
                ></vxe-column>
                <vxe-column
                  field="site_name"
                  show-overflow
                  title="作者"
                ></vxe-column>
                <vxe-column
                  field="content"
                  show-overflow
                  title="新闻内容"
                ></vxe-column>
                <vxe-column
                  field="hit_type"
                  show-overflow
                  title="关注度"
                ></vxe-column>
                <vxe-column
                  field="reptile_date"
                  show-overflow
                  title="发布时间"
                ></vxe-column>
                <vxe-column field="lj" show-overflow title="链接">
                  <template #default="{ row }">
                    <a
                      style="color: #04f9db"
                      :href="`${row.new_url}`"
                      target="_black"
                      >{{ row.new_url }}</a
                    >
                  </template>
                </vxe-column>
                <!-- <vxe-column
                  field="source"
                  show-overflow
                  title="来源"
                ></vxe-column> -->
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button
                        v-if="sytableIndex == 1"
                        size="small"
                        @click="yidongnews(scope.row)"
                        type="text"
                        >移动至新闻</el-button
                      >
                      <el-button
                        v-if="sytableIndex == 0"
                        size="small"
                        @click="yidongYuqin(scope.row)"
                        type="text"
                        >移动至舆情</el-button
                      >
                      <el-button
                        size="mini"
                        type="danger"
                        v-if="sytableIndex == 3 || sytableIndex == 4"
                        @click="tabDel(scope.row)"
                        >删除</el-button
                      >
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
              <vxe-table
                v-if="sytableIndex == 1"
                class="myTab"
                border="none"
                align="center"
                height="520"
                :cell-class-name="cellClassName"
                :data="tableData1"
                @scroll="scrollEvent"
              >
                <vxe-column
                  field="title"
                  show-overflow
                  title="标题"
                ></vxe-column>
                <vxe-column
                  field="site_name"
                  show-overflow
                  title="作者"
                ></vxe-column>
                <vxe-column
                  field="content"
                  show-overflow
                  title="评论内容"
                ></vxe-column>
                <vxe-column
                  field="hit_type"
                  show-overflow
                  title="关注度"
                ></vxe-column>
                <vxe-column
                  field="reptile_date"
                  show-overflow
                  title="发布时间"
                ></vxe-column>
                <vxe-column field="lj" show-overflow title="链接">
                  <template #default="{ row }">
                    <a
                      style="color: #04f9db"
                      :href="`${row.new_url}`"
                      target="_black"
                      >{{ row.new_url }}</a
                    >
                  </template>
                </vxe-column>
                <!-- <vxe-column
                  field="source"
                  show-overflow
                  title="来源"
                ></vxe-column> -->
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div class="flex">
                      <el-button
                        v-if="sytableIndex == 1"
                        size="small"
                        @click="yidongnews(scope.row)"
                        type="text"
                        >移动至新闻</el-button
                      >
                      <el-button
                        v-if="sytableIndex == 0"
                        size="small"
                        @click="yidongYuqin(scope.row)"
                        type="text"
                        >移动至舆情</el-button
                      >
                      <el-button
                        size="mini"
                        type="danger"
                        v-if="sytableIndex == 3 || sytableIndex == 4"
                        @click="tabDel(scope.row)"
                        >删除</el-button
                      >
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
              <vxe-table
                v-if="sytableIndex == 2"
                class="myTab"
                border="none"
                align="center"
                height="520"
                :cell-class-name="cellClassName"
                :data="tableData1"
                @scroll="scrollEvent"
              >
                <vxe-column
                  field="title"
                  show-overflow
                  title="新闻标题"
                ></vxe-column>
                <vxe-column
                  field="hits"
                  show-overflow
                  title="浏览量"
                ></vxe-column>
                <vxe-column
                  field="forward_num"
                  show-overflow
                  title="转发量"
                ></vxe-column>
                <vxe-column
                  field="video_playnum"
                  show-overflow
                  title="播放量"
                ></vxe-column>
                <vxe-column
                  field="site_name"
                  show-overflow
                  title="作者"
                ></vxe-column>
                <vxe-column field="lj" show-overflow title="链接">
                  <template #default="{ row }">
                    <a
                      style="color: #04f9db"
                      :href="`${row.video_h5url}`"
                      target="_black"
                      >{{ row.video_h5url }}</a
                    >
                  </template>
                </vxe-column>
              </vxe-table>
              <vxe-table
                v-if="sytableIndex == 3"
                class="myTab"
                border="none"
                align="center"
                height="520"
                :cell-class-name="cellClassName"
                :data="tableData1"
                @scroll="scrollEvent"
              >
                <vxe-column
                  field="title"
                  show-overflow
                  title="标题"
                ></vxe-column>
                <vxe-column
                  field="site_name"
                  show-overflow
                  title="作者"
                ></vxe-column>
                <vxe-column
                  field="content"
                  show-overflow
                  title="新闻内容"
                ></vxe-column>
                <vxe-column
                  field="hit_type"
                  show-overflow
                  title="关注度"
                ></vxe-column>
                <vxe-column
                  field="reptile_date"
                  show-overflow
                  title="发布时间"
                ></vxe-column>
                <vxe-column show-overflow field="age" title="链接">
                  <template #default="{ row }">
                    <a
                      style="color: #04f9db"
                      :href="`${row.new_url}`"
                      target="_black"
                      >{{ row.new_url }}</a
                    >
                  </template>
                </vxe-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div style="display: flex">
                      <el-button
                        v-if="sytableIndex == 1"
                        size="small"
                        @click="yidongnews(scope.row)"
                        type="text"
                        >移动至新闻</el-button
                      >
                      <el-button
                        v-if="sytableIndex == 0"
                        size="small"
                        @click="yidongYuqin(scope.row)"
                        type="text"
                        >移动至舆情</el-button
                      >
                      <el-button
                        size="mini"
                        type="danger"
                        v-if="sytableIndex == 3 || sytableIndex == 4"
                        @click="tabDel(scope.row)"
                        >删除</el-button
                      >
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>

              <vxe-table
                v-if="sytableIndex == 4"
                class="myTab"
                border="none"
                align="center"
                height="520"
                :cell-class-name="cellClassName"
                :data="tableData1"
                @scroll="scrollEvent"
              >
                <vxe-column
                  field="title"
                  show-overflow
                  title="标题"
                ></vxe-column>
                <vxe-column
                  field="site_name"
                  show-overflow
                  title="作者"
                ></vxe-column>
                <vxe-column
                  field="content"
                  show-overflow
                  title="新闻内容"
                ></vxe-column>
                <vxe-column
                  field="hit_type"
                  show-overflow
                  title="关注度"
                ></vxe-column>
                <vxe-column
                  field="reptile_date"
                  show-overflow
                  title="发布时间"
                ></vxe-column>
                <vxe-column show-overflow field="age" title="链接">
                  <template #default="{ row }">
                    <a
                      style="color: #04f9db"
                      :href="`${row.new_url}`"
                      target="_black"
                      >{{ row.new_url }}</a
                    >
                  </template>
                </vxe-column>
                <vxe-table-column title="操作状态" width="120">
                  <template slot-scope="scope">
                    <div style="display: flex">
                      <el-button
                        v-if="sytableIndex == 1"
                        size="small"
                        @click="yidongnews(scope.row)"
                        type="text"
                        >移动至新闻</el-button
                      >
                      <el-button
                        v-if="sytableIndex == 0"
                        size="small"
                        @click="yidongYuqin(scope.row)"
                        type="text"
                        >移动至舆情</el-button
                      >
                      <el-button
                        size="mini"
                        type="danger"
                        v-if="sytableIndex == 3 || sytableIndex == 4"
                        @click="tabDel(scope.row)"
                        >删除</el-button
                      >
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 移动到舆情 -->
    <el-dialog
      :visible.sync="dialogVisible1"
      width="586px"
      :before-close="handleClose1"
    >
      <div class="dia1">
        <div class="txt1">确定将这条新闻信息移动至舆情中？</div>
        <div class="btns">
          <div @click="dialogVisible1 = false" class="btn1">取消</div>
          <div @click="toyuqinSubmit" class="btn2">确定</div>
        </div>
      </div>
    </el-dialog>
    <!-- 移动到新闻 -->
    <el-dialog
      :visible.sync="dialogVisible2"
      width="586px"
      :before-close="handleClose2"
    >
      <div class="dia1">
        <div class="txt1">确定将这条舆情信息移动至新闻中？</div>
        <div class="btns">
          <div @click="dialogVisible2 = false" class="btn1">取消</div>
          <div @click="tonewsSubmit" class="btn2">确定</div>
        </div>
      </div>
    </el-dialog>
    <!-- 编辑热度链接 -->
    <el-dialog
      title="添加/编辑热度链接"
      :visible.sync="syaddDialogVisible"
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
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="作者：">
                <el-input size="small" v-model="addForm.site_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="20">
              <el-form-item label="链接：">
                <el-input size="small" v-model="addForm.new_url"></el-input>
                <el-button
                  style="width: 100%"
                  v-if="syisAdd"
                  size="small"
                  type="primary"
                  @click="huoqu"
                  >获取</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="标题：">
                <el-input
                  size="small"
                  type="textarea"
                  v-model="addForm.title"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="来源：">
                <el-input
                  size="small"
                  v-model="addForm.source"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row >
            <el-col :span="20">
              <el-form-item label="内容：">
                <el-input
                  size="small"
                  type="textarea"
                  :rows="8"
                  v-model="addForm.content"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="时间：">
                <!-- <el-input size="small" v-model="addForm.time"></el-input> -->
                <el-date-picker
                  size="mini"
                  value-format="yyyy-MM-dd"
                  v-model="addForm.news_day"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="确认密码：">
                <el-input size="small" v-model="addForm.reuserpass"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button
                  style="width: 100%"
                  size="small"
                  type="primary"
                  @click="AddOnSubmit"
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
      "syIndex",
      "zstTime",
      "pxIndex",
      "sySearch",
      "syisAdd",
      "syaddDialogVisible",
    ]),
  },
  watch: {
    zstTime: function () {
      this.getZstData();
    },
    syisAdd: function () {
      console.log(this.syisAdd);
      if (this.syisAdd) {
        for (const key in this.addForm) {
          this.addForm[key] = "";
        }
      }
    },
    sySearch: function () {
      this.is_hotwords = 1;
      this.tableData1 = [];
      this.page = 1;
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      } else if (this.sytableIndex == 2) {
        this.getData3();
      } else if (this.sytableIndex == 3) {
        this.getData4();
      } else if (this.sytableIndex == 4) {
        this.getData5();
      }
    },
    pxIndex: function () {
      this.tableData1 = [];
      this.page = 1;
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      } else if (this.sytableIndex == 2) {
        this.getData3();
      } else if (this.sytableIndex == 3) {
        this.getData4();
      } else if (this.sytableIndex == 4) {
        this.getData5();
      }
    },
  },
  data() {
    return {
      is_hotwords: 1,
      isyuntu: true,
      tableData1: [],
      // sytableIndex: 1,
      option1: {},
      option2: {},
      myYuntu: null,
      keywords: null,
      myZoushi: null,
      dialogVisible1: false,
      dialogVisible2: false,
      navList: [],
      page: 1,
      scroll: true,
      site_id: "",
      nowItem: null,
      citiaoList: [],
      isLogin: "",
      user_level: "",
      addForm: {
        site_name: "",
        title: "",
        new_url: "",
        source: "",
        urls: "",
        news_day: "",
        add_userid: "",
        comment: null,
        content: "",
        day: "",
        forward_num: "",
        is_add: "",
        news_hit: "",
        news_id: "",
        site_id: "",
        video: null,
      },
    };
  },
  created() {
    this.isLogin = sessionStorage.getItem("isLogin");
    this.user_level = sessionStorage.getItem("user_level");
    console.log(this.isLogin, "isLogin");
    this.getCitiao();
    this.getZstData();
    this.getxinwenData();
    const loading = this.$loading({
      lock: true,
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    setTimeout(() => {
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      } else if (this.sytableIndex == 2) {
        this.getData3();
      } else if (this.sytableIndex == 3) {
        this.getData4();
      } else if (this.sytableIndex == 4) {
        this.getData5();
      }
      loading.close();
    }, 500);
  },
  mounted() {
    this.myYuntu = echarts.init(document.getElementById("yuntu"));
    this.keywords = [];
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
            color: function (e) {
              if (e.dataIndex == 2) {
                return "#FFBA00";
              } else {
                return "#ffffff";
              }
            },
          },
          data: this.keywords,
        },
      ],
    };
    this.myYuntu.setOption(this.option1);
    this.myYuntu.on("click", (params) => {
      console.log(params.data);
      this.$store.commit("sySearch", params.data.name);
    });
    this.myZoushi = echarts.init(document.getElementById("zoushi"));
    this.option2 = {
      legend: {
        data: ["频率"],
        x: "80%",
        textStyle: {
          fontSize: 12,
          color: "#ffffff",
          fontWeight: 700,
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "14%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [],
        axisLine: {
          lineStyle: {
            // 设置x轴颜色
            color: "#1794E4",
          },
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            // 设置y轴颜色
            color: "#0C9DDB",
          },
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#0c9ddb",
            fontWeight: 700,
          },
        },
      },
      series: [
        {
          data: [],
          name: "频率",
          type: "line",
          stack: "Total",
          symbolSize: 4,
          itemStyle: {
            normal: {
              label: {
                show: true,
              },
              borderColor: "#ffaea3", // 拐点边框颜色
              symbol: "circle",
              lineStyle: {
                width: 2, // 设置线宽
                color: "#ffaea3",
              },
            },
          },
        },
      ],
    };
    // this.myZoushi.setOption(this.option2);
  },
  methods: {
    async getZstData() {
      const res = await this.$api.hotwords_logs({
        year: this.zstTime[0],
        month: this.zstTime[1],
        day: this.zstTime[2],
      });
      console.log(res.list);
      this.list = res.list;
      var xAxis = [];
      var series = [];
      var keyword = [];
      res.list.forEach((ele) => {
        xAxis.push(ele.title);
        series.push(ele.num);
        keyword.push({
          name: ele.title,
          value: ele.num,
        });
      });
      if (this.option2) {
        this.$set(this.option2.xAxis, "data", xAxis);
        this.$set(this.option2.series[0], "data", series);
        setTimeout(() => {
          this.myZoushi.setOption(this.option2);
        }, 500);
      }
      if (this.option1) {
        this.keywords = keyword;
        this.$set(this.option1.series[0], "data", this.keywords);
        setTimeout(() => {
          this.myYuntu.setOption(this.option1);
        }, 500);
      }
    },
    async AddOnSubmit() {
      let res = null;
      if (this.syisAdd) {
        this.$store.commit("syisAdd", false);
        res = await this.$api.add_hotlink({
          id: this.id,
          title: this.addForm.title,
          source: this.addForm.source,
          day: this.addForm.news_day,
          url: this.addForm.new_url,
          site_id: this.addForm.site_id,
          content: this.addForm.content,
          is_add: this.addForm.is_add,
          news_id: this.addForm.news_id,
          news_hit: this.addForm.news_hit,
          author: this.addForm.author,
          add_userid: this.addForm.add_userid,
          forward_num: this.addForm.forward_num,
          video: this.addForm.video,
          comment: this.addForm.comment,
          types: this.sytableIndex == 3 ? "0" : "1",
        });
        console.log(res);
      } else {
        if (this.sytableIndex == 3) {
          res = await this.$api.news_edit({
            id: this.id,
            title: this.addForm.title,
            source: this.addForm.source,
            news_day: this.addForm.news_day,
            urls: this.addForm.new_url,
            content: this.addForm.content,
          });
          console.log(res);
        } else if (this.sytableIndex == 4) {
          res = await this.$api.pubsentiment_edit({
            id: this.id,
            title: this.addForm.title,
            source: this.addForm.source,
            news_day: this.addForm.news_day,
            urls: this.addForm.new_url,
          });
          console.log(res);
        }
      }

      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.$store.commit("syaddDialogVisible", false);
        this.tableData1 = [];
        this.page = 1
        if (this.sytableIndex == 3) {
          this.getData4();
        } else if (this.sytableIndex == 4) {
          this.getData5();
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    addHandleClose() {
      this.$store.commit("syaddDialogVisible", false);
    },
    async huoqu() {
      const res = await this.$api.check_hotlink({
        url: this.addForm.new_url,
      });
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        // this.addForm = {...res.reptile}
        this.addForm.news_day = res.reptile.day;
        this.addForm.comment = res.reptile.comment;
        this.addForm.title = res.reptile.title;
        this.addForm.is_add = res.reptile.is_add;
        this.addForm.news_id = res.reptile.news_id;
        this.addForm.source = res.reptile.source;
        this.addForm.news_hit = res.reptile.news_hit;
        this.addForm.author = res.reptile.author;
        this.addForm.add_userid = res.reptile.add_userid;
        this.addForm.forward_num = res.reptile.forward_num;
        this.addForm.video = res.reptile.video;
        this.addForm.comment = res.reptile.comment;
        this.addForm.content = res.reptile.content;
        this.addForm.site_id = res.reptile.site_id;
      } else {
        this.$message.error(res.msg);
      }
    },
    toNewUrl(item) {
      window.open(item.new_url);
    },
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
    async getCitiao() {
      const res = await this.$api.heat_entry({
        day: "",
        start_day: this.syStartTime,
        end_day: this.syEndTime,
      });
      console.log(res);
      if (res.list) {
        this.citiaoList = this.citiaoList.concat(res.list);
      } else {
        this.$message("没有更多了");
      }
    },
    async getData() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await this.$api.news_list({
        category: 2,
        is_hotwords: this.is_hotwords,
        keyword: this.sySearch,
        site_id: this.site_id,
        start_day: this.syStartTime,
        end_day: this.syEndTime,
        page: this.page,
        pagesize: 15,
        sort: this.pxIndex,
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
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await this.$api.comment_list({
        category: 2,
        is_hotwords: this.is_hotwords,
        keyword: this.sySearch,
        site_id: this.site_id,
        start_day: this.syStartTime,
        end_day: this.syEndTime,
        page: this.page,
        pagesize: 15,
        sort: this.pxIndex,
      });
      if (res.list) {
        this.tableData1 = this.tableData1.concat(res.list);
      } else {
        this.$message("没有更多了");
      }
      loading.close();
    },
    async getData3() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await this.$api.video_list({
        category: 2,
        is_hotwords: this.is_hotwords,
        keyword: this.sySearch,
        site_id: this.site_id,
        start_day: this.syStartTime,
        end_day: this.syEndTime,
        page: this.page,
        pagesize: 15,
        sort: this.pxIndex,
      });
      if (res.list) {
        this.tableData1 = this.tableData1.concat(res.list);
      } else {
        this.$message("没有更多了");
      }
      loading.close();
    },
    async getData4() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await this.$api.news_list({
        keyword: this.keyword,
        // site_id: this.site_id,
        // start_day: this.time && this.time.length > 1 ? this.time[0] : "",
        // end_day: this.time && this.time.length > 1 ? this.time[1] : "",
        page: this.page,
        pagesize: 15,
        sort: this.pxIndex,
        category: 1,
      });
      if (res.list) {
        this.tableData1 = this.tableData1.concat(res.list);
      } else {
        this.$message("没有更多了");
      }
      loading.close();
    },
    async getData5() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await this.$api.comment_list({
        keyword: this.keyword,
        page: this.page,
        pagesize: 15,
        sort: this.pxIndex,
        category: 1,
      });
      if (res.list) {
        this.tableData1 = this.tableData1.concat(res.list);
      } else {
        this.$message("没有更多了");
      }
      loading.close();
    },
    async tabDel(row) {
      let res = null;
      if (this.sytableIndex == 3) {
        res = await this.$api.news_del({ id: row.id });
      } else if (this.sytableIndex == 4) {
        res = await this.$api.pubsentiment_del({ id: row.id });
      }
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.keyword = "";
        this.tableData1 = [];
        this.page = 1;
        if (this.sytableIndex == 3) {
          this.getData4();
        } else if (this.sytableIndex == 4) {
          this.getData5();
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    async toyuqinSubmit() {
      const res = await this.$api.newstopublicsentiment({
        news_id: this.nowItem.id,
      });
      this.$message(res.msg);
      this.dialogVisible1 = false;
      this.tableData1 = [];
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      }
    },
    async tonewsSubmit() {
      const res = await this.$api.publicsentimenttonews({
        publicsentiment_id: this.nowItem.id,
      });
      this.$message(res.msg);
      this.dialogVisible2 = false;
      this.tableData1 = [];
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      }
    },
    scrollEvent({ scrollTop, scrollHeight }) {
      if (scrollTop + 470 >= scrollHeight) {
        this.page++;
        if (this.sytableIndex == 0) {
          this.getData();
        } else if (this.sytableIndex == 1) {
          this.getData2();
        } else if (this.sytableIndex == 2) {
          this.getData3();
        } else if (this.sytableIndex == 3) {
          this.getData4();
        } else if (this.sytableIndex == 4) {
          this.getData5();
        }
      }
    },
    handleClose1() {
      this.dialogVisible1 = false;
    },
    handleClose2() {
      this.dialogVisible2 = false;
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
      } else if (this.sytableIndex == 2) {
        this.getData3();
      } else if (this.sytableIndex == 3) {
        this.getData4();
      } else if (this.sytableIndex == 4) {
        this.getData5();
      }
    },
    changeTabIndex(i) {
      // this.sytableIndex = i;
      this.$store.commit("sySearch", "");
      this.$store.commit("sytableIndex", i);
      this.tableData1 = [];
      this.page = 1;
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      } else if (this.sytableIndex == 2) {
        this.getData3();
      } else if (this.sytableIndex == 3) {
        this.getData4();
      } else if (this.sytableIndex == 4) {
        this.getData5();
      }
    },
    yidongYuqin(row) {
      console.log(row);
      this.nowItem = row;
      this.dialogVisible1 = true;
    },
    yidongnews(row) {
      console.log(row);
      this.nowItem = row;
      this.dialogVisible2 = true;
    },
    shuaxin() {
      this.tableData1 = [];
      this.page = 1;
      if (this.sytableIndex == 0) {
        this.getData();
      } else if (this.sytableIndex == 1) {
        this.getData2();
      } else if (this.sytableIndex == 2) {
        this.getData3();
      } else if (this.sytableIndex == 3) {
        this.getData4();
      } else if (this.sytableIndex == 4) {
        this.getData5();
      }
    },
    goToUrl() {
      if (this.sytableIndex == 0) {
        this.$router.push({
          name: "Xinwen",
          params: { site_id: this.site_id },
        });
      } else if (this.sytableIndex == 1) {
        this.$router.push({
          name: "Yuqing",
          params: { site_id: this.site_id },
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
    },
  },
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
    background-color: #006dd0;
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
    background: #f0f2f5;
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
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            color: #04ffe0;
            letter-spacing: 2px;
          }
        }
        .items {
          margin: 8px 22px 10px 18px;
          height: 200px;
          overflow-y: scroll;
          .item {
            border-bottom: 1px solid rgba(255, 255, 255, 0.31);
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            color: #ffffff;
            letter-spacing: 1.6px;
            // height: 42px;
            line-height: 36px;
          }
        }
      }
    }
    .n2l-down {
      margin-top: 18px;
      height: 334px;
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
              font-family: PingFang SC, PingFang SC-Medium; //aaa
              font-weight: 500; //aa
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
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
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
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
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
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            text-align: center;
            line-height: 28px;
            color: #ffffff;
            letter-spacing: 1.6px;
          }
          .txt2 {
            cursor: pointer;
            margin-left: 18px;
            font-size: 12px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
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
/deep/ .vxe-table--header {
  width: 100%;
}
/deep/ .vxe-table--body {
  width: 100%;
}
</style>