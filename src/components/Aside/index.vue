<template>
  <div class="aside">
    <!-- <div class="nav4" @click="loginOut">
      <img class="pic1" src="../../assets/image/组191.png" alt="" />
      <div class="tit1">切换账号</div>
    </div>-->
    <div class="menu">
      <div class="myisCollBtn">今日教育</div>

      <el-menu
        :default-active="menuActiveIndex"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#10183c"
        text-color="#fff"
        active-text-color="#fff"
        router
      >
        <template v-if="true">
          <el-menu-item v-if="isHaveSY" :route="{ name: 'Shouye' }" index="1-1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu
            :index="item.menu_index"
            v-for="item in menu"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="item2 in item.sub_menu"
              :key="item2.id"
              :route="{ name: item2.url }"
              :index="item2.menu_index"
            >
              <template v-if="item2.sub_menu.length == 0">{{
                item2.name
              }}</template>
            </el-menu-item>
            <template v-if="item.newSub_menuNameindex">
              <el-submenu :index="item.newSub_menuNameindex">
                <template slot="title">{{ item.newSub_menuName }}</template>
                <el-menu-item
                  v-for="item3 in item.newSub_menu"
                  :key="item3.id"
                  @click="clickFabu(item3.name, item3.menu_index)"
                  :route="{ name: item3.url }"
                  :index="item3.menu_index"
                  >{{ item3.name }}</el-menu-item
                >
              </el-submenu>
            </template>
          </el-submenu>
          <template v-if="user_level == 3 && menu_wzedu == 1">
            <el-menu-item :route="{ name: 'Fabuliebiao_s' }" index="82-1">
              <i class="el-icon-s-opportunity"></i>
              <span slot="title">温州教育</span>
            </el-menu-item>
          </template>
        </template>
        <template v-if="false && (user_level == 1 || user_level == 3)">
          <el-menu-item :route="{ name: 'Shouye' }" index="1-1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="80">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>
              <span>采集</span>
            </template>
            <el-menu-item :route="{ name: 'Redulianjie' }" index="80-1"
              >添加热度链接</el-menu-item
            >
            <el-menu-item :route="{ name: 'Yuntureci' }" index="80-2"
              >关键词设定</el-menu-item
            >
            <el-menu-item :route="{ name: 'Guanjiancifenxi' }" index="80-4"
              >热度关键词分析</el-menu-item
            >
            <el-submenu index="80-3">
              <template slot="title">历史发布</template>
              <el-menu-item
                @click="clickFabu('新闻', '80-3-1')"
                :route="{ name: 'FabuXinwen' }"
                index="80-3-1"
                >新闻</el-menu-item
              >
              <el-menu-item
                @click="clickFabu('舆情', '80-3-2')"
                :route="{ name: 'FabuXinwen' }"
                index="80-3-2"
                >舆情</el-menu-item
              >
              <el-menu-item
                @click="clickFabu('视频', '80-3-3')"
                :route="{ name: 'FabuXinwen' }"
                index="80-3-3"
                >视频</el-menu-item
              >
              <el-menu-item
                @click="clickFabu('温州教育', '80-3-4')"
                :route="{ name: 'Lishifabu' }"
                index="80-3-4"
                >温州教育</el-menu-item
              >
            </el-submenu>
          </el-submenu>
          <el-submenu index="82" v-if="false && user_level == 1">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>
              <span>温州教育</span>
            </template>
            <el-menu-item :route="{ name: 'Fabuliebiao' }" index="82-1"
              >发布列表</el-menu-item
            >
            <el-menu-item :route="{ name: 'Lishifabu' }" index="82-2"
              >历史发布</el-menu-item
            >
          </el-submenu>
          <el-menu-item
            v-if="false && user_level == 3"
            :route="{ name: 's' }"
            index="82-1"
          >
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">温州教育</span>
          </el-menu-item>
          <el-submenu index="81">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>账号</span>
            </template>
            <!-- <el-menu-item :route="{ name: 'Quanxianguanli' }" index="81-1">权限管理</el-menu-item> -->
            <el-menu-item :route="{ name: 'Zhanghaoguanli' }" index="81-2"
              >账号管理</el-menu-item
            >
          </el-submenu>
          <!-- <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>设置</span>
            </template>
            <el-menu-item :route="{ name: 'Zhanghaoguanli' }" index="8-11">权限账号管理</el-menu-item>
          </el-submenu>-->
        </template>
        <template v-if="false && user_level == 2">
          <el-menu-item :route="{ name: 'Shouye_u' }" index="1-1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="80">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>
              <span>采集</span>
            </template>
            <el-menu-item :route="{ name: 'Redulianjie_u' }" index="80-1"
              >添加热度链接</el-menu-item
            >
            <el-menu-item :route="{ name: 'Yuntureci_u' }" index="80-2"
              >关键词设定</el-menu-item
            >
            <el-submenu index="80-3">
              <template slot="title">历史发布</template>
              <el-menu-item
                @click="clickFabu('新闻', '80-3-1')"
                :route="{ name: 'FabuXinwen_u' }"
                index="80-3-1"
                >新闻</el-menu-item
              >
              <el-menu-item
                @click="clickFabu('舆情', '80-3-2')"
                :route="{ name: 'FabuXinwen_u' }"
                index="80-3-2"
                >舆情</el-menu-item
              >
              <el-menu-item
                @click="clickFabu('视频', '80-3-3')"
                :route="{ name: 'FabuXinwen_u' }"
                index="80-3-3"
                >视频</el-menu-item
              >
              <el-menu-item
                @click="clickFabu('温州教育', '80-3-4')"
                :route="{ name: 'Lishifabu' }"
                index="80-3-4"
                >温州教育</el-menu-item
              >
            </el-submenu>
          </el-submenu>
          <el-submenu index="82">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>
              <span>温州教育</span>
            </template>
            <el-menu-item :route="{ name: 'Fabuliebiao' }" index="82-1"
              >发布列表</el-menu-item
            >
            <el-menu-item :route="{ name: 'Lishifabu' }" index="82-2"
              >历史发布</el-menu-item
            >
          </el-submenu>
          <el-submenu index="81">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>账号</span>
            </template>
            <!-- <el-menu-item :route="{ name: 'Quanxianguanli' }" index="81-1">权限管理</el-menu-item> -->
            <el-menu-item :route="{ name: 'Zhanghaoguanli' }" index="81-2"
              >账号管理</el-menu-item
            >
          </el-submenu>
          <!-- <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>设置</span>
            </template>
            <el-menu-item :route="{ name: 'Zhanghaoguanli' }" index="8-11">权限账号管理</el-menu-item>
          </el-submenu>-->
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["caijiFabuName", "caijiFabuIndex"]),
  },
  watch: {
    caijiFabuName: function () {
      if (this.caijiFabuName == "新闻") {
        this.menuActiveIndex = "80-3-1";
      } else if (this.caijiFabuName == "舆情") {
        this.menuActiveIndex = "80-3-2";
      } else if (this.caijiFabuName == "视频") {
        this.menuActiveIndex = "80-3-3";
      } else if (this.caijiFabuName == "温州教育") {
        this.menuActiveIndex = "80-3-4";
      }
    },
    $route(to) {
      console.log(to.path); //到哪去
      if (to.path == "/NotFound/NotFound404") {
        // this.menuActiveIndex = "1-1";
        // this.$store.commit("headerTit", "首页");
        this.menuActiveIndex = "";
        this.$store.commit(
          "headerTit",
          `无访问权限 / <span style="color: #515a61;
        font-weight: 700;">暂无权限/404</span>`
        );
      }
      if (to.path == "/Shouye") {
        this.menuActiveIndex = "1-1";
        this.$store.commit("headerTit", "首页");
      } else if (to.path == "/Shangpin/Shangpinguanli") {
        this.menuActiveIndex = "2-1";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品管理</span>`
        );
      } else if (to.path == "/Shangpin/Tianjiashangping") {
        this.$store.commit(
          "headerTit",
          `商品 / 商品管理 / <span style="color: #515a61;
        font-weight: 700;">添加/修改商品</span>`
        );
      } else if (to.path == "/Shangpin/TianjiaShangpincangku") {
        this.$store.commit(
          "headerTit",
          `商品 / 商品管理 / <span style="color: #515a61;
        font-weight: 700;">添加/修改商品仓库</span>`
        );
      } else if (to.path == "/Shangpin/Shangpingfenlei") {
        this.menuActiveIndex = "2-2";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品分类</span>`
        );
      } else if (to.path == "/Shangpin/Shangpingpinglun") {
        this.menuActiveIndex = "2-3";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品评论</span>`
        );
      } else if (to.path == "/Shangpin/Yunfeimoban") {
        this.menuActiveIndex = "2-4";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">运费模板</span>`
        );
      } else if (to.path == "/Shangpin/Shangpincangkuguanli") {
        this.menuActiveIndex = "2-5";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品仓库管理</span>`
        );
      } else if (to.path == "/Shangpin/Chicunguanli") {
        this.menuActiveIndex = "2-6";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">尺寸管理</span>`
        );
      } else if (to.path == "/Shangpin/Yanseguanli") {
        this.menuActiveIndex = "2-7";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">颜色管理</span>`
        );
      } else if (to.path == "/Shangpin/Yanjingfenleiguanli") {
        this.menuActiveIndex = "2-8";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">眼镜分类管理</span>`
        );
      } else if (to.path == "/Shangpin/Tucengguanli") {
        this.menuActiveIndex = "2-9";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">涂层管理</span>`
        );
      } else if (to.path == "/Shangpin/Biaoqianguanli") {
        this.menuActiveIndex = "2-10";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">标签管理</span>`
        );
      } else if (to.path == "/Shangpin/Pianguangduguanli") {
        this.menuActiveIndex = "2-11";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">眼镜偏光率管理</span>`
        );
      } else if (to.path == "/Shangpin/Yanjingdengjifenlei") {
        this.menuActiveIndex = "2-12";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">眼镜等级管理</span>`
        );
      } else if (to.path == "/Shangpin/Mangheguanli") {
        this.menuActiveIndex = "2-13";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">盲盒管理</span>`
        );
      } else if (to.path == "/Shangpin/Xunishangping") {
        this.menuActiveIndex = "2-14";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">虚拟商品管理</span>`
        );
      } else if (to.path == "/Shangpin/Fenleishangping") {
        this.menuActiveIndex = "2-15";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">分类商品管理</span>`
        );
      } else if (to.path == "/Shangpin/Mangheshangping") {
        this.menuActiveIndex = "2-16";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">盲盒商品管理</span>`
        );
      } else if (to.path == "/Dingdan/Dingdanguanli") {
        this.menuActiveIndex = "3-1";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">订单管理</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团商品</span>`
        );
      } else if (to.path == "/Yingxiao/Tianjiapingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / 拼团商品 / <span style="color: #515a61;
        font-weight: 700;">添加/编辑商品</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanliebiao") {
        this.menuActiveIndex = "4-1-2";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团列表</span>`
        );
      } else if (to.path == "/Yingxiao/Jishouliebiao") {
        this.menuActiveIndex = "4-1-3";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">寄售列表</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanjilu") {
        this.menuActiveIndex = "4-1-4";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团记录</span>`
        );
      } else if (to.path == "/Yingxiao/Maichanghuodong") {
        this.menuActiveIndex = "4-2-1";
        this.$store.commit(
          "headerTit",
          `营销 / 卖场活动 / <span style="color: #515a61;
        font-weight: 700;">活动列表</span>`
        );
      } else if (to.path == "/Yonghu/Yonghuguanli") {
        this.menuActiveIndex = "5-1";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">用户管理</span>`
        );
      } else if (to.path == "/Yonghu/Lianghaoliebiao") {
        this.menuActiveIndex = "5-2";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">靓号列表</span>`
        );
      } else if (to.path == "/Yonghu/Tixianliebiao") {
        this.menuActiveIndex = "5-3";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">提现列表</span>`
        );
      } else if (to.path == "/Fenxiao/Fenxiaoshezhi") {
        this.menuActiveIndex = "6-1";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">分销设置</span>`
        );
      } else if (to.path == "/Caiwu/Tixianshenqing") {
        this.menuActiveIndex = "7-1-1";
        this.$store.commit(
          "headerTit",
          `财务 / 财务操作 / <span style="color: #515a61;
        font-weight: 700;">提现申请</span>`
        );
      } else if (to.path == "/Caiwu/Yongjinjilu") {
        this.menuActiveIndex = "7-2-1";
        this.$store.commit(
          "headerTit",
          `财务 / 佣金记录 / <span style="color: #515a61;
        font-weight: 700;">佣金记录</span>`
        );
      } else if (to.path == "/Shezhi/Xiaoxiguanli") {
        this.menuActiveIndex = "8-1";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">消息管理</span>`
        );
      } else if (to.path == "/Shezhi/Qitashezhi") {
        this.menuActiveIndex = "8-2";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">其他设置</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotushezhi") {
        this.menuActiveIndex = "8-3";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">轮播图设置</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotuliebiao") {
        this.menuActiveIndex = "8-4";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">轮播图列表</span>`
        );
      } else if (to.path == "/Shezhi/Kaipinyeshezhi") {
        this.menuActiveIndex = "8-5";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">开屏页设置</span>`
        );
      } else if (to.path == "/Shezhi/Shujuzhongxin") {
        this.menuActiveIndex = "8-6";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">数据中心</span>`
        );
      } else if (to.path == "/Shezhi/Guojiaguanli") {
        this.menuActiveIndex = "8-7";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">国家管理</span>`
        );
      } else if (to.path == "/Shezhi/Youhuiquan") {
        this.menuActiveIndex = "8-8";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">优惠券管理</span>`
        );
      } else if (to.path == "/Wenzhang/Wenzhangliebiao") {
        this.menuActiveIndex = "9-1";
        this.$store.commit(
          "headerTit",
          `文章 / <span style="color: #515a61;
        font-weight: 700;">文章列表</span>`
        );
      } else if (to.path == "/Rizhi/Caozuorizhi") {
        this.menuActiveIndex = "80-1";
        this.$store.commit(
          "headerTit",
          `日志 / <span style="color: #515a61;
        font-weight: 700;">操作日志</span>`
        );
      } else if (to.path == "/Shezhi/Zhanghaoguanli") {
        this.menuActiveIndex = "8-11";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">权限账号管理</span>`
        );
      } else if (to.path == "/Caiji/Redulianjie") {
        this.menuActiveIndex = "80-1";
      } else if (to.path == "/Caiji/Yuntureci") {
        this.menuActiveIndex = "80-2";
      } else if (to.path == "/Caiji/Guanjiancifenxi") {
        this.menuActiveIndex = "80-4";
      } else if (to.path == "/Caiji/FabuXinwen") {
          if (this.caijiFabuName == "新闻") {
            this.menuActiveIndex = "80-3-1";
          } else if (this.caijiFabuName == "舆情") {
            this.menuActiveIndex = "80-3-2";
          } else if (this.caijiFabuName == "视频") {
            this.menuActiveIndex = "80-3-3";
          }

        // this.menuActiveIndex = "80-3-1";
      } else if (to.path == "/Wenzhoujiaoyu/Lishifabu") {
        this.menuActiveIndex = "80-3-4";
      } else if (to.path == "/Zhanghao/Quanxianguanli") {
        this.menuActiveIndex = "81-1";
      } else if (to.path == "/Zhanghao/Zhanghaoguanli") {
        this.menuActiveIndex = "81-2";
      } else if (to.path == "/Wenzhoujiaoyu/Fabuliebiao") {
        this.menuActiveIndex = "82-1";
      } else if (to.path == "/Wenzhoujiaoyu/Lishifabu") {
        this.menuActiveIndex = "82-2";
      }
    },
  },
  data() {
    return {
      menu_wzedu: null,
      activeIndex: 0,
      menuActiveIndex: "",
      userInfo: null,
      isCollapse: false,
      menu: [],
      isHaveSY: false,
      user_level: null,
    };
  },
  created() {
    this.menu = JSON.parse(sessionStorage.getItem("menu"));
    this.user_level = sessionStorage.getItem("user_level");
    this.menu_wzedu = sessionStorage.getItem("menu_wzedu");
    console.log(this.menu, this.user_level);
    if (this.menu[0].name == "首页") {
      this.isHaveSY = true;
      this.menu.shift();
    } else {
      this.isHaveSY = false;
    }
    this.menu.forEach((ele) => {
      if (ele.name == "温州教育") {
        this.haveWZJY = true;
      }
      ele.sub_menu.forEach((ele2) => {
        if (ele2.sub_menu.length > 0) {
          ele.sub_menu.pop();
          ele.newSub_menu = ele2.sub_menu;
          ele2.sub_menu = [];
          ele.newSub_menuName = ele2.name;
          ele.newSub_menuNameindex = ele2.menu_index;
        }
      });
    });
    console.log(this.menu);
  },
  methods: {
    clickFabu(val, i) {
      setTimeout(()=>{
        this.$store.commit("caijiFabuName", val);
      this.$store.commit("caijiFabuIndex", i);
      this.menuActiveIndex = this.caijiFabuIndex;
      },200)
    },
    myisColl() {
      this.isCollapse = !this.isCollapse;
    },
    loginOut() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      this.$router.push({ path: "/Shouye" });
      this.$router.go(0);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-menu-item i {
  color: #fff;
}
/deep/ .el-submenu i {
  color: #fff;
}
.aside {
  .menu {
    /deep/ .el-menu {
      border-right: 0px;
    }
    /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
    /deep/ .el-menu-vertical-demo.el-menu {
      background: #10183c !important;
      margin: 0 18px;
    }
    /deep/ .el-menu-item.is-active {
      background: #388bf4 !important;
      position: relative;
    }

    /deep/ .el-submenu.is-active.is-opened {
      // 第二层
      .el-submenu__title {
        background: #388bf4 !important;
        i {
          color: #ffffff;
        }
      }
      .el-menu-item {
        padding-left: 48px !important;
      }
      .el-menu-item.is-active {
        background: #10183c !important;
        position: relative;
        // padding-left: 48px !important;
      }
      .el-menu-item.is-active::after {
        position: absolute;
        top: 50%;
        left: 26px;
        transform: translateY(-50%);
        content: "";
        width: 10px;
        height: 10px;
        background: #388bf4;
        border-radius: 50%;
      }
      .el-submenu {
        .el-submenu__title {
          padding-left: 48px !important;
          background: #10183c !important;
        }
        .el-menu-item {
          padding-left: 60px !important;
        }
      }
      // 有三层的第二层
      .el-submenu.is-active.is-opened {
        position: relative;
        .el-submenu__title {
          background: #10183c !important;
          // padding-left: 48px !important;
          i {
            color: #ffffff;
          }
          ::after {
            content: "";
            width: 0px;
            height: 0px;
          }
          ::after {
            position: absolute;
            top: 50%;
            // left: 26px;
            left: 144px;
            transform: translateY(-50%);
            content: "";
            width: 10px;
            height: 10px;
            background: #388bf4;
            border-radius: 50%;
          }
        }

        .el-menu-item.is-active {
          color: #388bf4 !important;
        }
        .el-menu-item.is-active::after {
          content: "";
          width: 0px !important;
          height: 0px !important;
        }
      }
    }
    .myisCollBtn {
      margin: 32px 0 16px 0;
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.26px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>