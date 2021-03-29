<template>
  <div
    class="leftMenu"
    :class="{ activation }"
    @mouseleave="$store.state.activation = false"
  >
    <h1 class="logo">
      <a href="/operatingFunc/vehicleEntryExitLive">
        <img src="../assets/EZ_PARKIGN_logo.png" alt="로고" />
      </a>
    </h1>
    <ul v-if="paidMenuType">
      <li
        v-for="(m, index) in mainTitle"
        :key="index"
        @mouseover="$store.state.activation = true"
        :class="{ on: $store.state.active === index }"
      >
        <a href="javascript:void(0)" @click="$store.state.active = index">{{
          m.menu
        }}</a>
        <ul class="nav_sub_depth" v-show="$store.state.active === index">
          <li v-for="(ms, index) in m.subMenu" :key="index">
            <router-link
              :to="{ name: ms.add, params: ms.add }"
              active-class="active"
              ><span>{{ ms.title }}</span></router-link
            >
          </li>
        </ul>
      </li>
    </ul>
    <ul v-else>
      <li
        v-for="(m, index) in freeMainTitles"
        :key="index"
        @mouseover="$store.state.activation = true"
        :class="{ on: $store.state.active === index }"
      >
        <a href="javascript:void(0)" @click="$store.state.active = index">{{
          m.menu
        }}</a>
        <ul class="nav_sub_depth" v-show="$store.state.active === index">
          <li v-for="(ms, index) in m.subMenu" :key="index">
            <router-link
              :to="{ name: ms.add, params: ms.add }"
              active-class="active"
              ><span>{{ ms.title }}</span></router-link
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex"
import config from "../config.js"
export default {
  name: "left_menu",
  data() {
    return {
      // activation:false,
      //   active:true,
      verInfo: "",
      timestamp: "현재시간",
      paidMenuType: ""
    }
  },
  computed: {
    ...mapState(["activation", "active", "mainTitle", "freeMainTitles"])
  },
  created() {
    setInterval(() => {
      this.getNow()
    }, 1000)
    this.menuTitle()
  },
  methods: {
    getNow() {
      const today = new Date()
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate()
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      const dateTime = date + " " + time
      this.timestamp = dateTime
    },
    menuTitle() {
      if (config.parkingLot.type === "paid") {
        this.paidMenuType = true
      } else {
        this.paidMenuType = false
      }
    }
  }
}
</script>

<style></style>
