<template>
  <div class="header">
    <img src="../../assets/newIImg/zu1027.png" class="picc" alt />
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
      if (to.path == "/Shouye") {
        this.name = "今日教育";
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
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/Caiji/Redulianjie") {
        this.$store.commit("isSmallHeader", true);
      } else if (to.path == "/Caiji/Yuntureci") {
        this.$store.commit("isSmallHeader", true);
      } else if (to.path == "/Caiji/FabuXinwen") {
        this.$store.commit("isSmallHeader", true);
      } else if (to.path == "/Zhanghao/Quanxianguanli") {
        this.name = "今日教育";
        this.$store.commit("isSmallHeader", false);
      }  else if (to.path == "/Zhanghao/Zhanghaoguanli") {
        this.name = "今日教育";
        this.$store.commit("isSmallHeader", false);
      }  else if (to.path == "/") {
        this.name = "今日教育";
        this.$store.commit("isSmallHeader", false);
      } else if (to.path == "/Wenzhoujiaoyu_u/Fabuliebiao_u") {
        this.$store.commit("isSmallHeader", true);
      }
    }
  },
  computed: {
    ...mapState(["headerTit", "startTime", "endTime", "sxrqIsStart"])
  },
  data() {
    return {
      keyword: "",
      pxIndex: 1,
      name: "",
      url: "",
      // 筛选日期
      year: moment().format("YYYY")
    };
  },
  created() {},
  methods: {
    startClick() {
      this.$store.commit("sxrqIsStart", true);
    },
    endClick() {
      this.$store.commit("sxrqIsStart", false);
    },
    changPaixu(i) {
      this.pxIndex = i;
    },
    toUrl(url) {
      this.$router.push({ name: url });
    },
    timeSubmit() {
      console.log(this.startTime, this.endTime);
    },
    changeYear(val) {
      this.$store.commit("changeYearSy", val);
    }
  }
};
</script>

<style scoped lang='scss'>
.header {
  display: flex;
  position: relative;
  // background-color: #fff;
  padding: 0 30px;
  .picc {
    margin-top: 36px;
    width: 100%;
    height: 40px;
  }
}
</style>
