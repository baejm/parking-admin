<template>
  <div class="vehicle_wrap report_wrap">
    <div class="title">
      <h2>{{ titles }}</h2>
    </div>
    <div class="present_condition_view">
      <ul>
        <li
          v-for="(c, index) in carmera_list"
          :key="index"
          :class="{ active: c.image_display, cut: c.nosignal }"
          class="carmera_lists"
        >
          <div class="strapline">
            <dl>
              <dt><input type="text" :value="c.location" /></dt>
              <dd v-if="c.nosignal === true">
                <font-awesome-icon icon="exclamation-triangle" />
              </dd>
              <dd><input type="text" :value="c.direction" /></dd>
            </dl>
          </div>
          <div class="state_body_wrp">
            <ul class="state_body">
              <li
                :class="{ active: toggle, openfix: c.openfix }"
                @click="toggles()"
              >
                <div class="img_record">
                  <img :src="c.image_name" alt="" @click="submitForm(c)" />
                  <span class="open">열림</span>
                  <span class="fixing"
                    ><font-awesome-icon icon="lock" />고정</span
                  >
                </div>
                <p>차량번호 : {{ c.lp }}</p>
              </li>
            </ul>
            <div class="bt_control_wrap">
              <div class="bar_control" v-if="c.barrier_control_display">
                <button class="button_open" @click="bar_control(c)">
                  열림
                </button>
                <button class="button_close" @click="bar_control_close(c)">
                  닫힘
                </button>
                <form>
                  <label>
                    <input type="radio" @click="bar_mode_lock(c)" name="lock" />
                    <span><font-awesome-icon icon="lock" />개방</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      @click="bar_mode_unlock(c)"
                      name="lock"
                      checked
                    /><span> <font-awesome-icon icon="lock-open" />해제</span>
                  </label>
                </form>
              </div>
              <div class="bar_control" v-else></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="record_wrap">
      <div class="menu_title">
        <div class="counting">
          <h2>출입한 차량들 목록</h2>

          <!-- <span> 주차요금 : {{ total_parking_fee | currency }}원, </span> -->
          <!-- <span> 할인금액 : {{ total_discounted_fee | currency }}원, </span> -->
          <span> 정산금액 : {{ total_paid_fee | currency }}원 </span>
          <span
            ><font-awesome-icon icon="sign-out-alt" />출차수:{{
              count_out
            }}건</span
          >
          <span
            ><font-awesome-icon icon="sign-in-alt" />입차수:{{
              count_in
            }}건</span
          >
        </div>
      </div>
      <div class="list_data">
        <table class="list_data_table">
          <thead>
            <tr class="tableTitle" colspan="11">
              <th class="number">번호</th>
              <th>차량번호</th>
              <th>차량출입시각</th>
              <th>장소</th>
              <th>방향</th>
              <th>주차요금</th>
              <th>정산금액</th>
              <th>구분</th>
              <th>메모</th>
              <th :class="{ add: Object.keys(this.dataList).length > 8 }">
                사진
              </th>
            </tr>
          </thead>
          <tbody class="scrolltBody ">
            <tr v-for="(d, index) in dataList" :key="index">
              <td colspan="11">
                <table>
                  <!-- <tr @click.prevent="open_picture(d)"> -->
                  <tr>
                    <td class="number">{{ index + 1 }}</td>
                    <td>
                      <input
                        type="text"
                        v-model="d.get_lp"
                        v-on:change="contents_change(index)"
                      />
                    </td>
                    <td>{{ d.get_time }}</td>
                    <td>{{ d.get_location }}</td>
                    <td>{{ d.get_direction }}</td>
                    <td>{{ d.get_fee }}</td>
                    <td>{{ d.get_paid_fee }}</td>
                    <td>{{ d.get_registered }}</td>
                    <td>
                      <input
                        type="text"
                        v-model="d.get_contents"
                        v-on:change="contents_change(index)"
                      />
                    </td>

                    <td>
                      <button
                        v-if="d.get_image_display"
                        @click.prevent="open_picture(d)"
                      >
                        <!-- <font-awesome-icon icon="eye" /> -->
                        <font-awesome-icon
                          icon="camera-retro"
                          style="color:#fff"
                        />
                        <!-- 보기<font-awesome-icon icon="angle-down" /> -->
                      </button>
                      <button v-else @click="close_picture(d)">
                        <font-awesome-icon
                          icon="camera-retro"
                          style="color:#26a95e"
                        />
                        <!-- 닫기<font-awesome-icon icon="angle-up" /> -->
                      </button>
                    </td>
                  </tr>

                  <tr
                    v-if="d.get_image_display === false"
                    @click="close_picture(d)"
                  >
                    <td colspan="11" class="tdImg">
                      <div>
                        <img :src="d.get_image_name" alt="" />
                        <span>
                          {{ d.get_location }}-{{ d.get_direction }}방향</span
                        >
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../config.js"
import { mapState } from "vuex"
export default {
  data: function() {
    return {
      dataList: [
        {
          get_time: "",
          get_location: "",
          get_direction: "",
          get_lp: "",
          get_fee: 0,
          get_paid_fee: 0,
          get_registered: "",
          get_contents: ""
        }
      ],
      carmera_list: [
        {
          kind_bar_status: "barrier_status",
          kind_bar_policy: "bar_ploicy",
          status: "down",
          location: "정문입구",
          direction: "in",
          lp: "123가4567",
          image_display: false,
          barrier_control_display: true,
          barrier_policy_name: "barrier_policy1",
          image_name: require("../../assets/car_test1.jpg"),
          checkedNames: "all_vehicle"
        },
        {
          kind: "barrier_status",
          status: "down",
          location: "정문출구",
          direction: "out",
          lp: "546가1517",
          image_display: false,
          barrier_control_display: true,
          barrier_policy_name: "barrier_policy2",
          image_name: require("../../assets/car_test2.jpg"),
          checkedNames: "registered_vehicle"
        }
      ],
      start_time: new Date(),
      end_time: new Date(),
      total_parking_fee: 0,
      total_discounted_fee: 0,
      total_paid_fee: 0,
      toggle: false,
      openfix: false,
      nosignal: false,
      list_items: {
        time: "현재시간",
        loop_event_time: "pc시간",
        location: "1구역",
        direction: "In",
        lp: "123가4567",
        resistered: "등록차량",
        dong_ho: "101동",
        image_display: false,
        image_name: require("../../assets/car_test4.jpg")
      },
      checked: [],
      button_value: [
        { name: "개방", checked: true },
        { name: "풀림", checked: false }
      ]
    }
  },
  filters: {
    currency: function(value) {
      var num = new Number(value)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    }
  },
  computed: {
    ...mapState(["mainTitle"]),
    count_in() {
      let count = 0
      this.dataList.forEach(cot => {
        if (cot.get_direction === "in") count++
      })
      return count
    },
    count_out() {
      let count = 0
      this.dataList.forEach(cot => {
        if (cot.get_direction === "out") count++
      })
      return count
    }
  },
  beforeRouteEnter(to, from, next) {
    config.parkingLot.type === "paid"
      ? next()
      : next({ name: "vehicleEntryExitLive1" })
  },
  created() {
    this.$socket.on("message_from_server", data => {
      this.lpr_process(data)
    }),
      this.barrier_name_check(),
      // this.barrier_policy_query(),
      //this.bar_status_query(),
      this.loginCheck(),
      this.start(),
      this.vehicle_obj_list_find()
    this.changeTitle()
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "vehicleEntryExitLive") this.titles = add.title
        })
      })
    },
    loginCheck() {
      let status = localStorage.getItem("status")
      if (status !== "ok" || status !== "OK") {
        this.$store.state.loginSuccess = false
      } else {
        this.$store.state.loginSuccess = true
      }
      console.log("status ", status)
    },
    submitForm(event) {
      const frm = document.createElement("form")
      frm.setAttribute("id", "img")
      frm.setAttribute("action", event.image_name)
      frm.setAttribute("method", "get")
      frm.setAttribute("target", "img")
      document.body.appendChild(frm)
      window.open(
        "about:blank",
        "img",
        "width=" +
          parseInt(window.innerWidth) * 1 +
          ",height=" +
          parseInt(window.innerHeight) * 1 +
          ",toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=0,top=0"
      )

      frm.submit()
    },
    lpr_process(data1) {
      if (data1.kind === "barrier_status") {
        console.log("barrier_status", data1)
        for (let i = 0; i < this.carmera_list.length; i++) {
          if (data1.location == this.carmera_list[i].location) {
            if (data1.status === "down" || data1.status === "DOWN") {
              this.carmera_list[i].image_display = false
              let temp = {}
              this.carmera_list.push(temp)
              this.carmera_list.splice(this.carmera_list.length - 1, 1)
            } else {
              this.carmera_list[i].image_display = true
              let temp = {}
              this.carmera_list.push(temp)
              this.carmera_list.splice(this.carmera_list.length - 1, 1)
            }
          }
        }
      } else if (data1.kind === "bar_mode") {
        console.log("bar_mode", data1)
        for (let j = 0; j < data1.docs.length; j++) {
          let bar_mode = data1.docs[j]
          for (let i = 0; i < this.carmera_list.length; i++) {
            if (
              bar_mode.location === this.carmera_list[i].location &&
              bar_mode.direction === this.carmera_list[i].direction
            ) {
              if (bar_mode.mode === "lock") {
                this.carmera_list[i].openfix = true
                let temp = {}
                this.carmera_list.push(temp)
                this.carmera_list.splice(this.carmera_list.length - 1, 1)
              } else {
                this.carmera_list[i].openfix = false
                let temp = {}
                this.carmera_list.push(temp)
                this.carmera_list.splice(this.carmera_list.length - 1, 1)
              }
              break
            }
          }
        }
      } else if (data1.kind === "bar_status") {
        console.log("bar_status", data1)
        for (let j = 0; j < data1.docs.length; j++) {
          let bar_status = data1.docs[j]
          for (let i = 0; i < this.carmera_list.length; i++) {
            if (
              bar_status.location === this.carmera_list[i].location &&
              bar_status.direction == this.carmera_list[i].direction
            ) {
              if (data1.status === "down" || data1.status === "DOWN") {
                this.carmera_list[i].image_display = false
                let temp = {}
                this.carmera_list.push(temp)
                this.carmera_list.splice(this.carmera_list.length - 1, 1)
              } else if (data1.status === "up" || data1.status === "UP") {
                this.carmera_list[i].image_display = true
                let temp = {}
                this.carmera_list.push(temp)
                this.carmera_list.splice(this.carmera_list.length - 1, 1)
              }
              break
            }
          }
        }
      } else if (data1.kind === "socket_error") {
        //  console.log("socket error : ", data1)
        for (let i = 0; i < this.carmera_list.length; i++) {
          if (
            data1.location === this.carmera_list[i].location &&
            data1.direction === this.carmera_list[i].direction
          ) {
            this.carmera_list[i].nosignal = true
            let temp = {}
            this.carmera_list.push(temp)
            this.carmera_list.splice(this.carmera_list.length - 1, 1)
            //console.log("보낼값", this.carmera_list[0].status)
          }
        }
      } else if (data1.kind === "weekly_barrier_policy") {
        for (let i = 0; i < this.carmera_list.length; i++) {
          if (
            data1.location === this.carmera_list[i].location &&
            data1.direction === this.carmera_list[i].direction
          ) {
            if (data1.barrier_policy === "개방") {
              this.carmera_list[i].checkedNames = "all_vehicle"
              let temp = {}
              this.carmera_list.push(temp)
              this.carmera_list.splice(this.carmera_list.length - 1, 1)
            } else {
              for (let j = 0; j < config.barrier_display_list.length; j++) {
                if (
                  data1.location === config.barrier_display_list[j].location &&
                  data1.direction === config.barrier_display_list[j].direction
                ) {
                  this.carmera_list[i].checkedNames =
                    config.barrier_display_list[j].checkedNames
                  let temp = {}
                  this.carmera_list.push(temp)
                  this.carmera_list.splice(this.carmera_list.length - 1, 1)
                }
              }
            }
          }
        }
      } else if (data1.kind === "socket_normal") {
        // console.log("socket normal : ", data1)
        for (let i = 0; i < this.carmera_list.length; i++) {
          if (
            data1.location === this.carmera_list[i].location &&
            data1.direction === this.carmera_list[i].direction
          ) {
            this.carmera_list[i].nosignal = false
            let temp = {}
            this.carmera_list.push(temp)
            this.carmera_list.splice(this.carmera_list.length - 1, 1)
            //console.log("보낼값", this.carmera_list[0].status)
          }
        }
      } else if (data1.kind == "lpr") {
        console.log(data1.kind, data1)
        //var image_name = "localhost:7200/images/"+data1.folder_name+"/"+data1.filename
        let image_name =
          config.image_src + data1.folder_name + "/" + data1.filename
        // console.log("image_name : ", image_name)
        //	console.log("dataList : ", this.dataList);
        if (data1.direction === "in") {
          data1.direction1 = "in"
        } else {
          data1.direction1 = "out"
        }
        let flag = false
        for (let i = 0; i < this.dataList.length; i++) {
          //console.log(this.dataList[i].get_loop_event_time, this.dataList[i].get_lp);
          if (this.dataList[i].get_loop_event_time === data1.loop_event_time) {
            if (data1.lp != "미인식") {
              // 들어온 차량이 미인식이 아니면
              if (this.dataList[i].get_lp === "미인식") {
                this.dataList[i].get_lp = data1.lp
                this.dataList[i].get_registered = data1.registered
                this.dataList[i].get_direction = data1.direction1
                this.dataList[i].get_contents = data1.contents
                this.dataList[i].get_image_name = true
                this.dataList[i].get_image_name = image_name
                if (data1.direction === "in") {
                  this.dataList[i].get_discounted_fee = 0
                  this.dataList[i].get_paid_fee = 0
                  this.dataList[i].get_fee = 0
                } else {
                  if (!data1.discounted_fee) {
                    data1.discounted_fee = 0
                  }
                  if (!data1.fee || data1.fee === 9998 || data1.fee === 9999) {
                    data1.fee = 0
                  }
                  if (!data1.fee || data1.fee === 9998 || data1.fee === 9999) {
                    data1.paid_fee = 0
                  }
                  console.log("flag === true :", data1)
                  this.dataList[i].get_discounted_fee = parseInt(
                    data1.discounted_fee,
                    10
                  )
                  this.dataList[i].get_paid_fee = parseInt(data1.paid_fee, 10)
                  this.dataList[i].get_fee = parseInt(data1.fee, 10)
                }
                for (let i = 0; i < this.carmera_list.length; i++) {
                  //	console.log(data1.lp, this.carmera_list[i].location, data1.location);
                  if (
                    data1.location === this.carmera_list[i].location &&
                    data1.direction === this.carmera_list[i].direction
                  ) {
                    this.carmera_list[i].lp = data1.lp
                    this.carmera_list[i].image_name = image_name
                    let temp = {}
                    this.carmera_list.push(temp)
                    this.carmera_list.splice(this.carmera_list.length - 1, 1)
                    break
                  }
                }
              }
            }
            flag = true
            break
          }
        }
        if (flag == false) {
          let temp = {}
          temp.get_time = format_time(new Date(data1.loop_event_time))
          temp.get_loop_event_time = data1.loop_event_time
          temp.get_location = data1.location
          temp.get_lp = data1.lp
          temp.get_registered = data1.registered
          temp.get_direction = data1.direction1
          temp.get_contents = data1.contents
          temp.get_image_display = true
          temp.get_image_name = image_name
          if (data1.direction === "in") {
            temp.get_discounted_fee = 0
            temp.get_paid_fee = 0
            temp.get_fee = 0
          } else {
            if (!data1.discounted_fee) {
              data1.discounted_fee = 0
            }
            if (!data1.fee) {
              data1.fee = 0
            }
            if (!data1.paid_fee) {
              data1.paid_fee = 0
            }
            temp.get_discounted_fee = parseInt(data1.discounted_fee, 10)
            temp.get_paid_fee = parseInt(data1.paid_fee, 10)
            temp.get_fee = parseInt(data1.fee, 10)
            console.log("flag === false : ", data1)
          }
          this.dataList.unshift(temp)
          for (let i = 0; i < this.carmera_list.length; i++) {
            //	console.log(data1.lp, this.carmera_list[i].location, data1.location);
            if (
              data1.location === this.carmera_list[i].location &&
              data1.direction === this.carmera_list[i].direction
            ) {
              this.carmera_list[i].lp = data1.lp
              this.carmera_list[i].image_name = image_name
              let temp = {}
              this.carmera_list.push(temp)
              this.carmera_list.splice(this.carmera_list.length - 1, 1)
              break
            }
          }
        }
        let total_parking_fee = 0
        let total_discounted_fee = 0
        let total_paid_fee = 0
        for (let i = 0; i < this.dataList.length; i++) {
          total_parking_fee += parseInt(this.dataList[i].get_fee, 10)
          total_discounted_fee += parseInt(
            this.dataList[i].get_discounted_fee,
            10
          )
          total_paid_fee += parseInt(this.dataList[i].get_paid_fee, 10)
        }
        this.total_parking_fee = total_parking_fee
        this.total_discounted_fee = total_discounted_fee
        this.total_paid_fee = total_paid_fee
        //	console.log(this.carmera_list.length);
      } else if (data1.kind == "fee_calculation_result") {
        console.log(data1.kind, data1)
        //var image_name = "localhost:7200/images/"+data1.folder_name+"/"+data1.filename
        let image_name =
          config.image_src + data1.folder_name + "/" + data1.filename
        // console.log("image_name : ", image_name)
        //	console.log("dataList : ", this.dataList);
        if (data1.direction === "in") {
          data1.direction1 = "입차"
        } else {
          data1.direction1 = "출차"
        }
        let flag = false
        for (let i = 0; i < this.dataList.length; i++) {
          //console.log(this.dataList[i].get_loop_event_time, this.dataList[i].get_lp);
          if (this.dataList[i].get_loop_event_time === data1.loop_event_time) {
            this.dataList[i].get_lp = data1.lp
            this.dataList[i].get_registered = data1.registered
            this.dataList[i].get_direction = data1.direction
            this.dataList[i].get_contents = data1.contents
            this.dataList[i].get_image_name = true
            this.dataList[i].get_image_name = image_name
            if (data1.direction === "in") {
              this.dataList[i].get_discounted_fee = 0
              this.dataList[i].get_paid_fee = 0
              this.dataList[i].get_fee = 0
            } else {
              if (!data1.discounted_fee) {
                data1.discounted_fee = 0
              }
              if (!data1.fee || data1.fee === 9998 || data1.fee === 9999) {
                data1.fee = 0
              }
              if (!data1.paid_fee) {
                data1.paid_fee = 0
              }
              this.dataList[i].get_discounted_fee = parseInt(
                data1.discounted_fee,
                10
              )
              this.dataList[i].get_paid_fee = parseInt(data1.paid_fee, 10)
              this.dataList[i].get_fee = parseInt(data1.fee, 10)
            }
            flag = true
            break
          }
        }
        if (flag == false) {
          let temp = {}
          temp.get_time = format_time(new Date(data1.loop_event_time))
          temp.get_loop_event_time = data1.loop_event_time
          temp.get_location = data1.location
          temp.get_lp = data1.lp
          temp.get_registered = data1.registered
          temp.get_direction = data1.direction
          temp.get_contents = data1.contents
          temp.get_image_display = true
          temp.get_image_name = image_name
          if (data1.direction === "in") {
            temp.get_discounted_fee = 0
            temp.get_paid_fee = 0
            temp.get_fee = 0
          } else {
            if (!data1.discounted_fee) {
              data1.discounted_fee = 0
            }
            if (!data1.fee || data1.fee === 9998 || data1.fee === 9999) {
              data1.fee = 0
            }
            if (!data1.paid_fee) {
              data1.paid_fee = 0
            }
            temp.get_discounted_fee = data1.discounted_fee
            temp.get_paid_fee = data1.paid_fee
            temp.get_fee = data1.fee
          }
          this.dataList.unshift(temp)
        }
        let total_parking_fee = 0
        let total_discounted_fee = 0
        let total_paid_fee = 0
        for (let i = 0; i < this.dataList.length; i++) {
          total_parking_fee += parseInt(this.dataList[i].get_fee, 10)
          total_discounted_fee += parseInt(
            this.dataList[i].get_discounted_fee,
            10
          )
          total_paid_fee += parseInt(this.dataList[i].get_paid_fee, 10)
        }
        this.total_parking_fee = total_parking_fee
        this.total_discounted_fee = total_discounted_fee
        this.total_paid_fee = total_paid_fee
        //	console.log(this.carmera_list.length);
      } else if (data1.kind == "lpr_payment") {
        console.log(data1.kind, data1)
        //var image_name = "localhost:7200/images/"+data1.folder_name+"/"+data1.filename
        let image_name =
          config.image_src + data1.folder_name + "/" + data1.filename
        //  console.log("image_name : ", image_name)
        //	console.log("dataList : ", this.dataList);
        if (data1.direction === "in") {
          data1.direction1 = "in"
        } else {
          data1.direction1 = "out"
        }
        let flag = false
        for (let i = 0; i < this.dataList.length; i++) {
          //console.log(this.dataList[i].get_loop_event_time, this.dataList[i].get_lp);
          if (this.dataList[i].get_loop_event_time === data1.loop_event_time) {
            this.dataList[i].get_lp = data1.lp
            this.dataList[i].get_registered = data1.registered
            this.dataList[i].get_direction = data1.direction
            this.dataList[i].get_contents = data1.contents
            this.dataList[i].get_image_name = true
            this.dataList[i].get_image_name = image_name
            if (data1.direction === "in") {
              this.dataList[i].get_discounted_fee = 0
              this.dataList[i].get_paid_fee = 0
              this.dataList[i].get_fee = 0
            } else {
              if (!data1.discounted_fee) {
                data1.discounted_fee = 0
              }
              if (!data1.fee || data1.fee === 9998 || data1.fee === 9999) {
                data1.fee = 0
              }
              if (!data1.paid_fee) {
                data1.paid_fee = 0
              }
              this.dataList[i].get_discounted_fee = data1.discounted_fee
              this.dataList[i].get_paid_fee = data1.paid_fee
              this.dataList[i].get_fee = data1.fee
            }
            flag = true
            break
          }
        }
        if (flag == false) {
          let temp = {}
          temp.get_time = format_time(new Date(data1.loop_event_time))
          temp.get_loop_event_time = data1.loop_event_time
          temp.get_location = data1.location
          temp.get_lp = data1.lp
          temp.get_registered = data1.registered
          temp.get_direction = data1.direction
          temp.get_contents = data1.contents
          temp.get_image_display = true
          temp.get_image_name = image_name
          if (data1.direction === "in") {
            temp.get_discounted_fee = 0
            temp.get_paid_fee = 0
            temp.get_fee = 0
          } else {
            if (!data1.discounted_fee) {
              data1.discounted_fee = 0
            }
            if (!data1.fee || data1.fee === 9998 || data1.fee === 9999) {
              data1.fee = 0
            }
            if (!data1.paid_fee) {
              data1.paid_fee = 0
            }
            temp.get_discounted_fee = data1.discounted_fee
            temp.get_paid_fee = data1.paid_fee
            temp.get_fee = data1.fee
          }
          this.dataList.unshift(temp)
        }
        let total_parking_fee = 0
        let total_discounted_fee = 0
        let total_paid_fee = 0
        for (let i = 0; i < this.dataList.length; i++) {
          total_parking_fee += parseInt(this.dataList[i].get_fee, 10)
          total_discounted_fee += parseInt(
            this.dataList[i].get_discounted_fee,
            10
          )
          total_paid_fee += parseInt(this.dataList[i].get_paid_fee, 10)
        }
        this.total_parking_fee = total_parking_fee
        this.total_discounted_fee = total_discounted_fee
        this.total_paid_fee = total_paid_fee
        //	console.log(this.carmera_list.length);
      } else if (data1.kind === "get_vehicle_obj_list") {
        //   console.log("get_vehicle_obj_list : ", data1)
        for (let i = 0; i < data1.docs.length; i++) {
          let obj = data1.docs[i]
          let image_name =
            config.image_src + obj.folder_name + "/" + obj.filename
          //  console.log("image_name : ", image_name)
          //	console.log("dataList : ", this.dataList);
          if (obj.direction === "in") {
            obj.direction1 = "입차"
          } else {
            obj.direction1 = "출차"
          }
          let flag = false
          let total_parking_fee = 0
          let total_discounted_fee = 0
          let total_paid_fee = 0
          for (let i = 0; i < this.dataList.length; i++) {
            //console.log(this.dataList[i].get_loop_event_time, this.dataList[i].get_lp);
            if (this.dataList[i].get_loop_event_time === obj.loop_event_time) {
              if (
                obj.lp != "미인식" &&
                obj.lp.indexOf("X") < 0 &&
                obj.lp.length >= 7
              ) {
                // 들어온 차량이 미인식이 아니면
                if (
                  this.dataList[i].get_lp == "미인식" ||
                  this.dataList[i].get_lp.indexOf("X") >= 0 ||
                  this.dataList[i].get_lp.length < 7
                ) {
                  this.dataList[i].get_lp = obj.lp
                  this.dataList[i].get_registered = obj.registered
                  this.dataList[i].get_direction = obj.direction
                  this.dataList[i].get_contents = obj.contents
                  this.dataList[i].get_image_name = true
                  this.dataList[i].get_image_name = image_name
                  if (obj.direction === "in") {
                    this.dataList[i].get_discounted_fee = 0
                    this.dataList[i].get_paid_fee = 0
                    this.dataList[i].get_fee = 0
                  } else {
                    if (!obj.discounted_fee) {
                      obj.discounted_fee = 0
                    }
                    if (!data1.fee || obj.fee === 9998 || obj.fee === 9999) {
                      obj.fee = 0
                    }
                    if (!obj.paid_fee) {
                      obj.paid_fee = 0
                    }
                    this.dataList[i].get_discounted_fee = obj.discounted_fee
                    this.dataList[i].get_paid_fee = obj.paid_fee
                    this.dataList[i].get_fee = obj.fee
                    total_parking_fee += parseInt(obj.fee, 10)
                    total_discounted_fee += parseInt(obj.discounted_fee, 10)
                    total_paid_fee += parseInt(obj.paid_fee, 10)
                  }
                }
              }
              flag = true
              break
            }
          }
          if (flag == false) {
            let temp = {}
            temp.get_time = format_time(new Date(obj.loop_event_time))
            temp.get_loop_event_time = obj.loop_event_time
            temp.get_location = obj.location
            temp.get_lp = obj.lp
            temp.get_registered = obj.registered
            temp.get_direction = obj.direction
            temp.get_contents = obj.contents
            temp.get_image_display = true
            temp.get_image_name = image_name
            if (data1.direction === "in") {
              temp.get_discounted_fee = 0
              temp.get_paid_fee = 0
              temp.get_fee = 0
            } else {
              if (!obj.discounted_fee) {
                obj.discounted_fee = 0
              }
              if (!obj.fee || obj.fee === 9998 || obj.fee === 9999) {
                obj.fee = 0
              }
              if (!obj.paid_fee) {
                obj.paid_fee = 0
              }
              temp.get_discounted_fee = obj.discounted_fee
              temp.get_paid_fee = obj.paid_fee
              temp.get_fee = obj.fee
              total_parking_fee += parseInt(obj.fee, 10)
              total_discounted_fee += parseInt(obj.discounted_fee, 10)
              total_paid_fee += parseInt(obj.paid_fee, 10)
            }
            this.dataList.unshift(temp)
          }
          this.total_parking_fee += total_parking_fee
          this.total_discounted_fee += total_discounted_fee
          this.total_paid_fee += total_paid_fee
          // console.log(
          //   "total_parking_fee :",
          //   total_parking_fee,
          //   "total_discounted_fee :",
          //   total_discounted_fee,
          //   "total_paid_fee: ",
          //   total_paid_fee
          // )
          for (let i = 0; i < this.carmera_list.length; i++) {
            //	console.log(data1.lp, this.carmera_list[i].location, data1.location);
            if (
              obj.location == this.carmera_list[i].location &&
              obj.direction == this.carmera_list[i].direction
            ) {
              this.carmera_list[i].lp = obj.lp
              this.carmera_list[i].image_name = image_name
              let temp = {}
              this.carmera_list.push(temp)
              this.carmera_list.splice(this.carmera_list.length - 1, 1)
              break
            }
          }
        }
      }
    },
    contents_change(index) {
      // console.log("내용변경 :", this.dataList[index])
      var obj = {}
      // obj.kind = "update_vehicle_obj_at_vehicle_obj_list"
      obj.kind1 = "update_vehicle_obj_at_vehicle_obj_list"
      obj.lp = this.dataList[index].get_lp
      obj.loop_event_time = this.dataList[index].get_loop_event_time
      obj.contents = this.dataList[index].get_contents
      obj.number = obj.lp.replace(/[가-힝]/gi, "")
      this.sendMessage(obj)
    },
    vehicle_obj_list_find() {
      let d = new Date()
      //let d1 = d - (24*60*60*1000);
      //console.log("d : ", d, " d1 : ", d1);
      let str_start =
        d.getFullYear() +
        "-" +
        itoStr(d.getMonth() + 1) +
        "-" +
        itoStr(d.getDate()) +
        "T00:00"
      let str_end =
        d.getFullYear() +
        "-" +
        itoStr(d.getMonth() + 1) +
        "-" +
        itoStr(d.getDate()) +
        "T23:59"
      this.start_time = str_start
      this.end_time = str_end
      let obj = {}
      obj.lp = ""
      obj.loc = ""
      obj.dir = ""
      obj.start_time = get_start_time(this.start_time)
      obj.end_time = get_end_time(this.end_time)
      obj.kind = "get_vehicle_obj_list"
      obj.id = window.localStorage.getItem("id")
      console.log("lp_search() : ", obj)
      this.sendMessage(obj)
    },
    signal(c) {
      c.image_display = !c.image_display
    },
    toggles() {
      this.toggle = !this.toggle
      //  console.log(this.toggle)
    },
    open_picture(d) {
      // d.get_image_display = false
      d.get_image_display = !d.get_image_display
    },
    close_picture(d) {
      //  console.log("close_picture : ", d.get_image_display)
      //this.$nextTick(function(){
      return (d.get_image_display = true)
      //})
    },
    bar_control(c) {
      let obj = {}
      obj.kind = "control"
      obj.direction = "up"
      obj.location = c.location
      //index = c.index
      //admin_id: "admin001"
      this.sendMessage(obj)
    },
    bar_control_close(c) {
      let obj = {}
      obj.kind = ""
      obj.direction = ""
      obj.location = c.location
      //index = c.index
      //admin_id: "admin001"
      this.sendMessage(obj)
    },
    bar_mode_lock(c) {
      let obj = {}
      obj.kind = "mode"
      obj.mode = "lock"
      obj.location = c.location
      //index = c.index
      //admin_id: "admin001"
      this.sendMessage(obj)
    },
    bar_mode_unlock(c) {
      let obj = {}
      obj.kind = "mode"
      obj.mode = "unlock"
      obj.location = c.location
      //index = c.index
      //admin_id: "admin001"
      this.sendMessage(obj)
    },
    barrier_name_check() {
      this.carmera_list = []
      for (let i = 0; i < config.barrier_display_list.length; i++) {
        this.carmera_list.push(config.barrier_display_list[i])
      }
      // this.bar_policy_fun_all()
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    start() {
      //console.log("start 함수 시작 ");
      let that = this
      let flag = false
      setInterval(() => {
        let date = Date.now()
        let temp_date = format_time_date(new Date(date)).split(":")
        let temp_hh = parseInt(temp_date[0], 10)
        let temp_mm = parseInt(temp_date[1], 10)
        if (flag === false && temp_hh === 0 && temp_mm === 0) {
          that.dataList = []
          flag = true
        } else {
          flag = false
        }
        if (that.dataList.length > 100) {
          that.dataList.splice(100, that.dataList.length - 100)
        }
      }, 20 * 1000)
      this.bar_status_query()
    },
    bar_status_query() {
      var obj = {}
      obj.kind = "bar_status"
      obj.control_id = "admin001"
      console.log("bar_status_query")
      this.sendMessage(obj)
    }
  }
}
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
// function format_time_date(dat) {
//   var str = ""
//   str += num_to_str(dat.getHours())
//   str += ":" + num_to_str(dat.getMinutes())
//   str += ":" + num_to_str(dat.getSeconds())
//   return str
// }

function num_to_str($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
function format_time_date(dat) {
  var str = ""
  str += num_to_str(dat.getHours())
  str += ":" + num_to_str(dat.getMinutes())
  str += ":" + num_to_str(dat.getSeconds())
  return str
}
function itoStr($num) {
  $num < 10 ? ($num = "0" + $num) : $num
  return $num.toString()
}
function format_time(dat) {
  var str = ""
  str += dat.getFullYear()
  str += "." + num_to_str(dat.getMonth() + 1)
  str += "." + num_to_str(dat.getDate())
  str += ". " + num_to_str(dat.getHours())
  str += ":" + num_to_str(dat.getMinutes())
  str += ":" + num_to_str(dat.getSeconds())
  return str
}
</script>
<style scoped>
/* @import "../../assets/css/table.css"; */
/* @import "../../assets/css/vehicleEntryExitLive.css"; */
</style>
