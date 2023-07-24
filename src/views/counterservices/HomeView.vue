<template>
    <ion-page>


        <ion-content :fullscreen="true">
            <div class="container" style="margin-bottom: 3rem;">
                <ion-grid>
                    <ion-row>
                        <ion-col v-for="(item, index) in services" :key="index" size="4">
                            <ion-img class="service" alt="shoping" :src="`/images/counter_service/${item.productid}.png`"
                                @click="$router.push(`/detailservices/${item.productid}`)" />
                        </ion-col>
                    </ion-row>

                </ion-grid>
            </div>
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
    loadingController
} from '@ionic/vue';
import { CounterService } from "../../services/counterservices";
import { BarcodeService } from "@/model/counterservice.interface"

import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const counterService = new CounterService(null);
        return { counterService }
    },
    components: { IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg },
    data() {
        return {
            services: [] as BarcodeService[],
            loading: false
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