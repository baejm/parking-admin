<template>
  <div class="report_wrap">
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
              <dt>적용여부:</dt>
              <dd>
                <select v-model="r.used">
                  <option v-for="(app, index) in app_list" v-bind:key="index">
                    {{ app.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>상품명:</dt>
              <dd><input type="text" v-model="r.parking_product_name" /></dd>
            </dl>
            <dl>
              <dt>분류1:</dt>
              <dd>
                <select v-model="r.kind1">
                  <option
                    v-for="(kind1, index) in kind1_list"
                    v-bind:key="index"
                  >
                    {{ kind1.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>분류2:</dt>
              <dd>
                <div v-if="r.kind1 === '월정기주차'">
                  <select v-model="r.kind2">
                    <option
                      v-for="(month, index) in month_product_list"
                      v-bind:key="index"
                    >
                      {{ month.text }}
                    </option>
                  </select>
                </div>
                <div v-if="r.kind1 === '일일주차'">
                  <select v-model="r.kind2">
                    <option
                      v-for="(day, index) in day_product_list"
                      v-bind:key="index"
                    >
                      {{ day.text }}
                    </option>
                  </select>
                </div>
                <div v-if="r.kind1 === '시간'">
                  <select v-model="r.kind2">
                    <option
                      v-for="(time, index) in time_product_list"
                      v-bind:key="index"
                    >
                      {{ timw.text }}
                    </option>
                  </select>
                </div>
              </dd>
            </dl>
            <dl>
              <dt>적용시점:</dt>
              <dd>
                <select v-model="r.app_time">
                  <option
                    v-for="(app_time, index) in app_time_list"
                    v-bind:key="index"
                  >
                    {{ app_time.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>출차제한:</dt>
              <dd>
                <select v-model="r.output_vehicle_limit">
                  <option
                    v-for="(output_vehicle_limit,
                    index) in output_vehicle_limit_list"
                    v-bind:key="index"
                  >
                    {{ output_vehicle_limit.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>차종:</dt>
              <dd>
                <select v-model="r.kind_vehicle">
                  <option
                    v-for="(kind_vehicle, index) in kind_vehicle_list"
                    v-bind:key="index"
                  >
                    {{ kind_vehicle.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>정상가격:</dt>
              <dd><input type="text" v-model="r.normal_price" /></dd>
            </dl>
            <dl>
              <dt>주차요금:</dt>
              <dd><input type="text" v-model="r.parking_price" /></dd>
            </dl>
            <dl>
              <dt>비고:</dt>
              <dd><input type="text" v-model="r.contents" /></dd>
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
              <dt>적용여부:</dt>
              <dd>
                <select v-model="m.used">
                  <option v-for="(app, index) in app_list" v-bind:key="index">
                    {{ app.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>상품명:</dt>
              <dd><input type="text" v-model="m.parking_product_name" /></dd>
            </dl>
            <dl>
              <dt>분류1:</dt>
              <dd>
                <select v-model="m.kind1">
                  <option
                    v-for="(kind1, index) in kind1_list"
                    v-bind:key="index"
                  >
                    {{ kind1.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>분류2:</dt>
              <dd>
                <div v-if="m.kind1 === '월정기주차'">
                  <select v-model="m.kind2">
                    <option
                      v-for="(month, index) in month_product_list"
                      v-bind:key="index"
                    >
                      {{ month.text }}
                    </option>
                  </select>
                </div>
                <div v-if="m.kind1 === '일일주차'">
                  <select v-model="m.kind2">
                    <option
                      v-for="(day, index) in day_product_list"
                      v-bind:key="index"
                    >
                      {{ day.text }}
                    </option>
                  </select>
                </div>
                <div v-if="m.kind1 === '시간'">
                  <select v-model="m.kind2">
                    <option
                      v-for="(time, index) in time_product_list"
                      v-bind:key="index"
                    >
                      {{ timw.text }}
                    </option>
                  </select>
                </div>
              </dd>
            </dl>
            <dl>
              <dt>적용시점:</dt>
              <dd>
                <select v-model="m.app_time">
                  <option
                    v-for="(app_time, index) in app_time_list"
                    v-bind:key="index"
                  >
                    {{ app_time.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>출차제한:</dt>
              <dd>
                <select v-model="m.output_vehicle_limit">
                  <option
                    v-for="(output_vehicle_limit,
                    index) in output_vehicle_limit_list"
                    v-bind:key="index"
                  >
                    {{ output_vehicle_limit.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>차종:</dt>
              <dd>
                <select v-model="m.kind_vehicle">
                  <option
                    v-for="(kind_vehicle, index) in kind_vehicle_list"
                    v-bind:key="index"
                  >
                    {{ kind_vehicle.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>정상가격:</dt>
              <dd><input type="text" v-model="m.normal_price" /></dd>
            </dl>
            <dl>
              <dt>주차요금:</dt>
              <dd><input type="text" v-model="m.parking_price" /></dd>
            </dl>
            <dl>
              <dt>비고:</dt>
              <dd><input type="text" v-model="m.contents" /></dd>
            </dl>
          </form>
          <div class="btns">
            <button @click.prevent="modifyVehicle" class="modifybtn">
              수정
            </button>
            <button @click.prevent="deleteVehicle" class="deletebtn">
              삭제
            </button>
          </div>
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
        <li>적용</li>
        <li>상품명</li>
        <li>분류1</li>
        <li>분류2</li>
        <li>가격</li>
        <li>등록일</li>
        <li>최종수정일</li>
        <li>비고</li>
      </ul>
      <ul class="list-wrap">
        <li
          v-for="(parking_product, index) in parking_product_list"
          :key="index"
          @click="modifyOpen(parking_product)"
        >
          <span
            ><input type="text" v-model="parking_product.used" readonly
          /></span>
          <span
            ><input
              type="text"
              v-model="parking_product.parking_product_name"
              readonly
          /></span>
          <span
            ><input type="text" v-model="parking_product.kind1" readonly
          /></span>
          <span
            ><input type="text" v-model="parking_product.kind2" readonly
          /></span>
          <span
            ><input type="text" v-model="parking_product.parking_price" readonly
          /></span>
          <span
            ><input type="text" v-model="parking_product.time" readonly
          /></span>
          <span
            ><input type="text" v-model="parking_product.update_time" readonly
          /></span>
          <span
            ><input type="text" v-model="parking_product.contents" readonly
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
      r: {
        used: "Y",
        parking_product_name: "",
        kind1: "월정기주차",
        kind2: "전일제",
        app_time: "00시",
        output_vehicle_limit: "무제한",
        kind_vehicle: "승용(소형)",
        normal_price: "50000",
        parking_price: "50000",
        contents: "",
        time: 0,
        update_time: 0,
        delete_time: 0
      },
      m: {
        used: "Y",
        contents: "",
        parking_product_name: "",
        kind1: "월정기주차",
        kind2: "전일제",
        app_time: "00시",
        output_vehicle_limit: "무제한",
        kind_vehicle: "승용(소형)",
        normal_price: "50000",
        parking_price: "50000",
        time: 0,
        update_time: 0,
        delete_time: 0
      },
      app_list: [
        {
          text: "Y"
        },
        {
          text: "N"
        }
      ],
      kind1_list: [
        {
          text: "월정기주차"
        },
        {
          text: "일일주차"
        },
        {
          text: "시간주차"
        }
      ],
      month_product_list: [
        {
          text: "전일제"
        },
        {
          text: "주간"
        },
        {
          text: "야간"
        },
        {
          text: "주휴간"
        },
        {
          text: "야휴간"
        }
      ],
      day_product_list: [
        {
          text: "1"
        },
        {
          text: "2"
        },
        {
          text: "3"
        },
        {
          text: "4"
        },
        {
          text: "5"
        },
        {
          text: "6"
        },
        {
          text: "7"
        },
        {
          text: "8"
        },
        {
          text: "9"
        },
        {
          text: "10"
        },
        {
          text: "11"
        },
        {
          text: "12"
        },
        {
          text: "13"
        },
        {
          text: "14"
        },
        {
          text: "15"
        },
        {
          text: "16"
        },
        {
          text: "17"
        },
        {
          text: "18"
        },
        {
          text: "19"
        },
        {
          text: "20"
        },
        {
          text: "21"
        },
        {
          text: "22"
        },
        {
          text: "23"
        },
        {
          text: "24"
        },
        {
          text: "25"
        },
        {
          text: "26"
        },
        {
          text: "27"
        },
        {
          text: "28"
        },
        {
          text: "29"
        },
        {
          text: "30"
        },
        {
          text: "31"
        }
      ],
      time_product_list: [
        {
          text: "1"
        },
        {
          text: "2"
        },
        {
          text: "3"
        },
        {
          text: "4"
        },
        {
          text: "5"
        },
        {
          text: "6"
        },
        {
          text: "7"
        },
        {
          text: "8"
        },
        {
          text: "9"
        },
        {
          text: "10"
        },
        {
          text: "11"
        },
        {
          text: "12"
        },
        {
          text: "13"
        },
        {
          text: "14"
        },
        {
          text: "15"
        },
        {
          text: "16"
        },
        {
          text: "17"
        },
        {
          text: "18"
        },
        {
          text: "19"
        },
        {
          text: "20"
        },
        {
          text: "21"
        },
        {
          text: "22"
        },
        {
          text: "23"
        },
        {
          text: "24"
        }
      ],
      app_time_list: [
        {
          text: "00시"
        },
        {
          text: "입차기준"
        }
      ],
      output_vehicle_limit_list: [
        {
          text: "1회"
        },
        {
          text: "무제한"
        }
      ],
      kind_vehicle_list: [
        {
          text: "승용(소형)"
        },
        {
          text: "승용(중형)"
        },
        {
          text: "승합차"
        },
        {
          text: "트럭(소형)"
        },
        {
          text: "트럭(대형)"
        }
      ],
      parking_product_list: [],
      print_parking_product_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "parkingProductM") this.titles = add.title
        })
      })
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.m.used = c.used
      this.m.parking_product_name = c.parking_product_name
      this.m.kind1 = c.kind1
      this.m.kind2 = c.kind2
      this.m.app_time = c.app_time
      this.m.output_vehicle_limit = c.output_vehicle_limit
      this.m.kind_vehicle = c.kind_vehicle
      this.m.normal_price = c.normal_price
      this.m.parking_price = c.parking_price
      this.m.contents = c.contents
      this.m.time = c.time
      this.m.update_time = c.update_time
      this.m.delete_time = c.delete_time
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
      let obj = {}
      obj.used = this.r.used
      obj.parking_product_name = this.r.parking_product_name
      obj.kind1 = this.r.kind1
      obj.kind2 = this.r.kind2
      obj.app_time = this.r.app_time
      obj.output_vehicle_limit = this.r.output_vehicle_limit
      obj.kind_vehicle = this.r.kind_vehicle
      obj.normal_price = this.r.normal_price
      obj.parking_price = this.r.parking_price
      obj.contents = this.r.contents
      obj.update_time = this.r.update_time
      obj.delete_time = this.r.delete_time
      obj.time = Date.now()
      obj.kind = "create_parking_product_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    modifyVehicle() {
      console.log("할인쿠폰 상품 수정")
      this.modifyClose()
      let obj = {}
      obj.used = this.m.used
      obj.parking_product_name = this.m.parking_product_name
      obj.kind1 = this.m.kind1
      obj.kind2 = this.m.kind2
      obj.app_time = this.m.app_time
      obj.output_vehicle_limit = this.m.output_vehicle_limit
      obj.kind_vehicle = this.m.kind_vehicle
      obj.normal_price = this.m.normal_price
      obj.parking_price = this.m.parking_price
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.delete_time = this.m.delete_time
      obj.update_time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "update_parking_product_list"
      console.log("할인쿠폰 상품 수정 후 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("주차장 정보 삭제")
      this.modifyClose()
      let obj = {}
      obj.used = this.m.used
      obj.parking_product_name = this.m.parking_product_name
      obj.kind1 = this.m.kind1
      obj.kind2 = this.m.kind2
      obj.app_time = this.m.app_time
      obj.output_vehicle_limit = this.m.output_vehicle_limit
      obj.kind_vehicle = this.m.kind_vehicle
      obj.normal_price = this.m.normal_price
      obj.parking_price = this.m.parking_price
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.update_time = this.m.update_timee
      obj.time = this.m.time
      obj.delete_time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "delete_parking_product_list"
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    search() {
      let obj = {}
      obj.kind = "get_parking_product_list"
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.admin_pw = window.localStorage.getItem("admin_pw")
      this.sendMessage(obj)
    },
    parking_product_list_fun(data) {
      //  console.log("coupon_product_list_fun : ", data, data.docs.length)
      this.parking_product_list = []
      if (data.docs && data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          console.log("fun data.docs : ", data.docs)
          let obj = {}
          obj.used = data.docs[i].used
          obj.parking_product_name = data.docs[i].parking_product_name
          obj.kind1 = data.docs[i].kind1
          obj.kind2 = data.docs[i].kind2
          obj.app_time = data.docs[i].app_time
          obj.output_vehicle_limit = data.docs[i].output_vehicle_limit
          obj.kind_vehicle = data.docs[i].kind_vehicle
          obj.normal_price = data.docs[i].normal_price
          obj.parking_price = data.docs[i].parking_price
          obj.contents = data.docs[i].contents
          obj.time = data.docs[i].time
          obj.update_time = data.docs[i].update_timee
          obj.time = data.docs[i].time
          obj.delete_time = data.docs[i].update_timee
          this.parking_product_list.push(obj)
        }
        let temp = {}
        this.parking_product_list.push(temp)
        this.parking_product_list.pop()
        this.print_parking_product_list = []
        for (let i = 0; i < this.parking_product_list.length; i++) {
          let print = {}
          print.적용 = data.docs[i].used
          print.주차상품명 = data.docs[i].parking_product_name
          print.구분1 = data.docs[i].kind1
          print.구분2 = data.docs[i].kind2
          print.적용시점 = data.docs[i].app_time
          print.출차제한횟수 = data.docs[i].output_vehicle_limit
          print.차종 = data.docs[i].kind_vehicle
          print.정상가격 = data.docs[i].normal_price
          print.주차요금 = data.docs[i].parking_price
          print.비고 = this.parking_product_list[i].contents
          print.등록일시 = this.parking_product_list[i].time
          print.수정일시 = this.parking_product_list[i].update_timee
          print.삭제일시 = this.parking_product_list[i].update_timee
          this.print_parking_product_list.push(print)
        }
      }
    },

    start() {
      // this.manager_list = config.manager_list
      this.search()
    },
    download() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.printparking_product_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_주차 상품 관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_parking_product_list") {
        this.parking_product_list_fun(data)
      } else if (
        data.kind === "create_parking_product_list" ||
        data.kind === "update_parking_product_list" ||
        data.kind === "delete_parking_product_list"
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
