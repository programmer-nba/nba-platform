<template>
<ion-content padding>
  <ion-alert
    :is-open="isOpen"
    header="รหัส PIN ไม่ถูกต้อง"
    sub-header="กรุณาลองใหม่อีกครั้ง"
    :buttons="alertButtons"
    @didDismiss="setOpen(false)"
  ></ion-alert>
  
  <div style="text-align: center; font-size: large; padding-top: 5%;">
    <p style="margin-bottom: 5%;">ใส่หรัสผ่าน</p>
     <ion-icon :icon="pin.length>0 ? radioButtonOnOutline : radioButtonOffOutline " ></ion-icon>
     <ion-icon :icon="pin.length>1 ? radioButtonOnOutline : radioButtonOffOutline " ></ion-icon>
     <ion-icon :icon="pin.length>2 ? radioButtonOnOutline : radioButtonOffOutline" ></ion-icon>
     <ion-icon :icon="pin.length>3 ? radioButtonOnOutline : radioButtonOffOutline " ></ion-icon>
     <ion-icon :icon="pin.length>4 ? radioButtonOnOutline : radioButtonOffOutline " ></ion-icon>
  </div>

  <div class="button">
    <ion-grid style="text-align: center;">
      <ion-row>
        <ion-col>
          <ion-button  size="large" color="parimaty" fill="outline" @click="handleInput('1')">1</ion-button>
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
      <ion-row style="padding-top: 10%;">
        <ion-col>
          <ion-button size="large" fill="clear"  @click="handleInput('clear')">Clear</ion-button>
        </ion-col>
        <ion-col>

        </ion-col>
        <ion-col>
          <ion-button size="large" fill="clear"  @click="myFunction()">OK</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</ion-content>
</template>

<script lang="ts">
import {  chevronBackOutline, radioButtonOffOutline, radioButtonOnOutline} from 'ionicons/icons';
import { UserService } from "@/services/user";
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent ,
  IonCol, IonGrid, IonRow , IonInput, IonAvatar, IonSearchbar 
  ,IonProgressBar, IonImg,IonNav,IonButton,IonBackButton,
  IonIcon,IonButtons,modalController,IonAlert
} from '@ionic/vue';
import { defineComponent,ref } from 'vue';

export default defineComponent({
   setup() {
    const alertButtons = ['OK'];
    const isOpen = ref(false);
    const setOpen = (state: boolean) => {
        isOpen.value = state;
      };
    const closeModal = async () => {
      await modalController.dismiss();
    };
      return {
        radioButtonOffOutline, 
        radioButtonOnOutline,
        chevronBackOutline,
        closeModal,
        alertButtons,
        setOpen,
        isOpen
      }
    },
    components: { 
      IonPage, IonHeader, IonToolbar, IonTitle,
       IonContent ,IonCol, IonGrid, IonRow, 
       IonInput, IonAvatar, IonSearchbar,
       IonProgressBar,IonImg,IonNav,IonButton,
       IonBackButton,IonIcon,IonButtons,IonAlert

      },
    data(){
        return {
        change:  new UserService(null),
        pagetitle: 'ใส่หรัสผ่าน',
        pin: '',
        pass_pin:  '12345',
        message: '',
        loading:false
      }
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
        myFunction() {
          if (this.pin != this.pass_pin) {
            this.message = 'รหัสผ่านไม่ถูกต้อง'
            this.setOpen(true);
            this.pin = '';
          } else if (this.pin === this.pass_pin) {
            this.$router.push({
              path: 'user',
              name: 'User',
            })
            this.loading = true;
            this.closeModal()
            this.message = 'รหัสถูกต้อง'
          }
          console.log(this.message);
        }
      }
})
</script>

<style scoped>
  ion-button {
    width: 60%;
    --border-radius: 45%;
  }
  .button {
    margin-top: 8%;
  }
</style>