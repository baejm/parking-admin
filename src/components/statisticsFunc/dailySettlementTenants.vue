<template>
  <div class="report_wrap statistics">
    <!-- 수정팝업 -->
    <div class="modify_pop popup" v-show="modifyIs">
      <div>
        <h3>{{ current.date }} 입주사 일 정산 내용</h3>
        <button @click.prevent="modifyVehicle()" class="modifybtn">
          <font-awesome-icon icon="save" />저장
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>ID</dt>
              <dd>
                <span>{{ current.residentId | currency }}</span>
              </dd>
            </dl>
            <dl>
              <dt>회사명</dt>
              <dd>
                <span>{{ current.company | currency }}</span>
              </dd>
            </dl>
            <dl>
              <dt>유료건수</dt>
              <dd>
                <span>{{ current.pay_length | currency }}건</span>
              </dd>
            </dl>
            <dl>
              <dt>무료건수</dt>
              <dd>
                <span>{{ current.free_length | currency }}건</span>
              </dd>
            </dl>
            <dl>
              <dt>입주사 할인주차시간</dt>
              <dd>
                <span>{{ current.discounted_time | currency }}원</span>
              </dd>
            </dl>
            <dl>
              <dt>입주사 부담금액</dt>
              <dd>
                <span>{{ current.charge | currency }}원</span>
              </dd>
            </dl>
            <div class="btns">
              <button @click="modifyClose" class="pop_close">
                닫기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="title">
      <h2>{{ titles }}</h2>
    </div>
    <form class="menu_title">
      <span class="small_title">날짜</span>
      <input type="date" id="start_time" v-model="search_date" />
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
        <!-- <li
            v-for="(ad, index) in daily_resident_fee_list"
            :key="index"
            @click="modifyOpen(ad)"
          > -->
        <li v-for="(ad, index) in daily_resident_fee_list" :key="index">
          <span>{{ index + 1 }}</span>
          <span>
            {{ ad.id }}
          </span>
          <span> {{ ad.company }}</span>
          <span>{{ ad.fee_vehicle | currency }} </span>
          <span> {{ ad.free_vehicle | currency }} </span>
          <span> {{ ad.discounted_time | currency }} </span>
          <span> {{ ad.resident_fee | currency }} </span>
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
        { title: "ID", sortBy: false, standard: "id" },
        { title: "회사명", sortBy: false, standard: "company" },
        { title: "유료건수(대)", sortBy: false, standard: "fee_vehicle" },
        { title: "무료건수(대)", sortBy: false, standard: "free_vehicle" },
        {
          title: "할인주차시간(분)",
          sortBy: false,
          standard: "discounted_time"
        },
        {
          title: "입주사 부담금액(원)",
          sortBy: false,
          standard: "resident_fee"
        }
      ],
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
  computed: {
    ...mapState(["mainTitle"])
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
    this.changeTitle()
    this.start()
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
        temp10 = _.sortBy(this.daily_resident_fee_list, e.standard)
        temp10.reverse()
        return (this.daily_resident_fee_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.daily_resident_fee_list, e.standard)
        return (this.daily_resident_fee_list = temp10)
      }
    },
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "dailySettlementTenants") this.titles = add.title
        })
      })
    },
    start() {
      this.search_date = format_time2(new Date(Date.now()))
      console.log("this.search_date : ", this.search_date)
    },
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

function format_time2(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "." + num_to_str(dat.getMonth() + 1)
  str += "." + num_to_str(dat.getDate())
  return str
}
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
