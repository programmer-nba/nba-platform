<template>
    <ion-item>
        <ion-input id="date" v-model="date" type="month" @change="chooseDate()">
        </ion-input>
    </ion-item>
    <ion-list v-if="date_time.length !== 0" @click="setOpen(true)">
        <ion-item button :detail="false" v-for="item  in date_time"
            @click="openDailog(item._id, item.status, item.amount, item.charge, item.image, item.timestamp, item.invoice)">
            <ion-label>
                <h2><strong>ยอด :{{ Number(item.amount).toFixed(2) }} ฿</strong> <small><em>(อ้างอิง : {{
                    item.invoice
                }})</em></small></h2>
                <ion-chip size="small" :color="(item.type === 'slip' ? 'tertiary' : 'success')"> {{
                    (item.type === 'slip' ? 'สลิปโอน' : 'คิวอาร์โค้ด') }}</ion-chip><ion-text class="text">{{
        datetimeFormat(item.timestamp) }}</ion-text>
            </ion-label>
            <ion-icon slot="end" v-if="item.status === 'สำเร็จ'" :icon="checkmarkCircle"
                style="color: #4CBB17; font-size: 25px;"></ion-icon>
            <ion-icon slot="end" v-if="item.status === 'ยกเลิก'" :icon="closeCircle"
                style="color: red; font-size: 25px;"></ion-icon>
            <ion-icon slot="end" v-if="item.status === 'รอตรวจสอบ'" :icon="informationCircle"
                style="color: #3880ff; font-size: 25px;"></ion-icon>
        </ion-item>
        <ion-modal :is-open="isOpen">
            <div>
                <ion-toolbar class="toolbar">
                    <h4>รายละเอียด</h4>
                    <ion-button slot="end" fill="clear" @click="setOpen(false)">
                        <ion-icon style="color: white;" :icon="close"></ion-icon>
                    </ion-button>
                </ion-toolbar>
                <ion-item lines="full">
                    <ion-row>
                        <ion-col size="12" style="padding-bottom: 0%;">
                            <h3><strong>อ้างอิง : {{ ref_code }}</strong></h3>
                            <p style="font-size: 14px; color: gray;">วันที่ทำรายการ {{ datetimeFormat(createdAt) }}</p>
                        </ion-col>
                        <ion-col size="11" style="padding: 0%;">
                            <ion-card>
                                <ion-text> สถานะ : </ion-text>
                                <ion-chip v-if="status === 'สำเร็จ'" color="success">{{ status }}</ion-chip>
                                <ion-chip v-if="status === 'ยกเลิก'" color="danger">{{ status }}</ion-chip>
                                <ion-chip v-if="status === 'รอตรวจสอบ'" color="tertiary">{{ status }}</ion-chip>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </ion-item>
                <div style="padding-left: 5%;">
                    <p style="color: gray;">รายละเอียด</p>
                    <p>
                        <ion-text style="font-weight: bold;">ยอดเติมเงิน :</ion-text> {{ Number(amount).toFixed(2) }}
                        บาท<br />
                        <ion-text style="font-weight: bold;">ค่าธรรมเนียม :</ion-text> {{ Number(charge).toFixed(2) }}
                        บาท<br />
                        <ion-text style="font-weight: bold; font-size: 17px;">ยอดสุทธิ : {{ Number(amount).toFixed(2) }}
                            บาท</ion-text>
                        <ion-img style="width: 50%; height: 50%; margin-top: 10%;" :src="getImage(image)" @click="viewImage"
                            v-if="image !== ''" />
                    </p>
                </div>
            </div>
        </ion-modal>

        <!-- Model ViewImage -->
        <ion-modal :is-open="isViewImgae" id="example-modal" ref="modal">
            <ion-img :src="getImage(image)"></ion-img>
            <div class="top-right">
                <ion-button fill="clear" @click="isViewImgae = false">
                    <ion-icon style="color:  white;" :icon="closeOutline"></ion-icon>
                </ion-button>
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
    IonChip
} from '@ionic/vue';
import { getImage, datetimeFormat, dayjs } from '@/services/fun'
import { UserService } from "@/services/user";
import { defineComponent, ref } from 'vue';
import { checkmarkCircle, close, closeCircle, informationCircle, closeOutline } from 'ionicons/icons';

export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        const isViewImgae = ref(false);
        const OpenAlert = (state: boolean) => {
            ;
            isViewImgae.value = state;
        };
        return {
            userservice,
            close,
            informationCircle,
            closeCircle,
            checkmarkCircle,
            isViewImgae,
            OpenAlert,
            closeOutline,
            getImage,
            datetimeFormat,
            dayjs
        }
    },
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonDatetime,
        IonDatetimeButton, IonModal, IonButton, IonInput, IonTextarea, IonCard, IonList,
        IonItem, IonLabel, IonToolbar, IonIcon, IonText, IonChip
    },
    data() {
        return {
            loading: false,
            history: [],
            amount: null,
            date_time: '',
            date: dayjs(Date.now()).format('YYYY-MM'),
            ref_code: null,
            createdAt: null,
            status: null,
            charge: null,
            image: null,
            _id: null,
            isOpen: false,
        }
    },
    methods: {
        openDailog(_id, status, amount, charge, image, timestamp, invoice) {
            this.ref_code = invoice;
            this.status = status;
            this.amount = amount;
            this.charge = charge;
            this.image = image;
            this._id = _id;
            this.createdAt = timestamp;
        },
        chooseDate() {
            this.date_time = this.history.filter((el) => dayjs(el.timestamp).format('YYYY-MM') === dayjs(this.date).format('YYYY-MM'));
        },
        setOpen(isOpen: boolean) {
            this.isOpen = isOpen;
        },
        viewImage() {
            this.isViewImgae = true;
        }
    },
    async mounted() {
        //get me 
        await this.userservice.GetReprtWallet().then((result: any | null) => {
            console.log(result);
            this.history = result.data.reverse();
            this.chooseDate();
        })
    },
})
</script>

<style scoped>
ion-img {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
}

.text-green {
    color: rgb(5, 168, 5);
}

.text-red {
    color: red;
}

.text-center {
    text-align: center;
    justify-content: center;
}

ion-card {
    border: 1px solid rgb(75, 75, 75);
    font-size: 15px;
    padding-left: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    width: 100%;
}

.top-right {
    width: 100%;
    position: absolute;
    top: -10px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(rgba(27, 27, 27, 0.85), transparent);
}

.text {
    color: grey;
    font-size: 13px;
}</style>