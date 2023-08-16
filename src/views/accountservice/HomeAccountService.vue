<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="container" style="margin-bottom: 3rem;">
                <ion-grid>
                    <ion-row>
                        <ion-col v-for="(item, index) in services" :key="index" size="4">
                            <ion-img class="service" alt="shoping" :src="getImage(item.picture)" @click="$router.push({
                                path: `/detailaccountservice/${item._id}`,
                                query: {
                                    query: item.name
                                }
                            });"></ion-img>
                            {{ item.name }}
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
import { getImage } from '@/services/fun'
import { UserService } from '@/services/user';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        return { userservice, loadingController, getImage }
    },
    components: { IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg },
    data() {
        return {
            services: [] as any,
            loading: false
        }
    },
    async mounted() {
        this.loading = true;
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                this.userservice.GetAccountService().then((result: any) => {
                    console.log(result);
                    if (result.status === true) {
                        this.loading = false;
                        this.services = result.data;
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