<template>
  <ion-page>
    <!-- Aler data -->
    <ion-alert :is-open="isOpenImgae" header="แจ้งเตือน !" :sub-header="sentmessage" :message="error"
      :buttons="alertButtons" @didDismiss="OpenAlert(false)"></ion-alert>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="$router.push('/tabs/nbaservices')">
          <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
          กลับ
        </ion-button>
      </ion-buttons>
      <ion-title>ข้อมูลรายละเอียด</ion-title>
    </ion-toolbar>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-row v-for="(item, index) in services" :key="index">
        <ion-col style="text-align: center;" size="12">
          <ion-img :src="`/images/counter_service/${item.productid}.png`"></ion-img>
          <ion-chip>{{ item.productname }}</ion-chip>
        </ion-col>
        <ion-col size="12">
          <div class="alert-text" v-if="alerttext">
            <ion-row>
              <ion-col size="auto">
                <ion-icon class="alert-icon" :icon="closeCircleOutline"></ion-icon>
              </ion-col>
              <ion-col size="9">
                <p>{{ item.alert_text }}</p>
              </ion-col>
              <ion-button fill="clear" class="icon-down" @click="ColseAlert()">
                <ion-icon :icon="closeOutline"></ion-icon>
              </ion-button>
            </ion-row>
          </div>
        </ion-col>
        <ion-col size="12">
          <div class="alert-text-bule" v-if="alerttextbule">
            <ion-row>
              <ion-col size="auto">
                <ion-icon class="alert-icon" :icon="alertCircleOutline"></ion-icon>
              </ion-col>
              <ion-col size="9">
                <p>{{ item.warning_text }}</p>
              </ion-col>
              <ion-button fill="clear" class="icon-bule-down" @click="ColseAlertBule()">
                <ion-icon :icon="closeOutline"></ion-icon>
              </ion-button>
            </ion-row>
          </div>
        </ion-col>
        <ion-col size="6">
          <ion-input v-model="mobile" type="number" placeholder="กรอกเบอร์โทรศัพท์"
            onkeypress="if(this.value.length==10) return false;"></ion-input>
        </ion-col>
        <ion-col size="6">
          <ion-input v-model.number="price" type="number" placeholder="ยอดชำระ"></ion-input>
        </ion-col>
        <ion-col size="6">
          <ion-input v-model="ref1" type="number" placeholder="อ้างอิง 1 (ref.1)"></ion-input>
        </ion-col>
        <ion-col size="6">
          <ion-input v-model="ref2" placeholder="อ้างอิง 2 (ref.2)"></ion-input>
        </ion-col>
        <ion-col size="12">
          <ion-input v-model="note" placeholder="เพิ่มเติม (ถ้ามี)"></ion-input>
        </ion-col>
        <ion-col v-if="image_preview === null">
          แนบรูปภาพ (ถ้ามี และป้องกันความผิดพลาด)
          <input class="custom-file-input" type="file" @change="chooseImage" accept=".jpeg, .png, .jpg" />
        </ion-col>

        <ion-col size="12" style="text-align: center;" v-if="image_preview != null">
          <ion-item>
            <ion-chip style="margin-left: auto; margin-right: auto;">รูปที่แนบ</ion-chip>
          </ion-item>
          <ion-img class="img" @click="viewImage" :src="image_preview"></ion-img>
        </ion-col>

        <!-- Model ViewImage -->
        <ion-modal :is-open="isViewImgae" id="example-modal" ref="modal">
          <ion-img :src="image_preview"></ion-img>
          <div class="top-right">
            <ion-button fill="clear" @click="isViewImgae = false">
              <ion-icon style="color: white;" :icon="closeOutline"></ion-icon>
            </ion-button>
          </div>
        </ion-modal>

        <ion-col style="text-align: center;" v-if="image_preview != null">
          <ion-button @click="clearImage()" class="btn-deleteimg">
            <ion-icon slot="start" :icon="trash"></ion-icon>
            ลบรูปภาพ
          </ion-button>
        </ion-col>
        <ion-col size="12" style="margin-bottom: 15%;">
          <ion-button class="btn-confrime" @click="confirm()">ยันยืน</ion-button>
        </ion-col>
      </ion-row>

      <!-- Model Confirm Check -->
      <ion-modal :is-open="confirmcheck" id="example-modal" ref="modal">
        <ion-toolbar style="text-align: center;">
          <p>ตรวจสอบและยืนยัน</p>
        </ion-toolbar>
        <ion-row style="text-align: center;">
          <div class="icon-confrime">
            <ion-icon :icon="warningOutline" slot="start"></ion-icon>
          </div>
          <ion-col size="12">
            <p>ตรวจสอบข้อมูลถูกต้องและครบถ้วน ยันยืนการฝากจ่าย {{ productname }} ยอดชำระ {{ price.toLocaleString() }} บาท?
            </p>
          </ion-col>
          <ion-col>
            <ion-button class="btn" fill="outline" @click="confirmcheck = false">
              ยกเลิก
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button class="btn" @click="ConfirmAgain()">
              ตกลง
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-modal>

      <!-- Model Confirm Check -->
      <ion-modal :is-open="success" id="example-modal" ref="modal">
        <ion-row style="text-align: center;">
          <div class="ioc-success">
            <ion-icon :icon="checkmarkCircleOutline" slot="start"></ion-icon>
          </div>
          <ion-col size="12">
            <p>ทำรายการเสร็จสิ้น!</p>
          </ion-col>
          <ion-col>
            <ion-button class="btn" @click="Success()">
              ตกลง
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage, IonToolbar, IonButtons, IonButton, IonIcon, IonRow, IonTitle, IonContent,
  IonImg, IonCol, IonChip, IonInput, IonAlert, IonModal, IonItem, IonLabel, loadingController
}
  from '@ionic/vue';
import { UserService } from "@/services/user";
import { CounterService } from "../../services/counterservices";
import { defineComponent, ref } from 'vue';
import { chevronBackOutline, closeOutline, closeCircleOutline, alertCircleOutline, trash, warningOutline, checkmarkCircleOutline } from 'ionicons/icons';

export default defineComponent({
  setup() {
    const alertButtons = [
      {
        text: 'OK',
        role: 'confirm',
        handler: () => { },
      },
    ];
    const userservice = new UserService(null);
    const counterservices = new CounterService(null);
    const isOpenImgae = ref(false);
    const confirmcheck = ref(false);
    const success = ref(false);
    const isViewImgae = ref(false);
    const OpenAlert = (state: boolean) => {
      isOpenImgae.value = state;
      isViewImgae.value = state;
    };
    return {
      chevronBackOutline,
      counterservices,
      closeCircleOutline,
      closeOutline,
      alertCircleOutline,
      trash,
      OpenAlert,
      isOpenImgae,
      isViewImgae,
      userservice,
      alertButtons,
      confirmcheck,
      warningOutline,
      success,
      checkmarkCircleOutline
    };
  },
  components: {
    IonPage, IonToolbar, IonButtons, IonButton, IonIcon, IonRow, IonTitle, IonContent,
    IonImg, IonCol, IonChip, IonInput, IonAlert, IonModal, IonItem, IonLabel

  },
  data() {
    return {
      services: '' as any,
      loading: false,
      alerttext: true,
      alerttextbule: true,
      image_preview: null as any,
      image: null as any,
      mobile: '',
      price: '',
      ref1: '',
      ref2: '',
      note: '',
      sentmessage: '',
      error: '',
      productid: '',
      productname: '',
    }
  },
  watch: {
    '$route.query.data': {
      handler: function (newQuery) {
        if (newQuery === 'confirmed') {
          this.confirmcheck = true;
        } else {
           location.reload();
        }
      },

    },
  },
  methods: {
    ColseAlert() {
      this.alerttext = false;
    },
    ColseAlertBule() {
      this.alerttextbule = false;
    },
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
    confirm() {
      if (this.mobile.length <= 9 || this.price === '' || this.ref2 === '' || this.ref1 === '' || this.image === '') {
        this.sentmessage = 'ข้อมูลไม่ครบ';
        this.error = 'กรุณากรอกข้อมูลให้ครบถ้วน';
        this.isOpenImgae = true;
      } else {
        this.$router.push({
                path: `/pin`,
                query: {
                    id: this.$route.params.id,
                    query: 'confirmnbaservices'
                }
            });
      }
    },
    async ConfirmAgain() {
      const formData = new FormData();
      formData.append('productid', this.productid);
      formData.append('productname', this.productname);
      formData.append('note', this.note);
      formData.append('ref1', this.ref1);
      formData.append('ref2', this.ref2);
      formData.append('price', this.price);
      formData.append('mobile', this.mobile);
      formData.append('ref_image', this.image);
      loadingController.create({
        message: 'โปรดรอสักรู่....'
      }).then(a => {
        a.present().then(() => {
          this.userservice.PostNBAServices(formData).then((result: any) => {
            console.log(result)
            if (result.message === 'successful') {
              this.loading = false;
              this.confirmcheck = false;
              this.success = true;
              // window.location.reload();
              console.log('result', result.data);
            } else if (result.message === 'failed') {
              this.isOpenImgae = true;
              this.loading = false
              this.sentmessage = result.test.message;
              this.alertButtons = [
                {
                  text: 'OK',
                  role: 'confirm',
                  handler: () => {
                    this.confirmcheck = false;
                    this.$router.push('/tabs/nbaservices')
                  },
                },
              ];
              this.error = 'ตรวจสอบเงินในกระเป๋าของคุณ';
              console.log('result', result.data);
            }
            if (!this.loading) {
              a.dismiss().then(() => console.log('abort presenting'));
            }
          }).catch((err) => {
            console.log(err);
          })
        });
      });
    },
    viewImage() {
      this.isViewImgae = true;
    },
    Success() {
      window.location.href = '/tabs/nbaservices'
    }
  },
  async mounted() {
    this.loading = true;
    loadingController.create({
      message: 'กำลังโหลดข้อมูล....'
    }).then(a => {
      a.present().then(() => {
        this.counterservices.getNBAServices().then((result: any) => {
          console.log(result);
          if (result.data.status === true) {
            this.services = result.data.data.filter((el: any) => el._id == this.$route.params.id);
            // this.productid = this.services[0].productid;
            // this.productname = this.services[0].productname;
            this.loading = false
            console.log(this.services)
          } if (!this.loading) {
            a.dismiss().then(() => console.log());
          }
        })
      });
    });
  }
})
</script>

<style scoped>
.custom-file-input {
  padding: 5%;
  background: white;
  color: black;
  width: 100%;
  height: auto;
}

ion-toolbar {
  --background: rgb(255, 1, 162);
  --color: white;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

ion-img {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  height: 80%;
}

.alert-text {
  margin-bottom: 10px;
  color: #de2c33;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
  background-color: #fef3c7;
}

.alert-icon {
  padding-top: 50%;
  position: relative;
  font-size: 25px;
}

.icon-down {
  font-size: 15px;
  color: #de2c33;
  position: absolute;
  top: 8px;
  right: 1%;
}

.alert-text-bule {
  color: #5669eb;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
  background-color: #eff6ff;
}

.icon-bule-down {
  font-size: 15px;
  color: #5669eb;
  position: absolute;
  top: 8px;
  right: 1%;
}

.btn-deleteimg {
  --background: red !important;
}

.img {
  margin-top: 20px;
  width: 300px !important;
  height: 300px;
}

.btn-confrime {
  width: 100%;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

ion-modal#example-modal {
  --width: fit-content;
  --min-width: auto;
  --height: fit-content;
  --border-radius: 6px;
  padding: 15px;
}

ion-modal#example-modal h1 {
  margin: 20px 20px 10px 20px;
}


ion-modal#example-modal ion-img {
  width: 100%;
}

.top-right {
  width: 100%;
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  background: linear-gradient(rgba(27, 27, 27, 0.85), transparent);
}

.btn {
  width: 100%;
}

.icon-confrime {
  color: black;
  font-size: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 18px;
}

.ioc-success {
  color: green;
  font-size: 80px;
  margin-left: auto;
  margin-right: auto;
}
</style>