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
              <dt>요일</dt>
              <dd>
                <select v-model="reg.weekday">
                  <option
                    v-for="(week, index) in weekday_list"
                    v-bind:key="index"
                  >
                    {{ week.text }}
                  </option>
                </select>
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
                  ><input
                    type="text"
                    v-model="reg.time_fee_policy_list[0].set_min"
                  /><span>분</span></label
                >
                <label
                  ><input
                    type="text"
                    v-model="reg.time_fee_policy_list[0].price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="reg.time_fee_policy_list[0].count_check"
                  /><span>무한</span></label
                >
                <label>
                  <input
                    type="radio"
                    value="count"
                    v-model="reg.time_fee_policy_list[0].count_check"
                  /><span>횟수</span>
                  <input
                    type="text"
                    :disabled="
                      reg.time_fee_policy_list[0].count_check == 'infinite'
                    "
                    v-model="reg.time_fee_policy_list[0].count"
                  /><span>회</span>
                </label>
              </dd>
              <dd>
                <h6>추가요금</h6>
                <label
                  ><input
                    type="text"
                    v-model="reg.time_fee_policy_list[1].set_min"
                  /><span>분</span></label
                >
                <label>
                  <input
                    type="text"
                    v-model="reg.time_fee_policy_list[1].price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="reg.time_fee_policy_list[1].count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="reg.time_fee_policy_list[1].count_check"
                  /><span>횟수</span>
                  <input
                    type="text"
                    v-model="reg.time_fee_policy_list[1].count"
                  /><span>회</span>
                </label>
              </dd>
              <dd>
                <h6>추가요금2</h6>
                <label
                  ><input
                    type="text"
                    id="minute"
                    v-model="reg.time_fee_policy_list[2].set_min"
                  /><span>분</span></label
                >
                <label>
                  <input
                    type="text"
                    id="addPrice"
                    v-model="reg.time_fee_policy_list[2].price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="reg.time_fee_policy_list[2].count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="reg.time_fee_policy_list[2].count_check"
                  /><span>횟수</span>
                  <input
                    type="text"
                    v-model="reg.time_fee_policy_list[2].count"
                  /><span>회</span>
                </label>
              </dd>
              <dd>
                <h6>추가요금3</h6>
                <label
                  ><input
                    type="text"
                    id="minute"
                    v-model="reg.time_fee_policy_list[3].set_min"
                  /><span>분</span></label
                >
                <label>
                  <input
                    type="text"
                    id="addPrice"
                    v-model="reg.time_fee_policy_list[3].price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="reg.time_fee_policy_list[3].count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="reg.time_fee_policy_list[3].count_check"
                  /><span>횟수</span>
                  <input
                    type="text"
                    v-model="reg.time_fee_policy_list[3].count"
                  /><span>회</span>
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
              <dt>요일</dt>
              <dd>
                <select v-model="current.weekday">
                  <option
                    v-for="(week, index) in weekday_list"
                    v-bind:key="index"
                  >
                    {{ week.text }}
                  </option>
                </select>
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
                  ><input
                    type="text"
                    v-model="current.time_fee_policy_list[0].set_min"
                  /><span>분</span></label
                >
                <label
                  ><input
                    type="text"
                    v-model="current.time_fee_policy_list[0].price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="current.time_fee_policy_list[0].count_check"
                  /><span>무한</span></label
                >
                <label>
                  <input
                    type="radio"
                    value="count"
                    v-model="current.time_fee_policy_list[0].count_check"
                  /><span>횟수</span>
                  <input
                    type="text"
                    :disabled="
                      current.time_fee_policy_list[0].count_check == 'infinite'
                    "
                    v-model="current.time_fee_policy_list[0].count"
                  /><span>회</span>
                </label>
              </dd>
              <dd>
                <h6>추가요금</h6>
                <label
                  ><input
                    type="text"
                    v-model="current.time_fee_policy_list[1].set_min"
                  /><span>분</span></label
                >
                <label>
                  <input
                    type="text"
                    v-model="current.time_fee_policy_list[1].price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="current.time_fee_policy_list[1].count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="current.time_fee_policy_list[1].count_check"
                  /><span>횟수</span>
                  <input
                    type="text"
                    v-model="current.time_fee_policy_list[1].count"
                  /><span>회</span>
                </label>
              </dd>
              <dd>
                <h6>추가요금2</h6>
                <label
                  ><input
                    type="text"
                    id="minute"
                    v-model="current.time_fee_policy_list[2].set_min"
                  /><span>분</span></label
                >
                <label>
                  <input
                    type="text"
                    id="addPrice"
                    v-model="current.time_fee_policy_list[2].price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="current.time_fee_policy_list[2].count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="current.time_fee_policy_list[2].count_check"
                  /><span>횟수</span>
                  <input
                    type="text"
                    v-model="current.time_fee_policy_list[2].count"
                  /><span>회</span>
                </label>
              </dd>
              <dd>
                <h6>추가요금3</h6>
                <label
                  ><input
                    type="text"
                    id="minute"
                    v-model="current.time_fee_policy_list[3].set_min"
                  /><span>분</span></label
                >
                <label>
                  <input
                    type="text"
                    id="addPrice"
                    v-model="current.time_fee_policy_list[3].price"
                    class="won"
                  /><span>원</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="infinite"
                    v-model="current.time_fee_policy_list[3].count_check"
                  /><span>무한</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="current.time_fee_policy_list[3].count_check"
                  /><span>횟수</span>
                  <input
                    type="text"
                    v-model="current.time_fee_policy_list[3].count"
                  /><span>회</span>
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
        <li v-for="(li, index) in listItem" :key="index">
          <span
            >{{ li.title
            }}<button @click.prevent="upDown_click(li)">
              <font-awesome-icon icon="sort-amount-up" v-if="li.sortBy" />
              <font-awesome-icon icon="sort-amount-down" v-else /></button
          ></span>
        </li>
      </ul>
      <ul class="list-wrap">
        <li
          v-for="(res, index) in time_parking_policy_list"
          :key="index"
          @click.prevent="modifyOpen(res)"
        >
          <span> {{ index + 1 }}</span>
          <span class="lp"
            ><input type="text" v-model="res.checkedNames" readonly
          /></span>
          <span><input type="text" v-model="res.planName" readonly/></span>
          <span><input type="text" v-model="res.weekday" readonly/></span>
          <span
            ><input
              type="text"
              v-model="res.time_fee_policy_list[0].price"
              readonly
          /></span>
          <span
            ><input
              type="text"
              v-model="res.time_fee_policy_list[1].price"
              readonly
          /></span>
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
import _ from "underscore"
import config from "../../config.js"
import { mapState } from "vuex"
import XLSX from "xlsx"
export default {
  data() {
    return {
      listItem: [
        { title: "번호" },
        { title: "사용", sortBy: false, standard: "checkedNames" },
        { title: "요금제명", sortBy: false, standard: "planName" },
        { title: "요일", sortBy: false, standard: "weekday" },
        { title: "기본요금", sortBy: false, standard: "std_price" },
        { title: "추가요금", sortBy: false, standard: "add1_price" },
        { title: "일일 최대 요금", sortBy: false, standard: "maximum_fee" },
        { title: "절대 최대 요금", sortBy: false, standard: "abs_maximum_fee" },
        { title: "절삭/절상", sortBy: false, standard: "estimate" },
        { title: "비고", sortBy: false, standard: "contents" }
      ],
      resistIs: false,
      modifyIs: false,
      weekday_list: [
        {
          text: "평일"
        },
        {
          text: "토요일"
        },
        {
          text: "일요일"
        },
        {
          text: "공휴일"
        }
      ],
      units_list: [],
      estimates_list: [],
      reg: {
        checkedNames: "Y",
        planName: "",
        weekday: "평일",
        unit: "",
        estimate: "",
        time_fee_policy_list: [
          {
            set_min: "30",
            price: "0",
            count_check: "count",
            count: "1"
          },
          {
            set_min: "10",
            price: "0",
            count_check: "infinite",
            count: "0"
          },
          {
            set_min: "10",
            price: "0",
            count_check: "infinite",
            count: "0"
          },
          {
            set_min: "10",
            price: "0",
            count_check: "infinite",
            count: "0"
          }
        ],
        maximum_fee: "infinite",
        maximum_fee_check: true,
        abs_maximum_fee: "infinite",
        abs_maximum_fee_check: true
      },
      current: {
        checkedNames: "Y",
        planName: "",
        weekday: "평일",
        unit: "",
        estimate: "",
        time_fee_policy_list: [
          {
            set_min: "30",
            price: "0",
            count_check: "count",
            count: "1"
          },
          {
            set_min: "10",
            price: "0",
            count_check: "infinite",
            count: "0"
          },
          {
            set_min: "10",
            price: "0",
            count_check: "infinite",
            count: "0"
          },
          {
            set_min: "10",
            price: "0",
            count_check: "infinite",
            count: "0"
          }
        ],
        maximum_fee: "infinite",
        maximum_fee_check: true,
        abs_maximum_fee: "infinite",
        abs_maximum_fee_check: true
      },
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
    upDown_click: function(e) {
      let temp10 = []
      if (e.sortBy === false) {
        this.listItem.forEach(e => {
          e.sortBy = false
        })
        e.sortBy = true
        temp10 = _.sortBy(this.time_parking_policy_list, e.standard)
        temp10.reverse()
        return (this.time_parking_policy_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.time_parking_policy_list, e.standard)
        return (this.time_parking_policy_list = temp10)
      }
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.checkedNames = c.checkedNames
      this.current.planName = c.planName
      this.current.weekday = c.weekday
      this.current.unit = c.unit
      this.current.estimate = c.estimate
      this.current.time_fee_policy_list = []
      this.current.time_fee_policy_list = c.time_fee_policy_list
      this.current.maximum_fee = c.maximum_fee
      this.current.maximum_fee_check = c.maximum_fee_check
      this.current.abs_maximum_fee = c.abs_maximum_fee
      this.current.abs_maximum_fee_check = c.abs_maximum_fee_check
      this.current.time = c.time
      this.current.contents = c.contents
      // console.log("c : ", c)
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
      obj.weekday = this.reg.weekday
      obj.unit = this.reg.unit
      obj.estimate = this.reg.estimate
      obj.time_fee_policy_list = []
      obj.time_fee_policy_list = this.reg.time_fee_policy_list
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
      obj.weekday = this.current.weekday
      obj.unit = this.current.unit
      obj.estimate = this.current.estimate
      obj.time_fee_policy_list = []
      obj.time_fee_policy_list = this.current.time_fee_policy_list
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
      obj.weekday = this.current.weekday
      obj.unit = this.current.unit
      obj.estimate = this.current.estimate
      obj.time_fee_policy_list = []
      obj.time_fee_policy_list = this.current.time_fee_policy_list
      obj.std_set_min = this.current.std_set_min
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
      if (data.docs) {
        for (let i = 0; i < data.docs.length; i++) {
          let obj = {}
          obj.checkedNames = data.docs[i].checkedNames
          obj.planName = data.docs[i].planName
          obj.weekday = data.docs[i].weekday
          obj.unit = data.docs[i].unit
          obj.estimate = data.docs[i].estimate
          obj.time_fee_policy_list = []
          obj.time_fee_policy_list = data.docs[i].time_fee_policy_list
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
          print.요일 = this.time_parking_policy_list[i].weekday
          print.단위 = this.time_parking_policy_list[i].unit
          print.절상절상 = this.time_parking_policy_list[i].estimate
          if (
            this.time_parking_policy_list &&
            this.time_parking_policy_list[i].time_fee_policy_list
          ) {
            print.기본시간 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[0].set_min
            print.기본요금 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[0].price
            print.기본카운터구분 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[0].count_check
            print.기본카운터 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[0].count
            print.추가시간1 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[1].set_min
            print.추가요금1 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[1].price
            print.추가카운터1구분 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[1].count_check
            print.추가카운터1 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[1].count
            print.추가시간2 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[2].set_min
            print.추가요금2 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[2].price
            print.추가카운터2구분 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[2].count_check
            print.추가카운터2 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[2].count
            print.추가시간3 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[3].set_min
            print.추가요금3 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[3].price
            print.추가카운터3구분 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[3].count_check
            print.추가카운터3 = this.time_parking_policy_list[
              i
            ].time_fee_policy_list[3].count
          }
          print.일일최대요금 = this.time_parking_policy_list[i].maximum_fee
          print.일일체크 = this.time_parking_policy_list[i].maximum_fee_check
          print.절대최대요금 = this.time_parking_policy_list[i].abs_maximum_fee
          print.절대체크 = this.time_parking_policy_list[
            i
          ].abs_maximum_fee_check
          print.등록일시 = format_time1(
            new Date(this.time_parking_policy_list[i].time)
          )
          print.메모 = this.time_parking_policy_list[i].contents
          this.print_time_parking_policy_list.push(print)
        }
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
