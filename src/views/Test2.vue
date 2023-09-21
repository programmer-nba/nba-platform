<template>
  <ion-page>
    <!-- Aler data -->
    <ion-alert :is-open="isOpen" :header="DataSearched.languageCode === 'th' ? 'แจ้งเตือน !' : 'Warn !'"
      :sub-header="sentmessage" :message="error_message" :buttons="alertButtons"
      @didDismiss="OpenAlert(false)"></ion-alert>

    <ion-header>
      <ion-toolbar>
        <ion-title>Test 2</ion-title>
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
              <h2>{{ DataSearched.languageCode === 'th' ? 'เที่ยวบินขาออก' : 'Departure Flight' }} {{
                DataSearched.originCode }}</h2>
              <p>{{ DataSearched.languageCode === 'th' ? dateFormatDefaultToTh(DataSearched.departDate) :
                dateFormatDefaultToEn(DataSearched.departDate) }}
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
                <ion-card-subtitle>{{ item.mainAirline.code }}</ion-card-subtitle>
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
                      <ion-card-subtitle>{{ item.mainAirline.code }}</ion-card-subtitle>
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
                        <ion-button style="width: 100%;" @click="depCity(detail.bookingCode)">{{ DataSearched.languageCode
                          === 'th' ? 'เลือก' : 'Choose'
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
  IonCardSubtitle, IonCardContent, IonChip, IonText, IonThumbnail, IonRange, IonAlert
} from '@ionic/vue';
import { Storage } from '@ionic/storage';
import { defineComponent, ref } from 'vue';
import { dayjs, toThaiDateString, dateFormatValue, dateFormatDefaultToTh, dateFormatDefaultToEn, getImage } from '@/services/fun';
import { airplane, chevronDownOutline, chevronUpOutline, man } from "ionicons/icons";

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonListHeader, IonCheckbox,
    IonLabel, IonItem, IonRow, IonCol, IonInput, IonSearchbar, IonSelect, IonSelectOption, IonModal, IonButtons,
    IonDatetime, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonText,
    IonThumbnail, IonRange, IonAlert
  },

  setup() {
    const store = new Storage();
    const isOpen = ref(false);
    const alertButtons = [{ text: 'OK', role: 'confirm', handler: () => { }, },];
    const OpenAlert = (state: boolean) => {
      isOpen.value = state;
    };
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
      alertButtons,
      OpenAlert,
      isOpen
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
      Img: [] as any,
      error_message: '',
      sentmessage: '',
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
    depCity(BookingCode: any) {
      this.store.set('BookingCodeDep', BookingCode)
      this.$router.push({
        path: `/test3`,
      });
    }
  },
  async mounted() {
    this.DataSearched = await this.store.get('DataSearched')
    this.loading = true;
    loadingController.create({
      message: this.DataSearched.languageCode === 'th' ? 'กำลังโหลดข้อมูล....' : 'Loading data....',
    }).then(a => {
      a.present().then(async () => {
        await this.userservice.PostAocFlight(this.DataSearched).then((result: any) => {
          console.log(result);
          if (result.message === 'successful') {
            this.loading = false;
            this.flights = result.data.data.filter((el: any) => el.depCity === this.DataSearched.originCode);
          } else if (result.message === 'failed') {
            this.loading = false;
            this.isOpen = true;
            this.error_message = this.DataSearched.languageCode === 'th' ? 'ขออภัยในความไม่สะดวก' : 'Sorry for the inconvenience';
            this.sentmessage = this.DataSearched.languageCode === 'th' ? 'ค้นหาเที่ยวบินไม่เจอ' : 'Can not find a flight';
            this.alertButtons = [
              {
                text: 'ตกลง',
                role: 'confirm',
                handler: () => {
                  window.location.href = '/test'
                },
              }
            ]
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
      });
    });
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

img {
  width: 15%;
  margin: 5%;
}
</style>