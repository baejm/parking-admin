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
              <dt>차량번호<span class="essential">*</span></dt>
              <dd>
                <input
                  type="text"
                  placeholder="예) 12가3456"
                  required
                  v-model="reg.lp"
                />
              </dd>
            </dl>
            <dl>
              <dt>이름<span class="essential">*</span></dt>
              <dd><input type="text" v-model="reg.name" required /></dd>
            </dl>
            <dl>
              <dt>연락처</dt>
              <dd><input type="text" v-model="reg.phone" /></dd>
            </dl>
            <dl>
              <dt>동</dt>
              <dd><input type="text" v-model="reg.dong" /></dd>
            </dl>
            <dl>
              <dt>호</dt>
              <dd><input type="text" v-model="reg.ho" /></dd>
            </dl>
            <dl>
              <dt>세대알림</dt>
              <dd>
                <select>
                  <option
                    v-for="(alert, index) in alert_list"
                    v-bind:key="index"
                    required
                  >
                    {{ alert.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>메모</dt>
              <dd><input type="text" v-model="reg.contents" /></dd>
            </dl>
            <div class="btns">
              <button @click.prevent="registNew">등록</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- 수정팝업 -->
    <div
      class="modify_pop popup"
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
              <dt>차량번호<span class="essential">*</span></dt>
              <dd>
                <input
                  type="text"
                  placeholder="예) 12가3456"
                  required
                  v-model="current.lp"
                />
              </dd>
            </dl>
            <dl>
              <dt>이름<span class="essential">*</span></dt>
              <dd><input type="text" v-model="current.name" required /></dd>
            </dl>
            <dl>
              <dt>연락처</dt>
              <dd><input type="text" v-model="current.phone" /></dd>
            </dl>
            <dl>
              <dt>동</dt>
              <dd><input type="text" v-model="current.dong" /></dd>
              10
            </dl>
            <dl>
              <dt>호</dt>
              <dd><input type="text" v-model="current.ho" /></dd>
            </dl>
            <dl>
              <dt>세대알림</dt>
              <dd>
                <select>
                  <option
                    v-for="(alert, index) in alert_list"
                    v-bind:key="index"
                    required
                  >
                    {{ alert.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>메모</dt>
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
    <!-- 일괄수정팝업 -->
    <div
      class="modify_pop popup batch_modify"
      v-show="batchModifyIs"
      :class="{ column_1: Object.keys(this.current).length < 8 }"
    >
      <div>
        <h3>{{ titles }} 일괄 수정</h3>
        <button @click="modifyClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <!-- <span class="all_btn"><label><input type="checkbox" @click="selectAll" v-model="allSelected">전체 선택</label></span> -->
        <div class="form_window">
          <form>
            <dl>
              <dd class="batch">
                <label
                  ><input type="checkbox" v-model="batch.startTimeCheck"
                /></label>
              </dd>
              <dt>시작시점</dt>
              <dd><input type="date" v-model="batch.startTime" required /></dd>
            </dl>
            <dl>
              <dd class="batch">
                <label
                  ><input type="checkbox" v-model="batch.endTimeCheck"
                /></label>
              </dd>
              <dt>종료시점</dt>
              <dd><input type="date" v-model="batch.endTime" required /></dd>
            </dl>
            <div class="btns">
              <button @click.prevent="batchModifyVehicle" class="modifybtn">
                수정
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
      <span class="small_title">차량번호</span>
      <input
        class="search_icon"
        type="text"
        maxlength="8"
        v-model="searchNumber"
        placeholder="예) 12가3456"
      />
      <button @click.prevent="search" type="submit">
        <font-awesome-icon icon="search" />
      </button>
    </form>

    <div class="list-items">
      <div class="writeRecord">
        <button @click.prevent="registOpen" class="register_btn">
          <font-awesome-icon icon="file-signature" />등록
        </button>
        <button @click.prevent="excelDownFunc" class="save_btn">
          <font-awesome-icon icon="save" />저장
        </button>

        <label class="upload"
          ><font-awesome-icon icon="upload" />업로드<input
            type="file"
            @change="onChange"
          />
          <xlsx-read :file="file">
            <xlsx-json>
              <template #default="{collection}">
                <div>
                  {{ collection }}
                </div>
              </template>
            </xlsx-json>
          </xlsx-read>
        </label>
        <xlsx-read :file="file">
          <xlsx-json @parsed="notice(parsed)">
            <template #default="{collection}">
              <div>
                {{ collection }}
              </div>
            </template>
          </xlsx-json>
        </xlsx-read>
        <button @click.prevent="excelUp" class="download">
          <font-awesome-icon icon="clipboard" />양식받기
        </button>
        <button @click.prevent="batchModify" class="batch_modify">
          <font-awesome-icon icon="clipboard-list" />일괄수정
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
          v-for="(res, index) in list_vehicle_list"
          :key="index"
          :class="{ active: res.listActive }"
          @click="modifyOpen(res)"
        >
          <span class="number"> {{ index + 1 }}</span>
          <span class="lp"
            ><input
              type="text"
              v-model="res.lp"
              readonly
              v-on:change="contents_change(index)"
          /></span>
          <span class="location"><input type="text" v-model="res.name"/></span>
          <span class="direction"
            ><input type="text" v-model="res.phone"
          /></span>
          <span class="registered"
            ><input type="text" v-model="res.dong"
          /></span>
          <span class="registered"><input type="text" v-model="res.ho"/></span>
          <span class="dong_ho"><input type="text" v-model="res.alert"/></span>
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
import XLSX from "xlsx"
import _ from "underscore"
import config from "../../config.js"
import { mapState } from "vuex"
//import { XlsxRead, XlsxTable, XlsxSheets, XlsxJson, XlsxWorkbook, XlsxSheet, XlsxDownload } from "../../dist/vue-xlsx.es.js"
import { XlsxRead, XlsxJson } from "vue-xlsx1/dist/vue-xlsx.es.js"

export default {
  components: {
    XlsxRead,
    XlsxJson
    //  XlsxWorkbook,
    // XlsxSheet,
    // XlsxDownload
  },
  data() {
    return {
      file: null,
      alert_list: [
        {
          text: "YES"
        },
        {
          text: "NO"
        }
      ],
      selectedSheet: null,
      sheetName: null,
      sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
      modifyIs: false,
      batchModifyIs: false,
      searchNumber: "",
      xlsx_lp: "",
      start_time: format_time1(new Date(Date.now())),
      end_time: format_time1(new Date(Date.now())),
      resistIs: false,
      /// parking_product_list: [],
      listItem: [
        { title: "번호", sortBy: false, standard: "time" },
        { title: "차량번호", sortBy: false, standard: "lp" },
        { title: "이름", sortBy: false, standard: "name" },
        { title: "연락처", sortBy: false, standard: "phone" },
        { title: "동", sortBy: false, standard: "dong" },
        { title: "호", sortBy: false, standard: "ho" },
        { title: "세대알림", sortBy: false, standard: "alert" },
        { title: "비고", sortBy: false, standard: "contents" }
      ],
      reg: {
        lp: "",
        name: "",
        phone: "",
        dong: "",
        ho: "",
        alert: "",
        contents: ""
      },
      current: {
        lp: "",
        name: "",
        phone: "",
        dong: "",
        ho: "",
        alert: "",
        contents: ""
      },
      list_vehicle_list: [],
      print_list_vehicle_list: [],
      format_list_vehicle_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_vehicle_list") {
        this.sales_list(data)
      } else if (
        data.kind === "create_vehicle_at_vehicle_list" ||
        data.kind === "update_vehicle_at_vehicle_list" ||
        data.kind === "delete_vehicle_at_vehicle_list" ||
        data.kind === "batch_vehicle_list"
      ) {
        this.search()
      }
    })
    this.start()
    this.changeTitle()
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "vehicleManagerM") this.titles = add.title
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
        temp10 = _.sortBy(this.list_sales_list, e.standard)
        temp10.reverse()
        return (this.list_sales_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.list_sales_list, e.standard)
        return (this.list_sales_list = temp10)
      }
    },
    async notice(parsed) {
      await alert(parsed)
      console.log("파스", parsed)
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.lp = c.lp
      this.current.name = c.name
      this.current.phone = c.phone
      this.current.dong = c.dong
      this.current.ho = c.ho
      this.current.alert = c.alert
      this.current.contents = c.contents
      this.current.number = c.lp.replace(/[가-힝]/gi, "")
      console.log("c : ", c)
    },
    batchModify() {
      this.batchModifyIs = true
      console.log("일괄수정 화면입니다.")
    },
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null
    },
    modifyClose() {
      this.modifyIs = false
      this.batchModifyIs = false
    },
    registOpen() {
      this.reg.lp = ""
      this.reg.name = ""
      this.reg.phone = ""
      this.reg.dong = ""
      this.reg.ho = ""
      this.reg.alert = ""
      this.reg.contents = ""
      this.reg.number = ""
      this.resistIs = true
    },
    registClose() {
      this.resistIs = false
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      let obj = {}
      // let startTime = this.reg.startTime + ".00:00:00"
      // let endTime =  this.reg.endTime + ".23:59:59"
      obj.lp = this.reg.lp
      obj.lp = this.reg.lp
      obj.name = this.reg.name
      obj.phone = this.reg.phone
      obj.dong = this.reg.dong
      obj.ho = this.reg.ho
      obj.alert = this.reg.alert
      obj.contents = this.reg.contents
      obj.time = Date.now()
      obj.number = this.reg.lp.replace(/[가-힝]/gi, "")
      obj.kind = "create_vehicle_at_vehicle_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    modifyVehicle() {
      this.modifyClose()
      let obj = {}

      obj.lp = this.current.lp
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.dong = this.current.dong
      obj.ho = this.current.ho
      obj.alert = this.current.alert
      obj.contents = this.current.contents
      obj.time = Date.now()
      obj.number = this.current.lp.replace(/[가-힝]/gi, "")
      obj.kind = "update_vehicle_at_vehicle_list"
      this.sendMessage(obj)
    },
    batchModifyVehicle() {
      this.modifyClose()
      let obj = {}
      console.log("일괄정보 : ", this.batch)

      obj.kind = "batch_vehicle_update_list"
      console.log("batchModifyVehicle : ", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.dong = this.current.dong
      obj.ho = this.current.ho
      obj.alert = this.current.alert
      obj.contents = this.current.contents
      obj.time = Date.now()
      obj.number = this.current.lp.replace(/[가-힝]/gi, "")
      obj.kind = "delete_vehicle_at_vehicle_list"
      this.sendMessage(obj)
    },
    loc_dir() {
      this.locations = []
      this.directions = []
      let location_list = []
      let direction_list = []
      location_list = config.location_list
      direction_list = config.direction_list
      this.seasonTicket = config.seasonTicket
      this.freeVehicle = config.freeVehicle
      this.newExtension = config.newExtension
      this.locations = location_list
      this.directions = direction_list
      let temp = {}
      this.locations.push(temp)
      this.locations.splice(this.locations.length - 1, 1)
      this.directions.push(temp)
      this.directions.splice(this.directions.length - 1, 1)
    },
    sales_list(data) {
      this.list_vehicle_list = []
      for (let i = 0; i < data.docs.length; i++) {
        let obj = {}
        obj.lp = data.docs[i].lp
        obj.name = data.docs[i].name
        obj.phone = data.docs[i].phone
        obj.dong = data.docs[i].dong
        obj.ho = data.docs[i].ho
        obj.alert = data.docs[i].alert
        obj.contents = data.docs[i].contents
        obj.number = data.docs[i].lp.number
        obj.kind = data.docs[i].kind
        obj.time = data.docs[i].time
        this.list_vehicle_list.push(obj)
      }
      let temp = {}
      this.list_vehicle_list.push(temp)
      this.list_vehicle_list.pop()
      this.print_list_vehicle_list = []
      for (let i = 0; i < this.list_vehicle_list.length; i++) {
        let obj1 = {}
        let obj2 = this.list_vehicle_list[i]
        obj1.차량번호 = obj2.lp
        obj1.이름 = obj2.name
        obj1.연락처 = obj2.phone
        obj1.동 = obj2.dong
        obj1.호 = obj2.ho
        obj1.세대알림 = obj2.alert
        obj1.메모 = obj2.contents
        this.print_list_vehicle_list.push(obj1)
      }
      let obj1 = {}
      this.format_list_vehicle_list = []
      obj1.차량번호 = ""
      obj1.이름 = ""
      obj1.연락처 = ""
      obj1.동 = ""
      obj1.호 = ""
      obj1.세대알림 = ""
      obj1.메모 = ""
      this.format_list_vehicle_list.push(obj1)
    },
    excelUp: function() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.format_list_vehicle_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_등록차량양식_" + postfix + ".xlsx"
      )
    },
    download: function() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.print_list_vehicle_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_등록차량리스트_" + postfix + ".xlsx"
      )
    },
    search() {
      var obj = {}
      obj.lp = this.searchNumber
      obj.id = window.localStorage.getItem("admin_id")
      obj.pw = window.localStorage.getItem("admin_pw")
      obj.kind = "get_vehicle_list"
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },

    start() {
      let now = Date.now()
      this.start_time = format_date(new Date(now))
      this.end_time = format_date(new Date(now))
      this.loc_dir()
      this.search()
    }
  }
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
function format_date(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "-" + num_to_str(dat.getMonth() + 1)
  str += "-" + num_to_str(dat.getDate())
  return str
}
// function format_date2(dat) {
//   var str = ""
//   str += dat.getFullYear()
//   str += num_to_str(dat.getMonth() + 1)
//   str += num_to_str(dat.getDate())
//   return str
// }
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
