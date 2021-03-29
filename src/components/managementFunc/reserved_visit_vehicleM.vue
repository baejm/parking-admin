<template>
  <div class="report_wrap">
    <!-- 등록팝업 -->
    <div
      class="resist_pop popup"
      v-show="resistIs"
      :class="{ column_1: Object.keys(this.reg).length < 10 }"
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
              <dd><input type="text" required v-model="reg.lp" /></dd>
            </dl>
            <dl>
              <dt>이름</dt>
              <dd><input type="text" v-model="reg.name" /></dd>
            </dl>
            <dl>
              <dt>전화번호</dt>
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
              <dt>비고</dt>
              <dd><input type="text" v-model="reg.contents" /></dd>
            </dl>
            <div class="btns">
              <button @click.prevent="registNew" class="writebtn">등록</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- 수정팝업 -->
    <div
      class="modify_pop popup"
      v-show="modifyIs"
      :class="{ column_1: Object.keys(this.current).length < 10 }"
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
                  placeholder="이곳에 차량번호를 입력해주세요."
                  required
                  v-model="current.lp"
                />
              </dd>
            </dl>
            <dl>
              <dt>이름<span></span></dt>
              <dd><input type="text" v-model="current.name" /></dd>
            </dl>
            <dl>
              <dt>전화번호</dt>
              <dd><input type="text" v-model="current.phone" /></dd>
            </dl>
            <dl>
              <dt>동<span></span></dt>
              <dd><input type="text" v-model="current.dong" /></dd>
            </dl>
            <dl>
              <dt>호<span></span></dt>
              <dd><input type="text" v-model="current.ho" /></dd>
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
    <form class="menu_title">
      <span class="small_title">차량번호</span>
      <input
        class="search_icon"
        type="text"
        maxlength="8"
        v-model="searchLp"
        placeholder="예) 12가3456"
      />
      <span class="small_title">동</span>
      <input
        class="search_icon"
        type="text"
        maxlength="8"
        v-model="searchDong"
      />
      <span class="small_title">호</span>
      <input class="search_icon" type="text" maxlength="8" v-model="searchHo" />
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
          v-for="(res, index) in reserved_visit_vehicle_list"
          :key="index"
          @click="modifyOpen(res)"
        >
          <span> {{ index + 1 }}</span>
          <span class="lp"
            ><input
              type="text"
              v-model="res.lp"
              readonly
              v-on:change="contents_change(index)"
          /></span>
          <span><input type="text" v-model="res.name" readonly/></span>
          <span><input type="text" v-model="res.phone" readonly/></span>
          <span><input type="text" v-model="res.dong" readonly/></span>
          <span><input type="text" v-model="res.ho" readonly/></span>
          <span><input type="text" v-model="res.time" readonly/></span>
          <span
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
import config from "../../config.js"
import _ from "underscore"
import { mapState } from "vuex"
import XLSX from "xlsx"
export default {
  data() {
    return {
      listItem: [
        { title: "번호" },
        { title: "차량번호", sortBy: false, standard: "lp" },
        { title: "이름", sortBy: false, standard: "name" },
        { title: "연락처", sortBy: false, standard: "phone" },
        { title: "동", sortBy: false, standard: "dong" },
        { title: "호", sortBy: false, standard: "ho" },
        { title: "등록일시", sortBy: false, standard: "time" },
        { title: "비고", sortBy: false, standard: "contents" }
      ],
      resistIs: false,
      modifyIs: false,
      reg: {
        lp: "",
        startTime: format_time1(new Date(Date.now())),
        endTime: "",
        name: "",
        phone: "",
        dong: "",
        ho: "",
        contents: "",
        number: ""
      },
      current: {
        lp: "",
        startTime: format_time1(new Date(Date.now())),
        endTime: "",
        name: "",
        phone: "",
        dong: "",
        ho: "",
        contents: "",
        number: ""
      },

      reserved_visit_vehicle_list: [],
      print_reserved_visit_vehicle_list: [],
      searchLp: "",
      searchDong: "",
      searchHo: "",
      searchDirection: "",
      locations: [],
      directions: []
    }
  },
  computed: {
    ...mapState(["freeMainTitles"])
  },
  methods: {
    changeTitle() {
      this.freeMainTitles.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "reserved_visit_vehicleM") this.titles = add.title
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
        temp10 = _.sortBy(this.reserved_visit_vehicle_list, e.standard)
        temp10.reverse()
        return (this.reserved_visit_vehicle_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.reserved_visit_vehicle_list, e.standard)
        return (this.reserved_visit_vehicle_list = temp10)
      }
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.lp = c.lp
      this.current.name = c.name
      this.current.phone = c.phone
      this.current.dong = c.dong
      this.current.ho = c.ho
      this.current.number = c.number
      this.current.contents = c.contents
      console.log("c : ", c.lp)
      console.log("this : ", this)
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
      this.reg.contents = ""
      this.reg.number = ""
      this.reg.time = ""
      this.resistIs = true
      this.modifyIs = false
    },
    registClose() {
      this.resistIs = false
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      console.log("this.reg : ", this.reg)
      let obj = {}
      obj.lp = this.reg.lp
      obj.name = this.reg.name
      obj.phone = this.reg.phone
      obj.dong = this.reg.dong
      obj.ho = this.reg.ho
      obj.contents = this.reg.contents
      obj.time = Date.now()
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "create_reserved_visit_vehicle_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    loc_dir() {
      this.locations = []
      this.directions = []
      let location_list = []
      let direction_list = []
      location_list = config.location_list
      direction_list = config.direction_list
      this.locations = location_list
      this.directions = direction_list
      let temp = {}
      this.locations.push(temp)
      this.locations.splice(this.locations.length - 1, 1)
      this.directions.push(temp)
      this.directions.splice(this.directions.length - 1, 1)
    },
    reserved_visit_vehicle_list_fun(data) {
      this.reserved_visit_vehicle_list = []
      console.log("reserved_visit_vehicle_list_fun : ", data, data.docs.length)
      for (let i = 0; i < data.docs.length; i++) {
        let obj = {}
        obj.lp = data.docs[i].lp
        obj.name = data.docs[i].name
        obj.phone = data.docs[i].phone
        obj.dong = data.docs[i].dong
        obj.ho = data.docs[i].ho
        obj.time = format_time1(new Date(data.docs[i].time))
        obj.contnents = data.docs[i].contents
        obj.number = data.docs[i].lp.replace(/[가-힝]/gi, "")
        this.reserved_visit_vehicle_list.push(obj)
      }
      console.log(
        "reserved_visit_vehicle_list: ",
        this.reserved_visit_vehicle_list
      )
      let temp = {}
      this.reserved_visit_vehicle_list.push(temp)
      this.reserved_visit_vehicle_list.pop()
      this.print_reserved_visit_vehicle_list = []
      for (let i = 0; i < this.reserved_visit_vehicle_list.length; i++) {
        let print = {}
        print.차량번호 = this.reserved_visit_vehicle_list[i].lp
        print.이름 = this.reserved_visit_vehicle_list[i].name
        print.전화번호 = this.reserved_visit_vehicle_list[i].phone
        print.동 = this.reserved_visit_vehicle_list[i].dong
        print.호 = this.reserved_visit_vehicle_list[i].ho
        print.등록일시 = format_time1(
          new Date(this.reserved_visit_vehicle_list[i].time)
        )
        print.메모 = this.reserved_visit_vehicle_list.contents
        this.print_reserved_visit_vehicle_list.push(print)
      }
    },
    modifyVehicle() {
      console.log("방문예약차량 수정")
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.contents = this.current.contents
      obj.dong = this.current.dong
      obj.ho = this.current.ho
      obj.time = Date.now()
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "update_reserved_visit_vehicle_list"
      console.log("방문예약차량 수정 후 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("방문예약차량 삭제")
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.contents = this.current.contents
      obj.dong = this.current.dong
      obj.ho = this.current.ho
      obj.time = Date.now()
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "delete_reserved_visit_vehicle_list"
      this.sendMessage(obj)
    },
    search() {
      var obj = {}
      if (this.searchLp !== "") {
        obj.lp = this.searchLp
      }

      if (this.searchDong !== "") {
        obj.dong = this.searchDong
      }
      if (this.searchHo !== "") {
        obj.ho = this.searchHo
      }
      obj.id = window.localStorage.getItem("admin_id")
      obj.kind = "get_reserved_visit_vehicle_list"
      console.log("reserved_visit_vehicle_list search : ", obj)
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    download() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(
        this.print_reserved_visit_vehicle_list
      )
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_방문예약차량 관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_reserved_visit_vehicle_list") {
        console.log("get_reserved_visit_vehicle_list : ", data)
        this.reserved_visit_vehicle_list_fun(data)
      } else if (
        data.kind === "create_reserved_visit_vehicle_list" ||
        data.kind === "update_reserved_visit_vehicle_list" ||
        data.kind === "delete_reserved_visit_vehicle_list"
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
} */

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
