<template>
  <div class="report_wrap">
    <!-- 등록팝업 -->
    <div class="resist_pop popup holiday" v-show="resistIs">
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
              <dt>공휴일명</dt>
              <dd><input type="text" v-model="r.haliday_name" /></dd>
            </dl>
            <dl>
              <dt>요금적용:</dt>
              <dd>
                <select v-model="r.fee_app">
                  <option
                    v-for="(app, index) in fee_app_list"
                    v-bind:key="index"
                  >
                    {{ app.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>공휴일</dt>
              <input type="date" v-model="r.hol_start_time" />
              <span>~</span>
              <input type="date" v-model="r.hol_end_time" />
            </dl>
            <dl>
              <dt>반복:</dt>
              <dd>
                <select v-model="r.repeat">
                  <option v-for="(app, index) in app_list" v-bind:key="index">
                    {{ app.text }}
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
    <div class="modify_pop popup holiday" v-show="modifyIs">
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
              <dt>공휴일명:</dt>
              <dd><input type="text" v-model="m.haliday_name" /></dd>
            </dl>
            <dl>
              <dt>요금적용:</dt>
              <dd>
                <select v-model="m.fee_app">
                  <option
                    v-for="(app, index) in fee_app_list"
                    v-bind:key="index"
                  >
                    {{ app.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>공휴일</dt>
              <input type="date" v-model="m.hol_start_time" />
              <span>~</span>
              <input type="date" v-model="m.hol_end_time" />
            </dl>
            <dl>
              <dt>반복:</dt>
              <dd>
                <select v-model="m.repeat">
                  <option v-for="(app, index) in app_list" v-bind:key="index">
                    {{ app.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>비고</dt>
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
        <li>번호</li>
        <li>적용여부</li>
        <li>공휴일명</li>
        <li>요금적용</li>
        <li>시작일</li>
        <li>종료일</li>
        <li>반복여부</li>
        <li>비고</li>
      </ul>
      <ul class="list-wrap">
        <li
          v-for="(res, index) in holiday_list"
          :key="index"
          @click="modifyOpen(res)"
        >
          <span> {{ index + 1 }}</span>
          <span><input type="text" v-model="res.used"/></span>
          <span><input type="text" v-model="res.haliday_name" readonly/></span>
          <span><input type="text" v-model="res.fee_app" readonly/></span>
          <span
            ><input type="text" v-model="res.hol_start_time" readonly
          /></span>
          <span><input type="text" v-model="res.hol_end_time" readonly/></span>
          <span><input type="text" v-model="res.repeat" readonly/></span>
          <span><input type="text" v-model="res.contents"/></span>
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
        haliday_name: "삼일절",
        fee_app: "무료",
        hol_start_time: "0",
        hol_end_time: "0",
        repeat: "Y",
        admin_id: "",
        contents: "",
        time: "",
        update_time: "",
        delete_time: ""
      },
      m: {
        used: "Y",
        haliday_name: "삼일절",
        fee_app: "무료",
        hol_start_time: "0",
        hol_end_time: "0",
        repeat: "Y",
        admin_id: "",
        contents: "",
        time: "",
        update_time: "",
        delete_time: ""
      },
      app_list: [
        {
          text: "Y"
        },
        {
          text: "N"
        }
      ],
      fee_app_list: [
        {
          text: "무료"
        },
        {
          text: "유료"
        }
      ],
      holiday_list: [],
      print_holiday_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "publicHolidayRegist") this.titles = add.title
        })
      })
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.m.used = c.used
      this.m.haliday_name = c.haliday_name
      this.m.fee_app = c.fee_app
      this.m.hol_start_time = c.hol_start_time
      this.m.hol_end_time = c.hol_end_time
      this.m.repeat = c.repeat
      this.m.admin_id = c.admin_id
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
      obj.haliday_name = this.r.haliday_name
      obj.fee_app = this.r.fee_app
      obj.hol_start_time = this.r.hol_start_time
      obj.hol_end_time = this.r.hol_end_time
      obj.repeat = this.r.repeat
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.contents = this.r.contents
      obj.time = Date.now()
      obj.update_time = this.r.update_time
      obj.delete_time = this.r.delete_time
      obj.kind = "create_holiday_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    modifyVehicle() {
      console.log("공휴일 정보 수정")
      this.modifyClose()
      let obj = {}
      obj.used = this.m.used
      obj.haliday_name = this.m.haliday_name
      obj.fee_app = this.m.fee_app
      obj.hol_start_time = this.m.hol_start_time
      obj.hol_end_time = this.m.hol_end_time
      obj.repeat = this.m.repeat
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.update_time = Date.now()
      obj.delete_time = this.m.delete_time
      obj.kind = "update_holiday_list"
      console.log("공휴일 정보 수정 후 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("공휴일 정보 삭제")
      this.modifyClose()
      let obj = {}
      obj.used = this.m.used
      obj.haliday_name = this.m.haliday_name
      obj.fee_app = this.r.fee_app
      obj.hol_start_time = this.m.hol_start_time
      obj.hol_end_time = this.m.hol_end_time
      obj.repeat = this.m.repeat
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.update_time = this.m.update_time
      obj.delete_time = Date.now()
      obj.kind = "delete_holiday_list"
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    search() {
      var obj = {}
      obj.kind = "get_holiday_list"
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.admin_pw = window.localStorage.getItem("admin_pw")
      this.sendMessage(obj)
    },
    holiday_list_fun(data) {
      this.holiday_list = []
      console.log("holiday_list_fun : ", data, data.docs.length)
      if (data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          let obj = {}
          obj.used = data.docs[i].used
          obj.haliday_name = data.docs[i].haliday_name
          obj.fee_app = data.docs[i].fee_app
          obj.hol_start_time = data.docs[i].hol_start_time
          obj.hol_end_time = data.docs[i].hol_end_time
          obj.repeat = data.docs[i].repeat
          obj.admin_id = data.docs[i].admin_id
          obj.contents = data.docs[i].contents
          obj.time = data.docs[i].time
          obj.update_time = data.docs[i].update_time
          obj.delete_time = data.docs[i].delete_time
          this.holiday_list.push(obj)
        }
        let temp = {}
        this.holiday_list.push(temp)
        this.holiday_list.pop()
        this.print_holiday_list = []
        for (let i = 0; i < this.holiday_list.length; i++) {
          let print = {}
          print.적용여부 = this.holiday_list[i].used
          print.공휴일명 = this.holiday_list[i].haliday_name
          print.요금적용 = this.holiday_list[i].fee_app
          print.시작일 = this.holiday_list[i].hol_start_time
          print.종료일 = this.holiday_list[i].hol_end_time
          print.반복 = this.holiday_list[i].repeat
          print.관리자ID = this.holiday_list[i].admin_id
          print.등록일시 = this.holiday_list[i].time
          print.수정일시 = this.holiday_list[i].update_time
          print.삭제일시 = this.holiday_list[i].delate_time
          print.메모 = this.holiday_list.contents
          this.print_holiday_list.push(print)
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
      const data = XLSX.utils.json_to_sheet(this.print_holiday_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_공휴일 관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_holiday_list") {
        this.holiday_list_fun(data)
      } else if (
        data.kind === "create_holiday_list" ||
        data.kind === "update_holiday_list" ||
        data.kind === "delete_holiday_list"
      ) {
        this.search()
      }
    })
    this.search()
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
