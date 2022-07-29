<template>
  <div class="header">
    <div class="left1">
      <div class="l1-top">
        <img src="../../assets/newIImg/zu903.png" class="pic1" alt />
      </div>
      <!-- 首页-左侧 -->
      <div class="l1-down" v-if="url == '/Shouye' || url == '/'">
        <div class="l1-dl" @click="toUrl('Shaixuanriqi')">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <img src="../../assets/newIImg/zu1324.png" class="c-pic" alt />
            <!-- <div class="c-txt">{{syStartTime}}-{{syEndTime}}</div> -->
            <div class="c-txt2">{{ syStartTime }}-{{ syEndTime }}</div>
          </div>
        </div>
        <div style="margin-left: 10px" class="l3-dl">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <img src="../../assets/newIImg/lujin768.png" class="c-pic" alt />
            <div class="c-txt">排序：</div>
            <div
              style="cursor: pointer"
              @click="changPaixu(1)"
              :class="{ 'c-txt': true, active: pxIndex == 1 }"
            >
              日期
            </div>
            <div style="margin: 0 2px" class="c-txt">/</div>
            <div
              style="cursor: pointer"
              @click="changPaixu(2)"
              :class="{ 'c-txt': true, active: pxIndex == 2 }"
            >
              关注度
            </div>
          </div>
        </div>
        <!-- <div class="l1-dr">
          <el-input v-model="keyword" prefix-icon="el-icon-search" placeholder="搜索"></el-input>
        </div> -->
      </div>
      <!-- 首页（视频）-左侧 -->
      <div
        class="l1-down"
        @click="toUrl('Shouye')"
        v-if="url == '/ShouyePage/Shipin'"
      >
        <div class="l1-dl sp">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <i class="el-icon-d-arrow-left"></i>
            <div class="c-txt">返回</div>
          </div>
        </div>
      </div>
      <!-- 首页（舆情）-左侧 -->
      <div
        class="l1-down"
        @click="toUrl('Shouye')"
        v-if="url == '/ShouyePage/Yuqing'"
      >
        <div class="l1-dl sp">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <i class="el-icon-d-arrow-left"></i>
            <div class="c-txt">返回</div>
          </div>
        </div>
      </div>
      <!-- 首页（新闻）-左侧 -->
      <div
        class="l1-down"
        @click="toUrl('Shouye')"
        v-if="url == '/ShouyePage/Xinwen'"
      >
        <div class="l1-dl sp">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <i class="el-icon-d-arrow-left"></i>
            <div class="c-txt">返回</div>
          </div>
        </div>
      </div>
      <!-- 首页（走势图）-左侧 -->
      <div class="l1-down" v-if="url == '/ShouyePage/Zoushitu'">
        <div class="l1-dl sp" @click="toUrl('Shouye')">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <i class="el-icon-d-arrow-left"></i>
            <div class="c-txt">返回</div>
          </div>
        </div>
        <div class="l1-dl sp aa" @click="cTime1" style="margin-left: 20px">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <div class="c-txt">一年</div>
          </div>
        </div>
        <div class="l1-dl sp aa" @click="cTime2" style="margin-left: 20px">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <div class="c-txt">半年</div>
          </div>
        </div>
        <div class="l1-dl sp aa" @click="cTime3" style="margin-left: 20px">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <div class="c-txt">一个月</div>
          </div>
        </div>
      </div>
      <!-- 首页（筛选日期）-左侧 -->
      <div class="l1-down" v-if="url == '/ShouyePage/Shaixuanriqi'">
        <div class="l1-dl sp" @click="dateBack">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <i class="el-icon-d-arrow-left"></i>
            <div class="c-txt">返回</div>
          </div>
        </div>
        <div class="l1-dl date">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <DatePicker
              v-model="year"
              size="small"
              type="year"
              placeholder="选择年"
              class="choseYear"
              @on-change="changeYear"
              @on-blur="changeYear"
              :editable="false"
              :clearable="false"
            />
          </div>
        </div>
        <div @click="timeSubmit" class="l1-dl qd">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <div class="c-txt">确定</div>
          </div>
        </div>
      </div>
      <!-- 账号管理（账号管理）-左侧 -->
      <div class="l1-down" v-if="url == '/Zhanghao/Zhanghaoguanli'">
        <!-- <div class="l1-dr" style="margin-left:0">
          <el-input v-model="keyword2" prefix-icon="el-icon-search" placeholder="搜索关键字"></el-input>
        </div> -->
      </div>
    </div>
    <div class="left2">
      <div class="txt">{{ name }}</div>
    </div>
    <div class="left3">
      <div class="l3-top">
        <img src="../../assets/newIImg/zu902.png" class="pic1" alt />
      </div>
      <!-- 首页-右侧 -->
      <div class="l3-down" v-if="url == '/Shouye' || url == '/'">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="sySearch1"
          @keyup.enter.native="sySearchClick"
        >
        </el-input>
        <template v-if="isLogin != 'false' && isLogin != 'null'">
          <div v-if="user_level != 2" @click="daochu" class="l3-dr" style="margin-right: 0px">
            <div class="r1"></div>
            <div class="r2"></div>
            <div class="l3-txt">导出</div>
          </div>
          <div v-else @click="addClick" class="l3-dr" style="width:130px;margin-right: 0px">
            <div class="r1"></div>
            <div class="r2"></div>
            <div class="l3-txt">添加链接</div>
          </div>
          <div @click="tuichu" class="l3-dr" style="width: 100px">
            <div class="r1"></div>
            <div class="r2"></div>
            <div class="l3-txt">
              <i style="margin-right: 6px" class="el-icon-switch-button"></i
              >退出
            </div>
          </div>
        </template>
        <div v-else @click="denglu" class="l3-dr" style="margin-right: 0px">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="l3-txt">登录</div>
        </div>
      </div>
      <!-- 首页（筛选日期）-右侧 -->
      <div class="l3-down" v-if="url == '/ShouyePage/Shaixuanriqi'">
        <div
          @click="startClick"
          :class="{ 'l3-dl': true, sxrq: true, active: sxrqIsStart }"
        >
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="l3-txt">{{ startTime }}</div>
        </div>
        <div
          @click="endClick"
          :class="{ 'l3-dr': true, sxrq: true, active: !sxrqIsStart }"
        >
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="l3-txt">{{ endTime }}</div>
        </div>
      </div>

      <!-- 走势图-右侧 -->
      <!-- <div class="l3-down zst" v-if="url == '/ShouyePage/Zoushitu'">
        <div class="n1-tit3">
          <div
            :class="{ 'l3-dr': true, sxrq: true, active: !sxrqIsStart }"
            style="margin-left: 140px"
          >
            <div class="r1"></div>
            <div class="r2"></div>
            <el-date-picker
              value-format="yyyy-MM-dd"
              size="mini"
              @change="changeTime"
              v-model="time2"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </div>
      </div> -->
      <div v-if="url == '/ShouyePage/Zoushitu'" class="titt">
        <div class="n1-tit2">
          <div class="txt2-1">选择日期：</div>
        </div>
        <div class="n1-tit3">
          <!-- <el-date-picker
              size="mini"
              @change="changeTime"
              value-format="yyyy-MM-dd"
              v-model="time"
              type="date"
              placeholder="选择日期"
            ></el-date-picker> -->
          <el-date-picker
            size="mini"
            @change="changeTime2"
            value-format="yyyy-MM-dd"
            v-model="time2"
            type="daterange"
            range-separator="—"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 账号管理（账号管理）-左侧 -->
      <div
        class="l3-down"
        style="flex-direction: row-reverse"
        @click="addZhanghao"
        v-if="url == '/Zhanghao/Zhanghaoguanli'"
      >
        <div class="l3-dl zh">
          <div class="r1"></div>
          <div class="r2"></div>
          <div class="cont">
            <div class="c-txt">新建账号</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  watch: {
    $route(to) {
      console.log(to.path); //到哪去
      this.url = to.path;
      this.isLogin = sessionStorage.getItem("isLogin");
      console.log(this.isLogin);
      if (to.path == "/Shouye") {
        this.name = "今日教育";
        if (this.isLogin == "false" || this.isLogin == "null") {
        this.name = "游客";
      }
        if (this.user_level == 2) {
          this.name = "校园";
        }
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/ShouyePage/Shipin") {
        this.name = "视频";
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/ShouyePage/Yuqing") {
        this.name = "舆情";
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/ShouyePage/Xinwen") {
        this.name = "新闻";
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/ShouyePage/Zoushitu") {
        this.name = "走势图";
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/ShouyePage/Shaixuanriqi") {
        this.name = "今日教育";
        if (this.isLogin == "false" || this.isLogin == "null") {
        this.name = "游客";
      }
        if (this.user_level == 2) {
          this.name = "校园";
        }
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/Caiji/Redulianjie") {
        this.$store.commit("isSmallHeader", true);
      } else if (to.path == "/Caiji/Yuntureci") {
        this.$store.commit("isSmallHeader", true);
      } else if (to.path == "/Caiji/FabuXinwen") {
        this.$store.commit("caijiFabuName", "新闻");
        this.$store.commit("isSmallHeader", true);
      } else if (to.path == "/Zhanghao/Quanxianguanli") {
        this.name = "今日教育";
        if (this.isLogin == "false" || this.isLogin == "null") {
        this.name = "游客";
      }
        if (this.user_level == 2) {
          this.name = "校园";
        }
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/Zhanghao/Zhanghaoguanli") {
        this.name = "今日教育";
        if (this.isLogin == "false" || this.isLogin == "null") {
        this.name = "游客";
      }
        if (this.user_level == 2) {
          this.name = "校园";
        }
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/") {
        this.name = "今日教育";
        if (this.isLogin == "false" || this.isLogin == "null") {
        this.name = "游客";
      }
        if (this.user_level == 2) {
          this.name = "校园";
        }
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/Wenzhoujiaoyu/Fabuliebiao") {
        this.$store.commit("isSmallHeader", true);
      } else if (to.path == "/Wenzhoujiaoyu/Lishifabu") {
        this.$store.commit("isSmallHeader", true);
      } else if (to.path == "/Wenzhoujiaoyu/Fabuliebiao_s") {
        this.$store.commit("isSmallHeader", true);
      }
      //  else if (to.path == "/Login") {
      //   this.$store.commit("isSmallHeader", 'nono');
      //   // setTimeout(()=>{
      //   //   this.$store.commit("isSmallHeader", '');
      //   // },1000)
      // }
    },
    startTime: function () {
      var syStartTime =
        this.startTime == "开始时间" ? this.getToday() : this.startTime;
      console.log(this.startTime, this.endTime);
      this.$store.commit("syStartTime", syStartTime);
    },
    endTime: function () {
      var syEndTime =
        this.endTime == "结束时间" ? this.getToday() : this.endTime;
      console.log(this.startTime, this.endTime);
      this.$store.commit("syEndTime", syEndTime);
    },
    sySearch: function () {
      this.sySearch1 = this.sySearch;
    },
  },
  computed: {
    // "headerTit",
    ...mapState([
      "startTime",
      "endTime",
      "sxrqIsStart",
      "syStartTime",
      "syEndTime",
      "zstTime",
      "pxIndex",
      "sySearch",
    ]),
  },
  data() {
    return {
      sySearch1: "",
      keyword: "",
      // pxIndex: 1,
      name: "",
      url: "",
      // 筛选日期
      year: moment().format("YYYY"),
      keyword2: "",
      time2: "",
      isLogin: "",
      user_level:"",
      addDialogVisible:false,
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
      isAdd: false,
    };
  },
  created() {
    this.isLogin = sessionStorage.getItem("isLogin");
    console.log(this.isLogin,123)
    this.user_level = sessionStorage.getItem("user_level")
    this.url = this.$route.path;
    if (this.$route.path == "/Shouye") {
      this.name = "今日教育";
      if (this.isLogin == "false" || this.isLogin == "null") {
        this.name = "游客";
      }
      if (this.user_level == 2) {
        this.name = "校园";
      }
      console.log(this.name)
      this.$store.commit("isSmallHeader", false);
    } else if (this.$route.path == "/ShouyePage/Shipin") {
      this.name = "视频";
      this.$store.commit("isSmallHeader", false);
    } else if (this.$route.path == "/ShouyePage/Yuqing") {
      this.name = "舆情";
      this.$store.commit("isSmallHeader", false);
    } else if (this.$route.path == "/ShouyePage/Xinwen") {
      this.name = "新闻";
      this.$store.commit("isSmallHeader", false);
    } else if (this.$route.path == "/ShouyePage/Zoushitu") {
      this.name = "走势图";
      this.$store.commit("isSmallHeader", false);
    } else if (this.$route.path == "/ShouyePage/Shaixuanriqi") {
      this.name = "今日教育";
      if (this.isLogin == "false" || this.isLogin == "null") {
        this.name = "游客";
      }
      if (this.user_level == 2) {
        this.name = "校园";
      }
      this.$store.commit("isSmallHeader", false);
    } else if (this.$route.path == "/Caiji/Redulianjie") {
      this.$store.commit("isSmallHeader", true);
    } else if (this.$route.path == "/Caiji/Yuntureci") {
      this.$store.commit("isSmallHeader", true);
    } else if (this.$route.path == "/Caiji/FabuXinwen") {
      this.$store.commit("caijiFabuName", "新闻");
      this.$store.commit("isSmallHeader", true);
    } else if (this.$route.path == "/Zhanghao/Quanxianguanli") {
      this.name = "今日教育";
      if (this.isLogin == "false" || this.isLogin == "null") {
        this.name = "游客";
      }
      if (this.user_level == 2) {
        this.name = "校园";
      }
      this.$store.commit("isSmallHeader", false);
    } else if (this.$route.path == "/Zhanghao/Zhanghaoguanli") {
      this.name = "今日教育";
      if (this.isLogin == "false" || this.isLogin == "null") {
        this.name = "游客";
      }
      if (this.user_level == 2) {
        this.name = "校园";
      }
      this.$store.commit("isSmallHeader", false);
    } else if (this.$route.path == "/") {
      this.name = "今日教育";
      if (this.isLogin == "false" || this.isLogin == "null") {
        this.name = "游客";
      }
      if (this.user_level == 2) {
        this.name = "校园";
      }
      this.$store.commit("isSmallHeader", false);
    } else if (this.$route.path == "/Wenzhoujiaoyu/Fabuliebiao") {
      this.$store.commit("isSmallHeader", true);
    } else if (this.$route.path == "/Wenzhoujiaoyu/Lishifabu") {
      this.$store.commit("isSmallHeader", true);
    } else if (this.$route.path == "/Wenzhoujiaoyu/Fabuliebiao_s") {
      this.$store.commit("isSmallHeader", true);
    } else if (this.$route.path == "/Caiji/Guanjiancifenxi") {
      this.$store.commit("isSmallHeader", true);
    }

    var syStartTime =
      this.startTime == "开始时间" ? this.getToday() : this.startTime;
    var syEndTime = this.endTime == "结束时间" ? this.getToday() : this.endTime;
    console.log(this.startTime, this.endTime);
    this.$store.commit("syStartTime", syStartTime);
    this.$store.commit("syEndTime", syEndTime);
  },
  methods: {
    addClick() {
      this.$store.commit("syisAdd", true);
      this.$store.commit("syaddDialogVisible", true);
    },
    cTime1() {
      const bb = new Date();
      bb.setFullYear(bb.getFullYear() - 1);
      const aa = new Date();
      this.time2 = [
        bb.toLocaleDateString().split("/").join("-"),
        aa.toLocaleDateString().split("/").join("-"),
      ];
      this.$store.commit("zstTime", this.time2);
    },
    cTime2() {
      const bb = new Date();
      bb.setMonth(bb.getMonth() - 6);
      const aa = new Date();
      this.time2 = [
        bb.toLocaleDateString().split("/").join("-"),
        aa.toLocaleDateString().split("/").join("-"),
      ];
      this.$store.commit("zstTime", this.time2);
    },
    cTime3() {
      const bb = new Date();
      bb.setMonth(bb.getMonth() - 1);
      const aa = new Date();
      this.time2 = [
        bb.toLocaleDateString().split("/").join("-"),
        aa.toLocaleDateString().split("/").join("-"),
      ];
      this.$store.commit("zstTime", this.time2);
    },
    sySearchClick() {
      this.$store.commit("sySearch", this.sySearch1);
    },
    denglu() {
      this.$router.push({ name: "Login" });
    },
    async daochu() {
      const res = await this.$api.export_list({
        day: this.syStartTime,
        keyword: this.sySearch,
        is_hotwords: 1,
        sort: this.pxIndex,
      });
      console.log(res);
      this.$message(res.msg);
      if (res.result == 1) {
        window.open(res.down_url);
      }
    },
    tuichu() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", false);
      sessionStorage.setItem("user_level", '');
      this.$router.push({ path: "/Shouye" });
      this.$router.go(0);
    },
    changeTime2() {
      console.log(this.time2);
      this.$store.commit("zstTime", this.time2);
    },
    changeTime() {
      console.log(this.time.split("-"));
      this.$store.commit("zstTime", this.time2.split("-"));
      // this.getZstData();
    },
    // async getZstData() {
    //   const res = await this.$api.hotwords_logs({
    //     year: this.zstTime[0],
    //     month: this.zstTime[1],
    //     day: this.zstTime[2],
    //   });
    //   console.log(res);
    // },
    getToday() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    },
    addZhanghao() {
      this.$store.commit("isAdd", true);
      this.$store.commit("addDialogVisible", true);
    },
    startClick() {
      this.$store.commit("sxrqIsStart", true);
    },
    endClick() {
      this.$store.commit("sxrqIsStart", false);
    },
    changPaixu(i) {
      // this.pxIndex = i;
      this.$store.commit("pxIndex", i);
    },
    toUrl(url) {
      this.$router.push({ name: url });
    },
    dateBack() {
      this.$store.commit("startTime", "开始时间");
      this.$store.commit("endTime", "结束时间");
      this.toUrl("Shouye");
    },
    timeSubmit() {
      console.log(this.startTime, this.endTime);
      this.toUrl("Shouye");
    },
    changeYear(val) {
      this.$store.commit("changeYearSy", val);
    },
  },
};
</script>

<style scoped lang='scss'>
.n1-tit3 {
  width: 130px;
  /deep/ .el-date-editor {
    width: 100%;
  }
  /deep/ .el-input__icon {
    color: #ffffff;
    font-size: 18px;
    margin: 0 10px;
  }
  /deep/ .el-input__inner {
    height: 54px;
    background: transparent;
    border: 0;
    color: #ffffff;
    font-size: 16px;
    margin-left: 18px;
  }
  /deep/ .el-range-separator {
    line-height: 44px;
  }
}
.header {
  display: flex;
  position: relative;
  // background-color: #fff;
  padding: 0 30px;
  .left1 {
    margin-top: 30px;
    width: 40%;
    .l1-top {
      width: 100%;
      .pic1 {
        // width: 472px;
        width: 100%;
        height: 40px;
      }
    }
    .l1-down {
      display: flex;
      align-items: center;
      margin-left: 40px;
      margin-top: 12px;
      .l1-dl.sp {
        width: 106px;
        .el-icon-d-arrow-left {
          font-size: 18px;
          color: #ffffff;
          margin-right: 8px;
        }
      }
      .l1-dl.sp.aa {
        width: 88px;
        height: 46px;
        .c-txt {
          font-size: 15px !important;
        }
      }
      .l1-dl.date {
        width: 124px;
        margin-left: 22px;
        .el-icon-d-arrow-left {
          font-size: 18px;
          color: #ffffff;
          margin-right: 8px;
        }
      }
      .l1-dl.qd {
        width: 106px;
        margin-left: 22px;
      }
      .l1-dl {
        width: 154px;
        height: 54px;
        border: 1px solid #1794e4;
        box-shadow: 0px 0px 20px 0px #1794e4 inset;
        position: relative;
        cursor: pointer;
        .r1 {
          position: absolute;
          width: 11px;
          height: 28px;
          border-top: 2px solid #04f9db;
          border-left: 2px solid #04f9db;
          top: -2px;
          left: -2px;
        }
        .r2 {
          position: absolute;
          width: 11px;
          height: 28px;
          border-bottom: 2px solid #04f9db;
          border-right: 2px solid #04f9db;
          bottom: -2px;
          right: -2px;
        }
        .cont {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .c-pic {
            width: 26px;
            height: 26px;
            margin-right: 12px;
          }
          .c-txt2 {
            width: 90px;
            font-size: 12px;
            color: #ffffff;
            letter-spacing: 1.8px;
          }
          .c-txt {
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            color: #ffffff;
            letter-spacing: 1.8px;
          }
          .choseYear {
            height: 100%;
            /deep/ .ivu-input-suffix {
              margin-right: 10px;
              display: flex;
              align-items: center;
              i {
                font-size: 20px;
                color: #ffffff;
              }
            }
            /deep/ .ivu-input {
              height: 52px;
              background: transparent;
              border: none;
              font-size: 18px;
              font-family: PingFang SC, PingFang SC-Medium; //aaa
              font-weight: 500; //aa
              text-align: center;
              color: #ffffff;
              letter-spacing: 1.8px;
            }
          }
        }
      }
      .l3-dl {
        width: 260px;
        height: 54px;
        border: 1px solid #1794e4;
        box-shadow: 0px 0px 20px 0px #1794e4 inset;
        position: relative;
        .r1 {
          position: absolute;
          width: 11px;
          height: 28px;
          border-top: 2px solid #04f9db;
          border-left: 2px solid #04f9db;
          top: -2px;
          left: -2px;
        }
        .r2 {
          position: absolute;
          width: 11px;
          height: 28px;
          border-bottom: 2px solid #04f9db;
          border-right: 2px solid #04f9db;
          bottom: -2px;
          right: -2px;
        }
        .cont {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .c-pic {
            width: 26px;
            height: 20px;
            margin-right: 12px;
          }
          .c-txt {
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            color: #ffffff;
            letter-spacing: 1.8px;
          }
          .c-txt.active {
            color: #04f9db;
          }
        }
      }
      .l1-dr {
        margin-left: 26px;
        /deep/ .el-input__inner {
          width: 201px;
          height: 50px;
          border: 1px solid #04f9db;
          border-radius: 26px;
          box-shadow: 0px 0px 20px 0px rgba(23, 148, 228, 0.83) inset;
          background: #10183c;
          font-size: 18px;
          padding: 0 36px;
          color: #ffffff;
        }
        /deep/ .el-icon-search {
          font-size: 18px;
          margin-left: 6px;
        }
      }
    }
  }
  .left2 {
    margin: 18px 46px 0 38px;
    width: 513px;
    height: 104px;
    background-image: url("../../assets/newIImg/zu4246.png");
    background-size: 100% 100%;
    .txt {
      margin-top: 36px;
      font-size: 36px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      text-align: center;
      color: #04f9db;
      letter-spacing: 4.32px;
    }
  }
  .left3 {
    margin-top: 30px;
    width: 40%;
    .l3-top {
      width: 100%;
      .pic1 {
        // width: 472px;
        width: 100%;
        height: 40px;
      }
    }
    .l3-down.zst {
      /deep/ .el-input__inner {
        border: 0 !important;
        box-shadow: none !important;
      }
    }
    .l3-down {
      /deep/ .el-input {
        width: 194px;
        .el-input__prefix {
          margin-top: 2px;
          font-size: 20px;
          margin-left: 10px;
        }
        .el-input__inner {
          color: #ffffff;
          padding-left: 44px;
          font-size: 16px;
          height: 54px;
          border-radius: 26px;
          border: 1px solid #1794e4;
          box-shadow: 0px 0px 20px 0px #1794e4 inset;
          background: transparent;
        }
      }
      display: flex;
      // flex-direction: row-reverse;
      align-items: center;
      // margin-left: 40px;
      margin-top: 12px;
      .l3-dl.zh {
        cursor: pointer;
        width: 126px;
        height: 54px;
        .cont {
          .c-txt {
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            text-align: center;
            color: #ffffff;
            letter-spacing: 1.8px;
          }
        }
      }
      .l3-dl.sxrq.active {
        border: 1px solid #04f9db;
        box-shadow: 0px 0px 20px 0px rgba(4, 249, 219, 0.84) inset;
        .l3-txt {
          color: #f0b80f;
        }
        .r1 {
          position: absolute;
          width: 11px;
          height: 28px;
          border-top: 2px solid #f0b80f;
          border-left: 2px solid #f0b80f;
          top: -2px;
          left: -2px;
        }
        .r2 {
          position: absolute;
          width: 11px;
          height: 28px;
          border-bottom: 2px solid #f0b80f;
          border-right: 2px solid #f0b80f;
          bottom: -2px;
          right: -2px;
        }
      }
      .l3-dl.sxrq {
        cursor: pointer;
        width: 180px;
        .l3-txt {
          text-align: center;
          line-height: 54px;
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Medium; //aaa
          font-weight: 500; //aa
          color: #ffffff;
          letter-spacing: 1.8px;
        }
      }
      .l3-dl {
        width: 260px;
        height: 54px;
        border: 1px solid #1794e4;
        box-shadow: 0px 0px 20px 0px #1794e4 inset;
        position: relative;
        .r1 {
          position: absolute;
          width: 11px;
          height: 28px;
          border-top: 2px solid #04f9db;
          border-left: 2px solid #04f9db;
          top: -2px;
          left: -2px;
        }
        .r2 {
          position: absolute;
          width: 11px;
          height: 28px;
          border-bottom: 2px solid #04f9db;
          border-right: 2px solid #04f9db;
          bottom: -2px;
          right: -2px;
        }
        .cont {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .c-pic {
            width: 26px;
            height: 20px;
            margin-right: 12px;
          }
          .c-txt {
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            color: #ffffff;
            letter-spacing: 1.8px;
          }
          .c-txt.active {
            color: #04f9db;
          }
        }
      }
      .l3-dr.sxrq {
        width: 180px;
        cursor: pointer;
      }
      .l3-dr.sxrq.active {
        border: 1px solid #04f9db;
        box-shadow: 0px 0px 20px 0px rgba(4, 249, 219, 0.84) inset;
        .l3-txt {
          color: #f0b80f;
        }
        .r1 {
          position: absolute;
          width: 18px;
          height: 16px;
          border-top: 2px solid #f0b80f;
          border-right: 2px solid #f0b80f;
          top: -2px;
          right: -2px;
        }
        .r2 {
          position: absolute;
          width: 16px;
          height: 18px;
          border-bottom: 2px solid #f0b80f;
          border-left: 2px solid #f0b80f;
          bottom: -2px;
          left: -2px;
        }
      }
      .l3-dr {
        margin-left: 26px;
        width: 88px;
        height: 54px;
        border: 1px solid #1794e4;
        box-shadow: 0px 0px 20px 0px #1794e4 inset;
        position: relative;
        cursor: pointer;
        .r1 {
          position: absolute;
          width: 18px;
          height: 16px;
          border-top: 2px solid #04f9db;
          border-right: 2px solid #04f9db;
          top: -2px;
          right: -2px;
        }
        .r2 {
          position: absolute;
          width: 16px;
          height: 18px;
          border-bottom: 2px solid #04f9db;
          border-left: 2px solid #04f9db;
          bottom: -2px;
          left: -2px;
        }
        .l3-txt {
          text-align: center;
          line-height: 54px;
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
      color: #ffffff;
    }
  }
  .n1-tit3 {
    width: 282px;
    /deep/ .el-range-input {
      background-color: transparent;
      color: #ffffff;
    }
    /deep/ .el-range-separator {
      color: #ffffff;
    }
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
</style>
