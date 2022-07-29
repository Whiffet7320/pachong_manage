<template>
  <div class="layout">
    <el-container v-if="this.isLogin == 'true'">
      <el-aside style="background: #006DD0 !important;" width="null">
        <AsideU />
      </el-aside>
      <el-container>
        <el-header style="background: #F0F2F5 !important;" :class="{'isSmall':isSmallHeader}">
          <HeaderU v-show="!isSmallHeader"/>
          <HeaderSmallU v-show="isSmallHeader" />
        </el-header>
        <el-main style="background: #F0F2F5 !important;">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
    <Login v-else />
  </div>
</template>

<script>
import Login from "../Login";
import HeaderU from "../Header_u";
import HeaderSmallU from "../Header_u/indexSmall";
import { mapState } from "vuex";
import AsideU from "../Aside_u";
export default {
  data() {
    return {
      isLogin: "false"
    };
  },
  watch: {
    isSmallHeader: function() {
      console.log(this.isSmallHeader)
    },
  },
  computed: {
    ...mapState(["isSmallHeader"])
  },
  created() {
    this.isLogin = sessionStorage.getItem("isLogin");
    console.log('isuser',this.isSmallHeader)
  },
  components: {
    Login,
    HeaderU,
    HeaderSmallU,
    AsideU
  }
};
</script>

<style>
/* .el-header {
  background-color: #b3c0d1;
  height: 60px;
  padding: 0 !important;
} */
.el-header.isSmall{
  height: 96px !important;
}
.el-header {
  padding: 0;
  background: #F0F2F5 !important;
  height: 166px !important;
}
.el-container {
  height: calc(100vh);
  min-width: 1400px;
}
.el-aside {
  color: #333;
  /* width: 200px !important; */
  min-width: 40px;
  background: #006DD0;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16),
    0px 0px 20px 0px rgba(23, 148, 228, 0.58) inset;
}

.el-main {
  /* padding: 0 0 0 24px !important; */
  background: #F0F2F5;
  color: #333;
}
::-webkit-scrollbar {
  width: 10px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #006DD0;
  /* background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  ); */
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #EBEBEB;
}
</style>