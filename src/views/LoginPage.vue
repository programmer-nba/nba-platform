<template>
  <ion-page>
    <ion-content :fullscreen="true" class="primary">
      <div class="login-container">
        <ion-grid>
          <ion-row class="ion-justify-content-center">
            <ion-col>
              <ion-img class="img-logo" src="/images/logo-platform.jpg" alt="platefrom logo"></ion-img>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="login" size="12">
              <ion-label>ชื่อผู้ใช้</ion-label>
              <ion-input v-model="user.tel" placeholder="เบอร์โทรศัพท์" :clear-input="true"></ion-input>
              <ion-label>รหัสผ่าน</ion-label>
              <ion-input v-model="user.password" :type="see_password" placeholder="รหัสผ่าน"
                :clear-input="true"></ion-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="col-1">
              <p>
                <small style="color: rgb(196, 196, 196)" @click="seePassword">ดูรหัสผ่าน</small>
              </p>
            </ion-col>
            <ion-col class="col-2">
              <p>
                <small style="color: rgb(196, 196, 196)" @click="seePassword">ลืมรหัสผ่าน</small>
              </p>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <p v-if="loading === true">กำลังเข้าสู่ระบบ</p>
              <ion-button class="btn-login" fill="solid" @click="Login">
                เข้าสู่ระบบ
              </ion-button>
              <!-- <p>{{ res }}</p> -->
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axios from "axios";
import { UserService } from "@/services/user";
import {
  IonIcon,
  IonText,
  IonCol,
  IonGrid,
  IonInput,
  IonRow,
  IonImg,
  IonButton,
  IonLabel,
  IonContent,
  IonPage,
} from "@ionic/vue";
import { personOutline } from "ionicons/icons";
import { warning } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonIcon,
    IonText,
    IonCol,
    IonGrid,
    IonInput,
    IonRow,
    IonImg,
    IonLabel,
    IonButton,
    IonContent,
    IonPage,
  },
  setup() {
    const userservice = new UserService(null);

    return {
      warning,
      personOutline,
      userservice,
    };
  },
  data() {
    return {
      user: {
        tel: "",
        password: "",
        ip_address: "",
      },
      see_password: "password" as "password" | "text",
      res: null,
      loading: false,
      pin: "",
    };
  },
  methods: {
    async Login() {
      this.res = null;
      this.loading = true;
      const ip = await axios.get("https://api.ipify.org/?format=json");
      this.user.ip_address = ip.data.ip;
      //login

      await this.userservice.Login(this.user).then((result: any) => {
        this.res = result;
        this.loading = false;
        if (result.message === "Login successful") {
          localStorage.setItem("token", result.data.token);
          window.location.href = "/tabs/home";
        }
      });
    },
    seePassword() {
      if (this.see_password === "password") {
        this.see_password = "text";
      } else {
        this.see_password = "password";
      }
    },
  },
});
</script>

<style scoped>
ion-content {
  --background: url("/images/background.jpg") 0 0/100% 100% no-repeat;
  --color: #fff;
  justify-content: center;
  align-items: center;
}

.login-container {
  display: flex;
  height: 75vh;
  justify-content: center;
  align-items: center;
}

ion-grid {
  align-self: center;
}

ion-col {
  color: #fff;
  text-align: center;
}

.img-logo {
  margin: auto;
  display: flex;
  justify-content: center;
  width: 50%;
}

.login {
  padding: 3rem;
  padding-bottom: 0%;
  text-align: start;
}

.col-1 {
  top: -25px;
  text-align: start;
  padding: 3rem;
  padding-top: 0%;
  padding-bottom: 0%;
}

.col-2 {
  top: -25px;
  text-align: end;
  padding: 3rem;
  padding-top: 0%;
  padding-bottom: 0%;
}

.btn-login {
  --background: linear-gradient(202deg, #662e8f 0%, #bd5ca3 100%);
  width: 137px;
  height: 58px;
  font-size: 14px;
}
</style>
