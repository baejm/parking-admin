<template>
  <div class="report_wrap">
    <div class="title">
      <h2>{{ titles }}</h2>
    </div>
    <form class="menu_title">
      <span class="small_title">날짜</span>
      <input type="datetime-local" id="start_time" v-model="start_time" />
      <span>~</span>
      <input type="datetime-local" id="end_time" v-model="end_time" />
      <span class="small_title">입주사ID</span>
      <select v-model="searchResidentID">
        <option v-for="(resident, index) in resident_list" :key="index">
          {{ resident.id }}
        </option>
      </select>
      <span class="small_title">차량번호</span>
      <input type="text" id="start_time" v-model="searchLp" />
      <button @click.prevent="search" type="submit">
        <font-awesome-icon icon="search" />
      </button>
    </form>
    <div class="list-items">
      <ul class="list-title">
        <li>번호</li>
        <li class="time">
          <span
            >차량출입시각<button @click.prevent="time_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.time_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li class="time">
          <span
            >방문확인시각<button @click.prevent="discounted_time_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.discounted_time_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >장소<button @click.prevent="location_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.location_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li class="direction">
          <span
            >방향<button @click.prevent="direction_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.direction_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >차량번호<button @click.prevent="item_lp_click">
              <font-awesome-icon icon="caret-down" v-if="sort_item.lp_click" />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li class="discounted_duration">
          <span
            >방문차량 할인시간
            <button @click.prevent="discounted_duration_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.discounted_duration"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >입주사ID<button @click.prevent="resident_id_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.resident_id"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li class="contents">
          <span
            >메모<button @click.prevent="contents_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.contents_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li class="picture_vichle">
          <span>차량사진</span>
        </li>
      </ul>
      <ul class="list-wrap">
        <li v-for="(res, index) in vehicle_obj_list" :key="index">
          <span> {{ index + 1 }}</span>
          <span class="time"
            ><input type="text" v-model="res.time" readonly
          /></span>
          <span class="time"
            ><input type="text" v-model="res.discounted_time" readonly
          /></span>
          <span class="location"
            ><input type="text" v-model="res.location" readonly
          /></span>
          <span class="direction"
            ><input type="text" v-model="res.direction" readonly
          /></span>
          <span class="lp"
            ><input
              type="text"
              v-model="res.lp"
              v-on:change="contents_change(index)"
          /></span>
          <span class="discounted_duration"
            ><input type="text" v-model="res.discounted_duration" readonly
          /></span>
          <span class="resident_id"
            ><input type="text" v-model="res.resident_id" readonly
          /></span>
          <span class="contents"
            ><input
              type="text"
              v-model="res.contents"
              v-on:change="contents_change(index)"
          /></span>
          <span class="picture_vichle"
            ><button @click="openImg(res)">
              <font-awesome-icon icon="camera-retro" /></button
          ></span>

          <div class="imageshow" v-show="res.imageShow">
            <div>
              <h3>차량 이미지</h3>
              <button @click="closeImg(res)">
                <font-awesome-icon icon="window-close" />
              </button>
              <ul>
                <li v-for="(c, i) in res.imageList" :key="i">
                  <img :src="res.imageList[i].imageName" alt="" />
                </li>
              </ul>
              <div>
                <span>차량번호 : {{ res.lp }}</span>
                <span>입차시각 : {{ res.time }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import _ from "underscore"
import XLSX from "xlsx"
import { mapState } from "vuex"
import config from "../../config.js"
//import spinners from "../components/spinners"
export default {
  data() {
    return {
      isLoading: false,
      resistRocord: [],
      start_time: new Date(),
      end_time: new Date(),
      searchLp: "",
      location: "",
      direction: "",
      locations: [],
      searchDirection: "",
      searchLocation: "",
      searchResidentID: "",
      btn: "",
      resident_list: [],
      vehicle_obj_list: [],
      print_vehicle_obj_list: [],
      sort_item: {
        time_click: false,
        lp_click: false,
        item_kind1_click: false,
        dong_ho: false,
        registered: false,
        contents_click: false
      }
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  // components: { spinners },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "recTenantVisitEntry") this.titles = add.title
        })
      })
    },
    openImg(res) {
      res.imageShow = true
    },
    closeImg(res) {
      res.imageShow = false
    },
    loc_dir() {
      this.locations = []
      this.directions = []
      let location_list = []
      let direction_list = []
      location_list = config.location_list
      direction_list = config.direction_list
      //  for(let i = 0; i < location_list.length; i++){
      this.locations = location_list
      //  }
      // for(let i = 0; i < direction_list.length; i++){
      this.directions = direction_list
      //   }
      let temp = {}
      this.locations.push(temp)
      this.locations.splice(this.locations.length - 1, 1)
      this.directions.push(temp)
      this.directions.splice(this.directions.length - 1, 1)
    },
    item_lp_click: function() {
      console.log("lp sort")
      let temp10 = []
      if (this.sort_item.lp_click === false) {
        console.log("lp sort1")
        this.sort_item.lp_click = true
        temp10 = _.sortBy(this.vehicle_obj_list, "lp")
        temp10.reverse()
        return (this.vehicle_obj_list = temp10)
      } else {
        console.log("lp sort2")
        this.sort_item.lp_click = false
        temp10 = _.sortBy(this.vehicle_obj_list, "lp")
        return (this.vehicle_obj_list = temp10)
      }
    },
    location_click: function() {
      console.log("location sort")
      let temp10 = []
      if (this.sort_item.location_click === false) {
        this.sort_item.location_click = true
        temp10 = _.sortBy(this.vehicle_obj_list, "location")
        temp10.reverse()
        return (this.vehicle_obj_list = temp10)
      } else {
        this.sort_item.location_click = false
        temp10 = _.sortBy(this.vehicle_obj_list, "location")
        return (this.vehicle_obj_list = temp10)
      }
    },
    direction_click: function() {
      console.log("direction sort")
      let temp10 = []
      if (this.sort_item.location_click === false) {
        this.sort_item.location_click = true
        temp10 = _.sortBy(this.vehicle_obj_list, "direction")
        temp10.reverse()
        return (this.vehicle_obj_list = temp10)
      } else {
        this.sort_item.location_click = false
        temp10 = _.sortBy(this.vehicle_obj_list, "direction")
        return (this.vehicle_obj_list = temp10)
      }
    },
    time_click: function() {
      let temp10 = []
      if (this.sort_item.time_click === false) {
        this.sort_item.time_click = true
        temp10 = _.sortBy(this.vehicle_obj_list, "time")
        temp10.reverse()
        return (this.vehicle_obj_list = temp10)
      } else {
        this.sort_item.time_click = false
        temp10 = _.sortBy(this.vehicle_obj_list, "time")
        return (this.vehicle_obj_list = temp10)
      }
    },
    registered_click: function() {
      let temp10 = []
      if (this.sort_item.registered === false) {
        this.sort_item.registered = true
        temp10 = _.sortBy(this.vehicle_obj_list, "registered")
        temp10.reverse()
        return (this.vehicle_obj_list = temp10)
      } else {
        this.sort_item.registered = false
        temp10 = _.sortBy(this.vehicle_obj_list, "registered")
        return (this.vehicle_obj_list = temp10)
      }
    },
    dong_ho_click: function() {
      let temp10 = []
      if (this.sort_item.dong_ho === false) {
        this.sort_item.dong_ho = true
        temp10 = _.sortBy(this.vehicle_obj_list, "dong_ho")
        temp10.reverse()
        return (this.vehicle_obj_list = temp10)
      } else {
        this.sort_item.dong_ho = false
        temp10 = _.sortBy(this.vehicle_obj_list, "dong_ho")
        return (this.vehicle_obj_list = temp10)
      }
    },
    contents_click: function() {
      let temp10 = []
      if (this.sort_item.contents_click === false) {
        this.sort_item.contents_click = true
        temp10 = _.sortBy(this.vehicle_obj_list, "contents")
        temp10.reverse()
        return (this.vehicle_obj_list = temp10)
      } else {
        this.sort_item.contents_click = false
        temp10 = _.sortBy(this.vehicle_obj_list, "contents")
        return (this.vehicle_obj_list = temp10)
      }
    },

    contents_change(index) {
      console.log("내용변경 :", this.vehicle_obj_list[index])
      var obj = {}
      // obj.kind = "update_vehicle_obj_at_vehicle_obj_list"
      obj.kind1 = "update_vehicle_obj_at_vehicle_obj_list"
      obj.lp = this.vehicle_obj_list[index].lp
      obj.loop_event_time = this.vehicle_obj_list[index].loop_event_time
      obj.direction = this.vehicle_obj_list[index].direction
      obj.location = this.vehicle_obj_list[index].location
      obj.registered = this.vehicle_obj_list[index].registered
      obj.dong_ho = this.vehicle_obj_list[index].dong_ho
      obj.fname = this.vehicle_obj_list[index].fname
      obj.contents = this.vehicle_obj_list[index].contents
      this.sendMessage(obj)
    },
    socket_process(data) {
      //  console.log("socket_process===>", data)
      if (data.status === "ok" && data.kind === "get_resident_list") {
        this.resident_list = []
        //this.resident_list = data.docs
        for (let i = 0; i < data.docs.length; i++) {
          let obj = {}
          obj.id = data.docs[i].id
          this.resident_list.push(obj)
        }
        let obj = {}
        obj.id = "전체"
        this.resident_list.push(obj)
      } else if (
        data.status === "ok" &&
        data.kind === "get_resident_discounted_list_admin"
      ) {
        let vehicle_obj_list = []
        for (let q = 0; q < data.docs.length; q++) {
          let obj = data.docs[q]
          if (obj.kind === "lpr" || obj.kind == "fee_calculation_result") {
            obj.imageName =
              config.image_src +
              data.docs[q].folder_name +
              "/" +
              data.docs[q].fname
            vehicle_obj_list.push(obj)
          }
        }
        let lp_obj_list = {}
        for (let i = 0; i < vehicle_obj_list.length; i++) {
          if (lp_obj_list[vehicle_obj_list[i].loop_event_time]) {
            lp_obj_list[vehicle_obj_list[i].loop_event_time].push(
              vehicle_obj_list[i]
            )
          } else {
            lp_obj_list[vehicle_obj_list[i].loop_event_time] = []
            lp_obj_list[vehicle_obj_list[i].loop_event_time].push(
              vehicle_obj_list[i]
            )
          }
        }

        let vehicle_obj_list2 = []
        for (let loop_event_time in lp_obj_list) {
          vehicle_obj_list2.loop_event_time = parseInt(loop_event_time, 10)
          let lp_obj_sub_list = lp_obj_list[loop_event_time]
          // console.log("lp_obj_sub_list : ", lp_obj_sub_list , "lp_obj_list : ", lp_obj_list)
          if (lp_obj_sub_list.length == 2) {
            lp_obj_sub_list[0].imageList = []
            lp_obj_sub_list[0].imageList.push({
              imageName: lp_obj_sub_list[0].imageName
            })
            lp_obj_sub_list[0].imageList.push({
              imageName: lp_obj_sub_list[1].imageName
            })
            if (
              lp_obj_sub_list[0].registered === "일반차량" &&
              lp_obj_sub_list[1].registered !== "일반차량"
            ) {
              lp_obj_sub_list[0].registered = lp_obj_sub_list[1].registered
            }
            if (
              lp_obj_sub_list[0].lp === "미인식" &&
              lp_obj_sub_list[1].lp !== "미인식"
            ) {
              lp_obj_sub_list[0].lp = lp_obj_sub_list[1].lp
            }
            vehicle_obj_list2.push(lp_obj_sub_list[0])
          } else {
            lp_obj_sub_list[0].imageList = []
            lp_obj_sub_list[0].imageList.push({
              imageName: lp_obj_sub_list[0].imageName
            })
            vehicle_obj_list2.push(lp_obj_sub_list[0])
          }
        }
        vehicle_obj_list = []
        vehicle_obj_list = vehicle_obj_list2
        this.vehicle_obj_list = []
        //  console.log("vehicle_obj_list : ", vehicle_obj_list)
        //  console.log("lp_obj_sub_list : ", lp_obj_sub_list , "lp_obj_list : ", lp_obj_list)
        if (this.searchResidentID === "" || this.searchResidentID === "전체") {
          for (let i = 0; i < vehicle_obj_list.length; i++) {
            let obj = vehicle_obj_list[i]
            for (let j = 0; j < obj.discounted_list.length; j++) {
              if (obj.kind === "lpr" || obj.kind == "fee_calculation_result") {
                let obj1 = {}
                obj1.time = format_time1(new Date(obj.loop_event_time))
                obj1.discounted_time = format_time1(
                  new Date(obj.discounted_list[j].discounted_time)
                )
                obj1.loop_event_time = obj.loop_event_time
                obj1.location = obj.location
                obj1.direction = obj.direction
                obj1.lp = obj.lp
                obj1.registered = obj.registered
                if (!obj.dongho) {
                  obj.dong_ho = ""
                }
                obj1.dong_ho = obj.dong_ho
                obj1.fname = obj.fname
                obj1.folder_name = obj.folder_name
                obj1.contents = obj.contents
                obj1.imageList = []
                obj1.imageList = obj.imageList
                obj1.imageShow = false
                let test = isNaN(obj.discounted_list[j].free_parking_time)
                // console.log("isNaN(obj.discounted_list[j].free_parking_time) : ",isNaN(obj.discounted_list[j].free_parking_time))
                if (test) {
                  obj1.free_parking_time =
                    obj.discounted_list[j].free_parking_time / (1000 * 60)
                } else {
                  obj1.free_parking_time = 60
                }
                obj1.discounted_duration =
                  obj1.free_parking_time +
                  ", " +
                  obj.discounted_list[j].discounted_duration / (1000 * 60)
                obj1.resident_id = obj.discounted_list[j].id

                this.vehicle_obj_list.push(obj1)
              }
            }
            //console.log(this.vehicleInformation.length);
            //  console.log(this.vehicle_obj_list.length)
            //  console.log("this.vehicle_obj_list : ", this.vehicle_obj_list)

            this.isLoading = false
          }
        } else {
          for (let i = 0; i < vehicle_obj_list.length; i++) {
            let obj = vehicle_obj_list[i]
            for (let j = 0; j < obj.discounted_list.length; j++) {
              if (obj.kind === "lpr" || obj.kind == "fee_calculation_result") {
                if (obj.discounted_list[j].id === this.searchResidentID) {
                  let obj1 = {}
                  obj1.time = format_time1(new Date(obj.loop_event_time))
                  obj1.discounted_time = format_time1(
                    new Date(obj.discounted_list[j].discounted_time)
                  )
                  obj1.loop_event_time = obj.loop_event_time
                  obj1.location = obj.location
                  obj1.direction = obj.direction
                  obj1.lp = obj.lp
                  obj1.registered = obj.registered
                  if (!obj.dongho) {
                    obj.dong_ho = ""
                  }
                  obj1.dong_ho = obj.dong_ho
                  obj1.fname = obj.fname
                  obj1.folder_name = obj.folder_name
                  obj1.contents = obj.contents
                  obj1.imageList = []
                  obj1.imageList = obj.imageList
                  obj1.imageShow = false
                  let test = isNaN(obj.discounted_list[j].free_parking_time)
                  // console.log("isNaN(obj.discounted_list[j].free_parking_time) : ",isNaN(obj.discounted_list[j].free_parking_time))
                  if (test) {
                    obj1.free_parking_time =
                      obj.discounted_list[j].free_parking_time / (1000 * 60)
                  } else {
                    obj1.free_parking_time = 60
                  }
                  obj1.discounted_duration =
                    obj1.free_parking_time +
                    ", " +
                    obj.discounted_list[j].discounted_duration / (1000 * 60)
                  obj1.resident_id = obj.discounted_list[j].id

                  this.vehicle_obj_list.push(obj1)
                }
              }
              this.isLoading = false
            }
          }
        }
      }
      this.print_vehicle_obj_list = []
      for (let i = 0; i < this.vehicle_obj_list.length; i++) {
        let print = {}
        print.차량출입시각 = this.vehicle_obj_list[i].time
        print.방문자확인시각 = this.vehicle_obj_list[i].discounted_time
        print.장소 = this.vehicle_obj_list[i].location
        print.방향 = this.vehicle_obj_list[i].direction
        print.차량번호 = this.vehicle_obj_list[i].lp
        print.구분 = this.vehicle_obj_list[i].registered
        print.입주사ID = this.vehicle_obj_list[i].resident_id
        print.방문차량할인시간 = this.vehicle_obj_list[i].discounted_duration
        print.메모 = this.vehicle_obj_list[i].contents
        print.이미지 = this.vehicle_obj_list[i].imageList
        this.print_vehicle_obj_list.push(print)
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
      //this.vehicleInformation = [];
      var obj = {}
      obj.kind = "get_resident_discounted_list_admin"
      obj.lp = this.searchLp
      //obj.id = this.searchResidentID
      obj.start_time = get_start_time(this.start_time)
      obj.end_time = get_end_time(this.end_time)
      obj.id = window.localStorage.getItem("admin_id")
      console.log("lp_search() : ", obj)
      this.vehicle_obj_list = []
      this.isLoading = true
      this.sendMessage(obj)
    },
    start() {
      this.date_set()
      this.loc_dir()
      let obj = {}
      obj.id = window.localStorage.getItem("admin_id")
      obj.kind = "get_resident_list"
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
      const data = XLSX.utils.json_to_sheet(this.print_vehicle_obj_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_차량출입기록_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      this.isLoading = false
      console.log("vehicle_obj_list data.kind : ", data)

      this.socket_process(data)
    })
    this.start()
    this.changeTitle()
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
<style></style>
