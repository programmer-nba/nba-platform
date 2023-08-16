<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Test 2</ion-title>
        <IonButtons slot="start">
          <ion-button @click="$router.go(-1)">กลับ</ion-button>
        </IonButtons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-row>
        <ion-col size="12" v-for="(item, index) in flights" :key="index">
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ item.mainAirline.code }}</ion-card-title>
              <ion-card-subtitle>{{ item.mainAirline.name }}</ion-card-subtitle>
            </ion-card-header>
            <ion-row style="padding: 5%;">
              <ion-col size="12">
                {{ item.depCity }} ---> {{ item.arrCity }} <br />
                <ion-text>ราคา <s>฿ {{ item.fare.strikethroughTotalPrice }}</s> <ion-chip size="small" color="danger">{{
                  item.discountTag.promotionText }}</ion-chip></ion-text> <br />
                <ion-text style="color: rgb(65, 65, 65); font-size: 16px;">ราคารวม ฿ {{ item.price }}
                  <small>/คน</small></ion-text>
                <ion-button @click="CheckDetail(index, Check === index ? 'Close' : 'Open')"
                  style="margin-left: 22%;">เลือก <ion-icon
                    :icon="Check === index ? chevronUpOutline : chevronDownOutline"></ion-icon></ion-button>
              </ion-col>
            </ion-row>

            <ion-row v-if="Check === index">
              <ion-col size="12" v-for="detail in item.Flight_SegRef1 || item.Flight_SegRef2">
                <ion-card v-for="data in detail.flightDetails">
                  <ion-card-header>
                    <ion-card-title>{{ item.mainAirline.code }}</ion-card-title>
                    <ion-card-subtitle>{{ item.mainAirline.name }}</ion-card-subtitle>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-row>
                      <ion-col>
                        <ion-text>{{ data.depDisplayDateTime.displayTime }}</ion-text>
                      </ion-col>
                      <ion-col style="text-align: end;">
                        <ion-text>{{ data.arrDisplayDateTime.displayTime }}</ion-text>
                      </ion-col>
                    </ion-row>
                    <ion-range :value="100">
                      <ion-text slot="start">({{ data.depCity.code }})</ion-text>
                      <ion-icon slot="start" :icon="airplane" class="icon-air"></ion-icon>
                      <ion-text slot="end">({{ data.arrCity.code }})</ion-text>
                    </ion-range>
                    <ion-row>
                      <ion-col style="font-size: 12px;">
                        <ion-text>{{ data.depCity.name }}</ion-text>
                      </ion-col>
                      <ion-col style="text-align: end; font-size: 12px;">
                        <ion-text>{{ data.arrCity.name }}</ion-text>
                      </ion-col>
                      <ion-col size="12">
                        <ion-button style="width: 100%;">เลือก</ion-button>
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
  IonCardSubtitle, IonCardContent, IonChip, IonText, IonThumbnail, IonRange
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { dayjs, toThaiDateString, dateFormatValue } from '@/services/fun';
import { airplane, chevronDownOutline, chevronUpOutline,  man } from "ionicons/icons";

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonListHeader, IonCheckbox,
    IonLabel, IonItem, IonRow, IonCol, IonInput, IonSearchbar, IonSelect, IonSelectOption, IonModal, IonButtons,
    IonDatetime, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonText,
    IonThumbnail, IonRange
  },

  setup() {
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
      airplane
    };
  },
  data() {
    return {
      loading: false,
      flights: [] as any,
      Check: null as any,
    }
  },
  methods: {
    CheckDetail(Id: any, Check: string) {
      if (Check === 'Open') {
        this.Check = Id;
      } else if (Check === 'Close') {
        this.Check = !Id;
      }
    }
  },
  async mounted() {
    this.loading = true;
    loadingController.create({
      message: 'กำลังโหลดข้อมูล....'
    }).then(a => {
      a.present().then(() => {
        this.userservice.PostAocFlight(this.$route.query).then((result: any) => {
          console.log(result);
          if (result.message === 'successful') {
            this.loading = false;
            this.flights = result.data.data.flights;
            console.log(this.flights);
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
.icon-air{
  font-size: 20px;
  color: #4b037a;
}
ion-range {
  pointer-events: none;
}
</style>