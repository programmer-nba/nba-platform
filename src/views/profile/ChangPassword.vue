<template>
    <ion-page>
        <!-- Toast Success -->
        <ion-toast :is-open="isOpenToast" :message="messagetoast" :duration="5000" class="custom-toast" :icon="checkmarkCircle"

            @didDismiss="setOpen(false)"></ion-toast>
        <!-- Aler data -->
        <ion-alert :is-open="isOpenAlert" header="แจ้งเตือน !" :sub-header="sentmessage" :message="message"
            :buttons="alertButtons" @didDismiss="setOpen(false)"></ion-alert>

        <ion-toolbar class="toolbar">
            <ion-buttons slot="start">
                <ion-button @click="$router.push('/tabs/user')">
                    <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
                    กลับ
                </ion-button>
            </ion-buttons>
                    <ion-title>เปลี่ยนรหัสผ่าน</ion-title>
        </ion-toolbar>
        <ion-content padding>
            <ion-row>
                <ion-col size="12">
                    <ion-input type="password" v-model="password" hint="รหัสผ่านจะต้องมีอย่างน้อย 6 ตัวอักษรขึ้นไป"
                        helper-text="รหัสผ่านจะต้องมีอย่างน้อย 6 ตัวอักษรขึ้นไป" placeholder="รหัสผ่านใหม่"></ion-input>
                </ion-col>
                <ion-col size="12">
                    <ion-input type="password" v-model="confirme_password" placeholder="ยืนยันรหัสผ่าน"></ion-input>
                </ion-col>
                <ion-col size="12">
                    <ion-button class="btn" @click="Check()">เปลี่ยนรหัสผ่าน</ion-button>
                </ion-col>
            </ion-row>
        </ion-content>

        <!-- Model Confirm -->
        <ion-modal :is-open="isOpen" id="example-modal" ref="modal">
            <div style="text-align: center;">
                <ion-icon :icon="alertCircleOutline"></ion-icon>
                <h1><strong>เปลี่ยนรหัสผ่าน</strong></h1>
                <p>คุณต้องการเปลี่ยนรหัสผ่านนี้?</p>
                <ion-row>
                    <ion-col>
                        <ion-button fill="outline" @click="Close(false)">ยกเลิก</ion-button>
                    </ion-col>
                    <ion-col>
                        <ion-button class="btn" @click="Confirm()">ยืนยัน</ion-button>
                    </ion-col>
                </ion-row>
            </div>
        </ion-modal>
    </ion-page>
</template>

<script lang="ts">
import { chevronBackOutline, image, radioButtonOffOutline, radioButtonOnOutline, alertCircleOutline, checkmarkCircle } from 'ionicons/icons';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonCol, IonGrid, IonRow, IonInput, IonAvatar, IonSearchbar
    , IonProgressBar, IonImg, IonNav, IonButton, IonBackButton,
    IonIcon, IonButtons, IonAlert, IonItem, IonLabel, IonChip,
    IonModal, IonList, IonToast
} from '@ionic/vue';
import { UserService } from "@/services/user";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        const isOpen = ref(false);
        const isOpenAlert = ref(false);
        const isOpenToast = ref(false);
        const alertButtons = ['OK'];
        const setOpen = (state: boolean) => {
            isOpen.value = state;
            isOpenAlert.value = state;
            isOpenToast.value = state;
        };
        return {
            radioButtonOffOutline,
            radioButtonOnOutline,
            chevronBackOutline,
            userservice,
            image,
            setOpen,
            isOpen,
            alertCircleOutline,
            alertButtons,
            isOpenAlert,
            isOpenToast,
            checkmarkCircle
        }
    },
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle,
        IonContent, IonCol, IonGrid, IonRow,
        IonInput, IonAvatar, IonSearchbar,
        IonProgressBar, IonImg, IonNav, IonButton,
        IonBackButton, IonIcon, IonButtons, IonAlert,
        IonItem, IonLabel, IonChip, IonModal, IonList,
        IonToast
    },
    data() {
        return {
            user: null,
            password: '',
            confirme_password: '',
            sentmessage: '',
            message: '',
            messagetoast: '',
        }
    },
    methods: {
        Check() {
            if (this.password === "" || this.confirme_password === "") {
                this.isOpenAlert = true
                this.message = 'กรุณากรอกข้อมูลให้ครบถ้วน'
                this.sentmessage = 'ข้อมูลไม่ครบถ้วน'
            } else if (this.password.length < 6) {
                this.isOpenAlert = true
                this.message = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษรขึ้นไป'
                this.sentmessage = 'รหัสผ่านไม่ถูกต้อง'
            } else if (this.password !== this.confirme_password) {
                this.isOpenAlert = true
                this.message = 'ยืนยันรหัสผ่านไม่ตรงกัน กรุณาตรวจสอบ'
                this.sentmessage = 'รหัสผ่านไม่ตรงกัน'
            } else {
                this.isOpen = true;
            }
        },
        async Confirm() {
            await this.userservice.ChangPassword(this.password).then((result: any) => {
                console.log(result);
                if (result.message === 'successful') {
                    console.log('result', result.data);
                    this.messagetoast = 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว'
                    this.password = '';
                    this.confirme_password = '';
                    this.isOpenToast = true
                    this.isOpen = false;
                    setTimeout(() => {
                        this.$router.push("/tabs/user");
                    }, 2000);
                } else if (result.message === 'failed') {
                    console.log('result', result.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        async Close(isOpen: boolean) {
            this.isOpen = isOpen;
        },
    }
})
</script>

<style scoped>
.toolbar {
    --background: rgb(255, 1, 162);
    --color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

ion-col {
    max-width: 90% !important;
    margin-left: auto;
    margin-right: auto;
}

.btn {
    width: 100%;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
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
ion-toast.custom-toast {
    --background: #25b800;
    --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
        color: white;
  }

  ion-toast.custom-toast::part(message) {
    font-style: italic;
  }

  ion-toast.custom-toast::part(button) {
    border-left: 1px solid #d2d2d2;
    color: #030207;
    font-size: 15px;
  }
</style>