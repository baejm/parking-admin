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
              <dt>할인감면명:</dt>
              <dd><input type="text" v-model="r.reduction_name" /></dd>
            </dl>
            <dl>
              <dt>할인시간:</dt>
              <dd><input type="text" v-model="r.hour" /></dd>
            </dl>
            <dl>
              <dt>할인값:</dt>
              <dd><input type="text" v-model="r.value" /></dd>
            </dl>
            <dl>
              <dt>단위:</dt>
              <dd>
                <select v-model="r.unit">
                  <option v-for="(unit, index) in unit_list" v-bind:key="index">
                    {{ unit.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>키맵:</dt>
              <dd><input type="text" v-model="r.keymap" /></dd>
            </dl>
            <dl>
              <dt>비고:</dt>
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
    <div class="modify_pop popup" v-show="modifyIs">
      <div>
        <h3>{{ titles }} 수정</h3>
        <button @click="modifyClose" class="pop_close">
          <font-awesome-icon icon="window-close" />
        </button>
        <div class="form_window">
          <form>
            <dl>
              <dt>할인감면명:</dt>
              <dd><input type="text" v-model="m.reduction_name" /></dd>
            </dl>
            <dl>
              <dt>할인시간:</dt>
              <dd><input type="text" v-model="m.hour" /></dd>
            </dl>
            <dl>
              <dt>할인값:</dt>
              <dd><input type="text" v-model="m.value" /></dd>
            </dl>
            <dl>
              <dt>단위:</dt>
              <dd>
                <select v-model="r.unit">
                  <option v-for="(unit, index) in unit_list" v-bind:key="index">
                    {{ unit.text }}
                  </option>
                </select>
              </dd>
            </dl>
            <dl>
              <dt>키맵:</dt>
              <dd><input type="text" v-model="m.keymap" /></dd>
            </dl>
            <dl>
              <dt>비고:</dt>
              <dd><input type="text" v-model="m.contents" /></dd>
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
        <li>할인감면명</li>
        <li>할인시간</li>
        <li>할인값</li>
        <li>단위</li>
        <li>키맵</li>
        <li>비고</li>
      </ul>
      <ul class="list-wrap">
        <li
          v-for="(reduction_product, index) in reduction_product_list"
          :key="index"
          @click="modifyOpen(reduction_product)"
        >
          <span>{{ index + 1 }}</span>
          <span
            ><input
              type="text"
              v-model="reduction_product.reduction_name"
              readonly
          /></span>
          <span
            ><input type="text" v-model="reduction_product.hour" readonly
          /></span>
          <span
            ><input type="text" v-model="reduction_product.value" readonly
          /></span>
          <span
            ><input type="text" v-model="reduction_product.unit" readonly
          /></span>
          <span
            ><input type="text" v-model="reduction_product.keymap" readonly
          /></span>
          <span
            ><input type="text" v-model="reduction_product.contents" readonly
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
      unit_list: [
        {
          text: "min"
        },
        {
          text: "won"
        },
        {
          text: "percent"
        }
      ],
      r: {
        reduction_name: "경차 할인",
        hour: "0",
        value: "50",
        unit: "percent",
        keymap: "F01",
        contents: "",
        time: 0,
        update_time: 0,
        delete_time: 0
      },
      m: {
        reduction_name: "경차 할인",
        hour: "0",
        value: "50",
        unit: "percent",
        keymap: "F01",
        contents: "",
        time: 0,
        update_time: 0,
        delete_time: 0
      },
      reduction_product_list: [],
      print_reduction_product_list: []
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "reductionProductM") this.titles = add.title
        })
      })
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.m.reduction_name = c.reduction_name
      this.m.hour = c.hour
      this.m.value = c.value
      this.m.unit = c.unit
      this.m.keymap = c.keymap
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
      obj.reduction_name = this.r.reduction_name
      obj.hour = this.r.hour
      obj.value = this.r.value
      obj.unit = this.r.unit
      obj.keymap = this.r.keymap
      obj.contents = this.r.contents
      obj.update_time = this.r.update_time
      obj.delete_time = this.r.delete_time
      obj.time = Date.now()
      obj.kind = "create_reduction_product_list"
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    modifyVehicle() {
      console.log("할인감면 상품 수정")
      this.modifyClose()
      let obj = {}
      obj.reduction_name = this.m.reduction_name
      obj.hour = this.m.hour
      obj.value = this.m.value
      obj.unit = this.m.unit
      obj.keymap = this.m.keymap
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.delete_time = this.m.delete_time
      obj.update_time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "update_reduction_product_list"
      console.log("할인감면 상품 수정 후 :", obj)
      this.sendMessage(obj)
    },
    deleteVehicle() {
      console.log("주차장 정보 삭제")
      this.modifyClose()
      let obj = {}
      obj.reduction_name = this.m.reduction_name
      obj.hour = this.m.hour
      obj.value = this.m.value
      obj.unit = this.m.unit
      obj.keymap = this.m.keymap
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.update_time = this.m.update_timee
      obj.time = this.m.time
      obj.delete_time = Date.now()
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.kind = "delete_reduction_product_list"
      this.sendMessage(obj)
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    search() {
      let obj = {}
      obj.kind = "get_reduction_product_list"
      obj.admin_id = window.localStorage.getItem("admin_id")
      obj.admin_pw = window.localStorage.getItem("admin_pw")
      this.sendMessage(obj)
    },
    reduction_product_list_fun(data) {
      this.reduction_product_list = []
      if (data.docs && data.docs.length > 0) {
        for (let i = 0; i < data.docs.length; i++) {
          console.log("fun data.docs : ", data.docs)
          let obj = {}
          obj.reduction_name = data.docs[i].reduction_name
          obj.hour = data.docs[i].hour
          obj.value = data.docs[i].value
          obj.unit = data.docs[i].unit
          obj.keymap = data.docs[i].keymap
          obj.contents = data.docs[i].contents
          obj.time = data.docs[i].time
          obj.update_time = data.docs[i].update_timee
          obj.time = data.docs[i].time
          obj.delete_time = data.docs[i].update_timee
          this.reduction_product_list.push(obj)
        }
        let temp = {}
        this.reduction_product_list.push(temp)
        this.reduction_product_list.pop()
        this.print_reduction_product_list = []
        for (let i = 0; i < this.reduction_product_list.length; i++) {
          let print = {}
          print.할인감면명 = this.reduction_product_list[i].reduction_name
          print.할인감면시간 = this.reduction_product_list[i].hour
          print.할인시간 = this.reduction_product_list[i].value
          print.할인단위 = this.reduction_product_list[i].unit
          print.키맵 = this.reduction_product_list[i].keymap
          print.비고 = this.reduction_product_list[i].contents
          print.등록일시 = this.reduction_product_list[i].time
          print.수정일시 = this.reduction_product_list[i].update_timee
          print.삭제일시 = this.reduction_product_list[i].update_timee
          this.print_reduction_product_list.push(print)
        }
      }
    },

    start() {
      // this.manager_list = config.manager_list
      this.search()
    },
    download() {
      let dt = new Date()
      let year = itoStr(dt.getFullYear())
      let month = itoStr(dt.getMonth() + 1)
      let day = itoStr(dt.getDate())
      let hour = itoStr(dt.getHours())
      let mins = itoStr(dt.getMinutes())
      let postfix = year + "_" + month + "_" + day + "_" + hour + "_" + mins
      const data = XLSX.utils.json_to_sheet(this.print_reduction_product_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(
        wb,
        config.parking_name + "_할인감면 상품 관리_" + postfix + ".xlsx"
      )
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_reduction_product_list") {
        this.reduction_product_list_fun(data)
      } else if (
        data.kind === "create_reduction_product_list" ||
        data.kind === "update_reduction_product_list" ||
        data.kind === "delete_reduction_product_list"
      ) {
        this.search()
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
