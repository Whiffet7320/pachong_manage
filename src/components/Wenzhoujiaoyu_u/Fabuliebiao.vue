<template>
  <div class="index">
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
        </el-input>
      </div>
      <div class="n3-tit2 tj">
        <el-button @click="searchKey" type="primary">查询</el-button>
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
      </div>
      <div class="titt2">
        <el-button size="mini" @click="piliangfabu" type="primary"
          >批量发布</el-button
        >
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
        <!-- <vxe-column show-overflow type="checkbox" width="60"></vxe-column> -->
        <vxe-column show-overflow field="title" title="标题"></vxe-column>
        <vxe-column show-overflow field="source" title="来源"></vxe-column>
        <vxe-column show-overflow field="content" title="内容"></vxe-column>
        <!-- <vxe-column show-overflow field="age" title="链接">
          <template #default="{ row }">
            <a style="color: #333" :href="`${row.url}`" target="_black">{{
              row.url
            }}</a>
          </template>
        </vxe-column> -->
        <!-- <vxe-column show-overflow width="200" field="address" title="采集来源">
          <template #default="{ row }">
            <div class="cjyl">
              <div
                :class="{
                  dian: true,
                  success: row.from_isuser == 0,
                  fail: row.from_isuser == 1,
                }"
              ></div>
              <div class="txt">{{ row.from_user }}</div>
            </div>
          </template>
        </vxe-column> -->
        <!-- <vxe-table-column width="1">
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
        </vxe-table-column> -->
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
      title="添加/编辑发布"
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
              <el-form-item label="标题：">
                <el-input
                  size="small"
                  type="textarea"
                  v-model="addForm.title"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="nowIndex != 3">
            <el-col :span="20">
              <el-form-item label="内容：">
                <el-input
                  size="small"
                  type="textarea"
                  :rows="10"
                  v-model="addForm.content"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="链接：">
                <el-input size="small" v-model="addForm.new_url"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="时间：">
                <el-input size="small" v-model="addForm.time"></el-input>
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
            <el-button @click="addTag" size="small">摘取</el-button>
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
      time: null,
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
        content: "",
      },
      isAdd: false,
      arr1: [],
      arr2: [],
      arr3: [],
      have1: false,
      have2: false,
      have3: false,
    };
  },
  created() {
    this.$store.commit("redulianjiebiaoPage", 1);
    const menu = JSON.parse(sessionStorage.getItem("menu"));
    console.log(menu);
    menu.forEach((ele) => {
      if (ele.sub_menu.length > 0) {
        ele.sub_menu.forEach((ele2) => {
          if (ele2.sub_menu.length > 0) {
            ele2.sub_menu.forEach((ele3) => {
              if (ele3.menu_index == "80-3-1") {
                this.have1 = true;
              }
              if (ele3.menu_index == "80-3-2") {
                this.have2 = true;
              }
              if (ele3.menu_index == "80-3-3") {
                this.have3 = true;
              }
            });
          }
        });
      }
    });
    this.getGjcData();
    const loading = this.$loading({
      lock: true,
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    setTimeout(() => {
      this.getData();
      loading.close();
    }, 500);
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
      this.addDialogVisible = true;
    },
    async getGjcData() {
      const res = await this.$api.pubsentiment_keywordlist({
        day: this.time ? this.time : "",
        page: 1,
        pagesize: 1000000,
      });
      this.tagList = res.list;
    },
    tuichu() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      sessionStorage.setItem("user_level", "");
      this.$router.push({ path: "/Shouye" });
      setTimeout(() => {
        this.$router.go(0);
      }, 200);
    },
    searchKey() {
      this.getData();
    },
    async getData() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await this.$api.info_list({
        keyword: this.keyword,
        // start_day: this.time,
        // end_day: this.time,
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
    async getData2() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await this.$api.comment_list({
        site_id: this.site_id,
        start_day: this.time,
        end_day: this.time,
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
    async getData3() {
      const loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const res = await this.$api.video_list({
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
    async piliangfabu() {
      if (this.nowIndex == 1) {
        console.log(this.arr1.toString());
        const res = await this.$api.select_news({
          news_id: this.arr1.toString(),
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
        const res = await this.$api.select_comment({
          comment_id: this.arr2.toString(),
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
        const res = await this.$api.select_video({
          video_id: this.arr3.toString(),
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
      if (this.nowIndex == 1) {
        res = await this.$api.news_del({ id: row.id });
      } else if (this.nowIndex == 2) {
        res = await this.$api.pubsentiment_del({ id: row.id });
      } else if (this.nowIndex == 3) {
        res = await this.$api.video_del({ id: row.id });
      }
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.keyword = "";
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
      if (this.nowIndex == 1) {
        res = await this.$api.news_edit({
          id: this.id,
          title: this.addForm.title,
          content: this.addForm.content,
        });
        console.log(res);
      } else if (this.nowIndex == 2) {
        res = await this.$api.pubsentiment_edit({
          id: this.id,
          title: this.addForm.title,
          content: this.addForm.content,
        });
        console.log(res);
      } else if (this.nowIndex == 3) {
        res = await this.$api.video_edit({
          id: this.id,
          title: this.addForm.title,
        });
        console.log(res);
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
      console.log(row);
      this.isAdd = false;
      this.id = row.id;
      this.addForm.title = row.title;
      this.addForm.url = row.url;
      this.addForm.content = row.content;
      this.addForm.source = row.source;
      this.addDialogVisible = true;
    },
    async tabFabu(row) {
      console.log(row);
      if (this.nowIndex == 1) {
        const res = await this.$api.select_news({
          news_id: row.id,
        });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      } else if (this.nowIndex == 2) {
        const res = await this.$api.select_comment({
          comment_id: row.id,
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
      } else if (this.nowIndex == 3) {
        const res = await this.$api.select_video({
          video_id: row.id,
        });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData3();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    changeTime() {
      this.tableData = [];
      if (this.nowIndex == 1) {
        this.getData();
      } else if (this.nowIndex == 2) {
        this.getData2();
      } else if (this.nowIndex == 3) {
        this.getData3();
      }
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
    async addTag() {
      if (this.tagVal) {
        const res = await this.$api.add_pubsentimentkeyword({
          name: this.tagVal,
          day: this.time2 ? this.time2 : "",
        });
        if (res.result == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.tagVal = "";
          this.getGjcData();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async removeTag(tag) {
      // this.tagList.splice(this.tagList.indexOf(tag), 1);
      const res = await this.$api.del_pubsentimentkeyword({
        id: tag.id,
      });
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getGjcData();
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
      // background: transparent;
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
    .n1-tit3 {
      width: 130px;
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
  background: #ffffff;
  padding: 20px 20px;
  margin-top: -22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .n3-tit1 {
    margin-right: 12px;
    width: 280px;
    /deep/ .el-input__inner {
      background-color: #fff !important;
      border: 0;
      border: 1px solid #666666 !important;
      padding: 0 20px 0 36px;
    }
    /deep/ .el-input-group__append {
      background: #409eff !important;
      border: 1px solid #666666 !important;
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
      // background: transparent;
    }
  }
  .n3-tit2.tj {
    margin-right: 10px;
    /deep/ .el-button {
      padding: 0;
      height: 40px;
      width: 80px;
      // background: transparent;
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
    background: #eef6fe;
    color: #409eff;
  }
  /deep/ .vxe-table--header {
    // border-bottom: 2px solid #bababa;
  }
  /deep/ .body--wrapper {
    background-color: #fff;
  }
  /deep/ .vxe-body--row {
    border-bottom: 2px solid #bababa !important;
  }
  /deep/ .vxe-table--body {
    border-collapse: collapse;
  }
  /deep/ .vxe-cell--label {
    color: #333333;
  }
  /deep/ .vxe-checkbox--icon:before {
    // background-color: #1f2935;
    border: 1px solid #8291a9;
  }
}
.fenye {
  margin-top: 20px;
  float: right;
  /deep/ .el-pagination__total {
    color: #333333;
  }
  /deep/ .btn-prev {
    background-color: #fff !important;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    i {
      color: #333333;
    }
  }
  /deep/ .btn-next {
    background-color: #fff !important;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    i {
      color: #333333;
    }
  }
  /deep/ .el-pager {
    li {
      background: #fff;
      min-width: 28px;
    }
    .number {
      color: #333333;
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
/deep/ .vxe-body--column.col--ellipsis {
  line-height: 48px;
}
</style>