<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">操作日志</div>
      <!-- <div class="tit2">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="出售中的商品" name="1"></el-tab-pane>
          <el-tab-pane label="下架的商品" name="2"></el-tab-pane>
          <el-tab-pane label="已经售馨商品" name="3"></el-tab-pane>
        </el-tabs>
      </div>-->
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="管理员：">
            <el-select size='small' v-model="formInline.manage_id" filterable placeholder="请选择">
              <el-option
                v-for="item in fenleiOptions"
                :key="item.manage_id"
                :label="item.manage_name"
                :value="item.manage_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              size="small"
              v-model="formInline.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <!-- <el-form-item label="商品分类：">
            <el-cascader
              size="small"
              :options="options"
              :props="{ checkStrictly: true, value: 'id',label: 'category_name'}"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商品搜索：">
            <el-input
              size="small"
              v-model="formInline.user"
              placeholder="商品搜索"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit"
              >查询</el-button
            >
          </el-form-item>-->
        </el-form>
      </div>
      <!-- <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加商品</el-button>
      </div>-->
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <!-- <vxe-table-column field="product_num" title="商品编号"></vxe-table-column> -->
          <vxe-table-column field="manage_id" title="管理员ID"></vxe-table-column>
          <vxe-table-column field="manage_log" title="操作详情"></vxe-table-column>
          <vxe-table-column field="myTime" title="操作时间"></vxe-table-column>
          <!-- <vxe-table-column field="ficti" title="销量"></vxe-table-column> -->
          <!-- <vxe-table-column field="stock" title="库存"></vxe-table-column> -->
          <!-- <vxe-table-column field="status" title="状态(是否显示)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myStatus"></el-switch>
            </template>
          </vxe-table-column>-->
          <!-- <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toEditShop(scope.row)" type="text">编辑</el-button>
                <el-button
                  size="small"
                  @click="toEditShop(scope.row)"
                  type="text"
                  >查看评论</el-button
                >
                <el-button size="small" @click="toDelShop(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>-->
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.shangpingliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
      <!-- 添加商品 -->
      <el-dialog
        title="添加商品"
        :visible.sync="addDialogVisible"
        width="700px"
        :before-close="addHandleClose"
      >
        <div class="myAddForm">
          <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
            <el-row>
              <el-col :span="20">
                <el-form-item label="分类" prop="category_name">
                  <el-select
                    @change="changeFenlei"
                    size="small"
                    v-model="addForm.id"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in fenleiOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品" prop="category_name">
                  <el-select
                    :disabled="!haveFenlei"
                    size="small"
                    v-model="addForm.shop_id"
                    filterable
                    multiple
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in shopOptions"
                      :key="item.shop_id"
                      :label="item.shop_name"
                      :value="item.shop_id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="20">
                <el-form-item label="商品图片">
                  <div @click="companyList('tb')" class="myImg">
                    <el-image :src="addForm.shop_img" fit="fill" style="width: 60px; height: 60px">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <div @click.stop="delImg('tb')" class="closeBtn">
                      <el-button circle>×</el-button>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品轮播图片：" prop="shop_rotation">
                  <div
                    @click="companyList('lbt', i)"
                    class="myImg"
                    v-for="(item, i) in addForm.shop_rotation"
                    :key="i"
                  >
                    <el-image :src="item" fit="fill" style="width: 60px; height: 60px">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <div @click.stop="delImg('lbt', i)" class="closeBtn">
                      <el-button circle>×</el-button>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品详情">
                  <el-input size="small" type="textarea" v-model="addForm.shop_detail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="商品价格">
                  <el-input size="small" placeholder="请输入商品价格" v-model="addForm.shop_price"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="虚拟卡ID">
                  <el-select size="small" v-model="addForm.card_id" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.card_type_id"
                      :label="item.card_name"
                      :value="item.card_type_id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>-->
            <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="状态" prop="is_show">
                <el-radio-group v-model="addForm.is_show">
                  <el-radio label="显示"></el-radio>1
                  <el-radio label="隐藏"></el-radio>0
                </el-radio-group>
              </el-form-item>
            </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="20">
                <el-form-item>
                  <el-button size="small" type="primary" @click="AddOnSubmit">提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-dialog>
      <input
        type="file"
        name="companyLogo"
        id="file0"
        class="displayN"
        multiple="multiple"
        @change="companyLogo($event)"
        ref="fileInputList"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["shangpingliebiaoPage", "shangpingliebiaoPageSize"])
  },
  watch: {
    shangpingliebiaoPage: function(page) {
      this.$store.commit("shangpingliebiaoPage", page);
      this.getData();
    },
    shangpingliebiaoPageSize: function(pageSize) {
      this.$store.commit("shangpingliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      // activeName: "3",
      addForm: {
        id: "",
        shop_id: ""
        // shop_name: "",
        // shop_img: "",
        // shop_rotation: ["", "", "", "", "", "", "", "", "", ""],
        // shop_detail: "",
        // shop_price: "",
        // card_id: ""
      },
      formInline: {
        manage_id:'',
        time: [],
        rad1: "",
        country_pos: "",
        country_code: "",
        country_name: "",
        country_english_name: "",
        two_code: "",
        three_code: ""
      },
      addDialogVisible: false,
      options: [],
      tableData: [],
      total: 0,
      isAdd: true,
      imgStatus: "",
      imgIndex: "",
      id: "",
      fenleiOptions: [],
      shopOptions: [],
      haveFenlei: false
    };
  },
  created() {
    this.$store.commit("shangpingliebiaoPage", 1);
    this.$store.commit("shangpingliebiaoPageSize", 10);
    this.getFenleiData();
    // this.getMangheData();
    // this.getShopData()
    setTimeout(() => {
      // this.formInline.rad1 = this.fenleiOptions[0].id;
      this.getData();
    }, 500);
  },
  methods: {
    async getData() {
      const res = await this.$api.getManageHistory({
        pagesize: this.shangpingliebiaoPageSize,
        pagenum: this.shangpingliebiaoPage,
        start_time: this.formInline.time[0],
        end_time: this.formInline.time[1]
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        ele.myTime = this.$formatDate(ele.timestamp);
      });
    },
    async getShopData() {
      const res = await this.$api.getCategoryWithoutShopList({
        pagesize: 10000,
        page: 1,
        id: this.addForm.id
      });
      this.shopOptions = res.data.data;
    },
    async getFenleiData() {
      const res = await this.$api.getManageList({
        pagenum: 1,
        pagesize: 10000
      });
      this.fenleiOptions = res.data.data;
    },
    async getMangheData() {
      const res = await this.$api.getCardTypeList();
      this.options = res.data;
    },
    changeFenlei() {
      this.haveFenlei = true;
      this.getShopData();
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        const res = await this.$api.addCategoryShop({
          id: this.addForm.id,
          shop_id: this.addForm.shop_id.toString()
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      } else {
        const res = await this.$api.changeShopInfo({
          shop_id: this.id,
          shop_name: this.addForm.shop_name,
          shop_img: this.addForm.shop_img,
          shop_rotation: JSON.stringify(this.addForm.shop_rotation),
          shop_detail: this.addForm.shop_detail,
          shop_price: this.addForm.shop_price,
          card_id: this.addForm.card_id
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
        }
      }
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    changeRad1() {
      this.getData();
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.product_status({
        id: row.id,
        status: row.myStatus == true ? "1" : "0"
      });
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
      }
    },
    toEditShop(row) {
      this.isAdd = false;
      this.id = row.shop_id;
      console.log(row);
      this.addForm = { ...row };
      console.log(this.addForm);
      if (row.shop_rotation == "") {
        this.addForm.shop_rotation = ["", "", "", "", "", "", "", "", "", ""];
      } else {
        console.log(row.shop_rotation);
        this.addForm.shop_rotation = row.shop_rotation;
      }
      this.addForm.card_id = row.card_type_id;
      this.addDialogVisible = true;
    },
    async toDelShop(row) {
      const res = await this.$api.deleteCateGoryShop({
        id: this.formInline.rad1,
        shop_id: row.shop_id
      });
      if (res.status == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    async onSubmit() {
      this.getData();
    },
    toAddShop() {
      this.isAdd = true;
      for (const key in this.addForm) {
        if (key == "shop_rotation") {
          this.$set(this.addForm, key, [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          ]);
        } else {
          this.$set(this.addForm, key, "");
        }
      }
      this.addDialogVisible = true;
    },
    // 删除图片
    delImg(val, i) {
      if (val == "tb") {
        this.$set(this.addForm, "shop_img", "");
      } else if (this.imgStatus == "lbt") {
        this.$set(this.addForm.shop_rotation, i, "");
      }
    },
    // 上传图片
    companyList(val, i) {
      this.imgStatus = val;
      this.imgIndex = i;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      // console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("file", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.upload_pic(this.imgFile);
          if (this.imgStatus == "tb") {
            this.$set(this.addForm, "shop_img", `${res.data}`);
          } else if (this.imgStatus == "lbt") {
            this.$set(this.addForm.shop_rotation, this.imgIndex, `${res.data}`);
          }
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("shangpingliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("shangpingliebiaoPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    .xiala {
      padding: 10px 20px;
      .item {
        font-size: 12px;
      }
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .fenye {
      margin-top: 10px;
    }
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 14px;
      vertical-align: middle;
    }
    /deep/ .vxe-cell--label {
      font-size: 12px;
    }
    /deep/ .vxe-cell--title {
      font-size: 12px;
    }
    /deep/ .image-slot {
      width: 38px;
      height: 38px;
      border: 1px solid #ddd;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
    }
  }
}
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
  }
  .myImg {
    position: relative;
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-right: 12px;
    .closeBtn {
      position: absolute;
      top: -6px;
      right: -4px;
      width: 20px;
      height: 20px;
      .el-button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    /deep/ .image-slot {
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fafafa;
      width: 58px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .el-icon-picture-outline {
        font-size: 20px;
      }
    }
  }
}
.displayN {
  display: none;
}
</style>