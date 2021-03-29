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
              <dt>그룹명</dt>
              <dd><input type="text" required v-model="r.groupName" /></dd>
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
            <p>그룹명<span>(필수)</span></p>
            <input type="text" required v-model="m.groupName" />
            <p>비고</p>
            <input type="text" v-model="m.contents" />
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
      <span class="small_title">그룹명</span>
      <input
        class="search_icon"
        type="text"
        maxlength="8"
        v-model="searchGroup"
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
        <li>번호</li>
        <li>그룹명</li>
        <li>등록일</li>
        <li>비고</li>
      </ul>
      <ul class="list-wrap">
        <li
          v-for="(group, index) in group_list"
          :key="index"
          @click="modifyOpen(group)"
        >
          <span> {{ index + 1 }}</span>
          <span><input type="text" v-model="group.groupName" readonly/></span>
          <span><input type="text" v-model="group.str_time" readonly/></span>
          <span><input type="text" v-model="group.contents"/></span>
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
      r: {
        groupName: "",
        contents: "",
        time: "",
        update_time: "",
        delete_time: ""
      },
      m: {
        groupName: "",
        contents: "",
        time: "",
        update_time: "",
        delete_time: ""
      },

      group_list: [],
      print_group_list: [],
      searchGroup: ""
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "groupListM") this.titles = add.title
        })
      })
    },
    modifyOpen(c) {
      this.modifyIs = true
      this.m.groupName = c.groupName
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
      obj.groupName = this.r.groupName
      obj.contents = this.r.contents
      obj.time = Date.now()
      obj.kind = "create_group_list"
      this.m.update_time = this.r.update_time
      this.m.delete_time = this.r.delete_time
      console.log("obj :", obj)
      this.sendMessage(obj)
    },
    group_list_fun(data) {
      this.group_list = []
      console.log("group_list_fun : ", data, data.docs.length)
      for (let i = 0; i < data.docs.length; i++) {
        let obj = {}
        obj.groupName = data.docs[i].groupName
        obj.time = data.docs[i].time
        obj.str_time = format_time1(new Date(data.docs[i].time))
        obj.update_time = data.docs[i].update_time
        obj.delete_time = data.docs[i].delete_time
        obj.contents = data.docs[i].contents
        this.group_list.push(obj)
      }

      let temp = {}
      this.group_list.push(temp)
      this.group_list.pop()
      this.print_group_list = []
      for (let i = 0; i < this.group_list.length; i++) {
        let print = {}
        let obj1 = this.group_list[i]
        print.그룹명 = obj1.groupName
        print.메모 = obj1.contents
        print.등록일시 = format_time1(new Date(obj1.time))
        print.수정일시 = format_time1(new Date(obj1.update_time))
        print.삭제일시 = format_time1(new Date(obj1.delete_time))
        print.메모 = this.group_list.contents
        this.print_group_list.push(print)
      }
    },
    modifyVehicle() {
      this.modifyClose()
      let obj = {}
      obj.groupName = this.m.groupName
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.update_time = Date.now()
      obj.delete_time = this.m.delete_time
      obj.kind = "update_group_list"

      this.sendMessage(obj)
    },
    deleteVehicle() {
      this.modifyClose()
      let obj = {}
      obj.groupName = this.m.groupName
      obj.contents = this.m.contents
      obj.time = this.m.time
      obj.delete_time = Date.now()
      obj.time = this.m.delte_time
      obj.kind = "delete_group_list"
      this.sendMessage(obj)
    },
    search() {
      var obj = {}
      obj.kind = ""
      obj.lp = this.searchLp
      obj.id = window.localStorage.getItem("admin_id")
      obj.pw = window.localStorage.getItem("admin_pw")
      obj.kind = "get_group_list"
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
      const data = XLSX.utils.json_to_sheet(this.print_group_list)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, "data")
      XLSX.writeFile(wb, config.parking_name + "_그룹관리_" + postfix + ".xlsx")
    }
  },
  created() {
    this.$socket.on("message_from_server", data => {
      if (data.kind === "get_group_list") {
        console.log("get_group_list : ", data)
        this.group_list_fun(data)
      } else if (
        data.kind === "create_group_list" ||
        data.kind === "update_group_list" ||
        data.kind === "delete_group_list"
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
