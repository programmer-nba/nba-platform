<template>
  <ion-page>
    <ion-content padding>
      <ion-alert :is-open="isOpen" header="รหัส PIN ไม่ถูกต้อง" sub-header="กรุณาลองใหม่อีกครั้ง" :buttons="alertButtons"
        @didDismiss="setOpen(false)"></ion-alert>

      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-icon :icon="chevronBackOutline"></ion-icon>
          <ion-buttons @click="$router.go(-1)">Back</ion-buttons>
        </ion-buttons>
        <ion-title>PIN</ion-title>
      </ion-toolbar>
      <div class="container">
      <div class="header">
        <p style="margin-bottom: 5%; ">ใส่หรัสผ่าน</p>
        <ion-icon :icon="pin.length > 0 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
        <ion-icon :icon="pin.length > 1 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
        <ion-icon :icon="pin.length > 2 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
        <ion-icon :icon="pin.length > 3 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
        <ion-icon :icon="pin.length > 4 ? radioButtonOnOutline : radioButtonOffOutline"></ion-icon>
      </div>

      <ion-grid class="content">
        <ion-row>
          <ion-col>
            <ion-button size="large" color="parimaty" fill="outline" @click="handleInput('1')">1</ion-button>
          </ion-col>
          <ion-col>
            <ion-button size="large" color="parimaty" fill="outline" @click="handleInput('2')">2</ion-button>
          </ion-col>
          <ion-col>
            <ion-button size="large" color="parimaty" fill="outline" @click="handleInput('3')">3</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button size="large" color="parimaty" fill="outline" @click="handleInput('4')">4</ion-button>
          </ion-col>
          <ion-col>
            <ion-button size="large" color="parimaty" fill="outline" @click="handleInput('5')">5</ion-button>
          </ion-col>
          <ion-col>
            <ion-button size="large" color="parimaty" fill="outline" @click="handleInput('6')">6</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button size="large" color="parimaty" fill="outline" @click="handleInput('7')">7</ion-button>
          </ion-col>
          <ion-col>
            <ion-button size="large" color="parimaty" fill="outline" @click="handleInput('8')">8</ion-button>
          </ion-col>
          <ion-col>
            <ion-button size="large" color="parimaty" fill="outline" @click="handleInput('9')">9</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>

          </ion-col>
          <ion-col>
            <ion-button size="large" color="parimaty" fill="outline" @click="handleInput('0')">0</ion-button>
          </ion-col>
          <ion-col>

          </ion-col>
        </ion-row>
        <div class="btn-content">
          <ion-row>
            <div style="margin-right: auto;">
              <ion-button size="large" fill="clear" @click="handleInput('clear')">Clear</ion-button>
            </div>
            <div style="margin-left: auto;">
              <ion-button size="large" fill="clear" @click="CheckOk()">OK</ion-button>
            </div>
          </ion-row>
        </div>
      </ion-grid>
    </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { chevronBackOutline, radioButtonOffOutline, radioButtonOnOutline } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCol, IonGrid, IonRow, IonInput, IonAvatar, IonSearchbar
  , IonProgressBar, IonImg, IonNav, IonButton, IonBackButton,
  IonIcon, IonButtons, IonAlert
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const alertButtons = ['OK'];
    const isOpen = ref(false);
    const setOpen = (state: boolean) => {
      isOpen.value = state;
    };
    return {
      radioButtonOffOutline,
      radioButtonOnOutline,
      chevronBackOutline,
      alertButtons,
      setOpen,
      isOpen
    }
  },
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonCol, IonGrid, IonRow,
    IonInput, IonAvatar, IonSearchbar,
    IonProgressBar, IonImg, IonNav, IonButton,
    IonBackButton, IonIcon, IonButtons, IonAlert

  },
  data() {
    return {
      pagetitle: 'ใส่หรัสผ่าน',
      pin: '',
      pass_pin: '12345',
      message: '',
      loading: false
    }
  },
  created() {
    console.log(this.$route)
  },
  methods: {
    handleInput(pin = '') {
      if (pin === 'clear') {
        this.pin = '';
        return;
      }

      if (this.pin.length === 5) {
        return
      }

      this.pin += pin;
    },
    CheckOk() {
      if (this.pin != this.pass_pin) {
        this.message = 'รหัสผ่านไม่ถูกต้อง'
        this.setOpen(true);
        this.pin = '';
      } else if (this.pin === this.pass_pin) {
        this.pin = '';
        if (this.$route.query.query === 'password') {
          this.$router.push({
            path: '/user/changpassword',
            name: 'ChangPassword',
          })
        } else if (this.$route.query.query === 'user') {
          this.$router.push({
            path: 'user',
            name: 'User',
          })
        } else if (this.$route.query.query === 'confirmtopup') {
          this.$router.push({
            path: `/detailtopup/${this.$route.query.id}`,
            query: {
              id: this.$route.query.id,
              mobile: this.$route.query.mobile,
              price: this.$route.query.price,
              data: 'confirmed'
            }
          });
        } else if (this.$route.query.query === 'confirmcardtopup') {
          this.$router.push({
            path: `/detailcardtopup/${this.$route.query.id}`,
            query: {
              id: this.$route.query.id,
              mobile: this.$route.query.mobile,
              price: this.$route.query.price,
              data: 'confirmed'
            } 
          });
        } else if (this.$route.query.query === 'checkwallet') {
          this.$router.push({
            path: `/detailwallet/${this.$route.query.id}`,
            query: {
              id: this.$route.query.id,
              mobile: this.$route.query.mobile,
              price: this.$route.query.price,
              data: 'confirmed'
            } 
          });
        }
        console.log(this.$route.query.query)
        this.loading = true;
        this.message = 'รหัสถูกต้อง'
      }
    }
  }
})
</script>

<style scoped>
ion-toolbar{
  --background: rgb(255,1,162);
  --color: white;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%)  !important; 
}
ion-button {
  width: 60%;
  --border-radius: 50%;
}
ion-col{
  margin-bottom: 10%;
}
.content {
  text-align: center;
}
.container{
  min-height:90%;
   position:relative;
}
.header {
   text-align: center; 
   font-size: large; 
   padding-bottom: 20%;
}
.btn-content {
  position:absolute;
   bottom:0;
   width:90%;
}

</style>