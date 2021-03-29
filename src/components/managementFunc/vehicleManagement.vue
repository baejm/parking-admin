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
              <dt>동</dt>
              <dd><input type="text" v-model="reg.dong" /></dd>
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
            </dl>
            <dl>
              <dt>동</dt>
              <dd><input type="text" v-model="current.dong" /></dd>
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
        <button @click.prevent="download" class="save_btn">
          <font-awesome-icon icon="save" />저장
        </button>
        <!-- <button @click.prevent="download" class="upload">
        <font-awesome-icon icon="upload" />올리기
      </button> -->
        <!-- <label> 액셀파일 올리기</label>
      <input v-on:change='fileSelect()' type='file' ref= 'xlsx' id='fileupdate' accept='.xlsx'/> -->
        <label class="upload"
          ><font-awesome-icon icon="upload" />업로드<input
            type="file"
            @change="onChange"
          />
        </label>
        <input type="file" @change="onChange" />
        <xlsx-read :file="file">
          <xlsx-json>
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
        <button @click.prevent="excelUp2" class="batch_modify">
          <font-awesome-icon icon="clipboard-list" />일괄수정
        </button>
      </div>
      <ul class="list-title">
        <!--  <li v-for="(li , index) in listItem " :key="index" >{{li.title}}</li> -->
        <li>
          <span>번호</span>
        </li>
        <li>
          <span
            >차량번호<button @click.prevent="lp_click">
              <font-awesome-icon icon="caret-down" v-if="sort_item.lp_click" />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >이름<button @click.prevent="name_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.name_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >연락처<button @click.prevent="phone_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.phone_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >동<button @click.prevent="dong_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.dong_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >호<button @click.prevent="ho_click">
              <font-awesome-icon icon="caret-down" v-if="sort_item.ho_click" />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >세대알림<button @click.prevent="alert_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.alert_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >메모<button @click.prevent="contents_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.contents_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
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
          <span> {{ index + 1 }}</span>
          <span
            ><input
              type="text"
              v-model="res.lp"
              readonly
              v-on:change="contents_change(index)"
          /></span>
          <span><input type="text" v-model="res.name"/></span>
          <span><input type="text" v-model="res.phone"/></span>
          <span><input type="text" v-model="res.dong"/></span>
          <span><input type="text" v-model="res.ho"/></span>
          <span><input type="text" v-model="res.alert"/></span>
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
import { XlsxRead, XlsxJson } from "vue-xlsx/dist/vue-xlsx.es.js"

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
      modifyIs: false,
      searchNumber: "",
      start_time: format_time1(new Date(Date.now())),
      end_time: format_time1(new Date(Date.now())),
      resistIs: false,
      /// parking_product_list: [],
      titles: "",
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
      sort_item: {
        lp_click: false,
        name_click: false,
        phone_click: false,
        dong_click: false,
        ho_click: false,
        alert_click: false,
        contents_click: false
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
        data.kind === "delete_vehicle_at_vehicle_list"
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
          if (add.add === "vehicleManagement") this.titles = add.title
        })
      })
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
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null
    },
    modifyClose() {
      this.modifyIs = false
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
    lp_click: function() {
      console.log("lp sort")
      let temp10 = []
      if (this.sort_item.lp_click === false) {
        console.log("lp sort1")
        this.sort_item.lp_click = true
        temp10 = _.sortBy(this.list_vehicle_list, "lp")
        temp10.reverse()
        return (this.list_vehicle_list = temp10)
      } else {
        console.log("lp sort2")
        this.sort_item.lp_click = false
        temp10 = _.sortBy(this.list_vehicle_list, "lp")
        return (this.list_vehicle_list = temp10)
      }
    },

    name_click: function() {
      console.log("name sort")
      let temp10 = []
      if (this.sort_item.name_click === false) {
        console.log("name sort1")
        this.sort_item.name_click = true
        temp10 = _.sortBy(this.list_vehicle_list, "name")
        temp10.reverse()
        return (this.list_vehicle_list = temp10)
      } else {
        console.log("name sort2")
        this.sort_item.name_click = false
        temp10 = _.sortBy(this.list_vehicle_list, "name")
        return (this.list_vehicle_list = temp10)
      }
    },
    phone_click: function() {
      console.log("phone sort")
      let temp10 = []
      if (this.sort_item.phone_click === false) {
        console.log("phone sort1")
        this.sort_item.phone_click = true
        temp10 = _.sortBy(this.list_vehicle_list, "phone")
        temp10.reverse()
        return (this.list_vehicle_list = temp10)
      } else {
        console.log("phone sort2")
        this.sort_item.phone_click = false
        temp10 = _.sortBy(this.list_vehicle_list, "phone")
        return (this.list_vehicle_list = temp10)
      }
    },
    dong_click: function() {
      console.log("dong sort")
      let temp10 = []
      if (this.sort_item.dong_click === false) {
        console.log("dong sort1")
        this.sort_item.dong_click = true
        temp10 = _.sortBy(this.list_vehicle_list, "dong")
        temp10.reverse()
        return (this.list_vehicle_list = temp10)
      } else {
        console.log("dong sort2")
        this.sort_item.productName_click = false
        temp10 = _.sortBy(this.list_vehicle_list, "dong")
        return (this.list_vehicle_list = temp10)
      }
    },
    ho_click: function() {
      console.log("ho sort")
      let temp10 = []
      if (this.sort_item.ho_click === false) {
        console.log("ho sort1")
        this.sort_item.ho_click = true
        temp10 = _.sortBy(this.list_vehicle_list, "ho")
        temp10.reverse()
        return (this.list_vehicle_list = temp10)
      } else {
        console.log("ho sort2")
        this.sort_item.ho_click = false
        temp10 = _.sortBy(this.list_vehicle_list, "kind1")
        return (this.list_vehicle_list = temp10)
      }
    },
    alert_click: function() {
      console.log("alert sort")
      let temp10 = []
      if (this.sort_item.alert_click === false) {
        console.log("alert sort1")
        this.sort_item.alert_click = true
        temp10 = _.sortBy(this.list_vehicle_list, "alert")
        temp10.reverse()
        return (this.list_vehicle_list = temp10)
      } else {
        console.log("alert sort2")
        this.sort_item.group_click = false
        temp10 = _.sortBy(this.list_vehicle_list, "alert")
        return (this.list_vehicle_list = temp10)
      }
    },
    contents_click: function() {
      console.log("contents sort")
      let temp10 = []
      if (this.sort_item.contents_click === false) {
        console.log("contents sort1")
        this.sort_item.contents_click = true
        temp10 = _.sortBy(this.list_vehicle_list, "contents")
        temp10.reverse()
        return (this.list_vehicle_list = temp10)
      } else {
        console.log("contents sort2")
        this.sort_item.contents_click = false
        temp10 = _.sortBy(this.list_vehicle_list, "contents")
        return (this.list_vehicle_list = temp10)
      }
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
