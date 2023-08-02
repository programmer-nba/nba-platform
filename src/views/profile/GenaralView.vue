<template>
  <ion-page>
    <ion-toolbar class="toolbar">
      <ion-buttons slot="start">
        <ion-button @click="$router.go(-1)">
          <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>ข้อมูลทั่วไป</ion-title>
    </ion-toolbar>
    <ion-content padding>
      <ion-col >
        <ion-item lines="none">
          <ion-label style="color: grey; font-size: 15px;">
            <p>ข้อมูลทั่วไป</p>
          </ion-label>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>ชื่อ-นามสกุล :</strong></h3>
          </ion-label>
          <p slot="end">{{ data_user.name }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>เบอร์โทร :</strong></h3>
          </ion-label>
          <p slot="end">{{ data_user.tel }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>ที่อยู่ :</strong></h3>
          </ion-label>
          <p slot="end">{{ data_user.address }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>แขวง/ตำบล :</strong></h3>
          </ion-label>
          <p slot="end">{{ data_user.subdistrict }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>เขตอำเภอ :</strong></h3>
          </ion-label>
          <p slot="end">{{ data_user.district }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>จังหวัด :</strong></h3>
          </ion-label>
          <p slot="end">{{ data_user.province }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>รหัสไปรษณีย์ :</strong></h3>
          </ion-label>
          <p slot="end">{{ data_user.postcode }}</p>
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
          <ion-chip v-if="data_user.iden.status" color="success">ยืนยันแล้ว</ion-chip>
          <ion-chip v-if="!data_user.iden.status && data_user.iden.remark !== '-'" color="red">ยังไม่ได้ยืนยัน</ion-chip>
          <ion-button elevation="0" class="btn-primary"
            v-if="!data_user.iden.status && data_user.iden.remark === '-'">ยืนยันตอนนี้</ion-button>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>หมายเลขบัตร :</strong></h3>
          </ion-label>
          <p slot="end">{{ data_user.iden.number }}</p>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>รูปที่แนบ :</strong></h3>
          </ion-label>
          <ion-button @click="setOpenIden(true)" class="btn-img"><ion-icon style="margin-right: 10px;"
              :icon="image"></ion-icon>ดูรูปภาพ</ion-button>

          <ion-modal id="example-modal" ref="modal" :is-open="OpenIden">
            <div class="wrapper">
              <ion-toolbar class="toolbar">
                <div style="height: 45px; text-align: center;">
                  <p>รูปบัตรประชาชน</p>
                </div>
              </ion-toolbar>

              <ion-img :src="getImage(data_user.iden.image)"></ion-img>
              <ion-toolbar>
                <ion-buttons slot="end">
                  <ion-button @click="setOpenIden(false)">ปิด</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </div>
          </ion-modal>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>*หมายเหตุ :</strong></h3>
          </ion-label>
          <div v-if="data_user.iden.remark === 'ไม่ผ่านตรวจสอบ'">
            <ion-button>ส่งอีกครั้ง</ion-button>
          </div>
          <p slot="end">{{ data_user.iden.remark }}</p>
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
          <ion-chip v-if="data_user.bank.status" color="success">ยืนยันแล้ว</ion-chip>
          <ion-chip v-if="!data_user.bank.status && data_user.bank.remark !== '-'" color="red">ยังไม่ได้ยืนยัน</ion-chip>
          <ion-button elevation="0" class="btn-primary"
            v-if="!data_user.bank.status && data_user.bank.remark === '-'">ยืนยันตอนนี้</ion-button>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>รูปที่แนบ :</strong></h3>
          </ion-label>
          <ion-button @click="setOpenBank(true)" class="btn-img"><ion-icon style="margin-right: 10px;"
              :icon="image"></ion-icon>ดูรูปภาพ</ion-button>
          <ion-modal id="example-modal" ref="modalbank" :is-open="OpenBank">
            <div class="wrapper">
              <ion-toolbar class="toolbar">
                <div style="height: 45px; text-align: center;">
                  <p>รูปบัตรประชาชน</p>
                </div>
              </ion-toolbar>

              <ion-img :src="getImage(data_user.bank.image)"></ion-img>
              <ion-toolbar>
                <ion-buttons slot="end">
                  <ion-button @click="setOpenBank(false)">ปิด</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </div>
          </ion-modal>
        </ion-item>
        <ion-item :detail="false">
          <ion-label>
            <h3><strong>*หมายเหตุ :</strong></h3>
          </ion-label>
          <div v-if="data_user.bank.remark === 'ไม่ผ่านตรวจสอบ'">
            <ion-button>ส่งอีกครั้ง</ion-button>
          </div>
          <p slot="end">{{ data_user.bank.remark }}</p>
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
import { User } from "@/model/user.interface";
import { getImage } from '@/services/fun'
import { UserService } from "@/services/user";
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const userservice = new UserService(null);
    const alertButtons = ['OK'];
    const OpenIden = ref(false);
    const OpenBank = ref(false);
    const setOpenIden = (state: boolean) => {
      OpenIden.value = state;
    };
    const setOpenBank = (state: boolean) => {
      OpenBank.value = state;
    };
    return {
      radioButtonOffOutline,
      radioButtonOnOutline,
      chevronBackOutline,
      alertButtons,
      setOpenBank,
      setOpenIden,
      OpenBank,
      OpenIden,
      userservice,
      image,
      getImage
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
      loading: false,
      data_user: {
        name: '',
        tel: '',
        address: '',
        subdistrict: '',
        district: '',
        province: '',
        postcode: '',
        iden: {
          status: '',
          remark: '',
          number: '',
          image: '',
        },
        bank: {
          name: '',
          status: '',
          remark: '',
          number: '',
          image: '',
        }
      },
      OpenBank: false,
      OpenIden: false,
    }
  },
  methods: {

  },
  async mounted() {
    this.loading = true;
    loadingController.create({
      message: 'กำลังโหลดข้อมูล....'
    }).then(a => {
      a.present().then(() => {
        //get me 
        this.userservice.GetMe().then((result: any) => {
          console.log(result);
          if (result.status === true) {
            this.loading = false
            this.user = result.data;
            this.data_user.name = result.data.name;
            this.data_user.tel = result.data.tel;
            this.data_user.address = result.data.address;
            this.data_user.subdistrict = result.data.subdistrict;
            this.data_user.district = result.data.district;
            this.data_user.province = result.data.province;
            this.data_user.postcode = result.data.postcode;
            this.data_user.iden.status = result.data.iden.status;
            this.data_user.iden.remark = result.data.iden.remark;
            this.data_user.iden.number = result.data.iden.number;
            this.data_user.iden.image = result.data.iden.image;
            this.data_user.bank.name = result.data.bank.name;
            this.data_user.bank.status = result.data.bank.status;
            this.data_user.bank.remark = result.data.bank.remark;
            this.data_user.bank.number = result.data.bank.number;
            this.data_user.bank.image = result.data.bank.image;
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
}
</style>