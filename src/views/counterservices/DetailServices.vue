<template>
    <ion-page>
        <!-- Alert Data -->
        <ion-alert :is-open="isOpen" header="แจ้งเตือน !" :sub-header="sentmessage" :message=error :buttons="alertButtons"
            @didDismiss="OpenAlert(false)"></ion-alert>

        <ion-alert :is-open="isOpenQRCode" header="แจ้งเตือน !" :sub-header="sentmessage" :message=error :buttons="alertButtonsQRCode"
            @didDismiss="OpenAlert(false)"></ion-alert>

        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="$router.push('/tabs/services')" v-if="checkData === 'SentData'">
                    <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
                </ion-button>
                <ion-button @click="$router.push('/tabs/services')" v-if="checkData === 'SentDataConfirme'">
                    <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
                </ion-button>
                <ion-button
                    @click="$route.query.data === 'confirmed' ? checkData = 'SentDataConfirme' : checkData = 'SentData'"
                    v-if="checkData === 'CheckData'">
                    <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title>จ่ายชำระ</ion-title>
        </ion-toolbar>
        <ion-content :fullscreen="true">
            <!-- Check QR Code -->
            <div class="container" style="margin-bottom: 3rem;" v-if="checkData === 'SentDataConfirme'">
                <ion-grid>
                    <ion-row>
                        <ion-col size="12">
                            <ion-input type="number" :value="datachecpin.mobile" placeholder="กรอกเบอร์โทร"
                                onkeypress="if(this.value.length==10) return false;"></ion-input>
                            QR Code
                            <ion-input type="text" :value="datachecpin.barcode" readonly></ion-input>
                        </ion-col>
                        <ion-col>
                            <ion-button expand="full" @click="CheckQR()">
                                ยันยืน
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <!-- Check QR Code -->
            <div class="container" style="margin-bottom: 3rem;" v-if="checkData === 'SentData'">
                <ion-grid>
                    <ion-row>
                        <ion-col size="12">
                            <ion-input type="number" v-model="datacheck.mobile" placeholder="กรอกเบอร์โทร"
                                onkeypress="if(this.value.length==10) return false;"></ion-input>
                            QR Code
                            <ion-input type="text" :value="datacheck.barcode" disabled></ion-input>
                        </ion-col>
                        <ion-col>
                            <ion-button expand="full" @click="CheckQR()">
                                ยันยืน
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <!-- Check Data -->
            <div class="container" style="margin-bottom: 3rem;" v-if="checkData === 'CheckData'">
                <ion-grid>
                    <ion-row>
                        <ion-col style="text-align: center;" size="12">
                            <ion-img class="img-item" alt="shoping" :src="`/images/counter_service/${img}.png`" />
                            <h2>{{ display[1] }}</h2>
                        </ion-col>
                        <ion-col>
                            <ion-item>
                                <h5>{{ display[0] }}</h5>
                            </ion-item>
                            <ion-item>
                                <ion-label>
                                    <h2>{{ display[2] }}</h2>
                                    <p>{{ display_value[2] }}</p>
                                </ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>
                                    <h2>{{ display[3] }}</h2>
                                    <p>{{ display_value[3] }}</p>
                                </ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>
                                    <h2>{{ display[4] }}</h2>
                                    <p>{{ display_value[4] }}</p>
                                </ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>
                                    <h2>{{ display[5] }}</h2>
                                    <p>{{ display_value[5] }}</p>
                                </ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>
                                    <h3>ค่าชำระ</h3>
                                    <h2 style="color: red;"> {{ amount }} บาท</h2>
                                </ion-label>
                            </ion-item>
                        </ion-col>
                        <ion-col size="12">
                            <ion-button expand="full" @click="CheckData()">ยืนยัน</ion-button>
                        </ion-col>
                    </ion-row>

                    <!-- Modale Confirm -->
                    <ion-modal :isOpen="OpenConfiem" id="example-modal" ref="modal">
                        <ion-toolbar>
                            <h3>ยืนยัน</h3>
                        </ion-toolbar>
                        <ion-row>
                            <ion-col size="12" style="text-align: center;">
                                <ion-icon color="warning" :icon="informationCircleOutline"></ion-icon>
                            </ion-col>
                            <ion-col size="12" style="text-align: center;">
                                <h4>คุณยืนยันในการชำระนี้ใช่หรือ ?</h4>
                            </ion-col>
                            <ion-col size="6">
                                <ion-button expand="full" @click="ConfirmData()">ยืนยัน</ion-button>
                            </ion-col>
                            <ion-col size="6">
                                <ion-button style="width: 100%;" fill="outline"
                                    @click="OpenConfiem = false">ยกเลิก</ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-modal>

                    <!-- Modale Successful -->
                    <ion-modal :isOpen="OpenSuccessful" id="example-modal" ref="modal">
                        <ion-row>
                            <ion-col size="12" style="text-align: center;">
                                <ion-icon color="success" :icon="checkmarkCircleOutline"></ion-icon>
                            </ion-col>
                            <ion-col size="12" style="text-align: center;">
                                <h4>ทำรายเสร็จสิ้น</h4>
                            </ion-col>
                            <ion-col size="12" style="padding-left: 5%;">
                                <p>{{ successful.service_name }}</p>
                                <p>ค่าชำระ <strong>{{ successful.price }}</strong> บาท</p>
                                <p>ค่าธรรมเนียมและบริการ <strong>{{ successful.charge }}</strong> บาท</p>
                                <p>รวม <strong>{{ successful.total }}</strong> บาท</p>
                                <ion-item style="margin-top: 20px;" lines="full">
                                    <ion-label>
                                        <h2>ยอดเงินคงเหลือ (บาท)</h2>
                                        <p style="font-size: 19px; color: gray;">฿ {{
                                            Number(successful.remainding_wallet).toFixed(2) }}</p>
                                    </ion-label>
                                </ion-item>
                            </ion-col>
                            <ion-col size="12">
                                <ion-button expand="full" @click="Successful()">ยืนยัน</ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-modal>
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
    IonButton,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonTitle,
    loadingController,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonList,
    IonAlert
} from '@ionic/vue';
import { CounterService } from "../../services/counterservices";
import { UserService } from "@/services/user";
import { BarcodeService } from "@/model/counterservice.interface"
import { chevronBackOutline, checkmarkCircleOutline, informationCircleOutline } from 'ionicons/icons';

import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        const counterService = new CounterService(null);
        const alertButtons = ['ตกลง'];
        const alertButtonsQRCode = [{
            text: 'ตกลง',
            handler: () => {
                window.location.href = '/tabs/services';
          },
        
        }];
        const isOpenQRCode = ref(false)
        const isOpen = ref(false);
        const OpenAlert = (state: boolean) => {
            isOpen.value = state;
            isOpenQRCode.value = state;
        };
        return {
            counterService,
            chevronBackOutline,
            userservice,
            alertButtons,
            OpenAlert,
            isOpen,
            informationCircleOutline,
            checkmarkCircleOutline,
            alertButtonsQRCode,
            isOpenQRCode
        }
    },
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonButton,
        IonToolbar, IonButtons, IonIcon, IonTitle, IonInput, IonItem, IonLabel,
        IonModal, IonList, IonAlert
    },
    data() {
        return {
            services: [] as BarcodeService[],
            loading: false,
            mobile: '',
            datacheck: {
                mobile: '',
                barcode: this.$route.query.query,
            },
            datachecpin: {
                mobile: this.$route.query.mobile,
                barcode: this.$route.query.barcode,
            },
            img: '',
            sentmessage: '',
            checkData: 'SentData',
            data_check: '',
            display: '',
            display_value: '',
            error: '',
            amount: '',
            verify: {
                mobile: '',
                data5: '',
            },
            confirm: {
                mobile: '',
                transid: '',
            },
            OpenConfiem: false,
            OpenSuccessful: false,
            successful: {
                service_name: '',
                price: '',
                charge: '',
                total: '',
                remainding_wallet: '',
            },
        }
    },
    async created() {
        if (this.$route.query.data === 'confirmed') {
            loadingController.create({
                message: 'กำลังโหลดข้อมูล....'
            }).then(a => {
                a.present().then(() => {
                    this.userservice.CheckQRCode(this.datachecpin).then((result: any) => {
                        console.log('data', this.$route.query.mobile)
                        console.log(result)
                        if (result.message === 'successful') {
                            this.loading = false;
                            this.checkData = 'CheckData';
                            this.img = result.data.productid
                            this.display = result.data.display;
                            this.amount = result.data.amount;
                            this.display_value = result.data.display_value;
                            this.verify.data5 = result.data.data_value[4];
                            this.verify.mobile = this.datachecpin.mobile;
                            this.userservice.VerifyQRCode(this.verify).then((result: any) => {
                                console.log(result)
                                if (result.message === 'successful') {
                                    this.confirm.mobile = this.verify.mobile;
                                    this.confirm.transid = result.data.transid;
                                    this.loading = false;
                                    this.OpenConfiem = true;
                                } else if (result.message === 'failed') {
                                    this.sentmessage = result.test.message;
                                    console.log('result', result.data);
                                }
                                if (!this.loading) {
                                    a.dismiss().then(() => console.log());
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else if (result.message === 'failed') {
                            this.isOpen = true;
                            this.sentmessage = 'QR Code ไม่ถูกต้อง'
                            this.error = 'กรุณาตรวจสอบ QR Code ของคุณ';
                            console.log('result', result.data);
                        }
                        if (!this.loading) {
                            a.dismiss().then(() => console.log());
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                },
                )
            });
        }
    },
    watch: {
        '$route.query.query': {
            handler: function (newQuery) {
                location.reload();
            },
        },
    },
    methods: {
        async CheckQR() {
            if (this.datacheck.mobile === '') {
                this.isOpen = true;
                this.sentmessage = 'กรุณากรอกเบอร์โทรศัพท์';
                this.error = 'กรุณากรอกข้อมูลให้ครบถ้วน';
            } else if (this.datacheck.mobile.length <= 9) {
                this.isOpen = true;
                this.sentmessage = 'กรอกเบอร์โทรศัพท์ให้ครับ 10 ตัว'
                this.error = 'กรุณากรอกข้อมูลให้ครบถ้วน';
            } else {
                loadingController.create({
                    message: 'กำลังโหลดข้อมูล....'
                }).then(a => {
                    a.present().then(() => {
                        this.userservice.CheckQRCode(this.datacheck).then((result: any) => {
                            console.log(result)
                            if (result.message === 'successful') {
                                this.loading = false;
                                this.checkData = 'CheckData';
                                this.img = result.data.productid
                                this.display = result.data.display;
                                this.amount = result.data.amount;
                                this.display_value = result.data.display_value;
                                this.verify.data5 = result.data.data_value[4];
                                this.verify.mobile = this.datacheck.mobile;
                            } else if (result.message === 'failed') {
                                this.isOpenQRCode = true;
                                this.sentmessage = 'QR Code ไม่ถูกต้อง'
                                this.error = 'กรุณาตรวจสอบ QR Code ของคุณ';
                                console.log('result', result.data);
                            }
                            if (!this.loading) {
                                a.dismiss().then(() => console.log());
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    },
                    )
                });
            }
        },
        async CheckData() {
            this.$router.push({
                path: `/pin`,
                query: {
                    id: this.$route.params.id,
                    barcode: this.datacheck.barcode,
                    mobile: this.datacheck.mobile,
                    query: 'confirmQRCode'
                }
            });
        },
        Successful() {
            window.location.href = '/tabs/services'
        },
        ConfirmData() {
            loadingController.create({
                message: 'กำลังโหลดข้อมูล....'
            }).then(a => {
                a.present().then(() => {
                    this.userservice.ConfirmeQRCode(this.confirm).then((result: any) => {
                        console.log(result)
                        if (result.message === 'successful') {
                            this.loading = false;
                            this.OpenConfiem = false;
                            this.OpenSuccessful = true;
                            this.successful.charge = result.data.data.charge;
                            this.successful.service_name = result.data.data.service_name;
                            this.successful.price = result.data.data.price;
                            this.successful.total = result.data.data.total;
                            this.successful.remainding_wallet = result.data.data.remainding_wallet;
                            console.log(this.successful)
                        } else if (result.message === 'failed') {
                            this.sentmessage = result.test.message;
                            console.log('result', result.data);
                        }
                        if (!this.loading) {
                            a.dismiss().then(() => console.log());
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
                )
            });
        }
    },
    async mounted() {
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                this.counterService.getBarcodeServices().then((result: any) => {
                    console.log(result);
                    if (result.data.status === true) {
                        this.loading = false
                        this.services = result.data.data.filter((el: any) => el.productid == this.$route.params.id);
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

<style>
ion-toolbar {
    --background: rgb(255, 1, 162);
    --color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
    text-align: center;
}

.img-item {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

ion-modal#example-modal {
    --width: fit-content;
    padding: 5%;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
}

ion-modal#example-modal ion-icon {
    padding: 4px 0;
    font-size: 150px;

    color: rgb(252, 255, 82);
}

ion-modal#example-modal .wrapper {
    margin-bottom: 10px;
}
</style>