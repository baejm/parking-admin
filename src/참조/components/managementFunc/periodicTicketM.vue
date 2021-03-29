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
              <dt>차량번호<span class="essential">*</span></dt>
              <dd>
                <input
                  type="text"
                  placeholder="예) 12가3456"
                  required
                  v-model="reg.lp"
                />
              </dd>
            </dl>
            <dl>
              <dt>이름</dt>
              <dd><input type="text" v-model="reg.name" required /></dd>
            </dl>
            <dl>
              <dt>시작시점</dt>
              <dd><input type="date" v-model="reg.startTime" required /></dd>
            </dl>
            <dl>
              <dt>종료시점</dt>
              <dd><input type="date" v-model="reg.endTime" required /></dd>
            </dl>
            <dl>
              <dt>연락처</dt>
              <dd><input type="text" v-model="reg.phone" /></dd>
            </dl>
            <dl>
              <dt>상품명</dt>
              <dd>
                <select
                  @change="Changed(parking_product_list)"
                  v-model="receive"
                >
                  <option
                    v-for="(parking_product, index) in parking_product_list"
                    v-bind:key="index"
                  >
                    {{ parking_product.parking_product_name }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>그룹</dt>
              <dd><input type="text" v-model="reg.group" /></dd>
            </dl>
            <dl>
              <dt>분류</dt>
              <dd class="fixed">
                <span>{{ type }}</span>
              </dd>
            </dl>
            <dl>
              <dt>월 차량요금</dt>
              <dd><input type="text" v-model="reg.month_fee" /></dd>
            </dl>
            <dl>
              <dt>상품 가격 추가</dt>
              <dd class="fixed">
                <span>{{ parkingPrice | currency }}원</span>
              </dd>
            </dl>
            <dl>
              <dt>무료 차량 유무</dt>
              <dd>
                <select>
                  <option
                    v-for="(free, index) in freeVehicle"
                    v-bind:key="index"
                  >
                    {{ free.whether }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>할인 감면 내용</dt>
              <dd><input type="text" v-model="reg.discount_reduction" /></dd>
            </dl>
            <dl>
              <dt>신규 연장 여부</dt>
              <dd>
                <select>
                  <option
                    v-for="(ne, index) in newExtension"
                    v-bind:key="index"
                  >
                    {{ ne.whether }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>비고</dt>
              <dd><input type="text" v-model="reg.contents" /></dd>
            </dl>
            <div class="btns">
              <button @click.prevent="registNew">등록</button>
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
              <dt>차량번호<span class="essential">*</span></dt>
              <dd>
                <input
                  type="text"
                  placeholder="예) 12가3456"
                  required
                  v-model="current.lp"
                />
              </dd>
            </dl>
            <dl>
              <dt>이름<span class="essential">*</span></dt>
              <dd><input type="text" v-model="current.name" required /></dd>
            </dl>
            <dl>
              <dt>시작시점</dt>
              <dd>
                <input type="date" v-model="current.startTime" required />
              </dd>
            </dl>
            <dl>
              <dt>종료시점</dt>
              <dd><input type="date" v-model="current.endTime" required /></dd>
            </dl>
            <dl>
              <dt>연락처</dt>
              <dd><input type="text" v-model="current.phone" /></dd>
            </dl>
            <dl>
              <dt>분류</dt>
              <dd class="fixed">
                <span>{{ list_sales_list.kind1 }}</span>
              </dd>
            </dl>
            <dl>
              <dt>그룹</dt>
              <dd><input type="text" v-model="current.group" /></dd>
            </dl>
            <dl>
              <dt>상품명</dt>
              <dd><input type="text" v-model="current.product_name" /></dd>
            </dl>
            <dl>
              <dt>월 차량요금</dt>
              <dd><input type="text" v-model="current.month_fee" /></dd>
            </dl>
            <dl>
              <dt>상품 가격 추가</dt>
              <dd class="fixed">
                <span>{{ parkingPrice | currency }}원</span>
              </dd>
            </dl>
            <dl>
              <dt>무료 차량 유무</dt>
              <dd>
                <select>
                  <option
                    v-for="(free, index) in freeVehicle"
                    v-bind:key="index"
                  >
                    {{ free.whether }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>할인 감면 내용</dt>
              <dd>
                <input type="text" v-model="current.discount_reduction" />
              </dd>
            </dl>
            <dl>
              <dt>신규 연장 여부</dt>
              <dd>
                <select>
                  <option
                    v-for="(ne, index) in newExtension"
                    v-bind:key="index"
                  >
                    {{ ne.whether }}
                  </option>
                </select>
              </dd>
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
    <!-- 일괄수정팝업 -->
    <div
      class="modify_pop popup batch_modify"
      v-show="batchModifyIs"
      :class="{ column_1: Object.keys(this.current).length < 8 }"
    >
      <div>
        <h3>{{ titles }} 일괄 수정</h3>
        <button @click="modifyClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <!-- <span class="all_btn"><label><input type="checkbox" @click="selectAll" v-model="allSelected">전체 선택</label></span> -->
        <div class="form_window">
          <form>
            <dl>
              <dd class="batch">
                <label
                  ><input type="checkbox" value="차량번호" v-model="selected"
                /></label>
              </dd>
              <dt>차량번호<span class="essential">*</span></dt>
              <dd>
                <input
                  type="text"
                  placeholder="예) 12가3456"
                  required
                  v-model="current.lp"
                />
              </dd>
            </dl>
            <dl>
              <dd class="batch">
                <label
                  ><input type="checkbox" value="이름" v-model="selected"
                /></label>
              </dd>
              <dt>이름<span class="essential">*</span></dt>
              <dd><input type="text" v-model="current.name" required /></dd>
            </dl>
            <dl>
              <dt>시작시점</dt>
              <dd>
                <input type="date" v-model="current.startTime" required />
              </dd>
            </dl>
            <dl>
              <dt>종료시점</dt>
              <dd><input type="date" v-model="current.endTime" required /></dd>
            </dl>
            <dl>
              <dd class="batch">
                <label
                  ><input type="checkbox" value="연락처" v-model="selected"
                /></label>
              </dd>
              <dt>연락처</dt>
              <dd><input type="text" v-model="current.phone" /></dd>
            </dl>
            <dl>
              <dd class="batch">
                <label
                  ><input type="checkbox" value="상품명" v-model="selected"
                /></label>
              </dd>
              <dt>상품명</dt>
              <dd><input type="text" v-model="current.product_name" /></dd>
            </dl>

            <dl>
              <dd class="batch">
                <label
                  ><input type="checkbox" value="그룹" v-model="selected"
                /></label>
              </dd>
              <dt>그룹</dt>
              <dd><input type="text" v-model="current.group" /></dd>
            </dl>

            <dl>
              <dd class="batch"></dd>
              <dt>분류</dt>
              <dd class="fixed">
                <span>{{ list_sales_list.kind1 }}</span>
              </dd>
            </dl>
            <dl>
              <dd class="batch">
                <label
                  ><input type="checkbox" value="분류" v-model="selected"
                /></label>
              </dd>
              <dt>월 차량요금</dt>
              <dd><input type="text" v-model="current.month_fee" /></dd>
            </dl>
            <dl>
              <dd class="batch"></dd>
              <dt>상품 가격 추가</dt>
              <dd class="fixed">
                <span>{{ parkingPrice | currency }}원</span>
              </dd>
            </dl>
            <dl>
              <dd class="batch">
                <label
                  ><input
                    type="checkbox"
                    value="무료 차량 유무"
                    v-model="selected"
                /></label>
              </dd>
              <dt>무료 차량 유무</dt>
              <dd>
                <select>
                  <option
                    v-for="(free, index) in freeVehicle"
                    v-bind:key="index"
                  >
                    {{ free.whether }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dd class="batch">
                <label
                  ><input
                    type="checkbox"
                    value="할인 감면 내용"
                    v-model="selected"
                /></label>
              </dd>
              <dt>할인 감면 내용</dt>
              <dd>
                <input type="text" v-model="current.discount_reduction" />
              </dd>
            </dl>
            <dl>
              <dd class="batch">
                <label
                  ><input
                    type="checkbox"
                    value=">신규 연장 여부"
                    v-model="selected"
                /></label>
              </dd>
              <dt>신규 연장 여부</dt>
              <dd>
                <select>
                  <option
                    v-for="(ne, index) in newExtension"
                    v-bind:key="index"
                  >
                    {{ ne.whether }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dd class="batch">
                <label
                  ><input type="checkbox" value="비고" v-model="selected"
                /></label>
              </dd>
              <dt>비고</dt>
              <dd><input type="text" v-model="current.contents" /></dd>
            </dl>
            <div class="btns">
              <button @click.prevent="batchModifyVehicle" class="modifybtn">
                수정
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
        <button @click.prevent="excelDownFunc" class="save_btn">
          <font-awesome-icon icon="save" />저장
        </button>

        <label class="upload"
          ><font-awesome-icon icon="upload" />업로드<input
            type="file"
            @change="onChange"
          />
        </label>
        <xlsx-read :file="file">
          <xlsx-json @parsed="notice(parsed)">
            <template #default="{collection}">
              <div>
                {{ collection }}
              </div>
            </template>
          </xlsx-json>
        </xlsx-read>
        <button @click.prevent="excelUp" class="download">
          <font-awesome-icon icon="clipboard" />양식받기
        </button>
        <button @click.prevent="batchModify" class="batch_modify">
          <font-awesome-icon icon="clipboard-list" />일괄수정
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
          v-for="(res, index) in list_sales_list"
          :key="index"
          :class="{ active: res.listActive }"
          @click="modifyOpen(res)"
        >
          <span class="number"> {{ index + 1 }}</span>
          <span
            ><input
              type="text"
              v-model="res.lp"
              readonly
              v-on:change="contents_change(index)"
          /></span>
          <span><input type="text" v-model="res.period_start"/></span>
          <span><input type="text" v-model="res.period_end"/></span>
          <span><input type="text" v-model="res.name"/></span>
          <span><input type="text" v-model="res.phone"/></span>
          <span><input type="text" v-model="res.kind1"/></span>
          <span><input type="text" v-model="res.group"/></span>
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
// import XLSX from 'xlsx'
import _ from "underscore"
import config from "../../config.js"
import { mapState } from "vuex"
//import { XlsxRead, XlsxTable, XlsxSheets, XlsxJson, XlsxWorkbook, XlsxSheet, XlsxDownload } from "../../dist/vue-xlsx.es.js"
import { XlsxRead, XlsxJson } from "vue-xlsx/dist/vue-xlsx.es.js"

export default {
  components: {
    XlsxRead,
    XlsxJson
    //  XlsxWorkbook,
    // XlsxSheet,
    // XlsxDownload
  },
  data() {
    return {
      parkingPrice: "",
      receive: "",
      price: "",
      type: "",
      memo: [],
      parsed: [],
      // collection:[],
      file: null,
      selectedSheet: null,
      sheetName: null,
      sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
      //  collection: [{ a: 1, b: 2 }],
      // collection: [],
      modifyIs: false,
      batchModifyIs: false,
      xlsx_lp: "",
      searchNumber: "",
      start_time: format_time1(new Date(Date.now())),
      end_time: format_time1(new Date(Date.now())),
      resistIs: false,
      parking_product_list: [],
      listItem: [
        { title: "번호", sortBy: false, standard: "time" },
        { title: "차량번호", sortBy: false, standard: "lp" },
        { title: "개시시점", sortBy: false, standard: "period_start" },
        { title: "종료시점", sortBy: false, standard: "period_end" },
        { title: "이름", sortBy: false, standard: "name" },
        { title: "연락처", sortBy: false, standard: "phone" },
        { title: "분류", sortBy: false, standard: "kind1" },
        { title: "그룹", sortBy: false, standard: "group" },
        { title: "비고", sortBy: false, standard: "contents" }
      ],
      reg: {
        lp: "",
        startTime: format_time1(new Date(Date.now())),
        endTime: format_time1(new Date(Date.now())),
        name: "",
        phone: "",
        kind1: "",
        contents: "",
        number: "",
        group: "",
        product_name: "",
        month_fee: "",
        fee_vehicle: "",
        discount_reduction: "",
        new_extend: "",
        seasonTicket: [],
        freeVehicle: [],
        newExtension: []
      },
      current: {
        lp: "",
        startTime: format_time1(new Date(Date.now())),
        endTime: format_time1(new Date(Date.now())),
        name: "",
        phone: "",
        kind1: "",
        contents: "",
        number: "",
        group: "",
        product_name: "",
        month_fee: "",
        fee_vehicle: "",
        discount_reduction: "",
        new_extend: "",
        seasonTicket: [],
        freeVehicle: [],
        newExtension: []
      },
      freeVehicle: "유료",
      newExtension: "신규",
      list_sales_list: [],
      searchLocation: "",
      searchDirection: "",
      locations: [],
      directions: [],
      selected: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_sales_list") {
        this.sales_list(data)
      } else if (
        data.kind === "create_sales_at_sales_list" ||
        data.kind === "update_sales_at_sales_list" ||
        data.kind === "delete_sales_at_sales_list"
      ) {
        this.search()
      } else if (data.kind === "get_parking_product_list") {
        this.parking_product_list_fun(data)
      }
    })
    this.start()
    this.changeTitle()
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "periodicTicketM") this.titles = add.title
        })
      })
    },
    Changed() {
      let sel = ""
      this.parking_product_list.forEach(park => {
        if (park.parking_product_name === this.receive) {
          sel = park
          console.log(sel)
        }
        if (sel.parking_product_name === this.receive) {
          this.parkingPrice = sel.parking_price
          this.type = sel.kind2
        }
      })
    },
    upDown_click: function(e) {
      let temp10 = []
      if (e.sortBy === false) {
        this.listItem.forEach(e => {
          e.sortBy = false
        })
        e.sortBy = true
        temp10 = _.sortBy(this.list_sales_list, e.standard)
        temp10.reverse()
        return (this.list_sales_list = temp10)
      } else {
        e.sortBy = false
        temp10 = _.sortBy(this.list_sales_list, e.standard)
        return (this.list_sales_list = temp10)
      }
    },
    async notice(parsed) {
      await alert(parsed)
      console.log("파스", parsed)
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.current.lp = c.lp
      this.current.startTime = c.startTime
      this.current.endTime = c.endTime
      this.current.name = c.name
      this.current.phone = c.phone
      this.current.kind1 = c.kind1
      this.current.contents = c.contents
      this.current.number = c.number
      this.current.group = c.group
      this.current.product_name = c.product_name
      this.current.month_fee = c.month_fee
      this.current.fee_vehicle = c.fee_vehicle
      this.current.discount_reduction = c.discount_reduction
      this.current.new_extend = c.new_extend
      this.current.seasonTicket = c.seasonTicket
      this.current.freeVehicle = c.freeVehicle
      this.current.newExtension = c.newExtension
      console.log("c : ", c)
    },
    batchModify(c) {
      this.batchModifyIs = true
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
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null
      console.log("collection : ", this.collection)
    },
    // addSheet() {
    //   this.sheets.push({ name: this.sheetName, data: [...this.collection] });
    //   this.sheetName = null;

    // },
    modifyClose() {
      this.modifyIs = false
      this.batchModifyIs = false
    },
    registOpen() {
      this.current.lp = ""
      this.current.startTime = ""
      this.current.endTime = ""
      this.current.name = ""
      this.current.phone = ""
      this.current.kind1 = ""
      this.current.contents = ""
      this.current.number = ""
      this.current.group = ""
      this.current.product_name = ""
      this.current.month_fee = ""
      this.current.fee_vehicle = ""
      this.current.discount_reduction = ""
      this.current.new_extend = ""
      this.current.seasonTicket = ""
      this.current.freeVehicle = ""
      this.current.newExtension = ""
      this.resistIs = true
    },
    registClose() {
      this.resistIs = false
    },
    registNew(e) {
      this.registClose()
      e.preventDefault()
      let obj = {}
      let startTime = this.reg.startTime + ".00:00:00"
      let endTime = this.reg.endTime + ".23:59:59"
      obj.lp = this.reg.lp
      obj.period_start = get_datetime(startTime)
      obj.period_end = get_datetime(endTime)
      obj.name = this.reg.name
      obj.phone = this.reg.phone
      obj.kind1 = this.reg.kind1
      obj.contents = this.reg.contents
      obj.group = this.reg.group
      obj.product_name = this.reg.product_name
      obj.month_fee = this.reg.month_fee
      obj.fee_vehicle = this.reg.fee_vehicle
      obj.discount_reduction = this.reg.discount_reduction
      obj.new_extend = this.reg.new_extend
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      obj.kind = "create_sales_at_sales_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    modifyVehicle() {
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.startTime = this.current.startTime
      obj.endTime = this.current.endTime
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.kind1 = this.current.kind1
      obj.contents = this.current.contents
      obj.number = this.current.number
      obj.group = this.current.group
      obj.product_name = this.current.product_name
      obj.month_fee = this.current.month_fee
      obj.fee_vehicle = this.current.fee_vehicle
      obj.discount_reduction = this.current.discount_reduction
      obj.new_extend = this.current.new_extend
      obj.seasonTicket = this.current.seasonTicket
      obj.freeVehicle = this.current.freeVehicle
      obj.newExtension = this.current.newExtension
      obj.kind = "update_sales_at_sales_list"
      this.sendMessage(obj)
    },
    batchModifyVehicle() {
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.startTime = this.current.startTime
      obj.endTime = this.current.endTime
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.kind1 = this.current.kind1
      obj.contents = this.current.contents
      obj.number = this.current.number
      obj.group = this.current.group
      obj.product_name = this.current.product_name
      obj.month_fee = this.current.month_fee
      obj.fee_vehicle = this.current.fee_vehicle
      obj.discount_reduction = this.current.discount_reduction
      obj.new_extend = this.current.new_extend
      obj.seasonTicket = this.current.seasonTicket
      obj.freeVehicle = this.current.freeVehicle
      obj.newExtension = this.current.newExtension
      obj.kind = "update_sales_at_sales_list"
      this.sendMessage(obj)
    },
    deleteVehicle() {
      this.modifyClose()
      let obj = {}
      obj.lp = this.current.lp
      obj.startTime = this.current.startTime
      obj.endTime = this.current.endTime
      obj.name = this.current.name
      obj.phone = this.current.phone
      obj.kind1 = this.current.kind1
      obj.contents = this.current.contents
      obj.number = this.current.number
      obj.group = this.current.group
      obj.product_name = this.current.product_name
      obj.month_fee = this.current.month_fee
      obj.fee_vehicle = this.current.fee_vehicle
      obj.discount_reduction = this.current.discount_reduction
      obj.new_extend = this.current.new_extend
      obj.seasonTicket = this.current.seasonTicket
      obj.freeVehicle = this.current.freeVehicle
      obj.newExtension = this.current.newExtension
      obj.kind = "delete_sales_at_sales_list"
      this.sendMessage(obj)
    },
    loc_dir() {
      this.locations = []
      this.directions = []
      let location_list = []
      let direction_list = []
      location_list = config.location_list
      direction_list = config.direction_list
      this.seasonTicket = config.seasonTicket
      this.freeVehicle = config.freeVehicle
      this.newExtension = config.newExtension
      this.locations = location_list
      this.directions = direction_list
      let temp = {}
      this.locations.push(temp)
      this.locations.splice(this.locations.length - 1, 1)
      this.directions.push(temp)
      this.directions.splice(this.directions.length - 1, 1)
    },
    sales_list(data) {
      this.list_sales_list = []
      for (let i = 0; i < data.docs.length; i++) {
        let obj = {}
        obj.lp = data.docs[i].lp
        obj.period_start = format_date(new Date(data.docs[i].period_start))
        obj.period_end = format_date(new Date(data.docs[i].period_end))
        obj.name = data.docs[i].name
        obj.phone = data.docs[i].phone
        obj.kind1 = data.docs[i].kind1
        obj.contents = data.docs[i].contents
        obj.group = data.docs[i].group
        obj.product_name = data.docs[i].product_name
        obj.month_fee = data.docs[i].month_fee
        obj.fee_vehicle = data.docs[i].fee_vehicle
        obj.discount_reduction = data.docs[i].discount_reduction
        obj.new_extend = data.docs[i].new_extend
        obj.number = data.docs[i].lp.number
        obj.kind = data.docs[i].kind
        obj.time = data.docs[i].time
        let set = format_date2(new Date(data.docs[i].period_end))
        let manual = format_date2(new Date())
        let setting = Number(set)
        let manualing = Number(manual)
        if (setting < manualing) {
          obj.listActive = true
        }
        this.list_sales_list.push(obj)
      }
      let temp = {}
      this.list_sales_list.push(temp)
      this.list_sales_list.pop()
    },
    parking_product_list_fun(data) {
      console.log("parking_product_list_fun : ", data)
      this.parking_product_list = data.docs
    },
    search() {
      var obj = {}
      obj.lp = this.searchNumber
      obj.id = window.localStorage.getItem("admin_id")
      obj.pw = window.localStorage.getItem("admin_pw")
      obj.kind = "get_sales_list"
      this.sendMessage(obj)
    },
    search1() {
      var obj = {}
      obj.id = window.localStorage.getItem("admin_id")
      obj.pw = window.localStorage.getItem("admin_pw")
      obj.kind = "get_parking_product_list"
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    start() {
      let now = Date.now()
      this.start_time = format_date(new Date(now))
      this.end_time = format_date(new Date(now))
      this.loc_dir()
      this.search1()
    }
  }
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
function format_date(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "-" + num_to_str(dat.getMonth() + 1)
  str += "-" + num_to_str(dat.getDate())
  return str
}
function format_date2(dat) {
  var str = ""
  str += dat.getFullYear()
  str += num_to_str(dat.getMonth() + 1)
  str += num_to_str(dat.getDate())
  return str
}
function num_to_str($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
</script>
<style></style>
