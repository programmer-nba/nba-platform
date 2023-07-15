<template>
  <ion-page>
      <ion-header collapse="condense">
          <ion-toolbar>
          <ion-row>
            <ion-title>โปรไฟล์ฉัน</ion-title>
          </ion-row>
          </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
      <ion-col>
          <ion-avatar class="avatar-user">
            <ion-img  alt="Profile Image" src="/images/profile.f171d482.jpg"/>
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
                  <ion-label class="number-wallet"><h1><strong>{{ walletMonney }}</strong></h1></ion-label>
                  <ion-button href="/tabs/wallet/" class="btn-wallet"><ion-icon :icon="add" style="font-size: 17px;"></ion-icon></ion-button>
                </div>
                <div style="display: flex; justify-content: center;">
                  <ion-button class="history-wallet" fill="clear">
                    <ion-icon :icon="timerOutline" style="font-size: 18px;"></ion-icon>
                    <p style="font-size: 13px;">ประวัติเงินเข้า-ออก</p>
                  </ion-button>
                </div>
          </ion-card>
      </ion-col>
        <ion-col>
      <div class="commission">
          <p style="font-size: 14px; color: rgba(117,9,121,1);" >คอมมิชชั่นสะสม
          <div class="commission-number"  value="0.00"><ion-text style="font-size: 13px;">฿</ion-text> {{ allsale }}</div>
          <ion-button size="small" class="button-out">ถอนรายได้</ion-button>
          <ion-button size="small"  fill="clear">
            <ion-icon :icon="timerOutline"></ion-icon>
            ประวัติ
          </ion-button>
        </p>
        </div>
      </ion-col>
      <ion-col>
      <div class="point">
          <p style="font-size: 14px; color: rgb(78,172,85);" >HAPPY POINT
          <div class="point-number">{{ user?.happy_point}}</div>
          <ion-button size="small" class="button-exchange">แลกรางวัล</ion-button>
          </p>
        </div>
      </ion-col>
        <ion-col>
          <ion-item>
            <ion-label style="color: grey; font-size: 15px;"><p>ตั้งค่า</p></ion-label>
          </ion-item>
          <ion-item href="/user/genaral">
            <ion-label><h3>ข้อมูลทั่วไป</h3></ion-label>
          </ion-item>
          <ion-item href="/tabs/user">
            <ion-label><h3>เข้าสู่ระบบและความปลอดภัย</h3></ion-label>
          </ion-item>
          <ion-item @click="chenHref()" button>
            <ion-label><h3>เปลี่ยนรหัสผ่าน</h3></ion-label>
          </ion-item>
          <ion-item href="/tabs/user" :detail="false">
            <ion-label style="color: red;"><h3>ออกจากระบบ</h3></ion-label>
          </ion-item>
        </ion-col>
      <ExploreContainer name="Tab 3 page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import {   timerOutline, wallet, add  } from 'ionicons/icons';
import { UserService } from "@/services/user";
import  CounterServicePage  from "@/views/CounterServicePage.vue";
import ExploreContainer from '@/components/ExploreContainer.vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent ,
  IonCol, IonGrid, IonRow , IonInput, IonAvatar, IonSearchbar ,
  IonProgressBar, IonImg,IonNav,IonText,IonIcon,IonButton,
  IonItem,IonItemGroup,IonLabel,IonNavLink,IonModal,IonButtons,IonCard

} from '@ionic/vue';
import { defineComponent} from 'vue';

export default defineComponent({
    components: { 
      IonPage, IonHeader, IonToolbar, IonTitle,
       IonContent ,IonCol, IonGrid, IonRow, 
       IonInput, IonAvatar, IonSearchbar,
       IonProgressBar,IonImg,IonNav,IonText,IonIcon,IonButton,
      IonItem,IonItemGroup,IonLabel,IonNavLink,IonModal,
      IonButtons,IonCard
      },
    setup() {
      const userservice = new UserService(null);
      
      return {
        userservice,
        timerOutline,
        wallet,
        add
      }
    },
    data(){
      return {
        loading: false,
        isOpenRef: true,
        user:null,
        allsale:'',
        servicePage:CounterServicePage,
        walletMonney: '',
      }
    },
    methods: {
      chenHref(){
        this.$router.push({
          path: '/pin',
          query: {
            query: 'password',
          }
        });
      },
    },
    async mounted(){
      //get me 
      await this.userservice.GetMe().then((result:any | null)=>{
        console.log(result);
        console.log(this.isOpenRef);
        if(result.status === true){
          this.user = result.data;
          this.allsale =  result.data.allsale.toFixed(2);
          this.walletMonney = result.data.wallet.toFixed(2);
      }
      })
    }
    })
</script>

<style scoped>
ion-toolbar{
  --background: rgb(255,1,162);
  --color: white;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%)  !important;
  }
  .avatar-user{
    margin: auto;
    --border: 4px;
    height : 25% !important;  
    width: 40% !important;  
    border: 3px solid rgba(117,9,121,1) !important;
  }
  h4{
    color: rgba(117,9,121,1);
    font-weight: bold;
    text-align: center;
  }
  .commission-number{
    font-size: 17px; 
    font-weight: bold; 
    color: rgba(117,9,121,1); 
    padding: 2%;
  }
  .commission{
    margin-left: 5%;
    margin-right: 5%;
    padding: 0%;
    border: 1px solid rgba(117,9,121,1) !important;
    border-radius: 5px;
    text-align: center;
  }
  .point{
    margin-left: 5%;
    margin-right: 5%;
    border: 1px solid rgb(78,172,85) !important;
    border-radius: 5px;
    text-align: center;
  }
  .point-number{
    font-size: 17px; 
    font-weight: bold; 
    color: rgb(1, 100, 1);
    padding: 2%;
  }
  .button-exchange{
    --background: rgb(78,172,85);
  }
  .button-out{
    margin-right: 3%;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%)  !important;
  }
  .card-wallet {
    justify-content: center;
    text-align: center;
    width: 283px;
    margin: auto;
    border-radius: 20px;
  }
  .btn-wallet{
    height: 35px !important;
    width: 60px;
    --border-radius: 7px;
    --border-style: solid;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%)  !important;
  }
  .history-wallet{
    height: 30px !important;
    width: auto!important;
    color: black;
  }
  .number-wallet{
    margin-top: 5px;
    margin-left: 8px;
    margin-right: 8px;
    color: black;
    font-weight: bold;
  }
  .icon-wallet{
    font-size:  38px !important;
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
</style>