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
      <div class="commission">
          <p style="font-size: 14px; color: rgba(117,9,121,1);" >คอมมิชชั่นสะสม
          <div class="commission-number"  value="0.00"><ion-text style="font-size: 13px;">฿</ion-text> {{ allsale }}</div>
          <ion-button size="small" class="button-out">ถอนรายได้</ion-button>
          <ion-button size="small"  fill="clear">
            <ion-icon :icon="timeOutline"></ion-icon>
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
            <ion-label style="color: grey; font-size: 15px;">ตั้งค่า</ion-label>
          </ion-item>
          <ion-item href="/tabs/user">
            <ion-label>ข้อมูลทั่วไป</ion-label>
          </ion-item>
          <ion-item href="/pin">
            <ion-label>เข้าสู่ระบบและความปลอดภัย</ion-label>
          </ion-item>
          <ion-item href="/tabs/user" button>
            <ion-label>เปลี่ยนรหัสผ่าน</ion-label>
          </ion-item>
          <ion-item href="/tabs/user" :detail="false">
            <ion-label style="color: red;">ออกจากระบบ</ion-label>
          </ion-item>
        </ion-col>
      <ExploreContainer name="Tab 3 page" />
    </ion-content>
    <ion-modal
    :is-open="CheckOpen()"
    >
    <ion-toolbar>
      <div>
      <ion-buttons slot="start">
        <ion-buttons @click="setOpen(false)">Back</ion-buttons>
      </ion-buttons>
    </div>
    </ion-toolbar>
    <PinPage />
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">

import {  timeOutline  } from 'ionicons/icons';
import { UserService } from "@/services/user";
import  CounterServicePage  from "@/views/CounterServicePage.vue";
import ExploreContainer from '@/components/ExploreContainer.vue';
import PinPage from '@/components/Pin.vue'
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent ,
  IonCol, IonGrid, IonRow , IonInput, IonAvatar, IonSearchbar ,
  IonProgressBar, IonImg,IonNav,IonText,IonIcon,IonButton,
  IonItem,IonItemGroup,IonLabel,IonNavLink,IonModal,IonButtons

} from '@ionic/vue';
import { defineComponent} from 'vue';

export default defineComponent({
    components: { 
      IonPage, IonHeader, IonToolbar, IonTitle,
       IonContent ,IonCol, IonGrid, IonRow, 
       IonInput, IonAvatar, IonSearchbar,
       IonProgressBar,IonImg,IonNav,IonText,IonIcon,IonButton,
      IonItem,IonItemGroup,IonLabel,IonNavLink,PinPage,IonModal,
      IonButtons
      },
    setup() {
      const userservice = new UserService(null);
      
      return {
        userservice,
        timeOutline,
      }
    },
    data(){
      return {
        isOpenRef: true,
        user:null,
        allsale:'',
        servicePage:CounterServicePage
      }
    },
    methods: {
      CheckOpen(){
        if (this.isOpenRef == true) {
          return true;
        } else 
        if (this.isOpenRef == false) {
          this.isOpenRef = true
          return
        }
      },
      setOpen(isOpenRef: boolean){
        this.isOpenRef = isOpenRef;
        if (this.isOpenRef == false){
          this.$router.push({
              path: 'home',
            })
            console.log(this.isOpenRef)
        } 
      }
    },
    async mounted(){
      //get me 
      await this.userservice.GetMe().then((result:any | null)=>{
        console.log(result);
        if(result.status=== true){
          this.user = result.data;
          this.allsale =  result.data.allsale.toFixed(2);
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
  ion-icon {
  font-size: 15px;
  }
  ion-item::part(detail-icon) {
    color: grey;
    opacity: 1;
    font-size: 20px;
  }
</style>