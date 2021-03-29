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
              <dt>개시시점</dt>
              <dd><input type="date" v-model="reg.startTime" /></dd>
            </dl>
            <dl>
              <dt>종료시점</dt>
              <dd><input type="date" v-model="reg.endTime" /></dd>
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
              <dt>입주사ID</dt>
              <dd><input type="text" v-model="reg.resident_id" /></dd>
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
              <dt>개시시점<span></span></dt>
              <dd><input type="time" v-model="current.startTime" /></dd>
            </dl>
            <dl>
              <dt>개시시점<span></span></dt>
              <dd><input type="time" v-model="current.endTime" /></dd>
            </dl>
            <dl>
              <dt>이름</dt>
              <dd><input type="text" v-model="current.name" /></dd>
            </dl>
            <dl>
              <dt>전화번호</dt>
              <dd><input type="text" v-model="current.phone" /></dd>
            </dl>
            <dl>
              <dt>입주사ID<span></span></dt>
              <dd><input type="text" v-model="current.resident_id" /></dd>
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
          v-for="(ad, index) in resistRocord"
          :key="index"
          @click="modifyOpen(ad)"
        >
          <span> {{ index + 1 }}</span>
          <span class="lp"><input type="text" v-model="ad.lp" readonly/></span>
          <span class="startTime"
            ><input type="text" v-model="ad.startTime" readonly
          /></span>
          <span class="endTime"
            ><input type="text" v-model="ad.endTime" readonly
          /></span>
          <span class="name"
            ><input type="text" v-model="ad.name" readonly
          /></span>
          <span class="phone"
            ><input type="text" v-model="ad.phone" readonly
          /></span>
          <span class="id"
            ><input type="text" v-model="ad.resident_id" readonly
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
// import spinners from "../components/spinners"
export default {
  data: function() {
    return {
      isLoading: false,
      searchLp: "",
      id: "",
      resistIs: false,
      modifyIs: false,
      resistRocord: [],
      print_resistRocord: [],
      admin: [
        {
          order: "",
          lp: "",
          startTime: "",
          endTime: "",
          name: "",
          phone: "",
          resident_id: "",
          contents: "",
          number: "",
          check: true
        }
      ],
      current: {
        lp: "",
        startTime: "",
        endTime: "",
        name: "",
        phone: "",
        contents: "",
        number: "",
        resident_id: ""
      },
      sort_item: {
        lp_click: false,
        startTime_click: false,
        endTime_click: false,
        name_click: false,
        phone_click: false,
        contents_click: false
      },
      reg: {
        lp: "",
        startTime: format_time1(new Date(Date.now())),
        endTime: format_time1(new Date(Date.now())),
        name: "",
        phone: "",
        resident_id: "",
        contents: "",
        number: ""
      },
      listItem: [
        { title: "번호", standard: "" },
        { title: "차량번호", sortBy: false, standard: "lp" },
        {
          title: "개시시점",
          sortBy: false,
          standard: "startTime",
          class: "time"
        },
        {
          title: "종료시점",
          sortBy: false,
          standard: "endTime",
          class: "time"
        },
        { title: "이름", sortBy: false, standard: "name", class: "name" },
        { title: "전화번호", sortBy: false, standard: "phone", class: "phone" },
        { title: "입주사ID", sortBy: false, standard: "resident_id" },
        { title: "메모", sortBy: false, standard: "contents" }
      ]
    }
  },
  created() {
    // this.isLoading = true
    this.$socket.on("message_from_server", data => {
      console.log("data.kind : ", data.kind)
      // this.isLoading = false
      this.sales_list(data)
    }),
      this.search1()
    this.changeTitle()
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
          if (add.add === "manageVisitReservation") {
            this.titles = add.title
            //     console.log(" this.titles : ", this.titles)
          }
        })
      })
    },
    registOpen() {
      let now = Date.now()
      console.log("now :", now)
      let end_time = now + 48 * 60 * 60 * 1000
      console.log("end_time : ", end_time)
      this.admin.lp = ""
      this.admin.startTime = format_time1(new Date(now))
      this.admin.endTime = format_time1(new Date(end_time))
      this.admin.name = ""
      this.admin.phone = ""
      this.admin.resident_id = ""
      this.admin.contents = ""
      this.admin.number = ""
      this.resistIs = true
    },
    registClose() {
      this.resistIs = false
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      console.log("this.admin : ", this.admin)
      let obj = {}
      obj.lp = this.reg.lp
      obj.period_start = this.admin.startTime
      obj.period_end = this.admin.endTime
      obj.name = this.reg.name
      obj.phone = this.reg.phone
      // obj.id = localStorage.getItem("id")
      obj.id = this.reg.resident_id
      obj.contents = this.reg.contents
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "create_visited_reserve_vehicle_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    search() {
      console.log("검색 버튼을 눌렀습니다.", this.searchLp)
      if (this.searchLp !== "") {
        let temp_resistRocord = []
        for (let i = 0; i < this.resistRocord.length; i++) {
          if (this.resistRocord[i].lp.indexOf(this.searchLp) !== -1) {
            temp_resistRocord.push(this.resistRocord[i])
          }
        }
        this.resistRocord = temp_resistRocord
      } else {
        this.search1()
      }
    },
    search1() {
      let obj = {}
      obj.kind = "get_visited_reserve_vehicle_list"
      this.sendMessage(obj)
    },
    sales_list(data) {
      if (data.kind === "get_visited_reserve_vehicle_list") {
        console.log("visited_reserve_vehicle_list : ", data) //(format_time1(new Date(sales_list[i].period_end)).toString()).substring(0,11)
        var last_time = {}
        var visited_reserve_vehicle_list = []
        this.resistRocord = []
        if (data.docs && data.docs.length > 0) {
          if (data.docs && data.docs.length === 1) {
            visited_reserve_vehicle_list.push(data.docs[0])
          } else {
            for (let k = 0; k < data.docs.length; k++) {
              if (data.docs[k].mark === true) {
                continue
              }
              last_time = data.docs[k]
              for (let l = k + 1; l < data.docs.length; l++) {
                if (data.docs[k].lp === data.docs[l].lp) {
                  if (last_time.time < data.docs[l].time) {
                    last_time = data.docs[l]
                  }
                  data.docs[l].mark = true
                }
              }
              visited_reserve_vehicle_list.push(last_time)
            }
          }
          for (var i = 0; i < visited_reserve_vehicle_list.length; i++) {
            var obj = {}
            obj.lp = visited_reserve_vehicle_list[i].lp
            obj.name = " "
            if (visited_reserve_vehicle_list[i].name) {
              obj.name = visited_reserve_vehicle_list[i].name
            }
            obj.phone = " "
            if (visited_reserve_vehicle_list[i].phone) {
              obj.phone = visited_reserve_vehicle_list[i].phone
            }
            obj.startTime = format_time1(new Date(0))
            if (visited_reserve_vehicle_list[i].period_start) {
              obj.startTime = format_time1(
                new Date(visited_reserve_vehicle_list[i].period_start) //(format_time1(new Date(sales_list[i].period_end)).toString()).substring(0,11)
              )
                .toString()
                .substring(0, 17)
              obj.period_start = visited_reserve_vehicle_list[i].period_start
            }
            obj.endTime = format_time1(new Date(0))
            if (visited_reserve_vehicle_list[i].period_end) {
              obj.endTime = format_time1(
                new Date(visited_reserve_vehicle_list[i].period_end)
              )
                .toString()
                .substring(0, 17)
              obj.period_end = visited_reserve_vehicle_list[i].period_end
            }
            obj.number = " "
            if (visited_reserve_vehicle_list[i].number) {
              obj.number = visited_reserve_vehicle_list[i].number
            }
            obj.resident_id = visited_reserve_vehicle_list[i].id
            obj.contents = " "
            if (visited_reserve_vehicle_list[i].contents) {
              obj.contents = visited_reserve_vehicle_list[i].contents
            }

            this.resistRocord.push(obj)
          }

          console.log("this.resistRocord : ", this.resistRocord)
          this.print_resistRocord = []
          for (let i = 0; i < this.resistRocord.length; i++) {
            let obj = {}
            obj.차량번호 = this.resistRocord[i].lp
            obj.시작시각 = this.resistRocord[i].startTime
            obj.종료시각 = this.resistRocord[i].endTime
            obj.이름 = this.resistRocord[i].name
            obj.전화번호 = this.resistRocord[i].phone
            obj.입주사ID = this.resistRocord[i].resident_id
            obj.메모 = this.resistRocord[i].contents
            this.print_resistRocord.push(obj)
          }
        }
      } else if (
        data.kind === "create_visited_reserve_vehicle_list" ||
        data.kind === "update_visited_reserve_vehicle_list" ||
        data.kind === "delete_visited_reserve_vehicle_list"
      ) {
        this.search1()
      }
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.lp = c.lp
      this.current.name = c.name
      this.current.phone = c.phone
      this.current.startTime = c.startTime
      this.current.endTime = c.endTime
      this.current.resident_id = c.resident_id
      // this.current.resident_id = localStorage.getItem("id")
      this.current.contents = c.contents
      this.$refs.btn.focus()
      console.log("c : ", c.lp)
      console.log("this : ", this)
    },
    modifyClose() {
      this.modifyIs = false
    },
    searchItems() {
      console.log("테스트")
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    modifyVehicle() {
      console.log("차량정보 수정")
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.name = this.current.name
      obj.phone1 = this.current.phone
      obj.period_start = get_datetime(this.current.startTime)
      obj.period_end = get_datetime(this.current.endTime)
      obj.contents = this.current.contents
      obj.id = this.current.resident_id
      /// obj.id = localStorage.getItem("id")
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "update_visited_reserve_vehicle_list"
      console.log("차량정보수정 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("차량정보 삭제")
      this.modifyClose()
      let obj = {}

      obj.lp = this.current.lp
      obj.name = this.current.name
      obj.phone1 = this.current.phone
      obj.period_start = this.current.period_start
      obj.period_end = this.current.eperiod_end
      obj.contents = this.current.contents
      //obj.id = localStorage.getItem("id")
      obj.id = this.current.resident_id
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "delete_visited_reserve_vehicle_list"
      this.sendMessage(obj)
    },
    download: function() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.print_resistRocord)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_방문예약_차량관리_" + postfix + ".xlsx"
      )
    }
  }
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

function num_to_str($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}

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
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
