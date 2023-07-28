<template>
    <ion-page>

        <ion-content :fullscreen="true" :class="scanActive ? 'background' : ''">
            <div class="container" style="margin-bottom: 3rem;">
                <ion-row>
                    <ion-col v-for="(item, index) in services" :key="index" size="4">
                        <ion-img class="service" alt="shoping" :src="`/images/counter_service/${item.productid}.png`"
                            @click="startScan(item.productid)" v-if="!scanActive" />
                    </ion-col>
                </ion-row>
            </div>
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
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    loadingController,
    alertController,
    IonButton
} from '@ionic/vue';
import { CounterService } from "../../services/counterservices";
import { BarcodeService } from "@/model/counterservice.interface"
import { Plugins } from '@capacitor/core';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const { BarcodeScanner } = Plugins;
        const counterService = new CounterService(null);
        return { counterService, BarcodeScanner, alertController }
    },
    components: { IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonButton },
    data() {
        return {
            services: [] as BarcodeService[],
            loading: false,
            result: null,
            scanActive: false,
            productid: '',
        }
    },
    methods: {
        async startScan(id: string) {
            this.productid = id;
            const allowed = await this.checkPermission();
            console.log(this.scanActive)
            if (allowed) {
                this.scanActive = true;
                const result = await this.BarcodeScanner.startScan();
                console.log(result);
                if (result.hasContent) {
                    this.result = result.content;
                    this.$router.push({
                        path: `/detailservices/${this.productid}`,
                        query: {
                            query: result.content
                        }
                    });
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
    },
    async mounted() {
        this.loading = true;
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                this.counterService.getBarcodeServices().then((result: any) => {
                    console.log(result);
                    if (result.data.status === true) {
                        this.loading = false
                        this.services = result.data.data;
                    }
                    if (!this.loading) {
                        a.dismiss().then(() => console.log());
                    }
                })
            });
        });
    }
})
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