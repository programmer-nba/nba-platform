<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-card class="card-wallet">
        <div style="display: flex; justify-content: center;">
          <h5 style="color: black; font-size: 17px;">จำนวนเงินคงเหลือ</h5>
        </div>
        <div style="display: flex; justify-content: center;">
          <ion-icon class="icon-wallet" :icon="wallet" slot="start"></ion-icon>
          <ion-label class="number-wallet">
            <h1><strong>{{ walletmoney }}</strong></h1>
          </ion-label>
          <ion-button href="/wallet/topupwallet" class="btn-wallet"><ion-icon :icon="add"
              style="font-size: 17px;"></ion-icon></ion-button>
        </div>
      </ion-card>
      <div style="padding-left: 3%; padding-right: 3%;">
        <h3>
          <MoneyHistory />
        </h3>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">
import {
  IonButton, IonCard, IonLabel, IonIcon,
  loadingController, IonPage, IonRouterOutlet, IonContent
} from '@ionic/vue';
import MoneyHistory from '../history/MemberWalletHistory.vue';
import { UserService } from '@/services/user';
import { defineComponent, ref } from 'vue';
import { listOutline, timerOutline, wallet, add, } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonButton,
    IonLabel,
    IonIcon,
    IonCard,
    MoneyHistory,
    IonPage,
    IonRouterOutlet,
    IonContent
  },
  setup() {
    const datetime = ref();
    const time = ref("");
    const reset = () => datetime.value.$el.reset();
    const userservice = new UserService(null);
    return {
      userservice,
      timerOutline,
      listOutline,
      datetime,
      reset,
      time,
      wallet,
      add
    }
  },
  data() {
    return {
      selectTabs: 'monney',
      time: [],
      history: null,
      user: null,
      walletmoney: null,
      loading: false
    }
  },
  async mounted() {
    //get me 
    this.loading = true;
    loadingController.create({
      message: 'กำลังโหลดข้อมูล....'
    }).then(a => {
      a.present().then(() => {
        this.userservice.GetMe().then((result: any | null) => {
          console.log(result);
          if (result.status === true) {
            this.loading = false
            this.user = result.data;
            this.walletmoney = result.data.wallet.toFixed(2);
          }
          if (!this.loading) {
            a.dismiss().then(() => console.log());
          }
        })
      });
    });
  },
});
</script>
  
<style scoped>
.card-wallet {
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  text-align: center;
  width: 283px;
  border-radius: 20px;
}

.icon-wallet {
  font-size: 38px !important;
  color: black;
}

.number-wallet {
  margin-top: 5px;
  margin-left: 8px;
  margin-right: 8px;
  color: black;
  font-weight: bold;
}

.btn-wallet {
  height: 35px !important;
  width: 60px;
  --border-radius: 7px;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

ion-icon {
  font-size: 15px;
  padding-right: 2%;
}

ion-toolbar {
  --background: rgb(255, 1, 162);
  --color: white;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.commission {
  margin-top: 5%;
  margin-left: 13%;
  margin-right: 13%;
  padding: 0%;
  border: 1px solid white;
  border-radius: 5px;
  text-align: center;
}

.commission-number {
  font-size: 17px;
  font-weight: bold;
  color: white;
  padding: 2%;
}

.button-out {
  justify-content: center;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

/* Material Design styles */
ion-segment {
  background-color: rgba(255, 255, 255, 0.26);
}

ion-segment-button.md::part(native) {
  color: #ffffff;
}

.segment-button-checked.md::part(native) {
  color: rgb(0, 0, 0);
}

ion-segment-button.md::part(indicator-background) {
  height: 4px;
}

/* iOS styles */

.segment-button-checked.ios::part(native) {
  color: rgba(117, 9, 121, 1);
}
</style>
  