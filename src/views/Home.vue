<template>
  <div id="wrap">
    <popLogin v-if="loginSuccess" />
    <mainMenu />
    <leftMenu />
    <router-view class="contents_wrap"></router-view>
  </div>
</template>

<script>
import popLogin from "../components/popLogin"
import mainMenu from "../components/mainMenu"
import leftMenu from "../components/leftMenu"
import { mapState } from "vuex"
// import { mapState } from "vuex"
// import config from "../config.js"
export default {
  components: {
    mainMenu,
    leftMenu,
    popLogin
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyPress)
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(["loginSuccess"])
  },
  created() {
    // this.loginCheck()
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keydown", this.handleKeyPress)
    }
  },
  methods: {
    timeCheck: function() {
      this.intervalid1 = setInterval(() => {
        this.nowDate = this.getDateAndTime(new Date())
        // console.log(this.changes)
      }, 1000)
    },
    getDateAndTime(date1) {
      let hour = date1.getHours()
      let minutes = date1.getMinutes()
      let seconds = date1.getSeconds()
      // let amPm = "AM"
      let fullDate = `${date1.getFullYear()}/${date1.getMonth() +
        1}/${date1.getDate()}`
      if (hour < 10) hour = "0" + hour
      if (minutes < 10) minutes = "0" + minutes
      if (seconds < 10) seconds = "0" + seconds
      // if (date1 < 12) {
      //   amPm = "PM"
      // }
      return `${fullDate} ${hour}:${minutes}:${seconds} `
    },
    logOut() {
      this.$store.state.loginSuccess = true
    }
  }
}
</script>
<style>
@import "../assets/css/layout.css";
@import "../assets/css/default.css";
@import "../assets/css/main.css";
</style>
