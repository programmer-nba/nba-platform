<template>
    <ion-page>


        <ion-content :fullscreen="true">
            <div class="container" style="margin-bottom: 3rem;">
                <ion-grid>
                    <ion-row>
                        <ion-col v-for="(item, index) in services" :key="index" size="4" style="text-align: center;">
                            <ion-img class="service" alt="shoping" :src="`/images/icon_artwork/${item._id}.png`"
                                @click="$router.push(`/artwork/${item._id}`)" />
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
    loadingController,
    IonButton
} from '@ionic/vue';
import { UserService } from "../../services/user";
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        return { userservice }
    },
    components: { IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonButton },
    data() {
        return {
            services: [],
            loading: false,
        }
    },
    methods: {
        getImage(item) {
            return "https://drive.google.com/uc?export=view&id=" + item;
        }
    },
    async mounted() {
        this.loading = true;
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                this.userservice.GetArtWork().then((result: any | null) => {
                    console.log(result);
                    if (result.status === true) {
                        this.loading = false
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