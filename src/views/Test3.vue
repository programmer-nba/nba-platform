<template>
  <ion-page>
    <ion-toast :isOpen="Toast" message="Successful!" :duration="3000" position="bottom" class="custom-toast"></ion-toast>
    <ion-header>
      <ion-toolbar>
        <ion-title>Test 3</ion-title>
        <IonButtons slot="start">
          <ion-button @click="$router.go(-1)">{{ DataSearched.languageCode === 'th' ? 'กลับ' : 'Back' }}</ion-button>
        </IonButtons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-row>
        <ion-col>
          <ion-item lines="none">
            <ion-label>
              <h2>{{ DataSearched.languageCode === 'th' ? 'เที่ยวบินขากลับ' : 'Return Flight' }} {{
                DataSearched.destinationCode }}</h2>
              <p>{{ DataSearched.languageCode === 'th' ? dateFormatDefaultToTh(DataSearched.returnDate) :
                dateFormatDefaultToEn(DataSearched.returnDate) }}
                {{ DataSearched.languageCode === 'th' ? `| ผู้โดยสาร ${(DataSearched.adult + DataSearched.child +
                  DataSearched.infant)} คน` : `| ${(DataSearched.adult + DataSearched.child + DataSearched.infant)}
                Passenger`}} </p>
            </ion-label>
          </ion-item>
        </ion-col>
        <ion-col size="12" v-for="(item, index) in flights" :key="index">
          <ion-card v-for="img in Img.filter((el: any) => el.Code === item.mainAirline.code)">
            <ion-card-header>
              <ion-card-title>{{ item.mainAirline.name }}</ion-card-title>
              <ion-item lines="none">
                <ion-card-subtitle style="padding-right: 5%;">{{ item.mainAirline.code }}</ion-card-subtitle>
                <img alt="Silhouette of mountains" style="width: 20%; height: auto;" :src="getImage(img.imageUrl)" />
              </ion-item>
            </ion-card-header>
            <ion-row style="padding: 5%;">
              <ion-text>{{ DataSearched.languageCode === 'th' ? 'ราคา' : 'Price' }} <s>฿ {{
                item.strikethroughTotalPrice }}</s> <ion-chip size="small" color="danger">{{
    item.promotionText }}</ion-chip></ion-text> <br />
              <ion-text style="color: rgb(65, 65, 65); font-size: 16px;">{{ DataSearched.languageCode === 'th' ?
                'ราคา'
                : 'Price' }} ฿ {{ item.price }}
                <small>/{{ DataSearched.languageCode === 'th' ? 'คน' : 'Person' }}</small></ion-text>
              <ion-col style="text-align: center;" size="12">
                <ion-button @click="CheckDetail(index, Check === index ? 'Close' : 'Open')">{{
                  DataSearched.languageCode
                  === 'th' ? 'เลือก' : 'Choose' }}
                  <ion-icon :icon="Check === index ? chevronUpOutline : chevronDownOutline"></ion-icon></ion-button>
              </ion-col>
            </ion-row>
            <ion-row v-if="Check === index">
              <ion-col size="12">
                <ion-card v-for="detail in item.Details">
                  <ion-card-header>
                    <ion-card-title>{{ item.mainAirline.name }}</ion-card-title>
                    <ion-item lines="none">
                      <ion-card-subtitle style="padding-right: 5%;">{{ item.mainAirline.code }}</ion-card-subtitle>
                      <img alt="Silhouette of mountains" style="width: 20%; height: auto;"
                        :src="getImage(img.imageUrl)" />
                    </ion-item>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-row>
                      <ion-col>
                        <ion-text>{{ detail.timedep }}</ion-text>
                      </ion-col>
                      <ion-col style="text-align: end;">
                        <ion-text>{{ detail.timearr }}</ion-text>
                      </ion-col>
                    </ion-row>
                    <ion-range :value="100">
                      <ion-text slot="start">({{ detail.depcity }})</ion-text>
                      <ion-icon slot="start" :icon="airplane" class="icon-air"></ion-icon>
                      <ion-text slot="end">({{ detail.arrcity }})</ion-text>
                    </ion-range>
                    <ion-row>
                      <ion-col style="font-size: 12px;">
                        <ion-text>{{ detail.depCityname }}</ion-text>
                      </ion-col>
                      <ion-col style="text-align: end; font-size: 12px;">
                        <ion-text>{{ detail.arrcityname }}</ion-text>
                      </ion-col>
                      <ion-col size="12">
                        <ion-button style="width: 100%;"  id="open-toast" @click="sendData(detail.bookingCode)">{{
                          DataSearched.languageCode === 'th' ? 'เลือก' : 'Choose'
                        }}</ion-button>
                      </ion-col>
                    </ion-row>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-content>

  </ion-page>
</template>
  
<script lang="ts">
import { UserService } from "@/services/user";
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonListHeader, IonCheckbox, IonItem, alertController, IonRow, IonCol,
  IonInput, IonSearchbar, loadingController, IonSelect, IonSelectOption, IonModal, IonButtons, modalController, IonDatetime, IonIcon, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonChip, IonText, IonThumbnail, IonRange, IonToast, toastController 
} from '@ionic/vue';
import { Storage } from '@ionic/storage';
import { defineComponent } from 'vue';
import { dayjs, toThaiDateString, dateFormatValue, dateFormatDefaultToTh, dateFormatDefaultToEn, getImage } from '@/services/fun';
import { airplane, chevronDownOutline, chevronUpOutline, man } from "ionicons/icons";

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonListHeader, IonCheckbox,
    IonLabel, IonItem, IonRow, IonCol, IonInput, IonSearchbar, IonSelect, IonSelectOption, IonModal, IonButtons,
    IonDatetime, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonText,
    IonThumbnail, IonRange, IonToast
  },

  setup() {
    const store = new Storage();
    store.create();
    const userservice = new UserService(null);
    return {
      userservice,
      alertController,
      dayjs,
      toThaiDateString,
      loadingController,
      dateFormatValue,
      man,
      chevronDownOutline,
      chevronUpOutline,
      airplane,
      store,
      dateFormatDefaultToTh,
      dateFormatDefaultToEn,
      getImage,
      toastController
    };
  },
  data() {
    return {
      loading: false,
      flights: [] as any,
      Check: null as any,
      ReloadPage: true,
      DataSearched: [] as any,
      departFligts: [] as any,
      returnFligts: [] as any,
      CheckData: [] as any,
      BokingCode: [] as any,
      ID: '' as any,
      Img: [] as any,
      Toast: false,
    }
  },
  methods: {
    CheckDetail(Id: any, Check: string) {
      if (Check === 'Open') {
        this.Check = Id;
      } else if (Check === 'Close') {
        this.Check = !Id;
      }
    },
    sendData(Booking: any) {
      const data = {
        pgSearchOID: this.ID,
        tripType: this.DataSearched.tripType, //R=Round trip / O = One way
        origin: this.DataSearched.originCode, //The IATA city code or airport code
        destination: this.DataSearched.destinationCode, //the IATA city code or airport code
        adult: this.DataSearched.adult, //Age > 12
        child: this.DataSearched.destinationCode, //Age 2-12
        infant: this.DataSearched.destinationCode, //Age <2
        svcClass: this.DataSearched.svcClass, //Y=Economy P = Premium Economy C = Business F = First
        S1: this.BokingCode,
        S2: Booking,
        bMultiTicket_Fare: true,
        languageCode: this.DataSearched.languageCode
      }
      this.loading = true;
      loadingController.create({
        message: this.DataSearched.languageCode === 'th' ? 'กำลังโหลดข้อมูล....' : 'Loading data....',
      }).then(a => {
        a.present().then(async () => {
          this.userservice.PostBooking(data).then(async(result: any) => {
            console.log(result);
            if (result.message === 'successful') {
              this.loading = false;
              this.Toast = true;
            }
            if (!this.loading) {
              a.dismiss().then(() => console.log());
            }
          })
        });
      });
    }
  },
  async mounted() {
    this.DataSearched = await this.store.get('DataSearched')
    this.BokingCode = await this.store.get('BookingCodeDep')
    this.loading = true;
    loadingController.create({
      message: this.DataSearched.languageCode === 'th' ? 'กำลังโหลดข้อมูล....' : 'Loading data....',
    }).then(a => {
      a.present().then(async () => {
        await this.userservice.PostAocFlight(this.DataSearched).then((result: any) => {
          console.log(result);
          if (result.message === 'successful') {
            this.loading = false;
            this.flights = result.data.data.filter((el: any) => el.depCity === this.DataSearched.destinationCode);
            this.ID = result.data.pgSearchOID;
          }
          if (!this.loading) {
            a.dismiss().then(() => console.log());
          }
        })
        await this.userservice.GetAirline().then((result: any) => {
          console.log(result);
          if (result.message === 'successful') {
            this.loading = false;
            this.Img = result.data;
          }
          if (!this.loading) {
            a.dismiss().then(() => console.log());
          }
        })
      })
    })
  }
});
</script>
  
<style scoped>
.icon-air {
  font-size: 20px;
  color: #4b037a;
}

ion-range {
  pointer-events: none;
}
ion-toast.custom-toast {
    --background: #35a701;
    --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
    --color: #ffffff;
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