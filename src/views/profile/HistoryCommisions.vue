<template>
  <ion-page>
    <ion-toolbar class="toolbar">
      <ion-buttons slot="start">
        <ion-button @click="$router.go(-1)">
          <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
          กลับ
        </ion-button>
      </ion-buttons>
      <ion-title>ประวัติคอมมิชั่น</ion-title>
    </ion-toolbar>
    <ion-content :fullscreen="true">
      <div style="padding-left: 3%; padding-right: 3%; padding-top: 3%;">
        <ion-segment v-model="selectTabs">
          <ion-segment-button value="monney" layout="icon-start" tab="history">
            <ion-icon :icon="timerOutline"></ion-icon>
            ประวัติเข้า-ออก
          </ion-segment-button>
          <ion-segment-button value="segment" layout="icon-start">
            <ion-icon :icon="listOutline"></ion-icon>
            <ion-label>รายการถอน</ion-label>
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
  IonDatetime, IonCard, IonTabButton, IonRouterOutlet, IonTabs, IonTabBar, IonRow, IonButtons
} from '@ionic/vue';
import RequesWithraw from '@/views/withdraw/RequestWithdraw.vue';
import MoneyHistory from '@/views/history/MoneyHistory.vue';
import { UserService } from "@/services/user";
import { defineComponent, ref } from 'vue';
import { listOutline, timerOutline, chevronBackOutline } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText,
    IonLabel, IonSegment, IonSegmentButton, IonIcon, IonInput, IonItem,
    IonDatetimeButton, IonDatetime, IonCard, IonTabButton, IonRouterOutlet,
    IonTabs, IonTabBar, MoneyHistory, RequesWithraw, IonRow, IonButtons,
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
      chevronBackOutline

    }
  },
  data() {
    return {
      selectTabs: 'monney',
      time: [],
      history: null,
      user: null,
      allsale: null,
    }
  },
})
</script>

<style scoped>
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