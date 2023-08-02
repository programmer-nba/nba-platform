<template>
    <ion-item>
        <ion-input id="date" v-model="date" type="month" @change="chooseDate()" variant="outlined" density="comfortable" />
    </ion-item>

    <ion-list v-if="date_item.length !== 0">
        <ion-item button :detail="false" v-for="item in date_item" @click="openDailog(item._id)">
            <ion-label>
                <h3>{{ item.name }}</h3>
                <p>{{ item.timestamp }}</p>
            </ion-label>
            <p slot="end" :class="(item.type === 'เข้า' ? 'text-green' : 'text-red')">
                {{ (item.type === 'เข้า' ? '+' : '-') }} {{ item.total }}</p>
        </ion-item>

        <ion-modal id="example-modal" ref="modal" :isOpen="OpenModal">
            <div class="wrapper">
                <ion-toolbar class="toolbar">
                    <h4>รายละเอียด</h4>
                    <ion-button slot="end" fill="clear"  @click="dismiss()">
                        <ion-icon :icon="close"></ion-icon>
                    </ion-button>
                </ion-toolbar>
                <div class="detail">
                    <ion-item>
                        {{ history_byid.detail }}
                    </ion-item>
                    <ion-item v-if="history_byid.type === 'เข้า'">
                        <p style="font-size: 14px;">
                            <ion-text style="font-weight: bold;">ยอดเต็มที่ได้รับ :</ion-text> {{
                                Number(history_byid.amount).toFixed(2)
                            }}<br />
                            <ion-text style="font-weight: bold;">หัก ณ ที่จ่าย :</ion-text> {{
                                Number(history_byid.vat).toFixed(2)
                            }}<br />
                            <ion-text style="font-weight: bold;">ยอดสุทธิที่ได้รับ :</ion-text> {{
                                Number(history_byid.total).toFixed(2)
                            }}
                        </p>
                    </ion-item>
                    <p displayFormat="MMMM YY"><small><em><strong>วันเวลา :</strong>{{
                        datetimeFormat(history_byid.createdAt)
                    }}</em></small></p>
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
import { datetimeFormat, dayjs } from '@/services/fun';
import { UserService } from "@/services/user";
import { Historyservice } from "@/model/history.interface";
import { defineComponent, ref } from 'vue';
import { listOutline, close, search, } from 'ionicons/icons';

export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        return {
            userservice,
            listOutline,
            close,
            datetimeFormat,
            dayjs,
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
            history: [] as Historyservice[],
            dialog: false,
            id_dialog: null,
            history_byid: {
                detail: '',
                amount: '',
                vat: '',
                total: '',
                createdAt: '',
                type: '',
            },
            OpenModal: false,
            date_item: {} as Historyservice[],
            date: dayjs(Date.now()).format('YYYY-MM'),
        }
    },
    methods: {
        chooseDate() {
            this.date_item = this.history.filter((el) => dayjs(el.createdAt).format('YYYY-MM') === dayjs(this.date).format('YYYY-MM'));
        },
        async openDailog(_id: String) {
            this.OpenModal = true;
            await this.userservice.GetByIdHistory(_id).then((result: any | null) => {
                console.log(result);
                this.history_byid = result.data;
                this.history_byid.detail = result.data.detail;
                this.history_byid.amount = result.data.amount;
                this.history_byid.vat = result.data.vat;
                this.history_byid.total = result.data.total;
                this.history_byid.createdAt = result.data.createdAt;
                this.history_byid.type = result.data.type;
            })
        },
        dismiss () {
            this.OpenModal = false;
        }
    },
    async mounted() {
        //Get History 
        await this.userservice.GetHistory().then((result: any | null) => {
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