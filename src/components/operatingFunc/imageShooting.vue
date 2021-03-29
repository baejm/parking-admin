<template>
  <div class="report_wrap">
    <div class="title">
      <h2>{{ titles }}</h2>
    </div>
    <div class="main_content">
      <h2>
        <font-awesome-icon icon="camera" style="color:#26a95e" />※실시간으로
        촬영되고 있는 영상입니다.
      </h2>
      <div class="screen-control">
        <ul>
          <li
            v-for="(v, index) in vehiclePicture"
            :key="index"
            :class="{ active: v.active }"
          >
            <button @click="image_capture(v)">
              {{ v.location + "_" + v.direction + v.type }}
            </button>
          </li>
        </ul>
      </div>
      <div class="screen-img_wrap">
        <div class="screen-img">
          <img :src="image_name" alt="" @click="submitForm" />
          <!-- <img src="http://ht1.iptime.org:3000/images/2020_11_17/1605598824295.jpg" alt=""  @click="submitForm" /> -->
        </div>
        <!-- <div class="img-title">{{ imageTitle }}</div> -->
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
      vehiclePicture: [],
      image_name: "",
      imageTitle: ""
    }
  },
  computed: {
    ...mapState(["mainTitle"])
  },
  created() {
    this.$socket.on("message_from_server", data => {
      //  console.log("data.kind : ", data.kind)
      this.image_response(data)
    }),
      this.name_check()
    this.changeTitle()
  },
  methods: {
    changeTitle() {
      this.mainTitle.forEach(title => {
        title.subMenu.forEach(add => {
          if (add.add === "imageShooting") this.titles = add.title
        })
      })
    },
    submitForm() {
      const frm = document.createElement("form")
      frm.setAttribute("id", "auth-form")
      frm.setAttribute("action", this.image_name)
      frm.setAttribute("method", "get")
      frm.setAttribute("target", "auth-form")
      document.body.appendChild(frm)
      window.open(
        "about:blank",
        "auth-form",
        "width=" +
          parseInt(window.innerWidth) * 1 +
          ",height=" +
          parseInt(window.innerHeight) * 1 +
          ",toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=0,top=0"
      )
      frm.submit()
    },
    image_capture(c) {
      this.vehiclePicture.forEach(imgShow => {
        if (imgShow.active === true) {
          // this.titleImg = imgShow.spot
          imgShow.active = false
        }
      })
      c.active = true

      let obj1 = {}
      let direction = "out"
      if (c.direction === "in") {
        direction = "in"
      }
      obj1.direction = direction
      obj1.kind = "image_capture"
      obj1.camera_id = c.type
      obj1.location = c.location
      obj1.loop_event_time = Date.now()
      console.log("image_capture req obj :", obj1)
      this.sendMessage(obj1)
    },
    name_check() {
      this.vehiclePicture = []
      for (let i = 0; i < config.ip_camera_list.length; i++) {
        let obj = config.ip_camera_list[i]
        obj.type = config.ip_camera_list[i].camera_id
        this.vehiclePicture.push(obj)
      }
      // this.bar_policy_fun_all()
    },
    sendMessage(c) {
      this.$socket.emit("message_from_web_client", c)
    },
    image_response(data) {
      if (data.kind === "capture_image") {
        console.log("data : ", data)
        let direction = "out"
        if (data.direction === "in") {
          direction = "in"
        }
        this.image_name = config.image_src + data.folder_name + "/" + data.fname
        this.imageTitle = data.location + "_" + direction + data.camera_id
        console.log("this.imageTitle : ", this.imageTitle)
      }
    }
  }
}
</script>
<style scoped></style>
