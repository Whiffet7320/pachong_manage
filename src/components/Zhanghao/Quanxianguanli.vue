<template>
  <div class="index">
    <div class="nav1">
      <div class="txt">权限管理</div>
    </div>
    <div class="nav2">
      <div class="r1"></div>
      <div class="r2"></div>
      <div class="r3"></div>
      <div class="r4"></div>
      <div class="cont">
        <div class="n2-tit1">
          <div class="dian"></div>
          <div class="txt">账号</div>
        </div>
        <div class="n2-tit2">
          <el-checkbox-group v-model="checkList1">
            <el-checkbox label="1">领导</el-checkbox>
            <el-checkbox label="2">审核人</el-checkbox>
            <el-checkbox label="3">普通管理员</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="n2-tit1">
          <div class="dian"></div>
          <div class="txt">分配可查看权限</div>
        </div>
        <div class="n2-tit2">
          <el-checkbox-group v-model="checkList2">
            <el-checkbox label="1">文章</el-checkbox>
            <el-checkbox label="2">舆情</el-checkbox>
            <el-checkbox label="3">视频</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
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
      checkList1: [],
      checkList2: []
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.index {
  padding: 0 10px;
}
.nav1 {
  margin-left: 28px;
  width: 226px;
  height: 86px;
  background-image: url("../../assets/newIImg/zu1315.png");
  background-size: 100% 100%;
  .txt {
    font-size: 26px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: center;
    line-height: 86px;
    color: #ffba00;
    letter-spacing: 2.6px;
  }
}
.nav2 {
  margin-top: 28px;
  height: 526px;
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
    padding: 0 42px;
    .n2-tit1 {
      margin-top: 52px;
      display: flex;
      align-items: center;
      .dian {
        width: 10px;
        height: 10px;
        background: #ffffff;
        border-radius: 50%;
      }
      .txt {
        margin-left: 24px;
        font-size: 32px;
        font-family: PingFang SC, PingFang SC-Medium; //aaa
        font-weight: 500; //aa
        text-align: left;
        color: #ffffff;
        letter-spacing: 3.2px;
      }
    }
    .n2-tit2 {
      margin-left: 36px;
      margin-top: 46px;
      /deep/ .el-checkbox-group{
        display: flex;
        align-items: center;
      }
      /deep/ .el-checkbox{
        display: flex;
        align-items: center;
      }
      /deep/ .el-checkbox__label {
        font-size: 22px;
        font-family: PingFang SC, PingFang SC-Medium; //aaa
        font-weight: 500; //aa
        color: #ffffff;
        letter-spacing: 2.6px;
      }
    }
  }
}
</style>