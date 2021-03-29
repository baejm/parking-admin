<template>
  <div class="report_wrap">
    <div class="title">
      <h2>{{ titles }}</h2>
    </div>
    <div class="form_window discount_pol">
      <ul class="policy_contents_wrap">
        <li>
          <h4>방문횟수 제한 :</h4>
          <div class="contents">
            <select v-model="limit_visited_count">
              <option
                v-for="(limit_visited_count, index) in limit_visited_count_list"
                v-bind:key="index"
              >
                {{ limit_visited_count.text }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <h4>무료주차시간 (분) :</h4>
          <div class="contents">
            <input type="text" v-model="free_parking_time" />
          </div>
        </li>
        <li>
          <h4>입주사 동일 무료주차시간 적용 :</h4>
          <div class="contents">
            <select v-model="resident_fee_app_equal">
              <option v-for="(app, index) in app_list" v-bind:key="index">
                {{ app.text }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <h4>입주사 부담요금 비율 (%)</h4>
          <div class="contents">
            <input type="text" v-model="resident_fee_ratio" />
          </div>
        </li>
        <li>
          <h4>할인버튼 :</h4>
          <div class="contents">
            <ul>
              <li
                v-for="(resident_discoun_button,
                index) in resident_discoun_button_list"
                :key="index"
              >
                <label>
                  <input
                    type="checkbox"
                    v-model="resident_discoun_button.value"
                  />
                  <span class="groupName">{{
                    resident_discoun_button.text
                  }}</span>
                </label>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <h4>메모 :</h4>
          <div class="contents memo">
            <input type="text" v-model="contents" />
          </div>
        </li>
        <div class="btns">
          <button @click.prevent="modifyVehicle" class="modifybtn">적용</button>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
//import config from "../../config.js"
import { mapState } from "vuex"
export default {
  data() {
    return {
      resistIs: false,
      //  modifyIs: true,
      limit_visited_count: "1",
      free_parking_time: "60",
      resident_fee_app_equal: "Y",
      resident_fee_ratio: "100",
      contents: "",
      time: "",
      update_time: "",
      resident_discoun_button_list: [
        { value: true, text: "무료" },
        { value: true, text: "유료 30분" },
        { value: true, text: "유료 60분" },
        { value: true, text: "유료 90분" },
        { value: true, text: "유료 120분" },
        { value: true, text: "유료 150분" },
        { value: true, text: "유료 180분" },
        { value: true, text: "유료 210분" },
        { value: true, text: "유료 240분" },
        { value: true, text: "유료 300분" },
        { value: true, text: "유료 전액" }
      ],
      app_list: [{ text: "Y" }, { text: "N" }],
      limit_visited_count_list: [
        { text: "1" },
        { text: "2" },
        { text: "3" },
        { text: "4" },
        { text: "5" }
      ]
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "discountPolVisitedVeh") this.titles = add.title
        })
      })
    },
    registOpen() {
      this.resistIs = true
    },
    registClose() {
      this.resistIs = false
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      let obj = {}
      obj.kind = "create_resident_policy_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    resident_fun(data) {
      if (data.message === "none") {
        let obj = {}
        obj.resident_discoun_button_list = []
        obj.limit_visited_count = this.limit_visited_count
        obj.free_parking_time = this.free_parking_time
        obj.resident_fee_app_equal = this.resident_fee_app_equal
        obj.resident_fee_ratio = this.resident_fee_ratio
        obj.resident_discoun_button_list = this.resident_discoun_button_list
        obj.contents = this.limit_visited_count
        obj.time = Date.now()
        obj.update = this.update_time
        obj.kind = "create_resident_policy_list"
        this.sendMessage(obj)
      } else {
        let obj1 = data.docs[0]
        this.limit_visited_count = obj1.limit_visited_count
        this.free_parking_time = obj1.free_parking_time
        this.resident_fee_app_equal = obj1.resident_fee_app_equal
        this.resident_fee_ratio = obj1.resident_fee_ratio
        this.resident_discoun_button_list = obj1.resident_discoun_button_list
        this.contents = obj1.contents
        this.time = obj1.time
        this.update_time = obj1.update_time
      }
    },
    modifyVehicle() {
      //  alert('적용 되었습니다.')
      let obj = {}
      obj.limit_visited_count = this.limit_visited_count
      obj.free_parking_time = this.free_parking_time
      obj.resident_fee_app_equal = this.resident_fee_app_equal
      obj.resident_fee_ratio = this.resident_fee_ratio
      obj.resident_discoun_button_list = this.resident_discoun_button_list
      obj.contents = this.contents
      obj.time = this.time
      obj.update_time = Date.now()
      obj.id = window.localStorage.getItem("id")
      obj.kind = "update_resident_policy_list"
      this.sendMessage(obj)
    },
    search() {
      var obj = {}
      obj.kind = "get_resident_policy_list"
      obj.id = window.localStorage.getItem("id")
      obj.pw = window.localStorage.getItem("pw")
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    start() {
      this.search()
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_resident_policy_list") {
        this.resident_fun(data)
      } else if (
        data.kind === "update__resident_policy_list" ||
        data.kind === "create__resident_policy_list"
      ) {
        this.search()
      }
    }),
      this.start()
    this.changeTitle()
  }
}
</script>
<style></style>
