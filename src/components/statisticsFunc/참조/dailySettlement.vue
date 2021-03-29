<template>
  <div id="sub_wrap">
    <div class="breadcrumbs">
      <ul>
        <router-link :to="{ name: 'live_vehicle' }">
          <li>Home</li>
        </router-link>
        <li>통계기능</li>
        <li>일정산</li>
      </ul>
    </div>
    <h1>일정산</h1>
    <div class="content_wrap">
      <div class="menu_title">
        <form>
          <span class="small_title">연도</span>

          <select v-model="searchYear">
            <option v-for="(y, index) in dateSelect.year" v-bind:key="index"
              >{{ y.text }}
            </option></select
          >
          <span class="small_title">월</span>
          <select v-model="searchMonth">
            <option v-for="(m, index) in dateSelect.month" v-bind:key="index"
              >{{ m.text }}
            </option></select
          >
          <button @click.prevent="search" class="seach_confirm">검색</button>
          <button @click.prevent="download" class="savebtn">저장</button>
        </form>
      </div>

      <!-- 수정버튼 -->
      <div class="modify_pop popup" v-show="modifyIs">
        <div>
          <h3>{{ current.date }}일 정산 내용</h3>
          <button @click="modifyClose">
            <font-awesome-icon icon="times-circle" />
          </button>
          <div class="content_popup">
            <ul>
              <li>
                <p>
                  차량대수
                </p>
                <span>{{ current.total_vehicle_obj_list | currency }}대</span>
              </li>
              <li>
                <p>
                  입차차량
                </p>
                <span
                  >{{ current.in_vehicle_obj_list_length | currency }}대</span
                >
              </li>
              <li>
                <p>
                  출차차량
                </p>
                <span
                  >{{ current.out_vehicle_obj_list_length | currency }}대</span
                >
              </li>
              <li class="clearFix">
                <p>등록차량</p>
                <span
                  >{{
                    current.registered_vehicle_obj_list_length | currency
                  }}대</span
                >
              </li>
              <li>
                <p>방문차량</p>
                <span
                  >{{
                    current.visited_vehicle_obj_list_length | currency
                  }}대</span
                >
              </li>
              <li>
                <p>
                  일반차량
                </p>
                <span
                  >{{
                    current.general_vehicle_obj_list_length | currency
                  }}대</span
                >
              </li>
              <li>
                <p>
                  방문예약차량
                </p>
                <span
                  >{{
                    current.reserved_visit_vehicle_obj_list_length | currency
                  }}대</span
                >
              </li>
              <li>
                <p>미인식차량</p>
                <span
                  >{{
                    current.not_recg_vehicle_obj_list_length | currency
                  }}대</span
                >
              </li>
              <li class="clearFix">
                <p>
                  주차요금
                </p>
                <span>{{ current.fee | currency }}원</span>
              </li>
              <li>
                <p>할인금액</p>
                <span>{{ current.discounted_fee | currency }}원</span>
              </li>
              <li>
                <p>
                  정산금액
                </p>
                <span>{{ current.paid_fee | currency }}원</span>
              </li>
              <li>
                <p>
                  입주사 부담금액
                </p>
                <span>{{ current.resident_fee | currency }}원</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="list-items">
        <div class="list-title">
          <li>
            <span
              >일자<button @click.prevent="item_date_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.date"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >차량대수<button
                @click.prevent="item_total_vehicle_obj_list_click"
              >
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.total_vehicle_obj_list"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >주차요금<button @click.prevent="item_fee_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.fee"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >할인금액<button @click.prevent="item_discounted_fee_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.discounted_fee"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >정산금액<button @click.prevent="item_paid_fee_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.paid_fee"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
          <li>
            <span
              >입주사 부담금액<button @click.prevent="resident_fee_click">
                <font-awesome-icon
                  icon="caret-down"
                  v-if="sort_item.resident_fee"
                /><font-awesome-icon icon="caret-up" v-else /></button
            ></span>
          </li>
        </div>
        <!-- 리스트 출력부분 -->
        <!-- <spinners v-if="isLoading" /> -->
        <ul class="list-wrap">
          <li
            v-for="(ad, index) in daily_stat_list"
            :key="index"
            @click="modifyOpen(ad)"
          >
            <span class="startTime">
              {{ ad.date }}
            </span>
            <span class="count_vehicles">
              {{ ad.total_vehicle_obj_list | currency }}대
            </span>
            <span class="paid_fee"> {{ ad.fee | currency }}원</span>
            <span class="discount_amount"
              >{{ ad.discounted_fee | currency }}원
            </span>
            <span class="calculate"> {{ ad.paid_fee | currency }}원 </span>
            <span class="resident_fee">
              {{ ad.resident_fee | currency }}원
            </span>
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
      dateSelect: {
        year: [
          { text: "2020" },
          { text: "2021" },
          { text: "2022" },
          { text: "2023" },
          { text: "2024" },
          { text: "2025" },
          { text: "2026" },
          { text: "2027" },
          { text: "2028" },
          { text: "2029 " }
        ],
        month: [
          { text: "01" },
          { text: "02" },
          { text: "03" },
          { text: "04" },
          { text: "05" },
          { text: "06" },
          { text: "07" },
          { text: "08" },
          { text: "09" },
          { text: "10" },
          { text: "11" },
          { text: "12" }
        ]
      },
      isLoading: false,
      searchMonth: "01",
      searchYear: "2019",
      modifyIs: false,
      daily_stat_list: [],
      print_daily_stat_list: [],
      current: {
        date: "",
        total_vehicle_obj_list: "",
        fee: "",
        discounted_fee: "",
        paid_fee: "",
        resident_fee: ""
      },
      sort_item: {
        date: false,
        total_vehicle_obj_list: false,
        fee: false,
        discounted_fee: false,
        paid_fee: false,
        resident_fee: false
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
      if (data.kind === "get_daily_stat_list") {
        this.daily_stat_list_query(data)
      }
    }),
      this.start()
  },
  components: {
    // spinners
  },
  methods: {
    search() {
      console.log("검색 버튼을 눌렀습니다.")
      let month = this.searchYear + "." + this.searchMonth
      // month = "2020.06"
      let start_time_text = month + ".01.00:00:00"
      let end_time_text = format_time1(
        new Date(get_datetime_month_addone(month))
      )
      console.log(
        "start_time_text : ",
        start_time_text,
        " end_time_text :",
        end_time_text
      )
      let start_time = get_start_time(start_time_text)
      let end_time = get_end_time(end_time_text)
      console.log(
        start_time,
        end_time,
        format_time1(new Date(start_time)),
        format_time1(new Date(end_time))
      )
      let obj = {}
      obj.kind = "get_daily_stat_list"
      obj.start_time = start_time
      obj.end_time = end_time
      this.sendMessage(obj)
    },
    daily_stat_list_query(data) {
      this.daily_stat_list = []
      for (let i = 0; i < data.docs.length; i++) {
        let obj = data.docs[i].daily_stat_list
        console.log(obj)
        obj.date = format_time2(new Date(obj.day_loop_event_time))
        this.daily_stat_list.push(obj)
      }
      this.print_daily_stat_list = []
      for (let i = 0; i < this.daily_stat_list.length; i++) {
        let print = {}
        print.일자 = this.daily_stat_list[i].date
        print.차량대수 = this.daily_stat_list[i].total_vehicle_obj_list
        print.입차대수 = this.daily_stat_list[i].in_vehicle_obj_list_length
        print.출차대수 = this.daily_stat_list[i].out_vehicle_obj_list_length
        print.등록차량 = this.daily_stat_list[
          i
        ].registered_vehicle_obj_list_length
        print.방문차량 = this.daily_stat_list[i].visited_vehicle_obj_list_length
        print.방문예약차량 = this.daily_stat_list[
          i
        ].reserved_visit_vehicle_obj_list_length
        print.일반차량 = this.daily_stat_list[i].general_vehicle_obj_list_length
        print.미인식 = this.daily_stat_list[i].not_recg_vehicle_obj_list_length
        print.주차요금 = this.daily_stat_list[i].fee
        print.정산금액 = this.daily_stat_list[i].paid_fee
        print.입주사부담금액 = this.daily_stat_list[i].resident_fee
        this.print_daily_stat_list.push(print)
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
      this.current.resident_fee = c.resident_fee
      this.current.in_vehicle_obj_list_length = c.in_vehicle_obj_list_length
      this.current.out_vehicle_obj_list_length = c.out_vehicle_obj_list_length
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
        temp10 = _.sortBy(this.daily_stat_list, "date")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("date sort2")
        this.sort_item.date = false
        temp10 = _.sortBy(this.daily_stat_list, "date")
        return (this.daily_stat_list = temp10)
      }
    },
    item_total_vehicle_obj_list_click: function() {
      console.log("total_vehicle_obj_list sort")
      let temp10 = []
      if (this.sort_item.total_vehicle_obj_list === false) {
        console.log("total_vehicle_obj_list sort1")
        this.sort_item.total_vehicle_obj_list = true
        temp10 = _.sortBy(this.daily_stat_list, "total_vehicle_obj_list")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("total_vehicle_obj_list sort2")
        this.sort_item.total_vehicle_obj_list = false
        temp10 = _.sortBy(this.daily_stat_list, "total_vehicle_obj_list")
        return (this.daily_stat_list = temp10)
      }
    },
    item_fee_click: function() {
      console.log("fee sort")
      let temp10 = []
      if (this.sort_item.fee === false) {
        console.log("fee sort1")
        this.sort_item.fee = true
        temp10 = _.sortBy(this.daily_stat_list, "fee")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("fee sort2")
        this.sort_item.fee = false
        temp10 = _.sortBy(this.daily_stat_list, "fee")
        return (this.daily_stat_list = temp10)
      }
    },
    item_discounted_fee_click: function() {
      console.log("discounted_fee sort")
      let temp10 = []
      if (this.sort_item.discounted_fee === false) {
        console.log("discounted_fee sort1")
        this.sort_item.discounted_fee = true
        temp10 = _.sortBy(this.daily_stat_list, "discounted_fee")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("discounted_fee sort2")
        this.sort_item.discounted_fee = false
        temp10 = _.sortBy(this.daily_stat_list, "discounted_fee")
        return (this.daily_stat_list = temp10)
      }
    },
    item_paid_fee_click: function() {
      console.log("paid_fee sort")
      let temp10 = []
      if (this.sort_item.paid_fee === false) {
        console.log("paid_fee sort1")
        this.sort_item.paid_fee = true
        temp10 = _.sortBy(this.daily_stat_list, "paid_fee")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("paid_fee sort2")
        this.sort_item.paid_fee = false
        temp10 = _.sortBy(this.daily_stat_list, "paid_fee")
        return (this.daily_stat_list = temp10)
      }
    },
    item_resident_fee_click: function() {
      console.log("resident_fee sort")
      let temp10 = []
      if (this.sort_item.resident_fee === false) {
        console.log("resident_fee sort1")
        this.sort_item.resident_fee = true
        temp10 = _.sortBy(this.daily_stat_list, "resident_fee")
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        console.log("resident_fee sort2")
        this.sort_item.resident_fee = false
        temp10 = _.sortBy(this.daily_stat_list, "resident_fee")
        return (this.daily_stat_list = temp10)
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
      const data = XLSX.utils.json_to_sheet(this.print_daily_stat_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(wb, config.parking_name + "일 정산_" + postfix + ".xlsx")
    },
    start() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      this.searchYear = year
      this.searchMonth = month
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
function format_time2(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "." + num_to_str(dat.getMonth() + 1)
  str += "." + num_to_str(dat.getDate())
  return str
}
function num_to_str($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
function get_datetime_month_addone(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(parseInt(res[0]), parseInt(res[1]), 0, 0, 0, 0, 0)
  return d.getTime()
}
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
