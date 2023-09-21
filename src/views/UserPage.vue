<template>
  <ion-page>
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title>โปรไฟล์ฉัน</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-col>
        <ion-avatar class="avatar-user">
          <ion-img alt="Profile Image" src="/images/profile.f171d482.jpg" />
        </ion-avatar>
        <p style="text-align: center;">
        <h4>{{ user?.name }}</h4>
        <ion-text style="font-weight: bold;">Crad ID:</ion-text> {{ user?.card_number }}
        </p>
      </ion-col>
      <ion-col>
        <ion-card class="card-wallet">
          <div style="display: flex; justify-content: center;">
            <h5 style="color: black; font-size: 17px;">จำนวนเงินคงเหลือ</h5>
          </div>
          <div style="display: flex; justify-content: center;">
            <ion-icon class="icon-wallet" :icon="wallet" slot="start"></ion-icon>
            <ion-label class="number-wallet">
              <h1><strong>{{ walletMonney }}</strong></h1>
            </ion-label>
            <ion-button href="/wallet/topupwallet" class="btn-wallet"><ion-icon :icon="add"
                style="font-size: 17px;"></ion-icon></ion-button>
          </div>
          <div style="display: flex; justify-content: center;">
            <ion-button class="history-wallet" fill="clear" href="/wallet/historywallet">
              <ion-icon :icon="timerOutline" style="font-size: 18px;"></ion-icon>
              <p style="font-size: 13px;">ประวัติเงินเข้า-ออก</p>
            </ion-button>
          </div>
        </ion-card>
      </ion-col>
      <ion-col>
        <div class="commission">
          <p style="font-size: 14px; ">คอมมิชชั่นสะสม
          <div class="commission-number" value="0.00"><ion-text style="font-size: 13px;">฿</ion-text> {{ allsale }}</div>
          <ion-button size="small" class="button-out" href="/withdrawcommission">ถอนรายได้</ion-button>
          <ion-button size="small" fill="clear" href="/user/withdraw/history" style="color: white;">
            <ion-icon :icon="timerOutline"></ion-icon>
            ประวัติ
          </ion-button>
          </p>
        </div>
      </ion-col>
      <ion-col>
        <div class="point">
          <p style="font-size: 14px; color: rgb(78,172,85);">HAPPY POINT
          <div class="point-number">{{ user?.happy_point }}</div>
          <ion-button size="small" class="button-exchange">แลกรางวัล</ion-button>
          </p>
        </div>
      </ion-col>
      <ion-col>
        <ion-item>
          <ion-label style="color: rgb(211, 211, 211); font-size: 15px;">
            <ion-text> ตั้งค่า</ion-text>
          </ion-label>
        </ion-item>
        <ion-item button @click="$router.push(`/user/genaral`)">
          <ion-label>
            <h3>ข้อมูลทั่วไป</h3>
          </ion-label>
        </ion-item>
        <ion-item button href="/user/security">
          <ion-label>
            <h3>เข้าสู่ระบบและความปลอดภัย</h3>
          </ion-label>
        </ion-item>
        <ion-item @click="chenHref('password')" button>
          <ion-label>
            <h3>เปลี่ยนรหัสผ่าน</h3>
          </ion-label>
        </ion-item>
        <ion-item @click="chenHref('pin')" button>
          <ion-label>
            <h3>เปลี่ยนรหัสผ่าน PIN</h3>
          </ion-label>
        </ion-item>
        <ion-item @click="logout()" :detail="false">
          <ion-label style="color: red;">
            <h3>ออกจากระบบ</h3>
          </ion-label>
        </ion-item>
      </ion-col>
    </ion-content>

    <ion-modal :is-open="isOpen" id="example-modal" ref="modal">
      <ion-row>
        <ion-col size="12">
          <h1>ออกจากระบบ</h1>
        </ion-col>
        <ion-col size="12">
          <p>คุณต้องการออกจากระบบ?</p>
        </ion-col>
        <ion-col>
          <ion-button class="btn" @click="ConfirmeLogout()">ออกจากระบบ</ion-button>
        </ion-col>
        <ion-col>
          <ion-button fill="outline">ยกเลิก</ion-button>
        </ion-col>
      </ion-row>
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">

import { timerOutline, wallet, add, notificationsOutline } from 'ionicons/icons';
import { UserService } from "@/services/user";
import CounterServicePage from "@/views/CounterServicePage.vue";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCol, IonGrid, IonRow, IonInput, IonAvatar, IonSearchbar,
  IonProgressBar, IonImg, IonNav, IonText, IonIcon, IonButton,
  IonItem, IonItemGroup, IonLabel, IonNavLink, IonModal, IonButtons, IonCard, loadingController

} from '@ionic/vue';
import { defineComponent, ref, } from 'vue';

export default defineComponent({
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonCol, IonGrid, IonRow,
    IonInput, IonAvatar, IonSearchbar,
    IonProgressBar, IonImg, IonNav, IonText, IonIcon, IonButton,
    IonItem, IonItemGroup, IonLabel, IonNavLink, IonModal,
    IonButtons, IonCard
  },
  setup() {
    const baseUrl: string = import.meta.env.VITE_APP_API;
    // const baseUrl: string = "http://localhost:5173"
    const userservice = new UserService(null);
    const isOpen = ref(false);
    const setOpen = (state: boolean) => {
      isOpen.value = state;;
    };
    return {
      userservice,
      timerOutline,
      wallet,
      add,
      isOpen,
      setOpen,
      baseUrl,
      notificationsOutline
    }
  },
  data() {
    return {
      loading: false,
      isOpenRef: true,
      user: null as any,
      allsale: '',
      servicePage: CounterServicePage,
      walletMonney: '',
    }
  },
  watch: {
    '$route.query.data': {
      handler: function (newQuery) {
        location.reload();
      },
    },
  },
  methods: {
    chenHref(Check: String) {
      if (Check === 'password') {
        this.$router.push({
          path: '/pin',
          query: {
            query: 'password',
          }
        });
      }
      if (Check === 'pin') {
        this.$router.push({
          path: '/pin',
          query: {
            query: 'createpin',
          }
        });
      }
    },
    logout() {
      this.isOpen = true
    },
    async ConfirmeLogout() {
      await this.userservice.Logout(null).then((result: any) => {
        console.log(result)
        if (result.message === 'Logout successful') {
          this.isOpen = false
          console.log('result', result.data);
          window.location.href = this.baseUrl;
        } else if (result.message === 'Logout failed') {
          console.log('result', result.data);
        }
      });
    },
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
            this.user = result.data;
            this.loading = false
            this.allsale = result.data.allsale.toFixed(2);
            this.walletMonney = result.data.wallet.toFixed(2);
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
ion-toolbar {
  --background: rgb(255, 1, 162);
  --color: white;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.btn {
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.avatar-user {
  margin: auto;
  --border: 4px;
  height: 25% !important;
  width: 40% !important;
  border: 3px solid rgba(117, 9, 121, 1) !important;
}

h4 {
  font-weight: bold;
  text-align: center;
}

.commission-number {
  font-size: 17px;
  font-weight: bold;
  padding: 2%;
}

.commission {
  margin-left: 5%;
  margin-right: 5%;
  padding: 0%;
  border: 1px solid rgb(255, 255, 255) !important;
  border-radius: 5px;
  text-align: center;
}

.point {
  margin-left: 5%;
  margin-right: 5%;
  border: 1px solid rgb(78, 172, 85) !important;
  border-radius: 5px;
  text-align: center;
}

.point-number {
  font-size: 17px;
  font-weight: bold;
  color: rgb(1, 100, 1);
  padding: 2%;
}

.button-exchange {
  --background: rgb(78, 172, 85);
}

.button-out {
  margin-right: 3%;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

ion-item::part(native) {
  background: #00000000;
  color: #fff;
}

.card-wallet {
  justify-content: center;
  text-align: center;
  width: 283px;
  margin: auto;
  border-radius: 20px;
}

.btn-wallet {
  height: 35px !important;
  width: 60px;
  --border-radius: 7px;
  --border-style: solid;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}

.history-wallet {
  height: 30px !important;
  width: auto !important;
  color: black;
}

.number-wallet {
  margin-top: 5px;
  margin-left: 8px;
  margin-right: 8px;
  color: black;
  font-weight: bold;
}

.icon-wallet {
  font-size: 38px !important;
  color: black;
}

ion-icon {
  font-size: 15px;
}

ion-item::part(detail-icon) {
  color: grey;
  opacity: 1;
  font-size: 20px;
}

ion-modal#example-modal {
  --width: fit-content;
  --min-width: 300px;
  --height: fit-content;
  --border-radius: 6px;
  padding: 25px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  text-align: center;
}

ion-modal#example-modal h1 {
  margin: 20px 20px 10px 20px;
  text-align: center;
  font-weight: bold;
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
</style>