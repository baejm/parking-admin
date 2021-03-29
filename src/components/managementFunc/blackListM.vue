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
              <dt>구분</dt>
              <dd><input type="text" v-model="reg.kind1" /></dd>
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
              <dt>분류<span></span></dt>
              <dd><input type="text" v-model="current.kind1" /></dd>
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
          v-for="(res, index) in black_list"
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
          <span><input type="text" v-model="res.kind1" readonly/></span>
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
        { title: "구분", sortBy: false, standard: "kind1" },
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
        kind1: "",
        contents: "",
        number: ""
      },
      current: {
        lp: "",
        startTime: format_time1(new Date(Date.now())),
        endTime: "",
        name: "",
        phone: "",
        kind1: "",
        contents: "",
        number: ""
      },

      black_list: [],
      print_blakc_list: [],
      searchLp: "",
      searchDirection: "",
      locations: [],
      directions: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "blackListM") this.titles = add.title
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
        temp10 = _.sortBy(this.black_list, e.standard)
        temp10.reverse()
        return (this.black_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.black_list, e.standard)
        return (this.black_list = temp10)
      }
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.lp = c.lp
      this.current.name = c.name
      this.current.phone = c.phone
      this.current.kind1 = c.kind1
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
      this.reg.kind1 = ""
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
      obj.kind1 = this.reg.kind1
      obj.contents = this.reg.contents
      obj.time = Date.now()
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "create_black_list"
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
    black_list_fun(data) {
      this.black_list = []
      console.log("black_list_fun : ", data, data.docs.length)
      for (let i = 0; i < data.docs.length; i++) {
        let black_obj = {}
        black_obj.lp = data.docs[i].lp
        black_obj.name = data.docs[i].name
        black_obj.phone = data.docs[i].phone
        black_obj.kind1 = data.docs[i].kind1
        black_obj.time = format_time1(new Date(data.docs[i].time))
        black_obj.contnents = data.docs[i].contents
        black_obj.number = data.docs[i].lp.replace(/[가-힝]/gi, "")
        this.black_list.push(black_obj)
      }
      console.log("black_list: ", this.black_list)
      let temp = {}
      this.black_list.push(temp)
      this.black_list.pop()
      this.print_black_list = []
      for (let i = 0; i < this.black_list.length; i++) {
        let print = {}
        print.차량번호 = this.black_list[i].lp
        print.이름 = this.black_list[i].name
        print.전화번호 = this.black_list[i].phone
        print.구분 = this.black_list[i].kind1
        print.등록일시 = format_time1(new Date(this.black_list[i].time))
        print.메모 = this.black_list.contents
        this.print_black_list.push(print)
      }
    },
    modifyVehicle() {
      console.log("블랙리스트 수정")
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.contents = this.current.contents
      obj.kind1 = this.current.kind1
      obj.time = Date.now()
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "update_black_list"
      console.log("블랙리스트 수정 후 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("블랙리스트 삭제")
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.contents = this.current.contents
      obj.kind1 = this.current.kind1
      obj.time = Date.now()
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "delete_black_list"
      this.sendMessage(obj)
    },
    search() {
      var obj = {}
      obj.kind = ""
      obj.lp = this.searchLp
      obj.id = window.localStorage.getItem("admin_id")
      obj.pw = window.localStorage.getItem("admin_pw")
      obj.kind = "get_black_list"
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
      const data = XLSX.utils.json_to_sheet(this.print_black_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_블랙리스트관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_black_list") {
        console.log("get_black_list : ", data)
        this.black_list_fun(data)
      } else if (
        data.kind === "create_black_list" ||
        data.kind === "update_black_list" ||
        data.kind === "delete_black_list"
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
