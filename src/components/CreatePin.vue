<template>
  <ion-page>
    <ion-content padding>
      <!-- Toast Success -->
      <ion-toast :is-open="isOpenToast" :message="messagetoast" :duration="5000" class="custom-toast"
        :icon="checkmarkCircle" @didDismiss="setOpen(false)"></ion-toast>

        <!-- Aler data -->
      <ion-alert :is-open="isOpen" :header="message_1" :sub-header="message_2" :buttons="alertButtons"
        @didDismiss="setOpen(false)"></ion-alert>

      <ion-toolbar>
        <ion-title>สร้างรหัส PIN</ion-title>
      </ion-toolbar>
      <div class="container">
        <div class="header" v-if="check === 'new'">
          <p style="margin-bottom: 5%; ">กรุณาตั้งรหัส PIN</p>
          <ion-icon :icon="pin.length > 0 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
          <ion-icon :icon="pin.length > 1 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
          <ion-icon :icon="pin.length > 2 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
          <ion-icon :icon="pin.length > 3 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
          <ion-icon :icon="pin.length > 4 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
        </div>
        <div class="header" v-if="check === 'confirm'">
          <p style="margin-bottom: 5%; ">ยันยืนรหัสอีกครั้ง</p>
          <ion-icon :icon="pinconfirm.length > 0 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
          <ion-icon :icon="pinconfirm.length > 1 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
          <ion-icon :icon="pinconfirm.length > 2 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
          <ion-icon :icon="pinconfirm.length > 3 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
          <ion-icon :icon="pinconfirm.length > 4 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
        </div>

        <ion-grid class="content">
          <ion-row>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" color="parimaty" fill="outline"
                @click="handleInput('1')">1</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" color="parimaty" fill="outline"
                @click="ConfirmInput('1')">1</ion-button>
            </ion-col>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" color="parimaty" fill="outline"
                @click="handleInput('2')">2</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" color="parimaty" fill="outline"
                @click="ConfirmInput('2')">2</ion-button>
            </ion-col>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" color="parimaty" fill="outline"
                @click="handleInput('3')">3</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" color="parimaty" fill="outline"
                @click="ConfirmInput('3')">3</ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" color="parimaty" fill="outline"
                @click="handleInput('4')">4</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" color="parimaty" fill="outline"
                @click="ConfirmInput('4')">4</ion-button>
            </ion-col>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" color="parimaty" fill="outline"
                @click="handleInput('5')">5</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" color="parimaty" fill="outline"
                @click="ConfirmInput('5')">5</ion-button>
            </ion-col>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" color="parimaty" fill="outline"
                @click="handleInput('6')">6</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" color="parimaty" fill="outline"
                @click="ConfirmInput('6')">6</ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" color="parimaty" fill="outline"
                @click="handleInput('7')">7</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" color="parimaty" fill="outline"
                @click="ConfirmInput('7')">7</ion-button>
            </ion-col>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" color="parimaty" fill="outline"
                @click="handleInput('8')">8</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" color="parimaty" fill="outline"
                @click="ConfirmInput('8')">8</ion-button>
            </ion-col>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" color="parimaty" fill="outline"
                @click="handleInput('9')">9</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" color="parimaty" fill="outline"
                @click="ConfirmInput('9')">9</ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" fill="clear"
                @click="handleInput('clear')">Clear</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" fill="clear"
                @click="ConfirmInput('clear')">Clear</ion-button>
            </ion-col>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" color="parimaty" fill="outline"
                @click="handleInput('0')">0</ion-button>
              <ion-button v-if="check === 'confirm'" size="large" color="parimaty" fill="outline"
                @click="ConfirmInput('0')">0</ion-button>
            </ion-col>
            <ion-col>
              <ion-button v-if="check === 'new'" size="large" fill="clear" @click="handleInput('delete')"><ion-icon
                  style="font-size: 62px;" :icon="backspace"></ion-icon></ion-button>
              <ion-button v-if="check === 'confirm'" size="large" fill="clear" @click="ConfirmInput('delete')"><ion-icon
                  style="font-size: 62px;" :icon="backspace"></ion-icon></ion-button>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-button v-if="check === 'new'" class="btn-confirm" size="large"
                @click="SnePassword()">ถัดไป</ion-button>
              <ion-button v-if="check === 'confirm'" class="btn-confirm" size="large"
                @click="ConfirmPin()">ยืนยัน</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>

      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { backspace, chevronBackOutline, radioButtonOffOutline, radioButtonOnOutline, snowOutline, checkmarkCircle } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCol, IonGrid, IonRow, IonInput, IonAvatar, IonSearchbar
  , IonProgressBar, IonImg, IonNav, IonButton, IonBackButton,
  IonIcon, IonButtons, IonAlert, IonCard, IonCardTitle, IonText,
  IonRange, IonToast
} from '@ionic/vue';
import { UserService } from "@/services/user";
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const userservice = new UserService(null);
    const alertButtons = ['OK'];
    const isOpen = ref(false);
    const isOpenToast = ref(false);
    const setOpen = (state: boolean) => {
      isOpen.value = state;
      isOpenToast.value = state;
    };
    return {
      radioButtonOffOutline,
      radioButtonOnOutline,
      chevronBackOutline,
      alertButtons,
      setOpen,
      isOpen,
      backspace,
      snowOutline,
      userservice,
      isOpenToast,
      checkmarkCircle
    }
  },
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonCol, IonGrid, IonRow,
    IonInput, IonAvatar, IonSearchbar,
    IonProgressBar, IonImg, IonNav, IonButton,
    IonBackButton, IonIcon, IonButtons, IonAlert,
    IonCard, IonCardTitle, IonText, IonRange, IonToast

  },
  data() {
    return {
      pagetitle: 'ใส่หรัสผ่าน',
      pin: '',
      pinconfirm: '',
      message_1: '',
      message_2: '',
      loading: false,
      check: 'new',
      messagetoast: 'สร้างรหัสผ่าน PIN เสร็จสิ้น'
    }
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    ConfirmInput(pinconfirm = '') {
      if (pinconfirm === 'clear') {
        this.pinconfirm = '';
        return;
      } if (pinconfirm === 'delete') {
        this.pinconfirm = this.pinconfirm.substring(0, this.pinconfirm.length - 1);
        console.log(this.pinconfirm)
        return;
      }
      this.pinconfirm += pinconfirm;
    },
    handleInput(pin = '') {
      if (pin === 'clear') {
        this.pin = '';
        return;
      } if (pin === 'delete') {
        this.pin = this.pin.substring(0, this.pin.length - 1);
        console.log(this.pin)
        return;
      }
      this.pin += pin;
    },
    SnePassword() {
      if (this.pin.length < 5) {
        this.message_1 = 'รหัสผ่านยังไม่ครบ';
        this.message_2 = 'กรุณากรอกรหัสให้ครบ';
        this.isOpen = true;
        this.pin = '';
      } else {
        this.check = 'confirm'
      }
      console.log('pin', this.pin)
      console.log('confirm', this.pinconfirm)
    },
    async ConfirmPin() {
      if (this.pinconfirm != this.pin) {
        this.message_1 = 'รหัสผ่านไม่ตรงกัน';
        this.message_2 = 'กรุณากรอกรหัสให้ถูกต้อง';
        this.isOpen = true;
        this.pinconfirm = '';
      } else {
        await this.userservice.CreatePin(this.pin).then((result: any) => {
          console.log(result)
          if (result.message === 'successful') {
            console.log('result', result.data);
            this.isOpenToast = true;
            setTimeout(() => {
              window.location.href = '/tabs/home'
            }, 3000);
          } else if (result.message === 'failed') {
            console.log('result', result.data);
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }
})
</script>

<style scoped>
ion-progress-bar {
  height: 0.3rem;
  border-radius: 5px;
}

ion-range {
  padding-bottom: 0%;
  --bar-background: #eeeeee57;
  --bar-background-active: #04e617;
  --bar-height: 5px;
  --bar-border-radius: 8px;
  --knob-size: 15px;
  --pin-color: #fff;
  pointer-events: none;
}

ion-toolbar {
  --background: rgb(255, 1, 162);
  --color: white;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

ion-button {
  width: 70%;
  --border-radius: 50%;
  color: white;
}
ion-toast.custom-toast {
    --background: #25b800;
    --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
        color: white;
  }
ion-col {
  margin-bottom: 10%;
}

.content {
  text-align: center;
}

.container {
  min-height: 100%;
  position: relative;
  background-color: rgba(0, 0, 0, 0.548);
}

.header {
  text-align: center;
  font-size: large;
  padding-bottom: 20%;
}

.btn-content {
  position: absolute;
  bottom: 0;
  width: 90%;
}

.btn-confirm {
  width: 100%;
  --border-radius: 0;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}
</style>