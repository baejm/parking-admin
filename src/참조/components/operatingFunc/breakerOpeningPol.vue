<template>
  <div class="report_wrap breaker_policy">
    <!-- 등록내용 -->
    <div
      class="resist_pop popup poly"
      v-show="resistIs"
      :class="{ column_1: Object.keys(this.locations).length < 8 }"
    >
      <div>
        <h3>{{ titles }} 등록</h3>
        <button @click="registClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <ul class="regist_wrap">
              <li>
                <h4>장소</h4>
                <div class="contents">
                  <select v-model="location">
                    <option
                      v-for="(loc, index) in locations"
                      v-bind:key="index"
                    >
                      {{ loc.text }}
                    </option>
                  </select>
                </div>
              </li>
              <li>
                <h4>방향</h4>
                <div class="contents">
                  <select v-model="direction">
                    <option
                      v-for="(dir, index) in directions"
                      v-bind:key="index"
                    >
                      {{ dir.text }}
                    </option>
                  </select>
                </div>
              </li>
              <li class="breaker">
                <h4>차단기</h4>
                <div class="contents">
                  <label
                    ><input
                      type="radio"
                      value="noaplly"
                      v-model="checkedNames"
                    />요일제 적용 안함
                  </label>
                  <div :class="{ dayCheck }" class="dayContentsWrap">
                    <label
                      ><input type="checkbox" /><span>등록 차량</span></label
                    >
                    <label
                      ><input type="checkbox" /><span>방문 차량</span></label
                    >
                    <label
                      ><input type="checkbox" /><span
                        >방문 예약 차량</span
                      ></label
                    >
                    <label
                      ><input type="checkbox" /><span>일반 차량</span></label
                    >
                  </div>
                  <label>
                    <input
                      type="radio"
                      value="dayOfWeek"
                      v-model="checkedNames"
                    />요일제 적용
                  </label>
                  <div v-show="dayCheck" class="dayContentsWrap">
                    <h5>부제 선택 :</h5>
                    <label>
                      <input type="radio" value="2sub" v-model="birthYE" />2부제
                    </label>
                    <label>
                      <input type="radio" value="5sub" v-model="birthYE" />5부제
                    </label>
                    <ul class="vichle_wrap">
                      <li>
                        <dl>
                          <dt>차량 선택 (요일제 시간내)</dt>
                          <dd>통과</dd>
                          <dd>차단</dd>
                          <dd>요일제</dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>일반차량</dt>
                          <dd>
                            <input
                              type="radio"
                              value="pass"
                              v-model="generalV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="block"
                              v-model="generalV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="dayWeek"
                              v-model="generalV"
                            />
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>등록차량</dt>
                          <dd>
                            <input
                              type="radio"
                              value="pass"
                              v-model="registeredV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="block"
                              v-model="registeredV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="dayWeek"
                              v-model="registeredV"
                            />
                          </dd>
                        </dl>
                      </li>
                    </ul>
                    <div class="time_wrap">
                      <div class="start">
                        <h5>시작 시각 :</h5>
                        <input
                          type="text"
                          id="set_time_hour"
                          v-model="set_hour"
                          maxlength="2"
                          placeholder="00"
                          required
                          min="0"
                          max="24"
                          onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                          @input="setHour"
                        /><span>시</span>
                        <input
                          type="text"
                          id="set_time_minutes"
                          v-model="set_min"
                          maxlength="2"
                          placeholder="00"
                          required
                          onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                          @input="setMinute"
                        /><span>분</span>
                      </div>
                      <div class="end">
                        <h5>종료 시각 :</h5>
                        <input
                          type="text"
                          id="set_time_hour"
                          v-model="end_set_hour"
                          maxlength="2"
                          placeholder="00"
                          required
                          onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                          @input="endSetHour"
                        /><span>시</span>
                        <input
                          type="text"
                          id="set_time_minutes"
                          v-model="end_set_min"
                          maxlength="2"
                          placeholder="00"
                          required
                          onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                          @input="endSetMinute"
                        /><span>분</span>
                        <span> </span>
                      </div>
                    </div>
                    <div class="select_out">
                      <h5>차량선택(시간외)</h5>
                      <label
                        ><input type="checkbox" /><span>등록 차량</span></label
                      >
                      <label
                        ><input type="checkbox" /><span>방문 차량</span></label
                      >
                      <label
                        ><input type="checkbox" /><span
                          >방문 예약 차량</span
                        ></label
                      >
                      <label
                        ><input type="checkbox" /><span>일반 차량</span></label
                      >
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <h4>미인식</h4>
                <label>
                  <input type="checkbox" v-model="recg_check" /><span
                    >통과</span
                  >
                </label>
              </li>
              <div class="btns">
                <button @click.prevent="registNew" class="writebtn">
                  등록
                </button>
              </div>
            </ul>
          </form>
        </div>
      </div>
    </div>
    <div class="title">
      <h2>{{ titles }}</h2>
    </div>
    <div class="list-items content_single">
      <div class="writeRecord">
        <button @click.prevent="registOpen" class="register_btn">
          <font-awesome-icon icon="file-signature" />등록
        </button>
      </div>
      <ul class="list-title">
        <li>번호</li>
        <li class="location">장소</li>
        <li class="direction">방향</li>
        <li>정책내용</li>
      </ul>
      <ul class="list-wrap">
        <li v-for="(res, index) in weekly_barrier_policy_list" :key="index">
          <span> {{ index + 1 }}</span>
          <span class="location"
            ><input type="text" v-model="res.location" readonly
          /></span>
          <span class="direction"
            ><input type="text" v-model="res.direction" readonly
          /></span>
          <span class="barrierPolicy"
            ><input type="text" v-model="res.policy" readonly
          /></span>
          <button
            class="delete"
            @click.prevent="delete_barrier_policy_click(res)"
          >
            <font-awesome-icon icon="trash-alt" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from "../../config.js"
import { mapState } from "vuex"
import _ from "underscore"
import XLSX from "xlsx"
export default {
  data: function() {
    return {
      registered_vehicle: {
        value: true
      },
      visited_vehicle: {
        value: true
      },
      reservered_visit_vehicle: {
        value: true
      },
      general_vehicle: {
        value: false
      },
      not_recg_vehicle: {
        value: false
      },
      weekly_app: {
        registered_vehicle: {
          value: true
        },
        visited_vehicle: {
          value: true
        },
        reservered_visit_vehicle: {
          value: true
        },
        general_vehicle: {
          value: false
        },
        not_recg_vehicle: {
          value: false
        }
      },
      weekly_app_etc: {
        registered_vehicle: {
          value: true
        },
        visited_vehicle: {
          value: true
        },
        reservered_visit_vehicle: {
          value: true
        },
        general_vehicle: {
          value: false
        },
        not_recg_vehicle: {
          value: false
        }
      },
      dayCheck: false,
      dayCheck2: false,
      recg_check: false,
      end_set_min: "00",
      end_set_hour: "18",
      set_min: "00",
      set_hour: "06",
      userInfo: "",
      isLoading: false,
      location: "정문입구",
      direction: "in",
      checkedNames: "all",
      checkedNames2: "",
      birthYE: "5sub",
      generalV: "pass",
      generalV2: "pass",
      value: "",
      registeredV: "dayWeek",
      registeredV2: "pass",
      locations: [],
      directions: [],
      weekly_barrier_policy_list: [],
      resistRocord: [],
      admin: {
        end_set_min: "18",
        end_set_hour: "00",
        set_min: "06",
        set_hour: "00",
        userInfo: "",
        isLoading: false,
        location: "",
        direction: "",
        checkedNames: "",
        birthYE: "",
        generalV: "",
        generalV2: "",
        value: "",
        registeredV: "",
        registeredV2: ""
      },
      current: {
        end_set_min: "",
        end_set_hour: "",
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
        end_set_min: "",
        end_set_hour: "",
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
  computed: {
    ...mapState(["mainTitle"])
  },
  watch: {
    onlyNumber() {
      return (this.onlyNumber = this.onlyNumber.replace(/[^0-9]/g, ""))
    },
    checkedNames: function() {
      if (this.checkedNames === "dayOfWeek") {
        this.dayCheck = true
        this.dayCheck2 = false
      } else if (this.checkedNames === "noaplly") {
        this.dayCheck = false
        this.dayCheck2 = true
      }
    }
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
      this.start()
    this.changeTitle()
    //  this.loc_dir()
    // this.isTrue()

    // this.search1()
  },
  components: {
    // spinners
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "breakerOpeningPol") this.titles = add.title
        })
      })
    },
    setHour() {
      this.set_hour = this.set_hour.replace(/\D/g, "")
      if (this.set_hour > 24) {
        this.set_hour = ""
        alert("24시보다 작아야 합니다.")
      }
    },
    setMinute() {
      this.set_min = this.set_min.replace(/\D/g, "")
      if (this.set_min > 59) {
        this.set_min = ""
        alert("60분보다 작아야 합니다.")
      }
    },
    endSetHour() {
      this.end_set_hour = this.end_set_hour.replace(/\D/g, "")
      if (this.end_set_hour > 24) {
        this.end_set_hour = ""
        alert("24시보다 작아야 합니다.")
      }
    },
    endSetMinute() {
      this.end_set_min = this.end_set_min.replace(/\D/g, "")
      if (this.end_set_min > 59) {
        this.end_set_min = ""
        alert("60분보다 작아야 합니다.")
      }
    },
    isTrue() {
      if (this.checkedNames === "dayOfWeek") {
        this.dayChecks = true
      } else {
        this.dayChecks = false
      }
    },
    registOpen() {
      console.log("테스트요", this.weekly_barrier_policy_list)
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
      let iotBoardList = []
      let location_list = []
      let direction_list = []
      iotBoardList = config.iot_board_list
      location_list = config.location_list
      direction_list = config.direction_list
      //  for(let i = 0; i < location_list.length; i++){
      this.boardList = iotBoardList
      this.locations = location_list
      //  }
      // for(let i = 0; i < direction_list.length; i++){
      this.directions = direction_list
      //   }
      console.log(
        "locations",
        this.locations,
        "boardList : ",
        this.boardList,
        "direction_list : ",
        direction_list
      )
      let temp = {}
      this.locations.push(temp)
      this.locations.splice(this.locations.length - 1, 1)
      this.directions.push(temp)
      this.directions.splice(this.directions.length - 1, 1)
      console.log("locations", this.locations)
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      // console.log("admin : ", this.admin)
      let obj = {}
      obj.start_time_hour = "00"
      obj.start_time_min = "00"
      obj.end_time_hour = "00"
      obj.end_time_min = "00"
      obj.part_kind = "5"
      obj.ganeral_vehicle = "close"
      obj.registered_vehicle = "open"
      obj.general_vehicle_timeout = "close"
      obj.registered_vehicle_timeout = "open"
      if (this.checkedNames === "dayOfWeek") {
        obj.value = "weekly_app"
        obj.start_time_hour = this.set_hour
        obj.start_time_min = this.set_min
        obj.end_time_hour = this.end_set_hour
        obj.end_time_min = this.end_set_min
        if (this.generalV === "pass") {
          obj.general_vehicle = "open"
        } else if (this.generalV === "block") {
          obj.general_vehicle = "close"
        } else if (this.generalV === "dayWeek") {
          obj.general_vehicle = "weekly_app"
        }
        if (this.generalV2 === "pass") {
          obj.general_vehicle_timeout = "open"
        } else if (this.generalV2 === "block") {
          obj.general_vehicle_timeout = "close"
        }
        if (this.registeredV === "pass") {
          obj.registered_vehicle = "open"
        } else if (this.registeredV === "block") {
          obj.registered_vehicle = "close"
        } else if (this.registeredV === "dayWeek") {
          obj.registered_vehicle = "weekly_app"
        }
        if (this.registeredV2 === "pass") {
          obj.registered_vehicle_timeout = "open"
        } else if (this.registeredV2 === "block") {
          obj.registered_vehicle_timeout = "close"
        }
        // obj.registered_vehicle = this.registeredV
        // obj.general_vehicle_timeout = this.generalV2
        // obj.registered_vehicle_timeout = this.registeredV2
        if (this.birthYE === "2sub") {
          obj.part_kind = "2"
        } else {
          obj.part_kind = "5"
        }
      } else if (this.checkedNames === "all") {
        obj.value = "all_vehicle_path"
      } else if (this.checkedNames === "never") {
        obj.value = "all_vehicle_not_path"
      } else if (this.checkedNames === "enrollment") {
        if (this.recg_check === false) {
          obj.value = "only_registered_vehicle_path"
        } else {
          obj.value = "only_registered_vehicle_with_not_recg_path"
        }
      } else if (this.checkedNames === "only") {
        obj.value = "only_registered_vehicle_not_path"
      }
      obj.recg_check = this.recg_check
      obj.location = this.location
      obj.direction = this.direction
      obj.kind = "create_weekly_barrier_policy_list"
      obj.time = Date.now()
      console.log("obj :", obj)
      console.log("있지안음?", this.locations)
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
      console.log("get_weekly_barrier_policy_list : ", data)
      this.weekly_barrier_policy_list = []
      if (data.docs && data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          let barrier_policy = {}
          let general_vehicle = ""
          let general_vehicle1 = ""
          let registered_vehicle = ""
          let registered_vehicle1 = ""
          barrier_policy = data.docs[i]
          console.log("barrier_policy : ", barrier_policy)
          if (data.docs[i].value === "all_vehicle_path") {
            barrier_policy.policy = "모든 차량 개방"
          } else if (data.docs[i].value === "all_vehicle_not_path") {
            barrier_policy.policy = "모든 차량 개방 안함"
          } else if (data.docs[i].value === "only_registered_vehicle_path") {
            barrier_policy.policy = "등록 차량만 개방"
          } else if (
            data.docs[i].value === "only_registered_vehicle_with_not_recg_path"
          ) {
            barrier_policy.policy = "등록 차량 + 미인식 차량 개방"
          } else if (
            data.docs[i].value === "only_registered_vehicle_not_path"
          ) {
            barrier_policy.policy = "일반 차량만 개방"
          } else if (data.docs[i].value === "weekly_app") {
            if (data.docs[i].general_vehicle === "open") {
              general_vehicle = "open"
            } else if (data.docs[i].general_vehicle === "close") {
              general_vehicle = "close"
            } else if (data.docs[i].general_vehicle === "weekly_app") {
              general_vehicle = "요일제적용"
            }
            if (data.docs[i].registered_vehicle === "open") {
              registered_vehicle = "open"
            } else if (data.docs[i].registered_vehicle === "close") {
              registered_vehicle = "close"
            } else if (data.docs[i].registered_vehicle === "weekly_app") {
              registered_vehicle = "요일제적용"
            }
            if (data.docs[i].general_vehicle_timeout === "open") {
              general_vehicle1 = "open"
            } else if (data.docs[i].general_vehicle_timeout === "close") {
              general_vehicle1 = "close"
            }
            if (data.docs[i].registered_vehicle_timeout === "open") {
              registered_vehicle1 = "open"
            } else if (data.docs[i].registered_vehicle_timeout === "close") {
              registered_vehicle1 = "close"
            }
            console.log(
              "general_vehicle :",
              general_vehicle,
              "general_vehicle1 :",
              general_vehicle1,
              "registered_vehicle : ",
              registered_vehicle,
              "registered_vehicle1 : ",
              registered_vehicle
            )
            barrier_policy.policy =
              "요일제 적용 " +
              data.docs[i].part_kind +
              ", " +
              data.docs[i].start_time_hour +
              ":" +
              data.docs[i].start_time_min +
              " ~ " +
              data.docs[i].end_time_hour +
              ":" +
              data.docs[i].end_time_min +
              " 일반차량 : " +
              general_vehicle +
              ", 등록차량 : " +
              registered_vehicle +
              ", 일반차량 : " +
              general_vehicle1 +
              ", 등록차량 : " +
              registered_vehicle1
          }
          this.weekly_barrier_policy_list.push(barrier_policy)
          console.log(
            "this.weekly_barrier_policy_list : ",
            this.weekly_barrier_policy_list
          )
        }
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
    modifyVehicle() {},
    deleteVehicle() {
      console.log("차량정보 삭제")
      this.modifyClose()
      let obj = {}

      obj.kind = "delete_weekly_barrier_policy_list"
      this.sendMessage(obj)
    },
    start() {
      this.loc_dir()
      this.search1()
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

function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>

<style scoped></style>
