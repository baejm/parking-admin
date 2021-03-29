<template>
  <div id="sub_wrap">
    <div class="breadcrumbs">
      <ul>
        <router-link :to="{ name: 'live_vehicle' }">
          <li>Home</li>
        </router-link>
        <li>통계기능</li>
        <li>입주사 일정산</li>
      </ul>
    </div>
    <h1>입주사 일정산</h1>
    <div class="content_wrap">
      <div class="menu_title">
        <form>
          <span class="small_title">날짜</span>
          <input type="date" id="start_time" v-model="search_date" />
          <button @click.prevent="search" class="seach_confirm">검색</button>
          <button @click.prevent="download" class="savebtn">저장</button>
        </form>
      </div>

      <!-- 수정버튼 -->
      <div class="modify_pop popup" v-show="modifyIs">
        <div>
          <h3>{{ current.date }}압주사 일 정산 내용</h3>
          <button @click="modifyClose">
            <font-awesome-icon icon="times-circle" />
          </button>
          <div class="content_popup">
            <ul>
              <li>
                <p>
                  ID
                </p>
                <span>{{ current.residentId | currency }}</span>
              </li>
              <li>
                <p>
                  회사명
                </p>
                <span>{{ current.company | currency }}</span>
              </li>
              <li>
                <p>
                  유료건수
                </p>
                <span>{{ current.pay_length | currency }}건</span>
              </li>
              <li class="clearFix">
                <p>무료건수</p>
                <span>{{ current.free_length | currency }}건</span>
              </li>
              <li>
                <p>입주사 할인주차시간</p>
                <span>{{ current.discounted_time | currency }}원</span>
              </li>
              <li>
                <p>입주사 부담금액</p>
                <span>{{ current.charge | currency }}원</span>
              </li>
            </ul>

            <button @click.prevent="modifyVehicle" class="modifybtn">
              저장
            </button>
          </div>
        </div>
      </div>
      <div class="list-items">
        <div class="list-title">
          <li>
            <span
              >ID<button @click.prevent="item_residentId_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.residentId"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >회사명<button @click.prevent="item_company_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.company"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >유료건수(대)<button @click.prevent="item_pay_length_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.pay_length"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >무료건수(대)<button @click.prevent="item_free_length_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.free_length"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >할인주차시간(분)<button
                @click.prevent="item_discounted_time_length_click"
              >
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.discounted_time_length"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >입주사 부담금액(원)<button @click.prevent="item_charge_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.charge"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
        </div>
        <!-- 리스트 출력부분 -->
        <!-- <spinners v-if="isLoading" /> -->
        <ul class="list-wrap">
          <li
            v-for="(ad, index) in daily_resident_fee_list"
            :key="index"
            @click="modifyOpen(ad)"
          >
            <span class="count_vehicles">
              {{ ad.id }}
            </span>
            <span class="paid_fee"> {{ ad.company }}</span>
            <span class="discount_amount"
              >{{ ad.fee_vehicle | currency }}
            </span>
            <span class="calculate"> {{ ad.free_vehicle | currency }} </span>
            <span class="calculate"> {{ ad.discounted_time | currency }} </span>
            <span class="resident_fee"> {{ ad.resident_fee | currency }} </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config.js"
import _ from "underscore"
import XLSX from "xlsx"
// import spinners from "../components/spinners"
export default {
  data: function() {
    return {
      search_date: "",
      isLoading: false,
      modifyIs: false,
      daily_resident_fee_list: [],
      print_daily_resident_fee_list: [],
      current: {
        date: "",
        residentId: "",
        fee: 0,
        discounted_fee: "",
        paid_fee: "",
        discounted_time: 0,
        resident_fee: ""
      },
      sort_item: {
        date: false,
        total_vehicle_obj_list: false,
        company: false,
        pay_length: false,
        free_length: false,
        discounted_length: false,
        charge: false
      }
    }
  },
  filters: {
    currency: function(value) {
      var num = new Number(value)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    }
  },
  created() {
    // this.isLoading = true
    this.$socket.on("message_from_server", data => {
      //   console.log("data.kind : ", data.kind)
      // this.isLoading = false
      if (data.kind === "get_daily_resident_fee_list") {
        this.daily_resident_fee_list_query(data)
      }
    })
  },
  components: {
    // spinners
  },
  methods: {
    search() {
      let search_date = this.search_date
      console.log("search_date : ", search_date)
      let start_time_text = search_date
      let end_time_text = search_date
      let start_time = get_start_time(start_time_text)
      let end_time = get_end_time(end_time_text)
      console.log(
        start_time,
        end_time,
        format_time1(new Date(start_time)),
        format_time1(new Date(end_time))
      )
      let obj = {}
      obj.kind = "get_daily_resident_fee_list"
      obj.start_time = start_time
      obj.end_time = end_time
      this.sendMessage(obj)
    },
    daily_resident_fee_list_query(data) {
      console.log("data :", data)
      // console.log("resident : ", data.docs[0].resident[0][0].id)
      this.daily_resident_fee_list = []
      this.print_daily_resident_fee_list = []

      for (let i = 0; i < data.docs[0].discounted_info_list.length; i++) {
        let resident_obj = {}
        let obj = data.docs[0].discounted_info_list[i]
        let yy_mm_dd = data.docs[0].yy_mm_dd
        resident_obj.yy_mm_dd = yy_mm_dd
        resident_obj.id = obj.id
        resident_obj.company = obj.company
        resident_obj.free_vehicle = obj.free_vehicle
        resident_obj.fee_vehicle = obj.fee_vehicle

        // obj.date = yy_mm
        if (obj.resident_discounted_time_original) {
          resident_obj.discounted_time = Math.ceil(
            obj.resident_discounted_time_original / (60 * 1000)
          )
          resident_obj.resident_discounted_time_original =
            obj.resident_discounted_time_original
        } else {
          resident_obj.discounted_time = 0
          resident_obj.resident_discounted_time_original = 0
        }
        if (typeof obj.resident_fee !== "number") {
          obj.resident_fee = 0
          resident_obj.resident_fee = obj.resident_fee
        } else {
          resident_obj.resident_fee = obj.resident_fee
        }

        console.log("resident : ", resident_obj)
        resident_obj.date = format_time3(new Date(yy_mm_dd))
        this.daily_resident_fee_list.push(resident_obj)
      }
      for (let k = 0; k < this.daily_resident_fee_list.length; k++) {
        let print = {}
        print.년월 = this.search_date
        print.입주사ID = this.daily_resident_fee_list[k].id
        print.회사명 = this.daily_resident_fee_list[k].company
        print.유료건수 = this.daily_resident_fee_list[k].free_vehicle
        print.무료건수 = this.daily_resident_fee_list[k].fee_vehicle
        print.할인주차시간 = this.daily_resident_fee_list[k].discounted_time
        print.입주사부담금액 = this.daily_resident_fee_list[k].resident_fee
        this.print_daily_resident_fee_list.push(print)
      }
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.date = c.date
      this.current.total_vehicle_obj_list = c.total_vehicle_obj_list
      this.current.fee = c.fee
      this.current.discounted_fee = c.discounted_fee
      this.current.paid_fee = c.paid_fee
      this.current.discounted_time = c.discounted_time
      this.current.resident_fee = c.resident_fee
      this.current.in_vehicle_obj_list_length = c.in_vehicle_obj_list_length
      this.current.pay_length = c.pay_length
      this.current.not_recg_vehicle_obj_list_length =
        c.not_recg_vehicle_obj_list_length
      this.current.registered_vehicle_obj_list_length =
        c.registered_vehicle_obj_list_length
      this.current.reserved_visit_vehicle_obj_list_length =
        c.reserved_visit_vehicle_obj_list_length
      this.current.visited_vehicle_obj_list_length =
        c.visited_vehicle_obj_list_length
      this.current.black_vehicle_obj_list_length =
        c.black_vehicle_obj_list_length
      this.current.general_vehicle_obj_list_length =
        c.general_vehicle_obj_list_length
      this.current.kind = c.kind
      console.log("c : ", c.lp)
      console.log("this : ", this)
    },
    modifyClose() {
      this.modifyIs = false
    },
    item_date_click: function() {
      console.log("date sort")
      let temp10 = []
      if (this.sort_item.date === false) {
        console.log("date sort1")
        this.sort_item.date = true
        temp10 = _.sortBy(this.daily_resident_fee_list, "date")
        temp10.reverse()
        return (this.daily_resident_fee_list = temp10)
      } else {
        console.log("date sort2")
        this.sort_item.date = false
        temp10 = _.sortBy(this.daily_resident_fee_list, "date")
        return (this.daily_resident_fee_list = temp10)
      }
    },
    item_residentId_click: function() {
      console.log("total_vehicle_obj_list sort")
      let temp10 = []
      if (this.sort_item.residentId === false) {
        this.sort_item.residentId = true
        temp10 = _.sortBy(this.daily_resident_fee_list, "residentId")
        temp10.reverse()
        return (this.daily_resident_fee_list = temp10)
      } else {
        this.sort_item.residentId = false
        temp10 = _.sortBy(this.daily_resident_fee_list, "residentId")
        return (this.daily_resident_fee_list = temp10)
      }
    },
    item_company_click: function() {
      console.log("company_ sort")
      let temp10 = []
      if (this.sort_item.company === false) {
        this.sort_item.company = true
        temp10 = _.sortBy(this.daily_resident_fee_list, "company")
        temp10.reverse()
        return (this.daily_resident_fee_list = temp10)
      } else {
        this.sort_item.company = false
        temp10 = _.sortBy(this.daily_resident_fee_list, "company")
        return (this.daily_resident_fee_list = temp10)
      }
    },
    item_pay_length_click: function() {
      let temp10 = []
      if (this.sort_item.pay_length === false) {
        this.sort_item.pay_length = true
        temp10 = _.sortBy(this.daily_resident_fee_list, "pay_length")
        temp10.reverse()
        return (this.daily_resident_fee_list = temp10)
      } else {
        this.sort_item.pay_length = false
        temp10 = _.sortBy(this.daily_resident_fee_list, "pay_length")
        return (this.daily_resident_fee_list = temp10)
      }
    },
    item_free_length_click: function() {
      let temp10 = []
      if (this.sort_item.free_length === false) {
        this.sort_item.free_length = true
        temp10 = _.sortBy(this.daily_resident_fee_list, "free_length")
        temp10.reverse()
        return (this.daily_resident_fee_list = temp10)
      } else {
        this.sort_item.free_length = false
        temp10 = _.sortBy(this.daily_resident_fee_list, "free_length")
        return (this.daily_resident_fee_list = temp10)
      }
    },
    item_discounted_time_length_click: function() {
      let temp10 = []
      if (this.sort_item.discounted_time_length === false) {
        this.sort_item.discounted_length = true
        temp10 = _.sortBy(
          this.daily_resident_fee_list,
          "discounted_time_length"
        )
        temp10.reverse()
        return (this.daily_resident_fee_list = temp10)
      } else {
        this.sort_item.free_length = false
        temp10 = _.sortBy(
          this.daily_resident_fee_list,
          "discounted_time_length"
        )
        return (this.daily_resident_fee_list = temp10)
      }
    },
    item_charge_click: function() {
      let temp10 = []
      if (this.sort_item.charge === false) {
        this.sort_item.charge = true
        temp10 = _.sortBy(this.daily_resident_fee_list, "charge")
        temp10.reverse()
        return (this.daily_resident_fee_list = temp10)
      } else {
        this.sort_item.charge = false
        temp10 = _.sortBy(this.daily_resident_fee_list, "charge")
        return (this.daily_resident_fee_list = temp10)
      }
    },
    download: function() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.print_daily_resident_fee_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_ 입주사 정산리스트_" + postfix + ".xlsx"
      )
    }
  }
}

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
/*
function format_time2(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "." + num_to_str(dat.getMonth() + 1)
  str += "." + num_to_str(dat.getDate())
  return str
} */
function format_time3(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "." + num_to_str(dat.getMonth() + 1)
  return str
}
function num_to_str($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}

// function get_datetime_month_addone(str) {
//   var res = str.split(/[-T.:\s]+/)
//   var d = new Date(parseInt(res[0]), parseInt(res[1]), 0, 0, 0, 0, 0)
//   return d.getTime()
// }

function get_start_time(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(
    parseInt(res[0]),
    parseInt(res[1]) - 1,
    parseInt(res[2]),
    0,
    0,
    0,
    0
  )
  return d.getTime()
}

function get_end_time(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(
    parseInt(res[0]),
    parseInt(res[1]) - 1,
    parseInt(res[2]),
    23,
    59,
    59,
    999
  )
  return d.getTime()
}
// function get_datetime(str) {
//   var res = str.split(/[-T.:\s]+/)
//   var d = new Date(
//     parseInt(res[0]),
//     parseInt(res[1]) - 1,
//     parseInt(res[2]),
//     parseInt(res[3]),
//     parseInt(res[4]),
//     0,
//     0
//   )
//   return d.getTime()
// }
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>

<style scoped></style>
