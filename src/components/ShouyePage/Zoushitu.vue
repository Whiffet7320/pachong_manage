<template>
  <div class="index">
    <div class="myTable">
      <div class="r1"></div>
      <div class="r2"></div>
      <div class="r3"></div>
      <div class="r4"></div>
      <div style="height: 540px; width: 92%" id="zoushi"></div>
    </div>
    <div class="btn">
      <div class="r1"></div>
      <div class="r2"></div>
      <div @click="dialogVisible1 = true" class="txx">导出</div>
    </div>
    <!-- 导出 -->
    <el-dialog
      :visible.sync="dialogVisible1"
      custom-class="myDaochuDia"
      width="586px"
      :before-close="handleClose1"
    >
      <div class="dia1">
        <div class="txt1">是否确认导出相关内容？</div>
        <div class="btns">
          <div @click="dialogVisible1 = false" class="btn1">取消</div>
          <div @click="daochu" class="btn2">确定</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["zstTime"]),
  },
  watch: {
    zstTime: function () {
      this.getZstData();
    },
  },
  data() {
    return {
      tableData1: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
          lj: "http://baidu.com",
        },
      ],
      list: [],
      option2: null,
      dialogVisible1: false,
      myZoushi:null,
    };
  },
  mounted() {
    this.myZoushi = echarts.init(document.getElementById("zoushi"));
    this.option2 = {
      title: {
        text: "· 走势图",
        textStyle: {
          color: "#04FFE0",
          fontSize: "30px",
          letterSpacing: "3px",
        },
      },
      legend: {
        data: ["频率"],
        x: "90%",
        textStyle: {
          fontSize: 18,
          color: "#ffffff",
          fontWeight: 700,
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "14%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: [],
        axisLine: {
          lineStyle: {
            // 设置x轴颜色
            color: "#1794E4",
          },
        },
        axisLabel: {
          textStyle: {
            fontSize: 16,
            color: "#fff",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            // 设置y轴颜色
            color: "#0C9DDB",
          },
        },
        axisLabel: {
          textStyle: {
            fontSize: 16,
            color: "#0c9ddb",
            fontWeight: 700,
          },
        },
      },
      series: [
        {
          // data: [150, 230, 224, 218, 135, 147, 260],
          data: [],
          name: "频率",
          type: "line",
          stack: "Total",
          symbolSize: 8,
          itemStyle: {
            normal: {
              label: {
                show: true,
              },
              borderColor: "#ffaea3", // 拐点边框颜色
              symbol: "circle",
              lineStyle: {
                width: 3, // 设置线宽
                color: "#ffaea3",
              },
            },
          },
        },
      ],
    };
    this.myZoushi.setOption(this.option2);
  },
  created() {
    this.getZstData();
  },
  methods: {
    async getZstData() {
      const res = await this.$api.hotwords_logs({
        year: this.zstTime[0],
        month: this.zstTime[1],
        day: this.zstTime[2],
      });
      console.log(res.list);
      this.list = res.list;
      var xAxis = [];
      var series = [];
      // if(res)
      res.list.forEach((ele) => {
        xAxis.push(ele.title);
        series.push(ele.num);
      });
      if (this.option2) {
        this.$set(this.option2.xAxis, "data", xAxis);
        this.$set(this.option2.series[0], "data", series);
        setTimeout(() => {
          this.myZoushi.setOption(this.option2);
        }, 500);
      }
    },
    async daochu(){
      const res = await this.$api.exporthotwords_list({
        year: this.zstTime[0],
        month: this.zstTime[1],
        day: this.zstTime[2],
      })
      this.$message(res.msg)
      if(res.result == 1){
        window.open(res.down_url)
        this.dialogVisible1 = false;
      }
    },
    handleClose1() {
      this.dialogVisible1 = false;
    },
    cellClassName({ column }) {
      if (column.property == "lj") {
        return "active";
      } else {
        return "col-active";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
}
.myTable {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 660px;
  background: #121531;
  border: 2px solid #1794e4;
  box-shadow: 0px 0px 30px 0px rgba(23, 148, 228, 0.86) inset;
  position: relative;
  .r1 {
    position: absolute;
    width: 30px;
    height: 30px;
    border-top: 2px solid #04f9db;
    border-left: 2px solid #04f9db;
    top: -2px;
    left: -2px;
  }
  .r2 {
    position: absolute;
    width: 30px;
    height: 30px;
    border-top: 2px solid #04f9db;
    border-right: 2px solid #04f9db;
    top: -2px;
    right: -2px;
  }
  .r3 {
    position: absolute;
    width: 30px;
    height: 30px;
    border-bottom: 2px solid #04f9db;
    border-left: 2px solid #04f9db;
    bottom: -2px;
    left: -2px;
  }
  .r4 {
    position: absolute;
    width: 30px;
    height: 30px;
    border-bottom: 2px solid #04f9db;
    border-right: 2px solid #04f9db;
    bottom: -2px;
    right: -2px;
  }
}
.btn {
  margin-top: 30px;
  width: 223px;
  height: 54px;
  border: 1px solid #1794e4;
  box-shadow: 0px 0px 20px 0px #1794e4 inset;
  position: relative;
  .r1 {
    position: absolute;
    width: 16px;
    height: 16px;
    border-top: 2px solid #04f9db;
    border-right: 2px solid #04f9db;
    top: -2px;
    right: -2px;
  }
  .r2 {
    position: absolute;
    width: 16px;
    height: 16px;
    border-bottom: 2px solid #04f9db;
    border-left: 2px solid #04f9db;
    bottom: -2px;
    left: -2px;
  }
  .txx {
    cursor: pointer;
    font-size: 18px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: center;
    line-height: 54px;
    color: #ffffff;
    letter-spacing: 1.8px;
  }
}
.dia1 {
  .txt1 {
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: center;
    color: #0e0d0b;
    letter-spacing: 2.4px;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    .btn1 {
      cursor: pointer;
      width: 218px;
      height: 62px;
      border: 2px solid #388bf4;
      border-radius: 30px;
      font-size: 28px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      text-align: center;
      color: #388bf4;
      letter-spacing: 2.8px;
      line-height: 62px;
    }
    .btn2 {
      cursor: pointer;
      width: 218px;
      height: 62px;
      background: #388bf4;
      border-radius: 30px;
      width: 218px;
      height: 62px;
      background: #388bf4;
      border-radius: 30px;
      text-align: center;
      line-height: 62px;
      font-size: 28px;
      color: #fff;
      margin-left: 54px;
    }
  }
}
/deep/ .vxe-table {
  //  box-shadow: 0px 0px 30px 0px rgba(23, 148, 228, 0.86) inset;
  //
  width: calc(100% - 70px);
  margin: 0 34px;
}
/deep/ .vxe-header--column {
  background: #121531;
  color: #ffffff;
}
// /deep/ .vxe-header--column.col_10 {
//   background: #121531;
//   color: #04F9DB;
// }
/deep/ .vxe-body--column.col-active {
  background: #121531;
  color: #ffffff;
}
/deep/ .vxe-body--column.active {
  background: #121531;
  color: #04f9db;
}
/deep/ .body--wrapper {
  background-color: #121531 !important;
}
/deep/ .vxe-table--header {
  border-bottom: 2px solid rgba(23, 148, 228, 0.57);
}
</style>