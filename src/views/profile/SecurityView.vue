<template>
    <ion-page>
        <!-- Toast Success -->
        <ion-toast :is-open="isOpenToast" :message="message" :duration="5000" class="custom-toast" :icon="checkmarkCircle"
            @didDismiss="setOpen(false)"></ion-toast>

        <ion-toolbar class="toolbar">
            <ion-buttons slot="start">
                <ion-button @click="$router.go(-1)">
                    <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title>การเข้าสู่ระบบความปลอดภัย</ion-title>
        </ion-toolbar>
        <ion-content padding>
            <ion-col>
                <ion-item lines="none">
                    <ion-label>
                        <p>อุปกรณ์ที่ยังไม่ได้ออกจากระบบ</p>
                    </ion-label>
                </ion-item>
                <ion-item v-for="item in mumber" :key="item">
                    ล็อกอินเมื่อวัน {{ datetimeFormat(item.timestamp) }}
                    <ion-chip color="success" v-if="checkDevice(item.token) === true" slot="end">เครื่องนี้</ion-chip>
                    <ion-button class="btn" @click="confirm(item._id)" v-else slot="end"><ion-icon
                            :icon="trash"></ion-icon></ion-button>
                </ion-item>
            </ion-col>

            <ion-modal :is-open="isOpen" id="example-modal" ref="modal">
                <ion-row>
                    <ion-col size="12">
                        <h1>ออกจากระบบ</h1>
                    </ion-col>
                    <ion-col size="12">
                        <p>ต้องการออกจากระบบบนอุปกรณ์นี้?</p>
                    </ion-col>
                    <ion-col>
                        <ion-button class="btn-confirm" @click="logoutDevice(id)">ตกลง</ion-button>
                    </ion-col>
                    <ion-col>
                        <ion-button fill="outline" @click="Close(false)">ยกเลิก</ion-button>
                    </ion-col>
                </ion-row>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>
 
<script lang="ts">
import { checkmarkCircle, chevronBackOutline, image, radioButtonOffOutline, radioButtonOnOutline, trash } from 'ionicons/icons';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonCol, IonGrid, IonRow, IonInput, IonAvatar, IonSearchbar
    , IonProgressBar, IonImg, IonNav, IonButton, IonBackButton,
    IonIcon, IonButtons, IonAlert, IonItem, IonLabel, IonChip,
    IonModal, IonList, IonToast, loadingController
} from '@ionic/vue';
import { UserService } from "@/services/user";
import { defineComponent, ref } from 'vue';
import { datetimeFormat } from '@/services/fun';

export default defineComponent({
    setup() {
        const userservice = new UserService(null);
        const alertButtons = ['OK'];
        const isOpen = ref(false);
        const isOpenToast = ref(false);
        const setOpen = (state: boolean) => {
            isOpen.value = state;
            isOpenToast.value = state;
        };
        return {
            radioButtonOffOutline,
            radioButtonOnOutline,
            chevronBackOutline,
            checkmarkCircle,
            alertButtons,
            setOpen,
            isOpen,
            userservice,
            image,
            trash,
            isOpenToast,
            datetimeFormat
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
            mumber: [] as any[],
            id: '',
            message: 'ออกจากอุปกรณ์บนเครื่อง อื่นๆ สำเร็จ',
            loading: false
        }
    },
    methods: {
        checkDevice(token: any) {
            if (token === localStorage.getItem('token')) {
                return true;
            } else {
                return false;
            }
        },
        async logoutDevice(id: any) {
            await this.userservice.DeleteMumber(id).then((result: any) => {
                console.log(result);
                if (result.status === true) {
                    const position = this.mumber.findIndex((el: any) => el._id === id);
                    this.mumber.splice(position, 1);
                    console.log('result', result.data);
                    this.isOpen = false
                    this.isOpenToast = true;
                } else if (result.status === false) {
                    console.log('result', result.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        confirm(id: string) {
            this.isOpen = true;
            this.id = id;
        },
        Close(isOpen: boolean) {
            this.isOpen = isOpen;
        },
    },
    async mounted() {
        this.loading = true;
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                //Get me 
                this.userservice.GetMe().then((result: any | null) => {
                    console.log(result);
                    if (result.status === true) {
                        this.loading = false
                        this.user = result.data;
                    } if (!this.loading) {
                        a.dismiss().then(() => console.log());
                    }
                })
                //Get Mumber 
                this.userservice.GetMumber().then((result: any | null) => {
                    console.log(result);
                    if (result.status === true) {
                        this.mumber = result.data;
                    } if (!this.loading) {
                        a.dismiss().then(() => console.log());
                    }
                })
            });
        });
    },

});

</script>
 
<style scoped>
.toolbar {
    --background: rgb(255, 1, 162);
    --color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.btn {
    font-size: 14px;
    height: 80%;
    width: 20%;
    margin-left: 10%;
    --background: red;
}

ion-modal#example-modal {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    padding: 20px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
    text-align: center;
}

ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
    font-weight: bold;
}

ion-modal#example-modal ion-button {
    width: 100%;
}

.btn-confirm {
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
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