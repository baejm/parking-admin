<template>
  <div class="report_wrap">
    <!-- 등록팝업 -->
    <div
      class="resist_pop popup"
      v-show="resistIs"
      :class="{ column_1: Object.keys(this.r).length < 8 }"
    >
      <div>
        <h3>{{ titles }} 등록</h3>
        <button @click="registClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>할인상품명</dt>
              <dd>
                <input type="text" required v-model="r.discountedProductName" />
              </dd>
            </dl>
            <dl>
              <dt>할인상품ID</dt>
              <dd>
                <input type="text" required v-model="r.discountedProductID" />
              </dd>
            </dl>
            <dl>
              <dt>단위</dt>
              <dd>
                <select v-model="r.unit">
                  <option
                    v-for="(unit, index) in units_list"
                    v-bind:key="index"
                  >
                    {{ unit.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>할인값</dt>
              <dd><input type="text" required v-model="r.value" /></dd>
            </dl>
            <dl>
              <dt>비고</dt>
              <dd><input type="text" v-model="r.contents" /></dd>
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
      :class="{ column_1: Object.keys(this.m).length < 8 }"
    >
      <div>
        <h3>{{ titles }} 수정</h3>
        <button @click="modifyClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>할인상품명</dt>
              <dd>
                <input
                  type="text"
                  required
                  readonly
                  v-model="m.discountedProductName"
                />
              </dd>
            </dl>
            <dl>
              <dt>할인상품ID</dt>
              <dd>
                <input
                  type="text"
                  required
                  v-model="m.discountedProductID"
                  readonly
                />
              </dd>
            </dl>
            <dl>
              <dt>단위</dt>
              <dd>
                <select v-model="m.unit">
                  <option
                    v-for="(unit, index) in units_list"
                    v-bind:key="index"
                  >
                    {{ unit.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>할인값</dt>
              <dd><input type="text" required v-model="m.value" /></dd>
            </dl>
            <dl>
              <dt>비고</dt>
              <dd><input type="text" v-model="r.contents" /></dd>
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
          v-for="(discountedProduct, index) in discounted_product_list"
          :key="index"
          @click="modifyOpen(discountedProduct)"
        >
          <span> {{ index + 1 }}</span>
          <span
            ><input
              type="text"
              v-model="discountedProduct.discountedProductName"
              readonly
          /></span>
          <span
            ><input
              type="text"
              v-model="discountedProduct.discountedProductID"
              readonly
          /></span>
          <span
            ><input type="text" v-model="discountedProduct.value" readonly
          /></span>
          <span
            ><input type="text" v-model="discountedProduct.unit" readonly
          /></span>
          <span><input type="text" v-model="discountedProduct.contents"/></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import config from "../../config.js"
import Notifications from "vue-notification"
import { mapState } from "vuex"
import _ from "underscore"
import XLSX from "xlsx"
Vue.use(Notifications)
export default {
  data() {
    return {
      listItem: [
        { title: "번호" },
        {
          title: "할인상품명",
          sortBy: false,
          standard: "discountedProductName"
        },
        { title: "할인코드명", sortBy: false, standard: "discountedProductID" },
        { title: "할인값", sortBy: false, standard: "value" },
        { title: "단위", sortBy: false, standard: "unit" },
        { title: "비고", sortBy: false, standard: "contents" }
      ],
      resistIs: false,
      modifyIs: false,
      r: {
        discountedProductName: "",
        discountedProductID: "",
        kind1: "",
        unit: "",
        contents: "",
        time: "",
        update_time: "",
        delete_time: ""
      },
      m: {
        discountedProductName: "",
        discountedProductID: "",
        kind1: "",
        unit: "",
        contents: "",
        time: "",
        update_time: "",
        delete_time: ""
      },
      units_list: [
        {
          text: "분"
        },
        {
          text: "%"
        },
        {
          text: "원"
        }
      ],
      discounted_product_list: [],
      print_discounted_product_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    upDown_click: function(e) {
      let temp10 = []
      if (e.sortBy === false) {
        this.listItem.forEach(e => {
          e.sortBy = false
        })
        e.sortBy = true
        temp10 = _.sortBy(this.discounted_product_list, e.standard)
        temp10.reverse()
        return (this.discounted_product_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.discounted_product_list, e.standard)
        return (this.discounted_product_list = temp10)
      }
    },
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "discountPolVisitedVeh_1") this.titles = add.title
        })
      })
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.m.discountedProductName = c.discountedProductName
      this.m.discountedProductID = c.discountedProductID
      this.m.value = c.value
      this.m.unit = c.unit
      this.m.contents = c.contents
      this.m.time = c.time
      this.m.update_time = c.update_time
      this.m.delete_time = c.delete_time
    },
    modifyClose() {
      this.modifyIs = false
    },
    registOpen() {
      this.resistIs = true
      this.modifyIs = false
    },
    registClose() {
      this.resistIs = false
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      // console.log("this.reg : ", this.reg)
      let obj = {}
      obj.discountedProductName = this.r.discountedProductName
      obj.discountedProductID = this.r.discountedProductID
      obj.value = this.r.value
      obj.unit = this.r.unit
      obj.contents = this.r.contents
      obj.time = Date.now()
      obj.kind = "create_resident_policy_list"
      this.m.update_time = this.r.update_time
      this.m.delete_time = this.r.delete_time
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    resident_policy_list_fun(data) {
      this.discounted_product_list = []
      console.log("discounted_product_list_fun : ", data, data.docs.length)
      for (let i = 0; i < data.docs.length; i++) {
        let obj = {}
        obj.discountedProductName = data.docs[i].discountedProductName
        obj.discountedProductID = data.docs[i].discountedProductID
        obj.value = data.docs[i].value
        obj.unit = data.docs[i].unit
        obj.discountedProductName = data.docs[i].discountedProductName
        obj.time = data.docs[i].time
        obj.str_time = format_time1(new Date(data.docs[i].time))
        obj.update_time = data.docs[i].update_time
        obj.delete_time = data.docs[i].delete_time
        obj.contents = data.docs[i].contents
        this.discounted_product_list.push(obj)
      }

      let temp = {}
      this.discounted_product_list.push(temp)
      this.discounted_product_list.pop()
      this.print_discounted_product_list = []
      for (let i = 0; i < this.discounted_product_list.length; i++) {
        let print = {}
        let obj1 = this.discounted_product_list[i]
        print.할인상품명 = obj1.discountedProductName
        print.할인상품ID = obj1.discountedProductID
        print.할인값 = obj1.value
        print.단위 = obj1.unit
        print.메모 = obj1.contents
        print.등록일시 = format_time1(new Date(obj1.time))
        print.메모 = obj1.contents
        this.print_discounted_product_list.push(print)
      }
    },
    modifyVehicle() {
      this.modifyClose()
      let obj = {}
      obj.discountedProductName = this.m.discountedProductName
      obj.discountedProductID = this.m.discountedProductID
      obj.value = this.m.value
      obj.unit = this.m.unit
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.update_time = Date.now()
      obj.delete_time = this.m.delete_time
      obj.kind = "update_resident_policy_list"

      this.sendMessage(obj)
    },
    deleteVehicle() {
      this.modifyClose()
      let obj = {}
      obj.discountedProductName = this.m.discountedProductName
      obj.discountedProductID = this.m.discountedProductID
      obj.value = this.m.value
      obj.unit = this.m.unit
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.delete_time = Date.now()
      obj.time = this.m.delte_time
      obj.kind = "delete_resident_policy_list"
      this.sendMessage(obj)
    },
    search() {
      var obj = {}
      obj.id = window.localStorage.getItem("id")
      obj.kind = "get_resident_policy_list"
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
      const data = XLSX.utils.json_to_sheet(this.print_discounted_product_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(wb, config.parking_name + "_그룹관리_" + postfix + ".xlsx")
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_resident_policy_list") {
        console.log("get_resident_policy_list : ", data)
        this.resident_policy_list_fun(data)
      } else if (data.kind === "create_resident_policy_list") {
        console.log("create_resident_policy_list : ", data)
        if (data.status === "ok") {
          this.search()
        } else {
          console.log("같은 상품명이나 같은 ID가 존재")
          alert("같은 상품명이나 같은 ID가 존재")
          /* this.$confirm(

              discount_time.text !== "무료" ? "무료" + this.free_parking_time + "분,  유료" + discount_time.text + "분 할인입니다. " : "무료" + this.free_parking_time + "분 할인입니다. ",  "확인"

            ).then(resolve => {
            if (resolve === true) {
              if (discount_time.text == "무료") {
                console.log("discounted_time then 무료: ", c, discount_time.text)
                let obj = {}
                obj.id = window.localStorage.getItem("id")
                obj.pw = window.localStorage.getItem("pw")
                obj.loop_event_time = c.loop_event_time
                obj.lp = c.lp
                obj.discount_time = 0
                obj.kind = "resident_discounted_fee"
                obj.free_parking_time = parseInt(this.free_parking_time, 10) * 60 * 1000
                obj.total_discounted_parking_time = obj.free_parking_time
                this.$socket.emit("message_from_web_client", obj)
                console.log("obj : ", obj)
              } 
              else if (discount_time.text == "전액"){
                console.log("discounted_time then 전액: ", c, discount_time.text)
                let obj = {}
                obj.id = window.localStorage.getItem("id")
                obj.pw = window.localStorage.getItem("pw")
                obj.loop_event_time = c.loop_event_time
                obj.lp = c.lp
                obj.discount_time = parseInt(10 * 24 * 60, 10) * 60 * 1000
                obj.kind = "resident_discounted_fee"
                obj.free_parking_time = parseInt(this.free_parking_time, 10) * 60 * 1000
                obj.total_discounted_parking_time =
                obj.discount_time + obj.free_parking_time
                this.$socket.emit("message_from_web_client", obj)
                console.log("obj : ", obj)
              } 
              else {
                console.log("discounted_time then 유료: ", c, discount_time)
                let obj = {}
                obj.id = window.localStorage.getItem("id")
                obj.pw = window.localStorage.getItem("pw")
                obj.loop_event_time = c.loop_event_time
                obj.lp = c.lp
                obj.discount_time = parseInt(discount_time.text, 10) * 60 * 1000
                obj.kind = "resident_discounted_fee"
                obj.free_parking_time = parseInt(this.free_parking_time, 10) * 60 * 1000
                obj.total_discounted_parking_time =
                  obj.discount_time + obj.free_parking_time
                this.$socket.emit("message_from_web_client", obj)
                console.log("obj : ", obj)
              }
            }
          } */
        }
      } else if (
        data.kind === "update_resident_policy_list" ||
        data.kind === "delete_resident_policy_list"
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
