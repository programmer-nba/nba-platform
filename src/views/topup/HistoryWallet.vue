<template>
    <ion-page>
        <ion-toolbar class="toolbar">
            <ion-buttons slot="start">
                <ion-button @click="$router.go(-1)">
                    <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
                    กลับ
                </ion-button>
            </ion-buttons>
            <ion-title>ประวัติเงินเข้า-ออก</ion-title>
        </ion-toolbar>
        <ion-content :fullscreen="true">
            <ion-card class="card-wallet">
                <div style="display: flex; justify-content: center;">
                    <h5 style="color: black; font-size: 17px;">จำนวนเงินคงเหลือ</h5>
                </div>
                <div style="display: flex; justify-content: center;">
                    <ion-icon class="icon-wallet" :icon="wallet" slot="start"></ion-icon>
                    <ion-label class="number-wallet">
                        <h1><strong>{{ walletMonney }} ฿</strong></h1>
                    </ion-label>
                </div>
                <div>
                    <ion-button href="/wallet/topupwallet" class="btn-wallet"><ion-icon :icon="add"
                            style="font-size: 17px;"></ion-icon>เติมเงินเข้ากระเป๋า</ion-button>
                </div>
            </ion-card>
            <div style="padding-left: 3%; padding-right: 3%; padding-top: 3%;">
                <ion-segment v-model="selectTabs">
                    <ion-segment-button value="monney" layout="icon-start" tab="history">
                        <ion-icon :icon="timerOutline"></ion-icon>
                        ประวัติเงินเข้า-ออก
                    </ion-segment-button>
                    <ion-segment-button value="segment" layout="icon-start">
                        <ion-icon :icon="listOutline"></ion-icon>
                        <ion-label>รายการเติมเงิน</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </div>

            <div style="padding-left: 3%; padding-right: 3%;">
                <h3 v-if="selectTabs == 'monney'">
                    <History />
                </h3>
                <h3 v-if="selectTabs == 'segment'">
                    <Reprot />
                </h3>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText,
    IonLabel, IonSegment, IonSegmentButton, IonIcon, IonInput, IonItem, IonDatetimeButton,
    IonModal, IonDatetime, IonCard, IonTabButton, IonRouterOutlet, IonTabs, IonTabBar, IonRow,
    IonButtons
} from '@ionic/vue';
import { UserService } from "@/services/user";
import { defineComponent, ref } from 'vue';
import History from '@/views/history/WalletHistory.vue';
import Reprot from '@/views/withdraw/ReportWallet.vue';
import { listOutline, timerOutline, chevronBackOutline, wallet, add } from 'ionicons/icons';

export default defineComponent({
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText,
        IonLabel, IonSegment, IonSegmentButton, IonIcon, IonInput, IonItem, IonDatetimeButton,
        IonModal, IonDatetime, IonCard, IonTabButton, IonRouterOutlet, IonTabs, IonTabBar,
        IonRow, IonButtons, History, Reprot
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
            chevronBackOutline,
            wallet,
            add
        }
    },
    data() {
        return {
            selectTabs: 'monney',
            time: [],
            history: null,
            user: null,
            walletMonney: null,
        }
    },
    async mounted() {
        //get me 
        await this.userservice.GetMe().then((result: any | null) => {
            console.log(result);
            if (result.status === true) {
                this.user = result.data;
                this.walletMonney = result.data.wallet.toFixed(2);
            }
        })
    },
});
</script>
  
<style scoped>
ion-icon {
    font-size: 15px;
    padding-right: 2%;
}

.card-wallet {
    justify-content: center;
    text-align: center;
    width: 283px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
}

.toolbar {
    --background: rgb(255, 1, 162);
    --color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.icon-wallet {
    font-size: 38px !important;
    color: black;
}

.number-wallet {
    margin-top: 5px;
    margin-left: 8px;
    margin-right: 8px;
    color: black;
    font-weight: bold;
}

.btn-wallet {
    height: 30px !important;
    font-size: 13px;
    width: auto;
    --border-radius: 7px;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

/* Material Design styles */
ion-segment-button.md::part(native) {
    color: #000;
}

.segment-button-checked.md::part(native) {
    color: rgba(117, 9, 121, 1);
}

ion-segment-button.md::part(indicator-background) {
    height: 4px;
}

/* iOS styles */

.segment-button-checked.ios::part(native) {
    color: rgba(117, 9, 121, 1);
}
</style>
  