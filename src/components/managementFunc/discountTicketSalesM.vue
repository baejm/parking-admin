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
              <dt>입주사ID</dt>
              <!-- <dd> <input type="text" required v-model="r.resident_name"/></dd> -->
              <dd>
                <select v-model="r.resident_id">
                  <option
                    v-for="(member, index) in member_list"
                    v-bind:key="index"
                  >
                    {{ member.id }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>전화번호</dt>
              <dd><input type="text" required v-model="r.buy_phone" /></dd>
            </dl>
            <dl>
              <dt>할인쿠폰명</dt>
              <dd>
                <select v-model="r.product_name">
                  <option
                    v-for="(coupon_product, index) in coupon_product_list"
                    v-bind:key="index"
                  >
                    {{ coupon_product.coupon_name }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>수량</dt>
              <dd><input type="text" required v-model="r.quantity" /></dd>
            </dl>
            <dl>
              <dt>핀매자</dt>
              <dd><input type="text" v-model="r.sales_name" /></dd>
            </dl>
            <dl>
              <dt>단가</dt>
              <dd>{{ unit_price_r_cal }}</dd>
              <!-- <dd>
                  <select v-model="r.unit_price">
                    <option v-for="(coupon_product, index) in coupon_product_list" v-bind:key="index" >
                      <div v-if ="r.product_name === coupon_product.coupon_name">
                      {{ coupon_product.price }}
                      </div>
                    </option>
                  </select>
                </dd> -->
            </dl>
            <dl>
              <dt>상품가격</dt>
              <dd>{{ product_price_r_cal }}</dd>
            </dl>
            <dl>
              <dt>판매가격</dt>
              <dd><input type="text" v-model="r.sales_price" /></dd>
            </dl>
            <dl class="serial">
              <dt>시리얼 시작</dt>

              <button @click.prevent="start_serail_r_cal" class="writebtn">
                시리얼 시작
              </button>

              <!-- <dd> {{ start_serail }} </dd> -->
              <dd><input type="number" v-model="r.start_serail" /></dd>
            </dl>
            <dl>
              <dt>시리얼 끝</dt>
              <!-- <dd> <input type="text"  v-model="r.end_serail"/></dd> -->
              <dd>{{ end_serail_r_cal }}</dd>
            </dl>
            <dl>
              <dt>비고</dt>
              <dd><input type="text" v-model="r.contents" /></dd>
            </dl>
            <dl>
              <dt>입주사명</dt>
              <!--  <dd><input type="text" v-model="r.contents" /></dd> -->
              <dd>{{ company_name_r_cal }}</dd>
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
        <h3>{{ titles }} 삭제</h3>
        <button @click="modifyClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>입주사ID</dt>
              <!-- <dd> <input type="text" required v-model="m.resident_name"/></dd> -->
              <!-- <dd>
                <select v-model="m.resident_id">
                  <option v-for="(member, index) in member_list" v-bind:key="index">
                    {{ member.id }}
                  </option>
                </select> 
              </dd> -->
              <dd>{{ m.resident_id }}</dd>
            </dl>
            <dl>
              <dt>전화번호</dt>
              <dd>{{ m.buy_phone }}</dd>
              <!-- <dd> <input type="text" required v-model="m.buy_phone"/></dd> -->
            </dl>
            <dl>
              <dt>할인쿠폰명</dt>
              <!--<dd>
                <select v-model="m.product_name">
                  <option v-for="(coupon_product, index) in coupon_product_list" v-bind:key="index">
                    {{ coupon_product.coupon_name }}
                  </option>
                </select> 
              </dd>   -->
              <dd>{{ m.product_name }}</dd>
            </dl>
            <dl>
              <dt>수량</dt>
              <!--<dd> <input type="text" required v-model="m.quantity"/></dd> -->
              <dd>{{ m.quantity }}</dd>
            </dl>
            <dl>
              <dt>핀매자</dt>
              <!-- <dd> <input type="text"  v-model="m.sales_name"/></dd> -->
              <dd>{{ m.sales_name }}</dd>
            </dl>
            <dl>
              <dt>단가</dt>
              <!-- <dd> <input type="text"  v-model="m.unit_price"/></dd> -->
              <dd>{{ unit_price_m_cal }}</dd>
            </dl>
            <dl>
              <dt>상품가격</dt>
              <!--<dd> <input type="text"  v-model="m.product_price"/></dd> -->
              <dd>{{ product_price_m_cal }}</dd>
            </dl>
            <dl>
              <dt>판매가격</dt>
              <dd>{{ m.sales_price }}</dd>
              <!-- <dd> <input type="text"  v-model="m.sales_price"/></dd> -->
            </dl>
            <dl>
              <dt>시리얼_시작</dt>
              <dd>{{ m.start_serail }}</dd>
              <!--<dd> <input type="text"  v-model="m.start_serail"/></dd> -->
            </dl>
            <dl>
              <dt>시리얼_끝</dt>
              <dd>{{ m.end_serail }}</dd>
              <!-- <dd> <input type="text"  v-model="m.end_serail"/></dd> -->
            </dl>
            <dl>
              <dt>비고</dt>
              <dd>{{ m.contents }}</dd>
              <!--  <dd><input type="text" v-model="m.contents" /></dd> -->
            </dl>
            <dl>
              <dt>입주사명</dt>
              <!--  <dd><input type="text" v-model="r.contents" /></dd> -->
              <dd>{{ m.resident_name }}</dd>
            </dl>
            <div class="btns">
              <!--   <button @click.prevent="modifyVehicle" class="modifybtn">
              수정 
            </button>      -->
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
      <span class="small_title">날짜</span>
      <input type="date" id="start_time" v-model="start_time" />
      <span>~</span>
      <input type="date" id="end_time" v-model="end_time" />
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
          v-for="(coupon_manager, index) in coupon_manager_list"
          :key="index"
          @click="modifyOpen(coupon_manager)"
        >
          <span> {{ index + 1 }}</span>
          <span
            ><input type="text" v-model="coupon_manager.resident_name" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_manager.buy_phone" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_manager.product_name" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_manager.quantity" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_manager.sales_name" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_manager.unit_price" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_manager.product_price" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_manager.sales_price" readonly
          /></span>
          <span
            ><input type="text" v-model="coupon_manager.contents" readonly
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
import _ from "underscore"
export default {
  data() {
    return {
      listItem: [
        { title: "번호" },
        { title: "입주사명", sortBy: false, standard: "resident_name" },
        { title: "전화번호", sortBy: false, standard: "buy_phone" },
        { title: "할인쿠폰명", sortBy: false, standard: "product_name" },
        { title: "수량", sortBy: false, standard: "quantity" },
        { title: "판매자", sortBy: false, standard: "sales_name" },
        { title: "단가", sortBy: false, standard: "unit_price" },
        { title: "상품가격", sortBy: false, standard: "product_price" },
        { title: "판매가격", sortBy: false, standard: "sales_price" },
        { title: "메모", sortBy: false, standard: "contents" }
      ],
      resistIs: false,
      modifyIs: false,
      start_time: "",
      end_time: "",
      searchLp: "",
      r: {
        resident_name: "",
        buy_phone: "",
        product_name: "",
        quantity: 0,
        sales_name: "",
        sales_time: "",
        unit_price: 0,
        product_price: 0,
        sales_price: "",
        start_serail: "",
        end_serail: "",
        expiration_date: "",
        contents: "",
        time: "",
        update_time: "",
        delete_time: ""
      },
      m: {
        resident_name: "",
        buy_phone: "",
        product_name: "",
        quantity: 0,
        sales_name: "",
        sales_time: "",
        unit_price: 0,
        product_price: 0,
        sales_price: "",
        start_serail: "",
        end_serail: "",
        expiration_date: "",
        contents: "",
        time: "",
        update_time: "",
        delete_time: ""
      },
      coupon_manager_list: [],
      coupon_product_list: [],
      member_list: [],
      member_list1: [],
      print_coupon_manager_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"]),
    product_price_r_cal() {
      let price = 0
      let unit_price = this.r.unit_price
      let quantity = parseInt(this.r.quantity, 10)
      for (let i = 0; i < this.coupon_product_list.length; i++) {
        if (this.r.product_name === this.coupon_product_list[i].coupon_name) {
          unit_price = parseInt(this.coupon_product_list[i].price, 10)
          break
        }
      }
      price = unit_price * quantity
      //   this.r.product_price = price
      console.log(" unit_price : ", unit_price, " quantity : ", quantity)
      return price
    },
    product_price_m_cal() {
      let price = 0
      let unit_price = parseInt(this.m.unit_price, 10)
      let quantity = parseInt(this.m.quantity, 10)
      for (let i = 0; i < this.coupon_product_list.length; i++) {
        if (this.m.product_name === this.coupon_product_list[i].coupon_name) {
          unit_price = parseInt(this.coupon_product_list[i].price, 10)
          break
        }
      }
      price = unit_price * quantity
      //   this.m.product_price = price

      return price
    },
    company_name_r_cal() {
      let company_name = ""
      for (let i = 0; i < this.member_list.length; i++) {
        if (this.r.resident_id === this.member_list[i].id) {
          company_name = this.member_list[i].company_name
          break
        }
      }
      //  this.r.resident_name = company_name
      //   this.r.product_price = price
      console.log(" r company_name : ", company_name)
      return company_name
    },
    company_name_m_cal() {
      let company_name = ""
      for (let i = 0; i < this.member_list.length; i++) {
        if (this.m.resident_id === this.member_list[i].id) {
          company_name = this.member_list[i].company_name
          break
        }
      }
      // this.m.resident_name = company_name
      //   this.r.product_price = price
      console.log(" m company_name : ", company_name)
      return company_name
    },
    unit_price_r_cal() {
      let unit_price = 0
      for (let i = 0; i < this.coupon_product_list.length; i++) {
        if (this.r.product_name === this.coupon_product_list[i].coupon_name) {
          unit_price = parseInt(this.coupon_product_list[i].price, 10)
          break
        }
      }
      // this.m.resident_name = company_name
      //   this.r.product_price = price
      console.log(" r unit_price : ", unit_price)
      return unit_price
    },
    unit_price_m_cal() {
      let unit_price = 0
      for (let i = 0; i < this.coupon_product_list.length; i++) {
        if (this.m.product_name === this.coupon_product_list[i].coupon_name) {
          unit_price = parseInt(this.coupon_product_list[i].price, 10)
          break
        }
      }
      // this.m.resident_name = company_name
      //   this.r.product_price = price
      console.log(" m unit_price : ", unit_price)
      return unit_price
    },
    end_serail_r_cal() {
      let end_serail = 0
      end_serail =
        parseInt(this.r.start_serail, 10) + parseInt(this.r.quantity, 10) - 1

      // this.m.resident_name = company_name
      //   this.r.product_price = price
      console.log(
        " r end_serail: ",
        end_serail,
        "parseInt(this.r.quantity, 10) :",
        parseInt(this.r.quantity, 10),
        " parseInt(this.r.start_serail, 10) : ",
        parseInt(this.r.start_serail, 10)
      )
      return end_serail
    }
  },
  methods: {
    upDown_click: function(e) {
      let temp10 = []
      if (e.sortBy === false) {
        this.listItem.forEach(e => {
          e.sortBy = false
        })
        e.sortBy = true
        temp10 = _.sortBy(this.coupon_manager_list, e.standard)
        temp10.reverse()
        return (this.coupon_manager_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.coupon_manager_list, e.standard)
        return (this.coupon_manager_list = temp10)
      }
    },
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "discountTicketSalesM") this.titles = add.title
        })
      })
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.m.resident_name = c.resident_name
      this.m.resident_id = c.resident_id
      this.m.buy_phone = c.buy_phone
      this.m.product_name = c.product_name
      this.m.quantity = c.quantity
      this.m.sales_name = c.sales_name
      this.m.coupon_time = c.coupon_time
      this.m.sales_time = Date.now()
      this.m.unit_price = c.unit_price
      this.m.product_price = c.product_price
      this.m.sales_price = c.sales_price
      this.m.start_serail = c.start_serail
      this.m.end_serail = c.end_serail
      this.m.expiration_date = c.expiration_date
      this.m.contents = c.contents
      this.m.time = c.time
      this.m.update_time = c.update_time
      this.m.delete_time = c.delete_time
    },
    start_serail_r_cal() {
      let next_serial = 0
      let start_serail = 0
      for (let i = 0; i < this.coupon_product_list.length; i++) {
        if (this.r.product_name === this.coupon_product_list[i].coupon_name) {
          next_serial = parseInt(this.coupon_product_list[i].next_serial, 10)
          break
        }
      }
      //  this.r.start_serail = next_serial
      // next_serial = 101
      start_serail = next_serial

      // this.m.resident_name = company_name
      //   this.r.product_price = price
      console.log(" r start_serail: ", start_serail)
      this.r.start_serail = start_serail
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

      for (let i = 0; i < this.member_list.length; i++) {
        if (this.member_list[i].id === this.r.resident_id) {
          this.r.resident_name = this.member_list[i].company_name
        }
      }
      for (let i = 0; i < this.coupon_product_list.length; i++) {
        if (this.r.product_name === this.coupon_product_list[i].coupon_name) {
          obj.product = this.coupon_product_list[i]
          this.r.unit_price = this.coupon_product_list[i].price
          this.r.product_price =
            this.r.unit_price * parseInt(this.r.quantity, 10)
        }
      }
      obj.resident_id = this.r.resident_id
      obj.resident_name = this.r.resident_name
      obj.buy_phone = this.r.buy_phone
      obj.product_name = this.r.product_name
      obj.quantity = this.r.quantity
      obj.sales_name = this.r.sales_name
      obj.coupon_time = this.r.coupon_time
      obj.sales_time = Date.now()
      obj.unit_price = this.r.unit_price
      obj.product_price = this.r.product_price
      obj.sales_price = this.r.sales_price
      obj.start_serail = this.r.start_serail
      obj.end_serail =
        parseInt(this.r.start_serail, 10) + parseInt(this.r.quantity, 10) - 1
      obj.expiration_date = this.r.expiration_date
      obj.contents = this.r.contents
      obj.time = Date.now()
      obj.kind = "create_coupon_manager_list"
      this.m.update_time = this.r.update_time
      this.m.delete_time = this.r.delete_time
      console.log("obj :", obj)
      this.sendMessage(obj)
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
    coupon_manager_list_fun(data) {
      this.coupon_manager_list = []

      //console.log("coupon_manager_list_fun : ", data, data.docs.length)
      if (data.docs && data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          let obj = {}

          obj.resident_id = data.docs[i].resident_id
          obj.resident_name = data.docs[i].resident_name
          obj.buy_phone = data.docs[i].buy_phone
          obj.product_name = data.docs[i].product_name
          obj.quantity = data.docs[i].quantity
          obj.sales_name = data.docs[i].sales_name
          obj.coupon_time = data.docs[i].coupon_time
          obj.sales_time = Date.now()
          obj.unit_price = data.docs[i].unit_price
          obj.product_price = data.docs[i].product_price
          obj.sales_price = data.docs[i].sales_price
          obj.start_serail = data.docs[i].start_serail
          obj.end_serail = data.docs[i].end_serail
          obj.expiration_date = data.docs[i].expiration_date
          obj.contents = data.docs[i].contents
          obj.time = data.docs[i].time
          obj.str_time = format_time1(new Date(data.docs[i].time))
          obj.update_time = data.docs[i].update_time
          obj.delete_time = data.docs[i].update_time
          this.coupon_manager_list.push(obj)
        }

        let temp = {}
        this.coupon_manager_list.push(temp)
        this.coupon_manager_list.pop()
        this.print_coupon_manager_list = []
        for (let i = 0; i < this.coupon_manager_list.length; i++) {
          let print = {}
          let obj1 = this.coupon_manager_list[i]
          print.입주사명 = obj1.resident_name
          print.전화번호 = obj1.buy_phone
          print.상품명 = obj1.product_name
          print.수량 = obj1.quantity
          print.판매자 = obj1.sales_name
          print.쿠폰 = obj1.coupon_time
          print.판매일시 = obj1.sales_time
          print.단가 = obj1.unit_price
          print.상품가격 = obj1.product_price
          print.판매가격 = obj1.sales_price
          print.시작_시리얼 = obj1.start_serail
          print.종료_시리얼 = obj1.end_serail
          print.유효일자 = obj1.expiration_date
          print.메모 = obj1.contents
          print.등록일시 = format_time1(new Date(obj1.time))
          this.print_coupon_manager_list.push(print)
        }
      }
    },
    modifyVehicle() {
      this.modifyClose()
      let obj = {}
      this.m.product_price = this.m.unit_price * this.m.quantity
      obj.resident_name = this.m.resident_name
      obj.buy_phone = this.m.buy_phone
      obj.product_name = this.m.product_name
      obj.quantity = this.m.quantity
      obj.sales_name = this.m.sales_name
      obj.coupon_time = this.m.coupon_time
      obj.sales_time = Date.now()
      obj.unit_price = this.m.unit_price
      obj.product_price = this.m.product_price
      obj.sales_price = this.m.sales_price
      obj.start_serail = this.m.start_serail
      obj.end_serail = this.m.end_serail
      obj.expiration_date = this.m.expiration_date
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.update_time = Date.now()
      obj.delete_time = this.m.delete_time
      obj.kind = "update_coupon_manager_list"
      console.log("update_coupon_manager_list :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      this.modifyClose()
      let obj = {}
      this.m.product_price = this.m.unit_price * this.m.quantity
      obj.resident_name = this.m.resident_name
      obj.buy_phone = this.m.buy_phone
      obj.product_name = this.m.product_name
      obj.quantity = this.m.quantity
      obj.sales_name = this.m.sales_name
      obj.coupon_time = this.m.coupon_time
      obj.sales_time = Date.now()
      obj.unit_price = this.m.unit_price
      obj.product_price = this.m.product_price
      obj.sales_price = this.m.sales_price
      obj.start_serail = this.m.start_serail
      obj.end_serail = this.m.end_serail
      obj.expiration_date = this.m.expiration_date
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.update_time = this.m.update_time
      obj.delete_time = Date.now()
      obj.kind = "delete_coupon_manager_list"
      console.log("delete_coupon_manager_list :", obj)
      this.sendMessage(obj)
    },
    start() {
      this.date_set()
      let obj = {}
      obj.id = window.localStorage.getItem("id")
      obj.kind = "get_coupon_product_list"
      this.sendMessage(obj)
      obj = {}
      obj.kind = "get_resident_list_query1"
      obj.admin_id = window.localStorage.getItem("id")
      this.sendMessage(obj)
    },
    search() {
      var obj = {}
      obj.start_time = get_start_date(this.start_time)
      obj.end_time = get_end_date(this.end_time)
      obj.id = window.localStorage.getItem("id")
      obj.kind = "get_coupon_manager_list"
      console.log("get_coupon_manager_list : ", obj)
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    date_set() {
      let d = new Date()
      //let d1 = d - (24*60*60*1000);
      //console.log("d : ", d, " d1 : ", d1);
      let str_start =
        d.getFullYear() + "-" + itoStr(d.getMonth()) + "-" + itoStr(d.getDate())

      let str_end =
        d.getFullYear() +
        "-" +
        itoStr(d.getMonth() + 1) +
        "-" +
        itoStr(d.getDate())
      this.start_time = str_start
      this.end_time = str_end
    },
    download() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.print_coupon_manager_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_할인쿠폰 판매 관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_coupon_manager_list") {
        //  console.log( "get_coupon_coupon_manager_list : ", data)
        this.coupon_manager_list_fun(data)
      } else if (
        data.kind === "create_coupon_manager_list" ||
        data.kind === "update_coupon_manager_list" ||
        data.kind === "delete_coupon_manager_list"
      ) {
        this.search()
      } else if (data.kind === "get_coupon_product_list") {
        this.coupon_product_list = data.docs
        this.unit_price_list = []
        let obj = {}
        for (let i = 0; i < this.coupon_product_list.length; i++) {
          obj.unit_price = this.coupon_product_list.price
          obj.coupon_name = this.coupon_product_list.coupon_name
        }
        //  console.log("this.coupon_product_list : ", this.coupon_product_list)
      } else if (data.kind === "get_resident_list_query1") {
        this.member_list_fun(data)
      }
    })
    this.start()
    this.changeTitle()
  }
}
function get_start_date(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(
    parseInt(res[0]),
    parseInt(res[1]) - 1,
    parseInt(res[2]),
    0,
    0,
    0,
    0
  )
  return d.getTime()
}

function get_end_date(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(
    parseInt(res[0]),
    parseInt(res[1]) - 1,
    parseInt(res[2]),
    23,
    59,
    59,
    999
  )
  return d.getTime()
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
/*function get_date(str) {
  var res = str.split(/[-T.:\s]+/)
  var d = new Date(
    parseInt(res[0]),
    parseInt(res[1]) - 1,
    parseInt(res[2]),
    0,
    0,
    0,
    0
  )
  return d.getTime()
}*/
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
}*/
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
