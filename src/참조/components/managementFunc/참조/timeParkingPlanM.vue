<template>
  <div class="report_wrap">
    <!-- 등록팝업 -->
    <div class="parking_plan popup" v-show="resistIs">
      <div>
        <h3>{{ titles }} 등록</h3>
        <button @click="registClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>적용</dt>
              <dd>
                <label
                  ><input
                    type="radio"
                    value="Y"
                    v-model="reg.checkedNames"
                  /><span>Y</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="N"
                    v-model="reg.checkedNames"
                  /><span>N</span></label
                >
              </dd>
            </dl>
            <dl>
              <dt>요금제명</dt>
              <dd>
                <input type="text" v-model="reg.planName" class="rate_plan" />
              </dd>
            </dl>
            <dl>
              <dt>절상/절삭</dt>
              <dd>
                <select v-model="reg.unit">
                  <option
                    v-for="(unit, index) in units_list"
                    v-bind:key="index"
                  >
                    {{ unit.text }}
                  </option>
                </select>
                <select v-model="reg.estimate">
                  <option
                    v-for="(estimate, index) in estimates_list"
                    v-bind:key="index"
                  >
                    {{ estimate.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl class="step_price">
              <dt>단계별 요금</dt>
              <dd>
                <h6>기본요금<span class="essential">*</span></h6>
                <label
                  ><input type="text" v-model="reg.std_set_min" /><span
                    >분</span
                  ></label
                >
                <label
                  ><input
                    type="text"
                    v-model="reg.std_price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="reg.std_count_check"
                  /><span>무한</span></label
                >
                <label>
                  <input
                    type="radio"
                    value="count"
                    v-model="reg.std_count_check"
                  /><span>횟수</span>
                  <input
                    type="text"
                    :disabled="reg.std_count_check == 'infinite'"
                    v-model="reg.std_count"
                  /><span>회</span>
                </label>
              </dd>
              <dd>
                <h6>추가요금</h6>
                <label
                  ><input type="text" v-model="reg.add1_set_min" /><span
                    >분</span
                  ></label
                >
                <label>
                  <input
                    type="text"
                    v-model="reg.add1_price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="reg.add1_count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="reg.add1_count_check"
                  /><span>횟수</span>
                  <input type="text" v-model="reg.add1_count" /><span>회</span>
                </label>
              </dd>
              <dd>
                <h6>추가요금2</h6>
                <label
                  ><input
                    type="text"
                    id="minute"
                    v-model="reg.add2_set_min"
                  /><span>분</span></label
                >
                <label>
                  <input
                    type="text"
                    id="addPrice"
                    v-model="reg.add2_price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="reg.add2_count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="reg.add2_count_check"
                  /><span>횟수</span>
                  <input type="text" v-model="reg.add2_count" /><span>회</span>
                </label>
              </dd>
              <dd>
                <h6>추가요금3</h6>
                <label
                  ><input
                    type="text"
                    id="minute"
                    v-model="reg.add3_set_min"
                  /><span>분</span></label
                >
                <label>
                  <input
                    type="text"
                    id="addPrice"
                    v-model="reg.add3_price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="reg.add3_count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="reg.add3_count_check"
                  /><span>횟수</span>
                  <input type="text" v-model="reg.add3_count" /><span>회</span>
                </label>
              </dd>
            </dl>
            <dl class="step_price">
              <dt>최대요금</dt>
              <dd>
                <h6>일일 최대 요금</h6>
                <label
                  ><input
                    type="checkbox"
                    v-model="reg.maximum_fee_check"
                  /><span>무한</span></label
                >
                <input type="text" v-model="reg.maximum_fee" class="won" /><span
                  >원</span
                >
              </dd>
              <dd>
                <h6>절대 최대 요금</h6>
                <label
                  ><input
                    type="checkbox"
                    v-model="reg.abs_maximum_fee_check"
                  /><span>무한</span></label
                >
                <input
                  type="text"
                  v-model="reg.abs_maximum_fee"
                  class="won"
                /><span>원</span>
              </dd>
            </dl>
            <div class="btns">
              <button @click.prevent="registNew" class="writebtn">등록</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- 수정 팝업 -->
    <div
      class="parking_plan popup modify_pop"
      v-show="modifyIs"
      :class="{ column_1: Object.keys(this.current).length < 8 }"
    >
      <div>
        <h3>{{ titles }} 수정</h3>
        <button @click="modifyClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>적용</dt>
              <dd>
                <label
                  ><input
                    type="radio"
                    value="Y"
                    v-model="current.checkedNames"
                  /><span>Y</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="N"
                    v-model="current.checkedNames"
                  /><span>N</span></label
                >
              </dd>
            </dl>
            <dl>
              <dt>요금제명</dt>
              <dd>
                <input
                  type="text"
                  v-model="current.planName"
                  class="rate_plan"
                />
              </dd>
            </dl>
            <dl>
              <dt>절상/절삭</dt>
              <dd>
                <select v-model="current.unit">
                  <option
                    v-for="(unit, index) in units_list"
                    v-bind:key="index"
                  >
                    {{ unit.text }}
                  </option>
                </select>
                <select v-model="current.estimate">
                  <option
                    v-for="(estimate, index) in estimates_list"
                    v-bind:key="index"
                  >
                    {{ estimate.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl class="step_price">
              <dt>단계별 요금</dt>
              <dd>
                <h6>기본요금<span class="essential">*</span></h6>
                <label
                  ><input type="text" v-model="current.std_set_min" /><span
                    >분</span
                  ></label
                >
                <label
                  ><input
                    type="text"
                    v-model="current.std_price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="current.std_count_check"
                  /><span>무한</span></label
                >
                <label>
                  <input
                    type="radio"
                    value="count"
                    v-model="current.std_count_check"
                  /><span>횟수</span>
                  <input type="text" v-model="current.std_count" /><span
                    >회</span
                  >
                </label>
              </dd>
              <dd>
                <h6>추가요금</h6>
                <label
                  ><input type="text" v-model="current.add1_set_min" /><span
                    >분</span
                  ></label
                >
                <label>
                  <input
                    type="text"
                    v-model="current.add1_price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="current.add1_count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="current.add1_count_check"
                  /><span>횟수</span>
                  <input type="text" v-model="current.add1_count" /><span
                    >회</span
                  >
                </label>
              </dd>
              <dd>
                <h6>추가요금2</h6>
                <label
                  ><input
                    type="text"
                    id="minute"
                    v-model="current.add2_set_min"
                  /><span>분</span></label
                >
                <label>
                  <input
                    type="text"
                    id="addPrice"
                    v-model="current.add2_price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="current.add2_count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="current.add2_count_check"
                  /><span>횟수</span>
                  <input type="text" v-model="current.add2_count" /><span
                    >회</span
                  >
                </label>
              </dd>
              <dd>
                <h6>추가요금3</h6>
                <label
                  ><input
                    type="text"
                    id="minute"
                    v-model="current.add3_set_min"
                  /><span>분</span></label
                >
                <label>
                  <input
                    type="text"
                    id="addPrice"
                    v-model="current.add3_price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="current.add3_count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="current.add3_count_check"
                  /><span>횟수</span>
                  <input type="text" v-model="current.add3_count" /><span
                    >회</span
                  >
                </label>
              </dd>
            </dl>
            <dl class="step_price">
              <dt>최대요금</dt>
              <dd>
                <h6>일일 최대 요금</h6>
                <label
                  ><input
                    type="checkbox"
                    v-model="current.maximum_fee_check"
                  /><span>무한</span></label
                >
                <input
                  type="text"
                  v-model="current.maximum_fee"
                  class="won"
                /><span>원</span>
              </dd>
              <dd>
                <h6>절대 최대 요금</h6>
                <label
                  ><input
                    type="checkbox"
                    v-model="current.abs_maximum_fee_check"
                  /><span>무한</span></label
                >
                <input
                  type="text"
                  v-model="current.abs_maximum_fee"
                  class="won"
                /><span>원</span>
              </dd>
            </dl>
            <div class="btns">
              <button @click.prevent="modifyVehicle" class="modifybtn">
                수정
              </button>
              <button @click.prevent="deleteVehicle" class="deletebtn">
                삭제
              </button>
            </div>
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
        <button @click.prevent="download" class="save_btn">
          <font-awesome-icon icon="save" />저장
        </button>
      </div>
      <ul class="list-title">
        <li>번호</li>
        <li>사용</li>
        <li>요금제명</li>
        <li>기본요금</li>
        <li>추가요금</li>
        <li>일일 최대 요금</li>
        <li>절대 최대 요금</li>
        <li>절삭/절상</li>
        <li class="contents">비고</li>
      </ul>
      <ul class="list-wrap">
        <li
          v-for="(res, index) in time_parking_policy_list"
          :key="index"
          @click="modifyOpen(res)"
        >
          <span> {{ index + 1 }}</span>
          <span class="lp"
            ><input type="text" v-model="res.checkedNames" readonly
          /></span>
          <span><input type="text" v-model="res.planName" readonly/></span>
          <span><input type="text" v-model="res.std_price" readonly/></span>
          <span><input type="text" v-model="res.add1_price" readonly/></span>
          <span><input type="text" v-model="res.maximum_fee" readonly/></span>
          <span
            ><input type="text" v-model="res.abs_maximum_fee" readonly
          /></span>
          <span><input type="text" v-model="res.estimate" readonly/></span>
          <span class="contents"
            ><input
              type="text"
              v-model="res.contents"
              v-on:change="contents_change(index)"
          /></span>
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
  data() {
    return {
      resistIs: false,
      modifyIs: false,
      units_list: [],
      estimates_list: [],
      reg: {
        checkedNames: "N",
        planName: "",
        unit: "",
        estimate: "",
        std_set_min: "30",
        std_price: "1000",
        std_count_check: "count",
        std_count: "1",
        add1_set_min: "10",
        add1_price: "500",
        add1_count_check: "infinite",
        add1_count: "0",
        add2_set_min: "10",
        add2_price: "0",
        add2_count_check: "infinite",
        add2_count: "0",
        add3_set_min: "10",
        add3_price: "0",
        add3_count_check: "infinite",
        add3_count: "0",
        maximum_fee: "infinite",
        maximum_fee_check: true,
        abs_maximum_fee: "infinite",
        abs_maximum_fee_check: true
      },
      current: {},
      time_parking_policy_list: [],
      print_time_parking_policy_list: []
    }
  },
  watch: {
    onlyNumber() {
      return (this.onlyNumber = this.onlyNumber.replace(/[^0-9]/g, ""))
    },
    countIs() {
      // this.countIs = parseInt(this.countIs)
      if (this.countIs > 0) {
        this.textShow = true
      } else {
        this.textShow = false
      }
    },
    countIs2() {
      // this.countIs = parseInt(this.countIs)
      if (this.countIs2 > 0) {
        this.textShow2 = true
      } else {
        this.textShow2 = false
      }
    },
    countIs3() {
      // this.countIs = parseInt(this.countIs)
      if (this.countIs3 > 0) {
        this.textShow3 = true
      } else {
        this.textShow3 = false
      }
    },
    countIs4() {
      // this.countIs = parseInt(this.countIs)
      if (this.countIs4 > 0) {
        this.textShow4 = true
      } else {
        this.textShow4 = false
      }
    },
    countCheck: function() {
      if (this.countCheck === "count") {
        this.countIs = ""
      } else {
        this.countIs = ""
        this.textShow2 = false
        this.textShow3 = false
        this.textShow4 = false
      }
    },
    countCheck2: function() {
      if (this.countCheck2 === "count") {
        this.countIs2 = ""
      } else {
        this.countIs2 = ""
        this.textShow3 = false
        this.textShow4 = false
      }
    },
    countCheck3: function() {
      if (this.countCheck3 === "count") {
        this.countIs3 = ""
      } else {
        this.countIs3 = ""
        this.textShow4 = false
      }
    },
    countCheck4: function() {
      if (this.countCheck4 === "count") {
        this.countIs4 = ""
      } else {
        this.countIs4 = ""
      }
    },
    countCheck5: function() {
      if (this.countCheck5 === "count") {
        this.countIs5 = ""
      } else {
        this.countIs5 = ""
      }
    },
    maxPay: {
      handler() {
        this.maxPay.check = ""
      },
      deep: true
    },
    maxPay2: {
      handler() {
        this.maxPay2.check = ""
      },
      deep: true
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "timeParkingPlanM") this.titles = add.title
        })
      })
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.checkedNames = c.checkedNames
      this.current.planName = c.planName
      this.current.unit = c.unit
      this.current.estimate = c.estimate
      this.current.std_set_min = c.std_set_min
      this.current.std_price = c.std_price
      this.current.std_count_check = c.std_count_check
      this.current.std_count = c.std_count
      this.current.add1_set_min = c.add1_set_min
      this.current.add1_price = c.add1_price
      this.current.add1_count_check = c.add1_count_check
      this.current.add1_count = c.add1_count
      this.current.add2_set_min = c.add2_set_min
      this.current.add2_price = c.add2_price
      this.current.add2_count_check = c.add2_count_check
      this.current.add2_count = c.add2_count
      this.current.add3_set_min = c.add3_set_min
      this.current.add3_price = c.add3_price
      this.current.add3_count_check = c.add3_count_check
      this.current.add3_count = c.add3_count
      this.current.maximum_fee = c.maximum_fee
      this.current.maximum_fee_check = c.maximum_fee_check
      this.current.abs_maximum_fee = c.abs_maximum_fee
      this.current.abs_maximum_fee_check = c.abs_maximum_fee_check
      this.current.time = c.time
      this.current.contents = c.contents
      console.log("c : ", c)
      //  this.modifyIs = false
    },
    modifyClose() {
      this.modifyIs = false
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
      console.log("this.reg : ", this.reg)
      let obj = {}
      obj.checkedNames = this.reg.checkedNames
      obj.planName = this.reg.planName
      obj.unit = this.reg.unit
      obj.estimate = this.reg.estimate
      obj.std_set_min = this.reg.std_set_min
      obj.std_price = this.reg.std_price
      obj.std_count_check = this.reg.std_count_check
      obj.std_count = this.reg.std_count
      obj.add1_set_min = this.reg.add1_set_min
      obj.add1_price = this.reg.add1_price
      obj.add1_count_check = this.reg.add1_count_check
      obj.add1_count = this.reg.add1_count
      obj.add2_set_min = this.reg.add2_set_min
      obj.add2_price = this.reg.add2_price
      obj.add2_count_check = this.reg.add2_count_check
      obj.add2_count = this.reg.add2_count
      obj.add3_set_min = this.reg.add3_set_min
      obj.add3_price = this.reg.add3_price
      obj.add3_count_check = this.reg.add3_count_check
      obj.add3_count = this.reg.add3_count
      obj.maximum_fee = this.reg.maximum_fee
      obj.maximum_fee_check = this.reg.maximum_fee_check
      obj.abs_maximum_fee = this.reg.abs_maximum_fee
      obj.abs_maximum_fee_check = this.reg.abs_maximum_fee_check
      obj.contents = ""
      obj.time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "create_time_parking_policy"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    modifyVehicle() {
      console.log("시간주차 정책 정보 수정")
      this.modifyClose()
      let obj = {}
      obj.checkedNames = this.current.checkedNames
      obj.planName = this.current.planName
      obj.unit = this.current.unit
      obj.estimate = this.current.estimate
      obj.std_set_min = this.current.std_set_min
      obj.std_price = this.current.std_price
      obj.std_count_check = this.current.std_count_check
      obj.std_count = this.current.std_count
      obj.add1_set_min = this.current.add1_set_min
      obj.add1_price = this.current.add1_price
      obj.add1_count_check = this.current.add1_count_check
      obj.add1_count = this.current.add1_count
      obj.add2_set_min = this.current.add2_set_min
      obj.add2_price = this.current.add2_price
      obj.add2_count_check = this.current.add2_count_check
      obj.add2_count = this.current.add2_count
      obj.add3_set_min = this.current.add3_set_min
      obj.add3_price = this.current.add3_price
      obj.add3_count_check = this.current.add3_count_check
      obj.add3_count = this.current.add3_count
      obj.maximum_fee = this.current.maximum_fee
      obj.maximum_fee_check = this.current.maximum_fee_check
      obj.abs_maximum_fee = this.current.abs_maximum_fee
      obj.abs_maximum_fee_check = this.current.abs_maximum_fee_check
      obj.contents = this.current.contents
      obj.time = this.current.time
      obj.update_time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "update_time_parking_policy"
      console.log("obj :", obj)
      console.log("시간주차 정책 정보 수정 후 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("입주사 정보 삭제")
      this.modifyClose()
      let obj = {}
      obj.checkedNames = this.current.checkedNames
      obj.planName = this.current.planName
      obj.unit = this.current.unit
      obj.estimate = this.current.estimate
      obj.std_set_min = this.current.std_set_min
      obj.std_price = this.current.std_price
      obj.std_count_check = this.current.std_count_check
      obj.std_count = this.current.std_count
      obj.add1_set_min = this.current.add1_set_min
      obj.add1_price = this.current.add1_price
      obj.add1_count_check = this.current.add1_count_check
      obj.add1_count = this.current.add1_count
      obj.add2_set_min = this.current.add2_set_min
      obj.add2_price = this.current.add2_price
      obj.add2_count_check = this.current.add2_count_check
      obj.add2_count = this.current.add2_count
      obj.add3_set_min = this.current.add3_set_min
      obj.add3_price = this.current.add3_price
      obj.add3_count_check = this.current.add3_count_check
      obj.add3_count = this.current.add3_count
      obj.maximum_fee = this.current.maximum_fee
      obj.maximum_fee_check = this.current.maximum_fee_check
      obj.abs_maximum_fee = this.current.abs_maximum_fee
      obj.abs_maximum_fee_check = this.current.abs_maximum_fee_check
      obj.contents = this.current.contents
      obj.time = this.current.time
      obj.delete_time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "delete_time_parking_policy"
      this.sendMessage(obj)
    },
    start() {
      this.units_list = config.units_list
      this.estimates_list = config.estimates_list
      this.search()
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    time_parking_policy_fun(data) {
      this.time_parking_policy_list = []
      this.print_time_parking_policy_list = []
      for (let i = 0; i < data.docs.length; i++) {
        let obj = {}
        obj.checkedNames = data.docs[i].checkedNames
        obj.planName = data.docs[i].planName
        obj.unit = data.docs[i].unit
        obj.estimate = data.docs[i].estimate
        obj.std_set_min = data.docs[i].std_set_min
        obj.std_price = data.docs[i].std_price
        obj.std_count_check = data.docs[i].std_count_check
        obj.std_count = data.docs[i].std_count
        obj.add1_set_min = data.docs[i].add1_set_min
        obj.add1_price = data.docs[i].add1_price
        obj.add1_count_check = data.docs[i].add1_count_check
        obj.add1_count = data.docs[i].add1_count
        obj.add2_set_min = data.docs[i].add2_set_min
        obj.add2_price = data.docs[i].add2_price
        obj.add2_count_check = data.docs[i].add2_count_check
        obj.add2_count = data.docs[i].add2_count
        obj.add3_set_min = data.docs[i].add3_set_min
        obj.add3_price = data.docs[i].add3_price
        obj.add3_count_check = data.docs[i].add3_count_check
        obj.add3_count = data.docs[i].add3_count
        obj.maximum_fee = data.docs[i].maximum_fee
        obj.maximum_fee_check = data.docs[i].maximum_fee_check
        obj.abs_maximum_fee = data.docs[i].abs_maximum_fee
        obj.abs_maximum_fee_check = data.docs[i].abs_maximum_fee_check
        obj.contents = data.docs[i].contents
        obj.time = data.docs[i].time
        this.time_parking_policy_list.push(obj)
      }
      let temp = {}
      this.time_parking_policy_list.push(temp)
      this.time_parking_policy_list.pop()
      for (let i = 0; i < this.time_parking_policy_list.length; i++) {
        let print = {}
        print.적용여부 = this.time_parking_policy_list[i].checkedNames
        print.정책이름 = this.time_parking_policy_list[i].planName
        print.단위 = this.time_parking_policy_list[i].unit
        print.절상절상 = this.time_parking_policy_list[i].estimate
        print.기본시간 = this.time_parking_policy_list[i].std_set_min
        print.기본요금 = this.time_parking_policy_list[i].std_price
        print.기본카운터구분 = this.time_parking_policy_list[i].std_count_check
        print.기본카운터 = this.time_parking_policy_list[i].std_count
        print.추가시간1 = this.time_parking_policy_list[i].add1_set_min
        print.추가요금1 = this.time_parking_policy_list[i].add1_price
        print.추가카운터1구분 = this.time_parking_policy_list[
          i
        ].add1_count_check
        print.추가카운터1 = this.time_parking_policy_list[i].add1_count
        print.추가시간2 = this.time_parking_policy_list[i].add2_set_min
        print.추가요금2 = this.time_parking_policy_list[i].add2_price
        print.추가카운터2구분 = this.time_parking_policy_list[
          i
        ].add2_count_check
        print.추가카운터2 = this.time_parking_policy_list[i].add2_count
        print.추가시간3 = this.time_parking_policy_list[i].add3_set_min
        print.추가요금3 = this.time_parking_policy_list[i].add3_price
        print.추가카운터3구분 = this.time_parking_policy_list[
          i
        ].add3_count_check
        print.추가카운터3 = this.time_parking_policy_list[i].add3_count
        print.일일최대요금 = this.time_parking_policy_list[i].maximum_fee
        print.일일체크 = this.time_parking_policy_list[i].maximum_fee_check
        print.절대최대요금 = this.time_parking_policy_list[i].abs_maximum_fee
        print.절대체크 = this.time_parking_policy_list[i].abs_maximum_fee_check
        print.등록일시 = format_time1(
          new Date(this.time_parking_policy_list[i].time)
        )
        print.메모 = this.time_parking_policy_list[i].contents
        this.print_time_parking_policy_list.push(print)
      }
    },
    download() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.print_time_parking_policy_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_시간주차 요금정책_" + postfix + ".xlsx"
      )
    },
    search() {
      var obj = {}
      obj.kind = "get_time_parking_policy"
      obj.id = window.localStorage.getItem("admin_id")
      this.sendMessage(obj)
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_time_parking_policy") {
        this.time_parking_policy_fun(data)
      } else if (
        data.kind === "create_time_parking_policy" ||
        data.kind === "update_time_parking_policy" ||
        data.kind === "delete_time_parking_policy"
      ) {
        this.search()
      }
    })
    this.start()
    this.changeTitle()
  }
}
/*
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
} */

function format_time1(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "." + num_to_str(dat.getMonth() + 1)
  str += "." + num_to_str(dat.getDate())
  str += ". " + num_to_str(dat.getHours())
  str += ":" + num_to_str(dat.getMinutes())
  str += ":" + num_to_str(dat.getSeconds())
  return str
}

function num_to_str($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style></style>
