<template>
    <ion-item>
        <ion-input id="date" v-model="date" type="month" @change="chooseDate()" variant="outlined" density="comfortable" />
    </ion-item>

    <ion-list v-if="date_item.length !== 0">
        <ion-item button v-for="item in date_item" @click="openDailog(item.detail)">
            <ion-label>
                <h3>{{ item.name }}</h3>
                <p>{{ datetimeFormat(item.timestamp) }}</p>
            </ion-label>
            <p slot="end" :class="(item.type === 'เข้า' ? 'text-green' : 'text-red')">
                {{ (item.type === 'เข้า' ? '+' : '-') }} {{ item.amount }}</p>

        </ion-item>

        <ion-modal id="example-modal" ref="modal" :isOpen="OpenModal">
            <div class="wrapper">
                <ion-toolbar class="toolbar">
                    <h4>รายละเอียด</h4>
                    <ion-button slot="end" fill="clear" @click="dismiss()">
                        <ion-icon :icon="close"></ion-icon>
                    </ion-button>
                </ion-toolbar>
                <div class="detail">
                    <ion-item>
                        <ion-label>
                            <h2>รายการ</h2>
                            <p>{{ detail.productname }}</p>
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            <h2>ราคา</h2>
                            <p>{{ detail.price }} บาท</p>
                        </ion-label>
                        <ion-label>
                            <h2>เบอร์โทรศัพท์</h2>
                            <p>{{ detail.mobile }}</p>
                        </ion-label>
                    </ion-item>
                    <p displayFormat="MMMM YY"><small><em><strong>วันเวลา :</strong>{{
                        detail.date
                    }} {{ detail.time }}</em></small></p>
                </div>
            </div>
        </ion-modal>
    </ion-list>

    <div v-else class="text-center">
        <p><em>--ไม่มีรายการแจ้งเติมเงิน--</em></p>
    </div>
</template>

<script lang="ts">
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonButton,
    IonLabel,
    IonInput,
    IonTextarea,
    IonCard,
    IonList,
    IonItem,
    IonToolbar,
    IonIcon,
    IonText,

} from '@ionic/vue';
import { HistoryWallet } from "@/model/historywallet.interface";
import { UserService } from "@/services/user";
import { defineComponent } from 'vue';
import { listOutline, close } from 'ionicons/icons';
import { datetimeFormat, dayjs } from '@/services/fun';
export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        return {
            userservice,
            listOutline,
            close,
            datetimeFormat,
            dayjs
        }
    },

    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonDatetime,
        IonDatetimeButton, IonModal, IonButton, IonInput, IonTextarea, IonCard, IonList,
        IonItem, IonLabel, IonToolbar, IonIcon, IonText
    },
    data() {
        return {
            loading: false,
            history: [] as HistoryWallet[],
            amount: null,
            dialog: false,
            id_dialog: null,
            id: null,
            detail: '' as any,
            OpenModal: false,
            date_item: '' as any,
            date: dayjs(Date.now()).format('YYYY-MM'),
        }
    },
    methods: {
        chooseDate() {
            this.date_item = this.history.filter((el) => dayjs(el.timestamp).format('YYYY-MM') === dayjs(this.date).format('YYYY-MM'));
        },
        openDailog(detail: string) {
            this.OpenModal = true;
            this.detail = detail;
            console.log('Detail', detail);
        },
        dismiss() {
            this.OpenModal = false;
        },
    },
    async mounted() {
        //Get History 
        await this.userservice.GetHistoryWallet().then((result: any | null) => {
            console.log(result);
            this.history = result.data.reverse();
            this.chooseDate();
        })
    },
})
</script>

<style>
.text-green {
    color: rgb(5, 168, 5);
}

.text-red {
    color: red;
}

.text-center {
    margin-top: 15%;
    text-align: center;
    font-size: 18px;
}

ion-modal#example-modal {
    --width: fit-content;
    --width: 85%;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
}

ion-modal#example-modal ion-icon {

    width: 25px;
    height: 48px;

    padding: 4px 0;

    color: white;
}

.toolbar {
    padding-left: 10px;
    color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.detail {
    padding: 20px;
}
</style>