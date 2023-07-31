<template>
    <ion-page>

        <ion-content :fullscreen="true">
            <div class="container" style="margin-bottom: 3rem;">
                <ion-row v-if="loading === false">
                    <ion-col v-for="(item, index) in moobliebill" :key="index" size="4" style="text-align: center;">
                        <ion-img class="service" alt="shoping" :src="`/images/counter_service/${item.productid}.png`"
                            @click="$router.push(`/detailmobliebill/${item.productid}`)" />
                        {{ item.productname }}
                    </ion-col>

                </ion-row>
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
import { defineComponent } from 'vue';
import { CounterService } from "../../services/counterservices";
import { Topup } from '../../model/topup.interface';

export default defineComponent({
    setup() {
        const counterservices = new CounterService(null);

        return {
            counterservices
        }
    },
    components: { IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg },
    data() {
        return {
            moobliebill: [],
            display: {
                colunm: 3
            },
            loading: false
        }
    },
    async mounted() {
        this.loading = true;
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                this.counterservices.getMoblieBill().then((result: any) => {
                    console.log(result);
                    if (result.data.status === true) {
                        this.loading = false;
                        this.moobliebill = result.data.data;
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