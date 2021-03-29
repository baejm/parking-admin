<template>
  <div class="report_wrap parkging_info_wrap">
    <div :class="{ modal }"></div>
    <!-- 등록팝업 -->
    <div class="resist_pop popup" v-show="resistIs">
      <div>
        <h3>{{ titles }} 등록</h3>
        <button @click="registClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>차종</dt>
              <dd>
                <input
                  type="text"
                  v-model="setting_vehicle_kind_reg.vehicle_kind"
                />
              </dd>
            </dl>
            <dl>
              <dt>차종명</dt>
              <dd>
                <input
                  type="text"
                  v-model="setting_vehicle_kind_reg.vehicle_kind_name"
                />
              </dd>
            </dl>
            <dl>
              <dt>요금제명</dt>
              <dd>
                <select v-model="setting_vehicle_kind_reg.planName">
                  <option
                    v-for="(planName, index) in plan_name_list"
                    v-bind:key="index"
                  >
                    {{ planName.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>비고</dt>
              <dd>
                <input
                  type="text"
                  v-model="setting_vehicle_kind_reg.contents"
                />
              </dd>
            </dl>
            <div class="btns">
              <button @click.prevent="registNew" class="writebtn">등록</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- 수정팝업 -->
    <div class="modify_pop popup" v-show="modifyIs">
      <div>
        <h3>{{ titles }} 수정</h3>
        <button @click="modifyClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>차종</dt>
              <dd><input type="text" v-model="current.vehicle_kind" /></dd>
            </dl>
            <dl>
              <dt>차종명</dt>
              <dd><input type="text" v-model="current.vehicle_kind_name" /></dd>
            </dl>
            <dl>
              <dt>요금제명</dt>
              <dd>
                <select v-model="current.planName">
                  <option
                    v-for="(planName, index) in plan_name_list"
                    v-bind:key="index"
                  >
                    {{ planName.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>비고</dt>
              <dd><input type="text" v-model="current.contents" /></dd>
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
    <div class="form_window parkingInfo">
      <form>
        <dl>
          <div class="pop_info" v-show="basicInfomation1">
            <dl>
              <dt>
                기본 정보
                <button
                  @click.prevent="
                    modifyVehicle1()
                    infoClose()
                  "
                  class="modifybtn"
                >
                  <font-awesome-icon icon="tools" />적용
                </button>
                <button @click.prevent="infoClose()" class="modify-colse">
                  <font-awesome-icon icon="window-close" />
                </button>
              </dt>
              <dd>
                <span>주차장명 :</span
                ><input type="text" v-model="basic_info.parking_name" />
              </dd>
              <dd>
                <span>주차장 전화번호 :</span
                ><input type="text" v-model="basic_info.parking_phone" />
              </dd>
              <dd>
                <span>주차장 주소 :</span
                ><input type="text" v-model="basic_info.parking_address" />
              </dd>
              <dd>
                <span>주차장 GPS 경도 :</span
                ><input type="text" v-model="basic_info.parking_gps_lat" />
              </dd>
              <dd>
                <span>주차장GPS 위도 :</span
                ><input type="text" v-model="basic_info.parking_gps_lng" />
              </dd>
              <dd>
                <span>주차장 운영상태 :</span
                ><input type="text" v-model="basic_info.parking_run_state" />
              </dd>
              <dd>
                <span>주차장ID</span
                ><input type="text" v-model="basic_info.siteid" />
              </dd>
            </dl>
          </div>
          <dt>
            기본 정보
            <button @click.prevent="openPop1()" class="modifybtn">
              <font-awesome-icon icon="tools" />수정
            </button>
          </dt>
          <dd><span> 주차장명 :</span>{{ basic_info.parking_name }}</dd>
          <dd><span> 주차장 전화번호 :</span>{{ basic_info.parking_phone }}</dd>
          <dd><span> 주차장 주소 :</span>{{ basic_info.parking_address }}</dd>
          <dd>
            <span> 주차장 GPS 경도 :</span>{{ basic_info.parking_gps_lat }}
          </dd>
          <dd>
            <span> 주차장GPS 위도 :</span>{{ basic_info.parking_gps_lng }}
          </dd>
          <dd>
            <span> 주차장 운영상태 :</span>{{ basic_info.parking_run_state }}
          </dd>
          <dd><span> 주차장ID :</span>{{ basic_info.siteid }}</dd>
        </dl>
        <dl>
          <div class="pop_info" v-show="basicInfomation2">
            <dl>
              <dt>
                사업자 정보
                <button
                  @click.prevent="
                    modifyVehicle1()
                    infoClose()
                  "
                  class="modifybtn"
                >
                  <font-awesome-icon icon="tools" />적용
                </button>
                <button @click.prevent="infoClose()" class="modify-colse">
                  <font-awesome-icon icon="window-close" />
                </button>
              </dt>
              <dd>
                <span>주차사업자명</span
                ><input type="text" v-model="company_info.company_name" />
              </dd>
              <dd>
                <span>사업자등록번호</span
                ><input
                  type="text"
                  v-model="company_info.company_registration_number"
                />
              </dd>
              <dd>
                <span>사업자 법인등록번호</span
                ><input
                  type="text"
                  v-model="company_info.company_corporation_number"
                />
              </dd>
              <dd>
                <span>사업자 주소</span
                ><input
                  type="text"
                  v-model="company_info.company_address"
                  class="address"
                />
              </dd>
            </dl>
          </div>
          <dt>
            사업자 정보
            <button @click.prevent="openPop2()" class="modifybtn">
              <font-awesome-icon icon="tools" />수정
            </button>
          </dt>
          <dd><span>주차사업자명 :</span>{{ company_info.company_name }}</dd>
          <dd>
            <span>사업자등록번호 :</span
            >{{ company_info.company_registration_number }}
          </dd>
          <dd>
            <span>사업자 법인등록번호 :</span
            >{{ company_info.company_corporation_number }}
          </dd>
          <dd><span>사업자 주소 :</span>{{ company_info.company_address }}</dd>
        </dl>
        <!--  <dl class="operating_time">
            <div class="pop_info" v-show="basicInfomation3">
              <dl>
                <dt>운영시간
                 <button @click.prevent="modifyVehicle1(); infoClose()" class="modifybtn" >
                  <font-awesome-icon icon="tools" />적용
                  </button>
                  <button @click.prevent="infoClose()" class="modify-colse">
                  <font-awesome-icon icon="window-close" />
                  </button>
                </dt>
             <dd><span>월요일</span><input type="text" v-model="operation_time.mon.start_time"> ~ <input type="text" v-model="operation_time.mon.end_time"></dd>             
             <dd><span>화요일</span><input type="text" v-model="operation_time.tue.start_time"> ~ <input type="text" v-model="operation_time.tue.end_time"></dd>             
             <dd><span>수요일</span><input type="text" v-model="operation_time.wed.start_time"> ~ <input type="text" v-model="operation_time.wed.end_time"></dd>             
             <dd><span>목요일</span><input type="text" v-model="operation_time.thu.start_time"> ~ <input type="text" v-model="operation_time.thu.end_time"></dd>             
             <dd><span>금요일</span><input type="text" v-model="operation_time.fri.start_time"> ~ <input type="text" v-model="operation_time.fri.end_time"></dd>             
             <dd><span>토요일</span><input type="text" v-model="operation_time.sat.start_time"> ~ <input type="text" v-model="operation_time.sat.end_time"></dd>             
             <dd><span>일요일</span><input type="text" v-model="operation_time.sun.start_time"> ~ <input type="text" v-model="operation_time.sun.end_time"></dd>             
             <dd><span>법정공휴일</span><input type="text" v-model="operation_time.legal_holidays.start_time"> ~ <input type="text" v-model="operation_time.legal_holidays.end_time"></dd>                                
              </dl> 
            </div> 
            <dt>운영시간
              <button @click.prevent="openPop3()" class="modifybtn">
             <font-awesome-icon icon="tools" />수정
              </button>
            </dt>
            <dd><span>월요일 :</span>{{operation_time.mon.start_time}} ~
                      {{operation_time.mon.end_time}}</dd> 
             <dd><span>화요일 :</span>{{operation_time.tue.start_time}} ~
                      {{operation_time.tue.end_time}}</dd> 
             <dd><span>수요일 :</span>{{operation_time.wed.start_time}} ~
                      {{operation_time.wed.end_time}}</dd> 
             <dd><span>목요일 :</span>{{operation_time.thu.start_time}} ~
                      {{operation_time.thu.end_time}}</dd> 
             <dd><span>금요일 :</span>{{operation_time.fri.start_time}} ~
                      {{operation_time.fri.end_time}}</dd> 
             <dd><span>토요일 :</span>{{operation_time.sat.start_time}} ~
                      {{operation_time.sat.end_time}}</dd> 
             <dd><span>일요일 :</span>{{operation_time.sun.start_time}} ~
                      {{operation_time.sun.end_time}}</dd> 
             <dd><span>법정공휴일 :</span>{{operation_time.legal_holidays.start_time}} ~
                      {{operation_time.legal_holidays.end_time}}</dd> 
          </dl> -->
        <dl>
          <div class="pop_info" v-show="basicInfomation4">
            <dl>
              <dt>
                요금관리
                <button
                  @click.prevent="
                    infoClose()
                    modifyVehicle1()
                  "
                  class="modifybtn"
                >
                  <font-awesome-icon icon="tools" />적용
                </button>
                <button @click.prevent="infoClose()" class="modify-colse">
                  <font-awesome-icon icon="window-close" />
                </button>
              </dt>
              <!--   <dd><span>1순위</span><input type="text" v-model="procedure.first"></dd>              
            <dd><span>2순위</span><input type="text" v-model="procedure.second"></dd>              
            <dd><span>3순위</span><input type="text" v-model="procedure.third"></dd>   -->
              <dd>
                <span>무료주차시간(회차)(분)</span
                ><input type="text" v-model="procedure.service_time" />
              </dd>
              <dd>
                <span>그래이스시간(분)</span
                ><input type="text" v-model="procedure.grace_time" />
              </dd>
              <dd>
                <span>정산후여유시간(분)</span
                ><input type="text" v-model="procedure.lagtime" />
              </dd>
            </dl>
          </div>
          <dt>
            요금관리
            <button @click.prevent="openPop4()" class="modifybtn">
              <font-awesome-icon icon="tools" />수정
            </button>
          </dt>
          <!--   <dd><span>1순위 :</span>{{procedure.first}}</dd> 
            <dd><span>2순위 :</span>{{procedure.second}}</dd> 
            <dd><span>3순위 :</span>{{procedure.third}}</dd> -->
          <dd>
            <span>무료주차시간(회차)(분) :</span>{{ price_manage.service_time }}
          </dd>
          <dd><span>그래이스시간(분) :</span>{{ price_manage.grace_time }}</dd>
          <dd><span>정산후여유시간(분) :</span>{{ price_manage.lagtime }}</dd>
        </dl>
      </form>
    </div>
    <div class="list-items">
      <div class="writeRecord">
        <h2>요금제</h2>
        <button @click.prevent="registOpen" class="register_btn">
          <font-awesome-icon icon="file-signature" />등록
        </button>
      </div>
      <ul class="list-title">
        <li>차종</li>
        <li>차종명</li>
        <li>요금제명</li>
        <li>기본요금</li>
        <li>추가요금</li>
        <li>일일최대요금</li>
        <li>절대최대요금</li>
        <li>절삭/절상</li>
        <li class="contents">비고</li>
      </ul>
      <ul class="list-wrap">
        <li
          v-for="(plan, index) in plan_list"
          :key="index"
          @click="modifyOpen(plan)"
        >
          <span><input type="text" v-model="plan.vehicle_kind" readonly/></span>
          <span
            ><input type="text" v-model="plan.vehicle_kind_name" readonly
          /></span>
          <span><input type="text" v-model="plan.planName" readonly/></span>
          <span><input type="text" v-model="plan.std_price" readonly/></span>
          <span><input type="text" v-model="plan.add1_price" readonly/></span>
          <span><input type="text" v-model="plan.maximum_fee" readonly/></span>
          <span
            ><input type="text" v-model="plan.abs_maximum_fee" readonly
          /></span>
          <span><input type="text" v-model="plan.estimate" readonly/></span>
          <span class="contents"
            ><input
              type="text"
              v-model="plan.contents"
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
      modal: false,
      basicInfomation1: false,
      basicInfomation2: false,
      basicInfomation3: false,
      basicInfomation4: false,
      resistIs: false,
      modifyIs: false,
      basic_info: {
        parking_name: "하계테크노타운",
        parking_phone: "02-948-5411",
        parking_address: "서울시 노원구 노원로 15길 10",
        parking_gps_lat: "37.641714",
        parking_gps_lng: "127.071495",
        parking_run_state: "YES",
        siteid: "3012"
      },
      company_info: {
        company_name: "선일일렉콤",
        company_registration_number: "216-81-15505",
        company_corporation_number: "110111-1629637",
        company_address: "서울시 노원구 노원로 15길 10 A동 501호"
      },
      operation_time: {
        mon: {
          start_time: "00:00",
          end_time: "24:00"
        },
        tue: {
          start_time: "00:00",
          end_time: "24:00"
        },
        wed: {
          start_time: "00:00",
          end_time: "24:00"
        },
        thu: {
          start_time: "00:00",
          end_time: "24:00"
        },
        fri: {
          start_time: "00:00",
          end_time: "24:00"
        },
        sat: {
          start_time: "00:00",
          end_time: "24:00"
        },
        sun: {
          start_time: "00:00",
          end_time: "24:00"
        },
        legal_holidays: {
          start_time: "00:00",
          end_time: "24:00"
        }
      },
      procedure: {
        first: "min",
        second: "won",
        third: "percent"
      },
      price_manage: {
        service_time: "10",
        grace_time: "0",
        lagtime: "20"
      },
      setting_vehicle_kind_reg: {
        vehicle_kind: "A",
        vehicle_kind_name: "일반요금(A)",
        planName: "일반요금",
        checkedNames: "",
        unit: "",
        estimate: "",
        std_set_min: "",
        std_price: "",
        std_count_check: "",
        std_count: "",
        add1_set_min: "",
        add1_price: "",
        add1_count_check: "",
        add1_count: "",
        add2_set_min: "",
        add2_price: "",
        add2_count_check: "",
        add2_count: "",
        add3_set_min: "",
        add3_price: "",
        add3_count_check: "",
        add3_count: "",
        maximum_fee: "",
        maximum_fee_check: "",
        abs_maximum_fee: "",
        abs_maximum_fee_check: "",
        contents: ""
      },
      plan_name_list: [{ text: "일반요금" }, { text: "표준요금" }],
      plan_list: [],
      current: {
        vehicle_kind: "",
        vehicle_kind_name: "",
        planName: "",
        checkedNames: "",
        unit: "",
        estimate: "",
        std_set_min: "",
        std_price: "",
        std_count_check: "",
        std_count: "",
        add1_set_min: "",
        add1_price: "",
        add1_count_check: "",
        add1_count: "",
        add2_set_min: "",
        add2_price: "",
        add2_count_check: "",
        add2_count: "",
        add3_set_min: "",
        add3_price: "",
        add3_count_check: "",
        add3_count: "",
        maximum_fee: "",
        maximum_fee_check: "",
        absmaximum_fee: "",
        abs_maximum_fee_check: "",
        time: "",
        update_time: "",
        delete_time: "",
        contents: ""
      },
      time_parking_list: [],
      print_plan_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "parkingInformationM") this.titles = add.title
        })
      })
    },
    openPop1() {
      this.basicInfomation1 = true
      this.modal = true
    },
    openPop2() {
      this.basicInfomation2 = true
      this.modal = true
    },
    openPop3() {
      this.basicInfomation3 = true
      this.modal = true
    },
    openPop4() {
      this.basicInfomation4 = true
      this.modal = true
    },
    infoClose() {
      this.basicInfomation1 = false
      this.basicInfomation2 = false
      this.basicInfomation3 = false
      this.basicInfomation4 = false
      this.modal = false
    },
    changeText() {
      if (
        this.procedure.first === "min" &&
        this.procedure.second === "won" &&
        this.procedure.third === "percent"
      ) {
        this.procedure.first = "시간"
        this.procedure.second = "요금"
        this.procedure.third = "단위"
      }
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.vehicle_kind = c.vehicle_kind
      this.current.vehicle_kind_name = c.vehicle_kind_name
      this.current.planName = c.planName
      this.current.checkedNames = c.checkedNames
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
      this.current.add2_count_check = c.add2_count
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
      this.update_time = c.update_time
      this.delete_time = c.delete_time
      this.current.contents = c.contents
      console.log("c : ", c)
    },
    modifyClose() {
      this.modifyIs = false
    },
    registOpen() {
      this.resistIs = true
      this.modifyIs = false
    },
    registClose() {
      this.resistIs = false
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      console.log(
        "this.setting_vehicle_kind_reg : ",
        this.setting_vehicle_kind_reg
      )
      let obj = {}
      obj.vehicle_kind = this.setting_vehicle_kind_reg.vehicle_kind
      obj.vehicle_kind_name = this.setting_vehicle_kind_reg.vehicle_kind_name
      obj.planName = this.setting_vehicle_kind_reg.planName
      for (let i = 0; i < this.time_parking_list.length; i++) {
        if (this.time_parking_list[i].planName === obj.planName) {
          obj.checkedNames = this.time_parking_list[i].checkedNames
          obj.unit = this.time_parking_list[i].unit
          obj.estimate = this.time_parking_list[i].estimate
          obj.std_set_min = this.time_parking_list[i].std_set_min
          obj.std_price = this.time_parking_list[i].std_price
          obj.std_count_check = this.time_parking_list[i].std_count_check
          obj.std_count = this.time_parking_list[i].std_count
          obj.add1_set_min = this.time_parking_list[i].add1_set_min
          obj.add1_price = this.time_parking_list[i].add1_price
          obj.add1_count_check = this.time_parking_list[i].add1_count_check
          obj.add1_count = this.time_parking_list[i].add1_count
          obj.add2_set_min = this.time_parking_list[i].add2_set_min
          obj.add2_price = this.time_parking_list[i].add2_price
          obj.add2_count_check = this.time_parking_list[i].add2_count_check
          obj.add2_count = this.time_parking_list[i].add2_count
          obj.add3_set_min = this.time_parking_list[i].dd3_set_min
          obj.add3_price = this.time_parking_list[i].add3_price
          obj.add3_count_check = this.time_parking_list[i].add3_count_check
          obj.add3_count = this.time_parking_list[i].add3_count
          obj.maximum_fee = this.time_parking_list[i].maximum_fee
          obj.maximum_fee_check = this.time_parking_list[i].maximum_fee_check
          obj.abs_maximum_fee = this.time_parking_list[i].abs_maximum_fee
          obj.abs_maximum_fee_check = this.time_parking_list[
            i
          ].abs_maximum_fee_check
          obj.contents = this.time_parking_list[i].contents
        }
      }
      obj.time = Date.now()
      obj.kind = "create_plan_list1"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    modifyVehicle() {
      console.log("주차장 정보 수정")
      this.modifyClose()
      let obj = {}
      obj.vehicle_kind = this.current.vehicle_kind
      obj.vehicle_kind_name = this.current.vehicle_kind_name
      obj.planName = this.current.planName
      obj.checkedNames = this.current.checkedNames
      obj.unit = this.current.unit
      obj.estimate = this.current.estimates
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
      obj.add3_set_min = this.current.dd3_set_min
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
      obj.kind = "update_plan_list1"
      console.log("주차장 정보 수정 후 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("주차장 정보 삭제")
      this.modifyClose()
      let obj = {}
      obj.vehicle_kind = this.current.vehicle_kind
      obj.vehicle_kind_name = this.current.vehicle_kind_name
      obj.planName = this.current.planName
      obj.checkedNames = this.current.checkedNames
      obj.unit = this.current.unit
      obj.estimate = this.current.estimates
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
      obj.add3_set_min = this.current.dd3_set_min
      obj.add3_price = this.current.add3_price
      obj.add3_count_check = this.current.add3_count_check
      obj.add3_count = this.current.add3_count
      obj.maximum_fee = this.current.maximum_fee
      obj.maximum_fee_check = this.current.modifyVehicle1
      obj.abs_maximum_fee = this.current.abs_maximum_fee
      obj.abs_maximum_fee_check = this.current.abs_maximum_fee_check
      obj.contents = this.current.contents
      obj.time = this.current.time
      obj.delete_time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "delete_plan_list1"
      this.sendMessage(obj)
    },
    modifyVehicle1() {
      console.log("주차장 정보 수정")
      this.modal = true
      this.modifyClose()
      let obj = {}
      obj.basic_info = this.basic_info
      obj.company_info = this.company_info
      obj.operation_time = this.operation_time
      obj.procedure = this.procedure
      obj.price_manage = this.price_manage
      obj.time = this.time
      obj.update_time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "update_plan_list"
      console.log("주차장 정보 수정 후 :", obj)
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    search() {
      let obj = {}
      obj.kind = "get_plan_list"
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.admin_pw = window.localStorage.getItem("admin_pw")
      this.sendMessage(obj)
    },
    search1() {
      let obj = {}
      obj.kind = "get_plan_list1"
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.admin_pw = window.localStorage.getItem("admin_pw")
      this.sendMessage(obj)
    },
    plan_list_fun(data) {
      console.log("plan_list_fun : ", data, data.docs.length)
      if (data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          console.log("fun data.docs : ", data.docs)
          this.basic_info = data.docs[0].basic_info
          this.company_info = data.docs[0].company_info
          this.operation_time = data.docs[0].operation_time
          this.procedure = data.docs[0].procedure
          this.price_manage = data.docs[0].price_manage
        }
      } else {
        let obj = {}
        let basic_info = {
          parking_name: "하계테크노타운",
          parking_phone: "02-948-5411",
          parking_address: "서울시 노원구 노원로 15길 10",
          parking_gps_lat: "37.641714",
          parking_gps_lng: "127.071495",
          parking_run_state: "YES"
        }
        let company_info = {
          company_name: "선일일렉콤",
          company_registration_number: "216-81-15505",
          company_corporation_number: "110111-1629637",
          company_address: "서울시 노원구 노원로 15길 10 A동 501호"
        }
        let operation_time = {
          mon: {
            start_time: "00:00",
            end_time: "24:00"
          },
          tue: {
            start_time: "00:00",
            end_time: "24:00"
          },
          wed: {
            start_time: "00:00",
            end_time: "24:00"
          },
          thu: {
            start_time: "00:00",
            end_time: "24:00"
          },
          fri: {
            start_time: "00:00",
            end_time: "24:00"
          },
          sat: {
            start_time: "00:00",
            end_time: "24:00"
          },
          sun: {
            start_time: "00:00",
            end_time: "24:00"
          },
          legal_holidays: {
            start_time: "00:00",
            end_time: "24:00"
          }
        }
        let procedure = {
          first: "min",
          second: "won",
          third: "percent"
        }
        let price_manage = {
          service_time: "10",
          grace_time: "0",
          lagtime: "20"
        }
        obj.basic_info = basic_info
        obj.company_info = company_info
        obj.operation_time = operation_time
        obj.procedure = procedure
        obj.price_manage = price_manage
        obj.kind = "create_plan_list"
        obj.admin_id = window.localStorage.getItem("admin_id")
        this.sendMessage(obj)
      }
    },
    plan_list_fun1(data) {
      console.log("plan_list_fun : ", data, data.docs.length)
      this.plan_list = []
      if (data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          console.log("fun1 data.docs : ", data.docs)
          let obj = {}
          obj.vehicle_kind = data.docs[i].vehicle_kind
          obj.vehicle_kind_name = data.docs[i].vehicle_kind_name
          obj.planName = data.docs[i].planName
          obj.checkedNames = data.docs[i].checkedNames
          obj.unit = data.docs[i].unit
          obj.estimate = data.docs[i].estimate
          obj.std_set_min = data.docs[i].std_set_min
          obj.std_price = data.docs[i].std_price
          obj.std_count_check = data.docs[i].std_count_check
          obj.checkedNames = data.docs[i].checkedNames
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
          obj.time = data.docs[i].time
          if (data.docs[i].update_time) {
            obj.update_time = data.docs[i].update_time
          } else {
            obj.update_time = ""
          }
          if (data.docs[i].delete_time) {
            obj.delete_time = data.docs[i].delete_time
          } else {
            obj.delete_time = ""
          }
          obj.contents = data.docs[i].contents
          this.plan_list.push(obj)
        }
        let temp = {}
        this.plan_list.push(temp)
        this.plan_list.pop()
        this.print_plan_list = []
        for (let i = 0; i < this.plan_list.length; i++) {
          let print = {}
          print.차종 = this.plan_list[i].vehicle_kind
          print.차종이름 = this.plan_list[i].vehicle_kind_name
          print.요금제명 = this.plan_list[i].planName
          print.사용 = this.plan_list[i].checkedNames
          print.단위 = this.plan_list[i].unit
          print.절상절삭 = this.plan_list[i].estimate
          print.기본시간 = this.plan_list[i].std_set_min
          print.기본요금 = this.plan_list[i].std_price
          print.기본카운터체크 = this.plan_list[i].std_count_check
          print.기본카운터 = this.plan_list[i].std_count
          print.추가시간1 = this.plan_list[i].add1_set_min
          print.추가요금1 = this.plan_list[i].add1_price
          print.추가카운터체크1 = this.plan_list[i].add1_count_check
          print.추가카운터1 = this.plan_list[i].add1_count
          print.추가시간2 = this.plan_list[i].add2_set_min
          print.추가요금2 = this.plan_list[i].add2_price
          print.추가카운터체크2 = this.plan_list[i].add2_count_check
          print.추가카운터2 = this.plan_list[i].add2_count
          print.추가시간3 = this.plan_list[i].add3_set_min
          print.추가요금3 = this.plan_list[i].add3_price
          print.추가카운터체크3 = this.plan_list[i].add3_count_check
          print.추가카운터3 = this.plan_list[i].add3_count
          print.일일최대요금 = this.plan_list[i].maximum_fee
          print.일일최대요금체크 = this.plan_list[i].maximum_fee_check
          print.절대최대요금 = this.plan_list[i].abs_maximum_fee
          print.절대최대요금체크 = this.plan_list[i].abs_maximum_fee_check
          print.등록시각 = this.plan_list[i].time
          print.수정시각 = this.plan_list[i].update_time
          print.삭제시각 = this.plan_list[i].dalete_time
          print.비고 = this.plan_list[i].contents
          this.print_plan_list.push(print)
        }
      }
    },
    get_time_parking_fun(data) {
      console.log("get_time_parking_fun : ", data)
      this.time_parking_list = data.docs
      this.plan_name_list = []
      for (let i = 0; i < this.time_parking_list.length; i++) {
        let plan_name = {}
        plan_name.text = this.time_parking_list[i].planName
        this.plan_name_list.push(plan_name)
      }
    },
    start() {
      // this.manager_list = config.manager_list
      let obj = {}
      obj.kind = "get_time_parking_policy"
      obj.admin_id = window.localStorage.getItem("admin_id")
      console.log("get_time_parking_policy : ", obj)
      this.sendMessage(obj)

      this.search()
      this.search1()
    },
    download() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.print_plan_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_주차장 요금 관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_plan_list") {
        this.plan_list_fun(data)
        this.changeText()
      } else if (
        data.kind === "create_plan_list" ||
        data.kind === "update_plan_list" ||
        data.kind === "delete_plan_list"
      ) {
        this.search()
      } else if (data.kind === "get_plan_list1") {
        this.plan_list_fun1(data)
      } else if (
        data.kind === "create_plan_list1" ||
        data.kind === "update_plan_list1" ||
        data.kind === "delete_plan_list1"
      ) {
        this.search1()
      } else if (data.kind === "get_time_parking_policy") {
        console.log(' else if(data.kind === "get_time_parking_list")', data)
        this.get_time_parking_fun(data)
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
}
*/
/*
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
} */
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style></style>
