<template>
  <div class="layout">
    <el-container v-if="isSmallHeader != 'nono'">
      <el-aside v-if="this.isLogin == 'true' && user_level !=2" style="background: #10183c !important;" width="null">
        <Aside />
      </el-aside>
      <el-container>
        <el-header style="background: #10183c !important;width:100%" :class="{'isSmall':isSmallHeader}">
          <Header v-show="!isSmallHeader"/>
          <HeaderSmall v-show="isSmallHeader" />
        </el-header>
        <el-main style="background: #10183c !important;">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
    <Login v-else />
  </div>
</template>

<script>
import Login from "../Login";
import Header from "../Header";
import HeaderSmall from "../Header/indexSmall";
import { mapState } from "vuex";
import Aside from "../Aside";
export default {
  data() {
    return {
      isLogin: "true",
      user_level:"",
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
    console.log(this.isSmallHeader)
    this.isLogin = sessionStorage.getItem("isLogin");
    this.user_level = sessionStorage.getItem("user_level");
  },
  components: {
    Login,
    Header,
    HeaderSmall,
    Aside
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
  background: #10183c !important;
  height: 140px !important;
}
.el-container {
  height: calc(100vh);
  min-width: 1400px;
}
.el-aside {
  color: #333;
  /* width: 200px !important; */
  min-width: 40px;
  background: #10183c !important;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16),
    0px 0px 20px 0px rgba(23, 148, 228, 0.58) inset;
}

.el-main {
  /* padding: 0 0 0 24px !important; */
  background: #10183c !important;;
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