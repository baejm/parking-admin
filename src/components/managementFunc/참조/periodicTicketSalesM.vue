<template>
  <div class="report_wrap">
    <!-- 등록팝업 -->
    <div
      class="resist_pop popup"
      v-show="resistIs"
      :class="{ column_1: Object.keys(this.r).length < 10 }"
    >
      <div>
        <h3>{{ titles }} 등록</h3>
        <button @click="registClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>차량번호</dt>
              <dd><input type="text" required v-model="r.lp" /></dd>
            </dl>
            <dl>
              <dt>구매자</dt>
              <dd><input type="text" required v-model="r.buy_name" /></dd>
            </dl>
            <dl>
              <dt>전화번호</dt>
              <dd>
                <input type="text" required v-model="r.buy_phone" />
              </dd>
            </dl>
            <dl>
              <dt>주차상품명</dt>
              <dd>
                <select v-model="r.product_name">
                  <option
                    v-for="(parking_product, index) in parking_product_list"
                    v-bind:key="index"
                  >
                    {{ parking_product.parking_product_name }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>그룹</dt>
              <dd><input type="text" required v-model="r.groupName" /></dd>
            </dl>
            <dl>
              <dt>핀매자</dt>
              <dd><input type="text" v-model="r.sales_name" /></dd>
            </dl>
            <dl>
              <dt>판매일시</dt>
              <dd>
                <input type="datetime-local" v-model="r.str_sales_time" />
              </dd>
            </dl>
            <dl>
              <dt>상품가격</dt>
              <dd><input type="text" v-model="r.product_price" /></dd>
            </dl>
            <dl>
              <dt>판매가격</dt>
              <dd><input type="text" v-model="r.sales_price" /></dd>
            </dl>
            <dl>
              <dt>시작일</dt>
              <dd><input type="date" v-model="r.app_start_time" /></dd>
            </dl>
            <dl>
              <dt>종료일</dt>
              <dd><input type="date" v-model="r.app_end_time" /></dd>
            </dl>
            <dl>
              <dt>구분</dt>
              <dd>
                <select v-model="r.kind3">
                  <option
                    v-for="(kind3, index) in kind3_list"
                    v-bind:key="index"
                  >
                    {{ kind3.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>비고</dt>
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
              <dt>차량번호</dt>
              <dd><input type="text" readonly v-model="m.lp" /></dd>
            </dl>
            <dl>
              <dt>구매자</dt>
              <dd><input type="text" v-model="m.buy_name" /></dd>
            </dl>
            <dl>
              <dt>전화번호</dt>
              <dd>
                <input type="text" v-model="m.buy_phone" />
              </dd>
            </dl>
            <dl>
              <dt>주차상품명</dt>
              <dd>
                <select v-model="m.product_name">
                  <option
                    v-for="(parking_product, index) in parking_product_list"
                    v-bind:key="index"
                  >
                    {{ parking_product.parking_product_name }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>그룹</dt>
              <dd><input type="text" v-model="m.groupName" /></dd>
            </dl>
            <dl>
              <dt>핀매자</dt>
              <dd><input type="text" v-model="m.sales_name" /></dd>
            </dl>
            <dl>
              <dt>판매일시</dt>
              <dd>
                <input type="datetime-local" v-model="m.str_sales_time" />
              </dd>
            </dl>
            <dl>
              <dt>상품가격</dt>
              <dd><input type="text" v-model="m.product_price" /></dd>
            </dl>
            <dl>
              <dt>판매가격</dt>
              <dd><input type="text" v-model="m.sales_price" /></dd>
            </dl>
            <dl>
              <dt>시작일</dt>
              <dd><input type="date" v-model="m.str_app_start_time" /></dd>
            </dl>
            <dl>
              <dt>종료일</dt>
              <dd><input type="date" v-model="m.str_app_end_time" /></dd>
            </dl>
            <dl>
              <dt>구분</dt>
              <dd>
                <select v-model="r.kind3">
                  <option
                    v-for="(kind3, index) in kind3_list"
                    v-bind:key="index"
                  >
                    {{ kind3.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>비고</dt>
              <dd><input type="text" v-model="r.contents" /></dd>
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
    <form class="menu_title">
      <span class="small_title">날짜</span>
      <input type="date" id="start_time" v-model="start_time" />
      <span>~</span>
      <input type="date" id="end_time" v-model="end_time" />
      <span class="small_title">차량번호</span>
      <input class="search_icon" type="text" maxlength="8" v-model="searchLp" />
      <button @click.prevent="search" type="submit">
        <font-awesome-icon icon="search" />
      </button>
    </form>

    <div class="list-items">
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
        <li>차량번호</li>
        <li>구매자</li>
        <li>전화번호</li>
        <li>상품명</li>
        <li>그룹</li>
        <li>판매자명</li>
        <li>판매일자</li>
        <li>판매가격</li>
        <li>구분</li>
        <li>메모</li>
      </ul>
      <ul class="list-wrap">
        <li
          v-for="(sales_manager, index) in sales_manager_list"
          :key="index"
          @click="modifyOpen(sales_manager)"
        >
          <span> {{ index + 1 }}</span>
          <span><input type="text" v-model="sales_manager.lp" readonly/></span>
          <span
            ><input type="text" v-model="sales_manager.buy_name" readonly
          /></span>
          <span
            ><input type="text" v-model="sales_manager.buy_phone" readonly
          /></span>
          <span
            ><input type="text" v-model="sales_manager.product_name" readonly
          /></span>
          <span
            ><input type="text" v-model="sales_manager.groupName" readonly
          /></span>
          <span
            ><input type="text" v-model="sales_manager.sales_name" readonly
          /></span>
          <span
            ><input type="text" v-model="sales_manager.str_sales_time" readonly
          /></span>
          <span
            ><input type="text" v-model="sales_manager.sales_price" readonly
          /></span>
          <span
            ><input type="text" v-model="sales_manager.kind3" readonly
          /></span>
          <span
            ><input type="text" v-model="sales_manager.contents" readonly
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
      start_time: "",
      end_time: "",
      searchLp: "",
      r: {
        lp: "",
        buy_name: "",
        buy_phone: "",
        product_name: "",
        groupName: "",
        sales_name: "",
        sales_time: "",
        str_sales_time: "",
        product_price: "",
        sales_price: "",
        str_app_start_time: "",
        app_start_time: "",
        str_app_end_time: "",
        app_end_time: "",
        kind3: "신규",
        contents: "",
        time: "",
        update_time: "",
        delete_time: ""
      },
      m: {
        lp: "",
        buy_name: "",
        buy_phone: "",
        product_name: "",
        groupName: "",
        sales_name: "",
        sales_time: "",
        product_price: "",
        sales_price: "",
        str_app_start_time: "",
        app_start_time: "",
        str_app_end_time: "",
        app_end_time: "",
        kind3: "신규",
        contents: "",
        time: "",
        update_time: "",
        delete_time: ""
      },
      kind3_list: [
        {
          text: "신규"
        },
        {
          text: "연장"
        }
      ],
      sales_manager_list: [],
      parking_product_list: [],
      print_sales_manager_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "periodicTicketSalesM") this.titles = add.title
        })
      })
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.m.lp = c.lp
      this.m.buy_name = c.buy_name
      this.m.buy_phone = c.buy_phone
      this.m.product_name = c.product_name
      this.m.groupName = c.groupName
      this.m.sales_name = c.sales_name
      this.m.sales_time = c.sales_time
      this.m.str_sales_time = Date.now()
      this.m.product_pricee = c.product_price
      this.m.sales_price = c.sales_price
      this.m.app_start_time = c.app_start_time
      this.m.str_app_start_time = format_time1(new Date(c.app_start_time))
      this.m.app_end_time = c.app_end_time
      this.m.str_app_end_time = format_time1(new Date(c.app_end_time))
      this.m.kind3 = c.kind3
      this.m.contents = c.contents
      this.m.time = c.time
      this.m.update_time = c.update_time
      this.m.delete_time = c.delete_time
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
      // console.log("this.reg : ", this.reg)
      let obj = {}
      obj.lp = this.r.lp
      obj.buy_name = this.r.buy_name
      obj.buy_phone = this.r.buy_phone
      obj.product_name = this.r.product_name
      obj.groupName = this.r.groupName
      obj.sales_name = this.r.sales_name
      obj.sales_time = this.r.sales_time
      obj.str_sales_time = Date.now()
      obj.product_pricee = this.r.product_price
      obj.sales_price = this.r.sales_price
      obj.app_start_time = get_date(this.r.str_app_start_time)
      obj.app_end_time = get_date(this.r.str_app_end_time)
      obj.kind3 = this.r.kind3
      obj.contents = this.r.contents
      obj.time = Date.now()
      obj.kind = "create_sales_manager_list"
      this.m.update_time = this.r.update_time
      this.m.delete_time = this.r.delete_time
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    sales_manager_list_fun(data) {
      this.sales_manager_list = []
      console.log("sales_manager_list_fun : ", data, data.docs.length)
      for (let i = 0; i < data.docs.length; i++) {
        let obj = {}

        obj.lp = data.docs[i].lp
        obj.buy_name = data.docs[i].buy_name
        obj.buy_phone = data.docs[i].buy_phone
        obj.product_name = data.docs[i].product_name
        obj.groupName = data.docs[i].groupName
        obj.sales_name = data.docs[i].sales_name
        obj.str_sales_time = Date.now()
        obj.product_pricee = data.docs[i].product_price
        obj.sales_price = data.docs[i].sales_price
        obj.app_start_time = get_date(this.r.str_app_start_time)
        obj.app_end_time = get_date(this.r.str_app_end_time)
        obj.kind3 = data.docs[i].kind3
        obj.time = data.docs[i].time
        obj.str_time = format_time1(new Date(data.docs[i].time))
        obj.update_time = data.docs[i].update_time
        obj.delete_time = data.docs[i].update_time
        obj.contents = data.docs[i].contents
        this.sales_manager_list.push(obj)
      }

      let temp = {}
      this.sales_manager_list.push(temp)
      this.sales_manager_list.pop()
      this.print_sales_manager_list = []
      for (let i = 0; i < this.sales_manager_list.length; i++) {
        let print = {}
        let obj1 = this.sales_manager_list[i]
        print.차량번호 = obj1.lp
        print.구매자 = obj1.buy_name
        print.전화번호 = obj1.buy_phone
        print.상품명 = obj1.product_name
        print.그룹 = obj1.groupName
        print.판매자 = obj1.sales_name
        print.판매일시 = obj1.str_sales_time
        print.상품가격 = obj1.product_price
        print.판매가격 = obj1.sales_price
        print.시작일 = obj1.str_app_start_time
        print.종료일 = obj1.str_app_end_time
        print.구분 = obj1.kind3
        print.메모 = obj1.contents
        print.등록일시 = format_time1(new Date(obj1.time))
        print.수정일시 = format_time1(new Date(obj1.update_time))
        print.삭제일시 = format_time1(new Date(obj1.delete_time))
        print.메모 = obj1.contents
        this.print_sales_manager_list.push(print)
      }
    },
    modifyVehicle() {
      this.modifyClose()
      let obj = {}
      obj.groupName = this.m.groupName
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.update_time = Date.now()
      obj.delete_time = this.m.delete_time
      obj.kind = "update_sales_manager_list"

      this.sendMessage(obj)
    },
    deleteVehicle() {
      this.modifyClose()
      let obj = {}
      obj.groupName = this.m.groupName
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.delete_time = Date.now()
      obj.time = this.m.delte_time
      obj.kind = "delete_sales_manager_list"
      this.sendMessage(obj)
    },
    start() {
      this.date_set()
      let obj = {}
      obj.id = window.localStorage.getItem("admin_id")
      obj.kind = "get_parking_product_list"
      this.sendMessage(obj)
    },
    search() {
      var obj = {}
      obj.kind = ""
      obj.lp = this.searchLp
      obj.start_time = get_start_time(this.start_time)
      obj.end_time = get_end_time(this.end_time)
      obj.id = window.localStorage.getItem("admin_id")
      obj.kind = "get_sales_manager_list"
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    date_set() {
      let d = new Date()
      //let d1 = d - (24*60*60*1000);
      //console.log("d : ", d, " d1 : ", d1);
      let str_start =
        d.getFullYear() + "-" + itoStr(d.getMonth()) + "-" + itoStr(d.getDate())

      let str_end =
        d.getFullYear() +
        "-" +
        itoStr(d.getMonth() + 1) +
        "-" +
        itoStr(d.getDate())
      this.start_time = str_start
      this.end_time = str_end
    },
    download() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.print_sales_manager_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_정기권 판매 관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_sales_manager_list") {
        console.log("getsales_manager_list : ", data)
        this.sales_manager_list_fun(data)
      } else if (
        data.kind === "create_sales_manager_list" ||
        data.kind === "update_sales_manager_list" ||
        data.kind === "delete_sales_manager_list"
      ) {
        this.search()
      } else if (data.kind === "get_parking_product_list") {
        this.parking_product_list = data.docs
        console.log("this.parking_product_list : ", this.parking_product_list)
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
function get_date(str) {
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

function get_start_time(str) {
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

function get_end_time(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(
    parseInt(res[0]),
    parseInt(res[1]) - 1,
    parseInt(res[2]),
    parseInt(res[3]),
    parseInt(res[4]),
    59,
    999
  )
  return d.getTime()
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
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
function num_to_str($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style></style>
