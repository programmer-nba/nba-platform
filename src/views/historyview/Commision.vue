<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="commission">
        <p style="font-size: 13px; ">คอมมิชชั่นสะสม
        <div class="commission-number"><ion-text style="font-size: 13px;">฿</ion-text> {{ allsale }} {{ time }}</div>
        <ion-button size="small" class="button-out" href="/withdrawcommission">ถอนเงินรายได้</ion-button>
        </p>
      </div>
      <div style="padding-left: 3%; padding-right: 3%; padding-top: 3%;">
        <ion-segment v-model="selectTabs">
          <ion-segment-button value="monney" layout="icon-start" tab="history">
            <ion-icon :icon="timerOutline"></ion-icon>
            ประวัติเข้า-ออก
          </ion-segment-button>
          <ion-segment-button value="segment" layout="icon-start">
            <ion-icon :icon="listOutline"></ion-icon>
            <p>รายการถอน</p>
          </ion-segment-button>
        </ion-segment>
      </div>

      <div style="padding-left: 3%; padding-right: 3%;">
        <h3 v-if="selectTabs == 'monney'">
          <MoneyHistory />
        </h3>
        <h3 v-if="selectTabs == 'segment'">
          <RequesWithraw />
        </h3>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText,
  IonLabel, IonSegment, IonSegmentButton, IonIcon, IonInput, IonItem, IonDatetimeButton,
  IonModal, IonDatetime, IonCard, IonTabButton, IonRouterOutlet, IonTabs, IonTabBar, IonRow,
  loadingController
} from '@ionic/vue';
import RequesWithraw from '../withdraw/RequestWithdraw.vue';
import MoneyHistory from '../history/MoneyHistory.vue';
import { UserService } from '@/services/user';
import { defineComponent, ref } from 'vue';
import { listOutline, timerOutline } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonText,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonInput,
    IonItem,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonCard,
    IonTabButton,
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    MoneyHistory,
    RequesWithraw,
    IonRow
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

    }
  },
  data() {
    return {
      selectTabs: 'monney',
      time: [],
      history: null,
      user: null,
      allsale: null,
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
            this.allsale = result.data.allsale.toFixed(2);
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
  color: #4b037a;
}

ion-segment-button.md::part(indicator-background) {
  height: 4px;
}

/* iOS styles */

.segment-button-checked.ios::part(native) {
  color: rgba(117, 9, 121, 1);
}
</style>
  