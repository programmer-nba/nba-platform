<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <!-- Aler data -->
            <ion-alert :is-open="isOpen" header="แจ้งเตือน !" :sub-header="sentmessage" :message="error"
                :buttons="alertButtons" @didDismiss="OpenAlert(false)"></ion-alert>

            <div style="margin-bottom: 3rem;">
                <ion-grid>
                    <ion-row>
                        <ion-col v-for="(item, index) in services" :key="index" size="12">
                            <ion-card>
                                <img alt="Silhouette of mountains" :src="getImage(item.picture)" />
                                <ion-card-header>
                                    <ion-card-title style="text-align: center;"><ion-chip
                                            :color="item.status === 'เปิดให้บริการ' ? 'success' : 'danger'">{{ item.status
                                            }}</ion-chip></ion-card-title>
                                    <ion-card-subtitle>{{ item.name }}</ion-card-subtitle>
                                </ion-card-header>
                                <ion-row>
                                    <ion-col size="6">
                                        <p style="padding-left: 5%; color: #ffc409;" >ดูเพิ่มเติม</p>
                                    </ion-col>
                                    <ion-col size="6" style="text-align: end;">
                                        <ion-button fill="clear" color="warning" @click="CheckMore(index, show === index ? 'Close': 'Open')">
                                            <ion-icon slot="icon-only" :icon="show === index ? chevronUpOutline : chevronDownOutline" style="font-size: 18px;" color="warning"></ion-icon>
                                        </ion-button>
                                    </ion-col>
                                </ion-row>
                                <div  v-for="detail in item.detail.split('\r\n')"  v-if="show === index">
                                    <p style="padding-left: 5%;">
                                        {{ detail }}
                                    </p>
                                </div>
                                <div style="padding-right: 1%;">
                                    <ion-button class="ion-button" :id="item._id">{{ item.price }} บาท</ion-button>

                                    <!-- Modal Order -->
                                    <ion-modal id="example-modal" ref="modal" :trigger="item._id">
                                        <ion-toolbar>
                                            กรอกจำนวน
                                            <ion-buttons slot="end">
                                                <ion-button @click="close()" fill="clear">ปิด</ion-button>
                                            </ion-buttons>
                                        </ion-toolbar>
                                        <ion-row>
                                            <ion-col size="12">
                                                <ion-item>
                                                    <ion-button style="width: 30%; height: 50%;" class="ion-button"
                                                        @click="SumData('minus')">-</ion-button>
                                                    <ion-input placeholder="กรอกจำนวน" v-model="confirm.quantity"
                                                        type="number" :value="confirm.quantity" readOnly></ion-input>
                                                    <ion-button style="width: 30%; height: 50%;" class="ion-button"
                                                        @click="SumData('plus')">+</ion-button>
                                                </ion-item>
                                                <ion-item>
                                                    <p>ราคารวม {{ (item.price * Number(confirm.quantity)) }} บาท</p>
                                                </ion-item>
                                            </ion-col>
                                            <ion-col size="12">
                                                <ion-button class="ion-button"
                                                    @click="Confirm(item._id)">ยืนยัน</ion-button>
                                            </ion-col>
                                        </ion-row>

                                        <!-- Modal Confirm -->
                                        <ion-modal id="example-modal" ref="modal" :isOpen="CheckConfirm">
                                            <ion-row style="text-align: center;">
                                                <ion-col size="12">
                                                    <ion-icon color="success" style="font-size: 150px;"
                                                        :icon="checkmarkCircleOutline"></ion-icon>
                                                    <h5>ทำรายการเสร็จสิ้น</h5>
                                                </ion-col>
                                                <ion-col size="12">
                                                    <ion-button @click="Success()">ยืนยัน</ion-button>
                                                </ion-col>
                                            </ion-row>
                                        </ion-modal>
                                    </ion-modal>
                                </div>
                            </ion-card>
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
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonCardContent,
    IonButton,
    IonModal,
    IonItem,
    IonIcon,
    IonLabel,
    IonList,
    IonToolbar,
    IonInput,
    modalController,
    IonAlert,
    IonButtons,
    IonText
} from '@ionic/vue';
import { getImage } from '@/services/fun'
import { UserService } from '@/services/user';
import { defineComponent, ref } from 'vue';
import { checkmarkCircleOutline, chevronDownOutline, closeOutline, chevronUpOutline } from 'ionicons/icons';

export default defineComponent({
    setup() {
        const isOpen = ref(false);
        const OpenAlert = (state: boolean) => {
            isOpen.value = state;
        };
        const alertButtons = [
            {
                text: 'OK',
                role: 'confirm',
                handler: () => { },
            },
        ];
        const userservice = new UserService(null);
        return {
            userservice, loadingController, getImage, closeOutline, checkmarkCircleOutline, modalController,
            OpenAlert, isOpen, alertButtons, IonText, chevronDownOutline, chevronUpOutline
        }
    },
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonCard, IonCardSubtitle,
        IonCardHeader, IonCardTitle, IonChip, IonCardContent, IonButton, IonModal, IonItem,
        IonIcon, IonLabel, IonList, IonToolbar, IonInput, IonAlert, IonButtons
    },
    data() {
        return {
            services: [] as any,
            loading: false,
            id: '',
            confirm: {
                id: '',
                quantity: 0,
            },
            CheckConfirm: false,
            sentmessage: '',
            error: '',
            test: '',
            show: null as any,
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
                            this.userservice.PostFacebook(this.confirm).then((result: any) => {
                                console.log(result)
                                if (result.message === 'successful') {
                                    this.loading = false;
                                    this.CheckConfirm = true;
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
                                                location.reload();
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
                    // location.reload();
                }
            },

        },
    },
    methods: {
        SumData(Check: string) {
            if (Check === 'plus') {
                this.confirm.quantity++
            } else if (Check === 'minus') {
                this.confirm.quantity--
            }
            this.confirm.quantity = Math.max(0, this.confirm.quantity)
        },
        Confirm(id: string) {
            this.confirm.id = id
            if (this.confirm.quantity === 0) {
                this.sentmessage = 'โปรดเลือกจำนวนที่ต้องการ'
                this.error = 'กรุณากรอกข้อมูลให้ครบ'
                this.isOpen = true
            } else {
                modalController.dismiss();
                this.$router.push({
                    path: `/pin`,
                    query: {
                        query: 'confirmfacebook'
                    }
                });
            }
        },
        close() {
            this.confirm.quantity = 0;
            modalController.dismiss();
        },
        Success() {
            window.location.reload();
        },
        CheckMore(Id: any, Check: string) { 
            if (Check === 'Open') {
            this.show = Id;
            } else if (Check === 'Close') {
                this.show = !Id;
            }
        }
    },
    async mounted() {
        this.loading = true;
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                this.userservice.GetFaceBookService().then((result: any) => {
                    console.log(result);
                    if (result.status === true) {
                        this.loading = false;
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
    text-align: center;
    color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.ion-button {
    width: 100%;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

ion-modal#example-modal {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
    padding: 5%;
}

ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
}

ion-modal#example-modal ion-icon {
    padding-right: 2%;
    font-size: 25px;
    color: white;
}
.btn-more{
  width: 100%;
}
</style>