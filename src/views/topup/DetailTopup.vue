<template>
    <ion-page>
        <!-- Aler data -->
        <ion-alert :is-open="isOpen" header="แจ้งเตือน !" sub-header="ข้อมูลไม่ครบถ้วน" message="กรุณากรอกข้อมูลให้ครบถ้วน"
            :buttons="alertButtons" @didDismiss="OpenAlert(false)"></ion-alert>
        <!-- Aler Wallet -->
        <ion-alert :is-open="isOpenWallet" header="แจ้งเตือน !" sub-header="เงินในประเป๋าไม่เพียงพอ" message="กรุณาตวรจสอบเงินในกระเป๋า"
            :buttons="alertButtons" @didDismiss="OpenAlertWallet(false)"></ion-alert>
        <ion-content :fullscreen="true" class="ion-padding">
            <ion-grid class="content">
                <ion-row v-for="item in topup">
                    <ion-col style="text-align: center;">
                        <ion-img :src="`/images/counter_service/${item.productid}.png`"></ion-img>
                        <ion-text style=" font-size: 30px;">{{ item.productname }}</ion-text>
                    </ion-col>
                    <ion-col size="12">
                        <h5>เลือกจำนวนเงิน (บาท)</h5>
                    </ion-col>
                    <ion-row>
                        <ion-col  size="4" v-for="(number, id) in item.price.split(',')" :key="id">
                            <ion-button  fill="outline" @click="AddPrice(number)" :value="id"> {{ number }}</ion-button>
                        </ion-col>
                    </ion-row>
                    <ion-col size="12">
                        <ion-input label="จำนวนเงินที่เติม" v-model="number_price" :value="number_price" :readonly="true">
                        </ion-input>
                    </ion-col>
                    <ion-col size="12">
                        <ion-input v-model="sent.mobile"   placeholder="กรอกเบอร์โทรศัพท์" :clear-input="true" :maxlength="10"></ion-input>
                        <ion-button class="button-confrim" expand="block" @click="Send()">เติมเงิน</ion-button>
                        <ion-modal :is-open="isOpenConfrim" id="example-modal" ref="modal">
                            <ion-toolbar class="toolbar">
                                <ion-title>ยืนยัน</ion-title>
                            </ion-toolbar>
                            <ion-row v-if="check_confirm === 'check'">
                                <div class="card-check">
                                        <p>ยืนยันการเติมเงิน <strong>{{ check.price }}</strong> บาท</p>
                                        <p>เบอร์โทรศัพท์ <strong>{{ check.mobile }}</strong></p>
                                    <ion-col>
                                        <ion-button class="btn-check" @click="Confirm()">ยืนยัน</ion-button>
                                    </ion-col>
                                    <ion-col>
                                        <ion-button  class="btn-check" fill="outline" @click="Close(false)">ยกเลิก</ion-button>
                                    </ion-col>
                                </div>
                            </ion-row>
                            <ion-row v-if="check_confirm === 'confirm'">
                                <ion-col size="12" style="text-align: center;">
                                    <div>
                                        <ion-icon :icon="checkmarkCircleOutline" color="success"></ion-icon>
                                    </div>
                                    <span style="font-size: 20px;">
                                        เติมเงินสำเร็จ!
                                    </span>
                                    <ion-item style="margin-top: 20px;" lines="full">
                                        <ion-label>
                                        <h2>ยอดเงินคงเหลือ (บาท)</h2>
                                        <p style="font-size: 19px; color: gray;">฿ {{ wellet }}</p>
                                        </ion-label>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="12"> 
                                    <ion-button @click="Close(false)">ตกลง</ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-modal>
                    </ion-col>
                </ion-row>
            </ion-grid>
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
    IonInput,
    IonButton,
    IonRadioGroup,
    IonItem,
    IonRadio,
    IonLabel,
    IonAlert,
    IonModal,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButtons
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { CounterService } from "../../services/counterservices";
import { Topup } from '../../model/topup.interface';
import { UserService } from "@/services/user";
import { checkmarkCircleOutline } from 'ionicons/icons';

export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        const counterservices = new CounterService(null);
        const alertButtons = ['OK'];
        const isOpenConfrim = ref(false);
        const isOpenWallet = ref(false);
        const isOpen = ref(false);
        const OpenAlertWallet = (state: boolean) => {
            isOpenWallet.value = state;
        };
        const OpenAlert = (state: boolean) => {
            isOpen.value = state;
        };
        return {
            counterservices,
            alertButtons,
            OpenAlert,
            isOpen,
            userservice,
            isOpenConfrim,
            isOpenWallet,
            OpenAlertWallet,
            checkmarkCircleOutline,
        }
    },
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonText, IonInput,
        IonButton, IonRadioGroup, IonItem, IonRadio, IonLabel, IonAlert, IonModal, IonToolbar,
        IonTitle,IonIcon,IonButtons
    },
    data() {
        return {
            topup: [] as Topup[],
            loading: false,
            test: null,
            sent: {
                mobile: '',
                price: this.number,
                productid: this.$route.params.id
            },
            check: {
                mobile: this.$route.query.mobile,
                price: this.$route.query.price,
                productid: this.$route.query.id
            },
            confirm: {
                mobile: '',
                price: '',
                transid: '',
            },
            wellet: '',
            check_confirm: 'check',
            number_price: '',
        }
    },
    async created() {
        console.log('wellet',this.wellet)
        console.log('price',this.number_price)
        console.log(this.$route.query.data)
        if (this.$route.query.data === 'confirmed') {
            await this.userservice.checkMobileServices(this.check).then((result: any) => {
                console.log(result)
                this.loading = false;
                if (result.message === 'successful') {
                    console.log('result', result.data);
                    this.confirm.mobile = this.check.mobile;
                    this.confirm.price = this.check.price;
                    this.confirm.transid = result.data.transid;
                    this.isOpenConfrim = true;
                } else if (result.message === 'failed') {
                    console.log('result', result.data);
                    this.isOpenWallet = true;
                }
            });
        }
        await this.$router.isReady()
    },
    watch: {
        '$route.query.data': {
            handler: function (newQuery) {
                location.reload();
            },
            deep: true
        }
    },
    methods: {
        async Send() {
            if (this.sent.mobile != '' && this.number_price != '' && this.sent.productid != '') {
                this.$router.push({
                    path: `/pin`,
                    query: {
                        id: this.sent.productid,
                        mobile: this.sent.mobile,
                        price: this.number_price,
                        query: 'confirm'
                    }
                });
            } else {
                this.isOpen = true;
            }
        },
        async Confirm() {
            await this.userservice.ConfirmMobileServices(this.confirm).then((result: any) => {
                console.log(result)
                if (result.message === 'successful') {
                    console.log('result', result.data);
                    this.wellet = result.data.data.remainding_wallet.toFixed(2);
                    this.check_confirm = 'confirm';
                } else if (result.message === 'failed') {
                    console.log('result', result.data);
                }
            }).catch((err) => {
                console.log(err);
                this.loading = false;
            })
        },
        async Close(isOpenConfrim: boolean) {
            this.isOpenConfrim = isOpenConfrim;
            this.$router.push({
                    path: `/detailtopup/${this.$route.query.id}`,
                });
        },
        AddPrice(number: string){ 
            this.number_price = number;
            console.log(this.number_price)
        }
    },
    async mounted() {
        await this.counterservices.getMobileServices().then((result: any) => {
            console.log(result);
            this.loading = false;
            if (result.status === true) {
                this.topup = result.data.filter((el: any) => el.productid == this.$route.params.id)
                console.log(this.topup)
                this.loading = true;
            }
        })
    }
})
</script>

<style scoped>
ion-img {
    --text-align: center;
    width: 70%;
    margin-left: 15%;
}

ion-modal#example-modal {
    --width: fit-content;
    --min-width: 300px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
}

ion-modal#example-modal ion-icon {
    margin-right: 6px;

    width: 120px;
    height: 120px;

    padding: 4px 0;

    color: #aaaaaa;
}

.button {
    width: 100%;
}

.button-confrim {
    margin-bottom: 15%;
}
.container{
    width: 50%;
    text-align: center;  
}
.toolbar {
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
    color: white;
}
.card-check{
    margin: auto;
}
.btn-check{
    width: 120px;
    height: 40px;
}
</style>