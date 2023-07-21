<template>
    <ion-page>
        <!-- Aler data -->
        <ion-alert :is-open="isOpenAlert" header="แจ้งเตือน !" :sub-header="sentmessage" :message="error"
            :buttons="alertButtons" @didDismiss="OpenAlert(false)"></ion-alert>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="$router.go(-1)">
                    <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-row>
                <div style="height: 45px;">
                    <ion-title>{{ name }}</ion-title>
                </div>
            </ion-row>
        </ion-toolbar>
        <ion-content :fullscreen="true" class="ion-padding">
            <div class="padding">
                <ion-row v-for="item in services" :key="item">
                    <ion-col size="4">
                        <ion-img class="img-card" :src="getImage(item.product.imgUrl)"></ion-img>
                    </ion-col>
                    <ion-col>
                        <ion-item>
                            <h5>{{ item.product.category }}</h5>
                        </ion-item>
                        <!-- Text Test -->
                        <ion-item>
                            <p> It is a long established fact that a reader will be distracted by the </p>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12" v-for="(pricelist, id) in item.pricelist" :key="id">
                        <ion-item>
                            <p>{{ id + 1 }}. It is a long established fact that a reader will be distracted by the</p>
                            <ion-button class="btn" slot="end" @click="SelectProducts(pricelist._id)">{{ pricelist.price }}
                                บาท</ion-button>
                        </ion-item>
                    </ion-col>
                </ion-row>
            </div>


            <!-- Model -->
            <ion-modal :is-open="isOpen" id="example-modal" ref="modal">
                <div v-if="check === 'fromdata'">
                    <ion-toolbar style="text-align: center;">
                        <p>กรอกข้อมูล</p>
                    </ion-toolbar>
                    <ion-row>
                        <ion-col size="12">
                            <ion-input v-model="preorder.cus_name" placeholder="ชื่อ"></ion-input>
                            <ion-input v-model="preorder.cus_tel" placeholder="เบอร์โทรศัพท์"  onkeypress="if(this.value.length==10) return false;" type="number"></ion-input>
                            <ion-textarea v-model="preorder.cus_address" fill="solid" placeholder="ที่อยู่"></ion-textarea>
                            <ion-input v-model="preorder.amount" type="number" placeholder="จำนวน"></ion-input>
                            <ion-input v-model="preorder.remark" type="number"
                                placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"></ion-input>
                        </ion-col>
                        <ion-col>
                            <ion-button fill="outline" @click="isOpen = false">
                                ยกเลิก
                            </ion-button>
                        </ion-col>
                        <ion-col>
                            <ion-button @click="Confirm()">
                                ตกลง
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </div>
                <div v-if="check === 'confirme'">
                    <ion-row>
                        <ion-col size="12">
                            <ion-icon color="success" :icon="checkmarkCircleOutline"></ion-icon>
                        </ion-col>
                        <ion-col size="12">
                            <p style="text-align: center;">ทำรายการเสร็จสิ้นโปรดรอการ ตรวจสอบ</p>
                        </ion-col>
                        <ion-col>
                            <ion-button class="btn-confirm" @click="Success()">
                                ตกลง
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </div>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonToolbar, IonButton,
    IonIcon, IonButtons, IonTitle, IonCard, IonItem, loadingController, IonModal,
    IonInput, IonTextarea, IonAlert
} from '@ionic/vue';
import { checkmarkCircleOutline, chevronBackOutline } from 'ionicons/icons';
import { UserService } from "../../services/user";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const alertButtons = ['OK'];
        const userservice = new UserService(null);
        const isOpen = ref(false);
        const isOpenAlert = ref(false);
        const OpenAlert = (state: boolean) => {
            isOpenAlert.value = state;
        };
        const OpenModal = (state: boolean) => {
            isOpen.value = state;
        };
        return { userservice, chevronBackOutline, OpenModal, isOpen, checkmarkCircleOutline, isOpenAlert, OpenAlert,
            alertButtons }
    },
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonToolbar, IonButton,
        IonIcon, IonButtons, IonTitle, IonCard, IonItem, IonModal, IonInput, IonTextarea, 
        IonAlert
    },
    data() {
        return {
            services: [],
            loading: false,
            name: '',
            preorder: {
                artwork_type: '',
                cus_name: '',
                cus_tel: '',
                cus_address: '',
                product_price_id: '',
                amount: '',
                remark: '',
            },
            check: '',
            sentmessage: '',
            error: '',
        }
    },
    methods: {
        getImage(item) {
            return "https://drive.google.com/uc?export=view&id=" + item;
        },
        SelectProducts(id: string) {
            this.isOpen = true;
            this.preorder.product_price_id = id
            this.preorder.artwork_type = this.name
            this.check = 'fromdata'
        },
        Confirm() {
            if (this.preorder.cus_name === '' || this.preorder.cus_tel === '' || this.preorder.cus_address === '' || this.preorder.amount === '') {
                this.isOpenAlert = true;
                this.sentmessage = 'ข้อมูลไม่ครบถ้วน'
                this.error = 'กรุณากรอกข้อมูลให้ครบถ้วน'
            } else  if(this.preorder.cus_tel.length <= 9 ){
                this.isOpenAlert = true;
                this.sentmessage = 'กรอกเบอร์โทรศัพท์ไม่ครบ 10 ตัว'
                this.error = 'กรุณากรอกข้อมูลให้ครบถ้วน'
            }else {
            this.loading = true;
            loadingController.create({
                message: 'โปรดรอสักรู่....'
            }).then(a => {
                a.present().then(() => {
                    this.userservice.GetPreorderById(this.preorder).then((result: any) => {
                        console.log(result)
                        if (result.message === 'successful') {
                            this.loading = false
                            this.check = 'confirme'
                            console.log('result', result.data);
                        } else if (result.message === 'failed') {
                            console.log('result', result.data);
                            console.log('data', this.preorder)
                        }
                        if (!this.loading) {
                            a.dismiss().then(() => console.log('abort presenting'));
                        }
                    }).catch((err) => {
                        console.log(err);
                        this.loading = false;
                    })
                });
            });
            }
        },
        Success() {
            this.isOpen = false
            window.location.reload()
        }
    },
    async mounted() {
        this.loading = true;
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                this.userservice.GetArtWorkById(this.$route.params.id).then((result: any | null) => {
                    console.log(result);
                    if (result.message === 'ดึงข้อมูลสำเร็จ') {
                        this.loading = false
                        this.services = result.data;
                        this.name = this.services[0].product.name;
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

.btn {
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
    margin-left: 10%;
    width: 20%;
    height: 40%;
}

.img-card {
    width: 100%;
    height: 100%;
}

ion-modal#example-modal {
    --width: fit-content;
    --min-width: auto;
    --height: fit-content;
    --border-radius: 6px;
    padding: 15px;
}

ion-modal#example-modal ion-button {
    width: 100%;
    padding-bottom: 10%;
}

ion-modal#example-modal ion-icon {
    width: 100%;
    height: 180px;
}

ion-modal#example-modal ion-row {
    padding-left: 5%;
    padding-right: 5%;
}

ion-modal#example-modal ion-textarea {
    color: #222222 !important;
    text-align: left !important;

    background-color: white;
    border: solid 1px #adadad;
    border-radius: 0.3rem;
    margin: 0.5rem 0rem 1rem 0rem;
    width: 100%;
    --placeholder-color: #797979;
    --placeholder-opacity: 0.8;

    --padding-bottom: 10px;
    --padding-end: 10px;
    --padding-start: 10px !important;
    ;
    --padding-top: 10px;
}

.btn-confirm {
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
    height: 80px;
}

.padding {
    margin-bottom: 10%;
}</style>