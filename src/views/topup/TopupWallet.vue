<template>
  <ion-page>
    <!-- Aler data -->
    <ion-alert :is-open="isOpen" header="แจ้งเตือน !" :sub-header="sentmessage" :message="error" :buttons="alertButtons"
      @didDismiss="OpenAlert(false)"></ion-alert>
    <!-- Aler Imgae -->
    <ion-alert :is-open="isOpenImgae" header="แจ้งเตือน !" :sub-header="sentmessage" :message="error"
      :buttons="alertButtons" @didDismiss="OpenAlert(false)"></ion-alert>

    <ion-toolbar class="toolbar">
      <ion-buttons slot="start">
        <ion-button @click="$router.go(-1)">
          <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
          กลับ
        </ion-button>
      </ion-buttons>
      <ion-title>เติมเงินเข้ากระเป๋า</ion-title>
    </ion-toolbar>
    <ion-content padding>
      <ion-row>
        <ion-col size="12">
          <h2 style="margin-left: 10px;"><strong>เติมเงินเข้ากระเป๋า</strong></h2>
        </ion-col>
        <ion-col size="12">
          <div style="padding-left: 3%; padding-right: 3%; padding-top: 3%;">
            <ion-segment v-model="selectTabs">
              <ion-segment-button value="monney" layout="icon-start" tab="history">
                <ion-icon size="small" :icon="readerOutline"></ion-icon>
                โอนสลิป
              </ion-segment-button>
              <ion-segment-button value="segment" layout="icon-start">
                <ion-icon size="small" :icon="qrCodeOutline"></ion-icon>
                <ion-label>QR CODE</ion-label>
              </ion-segment-button>
            </ion-segment>
          </div>
        </ion-col>
        <ion-col>
          <div style="margin-left: 5%; margin-right: 5%;">
            <p v-if="selectTabs == 'monney'">
              <ion-item lines="none">
                <p class="icon-bath">฿</p>
                <ion-input v-model="amount" placeholder="จำนวนเงินที่โอน (บาท)" type="number"></ion-input>
              </ion-item>
              <ion-item style="margin-top: 2%;" lines="none" v-if="image_preview === null">
                <ion-icon class="icon-attach" :icon="attachOutline"></ion-icon>
                <input class="custom-file-input" type="file" @change="chooseImage" accept=".jpeg, .png, .jpg" />
              </ion-item>

              <!-- Alert Confrime -->
              <ion-modal :is-open="isOpenAlert" id="example-modal" ref="modal">
                <div style="text-align: center;">
                  <ion-icon color="success" :icon="checkmarkCircleOutline"></ion-icon>
                  <h4>เติมเงินสำเร็จ</h4>
                  <p>อาจใช้เวลาในการตรวจสอบ 10-15 นาที</p>
                </div>
                <ion-button @click="Close(false)">ตกลง</ion-button>
              </ion-modal>


              <ion-row v-if="image_preview != null">
                <ion-col size="12" style="text-align: center;">
                  <ion-button @click="clearImage()" class="btn-deleteimg">
                    <ion-icon slot="start" :icon="trash"></ion-icon>
                    ลบ
                  </ion-button>
                </ion-col>
                <ion-col size="12">
                  <ion-card>
                    <img style="width: 100%; height: 100%;" :src="image_preview" />
                  </ion-card>
                </ion-col>
                <ion-col>
                  <ion-button @click="confirm()" class="btn-confirm">
                    ยืนยัน
                  </ion-button>
                </ion-col>
              </ion-row>
            </p>
            <h3 v-if="selectTabs == 'segment'">

            </h3>
          </div>
        </ion-col>
      </ion-row>

    </ion-content>
  </ion-page>
</template>
 
<script lang="ts">
import { UserService } from "@/services/user";
import { readerOutline, qrCodeOutline, chevronBackOutline, attachOutline, trash, checkmarkCircleOutline } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCol, IonGrid, IonRow, IonInput, IonAvatar, IonSearchbar
  , IonProgressBar, IonImg, IonNav, IonButton, IonBackButton,
  IonIcon, IonButtons, IonAlert, IonItem, IonLabel, IonChip,
  IonModal, IonList, IonSegment, IonSegmentButton, IonCard,
  loadingController
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const userservice = new UserService(null);
    const alertButtons = [
      {
        text: 'OK',
        role: 'confirm',
        handler: () => { },
      },
    ];
    const isOpenAlert = ref(false);
    const isOpen = ref(false);
    const isOpenImgae = ref(false);
    const OpenAlert = (state: boolean) => {
      isOpen.value = state;
      isOpenImgae.value = state;
      isOpenAlert.value = state;
    };
    return {
      checkmarkCircleOutline,
      chevronBackOutline,
      alertButtons,
      OpenAlert,
      isOpen,
      readerOutline,
      qrCodeOutline,
      attachOutline,
      trash,
      isOpenImgae,
      userservice,
      isOpenAlert
    }
  },
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonCol, IonGrid, IonRow,
    IonInput, IonAvatar, IonSearchbar,
    IonProgressBar, IonImg, IonNav, IonButton,
    IonBackButton, IonIcon, IonButtons, IonAlert,
    IonItem, IonLabel, IonChip, IonModal, IonList, IonSegment,
    IonSegmentButton, IonCard
  },
  data() {
    return {
      selectTabs: 'monney',
      image: null as any,
      image_preview: null as any,
      amount: '',
      sentmessage: '',
      error: '',
      test: true,
      loading: false,
    }
  },
  watch: {
    '$route.query.data': {
      handler: function (newQuery) {
        if (newQuery === 'confirmed') {
          const formData = new FormData();
          formData.append('amount', this.amount);
          formData.append('image', this.image);
          this.loading = true;
          loadingController.create({
            message: 'โปรดรอสักรู่....'
          }).then(a => {
            a.present().then(() => {
              this.userservice.PostTopupServices(formData).then((result: any) => {
                console.log(result)
                if (result.message === 'successful') {
                  this.loading = false;
                  this.isOpenAlert = true;
                } else if (result.message === 'failed') {
                  console.log('result', result.data);
                  this.loading = false;
                  this.isOpen = true;
                  this.sentmessage = result.test.message;
                  this.error = 'ขออภัยในความไม่สะดวก';
                  this.alertButtons = [
                    {
                      text: 'OK',
                      role: 'confirm',
                      handler: () => {
                        window.location.reload();
                      },
                    },
                  ];
                }
                if (!this.loading) {
                  a.dismiss();
                }
              }).catch((err) => {
                console.log(err);
              })
            });
          });
        }
      }
    },
  },
  methods: {
    chooseImage(evt: any) {
      this.image = evt.target.files[0];
      if (!evt.target.files[0]) {
        this.clearImage();
        return false;
      }
      if (this.image.type === "image/png" || this.image.type === "image/jpeg") {
        this.image_preview = URL.createObjectURL(evt.target.files[0]);
      } else {
        this.isOpenImgae = true;
        this.sentmessage = 'รูปภาพที่แนบจะต้องเป็นไฟล์นามสกุล .jpg .png เท่านั้น';
        this.error = 'กรุณากรอกข้อมูลให้ถูกต้อง';
        this.clearImage();
        return false;
      }
    },
    clearImage() {
      this.image = null;
      this.image_preview = null;
    },
    async confirm() {
      if (this.amount === '' || this.amount === null || this.image === null) {
        this.isOpen = true;
        this.sentmessage = 'ข้อมูลไม่ครบ';
        this.error = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      } else {
        this.$router.push({
          path: `/pin`,
          query: {
            query: 'confirmtopupwallet'
          }
        });
      }
    },
    async Close(isOpenAlert: boolean) {
      this.isOpenAlert = isOpenAlert;
      window.location.reload();
    },
  }
});

</script>
 
<style scoped>
.custom-file-input {
  margin: 2%;
  padding: 5%;
  background: white;
  color: black;
  width: 100%;
}

.toolbar {
  --background: rgb(255, 1, 162);
  --color: white;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

/* Material Design styles */
ion-segment {
  background-color: rgba(255, 255, 255, 0.26);
}

ion-segment-button.md::part(native) {
  color: #ffffff;
}

.segment-button-checked.md::part(native) {
  color: #4b037a;
}

ion-segment-button.md::part(indicator-background) {
  height: 4px;
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

/* iOS styles */

.segment-button-checked.ios::part(native) {
  color: rgba(117, 9, 121, 1);
}

.icon-bath {
  font-size: 22px;
  margin-right: 18px;
  margin-left: 4px;
  color: grey;
  margin-top: 15px;
}

.icon-attach {
  color: gray;
  font-size: 30px;
  margin-right: 8px;
}

.btn-deleteimg {
  --background: red !important;
}

ion-card {
  margin-top: 10px;
  border: solid 1px #adadad;
  border-radius: 0.3rem;
}

.btn-confirm {
  width: 100%;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}
</style>