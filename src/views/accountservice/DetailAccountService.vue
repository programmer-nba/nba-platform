<template>
    <ion-page>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="$router.go(-1)">
                    <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
                    กลับ
                </ion-button>
            </ion-buttons>
            <ion-title>{{ $route.query.query }}</ion-title>
        </ion-toolbar>
        <ion-content>
            <div style="margin-bottom: 3rem;">
                <ion-row>
                    <ion-col size="12" v-for="item in services">
                        <ion-card>
                            <img class="img" alt="Silhouette of mountains" :src="getImage(item.picture)" />
                            <ion-card-header>
                                <h6>{{ item.name }}</h6>
                                <ion-card-subtitle
                                    v-for="detail in item.detail.split('\r\n' || '\r\n\r\n\t\t' || '\r\'')">{{ detail
                                    }}</ion-card-subtitle>
                            </ion-card-header>
                            <ion-row>
                                <ion-col size="6">
                                    <ion-chip :color="item.status === 'เปิดให้บริการ' ? 'success' : 'danger'">{{ item.status
                                    }}</ion-chip>
                                </ion-col>
                                <ion-col size="6">
                                    <ion-button class="btn-price" v-if="item.status === 'เปิดให้บริการ'">{{ item.price }}
                                        บาท</ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { chevronBackOutline } from 'ionicons/icons';
import {
    IonPage, loadingController, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle,
    IonContent, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonChip
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { getImage } from '@/services/fun'
import { UserService } from "../../services/user";

export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        return { userservice, loadingController, chevronBackOutline, getImage }
    },
    components: {
        IonPage, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent, IonRow, IonCol,
        IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip
    },
    data() {
        return {
            services: '' as any,
            loading: false,
        }
    },
    async mounted() {
        this.loading = true;
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                this.userservice.GetByIdAccountService(this.$route.params.id as string).then((result: any | null) => {
                    console.log(result)
                    if (result.message === 'ดึงข้อมูลสำเร็จ') {
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

<style scoped>
ion-toolbar {
    --background: rgb(255, 1, 162);
    --color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.btn-price {
    width: 100%;
    --color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.img {
    height: auto;
    width: auto;
}
</style>