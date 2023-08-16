<template>
    <ion-page>
        <!-- Aler data -->
        <ion-alert :is-open="isOpenAlert" header="แจ้งเตือน !" :sub-header="sentmessage" :message=error
            :buttons="alertButtons" @didDismiss="OpenAlert(false)"></ion-alert>

        <ion-toolbar class="toolbar">
            <ion-buttons slot="start">
                <ion-button @click="$router.go(-1)">
                    <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
                    กลับ
                </ion-button>
            </ion-buttons>
            <ion-title>ถอนรายได้</ion-title>
        </ion-toolbar>

        <ion-content :fullscreen="true">
            <ion-card class="card">
                <ion-text class="text"><small>คอมมิชชั่นสะสม</small>
                    <h4> <small>฿</small> <strong>{{ allsale }}</strong></h4>
                    <small>(ยอดที่ถอนได้ : {{ (allsale - charge) }} บาท)</small><br />
                    <ion-text class="text-note"><em><small><strong>หมายเหตุ</strong> : ค่าธรรมเนียมและบริการ 10
                                บาท/รายการ</small></em></ion-text>
                </ion-text>
            </ion-card>
            <div class="input">
                <ion-input v-model="amount" placeholder="จำนวน (บาท)"> </ion-input>
                <ion-button class="btn" @click="CheckData()">ยืนยัน</ion-button>
            </div>

            <ion-modal :is-open="isOpen" id="example-modal" ref="modal">
                <div style="text-align: center;" v-if="check === 'check'">
                    <ion-icon :icon="alertCircleOutline"></ion-icon>
                    <h1><strong>ยืนยัน</strong></h1>
                    <p>ยืนยันส่งคำถอนค่าคอมมิชั่นจำนวน {{ amount }} บาท ?</p>
                    <ion-row>
                        <ion-col>
                            <ion-button fill="outline" @click="Close(false)">ยกเลิก</ion-button>
                        </ion-col>
                        <ion-col>
                            <ion-button @click="Confirm()">ยืนยัน</ion-button>
                        </ion-col>
                    </ion-row>
                </div>
                <div style="text-align: center;" v-if="check === 'ok'">
                    <ion-icon color="success" :icon="checkmarkCircleOutline"></ion-icon>
                    <h1><strong>สำเร็จ</strong></h1>
                    <p>{{ message }}</p>
                    <ion-row>
                        <ion-col>
                            <ion-button @click="OK(false)">ยืนยัน</ion-button>
                        </ion-col>
                    </ion-row>
                </div>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText,
    IonLabel, IonSegment, IonSegmentButton, IonIcon, IonInput, IonItem, IonDatetimeButton,
    IonModal, IonDatetime, IonCard, IonTabButton, IonRouterOutlet, IonTabs, IonTabBar, IonRow,
    IonButtons, IonCol, IonAlert, loadingController
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { listOutline, timerOutline, chevronBackOutline, alertCircleOutline, checkmarkCircleOutline, flash } from 'ionicons/icons';
import { UserService } from "@/services/user";

export default defineComponent({
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText, IonLabel,
        IonSegment, IonSegmentButton, IonIcon, IonInput, IonItem, IonDatetimeButton, IonModal,
        IonDatetime, IonCard, IonTabButton, IonRouterOutlet, IonTabs, IonTabBar, IonRow, IonButtons,
        IonCol, IonAlert
    },
    setup() {
        const userservice = new UserService(null);
        const isOpen = ref(false);
        const isOpenAlert = ref(false);
        const alertButtons = [
            {
                text: 'OK',
                role: 'confirm',
                handler: () => {},
            }
        ];
        const OpenAlert = (state: boolean) => {
            isOpen.value = state;
            isOpenAlert.value = state;
        };
        return {
            timerOutline, listOutline, chevronBackOutline, userservice, OpenAlert, isOpen,
            alertCircleOutline, alertButtons, isOpenAlert, checkmarkCircleOutline, loadingController
        }
    },
    data() {
        return {
            user: [],
            loading: false,
            allsale: '' as any,
            charge: 10,
            amount: '' as any,
            sentmessage: '',
            error: '',
            check: 'check',
            message: '',
        }
    },
    watch: {
        '$route.query.data': {
            handler: function (newQuery) {
                if (newQuery === 'confirmed') {
                    this.isOpen = true;
                } 
                // else {
                //     location.reload();
                // }
            },

        },
    },
    methods: {
        CheckData() {
            if (this.amount === '') {
                this.sentmessage = 'โปรดระบุจำนวน'
                this.error = 'กรุณาระบุจำนวนที่ต้องการถอน'
                this.isOpenAlert = true;
            } else if (this.amount <= '0' || this.amount > (this.allsale - this.charge)) {
                this.sentmessage = 'โปรดระบุจำนวน'
                this.error = `จำนวนที่คุณถอนได้อยู่ในช่วง 1 ถึง ${(this.allsale - this.charge)} บาท`
                this.isOpenAlert = true;
            } else {
                this.$router.push({
                    path: `/pin`,
                    query: {
                        query: 'confirmncommisionwallet'
                    }
                });
                // this.isOpen = true;
            }
        },
        async Confirm() {
            loadingController.create({
                message: 'กำลังโหลดข้อมูล....'
            }).then(a => {
                a.present().then(() => {
                    this.userservice.PostkCommissions(this.amount).then((result: any) => {
                        console.log(result)
                        if (result.message === 'successful') {
                            console.log('result', result.data);
                            this.message = result.data.message;
                            this.loading = false;
                            this.check = 'ok';
                        } else if (result.message === 'failed') {
                            this.message = result.test.message;
                            if (this.message === 'ยอดเงินในกระเป๋าของคุณไม่เพียงพอ') {
                                this.sentmessage = 'ยอดเงินในกระเป๋าของคุณไม่เพียงพอ'
                                this.error = 'กรุณตรวจสอบคอมมิชั่นของคุณ'
                                this.isOpenAlert = true;
                                this.isOpen = false;
                                this.loading = false;
                            }
                        } if (!this.loading) {
                            a.dismiss().then(() => console.log('abort presenting'));
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                });
            });
        },
        async Close(isOpen: boolean) {
            this.isOpen = isOpen;
        },
        OK(isOpen: boolean) {
            this.isOpen = isOpen;
            window.location.reload();
        }
    },
    async mounted() {
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                //get me 
                this.userservice.GetMe().then((result: any | null) => {
                    console.log(result);
                    if (result.status === true) {
                        this.user = result.data;
                        this.allsale = result.data.allsale.toFixed(2);
                        this.loading = false;
                    }
                })
                if (!this.loading) {
                    a.dismiss();
                }
            }).catch((err) => {
                console.log(err);
            })
        });
    },
});
</script>

<style scoped>
.btn {
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
    width: 100%;
}

ion-modal#example-modal {
    --width: fit-content;
    --min-width: 300px;
    --height: fit-content;
    --border-radius: 6px;
    padding: 25px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
    text-align: center;
}

ion-modal#example-modal p {
    margin-top: 0%;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

ion-modal#example-modal ion-button {
    width: 100%;
}

ion-modal#example-modal ion-icon {
    width: 120px;
    height: 120px;

    padding: 4px 0;

    color: rgb(247, 218, 126);
}

.toolbar {
    text-align: center;
    --background: rgb(255, 1, 162);
    --color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.card {
    margin: 10%;
    padding: 1%;
    border: 1px solid rgba(117, 9, 121, 1);
    border-radius: 5px;
    text-align: center;
}

.text {
    font-size: 17px;
    color: rgba(117, 9, 121, 1);
}

.text-note {
    color: #fca435;
}

.input {
    margin-left: 5%;
    margin-right: 5%;
}
</style>