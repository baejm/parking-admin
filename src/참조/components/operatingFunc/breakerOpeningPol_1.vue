<template>
  <div class="report_wrap breaker_policy">
    <div class="title">
      <h2>{{ mainTitle[1].subMenu[2].title }}</h2>
    </div>
    <div class="content_wrap">
      <!-- 등록내용 -->
      <div
        class="resist_pop popup"
        v-show="resistIs"
        :class="{ column_1: Object.keys(this.reg).length < 12 }"
      >
        <div>
          <h3>요일별 차단 개방 정책</h3>
          <button @click="registClose" class="pop_close">
            <font-awesome-icon icon="window-close" />
          </button>
          <div class="form_window">
            <form>
              <dl>
                <dt>요일</dt>
                <dd>
                  <label
                    ><input
                      type="checkbox"
                      value="월"
                      v-model="checkedNames"
                    /><span>월</span></label
                  >
                  <label
                    ><input
                      type="checkbox"
                      value="화"
                      v-model="checkedNames"
                    /><span>화</span></label
                  >
                  <label
                    ><input
                      type="checkbox"
                      value="수"
                      v-model="checkedNames"
                    /><span>수</span></label
                  >
                  <label
                    ><input
                      type="checkbox"
                      value="목"
                      v-model="checkedNames"
                    /><span>목</span></label
                  >
                  <label
                    ><input
                      type="checkbox"
                      value="금"
                      v-model="checkedNames"
                    /><span>금</span></label
                  >
                  <label
                    ><input
                      type="checkbox"
                      value="토"
                      v-model="checkedNames"
                    /><span>토</span></label
                  >
                  <label
                    ><input
                      type="checkbox"
                      value="일"
                      v-model="checkedNames"
                    /><span>일</span></label
                  >
                </dd>
              </dl>
              <dl>
                <dt>시간</dt>
                <dd>
                  <input
                    type="text"
                    id="set_time_hour"
                    v-model="set_hour"
                    maxlength="2"
                    placeholder="00"
                    required
                  />
                  <span>시</span>
                  <input
                    type="text"
                    id="set_time_minutes"
                    v-model="set_min"
                    maxlength="2"
                    placeholder="00"
                    required
                  />
                  <span>분</span>
                </dd>
              </dl>
              <dl>
                <dt>개방 및 해제</dt>
                <dd>
                  <select v-model="barrier_policy">
                    <option>개방</option>
                    <option>해제</option>
                  </select>
                </dd>
              </dl>
              <dl>
                <dt>장소</dt>
                <dd>
                  <select v-model="location">
                    <option
                      v-for="(location1, index) in locations"
                      v-bind:key="index"
                    >
                      {{ location1.text }}
                    </option>
                  </select>
                </dd>
              </dl>
              <dl>
                <dt>방향</dt>
                <dd>
                  <select v-model="direction">
                    <option
                      v-for="(direction1, index) in directions"
                      v-bind:key="index"
                    >
                      {{ direction1.text }}
                    </option>
                  </select>
                </dd>
              </dl>
              <div class="btns">
                <button @click.prevent="registNew" class="writebtn">
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="list-items">
        <div class="writeRecord">
          <button @click.prevent="registOpen" class="register_btn">
            <font-awesome-icon icon="file-signature" />등록
          </button>
        </div>
        <div class="list-title">
          <li><span>번호 </span></li>
          <li>
            <span
              >요일<button @click.prevent="item_weekly_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item._weekly_click"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >설정시각<button @click.prevent="item_set_up_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.set_up_click"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>

          <li>
            <span
              >장소<button @click.prevent="item_location_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.location_click"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >방향<button @click.prevent="item_direction_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.direction_click"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >정책내용<button @click.prevent="item_barrier_policy_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.barrier_policy_click"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span>적용여부</span>
          </li>
          <li></li>
        </div>
        <!-- 리스트 출력부분 -->
        <!-- <spinners v-if="isLoading" /> -->
        <ul class="list-wrap">
          <li v-for="(res, index) in weekly_barrier_policy_list" :key="index">
            <span> {{ index + 1 }}</span>
            <span class="week"
              ><input type="text" v-model="res.weekly1" readonly
            /></span>
            <span class="time"
              ><input type="text" v-model="res.set_up_time" readonly
            /></span>
            <span class="location"
              ><input type="text" v-model="res.location" readonly
            /></span>
            <span class="direction"
              ><input type="text" v-model="res.direction" readonly
            /></span>
            <span class="barrierPolicy"
              ><input type="text" v-model="res.barrier_policy" readonly
            /></span>
            <span class="checked"
              ><label
                ><input
                  type="checkbox"
                  value=""
                  @change="weekly_policy_checked(res)"
                  v-model="res.checked"/></label
            ></span>
            <button
              class="delete"
              @click.prevent="delete_barrier_policy_click(res)"
            >
              삭제
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import _ from "underscore"
import XLSX from "xlsx"
import config from "../../config.js"
// import spinners from "../components/spinners"
export default {
  data: function() {
    return {
      checkedNames: [],
      set_min: "",
      set_hour: "",
      userInfo: "",
      isLoading: false,
      location: "",
      direction: "",
      barrier_policy: "개방",
      locations: [],
      directions: [],
      weekly_barrier_policy_list: [],
      resistRocord: [],
      admin: [
        {
          set_min: "",
          set_hour: "",
          userInfo: "",
          isLoading: false,
          location: "",
          direction: "",
          checked: false
        }
      ],
      current: {
        set_min: "",
        set_hour: "",
        userInfo: "",
        isLoading: false,
        location: "",
        direction: "",
        checked: false
      },
      sort_item: {
        weekly_click: false,
        set_time_click: false,
        location_click: false,
        direction_click: false,
        barrier_policy_click: false,
        checked_click: false
      },
      reg: {
        set_min: "",
        set_hour: "",
        userInfo: "",
        isLoading: false,
        systemPolicy_location: ["여기", "거기"],
        systemPolicy_direction: ["이쪽", "저쪽"],
        location: "",
        direction: "",
        checked: true
      },
      check: true,
      resistIs: false,
      modifyIs: false
    }
  },
  filters: {
    currency: function(value) {
      var num = new Number(value)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  created() {
    // this.isLoading = true
    this.$socket.on("message_from_server", data => {
      //   console.log("data.kind : ", data.kind)
      // this.isLoading = false
      if (data.kind === "get_weekly_barrier_policy_list") {
        this.get_weekly_barrier_policy_list(data)
      } else if (
        data.kind === "create_weekly_barrier_policy_list" ||
        data.kind === "update_weekly_barrier_policy_list" ||
        data.kind === "delete_weekly_barrier_policy_list"
      ) {
        this.search1()
      }
    }),
      this.loc_dir()
    this.search1()
  },
  components: {
    // spinners
  },
  methods: {
    registOpen() {
      console.log("태스", this.weekly_barrier_policy_list)
      this.admin.weekly = []
      this.admin.set_hour = ""
      this.admin.set_min = ""
      this.admin.location = ""
      this.admin.direction = ""
      this.admin.barrier_policy = ""
      this.resistIs = true
    },
    delete_barrier_policy_click(c) {
      console.log("delete_barrier_policy_click : ", c)
      var delete_barrier_policy = {}
      delete_barrier_policy.kind = "delete_weekly_barrier_policy_list"
      delete_barrier_policy.location = c.location
      delete_barrier_policy.direction = c.direction
      delete_barrier_policy.time = c.time
      this.sendMessage(delete_barrier_policy)
    },
    weekly_policy_checked(res) {
      console.log("weekly_policy_checked : ", res)
      let obj = {}
      obj = res
      obj.kind = "update_weekly_barrier_policy_list"
      this.sendMessage(obj)
    },
    registClose() {
      this.resistIs = false
    },
    loc_dir() {
      this.locations = []
      this.directions = []
      let location_list = []
      let direction_list = []
      location_list = config.location_list
      direction_list = config.direction_list
      //  for(let i = 0; i < location_list.length; i++){
      this.locations = location_list
      //  }
      // for(let i = 0; i < direction_list.length; i++){
      this.directions = direction_list
      //   }
      let temp = {}
      this.locations.push(temp)
      this.locations.splice(this.locations.length - 1, 1)
      this.directions.push(temp)
      this.directions.splice(this.directions.length - 1, 1)
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      console.log("this.admin : ", this.admin)
      let obj = {}
      obj.weekly = []
      obj.weekly = this.checkedNames
      obj.set_hour = this.set_hour
      obj.set_min = this.set_min
      obj.location = this.location
      obj.direction = this.direction
      obj.barrier_policy = this.barrier_policy
      obj.checked = false
      obj.kind = "create_weekly_barrier_policy_list"
      obj.time = Date.now()
      console.log("obj :", obj)
      // console.log("e:", e)
      //console.log("this : ", this)
      this.sendMessage(obj)
    },
    item_lp_click: function() {
      console.log("lp sort")
      let temp10 = []
      if (this.sort_item.lp_click === false) {
        console.log("lp sort1")
        this.sort_item.lp_click = true
        temp10 = _.sortBy(this.resistRocord, "lp")
        temp10.reverse()
        return (this.resistRocord = temp10)
      } else {
        console.log("lp sort2")
        this.sort_item.lp_click = false
        temp10 = _.sortBy(this.resistRocord, "lp")
        return (this.resistRocord = temp10)
      }
    },
    item_startTime_click: function() {
      console.log("startTime sort")
      let temp10 = []
      if (this.sort_item.startTime_click === false) {
        console.log("startTime sort1")
        this.sort_item.startTime_click = true
        temp10 = _.sortBy(this.resistRocord, "startTime")
        temp10.reverse()
        return (this.resistRocord = temp10)
      } else {
        console.log("startTime sort2")
        this.sort_item.startTime_click = false
        temp10 = _.sortBy(this.resistRocord, "startTime")
        return (this.resistRocord = temp10)
      }
    },
    item_endTime_click: function() {
      console.log("endTime sort")
      let temp10 = []
      if (this.sort_item.endTime_click === false) {
        console.log("endTime sort1")
        this.sort_item.endTime_click = true
        temp10 = _.sortBy(this.resistRocord, "endTime")
        temp10.reverse()
        return (this.resistRocord = temp10)
      } else {
        console.log("endTime sort2")
        this.sort_item.endTime_click = false
        temp10 = _.sortBy(this.resistRocord, "endTime")
        return (this.resistRocord = temp10)
      }
    },
    item_name_click: function() {
      console.log("name sort")
      let temp10 = []
      if (this.sort_item.name_click === false) {
        console.log("name sort1")
        this.sort_item.name_click = true
        temp10 = _.sortBy(this.resistRocord, "name")
        temp10.reverse()
        return (this.resistRocord = temp10)
      } else {
        console.log("name sort2")
        this.sort_item.name_click = false
        temp10 = _.sortBy(this.resistRocord, "name")
        return (this.resistRocord = temp10)
      }
    },
    item_phone_click: function() {
      console.log("phone sort")
      let temp10 = []
      if (this.sort_item.phone_click === false) {
        console.log("phone sort1")
        this.sort_item.phone_click = true
        temp10 = _.sortBy(this.resistRocord, "phone")
        temp10.reverse()
        return (this.resistRocord = temp10)
      } else {
        console.log("phone sort2")
        this.sort_item.phone_click = false
        temp10 = _.sortBy(this.resistRocord, "phone")
        return (this.resistRocord = temp10)
      }
    },
    item_kind1_click: function() {
      console.log("kind1 sort")
      let temp10 = []
      if (this.sort_item.kind1_click === false) {
        console.log("kind1 sort1")
        this.sort_item.kind1_click = true
        temp10 = _.sortBy(this.resistRocord, "kind1")
        temp10.reverse()
        return (this.resistRocord = temp10)
      } else {
        console.log("kind1 sort2")
        this.sort_item.kind1_click = false
        temp10 = _.sortBy(this.resistRocord, "kind1")
        return (this.resistRocord = temp10)
      }
    },
    item_contents_click: function() {
      console.log("contents sort")
      let temp10 = []
      if (this.sort_item.contents_click === false) {
        console.log("contents sort1")
        this.sort_item.contents_click = true
        temp10 = _.sortBy(this.resistRocord, "contents")
        temp10.reverse()
        return (this.resistRocord = temp10)
      } else {
        console.log("contents sort2")
        this.sort_item.contents_click = false
        temp10 = _.sortBy(this.resistRocord, "contents")
        return (this.resistRocord = temp10)
      }
    },
    search1() {
      let obj = {}
      obj.kind = "get_weekly_barrier_policy_list"
      this.sendMessage(obj)
    },
    get_weekly_barrier_policy_list(data) {
      console.log("salse_list : ", data)
      this.weekly_barrier_policy_list = []
      if (data.docs && data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          data.docs[i].set_up_time =
            data.docs[i].set_hour + " : " + data.docs[i].set_min
          data.docs[i].weekly1 = ""
          for (let j = 0; j < data.docs[i].weekly.length; j++) {
            data.docs[i].weekly1 += data.docs[i].weekly[j]
            if (j < data.docs[i].weekly.length - 1) {
              data.docs[i].weekly1 += ", "
            }
            // data.docs[i].weekly1
          }

          this.weekly_barrier_policy_list.push(data.docs[i])
        }
        let temp = {}
        this.weekly_barrier_policy_list.push(temp)
        this.weekly_barrier_policy_list.splice(
          this.weekly_barrier_policy_list.length - 1,
          1
        )
      }
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.weekly = c.weekly
      this.current.set_hour = c.set_hour
      this.current.set_min = c.set_min
      this.current.location = c.location
      this.current.direction = c.direction
      this.current.barrier_ploicy = c.barrier_policy
      this.current.checked = c.checked
      console.log("c : ", c.lp)
      console.log("this : ", this)
    },
    modifyClose() {
      this.modifyIs = false
    },
    searchItems() {
      console.log("테스트")
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    modifyVehicle() {
      console.log("차량정보 수정")
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.name = this.current.name
      obj.phone1 = this.current.phone
      obj.period_start = get_datetime(this.current.startTime)
      obj.period_end = get_datetime(this.current.endTime)
      obj.contents = this.current.contents
      obj.company = this.current.kind1
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "update_sales_at_sales_list"
      console.log("차량정보수정 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("차량정보 삭제")
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.name = this.current.name
      obj.phone1 = this.current.phone
      obj.period_start = this.current.period_start
      obj.period_end = this.current.eperiod_end
      obj.contents = this.current.contents
      obj.kind1 = this.current.kind1
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "delete_sales_at_sales_list"
      this.sendMessage(obj)
    },
    download: function() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.resistRocord)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(wb, "하테크노타운주차장_ 차량관리_" + postfix + ".xlsx")
    }
  }
}
function get_datetime(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(
    parseInt(res[0]),
    parseInt(res[1]) - 1,
    parseInt(res[2]),
    parseInt(res[3]),
    parseInt(res[4]),
    0,
    0
  )
  return d.getTime()
}
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style></style>
