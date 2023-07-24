<template>
    <ion-page>


        <ion-content :fullscreen="true">
            <div class="container" style="margin-bottom: 3rem;">
                <ion-grid>
                    <ion-row>
                        <ion-col v-for="(item, index) in services" :key="index" size="6">
                            <ion-img class="service" alt="shoping"
                                :src="`https://promotions.co.th/wp-content/uploads/2019/03/06.jpg`"
                                @click="$router.push(`/nbaservices/${item._id}`)" />
                            <div style="padding:1rem; text-align: center;">

                                <ion-text>{{ item.productname }}</ion-text>
                            </div>
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
    IonText,
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
    components: { IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonText },
    data() {
        return {
            services: [] as Topup[],
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
                this.counterservices.getNBAServices().then((result: any) => {
                    console.log(result);
                    if (result.data.status === true) {
                        this.services = result.data.data;
                        this.loading = false;
                    } if (!this.loading) {
                        a.dismiss().then(() => console.log());
                    }
                })

            });
        });
    }
})
</script>