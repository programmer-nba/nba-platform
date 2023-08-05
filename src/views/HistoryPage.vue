<template>
  <ion-page>
    <ion-header>
    <ion-toolbar>
      <ion-segment v-model="selectTabs">
        <ion-segment-button value="wallet">
          <ion-label>กระเป๋า</ion-label>
        </ion-segment-button>
        <ion-segment-button value="commisions">
          <ion-label>คอมมิชชั่น</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-toolbar>
  </ion-header>
    <ion-content>
      <div style="padding-left: 3%; padding-right: 3%;">
        <h3 v-if="selectTabs === 'wallet'">
          <WalletHistory />
        </h3>
        <h3 v-if="selectTabs === 'commisions'">
          <CommisionsHistory />
        </h3>
      </div> 
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage, IonHeader, IonToolbar,  IonContent, IonLabel, IonSegment, IonSegmentButton,
} from '@ionic/vue';
import CommisionsHistory from '@/views/historyview/Commision.vue';
import WalletHistory from '@/views/historyview/Wallet.vue';
import { defineComponent} from 'vue';
import { listOutline, timerOutline } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    CommisionsHistory,
    WalletHistory,
  },
  setup() {
 
    return {
      timerOutline,
      listOutline,

    }
  },
  data() {
    return {
      selectTabs: 'wallet',
    }
  },
});
</script>

<style scoped>
ion-toolbar {
  --background: rgb(248, 0, 157);
  --color: white;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

/* Material Design styles */
ion-segment-button.md::part(native) {
  color: #000000;
}

.segment-button-checked.md::part(native) {
  color: rgb(255, 255, 255);
}

ion-segment-button.md::part(indicator-background) {
  height: 4px;
}

</style>
