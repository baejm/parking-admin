<template>
  <div class="report_wrap statistics">
    <!-- 수정팝업 -->
    <div class="modify_pop popup" v-show="modifyIs">
      <div>
        <h3>{{ current.date }}일 정산 내용</h3>
        <button @click="modifyClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>차량대수</dt>
              <dd>
                <span>{{ current.total_vehicle_obj_list | currency }}대</span>
              </dd>
            </dl>
            <dl>
              <dt>입차차량</dt>
              <dd>
                <span
                  >{{ current.in_vehicle_obj_list_length | currency }}대</span
                >
              </dd>
            </dl>
            <dl>
              <dt>출차차량</dt>
              <dd>
                <span>{{
                  current.out_vehicle_obj_list_length | currency
                }}</span>
              </dd>
            </dl>
            <dl>
              <dt>등록차량</dt>
              <dd>
                <span
                  >{{
                    current.registered_vehicle_obj_list_length | currency
                  }}대</span
                >
              </dd>
            </dl>
            <dl>
              <dt>방문차량</dt>
              <dd>
                <span
                  >{{
                    current.visited_vehicle_obj_list_length | currency
                  }}대</span
                >
              </dd>
            </dl>
            <dl>
              <dt>일반차량</dt>
              <dd>
                <span
                  >{{
                    current.general_vehicle_obj_list_length | currency
                  }}대</span
                >
              </dd>
            </dl>
            <dl>
              <dt>방문예약차량</dt>
              <dd>
                <span
                  >{{
                    current.reserved_visit_vehicle_obj_list_length | currency
                  }}대</span
                >
              </dd>
            </dl>
            <dl>
              <dt>미인식차량</dt>
              <dd>
                <span
                  >{{
                    current.not_recg_vehicle_obj_list_length | currency
                  }}대</span
                >
              </dd>
            </dl>
          </form>
        </div>
      </div>
    </div>
    <div class="title">
      <h2>{{ titles }}</h2>
    </div>
    <form class="menu_title">
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
      <button @click.prevent="search" type="submit">
        <font-awesome-icon icon="search" />
      </button>
    </form>

    <div class="list-items">
      <div class="writeRecord">
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
      <!-- 리스트 출력부분 -->
      <!-- <spinners v-if="isLoading" /> -->
      <ul class="list-wrap">
        <li v-for="(ad, index) in daily_stat_list" :key="index">
          <!--  <li
            v-for="(ad, index) in daily_stat_list"
            :key="index"
            @click="modifyOpen(ad)"
          > -->
          <span>
            {{ index + 1 }}
          </span>
          <span>
            {{ ad.date }}
          </span>
          <span> {{ ad.total_vehicle_obj_list | currency }}대 </span>
          <span> {{ ad.in_vehicle_obj_list_length | currency }}대</span>
          <span>{{ ad.out_vehicle_obj_list_length | currency }}대 </span>
          <span>
            {{ ad.registered_vehicle_obj_list_length | currency }}대
          </span>
          <span> {{ ad.visited_vehicle_obj_list_length | currency }}대 </span>
          <span> {{ ad.general_vehicle_obj_list_length | currency }}대 </span>
          <span> {{ ad.not_recg_vehicle_obj_list_length | currency }}대 </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from "../../config.js"
import _ from "underscore"
import XLSX from "xlsx"
import { mapState } from "vuex"
// import spinners from "../components/spinners"
export default {
  data: function() {
    return {
      listItem: [
        { title: "번호" },
        { title: "날짜", sortBy: false, standard: "date" },
        {
          title: "차량대수",
          sortBy: false,
          standard: "total_vehicle_obj_list"
        },
        {
          title: "입차차량",
          sortBy: false,
          standard: "in_vehicle_obj_list_length"
        },
        {
          title: "출차차량",
          sortBy: false,
          standard: "out_vehicle_obj_list_length"
        },
        {
          title: "등록차량",
          sortBy: false,
          standard: "registered_vehicle_obj_list_length"
        },
        {
          title: "방문예약차량",
          sortBy: false,
          standard: "visited_vehicle_obj_list_length"
        },
        {
          title: "일반차량",
          sortBy: false,
          standard: "general_vehicle_obj_list_length"
        },
        {
          title: "미인식차량",
          sortBy: false,
          standard: "not_recg_vehicle_obj_list_length"
        }
      ],
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
    this.changeTitle()
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  components: {
    // spinners
  },
  methods: {
    upDown_click: function(e) {
      let temp10 = []
      if (e.sortBy === false) {
        this.listItem.forEach(e => {
          e.sortBy = false
        })
        e.sortBy = true
        temp10 = _.sortBy(this.daily_stat_list, e.standard)
        temp10.reverse()
        return (this.daily_stat_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.daily_stat_list, e.standard)
        return (this.daily_stat_list = temp10)
      }
    },
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "dailySettlement") this.titles = add.title
        })
      })
    },
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
