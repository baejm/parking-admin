<template>
  <div class="pop_login">
    <div class="login_box">
      <!-- <button @click="registClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button> -->
      <form>
        <h2>로그인</h2>
        <span>아이디</span>
        <input type="text" v-model="id" />
        <span>비밀번호</span>
        <input type="password" v-model="pw" />
        <button @click.prevent="login_check({ id, pw })">로그인</button>
        <span>{{ idError }}{{ pwError }}</span>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "pop_login",
  data() {
    return {
      id: "",
      pw: "",
      // userDb: [{ id: "admin", pw: "1234", status: "ok" }],
      idError: "",
      pwError: ""
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      this.socket_process(data)
    }) //,
  },
  methods: {
    login_check(id) {
      let obj = {}
      obj.id = id.id
      obj.pw = id.pw
      obj.kind = "login_admin"
      console.log("login_info1 : ", obj)
      this.sendMessage(obj)
    },

    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    socket_process(data) {
      if (data.kind === "login_admin" && data.status === "ok") {
        console.log("1")
        console.log("login success")
        localStorage.id = data.doc.id
        localStorage.pw = data.doc.pw
        localStorage.status = "ok"
        let obj = {}
        obj.id = data.doc.id
        obj.pw = data.doc.pw
        obj.status = "ok"
        this.$store.dispatch("login", obj)
        this.$store.state.loginSuccess = false
      } else {
        this.idError = "아이디와 비밀번호를 다시 확인해주세요."
      }
    }
  }
}
</script>
