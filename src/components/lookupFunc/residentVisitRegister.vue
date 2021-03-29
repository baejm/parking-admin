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
              <dt>입주사ID</dt>
              <dd><input type="text" v-model="reg.id" /></dd>
            </dl>
            <dl>
              <dt>입주사명</dt>
              <dd><input type="text" v-model="reg.company" /></dd>
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
              <dt>입주사ID<span></span></dt>
              <dd><input type="text" v-model="current.id" /></dd>
            </dl>
            <dl>
              <dt>회사명</dt>
              <dd><input type="text" v-model="current.company" /></dd>
            </dl>
            <dl>
              <dt>비고</dt>
              <dd><input type="text" v-model="current.contents" /></dd>
            </dl>
            <div class="btns">
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
          v-for="(ad, index) in visited_resident_vehicle_list"
          :key="index"
          @click="modifyOpen(ad)"
        >
          <span> {{ index + 1 }}</span>
          <span class="lp"><input type="text" v-model="ad.lp" readonly/></span>
          <span class="id"><input type="text" v-model="ad.id" readonly/></span>
          <span class="name"
            ><input type="text" v-model="ad.company" readonly
          /></span>
          <span class="contents"
            ><input type="text" v-model="ad.contents" readonly
          /></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//import _ from "underscore"
import XLSX from "xlsx"
import { mapState } from "vuex"
import config from "../../config.js"
export default {
  data() {
    return {
      start_time: new Date(),
      end_time: new Date(),
      searchNumber: "",
      btn: "",
      reg: [],
      visited_resident_vehicle_list: [],
      print_visited_resident_vehicle_list: [],
      current: {
        lp: "",
        residentID: "",
        residentPW: "",
        company: "",
        contents: ""
      },
      sort_item: {
        lp: false,
        company: false,
        id: false,
        contents: false
      },
      listItem: [
        { title: "번호", standard: "" },
        { title: "차량번호", sortBy: false, standard: "lp" },
        { title: "입주사ID", sortBy: false, standard: "id" },
        {
          title: " 입주사명",
          sortBy: false,
          standard: "company",
          class: "name"
        },
        { title: "메모", sortBy: false, standard: "contents" }
      ],
      modifyIs: false,
      registClose: false,
      resistIs: false
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      //  console.log(" this.titles : ", "here")
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          //  console.log(" add : ", add)
          if (add.add === "residentVisitRegister") {
            this.titles = add.title
            //     console.log(" this.titles : ", this.titles)
          }
        })
      })
    },
    socket_process(data) {
      // console.log("socket_process===>", data)
      if (
        data.status === "ok" &&
        data.kind === "get_visited_resident_vehicle_list"
      ) {
        this.visited_resident_vehicle_list = []
        let visited_resident_vehicle_obj_list = []
        for (let i = 0; i < data.docs.length; i++) {
          data.docs[i].flag = false
        }
        for (let i = 0; i < data.docs.length; i++) {
          for (let j = i; j < data.docs.length; j++) {
            if (i === j) {
              if (data.docs[i].flag === false) {
                visited_resident_vehicle_obj_list.push(data.docs[i])
              }
            } else {
              if (data.docs[i].lp === data.docs[j].lp) {
                data.docs[i].flag = true
              }
            }
          }
        }
        for (let i = 0; i < visited_resident_vehicle_obj_list.length; i++) {
          let visited_resident_vehicle = {}
          visited_resident_vehicle.lp = visited_resident_vehicle_obj_list[i].lp
          visited_resident_vehicle.id = visited_resident_vehicle_obj_list[i].id
          visited_resident_vehicle.company =
            visited_resident_vehicle_obj_list[i].company
          visited_resident_vehicle.contents =
            visited_resident_vehicle_obj_list[i].contents
          visited_resident_vehicle.reg_time =
            visited_resident_vehicle_obj_list[i].reg_time
          this.visited_resident_vehicle_list.push(visited_resident_vehicle)
        }
        this.print_visited_resident_vehicle_list = []
        for (let i = 0; i < this.visited_resident_vehicle_list.length; i++) {
          let print_visited_resident_vehicle = {}
          print_visited_resident_vehicle.차량번호 = this.visited_resident_vehicle_list[
            i
          ].lp
          print_visited_resident_vehicle.입주사ID = this.visited_resident_vehicle_list[
            i
          ].id
          print_visited_resident_vehicle.입주사명 = this.visited_resident_vehicle_list[
            i
          ].company
          print_visited_resident_vehicle.메모 = this.visited_resident_vehicle_list[
            i
          ].contents
          this.print_visited_resident_vehicle_list.push(
            print_visited_resident_vehicle
          )
        }
        console.log(this.visited_resident_vehicle_list)
      } else if (
        data.status === "ok" &&
        data.kind === "delete_visited_resident_vehicle_list"
      ) {
        console.log("delete_visited_resident_vehicle_lsit search()")
        this.search()
      }
    },
    listAdd() {
      // this.dataList = this.inputList
      this.dataList.unshift({
        getTimer: this.listTimer,
        getPc: this.listPc,
        getPlace: this.listPlace,
        getWay: this.listWay,
        getCarNumer: this.listCarNumer,
        getType: this.listType,
        getLocation: this.listLocation,
        getMemo: this.listMemo
      })
      this.listTimer = ""
      this.listPc = ""
      this.listPlace = ""
      this.listWay = ""
      this.listCarNumer = ""
      this.listType = ""
      this.listLocation = ""
      this.listMemo = ""
    },
    date_set() {
      let d = new Date()
      //let d1 = d - (24*60*60*1000);
      //console.log("d : ", d, " d1 : ", d1);
      var str_start =
        d.getFullYear() +
        "-" +
        itoStr(d.getMonth() + 1) +
        "-" +
        itoStr(d.getDate()) +
        "T00:00"
      var str_end =
        d.getFullYear() +
        "-" +
        itoStr(d.getMonth() + 1) +
        "-" +
        itoStr(d.getDate()) +
        "T23:59"
      this.start_time = str_start
      this.end_time = str_end
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    search() {
      var obj = {}
      obj.kind = "get_visited_resident_vehicle_list"
      obj.lp = this.searchNumber
      obj.start_time = get_start_time(this.start_time)
      obj.end_time = get_end_time(this.end_time)
      obj.id = window.localStorage.getItem("admin_id")
      obj.pw = window.localStorage.getItem("admin_pw")
      console.log("lp_search() : ", obj)
      this.sendMessage(obj)
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.id = c.id
      this.current.lp = c.lp
      this.current.company = c.company
      this.current.name = c.name
      this.current.reg_time = c.reg_time
      this.current.contents = c.contents
      console.log("c : ", c.id)
      console.log("this : ", this)
    },
    modifyClose() {
      this.modifyIs = false
    },
    deleteVehicle() {
      console.log("차량정보 삭제")
      this.modifyClose()
      let obj = {}
      obj.id = this.current.id
      obj.pw = this.current.pw
      obj.company = this.current.company
      obj.lp = this.current.lp
      obj.reg_time = this.current.reg_time
      obj.contents = this.current.contents
      obj.kind = "delete_visited_resident_vehicle_list"
      console.log("차량정보 삭제 ", obj)
      this.sendMessage(obj)
    },
    openImg(c) {
      return (c.imageShow = true)
      //console.log(" openImg c : ", c);
    },
    download: function() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(
        this.print_visited_resident_vehicle_list
      )
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_입주사방문차량_" + postfix + ".xlsx"
      )
    },
    closeImg(c) {
      return (c.imageShow = false)
      // console.log(" closeImg c : ", c);
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      console.log("resident_discount_data.kind : ", data)
      this.socket_process(data)
    })
    this.date_set()
    this.search()
    this.changeTitle()
    window.addEventListener("scroll", this.handleScroll)
  }
}

// function format_time1(dat) {
//   var str = ""
//   str += dat.getFullYear()
//   str += "." + num_to_str(dat.getMonth() + 1)
//   str += "." + num_to_str(dat.getDate())
//   str += ". " + num_to_str(dat.getHours())
//   str += ":" + num_to_str(dat.getMinutes())
//   str += ":" + num_to_str(dat.getSeconds())
//   return str
// }

// function num_to_str($num) {
//   $num < 10 ? ($num = "0" + $num) : $num
//   return $num.toString()
// }
/*
function get_datetime(str) {
	var res = str.split(/[-T.:\s]+/);
	var d = new Date(parseInt(res[0]), parseInt(res[1])-1, parseInt(res[2]), parseInt(res[3]), parseInt(res[4]), 0, 0);
	return d.getTime();
} */

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

function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
