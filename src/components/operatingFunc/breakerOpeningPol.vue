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
                  <select v-model="reg.location">
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
                  <select v-model="reg.direction">
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
                      value="noapply"
                      v-model="weekCheckedNames"
                    />요일제 적용 안함
                  </label>
                  <div :class="{ dayCheck }" class="dayContentsWrap">
                    <label
                      ><input
                        type="checkbox"
                        v-model="reg.registered_chk"
                      /><span>등록 차량</span></label
                    >
                    <label
                      ><input type="checkbox" v-model="reg.visited_chk" /><span
                        >방문 차량</span
                      ></label
                    >
                    <label
                      ><input type="checkbox" v-model="reg.reserved_chk" /><span
                        >방문 예약 차량</span
                      ></label
                    >
                    <label
                      ><input type="checkbox" v-model="reg.general_chk" /><span
                        >일반 차량</span
                      ></label
                    >
                    <label
                      ><input type="checkbox" v-model="reg.saled_chk" /><span
                        >영업 차량</span
                      ></label
                    >
                  </div>
                  <label>
                    <input
                      type="radio"
                      value="dayOfWeek"
                      v-model="weekCheckedNames"
                    />요일제 적용
                  </label>
                  <div v-show="dayCheck" class="dayContentsWrap">
                    <h5>부제 선택 :</h5>
                    <label>
                      <input
                        type="radio"
                        value="2sub"
                        v-model="reg.birthYE"
                      />2부제
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="5sub"
                        v-model="reg.birthYE"
                      />5부제
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
                              v-model="reg.generalV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="block"
                              v-model="reg.generalV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="dayWeek"
                              v-model="reg.generalV"
                            />
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>방문차량</dt>
                          <dd>
                            <input
                              type="radio"
                              value="pass"
                              v-model="reg.visitV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="block"
                              v-model="reg.visitV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="dayWeek"
                              v-model="reg.visitV"
                            />
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>방문예약차량</dt>
                          <dd>
                            <input
                              type="radio"
                              value="pass"
                              v-model="reg.reservedV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="block"
                              v-model="reg.reservedV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="dayWeek"
                              v-model="reg.reservedV"
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
                              v-model="reg.registeredV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="block"
                              v-model="reg.registeredV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="dayWeek"
                              v-model="reg.registeredV"
                            />
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>영업차량</dt>
                          <dd>
                            <input
                              type="radio"
                              value="pass"
                              v-model="reg.salesV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="block"
                              v-model="reg.salesV"
                            />
                          </dd>
                          <dd>
                            <input
                              type="radio"
                              value="dayWeek"
                              v-model="reg.salesV"
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
                          v-model="reg.set_hour"
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
                          v-model="reg.set_min"
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
                          v-model="reg.end_set_hour"
                          maxlength="2"
                          placeholder="00"
                          required
                          onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                          @input="endSetHour"
                        /><span>시</span>
                        <input
                          type="text"
                          id="set_time_minutes"
                          v-model="reg.end_set_min"
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
                        ><input
                          type="checkbox"
                          v-model="reg.week_outTime_registered_chk"
                        /><span>등록 차량</span></label
                      >
                      <label
                        ><input
                          type="checkbox"
                          v-model="reg.week_outTime_visited_chk"
                        /><span>방문 차량</span></label
                      >
                      <label
                        ><input
                          type="checkbox"
                          v-model="reg.week_outTime_reserved_chk"
                        /><span>방문 예약 차량</span></label
                      >
                      <label
                        ><input
                          type="checkbox"
                          v-model="reg.week_outTime_general_chk"
                        /><span>일반 차량</span></label
                      >
                      <label
                        ><input
                          type="checkbox"
                          v-model="reg.week_outTime_sales_chk"
                        /><span>영업 차량</span></label
                      >
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <h4>미인식</h4>
                <label>
                  <input type="checkbox" v-model="reg.recg_check" /><span
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
    <!-- 정책내용 -->
    <div
      class="resist_pop popup poly"
      v-show="polContents"
      :class="{ column_1: Object.keys(this.locations).length < 8 }"
    >
      <div>
        <h3>{{ titles }}</h3>
        <button @click="polContents = false" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <ul class="regist_wrap">
            <li>
              <h4>정책내용</h4>
              <div class="contents">
                <span>{{ policyList }}</span>
              </div>
            </li>
          </ul>
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
        <!-- <li>번호</li>
        <li>장소</li>
        <li>방향</li> 
        <li> 정책내용</li>  -->
      </ul>
      <ul class="list-wrap">
        <li v-for="(res, index) in weekly_barrier_policy_list" :key="index">
          <span> {{ index + 1 }}</span>
          <span>장소 : {{ res.location }}</span>
          <!-- <span> <input type="text" v-model="res.location" readonly/></span> -->
          <span>방향 : {{ res.direction }}</span>
          <!-- <span><input type="text" v-model="res.direction" readonly/></span> -->
          <span @click="showContents(res)" class="time">
            {{ res.policy }}
            <!-- <input type="text" v-model="res.policy" readonly/> -->
          </span>
          <span
            ><button
              class="delete"
              @click.prevent="delete_barrier_policy_click(res)"
            >
              <font-awesome-icon icon="trash-alt" />
            </button>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from "../../config.js"
import { mapState } from "vuex"
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
      polContents: false,
      policyList: [],
      weekCheckedNames: "noapply",
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
      reg: {
        end_set_min: "00",
        end_set_hour: "18",
        set_min: "00",
        set_hour: "06",
        userInfo: "",
        weekCheckedNames: "noapply",
        registered_chk: true,
        visited_chk: false,
        reserved_chk: false,
        general_chk: false,
        sales_chk: false,
        isLoading: false,
        week_outTime_registered_chk: true,
        week_outTime_visited_chk: false,
        week_outTime_reserved_chk: false,
        week_outTime_general_chk: false,
        week_outTime_sales_chk: false,
        recg_check: false,
        location: "",
        direction: "",
        checkedNames: "",
        birthYE: "5sub",
        generalV: "block",
        visitV: "block",
        reservedV: "block",
        registeredV: "dayWeek",
        salesV: "dayWeek",
        value: ""
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
    weekCheckedNames: function() {
      if (this.weekCheckedNames === "dayOfWeek") {
        this.dayCheck = true
        this.dayCheck2 = false
        this.weekCheckedNames = "dayOfWeek"
      } else if (this.weekCheckedNames === "noapply") {
        this.dayCheck = false
        this.dayCheck2 = true
        this.weekCheckedNames = "noapply"
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
    showContents(event) {
      this.polContents = true
      this.policyList = event.policy
    },
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
      obj.start_time_hour = this.reg.set_hour
      obj.start_time_min = this.reg.set_min
      obj.end_time_hour = this.reg.end_set_hour
      obj.end_time_min = this.reg.end_set_min

      obj.weekChecked = obj.part_kind = this.reg.birthYE
      if (this.weekCheckedNames === "noapply") {
        obj.weekChecked = "general_app"
        if (this.reg.registered_chk === true) {
          obj.registered_vehicle = "open"
        } else {
          obj.registered_vehicle = "close"
        }
        if (this.reg.visited_chk === true) {
          obj.visited_vehicle = "open"
        } else {
          obj.visited_vehicle = "close"
        }
        if (this.reg.reserved_chk === true) {
          obj.reserved_vehicle = "open"
        } else {
          obj.reserved_vehicle = "close"
        }
        if (this.reg.general_chk === true) {
          obj.general_vehicle = "open"
        } else {
          obj.general_vehicle = "close"
        }
        if (this.reg.sales_chk === true) {
          obj.sales_vehicle = "open"
        } else {
          obj.sales_vehicle = "close"
        }
      } else {
        obj.weekChecked = "week_app"
        if (this.reg.registeredV === "pass") {
          obj.part_registered_vehicle = "open"
        } else if (this.reg.registeredV === "dayWeek") {
          obj.part_registered_vehicle = "dayWeek"
        } else {
          obj.part_registered_vehicle = "close"
        }
        if (this.reg.reservedV === "pass") {
          obj.part_reserved_vehicle = "open"
        } else if (this.reg.reservedV === "dayWeek") {
          obj.part_reserved_vehicle = "dayWeek"
        } else {
          obj.part_reserved_vehicle = "close"
        }
        if (this.reg.salesV === "pass") {
          obj.part_sales_vehicle = "open"
        } else if (this.reg.salesV === "dayWeek") {
          obj.part_sales_vehicle = "dayWeek"
        } else {
          obj.part_sales_vehicle = "close"
        }
        if (this.reg.visitV === "pass") {
          obj.part_visited_vehicle = "open"
        } else if (this.reg.visitV === "dayWeek") {
          obj.part_visited_vehicle = "dayWeek"
        } else {
          obj.part_visited_vehicle = "close"
        }
        if (this.reg.generalV === "pass") {
          obj.part_general_vehicle = "open"
        } else if (this.reg.generalV === "dayWeek") {
          obj.part_general_vehicle = "dayWeek"
        } else {
          obj.part_general_vehicle = "close"
        }
        if (this.reg.week_outTime_registered_chk === true) {
          obj.week_outTime_registered_vehicle = "open"
        } else {
          obj.week_outTime_registered_vehicle = "close"
        }
        if (this.reg.week_outTime_visited_chk === true) {
          obj.week_outTime_visited_vehicle = "open"
        } else {
          obj.week_outTime_visited_vehicle = "close"
        }
        if (this.reg.week_outTime_reserved_chk === true) {
          obj.week_outTime_reserved_vehicle = "open"
        } else {
          obj.week_outTime_reserved_vehicle = "close"
        }
        if (this.reg.week_outTime_general_chk === true) {
          obj.week_outTime_general_vehicle = "open"
        } else {
          obj.week_outTime_general_vehicle = "close"
        }
        if (this.reg.week_outTime_slaes_chk === true) {
          obj.week_outTime_sales_vehicle = "open"
        } else {
          obj.week_outTime_sales_vehicle = "close"
        }
      }
      if (this.reg.recg_check === true) {
        obj.not_recg_vehicle = "open"
      } else {
        obj.not_recg_vehicle = "close"
      }
      if (this.reg.location === "" || this.reg.direction === "") {
        console.log("다시 입력해 주세요....")
      } else {
        obj.location = this.reg.location
        obj.direction = this.reg.direction
        obj.kind = "create_weekly_barrier_policy_list"
        obj.time = Date.now()
        console.log("obj :", obj)
        // console.log("있지안음?", this.locations)
        // console.log("e:", e)
        //console.log("this : ", this)
        this.sendMessage(obj)
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
          let obj = {}
          let barrier_policy = {}
          obj = data.docs[i]
          barrier_policy = obj
          console.log("barrier_policy : ", barrier_policy)
          barrier_policy.policy = ""
          if (obj.weekChecked === "general_app") {
            barrier_policy.policy += ""
            if (obj.registered_vehicle === "open") {
              barrier_policy.policy += "등록차량 개방, "
            } else {
              barrier_policy.policy += "등록차량 미개방, "
            }
            if (obj.visited_vehicle === "open") {
              barrier_policy.policy += "방문차량 개방, "
            } else {
              barrier_policy.policy += "방문차량 미개방, "
            }
            if (obj.reserved_vehicle === "open") {
              barrier_policy.policy += "방문예약차량 개방, "
            } else {
              barrier_policy.policy += "등록예약차량 미개방, "
            }
            if (obj.general_vehicle === "open") {
              barrier_policy.policy += "일반차량 개방, "
            } else {
              barrier_policy.policy += "일반차량 미개방, "
            }
            if (obj.sales_vehicle === "open") {
              barrier_policy.policy += "영업차량 개방, "
            } else {
              barrier_policy.policy += "영업차량 미개방, "
            }
            if (obj.not_recg_vehicle === "open") {
              barrier_policy.policy += "미인식차량 개방, "
            } else {
              barrier_policy.policy += "미인식차량 미개방, "
            }
          } else {
            barrier_policy.policy += ""
            if (obj.part_kind === "5sub") {
              barrier_policy.policy += "5부제, "
            } else {
              barrier_policy.policy += "2부제, "
            }
            if (obj.part_registered_vehicle === "open") {
              barrier_policy.policy += "등록차량 개방, "
            } else if (obj.part_registered_vehicle === "dayWeek") {
              barrier_policy.policy += "등록차량 요일제, "
            } else {
              barrier_policy.policy += "등록차량 미개방, "
            }
            if (obj.ppart_reserved_vehicle === "open") {
              barrier_policy.policy += "방문예약차량 개방, "
            } else if (obj.part_reserved_vehicle === "dayWeek") {
              barrier_policy.policy += "방문예약차량 요일제, "
            } else {
              barrier_policy.policy += "방문예약차량 미개방, "
            }
            if (obj.part_part_visited_vehicle === "open") {
              barrier_policy.policy += "방문차량 개방, "
            } else if (obj.part_visited_vehicle === "dayWeek") {
              barrier_policy.policy += "방문차량 요일제, "
            } else {
              barrier_policy.policy += "방문차량 미개방, "
            }
            if (obj.part_general_vehicle === "open") {
              barrier_policy.policy += "일반차량 개방, "
            } else if (obj.part_general_vehicle === "dayWeek") {
              barrier_policy.policy += "일반차량 요일제, "
            } else {
              barrier_policy.policy += "일반차량 미개방, "
            }
            if (obj.part_sales_vehicle === "open") {
              barrier_policy.policy += "영업차량 개방, "
            } else if (obj.part_sales_vehicle === "dayWeek") {
              barrier_policy.policy += "영업차량 요일제, "
            } else {
              barrier_policy.policy += "영업차량 미개방, "
            }
            if (obj.week_outTime_registered_vehicle === "open") {
              barrier_policy.policy += "\n\n      시간외 등록차량 개방, "
            } else {
              barrier_policy.policy += "\n\n    시간외 등록차량 미개방, "
            }
            if (obj.week_outTime_reserved_vehicle === "open") {
              barrier_policy.policy += "시간외 방문예약차량 개방, "
            } else {
              barrier_policy.policy += "시간외 방문예약차량 미개방, "
            }
            if (obj.week_outTime_visited_vehicle === "open") {
              barrier_policy.policy += "시간외 방문차량 개방, "
            } else {
              barrier_policy.policy += "시간외 방문차량 미개방, "
            }
            if (obj.week_outTime_general_vehicle === "open") {
              barrier_policy.policy += "시간외 일반차량 개방, "
            } else {
              barrier_policy.policy += "시간외 일반차량 미개방, "
            }
            if (obj.week_outTime_sales_vehicle === "open") {
              barrier_policy.policy += "시간외 영업차량 개방, "
            } else {
              barrier_policy.policy += "시간외 영업차량 미개방, "
            }
            barrier_policy.policy +=
              "요일제 시작시각" +
              obj.start_time_hour +
              "시" +
              obj.start_time_min +
              "분, "
            barrier_policy.policy +=
              "요일제 종료시각" +
              obj.end_time_hour +
              "시" +
              obj.end_time_min +
              "분, "
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
      this.current.barrier_policy = c.barrier_policy
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
