<template>
  <div class="index">
    <!-- <div class="myTable">
      <div class="r1"></div>
      <div class="r2"></div>
      <div class="r3"></div>
    <div class="r4"></div>-->
    <!-- <Card dis-hover> -->
    <div class="calendar">
      <!-- <div class="chose_sd star">
          年
          <DatePicker
            v-model="year"
            size="small"
            type="year"
            placeholder="选择年"
            class="choseYear"
            @on-change="changeYear"
            @on-blur="changeYear"
            :editable="false"
            :clearable="false"
          />
      </div>-->
      <div class="row">
        <calendar
          v-for="(mouth,index) in mouths"
          :key="index"
          :ref="mouth"
          :mouth="mouth"
          :myIndex="index"
          :isActive="index == nowIndex"
          :calendar-optiond-day="calendarOptiondDay"
          @checkedDate="checkedDate"
          @checkedAll="checkedAll"
          @selectDay="onClick"
        />
      </div>
    </div>
    <!-- </Card> -->
  </div>
  <!-- </div> -->
</template>

<script>
import { mapState } from "vuex";
import Calendar from "./calendar";
import moment from "moment";
export default {
  data() {
    return {
      year: moment().format("YYYY"),
      choseWorkDay: "",
      choseCheckAll: false,
      mouths: [],
      checkedDates: [], // 最终选中的全部日期
      calendarOptiondDay: [], //选中日期数组
      allCheckDay: [],
      allSelectedDay: [],
      dayObj: {
        date: "",
        day: 6,
        isToday: false,
        row: 0,
        select: true,
        week: 6
      },
      nowIndex: -1
    };
  },
  computed: {
    ...mapState(["changeYearSy"])
  },
  watch: {
    changeYearSy: function() {
      this.changeYear(this.changeYearSy);
      this.allCheckDay = []
      this.checkedDates = []
      this.nowIndex = -1
    }
  },
  components: { Calendar },
  mounted() {
    this.$nextTick(() => {
      this.changeYear(this.year);
    });
  },
  methods: {
    checkedAll(checkDayObj) {
      this.mouths.forEach(moth => {
        if (moth === checkDayObj.mouth) {
          if (checkDayObj.checkedAll === false) {
            this.choseCheckAll = false;
          }
        }
      });
    },
    formatDate(time) {
      var date = new Date(time);
      var time1 = moment(date).format("YYYY");
      return time1; //年月日 格式自己定义 'yyyy : MM : dd' 例 2018年12月5日的格式
    },
    changeYear(val) {
      this.year = moment(val + "").format("YYYY");
      this.choseWorkDay = "";
      this.choseCheckAll = false;
      this.mouths = [];
      for (let i = 1; i <= 12; i++) {
        if (i < 10) {
          this.mouths.push(this.year + "-" + "0" + i);
        } else {
          this.mouths.push(this.year + "-" + i);
        }
      }
    },
    onClick(arr) {
      // console.log(arr)
      this.nowIndex = arr[1];
      var beforeDay = null;
      console.log(this.checkedDates);
      if (this.checkedDates.length > 0) {
        // if(this.checkedDates[0].date.substring(0,4) != arr[0].date.substring(0,4)){
        //   this.checkedDates = []
        // }else{
        beforeDay = this.checkedDates[0];
        beforeDay.select = false;
        // }
      }
      arr[0].select = true;
    },
    check(work, noWork) {
      // 选择工作日、非工作日、全选、全不选后，先清空选中项，再添加选中数据
      this.checkedDates = [];
      this.mouths.forEach(mouth => {
        this.$refs[mouth][0].checkWork(true, work);
        this.$refs[mouth][0].checkWork(false, noWork);
      });
    },
    // 获取--最终--全部选中的数据
    checkedDate(checkDayObj) {
      if (this.allCheckDay && this.allCheckDay.length > 0) {
        const mouthObj = this.allCheckDay.findIndex(
          mouthDay => mouthDay.mouth === checkDayObj.mouth
        );
        if (mouthObj !== -1) {
          this.allCheckDay[mouthObj].checkedDay = checkDayObj.checkedDay;
        } else this.allCheckDay.push(checkDayObj);
      } else this.allCheckDay.push(checkDayObj);
      this.checkedDates = [];
      this.allCheckDay.forEach(mouth => {
        this.checkedDates = [...this.checkedDates, ...mouth.checkedDay];
      });
      /**
       * 日期列表转化字符串
       * cDatelist为最终list，按需要转化
       * 例：["2019-01-01", "2019-01-02", "2019-01-03", "2019-01-04", "2019-01-05"]
       */
      const checkedDates = [...this.checkedDates];
      const cDatelist = [];
      checkedDates.forEach(val => {
        cDatelist.push(val.date);
      });
    },
    changeWorkDay(value) {
      this.choseCheckAll = false;
      if (value) {
        if (value === "工作日") {
          this.check(true, false);
        } else if (value === "非工作日") {
          this.check(false, true);
        }
      }
    },
    changeCheckAll(value) {
      this.choseWorkDay = "";
      if (value) {
        this.check(true, true);
      } else {
        this.check(false, false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  background: #10183c;
  .chose_sd {
    margin: 5px 5%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .choseYear {
      width: 80px;
      margin-top: -2px;

      /deep/ .ivu-input {
        height: 25px;
        margin-left: 3px;
      }
    }
    .chose_detail {
      margin-right: 5px;
      margin-left: 20px;
    }
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: flex-start;
    margin: 5px 20px 20px 20px;
  }
}

.index {
}
.myTable {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 750px;
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