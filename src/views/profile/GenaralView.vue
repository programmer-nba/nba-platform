<template>
  <ion-page>
    <ion-toolbar class="toolbar">
      <ion-buttons slot="start">
        <ion-button @click="$router.go(-1)">
          <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-row>
        <div style="height: 45px;">
          <ion-title>ข้อมูลทั่วไป</ion-title>
        </div>
      </ion-row>
    </ion-toolbar>
    <ion-content padding>
      <ion-col>
        <ion-item lines="none">
          <ion-label style="color: grey; font-size: 15px;">
            <p>ข้อมูลทั่วไป</p>
          </ion-label>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>ชื่อ-นามสกุล :</strong></h3>
          </ion-label>
          <p slot="end">{{ user?.name }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>เบอร์โทร :</strong></h3>
          </ion-label>
          <p slot="end">{{ user?.tel }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>ที่อยู่ :</strong></h3>
          </ion-label>
          <p slot="end">{{ user?.address }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>แขวง/ตำบล :</strong></h3>
          </ion-label>
          <p slot="end">{{ user?.subdistrict }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>เขตอำเภอ :</strong></h3>
          </ion-label>
          <p slot="end">{{ user?.district }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>จังหวัด :</strong></h3>
          </ion-label>
          <p slot="end">{{ user?.province }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>รหัสไปรษณีย์ :</strong></h3>
          </ion-label>
          <p slot="end">{{ user?.postcode }}</p>
        </ion-item>

        <!-- IDEN  -->
        <ion-item lines="none">
          <ion-label style="color: grey; font-size: 15px;">
            <p>ข้อมูลบัตรประชาชน</p>
          </ion-label>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>สถานะ :</strong></h3>
          </ion-label>
          <ion-chip v-if="user?.iden.status" color="success">ยืนยันแล้ว</ion-chip>
          <ion-chip v-if="!user?.iden.status && user?.iden.remark !== '-'" color="red">ยังไม่ได้ยืนยัน</ion-chip>
          <ion-button elevation="0" class="btn-primary"
            v-if="!user?.iden.status && user?.iden.remark === '-'">ยืนยันตอนนี้</ion-button>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>หมายเลขบัตร :</strong></h3>
          </ion-label>
          <p slot="end">{{ user?.iden.number }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>รูปที่แนบ :</strong></h3>
          </ion-label>
          <ion-button id="open-custom-dialog" class="btn-img"><ion-icon style="margin-right: 10px;"
              :icon="image"></ion-icon>ดูรูปภาพ</ion-button>
          <ion-modal id="example-modal" ref="modal" trigger="open-custom-dialog">
            <div class="wrapper">
              <ion-toolbar class="toolbar">
                <div style="height: 45px; text-align: center;">
                  <p>รูปบัตรประชาชน</p>
                </div>
              </ion-toolbar>

              <ion-img :src="getImage(user?.iden.image)"></ion-img>
              <ion-toolbar>
                <ion-buttons slot="end">
                  <ion-button @click="dismiss()">ปิด</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </div>
          </ion-modal>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>*หมายเหตุ :</strong></h3>
          </ion-label>
          <div v-if="user?.iden.remark === 'ไม่ผ่านตรวจสอบ'">
            <ion-button>ส่งอีกครั้ง</ion-button>
          </div>
          <p slot="end">{{ user?.iden.remark }}</p>
        </ion-item>

        <!-- BANK -->
        <ion-item lines="none">
          <ion-label style="color: grey; font-size: 15px;">
            <p>ข้อมูลบบัญชีธนาคาร</p>
          </ion-label>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>สถานะ :</strong></h3>
          </ion-label>
          <ion-chip v-if="user?.iden.status" color="success">ยืนยันแล้ว</ion-chip>
          <ion-chip v-if="!user?.iden.status && user?.iden.remark !== '-'" color="red">ยังไม่ได้ยืนยัน</ion-chip>
          <ion-button elevation="0" class="btn-primary"
            v-if="!user?.iden.status && user?.iden.remark === '-'">ยืนยันตอนนี้</ion-button>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>รูปที่แนบ :</strong></h3>
          </ion-label>
          <ion-button id="open-bank-dialog" class="btn-img"><ion-icon style="margin-right: 10px;"
              :icon="image"></ion-icon>ดูรูปภาพ</ion-button>
          <ion-modal id="example-modal" ref="modalbank" trigger="open-bank-dialog">
            <div class="wrapper">
              <ion-toolbar class="toolbar">
                <div style="height: 45px; text-align: center;">
                  <p>รูปบัตรประชาชน</p>
                </div>
              </ion-toolbar>

              <ion-img :src="getImage(user?.bank.image)"></ion-img>
              <ion-toolbar>
                <ion-buttons slot="end">
                  <ion-button @click="dismissBank()">ปิด</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </div>
          </ion-modal>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>*หมายเหตุ :</strong></h3>
          </ion-label>
          <div v-if="user?.bank.remark === 'ไม่ผ่านตรวจสอบ'">
            <ion-button>ส่งอีกครั้ง</ion-button>
          </div>
          <p slot="end">{{ user?.bank.remark }}</p>
        </ion-item>
      </ion-col>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { chevronBackOutline, image, radioButtonOffOutline, radioButtonOnOutline } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCol, IonGrid, IonRow, IonInput, IonAvatar, IonSearchbar
  , IonProgressBar, IonImg, IonNav, IonButton, IonBackButton,
  IonIcon, IonButtons, IonAlert, IonItem, IonLabel, IonChip,
  IonModal, IonList, loadingController
} from '@ionic/vue';
import { UserService } from "@/services/user";
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const userservice = new UserService(null);
    const alertButtons = ['OK'];
    const isOpen = ref(false);
    const setOpen = (state: boolean) => {
      isOpen.value = state;
    };
    return {
      radioButtonOffOutline,
      radioButtonOnOutline,
      chevronBackOutline,
      alertButtons,
      setOpen,
      isOpen,
      userservice,
      image
    }
  },
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonCol, IonGrid, IonRow,
    IonInput, IonAvatar, IonSearchbar,
    IonProgressBar, IonImg, IonNav, IonButton,
    IonBackButton, IonIcon, IonButtons, IonAlert,
    IonItem, IonLabel, IonChip, IonModal, IonList
  },
  data() {
    return {
      user: null,
      loading: false
    }
  },
  methods: {
    dismissBank() {
      this.$refs.modalbank.$el.dismiss();
    },
    dismiss() {
      this.$refs.modal.$el.dismiss();
    },
    getImage(item) {
      return "https://drive.google.com/uc?export=view&id=" + item;
    }
  },
  async mounted() {
    this.loading = true;
    loadingController.create({
      message: 'กำลังโหลดข้อมูล....'
    }).then(a => {
      a.present().then(() => {
        //get me 
        this.userservice.GetMe().then((result: any | null) => {
          console.log(result);
          if (result.status === true) {
            this.loading = false
            this.user = result.data;
          } if (!this.loading) {
            a.dismiss().then(() => console.log());
          }
        })
      });
    });
  },
});

</script>

<style scoped>.toolbar {
  --background: rgb(255, 1, 162);
  --color: white;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.btn-img {
  font-size: 14px;
  height: 40px;
  width: 120px;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

ion-modal#example-modal {
  --width: fit-content;
  --min-width: 250px;
  --height: fit-content;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#example-modal h1 {
  margin: 20px 20px 10px 20px;
}</style>