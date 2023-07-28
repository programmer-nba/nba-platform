<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>QR Code Scanner</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :class="scanActive ? 'background' : ''">
      <ion-button expand="full" @click="startScan()" v-if="!scanActive">Scan</ion-button>

      <p class="ion-text-center" v-if="result && !scanActive">{{ result }}</p>

      <ion-row v-if="scanActive" class="scanner-button">
        <ion-col class="ion-no-padding">
          <ion-button expand="full" @click="stopScanner()">Stop</ion-button>
        </ion-col>
      </ion-row>
      <div v-if="scanActive" class="scan-box"></div>
    </ion-content>
    
  </ion-page>
</template>
  
<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonListHeader, IonCheckbox, IonItem, alertController, IonRow, IonCol } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Plugins } from '@capacitor/core';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonList,
    IonListHeader,
    IonCheckbox,
    IonLabel,
    IonItem,
    IonRow,
    IonCol
  },

  setup() {
    const { BarcodeScanner } = Plugins;
    return {
      BarcodeScanner,
      alertController
    };
  },
  data() {
    return {
      result: null,
      scanActive: false,
    }
  },
  // mounted() {
  //   this.BarcodeScanner.prepare();
  // },
  methods: {
    async startScan() {
      const allowed = await this.checkPermission();
      if (allowed) {
        this.scanActive = true;
        const result = await this.BarcodeScanner.startScan();
        console.log(result);
        if (result.hasContent) {
          this.result = result.content;
          this.scanActive = false;
        }
      }
    },
    async checkPermission() {
      return new Promise(async (resolve, reject) => {
        const status = await this.BarcodeScanner.checkPermission({ focus: true });
        if (status.granted) {
          resolve(true);
        } else if (status.denied || status.neverAsked) {
          const alert = await this.alertController.create({
            header: 'ไม่อนุญาติ',
            message: 'โปรดตั้งค่ากล้องขอคุณ',
            buttons: [{
              text: 'ไม่',
              role: 'cancel',
            },
            {
              text: 'เปิดการตั้งค่า',
              handler: () => {
                this.BarcodeScanner.openAppSettings();
                resolve(false);
              }
            }]
          });
          await alert.present();
        } else {
          resolve(false);
        }
      })
    },
    stopScanner() {
      this.BarcodeScanner.stopScan();
      this.scanActive = false;
    }
  }
});
</script>
  
<style scoped>
.scanner-button {
  margin: 0px;
  position: absolute;
  bottom: 15%;
  width: 100%;
  height: 10%;
  z-index: 11;
}

.scan-box {
  border: 2px solid #fff;
  box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.5);
  content: '';
  display: block;
  left: 50%;
  height: 50%;
  position: absolute;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 80%;
}

.background {
  --background: #00000000;
}
</style>