<template>
  <div class="index">
    <div class="nav1 bt">
      <div class="flex">
        <div class="n1-tit1">热度关键词分析</div>
        <div class="titt" style="margin-left: 20px">
          <div class="n1-tit2">
            <div class="txt2-1">选择日期：</div>
          </div>
          <div class="n1-tit3">
            <el-date-picker
              size="mini"
              @change="changeTime"
              value-format="yyyy-MM-dd"
              v-model="time"
              type="daterange"
              range-separator="—"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <div class="n3-tit2">
              <el-button
                size="mini"
                style="height: 28px; width: 48px; margin-left: 12px"
               @click="cTime1"
                type="primary"
                >一年</el-button
              >
              <el-button
                size="mini"
                style="height: 28px; width: 48px; margin-left: 12px"
                @click="cTime2"
                type="primary"
                >半年</el-button
              >
              <el-button
                size="mini"
                style="height: 28px; width: 58px; margin-left: 12px"
                @click="cTime3"
                type="primary"
                >一个月</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="n3-tit2">
        <el-button @click="tuichu" type="primary" icon="el-icon-switch-button"
          >退出</el-button
        >
      </div>
    </div>
    <div class="nav2">
      <div class="n2-tit1">采集</div>
      <i class="el-icon-arrow-right"></i>
      <div class="n2-tit2">添加热度链接</div>
    </div>
    <div class="nav3">
      <div class="n3-tit1">
        <!-- <el-input
          placeholder="热度链接"
          prefix-icon="el-icon-search"
          v-model="keyword"
        ></el-input> -->
        <el-input
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="keyword"
        >
          <el-button @click="searchKey" slot="append">搜索</el-button>
        </el-input>
      </div>
      <div class="n3-tit2 tj">
        <el-button
          style="width: 160px"
          :class="{ btnActive: !issd }"
          @click="zd"
          type="primary"
          >自动热度关键词分析</el-button
        >
      </div>
      <div class="n3-tit2 tj">
        <el-button
          :class="{ btnActive: issd }"
          style="width: 160px"
          @click="sd"
          type="primary"
          >手动热度关键词分析</el-button
        >
      </div>
      <div class="n3-tit2">
        <el-button
          style="width: 76px"
          @click="zqDialogVisible = true"
          type="primary"
          icon="el-icon-plus"
          >添加</el-button
        >
      </div>
      <!-- <div class="n3-tit2">
        <el-button
          type="primary"
          @click="addHotlink"
          icon="el-icon-plus"
        ></el-button>
      </div> -->
      <!-- <div class="n3-tit3">
        <div
          v-if="have1"
          @click="changeIndex(1)"
          :class="{ btn: true, active: nowIndex == 1 }"
        >
          新闻
        </div>
        <div
          v-if="have2"
          @click="changeIndex(2)"
          :class="{ btn: true, active: nowIndex == 2 }"
        >
          舆情
        </div>
        <div
          v-if="have3"
          @click="changeIndex(3)"
          style="margin-right: 10px"
          :class="{ btn: true, active: nowIndex == 3 }"
        >
          视频
        </div>
        <div class="myPopover">
          <el-popover
            placement="bottom-start"
            :visible-arrow="false"
            trigger="click"
          >
            <div class="myPop-box">
              <div class="navv1">
                <div class="tit1">
                  <el-input
                    size="small"
                    v-model="tagVal"
                    placeholder="添加屏蔽关键词"
                  ></el-input>
                </div>
                <el-button @click="addTag" size="small">添加</el-button>
              </div>
              <div class="navv2">
                <div class="tit1">已屏蔽关键词</div>
                <div class="tit2">
                  <el-tag
                    v-for="item in tagList"
                    :key="item.id"
                    @close="removeTag(item)"
                    size="small"
                    closable
                    >{{ item.title }}</el-tag
                  >
                </div>
              </div>
            </div>
            <el-button size="mini" slot="reference">
              屏蔽关键词
              <i class="el-icon-plus"></i>
            </el-button>
          </el-popover>
        </div>
      </div> -->
    </div>
    <div class="nav4 nav1">
      <!-- <div class="titt1 titt">
        <div class="n1-tit2">
          <div class="txt2-1">发布日期：</div>
        </div>
        <div class="n1-tit3">
          <el-date-picker
            value-format="yyyy-MM-dd"
            size="mini"
            v-model="time2"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
      </div> -->
      <!-- <div class="titt2">
        <el-button size="mini" @click="piliangDel" type="danger"
          >批量删除</el-button
        >
      </div> -->
    </div>
    <div class="myTable">
      <vxe-table
        v-show="nowIndex == 1"
        height="554"
        border="none"
        ref="xTable1"
        :data="tableData"
        @checkbox-all="selectAllEvent1"
        @checkbox-change="selectChangeEvent1"
      >
        <vxe-column show-overflow type="checkbox" width="60"></vxe-column>
        <vxe-column show-overflow field="title" title="关键词名称"></vxe-column>
        <vxe-column show-overflow field="num" title="次数"></vxe-column>
        <vxe-table-column width="100">
          <template slot-scope="scope">
            <div style="display: flex">
              <!-- <el-button size="mini" type="info" @click="tabEdit(scope.row)"
                >编辑</el-button
              > -->
              <el-button size="mini" type="danger" @click="tabDel(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-table
        v-show="nowIndex == 2"
        height="554"
        border="none"
        ref="xTable2"
        :data="tableData"
        @checkbox-all="selectAllEvent2"
        @checkbox-change="selectChangeEvent2"
      >
        <vxe-column show-overflow type="checkbox" width="60"></vxe-column>
        <vxe-column
          field="news_name"
          show-overflow
          title="新闻标题"
        ></vxe-column>
        <vxe-column
          show-overflow
          field="site_name"
          width="180"
          title="作者"
        ></vxe-column>
        <vxe-column
          show-overflow
          field="comment_content"
          title="评论内容"
        ></vxe-column>
        <vxe-column
          field="user_name"
          show-overflow
          title="评论用户"
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
        <!-- <vxe-column show-overflow field="source" title="来源"></vxe-column> -->
        <vxe-column
          field="comment_time"
          show-overflow
          title="发布时间"
        ></vxe-column>
        <vxe-table-column width="210">
          <template slot-scope="scope">
            <div style="display: flex">
              <el-button size="mini" type="info" @click="tabEdit(scope.row)"
                >编辑</el-button
              >
              <el-button size="mini" type="primary" @click="tabFabu(scope.row)"
                >发布</el-button
              >
              <el-button size="mini" type="danger" @click="tabDel(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-pagination
        class="fenye"
        :pager-count="5"
        @current-change="this.handleCurrentChange"
        :current-page="this.redulianjiebiaoPage"
        :page-size="9"
        layout="total, prev, pager, next"
        :total="this.total"
      ></el-pagination>
    </div>
    <!-- 编辑热度链接 -->
    <el-dialog
      title="添加/编辑热度链接"
      :visible.sync="addDialogVisible"
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
                  v-if="isAdd"
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
          <el-row v-if="this.nowIndex == 1 && this.isAdd">
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
                  @change="changeshijian"
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
                <el-button size="small" type="primary" @click="AddOnSubmit"
                  >提交</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 摘取关键词 -->
    <el-dialog
      title="摘取关键词"
      :visible.sync="zqDialogVisible"
      width="555px"
      :before-close="zqHandleClose"
      custom-class="myZhanghaoDia"
    >
      <div class="myPopover">
        <div class="myPop-box">
          <div class="navv1">
            <div class="tit1">
              <el-input
                size="small"
                v-model="tagVal"
                placeholder="输入需要摘取的关键词"
              ></el-input>
            </div>
            <el-button @click="addTag" size="small">添加</el-button>
          </div>
          <div class="navv2">
            <div class="tit1">已摘取关键词</div>
            <div class="tit2">
              <el-tag
                v-for="item in tagList"
                :key="item.id"
                @close="removeTag(item)"
                size="small"
                closable
                >{{ item.title }}</el-tag
              >
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["redulianjiebiaoPage"]),
  },
  watch: {
    redulianjiebiaoPage: function (page) {
      this.$store.commit("redulianjiebiaoPage", page);
      this.arr1 = [];
      this.arr2 = [];
      if (this.nowIndex == 1) {
        this.getData();
      } else if (this.nowIndex == 2) {
        this.getData2();
      }
    },
  },
  data() {
    return {
      zqDialogVisible: false,
      id: "",
      total: 150,
      keyword: "",
      time: [],
      time2: null,
      nowIndex: 1,
      tagVal: "",
      tagList: [],
      tableData: [],
      addDialogVisible: false,
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
      arr1: [],
      arr2: [],
      arr3: [],
      have1: false,
      have2: false,
      have3: false,
      issd: false,
    };
  },
  created() {
    this.$store.commit("redulianjiebiaoPage", 1);
    this.getGjcData();
    // const loading = this.$loading({
    //   lock: true,
    //   text: "加载中...",
    //   spinner: "el-icon-loading",
    //   background: "rgba(0, 0, 0, 0.7)",
    // });
    // setTimeout(() => {
    //   if (this.nowIndex == 1) {
    //     this.getData();
    //   } else if (this.nowIndex == 2) {
    //     this.getData2();
    //   } else if (this.nowIndex == 3) {
    //     this.getData3();
    //   }
    //   loading.close();
    // }, 500);
    this.getData2();
    this.getData();
  },
  mounted() {
    // var arr = this.tableData.filter(ele => {
    //   return ele.sex == "Women";
    // });
    // this.$refs.xTable1.setCheckboxRow(arr, true);
  },
  methods: {
    addClick() {
      for (const key in this.addForm) {
        this.addForm[key] = "";
      }
      this.isAdd = true;
      this.addDialogVisible = true;
    },
    async getGjcData() {
      const res = await this.$api.keyword_list({
        day: this.time ? this.time : "",
        page: 1,
        types: this.nowIndex,
        pagesize: 1000000,
      });
      this.tagList = res.list;
    },
    searchKey() {
      if(!this.issd){
        this.getData()
      }else{
        this.getData2()
      }
    },
    tuichu() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      sessionStorage.setItem("user_level", '');
      this.$router.push({ path: "/Shouye" });
      setTimeout(()=>{
        this.$router.go(0);
      },500)
    },
    zd() {
      this.issd = false;
      this.tableData = [];
      this.$store.commit("redulianjiebiaoPage", 1);
      this.getData();
    },
    sd() {
      this.issd = true;
      this.tableData = [];
      this.$store.commit("redulianjiebiaoPage", 1);
      this.getData2();
    },
    cTime1() {
      const bb = new Date();
      bb.setFullYear(bb.getFullYear() - 1);
      const aa = new Date();
      this.time = [
        bb.toLocaleDateString().split("/").join("-"),
        aa.toLocaleDateString().split("/").join("-"),
      ];
      if(!this.issd){
        this.getData()
      }else{
        this.getData2()
      }
    },
    cTime2() {
      const bb = new Date();
      bb.setMonth(bb.getMonth() - 6);
      const aa = new Date();
      this.time = [
        bb.toLocaleDateString().split("/").join("-"),
        aa.toLocaleDateString().split("/").join("-"),
      ];
      if(!this.issd){
        this.getData()
      }else{
        this.getData2()
      }
    },
    cTime3() {
      const bb = new Date();
      bb.setMonth(bb.getMonth() - 1);
      const aa = new Date();
      this.time = [
        bb.toLocaleDateString().split("/").join("-"),
        aa.toLocaleDateString().split("/").join("-"),
      ];
      if(!this.issd){
        this.getData()
      }else{
        this.getData2()
      }
    },
    async getData() {
      const res = await this.$api.hotwords_list({
        keyword: this.keyword,
        page: this.redulianjiebiaoPage,
        pagesize: 9,
        start_day: this.time ? this.time[0] : "",
        end_day: this.time ? this.time[1] : "",
      });
      this.tableData = res.list;
      this.total = res.total;
    },
    async getData2() {
      const res = await this.$api.list_hotwordskeyword({
        keyword: this.keyword,
        page: this.redulianjiebiaoPage,
        pagesize: 9,
        start_day: this.time ? this.time[0] : "",
        end_day: this.time ? this.time[1] : "",
      });
      if (this.issd) {
        this.tableData = res.list;
      }
      this.tagList = res.list;
      this.total = res.total;
    },
    async addTag() {
      const res = await this.$api.add_hotwordskeyword({ name: this.tagVal });
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.tagVal = "";
        this.getData2();
      } else {
        this.$message.error(res.msg);
      }
    },
    // async getData2() {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: "加载中...",
    //     spinner: "el-icon-loading",
    //     background: "rgba(0, 0, 0, 0.7)",
    //   });
    //   const res = await this.$api.comment_list({
    //     keyword: this.keyword,
    //     site_id: this.site_id,
    //     start_day: this.time,
    //     end_day: this.time,
    //     page: this.redulianjiebiaoPage,
    //     pagesize: 9,
    //   });
    //   if (res.list) {
    //     this.tableData = res.list;
    //     this.total = res.total;
    //   } else if (res.total == 0) {
    //     this.tableData = [];
    //     this.total = res.total;
    //   } else {
    //     this.$message("没有更多了");
    //   }
    //   loading.close();
    // },
    async getData3() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await this.$api.video_list({
        keyword: this.keyword,
        site_id: this.site_id,
        end_day: this.time,
        start_day: this.time,
        page: this.redulianjiebiaoPage,
        pagesize: 9,
      });
      if (res.list) {
        this.tableData = res.list;
        this.total = res.total;
      } else if (res.total == 0) {
        this.tableData = [];
        this.total = res.total;
      } else {
        this.$message("没有更多了");
      }
      loading.close();
    },
    zqHandleClose() {
      this.zqDialogVisible = false;
    },
    async piliangDel() {
      if (this.nowIndex == 1) {
        console.log(this.arr1.toString());
        const res = await this.$api.news_del({ id: this.arr1.toString() });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData();
          this.arr1 = [];
        } else {
          this.$message.error(res.msg);
        }
      } else if (this.nowIndex == 2) {
        console.log(this.arr2.toString());
        const res = await this.$api.pubsentiment_del({
          id: this.arr2.toString(),
        });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData2();
          this.arr2 = [];
        } else {
          this.$message.error(res.msg);
        }
      } else if (this.nowIndex == 3) {
        console.log(this.arr3.toString());
        const res = await this.$api.video_del({ id: this.arr3.toString() });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData3();
          this.arr3 = [];
        } else {
          this.$message.error(res.msg);
        }
      }
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
    async piliangfabu() {
      // console.log(this.arr3.toString());
      //   const res = await this.$api.select_video({
      //     video_id: this.arr3.toString(),
      //   });
      //   if (res.result == 1) {
      //     this.$message({
      //       message: res.msg,
      //       type: "success",
      //     });
      //     this.getData3();
      //     this.arr3 = [];
      //   } else {
      //     this.$message.error(res.msg);
      //   }
      if (this.nowIndex == 1) {
        console.log(this.arr1.toString());
        const res = await this.$api.user_release({
          release_id: this.arr1.toString(),
          types: this.nowIndex,
        });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData();
          this.arr1 = [];
        } else {
          this.$message.error(res.msg);
        }
      } else if (this.nowIndex == 2) {
        console.log(this.arr2.toString());
        const res = await this.$api.user_release({
          release_id: this.arr2.toString(),
          types: this.nowIndex,
        });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData2();
          this.arr2 = [];
        } else {
          this.$message.error(res.msg);
        }
      } else if (this.nowIndex == 3) {
        console.log(this.arr3.toString());
        const res = await this.$api.user_release({
          release_id: this.arr3.toString(),
          types: this.nowIndex,
        });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData3();
          this.arr3 = [];
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async tabDel(row) {
      let res = null;
      if (this.issd) {
        res = await this.$api.del_hotwordskeyword({ id: row.id });
      } else {
        res = await this.$api.del_hotwords({ id: row.id });
      }
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        if (this.issd) {
          this.getData2();
        } else {
          this.getData();
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    changeshijian(e) {
      console.log(e);
    },
    async addHotlink() {
      const loading = this.$loading({
        lock: true,
        text: "请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await this.$api.add_hotlink({
        url: this.keyword,
      });
      if (res.result == 1) {
        loading.close();
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.keyword = "";
        this.getData();
      } else {
        this.$message.error(res.msg);
      }
      if (this.nowIndex == 1) {
        this.getData();
      } else if (this.nowIndex == 2) {
        this.getData2();
      } else if (this.nowIndex == 3) {
        this.getData3();
      }
    },
    async AddOnSubmit() {
      let res = null;
      if (this.isAdd) {
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
        });
        console.log(res);
      } else {
        if (this.nowIndex == 1) {
          res = await this.$api.news_edit({
            id: this.id,
            title: this.addForm.title,
            source: this.addForm.source,
            news_day: this.addForm.news_day,
            urls: this.addForm.new_url,
            content: this.addForm.content,
          });
          console.log(res);
        } else if (this.nowIndex == 2) {
          res = await this.$api.pubsentiment_edit({
            id: this.id,
            title: this.addForm.title,
            source: this.addForm.source,
            news_day: this.addForm.news_day,
            urls: this.addForm.new_url,
          });
          console.log(res);
        } else if (this.nowIndex == 3) {
          res = await this.$api.video_edit({
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
        this.addDialogVisible = false;
        if (this.nowIndex == 1) {
          this.getData();
        } else if (this.nowIndex == 2) {
          this.getData2();
        } else if (this.nowIndex == 3) {
          this.getData3();
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    tabEdit(row) {
      this.isAdd = false;
      console.log(row);
      if (this.nowIndex == 1) {
        this.addForm.news_day = row.news_day;
        this.id = row.id;
        this.addForm.site_name = row.site_name;
        this.addForm.title = row.title;
        this.addForm.new_url = row.new_url;
        this.addForm.source = row.source;
        this.addForm.content = row.content;
      } else if (this.nowIndex == 2) {
        this.id = row.id;
        this.addForm.news_day = row.news_day;
        this.addForm.title = row.text_raw;
        this.addForm.source = row.source;
        this.addForm.new_url = row.new_url;
        this.addForm.content = row.comment_content;
      } else if (this.nowIndex == 3) {
        this.id = row.id;
        this.addForm.news_day = row.news_day;
        this.addForm.title = row.title;
        this.addForm.source = row.source;
        this.addForm.new_url = row.video_h5url;
      }
      //  else if (this.nowIndex == 3) {
      //   this.getData3();
      // }
      // this.id = row.id;
      // this.addForm.site_name = row.site_name;
      // this.addForm.title = row.title;
      // this.addForm.new_url = row.new_url;
      // this.addForm.content = row.content;
      this.addDialogVisible = true;
    },
    async tabFabu(row) {
      console.log(row);
      const res = await this.$api.user_release({
        release_id: row.id,
        types: this.nowIndex,
      });
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        if (this.nowIndex == 1) {
          this.getData();
        } else if (this.nowIndex == 2) {
          this.getData2();
        } else if (this.nowIndex == 3) {
          this.getData3();
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    changeTime() {
      this.tableData = [];
      this.getData();
      // if (this.nowIndex == 1) {
      //   this.getData();
      // } else if (this.nowIndex == 2) {
      //   this.getData2();
      // } else if (this.nowIndex == 3) {
      //   this.getData3();
      // }
    },
    changeIndex(i) {
      this.nowIndex = i;
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$store.commit("redulianjiebiaoPage", 1);
      setTimeout(() => {
        if (this.nowIndex == 1) {
          this.getData();
        } else if (this.nowIndex == 2) {
          this.getData2();
        } else if (this.nowIndex == 3) {
          this.getData3();
        }
        loading.close();
      }, 200);
    },
    // async addTag() {
    //   if (this.tagVal) {
    //     const res = await this.$api.add_keyword({
    //       name: this.tagVal,
    //       day: this.time ? this.time : "",
    //       types: this.nowIndex,
    //     });
    //     if (res.result == 1) {
    //       this.$message({
    //         message: res.msg,
    //         type: "success",
    //       });
    //       this.tagVal = "";
    //       this.getGjcData();
    //     } else {
    //       this.$message.error(res.msg);
    //     }
    //   }
    // },
    async removeTag(tag) {
      const res = await this.$api.del_hotwordskeyword({
        id: tag.id,
      });
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getData2();
      } else {
        this.$message.error(res.msg);
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("redulianjiebiaoPage", val);
    },
    selectAllEvent1() {
      const records = this.$refs.xTable1.getCheckboxRecords();
      this.arr1 = [];
      records.forEach((ele) => {
        this.arr1.push(ele.id);
      });
    },
    selectChangeEvent1() {
      const records = this.$refs.xTable1.getCheckboxRecords();
      // console.log(checked ? "勾选事件" : "取消事件", records);
      this.arr1 = [];
      records.forEach((ele) => {
        this.arr1.push(ele.id);
      });
    },
    selectAllEvent2() {
      const records = this.$refs.xTable2.getCheckboxRecords();
      this.arr2 = [];
      records.forEach((ele) => {
        this.arr2.push(ele.id);
      });
    },
    selectChangeEvent2() {
      const records = this.$refs.xTable2.getCheckboxRecords();
      this.arr2 = [];
      records.forEach((ele) => {
        this.arr2.push(ele.id);
      });
    },
    selectAllEvent3() {
      const records = this.$refs.xTable3.getCheckboxRecords();
      this.arr3 = [];
      records.forEach((ele) => {
        this.arr3.push(ele.id);
      });
    },
    selectChangeEvent3() {
      const records = this.$refs.xTable3.getCheckboxRecords();
      this.arr3 = [];
      records.forEach((ele) => {
        this.arr3.push(ele.id);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  padding: 0 10px;
}
.nav1.bt {
  justify-content: space-between;
}
.nav1 {
  .flex {
    display: flex;
    align-items: flex-end;
  }
  display: flex;
  align-items: flex-end;
  // align-content: center;
  .n3-tit2 {
    /deep/ .el-button {
      padding: 0;
      height: 40px;
      width: 80px;
      background: transparent;
    }
  }
  .n3-tit3 {
    display: flex;
    align-items: flex-end;
    margin-left: 10px;
    .btn.active {
      background: #122549;
      border: 1px solid #388bf4;
      color: #388bf4;
      line-height: 38px;
    }
    .btn {
      cursor: pointer;
      margin-left: 8px;
      width: 60px;
      height: 40px;
      background: #fff;
      // background:transparent;
      // border: 1px solid #388bf4;
      border-radius: 5px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium; //aaa
      font-weight: 500; //aa
      // color: #ffffff;
      color: #388bf4;
      letter-spacing: 0.18px;
    }
    .myPopover {
      .el-icon-plus {
        margin-left: 4px;
      }
      .el-button {
        background: #122549;
        border: 0;
        padding: 9px 15px 7px 15px;
        color: #ffffff;
      }
    }
  }
  .n1-tit1 {
    font-size: 30px;
    font-family: PingFang SC, PingFang SC-Medium; //aaa
    font-weight: 500; //aa
    color: #ffffff;
    margin-right: 20px;
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
    // .n1-tit3 {
    //   width: 130px;
    //   /deep/ .el-date-editor {
    //     width: 100%;
    //   }
    //   /deep/ .el-input__inner {
    //     background: #122549;
    //     border: 0;
    //     color: #ffffff;
    //   }
    // }
    .n1-tit3 {
      display: flex;
      align-items: center;
      // width: 282px;
      /deep/ .el-range-input {
        background-color: transparent;
        color: #ffffff;
      }
      /deep/ .el-range-separator {
        color: #ffffff;
      }
      /deep/ .el-date-editor {
        // width: 100%;
        width: 282px;
      }
      /deep/ .el-input__inner {
        background: #122549;
        border: 0;
        color: #ffffff;
      }
      .n1-tit2 {
        display: flex;
        align-content: center;
        /deep/ .el-button {
          height: 28px;
        }
      }
    }
  }
}
.nav2 {
  margin-top: 6px;
  display: flex;
  align-items: center;
  .n2-tit1 {
    font-size: 12px;
    font-family: PingFang SC, PingFang SC-Medium; //aaa
    font-weight: 500; //aa
    color: #8291a9;
  }
  .el-icon-arrow-right {
    color: #8291a9;
    font-size: 14px;
    margin: 0 4px;
  }
  .n2-tit2 {
    font-size: 12px;
    font-family: PingFang SC, PingFang SC-Medium; //aaa
    font-weight: 500; //aa
    color: #ffffff;
  }
}
.nav3 {
  margin-top: 22px;
  display: flex;
  align-items: center;
  .n3-tit1 {
    margin-right: 12px;
    width: 280px;
    /deep/ .el-input__inner {
      background-color: #1f2935 !important;
      border: 0;
      padding: 0 20px 0 36px;
      color: #fff;
    }
    /deep/ .el-input-group__append {
      background: transparent;
      border: 1px solid #1f2935 !important;
      button.el-button {
        background-color: #409eff !important;
        color: #ffffff;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .n3-tit2 {
    /deep/ .el-button {
      padding: 0;
      height: 40px;
      width: 120px;
      background: transparent;
    }
  }
  .n3-tit2.tj {
    margin-right: 10px;
    /deep/ .el-button {
      padding: 0;
      height: 40px;
      width: 80px;
      background: transparent;
    }
  }
  .n3-tit3 {
    display: flex;
    align-items: flex-end;
    margin-left: 10px;
    .btn.active {
      background: #122549;
      border: 1px solid #388bf4;
      color: #388bf4;
      line-height: 38px;
    }
    .btn {
      cursor: pointer;
      margin-left: 8px;
      width: 60px;
      height: 40px;
      background: #808080;
      border-radius: 5px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium; //aaa
      font-weight: 500; //aa
      color: #ffffff;
      letter-spacing: 0.18px;
    }
    .myPopover {
      .el-icon-plus {
        margin-left: 4px;
      }
      .el-button {
        background: #122549;
        border: 0;
        padding: 9px 15px 7px 15px;
        color: #ffffff;
      }
    }
  }
}
.nav4 {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  .titt1 {
    display: flex;
    align-items: center;
  }
  .titt2 {
    display: flex;
    align-items: center;
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
.myTable {
  margin-top: 10px;
  .cjyl {
    display: flex;
    align-items: center;
    .dian {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dian.success {
      background: #5cd56c;
    }
    .dian.fail {
      background: #ff6b6b;
    }
    .txt {
      margin-left: 10px;
      color: #ffffff;
    }
  }
  /deep/ .vxe-table--header-wrapper {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  /deep/ .vxe-header--column {
    background: #122549;
    color: #ffffff;
  }
  /deep/ .vxe-table--header {
    border-bottom: 2px solid #10183c;
  }
  /deep/ .body--wrapper {
    background-color: #122549;
  }
  /deep/ .vxe-body--row {
    border-bottom: 2px solid #10183c !important;
  }
  /deep/ .vxe-table--body {
    border-collapse: collapse;
  }
  /deep/ .vxe-cell--label {
    color: #ffffff;
  }
  /deep/ .vxe-checkbox--icon:before {
    background-color: #1f2935;
    border: 1px solid #8291a9;
  }
}
.fenye {
  margin-top: 20px;
  float: right;
  /deep/ .el-pagination__total {
    color: #ffffff;
  }
  /deep/ .btn-prev {
    background-color: #122549 !important;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    i {
      color: #ffffff;
    }
  }
  /deep/ .btn-next {
    background-color: #122549 !important;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    i {
      color: #ffffff;
    }
  }
  /deep/ .el-pager {
    li {
      background: #122549;
      min-width: 28px;
    }
    .number {
      color: #ffffff;
    }
    .number.active {
      color: #409eff;
    }
  }
}
/deep/ .el-dialog__body {
  padding: 0 !important;
}
.myPopover {
  // transform: translateY(-30px);
  .el-icon-plus {
    margin-left: 4px;
  }
  /deep/ .el-input__inner {
    background-color: transparent;
    color: #ffffff;
  }
  /deep/ .el-tag {
    background-color: transparent;
    color: #ffffff;
  }
  // .el-button {
  //   background: #122549;
  //   border: 0;
  //   padding: 9px 15px 7px 15px;
  //   color: #ffffff;
  // }
}
.btnActive {
  border-color: #e6a23c;
  color: #e6a23c;
}
</style>