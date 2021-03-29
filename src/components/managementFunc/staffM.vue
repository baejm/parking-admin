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
              <dt>ID</dt>
              <dd><input type="text" required v-model="reg.id" /></dd>
            </dl>
            <dl>
              <dt>패스워드</dt>
              <dd>
                <input type="password" id="start_time" v-model="reg.pw" />
              </dd>
            </dl>
            <dl>
              <dt>회사명</dt>
              <dd><input type="text" v-model="reg.company_name" /></dd>
            </dl>
            <dl>
              <dt>이름</dt>
              <dd><input type="text" id="end_time" v-model="reg.name" /></dd>
            </dl>
            <dl>
              <dt>전화번호</dt>
              <dd><input type="text" v-model="reg.phone" /></dd>
            </dl>
            <dl>
              <dt>직책</dt>
              <dd><input type="text" v-model="reg.rank" /></dd>
            </dl>
            <dl>
              <dt>클래스</dt>
              <dd>
                <select v-model="reg.manager">
                  <option
                    v-for="(manager, index) in manager_list"
                    v-bind:key="index"
                  >
                    {{ manager.text }}
                  </option>
                </select>
              </dd>
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
              <dt>ID<span class="essential">*</span></dt>
              <dd><input type="text" required v-model="current.id" /></dd>
            </dl>
            <dl>
              <dt>패스워드<span></span></dt>
              <dd><input type="text" v-model="current.pw" /></dd>
            </dl>
            <dl>
              <dt>회사명<span></span></dt>
              <dd><input type="text" v-model="current.company_name" /></dd>
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
              <dt>직책</dt>
              <dd><input type="text" v-model="current.rank" /></dd>
            </dl>
            <dl>
              <dt>클래스</dt>
              <dd><input type="text" v-model="current.manager" /></dd>
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
      <span class="small_title">ID</span>
      <input class="search_icon" type="text" maxlength="8" v-model="searchID" />
      <span class="small_title">이름</span>
      <input
        class="search_icon"
        type="text"
        maxlength="8"
        v-model="searchName"
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
          v-for="(res, index) in emp_list"
          :key="index"
          @click="modifyOpen(res)"
        >
          <span> {{ index + 1 }}</span>
          <span class="lp"
            ><input
              type="text"
              v-model="res.id"
              readonly
              v-on:change="contents_change(index)"
          /></span>
          <span><input type="text" v-model="res.pw" readonly/></span>
          <span><input type="text" v-model="res.company_name" readonly/></span>
          <span><input type="text" v-model="res.name" readonly/></span>
          <span><input type="text" v-model="res.phone" readonly/></span>
          <span><input type="text" v-model="res.rank" readonly/></span>
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
        { title: "ID", sortBy: false, standard: "id" },
        { title: "패스워드", sortBy: false, standard: "pw" },
        { title: "회사명", sortBy: false, standard: "company_name" },
        { title: "이름", sortBy: false, standard: "name" },
        { title: "전화번호", sortBy: false, standard: "phone" },
        { title: "직책", sortBy: false, standard: "rank" },
        { title: "등록일시", sortBy: false, standard: "manager" },
        { title: "비고", sortBy: false, standard: "contents" }
      ],
      resistIs: false,
      modifyIs: false,
      searchID: "",
      searchName: "",
      reg: {
        id: "",
        pw: "",
        company_name: "",
        name: "",
        phone: "",
        rank: "",
        manager: "",
        contents: ""
      },
      current: {
        id: "",
        pw: "",
        company_name: "",
        name: "",
        phone: "",
        rank: "",
        manager: "",
        contents: ""
      },
      emp_list: [],
      manager_list: [],
      print_emp_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "staffM") this.titles = add.title
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
        temp10 = _.sortBy(this.emp_list, e.standard)
        temp10.reverse()
        return (this.emp_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.emp_list, e.standard)
        return (this.emp_list = temp10)
      }
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.id = c.id
      this.current.pw = c.pw
      this.current.company_name = c.company_name
      this.current.name = c.name
      this.current.phone = c.phone
      this.current.rank = c.rank
      this.current.manager = c.manager
      this.current.contents = c.contents
      console.log("c : ", c)
    },
    modifyClose() {
      this.modifyIs = false
    },
    registOpen() {
      this.reg.id = ""
      this.reg.pw = ""
      this.reg.company_name = ""
      this.reg.name = ""
      this.reg.phone = ""
      this.reg.contents = ""
      this.reg.time = ""
      this.reg.rank = ""
      this.reg.manager = ""
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
      obj.id = this.reg.id
      obj.pw = this.reg.pw
      obj.name = this.reg.name
      obj.phone = this.reg.phone
      obj.company_name = this.reg.company_name
      obj.rank = this.reg.rank
      obj.manager = this.reg.manager
      obj.contents = this.reg.contents
      obj.time = Date.now()
      obj.kind = "create_employee_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    modifyVehicle() {
      console.log("입주사 정보 수정")
      this.modifyClose()
      let obj = {}
      obj.id = this.current.id
      obj.pw = this.current.pw
      obj.company_name = this.current.company_name
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.rank = this.current.rank
      obj.manager = this.current.manager
      obj.contents = this.current.contents
      obj.time = Date.now()
      obj.kind = "update_employee_list"
      console.log("입주사 정보 수정 후 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("입주사 정보 삭제")
      this.modifyClose()
      let obj = {}
      obj.id = this.current.id
      obj.pw = this.current.pw
      obj.company_name = this.current.company_name
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.rank = this.current.rank
      obj.manager = this.current.manager
      obj.contents = this.current.contents
      obj.time = Date.now()
      obj.kind = "delete_employee_list"
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    search() {
      var obj = {}
      // if(this.searchID !== ""){
      obj.searchID = this.searchID
      // }
      // if(this.searchName !== ""){
      obj.searchName = this.searchName
      //  }
      obj.kind = "get_employee_list"
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.admin_pw = window.localStorage.getItem("admin_pw")
      this.sendMessage(obj)
    },
    emp_list_fun(data) {
      this.emp_list = []
      console.log("emp_list_fun : ", data, data.docs.length)
      if (data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          let emp_obj = {}
          emp_obj.id = data.docs[i].id
          emp_obj.pw = data.docs[i].pw
          emp_obj.company_name = data.docs[i].company_name
          emp_obj.name = data.docs[i].name
          emp_obj.phone = data.docs[i].phone
          emp_obj.rank = data.docs[i].rank
          emp_obj.manager = data.docs[i].manager
          emp_obj.time = format_time1(new Date(data.docs[i].time))
          emp_obj.contnents = data.docs[i].contents
          this.emp_list.push(emp_obj)
        }
        console.log("emp_list: ", this.emp_list)
        let temp = {}
        this.emp_list.push(temp)
        this.emp_list.pop()
        this.print_emp_list = []
        for (let i = 0; i < this.emp_list.length; i++) {
          let print = {}
          print.ID = this.emp_list[i].id
          print.패스워드 = this.emp_list[i].pw
          print.입주사명 = this.emp_list[i].company_name
          print.이름 = this.emp_list[i].name
          print.전화번호 = this.emp_list[i].phone
          print.직책 = this.emp_list[i].rank
          print.클래스 = this.emp_list[i].manager
          print.등록일시 = format_time1(new Date(this.emp_list[i].time))
          print.메모 = this.emp_list.contents
          this.print_emp_list.push(print)
        }
      }
    },
    start() {
      this.manager_list = config.manager_list
      console.log("this.manager_list : ", this.manager_list)
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
      const data = XLSX.utils.json_to_sheet(this.print_emp_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_직원 관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_employee_list") {
        this.emp_list_fun(data)
      } else if (
        data.kind === "create_employee_list" ||
        data.kind === "update_employee_list" ||
        data.kind === "delete_employee_list"
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
}
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style></style>
