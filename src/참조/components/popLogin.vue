<template>
  <div class="pop_login">
    <div class="login_box">
      <form>
        <h2>로그인</h2>
        <span>아이디</span>
        <input type="text" v-model="id" />
        <span>비밀번호</span>
        <input type="password" v-model="pw" />
        <button @click="login()">로그인</button>
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
      userDb: [{ id: "admin", pw: "1234", status: "ok" }]
    }
  },
  methods: {
    login() {
      let selectedUser = ""
      this.userDb.forEach(user => {
        if (user.id === this.id) selectedUser = user
      })
      if (selectedUser === "") {
        this.idError = "아이디가 틀렸습니다."
        this.pwError = ""
      } else {
        if (selectedUser.pw !== this.pw) {
          this.idError = ""
          this.pwError = "비밀번호가 틀렸습니다."
        } else {
          this.$store.state.loginSuccess = false
        }
      }
    }
  }
}
</script>
