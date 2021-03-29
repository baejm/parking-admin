<template>
  <div class="report_wrap">
    <div class="title">
      <h2>{{ titles }}</h2>
    </div>
    <form class="menu_title">
      <span class="small_title">입주사명</span>
      <select @change="Changed(parking_product_list)" v-model="searchCompany">
        <option v-for="(resident, index) in resident_list" v-bind:key="index">
          {{ resident.company_name }}
        </option>
      </select>
      <button @click.prevent="search" type="submit">
        <font-awesome-icon icon="search" />
      </button>
    </form>
    <div class="list-items">
      <ul class="list-title">
        <li>번호</li>
        <li>
          <span
            >입주사명<button @click.prevent="companyName_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.companyName_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >입주사ID<button @click.prevent="companyID_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.companyID_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >쿠폰ID<button @click.prevent="couponID_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.couponID_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >할인시간<button @click.prevent="discountedTime_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.discountedTime"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >판매일<button @click.prevent="salesDate_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.salesDate_click"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >판매수량<button @click.prevent="salesQuantity_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.salesQuantity"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >사용수량<button @click.prevent="useQuantity_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.useQuantity"
              />
              <font-awesome-icon icon="caret-up" v-else /></button
          ></span>
        </li>
        <li>
          <span
            >남은수량<button @click.prevent="remindQuantity_click">
              <font-awesome-icon
                icon="caret-down"
                v-if="sort_item.remindQuantity"
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
        <li v-for="(coupon, index) in coupon_list" :key="index">
          <span> {{ index + 1 }}</span>
          <span
            ><input type="text" v-model="coupon.company_name" readonly
          /></span>
          <span><input type="text" v-model="coupon.company_id" readonly/></span>
          <span><input type="text" v-model="coupon.coupon_id" readonly/></span>
          <span
            ><input type="text" v-model="coupon.discounted_time" readonly
          /></span>
          <span><input type="text" v-model="coupon.sales_date" readonly/></span>
          <span
            ><input type="text" v-model="coupon.sales_quantity" readonly
          /></span>
          <span><input type="text" v-model="coupon.used_quantity"/></span>
          <span
            ><input type="text" v-model="coupon.remind_quantity" readonly
          /></span>
          <span><input type="text" v-model="coupon.contents"/></span>
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
      searchCompany: "",
      start_time: new Date(),
      end_time: new Date(),
      searchLp: "",
      location: "",
      direction: "",
      locations: [],
      searchDirection: "",
      searchLocation: "",
      btn: "",
      coupon_list: [],
      print_coupon_list: [],
      sort_item: {
        companyName_click: false,
        companyID_click: false,
        couponID_click: false,
        discountedTime_click: false,
        salesDate_click: false,
        salesQuantity_click: false,
        useQuantity_click: false,
        remindQuantity_click: false,
        contents_click: false
      },
      resident_list: []
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
          if (add.add === "statusDiscountCoupons") this.titles = add.title
        })
      })
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
    companyName_click: function() {
      console.log("companyName sort")
      let temp10 = []
      if (this.sort_item.companyName_click === false) {
        console.log("companyName sort1")
        this.sort_item.companyName_click = true
        temp10 = _.sortBy(this.coupon_list, "company_name")
        temp10.reverse()
        return (this.coupon_list = temp10)
      } else {
        console.log("companyName sort2")
        this.sort_item.companyName_click = false
        temp10 = _.sortBy(this.coupon_list, "company_name")
        return (this.coupon_list = temp10)
      }
    },
    companyID_click: function() {
      console.log("companyID sort")
      let temp10 = []
      if (this.sort_item.companyID_click === false) {
        this.sort_item.companyID_click = true
        temp10 = _.sortBy(this.coupon_list, "company_id")
        temp10.reverse()
        return (this.coupon_list = temp10)
      } else {
        this.sort_item.companyID_click = false
        temp10 = _.sortBy(this.coupon_list, "company_id")
        return (this.coupon_list = temp10)
      }
    },
    couponID_click: function() {
      console.log("couponID sort")
      let temp10 = []
      if (this.sort_item.couponID_click === false) {
        this.sort_item.couponID_click = true
        temp10 = _.sortBy(this.coupon_list, "coupon_id")
        temp10.reverse()
        return (this.coupon_list = temp10)
      } else {
        this.sort_item.couponID_click = false
        temp10 = _.sortBy(this.coupon_list, "coupon_id")
        return (this.coupon_list = temp10)
      }
    },
    discountedTime_click: function() {
      let temp10 = []
      if (this.sort_item.discountedTime_click === false) {
        this.sort_item.discountedTime_click = true
        temp10 = _.sortBy(this.coupon_list, "discounted_time")
        temp10.reverse()
        return (this.coupon_list = temp10)
      } else {
        this.sort_item.discountedTime_click = false
        temp10 = _.sortBy(this.coupon_list, "discounted_time")
        return (this.coupon_list = temp10)
      }
    },
    salesDate_click: function() {
      let temp10 = []
      if (this.sort_item.salesDate === false) {
        this.sort_item.salesDate = true
        temp10 = _.sortBy(this.coupon_list, "sales_date")
        temp10.reverse()
        return (this.coupon_list = temp10)
      } else {
        this.sort_item.salesDate = false
        temp10 = _.sortBy(this.coupon_list, "sales_date")
        return (this.coupon_list = temp10)
      }
    },
    salesQuantity_click: function() {
      let temp10 = []
      if (this.sort_item.salesQuantity === false) {
        this.sort_item.salesQuantity = true
        temp10 = _.sortBy(this.coupon_list, "sales_quantity")
        temp10.reverse()
        return (this.coupon_list = temp10)
      } else {
        this.sort_item.salesQuantity = false
        temp10 = _.sortBy(this.coupon_list, "sales_quantity")
        return (this.coupon_list = temp10)
      }
    },
    useQuantity_click: function() {
      let temp10 = []
      if (this.sort_item.useQuantity === false) {
        this.sort_item.useQuantity = true
        temp10 = _.sortBy(this.coupon_list, "used_quantity")
        temp10.reverse()
        return (this.coupon_list = temp10)
      } else {
        this.sort_item.salesQuantity = false
        temp10 = _.sortBy(this.coupon_list, "used_quantity")
        return (this.coupon_list = temp10)
      }
    },
    remindQuantity_click: function() {
      let temp10 = []
      if (this.sort_item.remindQuantity === false) {
        this.sort_item.remindQuantity = true
        temp10 = _.sortBy(this.coupon_list, "remind_quantity")
        temp10.reverse()
        return (this.coupon_list = temp10)
      } else {
        this.sort_item.remindQuantity = false
        temp10 = _.sortBy(this.coupon_list, "remind_quantity")
        return (this.coupon_list = temp10)
      }
    },
    contents_click: function() {
      let temp10 = []
      if (this.sort_item.contents_click === false) {
        this.sort_item.contents_click = true
        temp10 = _.sortBy(this.coupon_list, "contents")
        temp10.reverse()
        return (this.coupon_list = temp10)
      } else {
        this.sort_item.contents_click = false
        temp10 = _.sortBy(this.coupon_list, "contents")
        return (this.coupon_list = temp10)
      }
    },
    socket_process(data) {
      //  console.log("socket_process===>", data)
      if (data.status === "ok" && data.kind === "get_resident_list") {
        let obj = {}
        this.resident_list = []
        obj.company_name = "전체"
        this.resident_list = data.docs
        this.resident_list.push(obj)
        console.log("this.resident_list ===>", this.resident_list)
      } else if (data.kind === "get_coupon_list") {
        console.log("get_coupon_list : ", data.docs)
        let coupon_list1 = []
        for (let i = 0; i < data.docs.length; i++) {
          if (data.docs[i].used === true) {
            coupon_list1.push(data.docs[i])
          }
        }
        for (let i = 0; i < coupon_list1.length; i++) {
          coupon_list1[i].flag = false
          coupon_list1[i].quantity = 1
        }
        console.log("coupon_list1 : ", coupon_list1)
        let coupon_list2 = []
        for (let i = 0; i < coupon_list1.length; i++) {
          for (let j = i; j < coupon_list1.length; j++) {
            if (
              coupon_list1[i].flag === false &&
              coupon_list1[j].flag === false
            ) {
              if (i !== j) {
                if (
                  coupon_list1[i].couppon.resident_id ===
                    coupon_list1[j].couppon.resident_id &&
                  coupon_list1[i].couppon.product_name ===
                    coupon_list1[j].couppon.product_name
                ) {
                  coupon_list1[i].quantity += 1
                  coupon_list1[j].flag = true
                }
              }
            }
          }
          if (coupon_list1[i].flag === false) {
            coupon_list2.push(coupon_list1[i])
          }
        }
        console.log("coupon_list2 : ", coupon_list2)
        for (let i = 0; i < this.coupon_list.length; i++) {
          for (let j = 0; j < coupon_list2.length; j++) {
            if (
              this.coupon_list[i].company_id ===
                coupon_list2[j].couppon.resident_id &&
              this.coupon_list[i].discounted_time ===
                coupon_list2[j].couppon.product_name
            ) {
              this.coupon_list[i].used_quantity = coupon_list2[j].quantity
              this.coupon_list[i].remind_quantity = parseInt(
                this.coupon_list[i].sales_quantity -
                  this.coupon_list[i].used_quantity,
                10
              )
              console.log(
                "중간확인 : ",
                this.coupon_list[i].company_id,
                coupon_list2[j].couppon.resident_id,
                this.coupon_list[i].discounted_time,
                coupon_list2[j].couppon.product_name
              )
              console.log(
                "중간확인q : ",
                this.coupon_list[i].sales_quantity,
                this.coupon_list[i].used_quantity,
                this.coupon_list[i].remind_quantity
              )
            }
          }
        }
      } else if (data.kind === "get_coupon_manager_list") {
        //  console.log("data.docs : ", data.docs)
        let coupon_list = []
        this.coupon_list = []
        for (let i = 0; i < data.docs.length; i++) {
          data.docs[i].flag = false
          //  console.log("data.docs[" +i + "].flag before : ", data.docs[i])
        }
        for (let i = 0; i < data.docs.length; i++) {
          for (let j = i; j < data.docs.length; j++) {
            if (data.docs[i].flag === false && data.docs[j].flag === false) {
              if (
                data.docs[i].resident_id === data.docs[j].resident_id &&
                data.docs[i].product.couponID === data.docs[j].product.couponID
              ) {
                if (i !== j) {
                  data.docs[i].quantity += data.docs[j].quantity
                  data.docs[j].flag = true
                }
              }
            }
          }
          //   console.log("data.docs[" +i + "].flag : ", data.docs[i])
          if (data.docs[i].flag === false) {
            coupon_list.push(data.docs[i])
          }
        }
        console.log("coupon_list : ", coupon_list)
        for (let i = 0; i < coupon_list.length; i++) {
          let obj = {}
          obj.company_name = coupon_list[i].resident_name
          obj.company_id = coupon_list[i].resident_id
          obj.coupon_id = coupon_list[i].product.couponID
          obj.sales_date = format_time1(new Date(coupon_list[i].sales_time))
          obj.discounted_time = coupon_list[i].product.coupon_name
          obj.sales_quantity = coupon_list[i].quantity
          obj.used_quantity = 0
          obj.remind_quantity = coupon_list[i].quantity - obj.used_quantity
          obj.contents = coupon_list[i].contents
          this.coupon_list.push(obj)
        }

        this.print_coupon_list = []

        for (let i = 0; i < this.coupon_list.length; i++) {
          let print = {}
          print.입주사명 = this.coupon_list[i].company_name
          print.입주사ID = this.coupon_list[i].company_id
          print.쿠폰ID = this.coupon_list[i].coupon_id
          print.할인시간 = this.coupon_list[i].discounted_time
          print.판매일 = this.coupon_list[i].sales_date
          print.판매수량 = this.coupon_list[i].sales_quantity
          print.사용수량 = this.coupon_list[i].used_quantity
          print.남은수량 = this.coupon_list[i].remind_quantity
          print.메모 = this.coupon_list[i].contents
          this.print_coupon_list.push(print)
        }
        let obj = {}
        obj.kind = "get_coupon_list"
        this.sendMessage(obj)
      }
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
      obj.kind = "get_coupon_manager_list"
      obj.company_name = this.searchCompany
      if (obj.company_name === "전체") {
        obj.company_name = ""
      }
      // obj.start_time = get_start_time(this.start_time)
      // obj.end_time = get_end_time(this.end_time)
      obj.id = window.localStorage.getItem("admin_id")
      //  obj.pw = window.localStorage.getItem("admin_pw")
      console.log("search() : ", obj)
      // this.coupon_list = []
      // this.isLoading = true
      this.sendMessage(obj)
    },
    resident_search() {
      let obj = {}
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
      const data = XLSX.utils.json_to_sheet(this.print_coupon_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_입주사할인권현황_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      this.isLoading = false
      console.log("coupon_list data.kind : ", data)

      this.socket_process(data)
    })
    this.date_set()
    this.loc_dir()
    this.changeTitle()
    this.resident_search()
  }
}

function format_time1(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "." + num_to_str(dat.getMonth() + 1)
  str += "." + num_to_str(dat.getDate())
  // str += ". " + num_to_str(dat.getHours())
  // str += ":" + num_to_str(dat.getMinutes())
  // str += ":" + num_to_str(dat.getSeconds())
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
/*
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
*/
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style></style>
