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
            >차량출입시각(입차)<button @click.prevent="in_time_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.in_time_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li class="time">
          <span
            >차량출입시각(출차)<button @click.prevent="out_time_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.out_time_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li class="time">
          <span
            >주차시간<button @click.prevent="parking_duration_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.parking_duration_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >장소<button @click.prevent="resident_fee_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.resident_fee_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >구분<button @click.prevent="registered_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.registered_click"
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
        <li>
          <span
            >주차요금<button @click.prevent="parking_fee_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.parking_fee_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >정산기ID<button @click.prevent="resident_fee_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.resident_fee_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >결제요금
            <button @click.prevent="paid_fee_click">
              <font-awesome-icon icon="caret-down" v-if="sort_item.paid_fee" />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >지불방법<button @click.prevent="how_to_pay_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.resident_fee_click"
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
          v-for="(res, index) in vehicle_obj_list"
          :key="index"
          @click="modifyOpen(res)"
        >
          <span> {{ index + 1 }}</span>
          <span class="time"
            ><input type="text" v-model="res.in_time" readonly
          /></span>
          <span class="time"
            ><input type="text" v-model="res.out_time" readonly
          /></span>
          <span class="time"
            ><input type="text" v-model="res.parking_duration" readonly
          /></span>
          <span class="groupName"
            ><input type="text" v-model="res.location" readonly
          /></span>
          <span class="groupName"
            ><input type="text" v-model="res.registered" readonly
          /></span>
          <span class="groupName"
            ><input type="text" v-model="res.lp" readonly
          /></span>
          <span class="groupName"
            ><input type="text" v-model="res.parking_fee" readonly
          /></span>
          <span class="groupName"
            ><input type="text" v-model="res.machineid" readonly
          /></span>
          <span class="groupName"
            ><input type="text" v-model="res.paid_fee" readonly
          /></span>
          <span class="groupName"
            ><input type="text" v-model="res.how_to_pay" readonly
          /></span>
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
import _ from "underscore"
import XLSX from "xlsx"
import { mapState } from "vuex"
import config from "../../config.js"
//import spinners from "../components/spinners"
export default {
  data() {
    return {
      modifyIs: false,
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
      current: {},
      resident_list: [],
      vehicle_obj_list_total: [],
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
          if (add.add === "cashSettlementRec") this.titles = add.title
        })
      })
    },
    modifyClose() {
      this.modifyIs = false
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.lp = c.lp
      this.current.in_time = c.in_time
      this.current.out_time = c.out_time
      this.current.parking_duration = c.parking_duration
      this.current.registered = c.registered
      this.current.parking_fee = c.parking_fee
      this.current.total_paid_fee = c.total_paid_fee
      this.current.payment_list = []
      if (c.payment_list) {
        for (let i = 0; i < c.payment_list.length; i++) {
          let temp_obj = c.payment_list[i]
          let current_obj = {}
          current_obj.machineid = temp_obj.machineid
          current_obj.paid_fee = temp_obj.paid_fee
          current_obj.time = temp_obj.time
          current_obj.location = temp_obj.location
          current_obj.how_to_pay = temp_obj.how_to_pay
          this.current.payment_list.push(current_obj)
        }
      }
      if (c.discounted_list) {
        for (let i = 0; i < c.discounted_list.length; i++) {
          let temp_obj = c.discounted_list[i]
          let current_obj = {}
          current_obj.resident_id = temp_obj.resident_id
          current_obj.free_parking_time = temp_obj.free_parking_time
          current_obj.discounted_time = temp_obj.discounted_time
          current_obj.discounted_duration = temp_obj.discounted_duration
          current_obj.resident_fee = temp_obj.resident_fee
          this.current.payment_list.push(current_obj)
        }
      }
      // console.log("c : ", c.lp)
      // console.log("this : ", this)
    },
    openImg(res) {
      res.imageShow = true
    },
    closeImg(res) {
      res.imageShow = true
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
      if (data.status === "ok" && data.kind === "get_payment_list") {
        this.vehicle_obj_list_total = data.docs
        let vehicle_obj_list = []
        for (let q = 0; q < data.docs.length; q++) {
          let obj = data.docs[q]
          if (
            obj.kind === "lpr" ||
            obj.kind == "fee_calculation_result" ||
            obj.kind == "lpr_payment_final"
          ) {
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

        for (let i = 0; i < vehicle_obj_list.length; i++) {
          let obj = vehicle_obj_list[i]
          //  if(obj.kind === "lpr" || obj.kind == "fee_calculation_result") {
          let obj1 = {}
          obj1.out_time = format_time1(new Date(obj.loop_event_time))
          obj1.loop_event_time = obj.loop_event_time
          obj1.location = obj.location
          obj1.direction = obj.direction
          obj1.parking_fee = obj.fee
          obj1.total_paid_fee = 0
          obj1.paid_fee = 0
          obj1.lp = obj.lp

          // if(obj.how_to_pay){
          //   obj1.how_to_pay = obj.how_to_pay
          // }
          // else{
          //   obj1.how_to_pay = ""
          // }
          obj1.registered = obj.registered
          obj1.fname = obj.fname
          obj1.folder_name = obj.folder_name
          obj1.contents = obj.contents
          if (!obj.dongho) {
            obj.dong_ho = ""
          }
          obj1.dong_ho = obj.dong_ho
          obj1.imageList = []
          obj1.imageList = obj.imageList
          obj1.imageShow = false
          obj1.in_time = ""
          obj1.parking_duration = 0
          obj1.discounted_time = 0
          obj1.free_parking_time = 0
          obj1.total_resident_fee = 0
          // console.log("obj.obh_in && obj.obj.in :", obj.obj_in && obj.obj_in )
          if (obj.obj_in) {
            let obj2 = obj.obj_in
            obj1.in_time = format_time1(new Date(obj.obj_in.loop_event_time))
            //  console.log("obj_in : ", obj.obj_in)
            obj1.parking_duration = Math.ceil(
              (obj.loop_event_time - obj2.loop_event_time) / (60 * 1000)
            )

            if (obj2.payment_list) {
              console.log(
                "payment_list : ",
                obj2.payment_list,
                obj2.payment_list[0].paid_fee
              )
              obj1.payment_list = []
              //  obj1.payment_list = obj2.payment_list
              for (let k = 0; k < obj2.payment_list.length; k++) {
                if (obj2.payment_list[k].cmd === "cash_payment") {
                  obj1.location = "출구"
                  obj1.paid_fee = obj2.payment_list[k].paid_fee
                  obj1.machineid = obj2.payment_list[k].machineid
                  obj1.time =
                    obj2.payment_list[k].paydate +
                    "_" +
                    obj2.payment_list[k].paytime
                  obj1.how_to_pay = obj2.payment_list[k].paytype
                  this.vehicle_obj_list.push(obj1)
                }
              }
            }
          }
          this.isLoading = false
        }
        this.print_vehicle_obj_list = []
        for (let i = 0; i < this.vehicle_obj_list.length; i++) {
          let print = {}
          print.입차시각 = this.vehicle_obj_list[i].in_time
          print.출차시각 = this.vehicle_obj_list[i].out_time
          print.주차시간 = this.vehicle_obj_list[i].discounted_time
          print.위치 = this.vehicle_obj_list[i].location
          print.차량번호 = this.vehicle_obj_list[i].lp
          print.구분 = this.vehicle_obj_list[i].registered
          print.주차요금 = this.vehicle_obj_list[i].parking_fee
          print.정산기ID = this.vehicle_obj_list[i].m_id
          print.결제요금 = this.vehicle_obj_list[i].paid_fee
          print.지불방법 = this.vehicle_obj_list[i].how_to_pay
          print.메모 = this.vehicle_obj_list[i].contents
          this.print_vehicle_obj_list.push(print)
        }
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
      obj.kind = "get_payment_list"
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
      // console.log("vehicle_obj_list data.kind : ", data)

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
