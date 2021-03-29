<template>
  <div class="setup_pop">
    <div class="modify_pop popup">
      <div>
        <h3>비밀번호 설정</h3>
        <div v-if="pwChange" class="pwChange">
          <div>
            <p>
              비밀번호가 변경 되었습니다. <br />
              변경된 비밀번호로 로그인을 다시 해주세요.
            </p>
            <button @click="isPwChange()">확인</button>
          </div>
        </div>
        <div class="form_window">
          <form>
            <div>
              <p>
                <span>현재 비밀번호</span>
                <input type="password" v-model="current_pw" />
                <!-- {{ userGetDb.password }} -->
              </p>

              <p>
                <span>새 비밀번호</span
                ><input type="password" v-model="newPw" />
              </p>
              <p>
                <span>비밀번호 확인</span
                ><input type="password" v-model="pwdReconfirm" />
              </p>
              <button @click.prevent="modifiSend" class="modifybtn">
                수정
              </button>
              <button @click.prevent="popupClose" class="cancle">취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
  computed: {
    ...mapState(["pwInfo", "userDb", "userGetDb"])
  },
  created() {
    ;(this.customerPwd = this.userGetDb.pw),
      this.$socket.on("message_from_server", data => {
        console.log("data.kind : ", data.kind)
        this.change_pw(data)
      })
  },
  data() {
    return {
      current_pw: "",
      customerPwd: "",
      newPw: "",
      pwdReconfirm: "",
      pwChange: false
    }
  },
  methods: {
    ...mapActions(["popupClose", "logout"]),
    modifiSend() {
      if (this.current_pw === this.userGetDb.pw) {
        if (this.newPw !== this.pwdReconfirm) {
          alert("새 비밀번호를 확인해 주세요.")
        } else {
          //this.pwChange = true
          // this.popupClose()
          const obj = {}
          obj.kind = "change_pw"
          obj.pw = this.customerPwd
          obj.changepwd = this.newPw
          obj.id = this.userGetDb.id
          this.$socket.emit("message_from_web_client", obj)
        }
      } else {
        alert("현재 비밀번호가 틀립니다. ")
      }
    },
    isPwChange() {
      this.popupClose()
      this.logout()
    },
    change_pw(data) {
      if (data.kind === "change_pw" && data.status === "ok") {
        this.pwChange = true
      }
    }
  }
}
</script>

<style scoped>
.setup_pop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 300;
}
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 10000;
  transform: translate(-50%, -50%);
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-transform: translateZ(0) scale(1, 1);
}
.popup > div {
  background: #333333;
  padding: 10px 10px;
  width: 25%;
  margin: 14% auto;
  border-radius: 5px;
}
.popup h3 {
  color: #fff;
  float: left;
  line-height: 20px;
  font-weight: 500;
}
.popup button .svg-inline--fa {
  margin: 0;
}
.popup div .form_window {
  text-align: left;
  background: #fff;
  font-size: 15px;
  padding: 5px 25px 10px;
  margin-top: 30px;
}
.popup div span {
  width: 40%;
  display: block;
  margin: 5px 0;
}
.popup .form_window div p {
  font-size: 15px;
  color: #323232;
  line-height: 26px;
  margin: 15px 0;
}
.popup .form_window div p:nth-child(2),
.popup .form_window div p:nth-child(3) {
  color: #6a6cff;
}
.popup div input {
  width: 100%;
  border: 1px solid #afafaf;
  font-weight: 400;
  font-size: 16px;
  border-radius: 5px;
  padding: 5px 0;
  background: #f8f8f8;
}
input[type="password"] {
  font-family: "gulim", "돋움";
}
.popup div input::placeholder {
  font-weight: 300;
}
.popup .form_window button {
  color: #fff;
  font-size: 18px;
  background: #29a95c;
  margin: 15px 0 5px;
  padding: 5px 0;
  line-height: normal;
  width: 49%;
  display: inline-block;
  margin-right: 1%;
}
.modify_pop button.modifybtn {
  background: #ffb300;
}
.modify_pop button.cancle {
  background: #e53935;
  margin-right: 0;
  margin-left: 1%;
}
.pwChange {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.pwChange div {
  background: #fff;
  width: 30%;
  margin: 25% auto;
  text-align: center;
  transform: translateY(-50%);
  padding: 20px 0;
}
.pwChange div {
  line-height: 40px;
  border-radius: 8px;
}
.pwChange div button {
  background: #29a95c;
  color: #fff;
  padding: 0 20px;
  border-radius: 5px;
  margin-top: 10px;
}
@media screen and (max-width: 767px) {
  .popup > div {
    width: 100%;
  }
}
</style>
