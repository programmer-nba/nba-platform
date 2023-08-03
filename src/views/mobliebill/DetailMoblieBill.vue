<template>
    <ion-page>
        <!-- Aler data -->
        <ion-alert :is-open="isOpen" header="แจ้งเตือน !" :sub-header="sentmessage" :message="error" :buttons="alertButtons"
            @didDismiss="OpenAlert(false)"></ion-alert>
        <!-- Aler Wallet -->
        <ion-alert :is-open="isOpenWallet" header="แจ้งเตือน !" :sub-header="!message ? error : message"
            :message="!message ? error_message : 'กรุณาตรวจสอบเงินในกระเป๋า'" :buttons="alertButtons"
            @didDismiss="OpenAlertWallet(false)"></ion-alert>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="$router.push('/tabs/mobliebill')">
                    <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
                    กลับ
                </ion-button>
            </ion-buttons>
            <ion-title>จ่ายบิลมือถือ</ion-title>
        </ion-toolbar>
        <ion-content :fullscreen="true" class="ion-padding">
            <ion-row v-for="item in mobliebill">
                <ion-col style="text-align: center;">
                    <ion-img :src="`/images/counter_service/${item.productid}.png`"></ion-img>
                    <ion-text style=" font-size: 30px;">{{ item.productname }}</ion-text>
                </ion-col>
                <ion-col size="12">
                    <ion-input v-model="sent.mobile" type="number" placeholder="กรอกเบอร์โทรศัพท์"
                        onkeypress="if(this.value.length==10) return false;"
                        :readOnly="amount === '' ? false : true"></ion-input>
                </ion-col>
                <ion-col size="12" v-if="amount">
                    <ion-input v-model="amount" :value="amount" label="ค่าบิล" type="number" placeholder="กรอกเบอร์โทรศัพท์"
                        readOnly></ion-input>
                </ion-col>
                <ion-col size="12" v-if="amount">
                    <ion-input v-model="check.price" label="จำนวนเงินที่ต้องการจ่าย" type="number"
                        placeholder="กรอกจำนวนเงิน" :readOnly="cost.charge === null ? true : false">
                    </ion-input>
                </ion-col>
                <ion-col size="12" v-if="cost.charge">
                    <ion-item>
                        <ion-label>
                            <h3>ค่าธรรมเนียม </h3>
                            <p>{{ cost.charge }} บาท</p>
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            <h2>รวม</h2>
                            <p style="font-size: 15px;">{{ Number(cost.charge + Number(check.price)).toFixed(2) }} บาท</p>
                        </ion-label>
                    </ion-item>
                </ion-col>
                <ion-col>
                    <ion-button v-if="check_button === 'ยืนยัน'" class="button-confrim" expand="block"
                        @click="Send()">ยืนยัน</ion-button>
                    <ion-button v-if="check_button === 'เช็คยอดรวม'" class="button-confrim" expand="block"
                        @click="Confirm()">เช็คยอดรวม</ion-button>
                    <ion-button v-if="check_button === 'จ่ายบิล'" class="button-confrim" expand="block"
                        @click="PayBill()">จ่ายบิล</ion-button>


                    <ion-modal :is-open="isOpenConfrim" id="example-modal" ref="modal">
                        <ion-toolbar class="toolbar">
                            <ion-title>ยืนยัน</ion-title>
                        </ion-toolbar>
                        <ion-row>
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
    IonButtons,
    loadingController
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { CounterService } from "../../services/counterservices";
import { UserService } from "@/services/user";
import { checkmarkCircleOutline, chevronBackOutline } from 'ionicons/icons';

export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        const counterservices = new CounterService(null);
        const alertButtons = [
            {
                text: 'OK',
                role: 'confirm',
                handler: () => {},
            },
        ];
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
            chevronBackOutline,
        }
    },
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonText, IonInput,
        IonButton, IonRadioGroup, IonItem, IonRadio, IonLabel, IonAlert, IonModal, IonToolbar,
        IonTitle, IonIcon, IonButtons
    },
    data() {
        return {
            mobliebill: '' as any,
            loading: false,
            sent: {
                mobile: '',
                productid: this.$route.params.id
            },
            check: {
                mobile: '',
                price: '',
                productid: this.$route.params.id,
            },
            confirm: {
                mobile: '',
                transid: '',
            },
            check_button: 'ยืนยัน',
            wellet: '',
            check_confirm: 'check',
            number_price: '',
            amount: '',
            error: '',
            message: '',
            error_message: '',
            sentmessage: '',
            cost: {
                charge: '',
                transid: '',
            }
        }
    },
    watch: {
        '$route.query.data': {
            handler: function (newQuery) {
                if (newQuery === 'confirmed') {
                    loadingController.create({
                        message: 'โปรดรอสักรู่....'
                    }).then(a => {
                        a.present().then(() => {
                            this.userservice.ConfirmMobileBill(this.confirm).then((result: any) => {
                                console.log(result)
                                if (result.message === 'successful') {
                                    this.wellet = result.data.data.remainding_wallet.toFixed(2)
                                    this.isOpenConfrim = true;
                                    this.loading = false;
                                    console.log('result', result.data);
                                } else if (result.message === 'failed') {
                                    this.sentmessage = 'ระบบขัดข้องจากผู้ให้บริการ';
                                    this.error = 'ขออภัยในความไม่สะดวก';
                                    this.alertButtons = [
                                        {
                                            text: 'OK',
                                            role: 'confirm',
                                            handler: () => {
                                                this.isOpen = false;
                                                this.$router.push({
                                                    path: `/tabs/mobliebill`,
                                                });
                                            },
                                        }
                                    ]
                                    this.isOpen = true;
                                    this.loading = false;
                                    console.log('result', result.data);
                                }
                                if (!this.loading) {
                                    a.dismiss();
                                }
                            }).catch((err) => {
                                console.log(err);
                                this.loading = false;
                            })
                        });
                    });
                } else {
                    location.reload();
                }
            },

        },
    },
    methods: {
        async Send() {
            if (this.sent.mobile.length >= 10 && this.sent.productid != '') {
                this.loading = true;
                loadingController.create({
                    message: 'โปรดรอสักรู่....'
                }).then(a => {
                    a.present().then(() => {
                        this.userservice.CheckMobileBill(this.sent).then((result: any) => {
                            console.log(result)
                            if (result.message === 'successful') {
                                this.check_button = 'เช็คยอดรวม'
                                this.loading = false;
                                this.check.mobile = this.sent.mobile;
                                this.amount = result.data.data.amount;
                                console.log('result', result.data);
                            } else if (result.message === 'failed') {
                                this.loading = false;
                                console.log('result', result.data);
                                this.sentmessage = 'ระบบขัดข้องจากผู้ให้บริการ';
                                this.error = 'ขออภัยในความไม่สะดวก';
                                this.alertButtons = [
                                    {
                                        text: 'OK',
                                        role: 'confirm',
                                        handler: () => {
                                            this.isOpen = false;
                                            this.$router.push({
                                                path: `/tabs/mobliebill`,
                                            });
                                        },
                                    }
                                ]
                                this.isOpen = true;
                            }
                            if (!this.loading) {
                                a.dismiss();
                            }
                        }).catch((err) => {
                            console.log(err);
                            this.loading = false;
                        })
                    });
                });
            } else
                if (this.sent.mobile.length <= 9) {
                    this.sentmessage = 'กรอกเบอร์โทรศัพท์ไม่ครบ'
                    this.error = 'กรุณากรอกข้อมูลให้ครบถ้วน';
                    console.log(this.sent.mobile.length)
                    this.isOpen = true;
                }
        },
        async Confirm() {
            if (this.check.price === '') {
                this.sentmessage = 'กรอกราคาที่ต้องการจ่ายบิล'
                this.error = 'กรุณากรอกข้อมูลให้ครบถ้วน';
                this.isOpen = true;
            } else if (this.check.price > this.amount) {
                this.sentmessage = 'จ่ายเงินเกินกำหนดค่าบิล'
                this.error = 'กรุณากรอกข้อมูลให้ถูกต้อง';
                this.isOpen = true;
            } else {
                this.loading = true;
                loadingController.create({
                    message: 'โปรดรอสักรู่....'
                }).then(a => {
                    a.present().then(() => {
                        this.userservice.getMobileBill(this.check).then((result: any) => {
                            console.log(result)
                            if (result.message === 'successful') {
                                this.loading = false;
                                this.check_button = 'จ่ายบิล';
                                this.confirm.mobile = this.sent.mobile;
                                this.confirm.transid = result.data.transid;
                                this.cost.charge = result.data.charge;
                                this.cost.transid = result.data.transid;
                                console.log('result', result.data);
                            } else if (result.message === 'failed') {
                                this.loading = false;
                                this.sentmessage = 'ระบบขัดข้องจากผู้ให้บริการ';
                                this.error = 'ขออภัยในความไม่สะดวก';
                                this.alertButtons = [
                                    {
                                        text: 'OK',
                                        role: 'confirm',
                                        handler: () => {
                                            this.isOpen = false;
                                            this.$router.push({
                                                path: `/tabs/mobliebill`,
                                            });
                                        },
                                    }
                                ]
                                this.isOpen = true;
                                console.log('result', result.data);
                            }
                            if (!this.loading) {
                                a.dismiss();
                            }
                        }).catch((err) => {
                            console.log(err);
                            this.loading = false;
                        })
                    });
                });
            }
        },
        async PayBill() {
            this.$router.push({
                path: `/pin`,
                query: {
                    id: this.$route.params.id,
                    transid: this.cost.transid,
                    mobile: this.sent.mobile,
                    query: 'confirmmobilebill'
                }
            });
        },
        async Close(isOpenConfrim: boolean) {
            this.isOpenConfrim = isOpenConfrim;
            this.$router.push({
                path: `/detailmobliebill/${this.$route.params.id}`,
            });
        },
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
                        this.mobliebill = result.data.data.filter((el: any) => el.productid == this.$route.params.id);
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

.container {
    width: 50%;
    text-align: center;
}

.toolbar {
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
    color: white;
}

.card-check {
    margin: auto;
}

.btn-price {
    width: 90px;
}

.btn-check {
    width: 120px;
    height: 40px;
}
</style>