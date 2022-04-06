<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">盲盒管理</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加盲盒</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <div class="xiala">
                <el-row :gutter="20">
                  <el-col :span="6" v-for="item in row.box_probability" :key="item.id">
                    <div style="margin:6px 0" class="item">{{ item.box_name }}({{item.box_type == 0 ? '试玩' : item.box_type == 1 ? '实际概率' : item.box_type == 2 ? '幸运值到100的概率' : '显示概率'}})：{{ item.probability }}%</div>
                  </el-col>
                </el-row>
                <!-- <div style="margin-top: 16px"></div>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="item">镜框总长：{{row.frame_width}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item">单镜框宽度：{{row.lens_width}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item">镜架距离：{{row.bridge}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item">眼镜腿长：{{row.temple_length}}</div>
                  </el-col>
                </el-row>
                <div style="margin-top: 16px"></div>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="item">单镜高度：{{row.lens_height}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item">镜框重量：{{row.frame_weight}}</div>
                  </el-col>
                  <el-col :span="10">
                    <div class="item">描述：{{row.description}}</div>
                  </el-col>
                </el-row> -->
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column field="box_id" title="ID"></vxe-table-column>
          <vxe-table-column field="box_name" title="名称"></vxe-table-column>
          <vxe-table-column field="box_price1" title="价格(一个)"></vxe-table-column>
          <vxe-table-column field="box_price2" title="价格(五个)"></vxe-table-column>
          <vxe-table-column field="box_price3" title="价格(十个)"></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toEditShop(scope.row)" type="text">编辑</el-button>
                <el-button size="small" @click="toDelShop(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <!-- <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.shangpingliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>-->
      </div>
    </div>
    <!-- 添加/编辑尺寸 -->
    <el-dialog
      title="添加/编辑尺寸"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="220px" class="demo-addForm">
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="眼镜分类">
                <el-select size="small" v-model="addForm.product_type_id" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.type_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>-->
          <el-row>
            <el-col :span="20">
              <el-form-item label="盲盒名称">
                <el-input size="small" placeholder="请输入盲盒名称" v-model="addForm.box_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="价格(一个)">
                <el-input size="small" placeholder="请输入价格" v-model="addForm.box_price1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="价格(五个)">
                <el-input size="small" placeholder="请输入价格" v-model="addForm.box_price2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="价格(十个)">
                <el-input size="small" placeholder="请输入价格" v-model="addForm.box_price3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="金色传说(试玩)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[0].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="红色史诗(试玩)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[1].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="紫色稀有(试玩)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[2].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="蓝色普通(试玩)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[3].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="金色传说(实际概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[4].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="红色史诗(实际概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[5].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="紫色稀有(实际概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[6].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="蓝色普通(实际概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[7].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="金色传说(幸运值到100的概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[8].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="红色史诗(幸运值到100的概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[9].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="紫色稀有(幸运值到100的概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[10].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="蓝色普通(幸运值到100的概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[11].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="金色传说(显示概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[12].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="红色史诗(显示概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[13].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <var><el-row>
            <el-col :span="20">
              <el-form-item label="紫色稀有(显示概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[14].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="蓝色普通(显示概率)">
                <el-input size="small" placeholder="请输入" v-model="addForm.box_probability[15].probability"></el-input>
              </el-form-item>
            </el-col>
          </el-row></var>
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="颜色图片">
                <div @click="companyList('tb')" class="myImg">
                  <el-image :src="addForm.color_img" fit="fill" style="width: 60px; height: 60px">
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
      activeName: "3",
      formInline: {
        user: "",
        region: ""
      },
      options: [],
      tableData: [],
      total: 0,
      isAdd: true,
      addForm: {
        box_name: "",
        box_price1: "",
        box_price2: "",
        box_price3: "",
        box_probability:[]
      },
      id: "",
      addDialogVisible: false
    };
  },
  created() {
    for (let i = 0; i < 16; i++) {
      this.addForm.box_probability.push({probability:''})
    }
    this.$store.commit("shangpingliebiaoPage", 1);
    this.getData();
    console.log(this.addForm)
  },
  methods: {
    async getData() {
      const res = await this.$api.getBoxList({
        limit: this.shangpingliebiaoPageSize,
        page: this.shangpingliebiaoPage
      });
      // this.total = res.data.total;
      this.tableData = res.data;
      // const res2 = await this.$api.product_type({
      //   limit: 10000,
      //   page: 1
      // });
      // this.options = res2.data.data;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.productShow({
        id: row.id,
        show: row.is_showKG == true ? "1" : "0"
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    toEditShop(row) {
      console.log(row);
      this.id = row.box_id;
      this.isAdd = false;
      this.addDialogVisible = true;
      this.addForm = { ...row };
    },
    async toDelShop(row) {
      console.log(row);
      const res = await this.$api.deleteBox({box_id:row.box_id});
      if (res.status == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        setTimeout(() => {
          this.getData();
        }, 500);
      } else {
        this.$message.error(res.msg);
      }
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    async AddOnSubmit() {
      console.log(this.addForm)
      if (this.isAdd) {
        const res = await this.$api.updateBoxPrice({
          json:JSON.stringify(this.addForm)
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        }
      } else {
        const res = await this.$api.updateBoxPrice({
          box_id: this.id,
          // box_name: this.addForm.box_name,
          // box_price1: this.addForm.box_price1,
          // box_price2: this.addForm.box_price2,
          // box_price3: this.addForm.box_price3,
          json:JSON.stringify(this.addForm)
        });
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        }
      }
    },
    toAddShop() {
      this.isAdd = true;
      for (const key in this.addForm) {
        if(key == 'box_probability'){
          this.addForm[key].forEach(ele=>{
            ele.probability = '';
          })
        }else{
          this.$set(this.addForm, key, "");
        }
      }
      this.addDialogVisible = true;
    },
    // 删除图片
    delImg(val) {
      if (val == "tb") {
        this.$set(this.addForm, "pic", "");
      } else if (this.imgStatus == "dt") {
        this.$set(this.addForm, "big_pic", "");
      }
    },
    // 上传图片
    companyList(val) {
      this.imgStatus = val;
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
          this.imgFile.append("image", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.upload_pic(this.imgFile);
          console.log(`${this.$url}${res.data.path}`);
          this.$set(this.addForm, "color_img", `${this.$url}${res.data.path}`);
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