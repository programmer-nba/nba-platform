<template>
  <ion-page>
    <!-- Toast Success -->
    <ion-toast :is-open="isOpenToast" :message="message" :duration="4000" class="custom-toast"
      :icon="checkmarkCircle"></ion-toast>

    <ion-content>
      <div class="user-detail">
        <ion-grid>
          <ion-row>
            <ion-col>
              <span>สวัสดี</span>
              <p>{{ user?.name }}</p>

            </ion-col>
            <ion-col>
              <div class="avatar-user">
                <ion-button fill="clear" @click="setOpen(true)" style="--padding-end: 0;">
                  <ion-badge class="badge" color="danger" v-if="getNumberNotify() !== 0" :content="getNumberNotify()">{{
                    getNumberNotify() }}</ion-badge>
                  <ion-icon :icon="notifications"></ion-icon>
                </ion-button>
                <ion-avatar>

                  <img alt="Silhouette of a person's head" src="/images/profile.f171d482.jpg" />

                </ion-avatar>
                <!-- Modal Notify -->
                <ion-modal :is-open="isOpen">
                  <ion-header>
                    <ion-toolbar>
                      <ion-title>แจ้งเตือน</ion-title>
                      <ion-buttons slot="end">
                        <ion-button @click="setOpen(false)">ปิด</ion-button>
                      </ion-buttons>
                    </ion-toolbar>
                  </ion-header>
                  <ion-content class="ion-padding">
                    <ion-list v-if="notify.length !== 0">
                      <ion-item lines="none">
                        <ion-label>
                          <p>รายการแจ้งเตือน</p>
                        </ion-label>
                        <ion-button class="btn-deleteall" slot="end"
                          @click="CheckDeleteAll('DeleteAll')">ลบข้อความทั้งหมด</ion-button>
                      </ion-item>
                      <ion-item button v-for="item in notify" :key="item._id" @click="read(item)">
                        <ion-label>
                          <h3 v-if="!item.status"><strong>{{ item.topic }}</strong></h3>
                          <h3 v-else>{{ item.topic }}</h3>
                          <p>{{ datetimeFormat(item.timestamp) }}</p>
                        </ion-label>
                        <ion-icon v-if="!item.status" :icon="ellipse" slot="end" class="icon-notify"></ion-icon>
                      </ion-item>
                    </ion-list>
                    <div v-else>
                      <p style="text-align: center;"><em>---ไม่มีรายการแจ้งเตือน---</em></p>
                    </div>
                  </ion-content>
                </ion-modal>

                <!-- Modal Detail Notify -->
                <ion-modal :is-open="isOpen_2" id="example-modal">
                  <ion-toolbar>
                    <h6 style="padding-left: 15px;">{{ noti.topic }}</h6>
                  </ion-toolbar>
                  <div class="ion-padding">
                    <p>{{ noti.detail }}</p>
                    <p class="date"><em>เมือวันที่ {{ datetimeFormat(noti.timestamp) }}</em></p>
                  </div>
                  <div class="btn-isopen2">
                    <ion-button color="danger" @click="CheckDelete(noti._id, 'DeleteByOne')"><ion-icon
                        :icon="trash"></ion-icon>ลบ</ion-button>
                    <ion-button class="btn-close" @click="close('Detail')">ปิด</ion-button>
                  </div>
                </ion-modal>

                <!-- Modal Delete -->
                <ion-modal :is-open="isOpenDelete" id="example-modal">
                  <div class="ion-padding" style="text-align: center;">
                    <ion-icon class="icon-delete" :icon="alertCircleOutline"></ion-icon>
                    <h3><strong>ลบข้อความ</strong></h3>
                    <p v-if="check === 'DeleteByOne'">คุณต้องการลบข้อความแจ้งเตือนนี้?</p>
                    <p v-if="check === 'DeleteAll'">คุณต้องการลบข้อความแจ้งเตือนทั้งหมดนี้?</p>
                  </div>
                  <div v-if="check === 'DeleteByOne'" class="btn-isopen2">
                    <ion-button color="danger" @click="Delete('DeleteByOne')"><ion-icon
                        :icon="trash"></ion-icon>ตกลง</ion-button>
                    <ion-button class="btn-close" @click="close('Delete')">ยกเลิก</ion-button>
                  </div>

                  <div v-if="check === 'DeleteAll'" class="btn-isopen2">
                    <ion-button color="danger" @click="Delete('DeleteAll')"><ion-icon
                        :icon="trash"></ion-icon>ตกลง</ion-button>
                    <ion-button class="btn-close" @click="close('Delete')">ยกเลิก</ion-button>
                  </div>
                </ion-modal>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-searchbar></ion-searchbar>
              <div>
                <ion-grid>
                  <ion-row>
                    <ion-col size="12">
                      <ion-range aria-label="Custom range" :min="0" :value="progress" :max="50000" :pin="true">
                      </ion-range>
                    </ion-col>
                    <ion-col style="padding-top: 0%;">
                      <span class="label">All sale</span>
                    </ion-col>
                    <ion-col style="padding-top: 0%;">
                      <div class="all-sell-point">
                        <span class="label">{{ Number(user?.allsale).toFixed(0) }}/50,000</span>
                      </div>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </div>
            </ion-col>
          </ion-row>
          <div class="wallet">

          </div>
        </ion-grid>
      </div>

      <div class="favarite px-1">
        <ion-grid>
          <ion-row>
            <ion-col><span class="label">บริการ</span></ion-col>
            <ion-col>
              <div class="flex justify-content-end">

                <span class="label">เพิ่มเติม...</span>
              </div>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-img class="service" alt="artwork" src="/images/icon_menu/artwork.png"
                @click="$router.push('/tabs/artwork')"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="services" src="/images/icon_menu/counter.png"
                @click="$router.push('/tabs/services')"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="topup" src="/images/icon_menu/mobile_topup.png"
                @click="$router.push('/tabs/topups')"></ion-img>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/transfer.png"
                @click="$router.push('/tabs/nbaservices')"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/cardtopup.png"
                @click="$router.push('/tabs/cardtopup')"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/proserm.png"
                @click="$router.push('/tabs/proserm')"></ion-img>
            </ion-col>

          </ion-row>

          <ion-row>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/keyservice.png"
                @click="$router.push('/tabs/keyservice')"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/wallet.png"
                @click="$router.push('/tabs/wallet')"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/mobilebill.png"
                @click="$router.push('/tabs/mobliebill')"></ion-img>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/cash.png"
                @click="$router.push('/tabs/cash')"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/accountingservice.png"
                @click="$router.push('/tabs/accountservice')"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/marketingservices.png"></ion-img>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/Insurancetaxact.png"
                @click="$router.push('/tabs/insurancetaxact')"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/planeticket.png"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/website.png"
                @click="$router.push('/tabs/websiteservice')"></ion-img>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/facebookservice.png"
                @click="$router.push('/tabs/facebookservice')"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/itsupport.png"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/express.png"></ion-img>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/merit.png"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/sermons.png"></ion-img>
            </ion-col>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/photoservice.png"></ion-img>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-img class="service" alt="transfer" src="/images/icon_menu/retouch.png"></ion-img>
            </ion-col>
            <ion-col>
             
            </ion-col>
            <ion-col>

            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script  lang="ts">
import { alertCircleOutline, notifications, trash, checkmarkCircle, ellipse } from 'ionicons/icons';
import { Storage } from '@ionic/storage';
import { UserService } from "@/services/user";
// import CounterServicePage from "@/views/CounterServicePage.vue";
import { datetimeFormat } from '@/services/fun';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCol, IonGrid, IonRow, IonInput, IonAvatar, IonSearchbar, IonProgressBar, IonImg, IonNav,
  loadingController, IonButton, IonRange, IonText, IonIcon, IonBadge, IonModal, IonButtons,
  IonItem, IonList, IonLabel, IonToast, IonFooter

} from '@ionic/vue';

import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonCol, IonGrid, IonRow,
    IonInput, IonAvatar, IonSearchbar,
    IonProgressBar, IonImg, IonNav, IonButton,
    IonRange, IonText, IonIcon, IonBadge, IonModal,
    IonButtons, IonItem, IonList, IonLabel, IonToast,
    IonFooter
  },
  setup() {
    const store = new Storage();
    const userservice = new UserService(null);
    return {
      userservice,
      store,
      notifications,
      trash,
      alertCircleOutline,
      checkmarkCircle,
      ellipse,
      datetimeFormat
    }
  },
  async created() {
    await this.store.create();
  },
  data() {
    return {
      user: null as any,
      // servicePage: CounterServicePage,
      loading: false,
      progress: 0,
      isOpenDelete: false,
      test2: '',
      isOpen_2: false,
      isOpen: false,
      notify: [] as any[],
      noti: '' as any,
      id_noti: '',
      isOpenToast: false,
      message: 'ลบข้อความแจ้งเตือนสำเร็จ สำเร็จ',
      check: '',
      test: ['Vue', 'React', 'Angular', 'Node', 'Php']
    }
  },
  methods: {
    setOpen(isOpen: boolean) {
      this.isOpen = isOpen;
    },
    async read(item: any) {
      this.isOpen_2 = true;
      this.noti = item;
      if (!item.status) {
        await this.userservice.PutNotify(item._id).then((result: any) => {
          console.log(result);
          if (result.message === 'อัพเดตสถานะการอ่านเรียบร้อยแล้ว') {
            this.userservice.GetNotify();
            console.log('result', result.data);
          } else if (result.status === false) {
            console.log('result', result.data);
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    getNumberNotify() {
      const notify = this.notify.filter((el) => el.status === false);
      if (notify.length > 99) {
        return 99 + '+';
      } else {
        return notify.length;
      }
    },
    close(Check: String) {
      if (Check === 'Detail') {
        this.isOpen_2 = false;
      }
      if (Check === 'Delete') {
        this.isOpenDelete = false;
      }
    },
    CheckDeleteAll(Check: string) {
      this.isOpenDelete = true;
      this.check = Check
      console.log(Check)
    },
    CheckDelete(ID: string, Check: string) {
      this.isOpenDelete = true;
      this.id_noti = ID
      this.check = Check
      console.log(Check)
    },
    async Delete(Check: string) {
      if (Check === 'DeleteByOne') {
        console.log(Check)
        await this.userservice.DeleteNotify(this.id_noti).then((result: any) => {
          console.log(result);
          if (result.message === 'ลบรายการแจ้งเตือนสำเร็จ') {
            const position = this.notify.findIndex((el) => el._id === this.id_noti);
            this.notify.splice(position, 1);
            this.isOpenDelete = false;
            this.isOpen_2 = false;
            this.isOpenToast = true;
          } else if (result.status === false) {
            console.log('result', result.data);
          }
        }).catch((err) => {
          console.log(err);
        })
      }
      if (Check === 'DeleteAll') {
        console.log(Check)
        await this.userservice.DeleteAllNotify().then((result: any) => {
          console.log(result);
          if (result.message === 'ลบรายการแจ้งเตือนทั้งหมดสำเร็จ') {
            this.notify.splice(this.notify.length)
            this.isOpenDelete = false;
            this.isOpen_2 = false;
          } else if (result.status === false) {
            console.log('result', result.data);
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    },
  },
  async mounted() {
    this.loading = true;
    loadingController.create({
      message: 'กำลังโหลดข้อมูล....'
    }).then(a => {
      a.present().then(() => {
        //get me 
        this.userservice.GetMe().then(async (result: any | null) => {
          console.log(result);
          if (result.status === true) {
            this.user = result.data;
            this.progress = result.data.allsale
            this.loading = false
            await this.store.set('user', result.data);
            if (result.data.member_pin === '') {
              this.$router.push('/createpin')
            }
          }
          if (!this.loading) {
            a.dismiss().then(() => console.log());
          }
        })
      });
    });
    this.userservice.GetNotify().then(async (result: any | null) => {
      if (result.status === true) {
        this.notify = result.data;
      }
    }).catch((err) => {
      console.log(err);
    })
  },


})
</script>

<style scoped>
.date {
  color: gray;
  font-size: 14px;
}

ion-modal#example-modal {
  --width: fit-content;
  --min-width: 250px;
  --height: fit-content;
  --border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.548);
  padding: 10px;
}

ion-modal#example-modal h1 {
  margin: 20px 20px 10px 20px;
}

ion-modal#example-modal ion-button {
  margin-bottom: 10px;
  width: 48%;
}

.text-range {
  font-size: 12px;
  text-align: right;
}

ion-range {
  padding-bottom: 0%;
  --bar-background: #eeeeee57;
  --bar-background-active: #bde0fe;
  --bar-height: 8px;
  --bar-border-radius: 8px;
  --knob-background: url('/images/profile.f171d482.jpg') 0 0/100%;
  --knob-size: 25px;
  --pin-color: #fff;
  pointer-events: none;
}

ion-content {
  --background: url('/images/background.jpg') 0 0/100% 100% no-repeat;
  --color: #fff;
  justify-content: center;
  align-items: center;

}

.all-sell-point {
  display: flex;
  width: 100%;
  justify-content: end;
}

ion-toolbar {
  background-color: rgba(0, 0, 0, 0.26);
}

ion-searchbar {
  --background: white;
}

ion-progress-bar {
  height: 0.5rem;
}

.btn-deleteall {
  --background: rgba(0, 0, 0, 0.514) !important;
  --border-radius: 10px;
}

.user-detail {
  display: flex;
  color: white;
  width: 100%;
  padding: 1rem;
  background: rgb(255, 1, 162);
  background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
  border-bottom-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
}

ion-toolbar {
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
  color: white;
}

.avatar-user {
  display: flex;
  width: 100%;
  justify-content: end;
}

ion-toast.custom-toast {
  --background: #25b800;
  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  color: white;
}

.label {
  font-size: small;

}

.badge {
  position: absolute;
  top: 0.0rem;
  right: 0.0rem;
}

ion-icon {
  margin-right: 0.7rem;
  color: white;
  font-size: 20px;
}

.btn-isopen2 {
  padding-left: 5%;
  padding-right: 5%;
}

.icon-delete {
  font-size: 150px;
  color: rgb(255, 224, 50);
}

.icon-notify {
  color: rgb(0, 153, 255);
  font-size: 10px;
}

.btn-close {
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.service {
  padding: 0.2rem;
}
</style>