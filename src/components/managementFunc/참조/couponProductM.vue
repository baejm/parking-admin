<template>
  <div class="report_wrap">
    <!-- 등록팝업 -->
    <div
      class="resist_pop popup"
      v-show="resistIs"
      :class="{ column_1: Object.keys(this.r).length < 10 }"
    >
      <div>
        <h3>{{ titles }} 등록</h3>
        <button @click="registClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>할인쿠폰명:</dt>
              <dd><input type="text" v-model="r.coupon_name" /></dd>
            </dl>
            <dl>
              <dt>할인시간:</dt>
              <dd><input type="text" v-model="r.value" /></dd>
            </dl>
            <dl>
              <dt>할인ID:</dt>
              <dd><input type="text" v-model="r.couponID" /></dd>
            </dl>
            <dl>
              <dt>키맵:</dt>
              <dd><input type="text" v-model="r.keymap" /></dd>
            </dl>
            <dl>
              <dt>가격:</dt>
              <dd><input type="text" v-model="r.price" /></dd>
            </dl>
            <dl class="step_choice">
              <dt>유효기간:</dt>
              <dd :class="{ column3: Object.keys(this.r.validity).length > 2 }">
                <label
                  ><input type="radio" value="none" v-model="r.validity" /><span
                    >없음</span
                  ></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="r.validity"
                  /><span>구매일로부터</span>
                  <input type="text" v-model="r.day" /><span>일</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="month_end"
                    v-model="r.validity"
                  /><span>매월 말까지</span></label
                >
              </dd>
            </dl>
            <dl class="step_choice">
              <dt>최소구매수량:</dt>
              <dd>
                <label>
                  <input type="radio" value="none" v-model="r.moq" /><span
                    >없음</span
                  ></label
                >
                <label>
                  <input type="radio" value="count" v-model="r.moq" /><span
                    >설정</span
                  >
                  <input type="text" v-model="r.count" /><span>개</span>
                </label>
              </dd>
            </dl>
            <dl class="step_choice">
              <dt>최대보유수량:</dt>
              <dd>
                <label
                  ><input
                    type="radio"
                    value="none"
                    v-model="r.max_holding_quantity"
                  /><span>없음</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="count"
                    v-model="r.max_holding_quantity"
                  /><span>설정</span>
                  <input
                    type="text"
                    v-model="r.max_holding_quantity_count"
                  /><span>개</span></label
                >
              </dd>
            </dl>
            <dl class="step_choice">
              <dt>판매상태:</dt>
              <dd>
                <label
                  ><input
                    type="radio"
                    value="saleing"
                    v-model="r.saleing_state"
                  /><span>판매중</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="stop_sale"
                    v-model="r.saleing_state"
                  /><span>판매중지</span></label
                >
              </dd>
            </dl>
            <dl class="step_choice">
              <dt>할인제한횟수:</dt>
              <dd>
                <label
                  ><input
                    type="radio"
                    value="none"
                    v-model="r.coupon_limit"
                  /><span>없음</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="stop_sale"
                    v-model="r.coupon_limit"
                  /><span>설정</span>
                  <input
                    type="text"
                    v-model="r.coupon_limit_count"
                    class="unit"
                  /><span>개</span></label
                >
              </dd>
            </dl>
            <dl>
              <dt>비고:</dt>
              <dd><input type="text" v-model="r.contents" /></dd>
            </dl>
            <dl class="step_choice">
              <dt>재할인사용:</dt>
              <dd>
                <select v-model="r.re_discount_policy">
                  <option
                    v-for="(re_discount_policy,
                    index) in re_discount_policy_list"
                    v-bind:key="index"
                  >
                    {{ re_discount_policy.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <div class="btns">
              <button @click.prevent="registNew" class="writebtn">등록</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- 수정팝업 -->
    <div class="modify_pop popup" v-show="modifyIs">
      <div>
        <h3>{{ titles }} 수정</h3>
        <button @click="modifyClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>할인쿠폰명:</dt>
              <dd><input type="text" v-model="m.coupon_name" /></dd>
            </dl>
            <dl>
              <dt>할인시간:</dt>
              <dd><input type="text" v-model="m.value" /></dd>
            </dl>
            <dl>
              <dt>할인ID:</dt>
              <dd><input type="text" v-model="m.couponID" /></dd>
            </dl>
            <dl>
              <dt>키맵:</dt>
              <dd><input type="text" v-model="m.keymap" /></dd>
            </dl>
            <dl>
              <dt>가격:</dt>
              <dd><input type="text" v-model="m.price" /></dd>
            </dl>
            <dl class="step_choice">
              <dt>유효기간:</dt>
              <dd :class="{ column3: Object.keys(this.r.validity).length > 2 }">
                <label
                  ><input type="radio" value="none" v-model="m.validity" /><span
                    >없음</span
                  ></label
                >
                <label>
                  <input type="radio" value="count" v-model="m.validity" /><span
                    >구매일로부터</span
                  >
                  <input type="text" v-model="r.day" /><span>일</span>
                </label>
                <label
                  ><input
                    type="radio"
                    value="month_end"
                    v-model="m.validity"
                  /><span>매월 말까지</span></label
                >
              </dd>
            </dl>
            <dl class="step_choice">
              <dt>최소구매수량:</dt>
              <dd>
                <label
                  ><input type="radio" value="none" v-model="m.moq" /><span
                    >없음</span
                  ></label
                >
                <label>
                  <input type="radio" value="count" v-model="m.moq" /><span
                    >설정</span
                  >
                  <input type="text" v-model="m.moq_count" /><span>개</span>
                </label>
              </dd>
            </dl>
            <dl class="step_choice">
              <dt>최대보유수량:</dt>
              <dd>
                <label
                  ><input
                    type="radio"
                    value="none"
                    v-model="m.max_holding_quantity"
                  /><span>없음</span></label
                >
                <label>
                  <input
                    type="radio"
                    value="count"
                    v-model="m.max_holding_quantity"
                  /><span>설정</span>
                  <input
                    type="text"
                    v-model="m.max_holding_quantity_count"
                  /><span>개</span>
                </label>
              </dd>
            </dl>
            <dl>
              <dt>판매상태:</dt>
              <dd>
                <label
                  ><input
                    type="radio"
                    value="saleing"
                    v-model="m.saleing_state"
                  /><span>판매중</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="stop_sale"
                    v-model="m.saleing_state"
                  /><span>판매중지</span></label
                >
              </dd>
            </dl>
            <dl class="step_choice">
              <dt>할인재한횟수:</dt>
              <dd>
                <label
                  ><input
                    type="radio"
                    value="none"
                    v-model="m.coupon_limit"
                  /><span>없음</span></label
                >
                <label
                  ><input
                    type="radio"
                    value="stop_sale"
                    v-model="m.coupon_limit"
                  /><span>설정</span>
                  <input type="text" v-model="m.coupon_limit_count" /><span
                    >개</span
                  ></label
                >
              </dd>
            </dl>
            <dl>
              <dt>비고:</dt>
              <dd><input type="text" v-model="m.contents" /></dd>
            </dl>
            <dl class="step_choice">
              <dt>재할인사용:</dt>
              <dd>
                <select v-model="m.re_discount_policy">
                  <option
                    v-for="(re_discount_policy,
                    index) in re_discount_policy_list"
                    v-bind:key="index"
                  >
                    {{ re_discount_policy.text }}
                  </option>
                </select>
              </dd>
            </dl>
          </form>
          <div class="btns">
            <button @click.prevent="modifyVehicle" class="modifybtn">
              수정
            </button>
            <button @click.prevent="deleteVehicle" class="deletebtn">
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="title">
      <h2>{{ titles }}</h2>
    </div>
    <div class="list-items content_single">
      <div class="writeRecord">
        <button @click.prevent="registOpen" class="register_btn">
          <font-awesome-icon icon="file-signature" />등록
        </button>
      </div>
      <ul class="list-title">
        <li>번호</li>
        <li>할인쿠폰명</li>
        <li>할인시간</li>
        <li>할인ID</li>
        <li>키맵</li>
        <li>가격</li>
        <li>판매상태</li>
        <li>비고</li>
      </ul>
      <ul class="list-wrap">
        <li
          v-for="(coupon_product, index) in coupon_product_list"
          :key="index"
          @click="modifyOpen(coupon_product)"
        >
          <span>{{ index + 1 }}</span>
          <span
            ><input type="text" v-model="coupon_product.coupon_name" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_product.value" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_product.couponID" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_product.keymap" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_product.price" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_product.saleing_state" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_product.contents" readonly
          /></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import config from "../../config.js"
import { mapState } from "vuex"
import XLSX from "xlsx"
export default {
  data() {
    return {
      resistIs: false,
      modifyIs: false,
      re_discount_policy_list: [{ text: "재사용안함" }, { text: "재사용" }],
      r: {
        coupon_name: "10분 할인",
        value: "10",
        couponID: "01",
        keymap: "R01",
        price: "100",
        validity: "none",
        day: "0",
        moq: "none",
        moq_count: "0",
        re_discount_policy: "재사용안함",
        max_holding_quantity: "none",
        max_holding_quantity_count: "0",
        saleing_state: "saleing",
        coupon_limit: "none",
        coupon_limit_count: "0",
        contents: "",
        time: 0,
        siteid: "",
        update_time: 0,
        delete_time: 0
      },
      m: {
        coupon_name: "10분 할인",
        value: "10",
        couponID: "01",
        keymap: "R01",
        price: "100",
        validity: "none",
        day: "0",
        moq: "none",
        moq_count: "0",
        re_discount_policy: "재사용안함",
        max_holding_quantity: "none",
        max_holding_quantity_count: "0",
        saleing_state: "saleing",
        coupon_limit: "none",
        coupon_limit_count: "0",
        contents: "",
        siteid: "",
        time: 0,
        update_time: 0,
        delete_time: 0
      },
      coupon_product_list: [],
      plan_list: [],
      member_list: [],
      member_list1: [],
      print_coupon_product_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "couponProductM") this.titles = add.title
        })
      })
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.m.coupon_name = c.coupon_name
      this.m.value = c.value
      this.m.couponID = c.couponID
      this.m.keymap = c.keymap
      this.m.price = c.price
      this.m.re_discount_policy = c.re_discount_policy
      this.m.validity = c.validity
      this.m.day = c.day
      this.m.moq = c.moq
      this.m.siteid = c.siteid
      this.m.moq_count = c.moq_count
      this.m.max_holding_quantity = c.max_holding_quantity
      this.m.max_holding_quantity_count = c.max_holding_quantity_count
      this.m.saleing_state = c.saleing_state
      this.m.coupon_limit = c.coupon_limit
      this.m.coupon_limit_count = c.coupon_limit_count
      this.m.contents = c.contents
      this.m.time = c.time
      this.m.update_time = c.update_time
      this.m.delete_time = c.delete_time
      console.log("c : ", c)
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
      let obj = {}
      obj.coupon_name = this.r.coupon_name
      obj.value = this.r.value
      obj.couponID = this.r.couponID
      obj.keymap = this.r.keymap
      obj.price = this.r.price
      obj.validity = this.r.validity
      obj.day = this.r.day
      obj.moq = this.r.moq
      obj.re_discount_policy = this.r.re_discount_policy
      obj.siteid = this.plan_list[0].basic_info.siteid
      obj.moq_count = this.r.moq_count
      obj.max_holding_quantity = this.r.max_holding_quantity
      obj.max_holding_quantity_count = this.r.max_holding_quantity_count
      obj.saleing_state = this.r.saleing_state
      obj.coupon_limit = this.r.coupon_limit
      obj.coupon_limit_count = this.r.coupon_limit_count
      obj.contents = this.r.contents
      obj.update_time = this.r.update_time
      obj.delete_time = this.r.delete_time
      obj.time = Date.now()
      obj.kind = "create_coupon_product_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    modifyVehicle() {
      console.log("할인쿠폰 상품 수정")
      this.modifyClose()
      let obj = {}
      obj.coupon_name = this.m.coupon_name
      obj.value = this.m.value
      obj.couponID = this.m.couponID
      obj.keymap = this.m.keymap
      obj.price = this.m.price
      obj.validity = this.m.validity
      obj.day = this.m.day
      obj.moq = this.m.moq
      obj.re_discount_policy = this.m.re_discount_policy
      obj.siteid = this.m.siteid
      obj.moq_count = this.m.moq_count
      obj.max_holding_quantity = this.m.max_holding_quantity
      obj.max_holding_quantity_count = this.m.max_holding_quantity_count
      obj.saleing_state = this.m.saleing_state
      obj.coupon_limit = this.m.coupon_limit
      obj.coupon_limit_count = this.m.coupon_limit_count
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.delete_time = this.m.delete_time
      obj.update_time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "update_coupon_product_list"
      console.log("할인쿠폰 상품 수정 후 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("주차장 정보 삭제")
      this.modifyClose()
      let obj = {}
      obj.coupon_name = this.m.coupon_name
      obj.value = this.m.value
      obj.couponID = this.m.couponID
      obj.keymap = this.m.keymap
      obj.price = this.m.price
      obj.validity = this.m.validity
      obj.day = this.m.day
      obj.moq = this.m.moq
      obj.re_discount_policy = this.m.re_discount_policy
      obj.siteid = this.m.siteid
      obj.moq_count = this.m.moq_count
      obj.max_holding_quantity = this.m.max_holding_quantity
      obj.max_holding_quantity_count = this.m.max_holding_quantity_count
      obj.saleing_state = this.m.saleing_state
      obj.coupon_limit = this.m.coupon_limit
      obj.coupon_limit_count = this.m.coupon_limit_count
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.update_time = this.m.update_timee
      obj.time = this.m.time
      obj.delete_time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "delete_coupon_product_list"
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    search() {
      let obj = {}
      obj.kind = "get_coupon_product_list"
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.admin_pw = window.localStorage.getItem("admin_pw")
      this.sendMessage(obj)
    },
    search1() {
      let obj = {}
      obj.kind = "get_plan_list"
      obj.admin_id = window.localStorage.getItem("admin_id")
      this.sendMessage(obj)
      obj = {}
      obj.kind = "get_resident_list_query1"
      obj.admin_id = window.localStorage.getItem("admin_id")
      this.sendMessage(obj)
    },
    plan_list_fun(data) {
      this.plan_list = data.docs
    },
    member_list_fun(data) {
      console.log("data : ", data)
      this.member_list = data.docs
      for (let i = 0; i < this.member_list.length; i++) {
        let obj = {}
        obj.text = this.member_list[i].id
        this.member_list1.push(obj)
      }
    },
    coupon_product_list_fun(data) {
      //  console.log("coupon_product_list_fun : ", data, data.docs.length)
      this.coupon_product_list = []
      if (data.docs && data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          //   console.log("fun data.docs : ", data.docs)
          let obj = {}
          obj.coupon_name = data.docs[i].coupon_name
          obj.value = data.docs[i].value
          obj.couponID = data.docs[i].couponID
          obj.keymap = data.docs[i].keymap
          obj.price = data.docs[i].price
          obj.validity = data.docs[i].validity
          obj.re_discount_policy = data.docs[i].re_discount_policy
          obj.day = data.docs[i].day
          obj.moq = data.docs[i].moq
          obj.siteid = data.docs[i].siteid
          obj.moq_count = data.docs[i].moq_count
          obj.max_holding_quantity = data.docs[i].max_holding_quantity
          obj.max_holding_quantity_count =
            data.docs[i].max_holding_quantity_count
          obj.saleing_state = data.docs[i].saleing_state
          obj.coupon_limit = data.docs[i].coupon_limit
          obj.coupon_limit_count = data.docs[i].coupon_limit_count
          obj.contents = data.docs[i].contents
          obj.time = data.docs[i].time
          obj.update_time = data.docs[i].update_timee
          obj.time = data.docs[i].time
          obj.delete_time = data.docs[i].update_timee
          this.coupon_product_list.push(obj)
        }
        let temp = {}
        this.coupon_product_list.push(temp)
        this.coupon_product_list.pop()
        this.print_coupon_product_list = []
        for (let i = 0; i < this.coupon_product_list.length; i++) {
          let print = {}
          print.쿠폰명 = this.coupon_product_list[i].coupon_name
          print.할인시간 = this.coupon_product_list[i].value
          print.쿠폰ID = this.coupon_product_list[i].couponID
          print.키맵 = this.coupon_product_list[i].keymap
          print.가격 = this.coupon_product_list[i].price
          print.유효기간 = this.coupon_product_list[i].validity
          print.재할인 = this.coupon_product_list[i].re_discount_policy
          print.일 = this.coupon_product_list[i].day
          print.주차장ID = this.coupon_product_list[i].siteid
          print.최소구매수량_설정 = this.coupon_product_list[i].moq
          print.최소구매수량갯수 = this.coupon_product_list[i].moq_count
          print.최대보유갯수_설정 = this.coupon_product_list[
            i
          ].max_holding_quantity
          print.최대보유갯수 = this.coupon_product_list[
            i
          ].max_holding_quantity_count
          print.판매상태 = this.coupon_product_list[i].saleing_state
          print.쿠폰제한갯수_설정 = this.coupon_product_list[i].coupon_limit
          print.쿠폰제한갯수 = this.coupon_product_list[i].coupon_limit_count
          print.비고 = this.coupon_product_list[i].contents
          print.등록일시 = this.coupon_product_list[i].time
          print.수정일시 = this.coupon_product_list[i].update_timee
          print.삭제일시 = this.coupon_product_list[i].update_timee
          this.print_coupon_product_list.push(print)
        }
      }
    },

    start() {
      // this.manager_list = config.manager_list
      this.search()
      this.search1()
    },
    download() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.print_coupon_product_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_할인쿠폰 상품 관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_coupon_product_list") {
        this.coupon_product_list_fun(data)
      } else if (
        data.kind === "create_coupon_product_list" ||
        data.kind === "update_coupon_product_list" ||
        data.kind === "delete_coupon_product_list"
      ) {
        console.log("coupon_product_list : ", data)
        this.search()
      } else if (data.kind === "get_plan_list") {
        this.plan_list_fun(data)
      } else if (data.kind === "get_resident_list_query1") {
        this.member_list_fun(data)
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
/*
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
} */
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style></style>
