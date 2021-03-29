<template>
  <div class="report_wrap">
    <!-- 등록팝업 -->
    <div
      class="resist_pop popup"
      v-show="resistIs"
      :class="{ column_1: Object.keys(this.reg).length < 8 }"
    >
      <div>
        <h3>{{ titles }} 등록</h3>
        <button @click="registClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>입주사ID</dt>
              <dd><input type="text" required v-model="reg.id" /></dd>
            </dl>
            <dl>
              <dt>패스워드</dt>
              <dd>
                <input type="password" id="start_time" v-model="reg.pw" />
              </dd>
            </dl>
            <dl>
              <dt>입주사명</dt>
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
              <dt>무료 주차 시간 (분)</dt>
              <dd><input type="text" v-model="reg.free_parking_time" /></dd>
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
              <dt>ID<span>(필수)</span></dt>
              <dd><input type="text" required v-model="current.id" /></dd>
            </dl>
            <dl>
              <dt>패스워드<span></span></dt>
              <dd><input type="text" v-model="current.pw" /></dd>
            </dl>
            <dl>
              <dt>입주사명<span></span></dt>
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
      <span class="small_title">입주사ID</span>
      <input class="search_icon" type="text" maxlength="8" v-model="searchID" />
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
          v-for="(res, index) in resident_list"
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
          <span
            ><input type="text" v-model="res.free_parking_time" readonly
          /></span>
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
        { title: "입주사 ID", sortBy: false, standard: "id" },
        { title: "패스워드", sortBy: false, standard: "pw" },
        { title: "입주사명", sortBy: false, standard: "company_name" },
        { title: "이름", sortBy: false, standard: "name" },
        { title: "연락처", sortBy: false, standard: "phone" },
        {
          title: "무료 주차 시간",
          sortBy: false,
          standard: "free_parking_time"
        },
        { title: "비고", sortBy: false, standard: "contents" }
      ],
      resistIs: false,
      modifyIs: false,
      searchID: "",
      reg: {
        id: "",
        pw: "",
        company_name: "",
        name: "",
        phone: "",
        free_parking_time: "",
        contents: ""
      },
      current: {
        id: "",
        pw: "",
        company_name: "",
        name: "",
        phone: "",
        free_parking_time: "",
        contents: ""
      },
      resident_list: [],
      discounted_product_list: [],
      print_resident_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "tenantM") this.titles = add.title
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
        temp10 = _.sortBy(this.resident_list, e.standard)
        temp10.reverse()
        return (this.resident_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.resident_list, e.standard)
        return (this.resident_list = temp10)
      }
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.id = c.id
      this.current.pw = c.pw
      this.current.company_name = c.company_name
      this.current.name = c.name
      this.current.phone = c.phone
      this.current.free_parking_time = c.free_parking_time
      this.current.contents = c.contents
      console.log("c : ", c)
      console.log("커랭스", Object.keys(this.current).length)
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
      this.reg.free_parking_time = "60"
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
      obj.free_parking_time = this.reg.free_parking_time
      obj.contents = this.reg.contents
      obj.kind = "create_resident_list"
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
      obj.free_parking_time = this.current.free_parking_time
      obj.contents = this.current.contents
      obj.time = Date.now()
      obj.kind = "update_resident_list"
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
      obj.free_parking_time = this.current.free_parking_time
      obj.contents = this.current.contents
      obj.time = Date.now()
      obj.kind = "delete_resident_list"
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    search() {
      var obj = {}
      obj.kind = "get_resident_list"
      if (this.searchID !== "") {
        obj.id = this.searchID
      }
      // obj.id = window.localStorage.getItem("id")
      this.sendMessage(obj)
    },
    resident_policy_list_fun(data) {
      let obj = {}
      obj.text = "무료"
      obj.value = ""
      obj.unit = ""
      this.discounted_product_list.push(obj)
      obj.text = "전액"
      obj.value = ""
      obj.unit = ""
      this.discounted_product_list.push(obj)
      for (let i = 0; i < data.docs.length; i++) {
        let obj = {}
        obj.text = data.docs[i].discountedProductName
        obj.id = data.docs[i].discountedProductID
        obj.value = data.docs[i].value
        obj.unit = data.docs[i].unit
      }
    },
    resident_list_fun(data) {
      this.resident_list = []
      //    console.log("resident_list_fun : ", data, data.docs.length)
      if (data.docs && data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          let resident_obj = {}
          resident_obj.id = data.docs[i].id
          resident_obj.pw = data.docs[i].pw
          resident_obj.company_name = data.docs[i].company_name
          resident_obj.name = data.docs[i].name
          resident_obj.phone = data.docs[i].phone
          resident_obj.free_parking_time = data.docs[i].free_parking_time
          resident_obj.time = format_time1(new Date(data.docs[i].time))
          resident_obj.contnents = data.docs[i].contents
          this.resident_list.push(resident_obj)
        }
        console.log("resident_list: ", this.resident_list)
        let temp = {}
        this.resident_list.push(temp)
        this.resident_list.pop()
        this.print_resident_list = []
        for (let i = 0; i < this.resident_list.length; i++) {
          let print = {}
          print.ID = this.resident_list[i].id
          print.패스워드 = this.resident_list[i].pw
          print.입주사명 = this.resident_list[i].company_name
          print.이름 = this.resident_list[i].name
          print.전화번호 = this.resident_list[i].phone
          print.무료주차시간 = this.resident_list[i].free_parking_time
          print.등록일시 = format_time1(new Date(this.resident_list[i].time))
          print.메모 = this.resident_list.contents
          this.print_resident_list.push(print)
        }
      }
    },
    resident_policy_list_search() {
      let obj = {}
      obj.kind = "get_resident_policy_list"
      console.log("get_resident_policy_list ---> search", obj)
      this.sendMessage(obj)
    },
    download() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.print_resident_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_입주사 관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_resident_list") {
        this.resident_list_fun(data)
      } else if (
        data.kind === "create_resident_list" ||
        data.kind === "update_resident_list" ||
        data.kind === "delete_resident_list"
      ) {
        this.search()
      } else if (data.kind === "get_resident_policy_list") {
        console.log("get_resident_policy_list : ", data)
        this.resident_policy_list_fun(data)
      }
    })
    this.search()
    this.changeTitle()
    this.resident_policy_list_search()
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
