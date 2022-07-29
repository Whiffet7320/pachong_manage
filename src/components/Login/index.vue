<template>
  <div id="login">
    <div class="container">
      <vue-particles
        color="#fff"
        :particleOpacity="0.5"
        :particlesNumber="50"
        shapeType="circle"
        :particleSize="4"
        linesColor="#137084"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      ></vue-particles>
      <img class="bacImage" src="../../assets/newIImg/zu1029.png" alt="" />
      <!-- <img class="leftImg" src="../../assets/image/hb.png" alt="" /> -->
      <div class="syTop">
        <img src="../../assets/newIImg/LoginTop.png" class="syTopImg" alt />
        <div class="sy-txt">今日教育</div>
      </div>
      <!-- <div class="loginBox">
        <div class="tit1">后台管理系统</div>
        <div class="tit2">欢迎你回来~</div>
        <div class="loginBox2">
          <el-form
            :model="loginForm"
            ref="loginForm"
            status-icon
            label-width="100px"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <div class="userInp">账号</div>
              <el-input
                type="text"
                v-model="loginForm.username"
                auto-complete="off"
                placeholder="请输入账号"
                class="el-inp"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <div class="pasInp">密码</div>
              <el-input
                type="password"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="请输入密码"
                class="el-inp"
                @keyup.enter.native="onLogin"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass" v-if="!this.isRegister">
              <i class="el-icon-unlock"></i>
              <el-input
                type="password"
                v-model="loginForm.checkPass"
                auto-complete="off"
                placeholder="请确认密码"
                class="el-inp"
                @keyup.enter.native="onLogin"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="footer">
                <div class="wjmm">忘记密码</div>
                <div class="zczh">注册账号</div>
              </div>
            </el-form-item>
          </el-form>
          <el-button
            @click="onLogin"
            class="loginBtn"
            type="danger"
            circle
            icon="el-icon-arrow-right"
          ></el-button>
        </div>
      </div>-->
      <div class="loginBox2">
        <div class="l-txt1">登录</div>
        <el-input placeholder="请输入账号" v-model="loginForm.username">
          <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
        </el-input>
        <el-input
          type="password"
          style="margin-top: 20px"
          @keyup.enter.native="onLogin"
          placeholder="请输入密码"
          v-model="loginForm.password"
        >
          <i slot="prefix" class="el-input__icon el-icon-connection"></i>
        </el-input>
        <el-button
          @click="onLogin"
          style="width: 100%; margin-top: 30px"
          type="primary"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      smdl: true,
      loginForm: {
        username: "",
        checkPass: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      isRegister: true,
    };
  },
  methods: {
    // 登录
    async onLogin() {
      const res = await this.$api.login(
        this.loginForm.username,
        this.loginForm.password
      );
      console.log(res);
      if (res.result == 1) {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("user_level", res.user_level);
        sessionStorage.setItem("menu_wzedu", res.menu_wzedu);
        // sessionStorage.setItem("userInfo", JSON.stringify(res.data.info));
        this.$message({
          message: res.msg,
          type: "success",
        });
        sessionStorage.setItem("menu", JSON.stringify(res.menu_list));
        this.$router.push({ name: "Shouye" });
        // if (res.user_level == 1 || res.user_level == 3) {
        //   this.$router.push({ name: "Shouye" });
        // } else {
        //   this.$router.push({ path: "Shouye_u" });
        // }
        setTimeout(() => {
          location.reload();
          // this.$router.go(0);
        }, 500);
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100vh;
  background-color: #000000;
  overflow: hidden;
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    .syTop {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      width: 1557px;
      height: 160px;
      .syTopImg {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .sy-txt {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 50px;
        font-size: 36px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #f0f7ff;
      }
    }
    .bacImage {
      top: 0;
      left: 0;
      position: absolute;
      width: 100vw;
      height: 100vh;
      opacity: 0.8;
    }
    .leftImg {
      position: absolute;
      top: 27%;
      left: 13%;
      width: 37%;
      height: 46%;
    }
    .loginBox {
      position: absolute;
      top: 0;
      right: 13%;
      // border: 1px solid red;
      width: 31%;
      height: 100%;
      .tit1 {
        position: absolute;
        top: 16%;
        width: 100%;
        opacity: 1;
        font-size: 55px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        text-align: center;
        color: #ebbfcc;
      }
      .tit2 {
        position: absolute;
        width: 100%;
        top: 24%;
        opacity: 1;
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Medium; //aaa
        font-weight: 500; //aa
        text-align: center;
        color: #c2c2c2;
      }
      .loginBox2 {
        position: fixed;
        z-index: 99999;
        width: 100%;
        height: 35%;
        top: 31%;
        height: 373px;
        opacity: 1;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
        .demo-ruleForm {
          margin-top: 13%;
          /deep/ .el-form-item__content {
            margin-left: 13% !important;
          }
          /deep/ .el-input {
            width: 80%;
          }
          .userInp {
            opacity: 1;
            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            color: #ebbfcc;
          }
          .pasInp {
            opacity: 1;
            font-size: 20px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            color: #c2c2c2;
          }
          .footer {
            width: 80%;
            display: flex;
            justify-content: space-between;
          }
          .wjmm {
            opacity: 1;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            text-align: center;
            color: #ebbfcc;
          }
          .zczh {
            opacity: 1;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium; //aaa
            font-weight: 500; //aa
            text-align: center;
            color: #808080;
          }
        }
        .loginBtn {
          position: absolute;
          top: 108%;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .loginBox2 {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
      width: 493px;
      height: 293px;
      background: #3e5370;
      border-radius: 6px;
      padding: 20px 45px;
      box-sizing: border-box;
      .l-txt1 {
        font-size: 24px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #f0f7ff;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
