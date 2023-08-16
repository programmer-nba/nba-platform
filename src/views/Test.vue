<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Test</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-row style="padding: 5%;">
        <ion-col size="12">
          <ion-button @click="Check('R')" value="R" :class="flight.tripType === 'R' ? 'color-main' : 'color-try'"
            shape="round">ไป-กลับ</ion-button>
          <ion-button @click="Check('O')" value="O" :class="flight.tripType === 'O' ? 'color-main' : 'color-try'"
            shape="round">เที่ยวเดี่ยว</ion-button>
        </ion-col>
        <ion-col size="12">
          <ion-button @click="CheckLanguage('th')" value="th"
            :class="flight.languageCode === 'th' ? 'color-main' : 'color-try'" shape="round">TH</ion-button>
          <ion-button @click="CheckLanguage('en')" value="en"
            :class="flight.languageCode === 'en' ? 'color-main' : 'color-try'" shape="round">EN</ion-button>
        </ion-col>
        <ion-col size="12">
          <ion-list :inset="true">
            <ion-item :button="true" :detail="false" id="select-fruits">
              <p>ประเทศ</p>
              <div style="color: grey;" slot="end" id="selected-fruits" v-if="!selectedCountry">ยังไม่ได้เลือก</div>
              <div slot="end" id="selected-fruits" v-if="selectedCountry">{{ selectedCountry }}</div>
            </ion-item>
          </ion-list>
          <ion-list :inset="true">
            <ion-item :button="true" :detail="false" id="selected-Origin">
              <p>ต้นทาง</p>
              <div style="color: grey;" slot="end" id="selected-fruits" v-if="!flight.originCode">ยังไม่ได้เลือก</div>
              <div slot="end" id="selected-Origin" v-if="flight.originCode">{{ flight.originCode }}</div>
            </ion-item>
          </ion-list>
          <ion-list :inset="true">
            <ion-item :button="true" :detail="false" id="selected-Destination">
              <p>ปลายทาง</p>
              <div style="color: grey;" slot="end" id="selected-fruits" v-if="!flight.destinationCode">ยังไม่ได้เลือก
              </div>
              <div slot="end" id="selected-Destination" v-if="flight.destinationCode">{{ flight.destinationCode }}</div>
            </ion-item>
          </ion-list>
          <ion-list :inset="true">
            <ion-item :button="true" :detail="false" id="departDate">
              <p>วันที่ไป</p>
              <div slot="end" id="departDate">{{ toThaiDateString(flight.departDate) }}</div>
            </ion-item>
            <ion-item :button="true" :detail="false" id="returnDate" v-if="flight.tripType === 'R'">
              <p>วันที่กลับ</p>
              <div slot="end" id="returnDate" v-if="!flight.returnDate">-</div>
              <div slot="end" id="returnDate" v-if="flight.returnDate">{{ flight.returnDate }}</div>
            </ion-item>
          </ion-list>
          <ion-list :inset="true">
            <ion-item>
              <ion-select label="ชั้นโดยสาร" v-model="flight.svcClass" placeholder="ยังไม่ได้เลือก" ok-text="ยืนยัน"
                cancel-text="ยกเลิก">
                <ion-select-option value="Y">ชั้นประหยัด</ion-select-option>
                <ion-select-option value="P">ชั้นประหยัดพรีเมียม</ion-select-option>
                <ion-select-option value="C">ชั้นธุรกิจ</ion-select-option>
                <ion-select-option value="F">ชั้นหนึ่ง</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
          <ion-list :inset="true">
            <ion-item :button="true" :detail="false" id="passenger">
              <ion-label>
                <h2>ผู้โดยสาร</h2>
                <p>{{ passenger }}</p>
              </ion-label>
              <ion-icon :icon="man" slot="end"></ion-icon>
            </ion-item>
          </ion-list>
          <ion-button class="btn-search" @click="getData()">ค้นหา</ion-button>

          <!-- Modal Country  -->
          <ion-modal trigger="select-fruits" ref="modal">
            <ion-toolbar style="text-align: center;">
              ค้นหาประเทศ
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">ปิด</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-content>
              <ion-searchbar placeholder="ค้นหาประเทศ" @ionInput="handleInput($event)"></ion-searchbar>
              <ion-list v-if="CheckInput != ''">
                <ion-item v-for="result in searchedItem" button :key="result._id"
                  @click="InputCountry(result.Code, result.Name)">
                  <p>{{ result.Name }}</p>
                </ion-item>
              </ion-list>
            </ion-content>
          </ion-modal>

          <!-- Modal Origin  -->
          <ion-modal trigger="selected-Origin" ref="modal">
            <ion-toolbar style="text-align: center;">
              ต้นทาง
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">ปิด</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-content>
              <ion-searchbar placeholder="ค้นหาจังหวัด/เมือง" @ionInput="handleInputOrigin($event)"></ion-searchbar>
              <ion-list v-if="CheckInput != ''">
                <ion-item v-for="result in searchedCityOrigin" button :key="result._id"
                  @click="InputOrigin(result.Code, result.Name)">
                  <p>{{ result.Name }}</p>
                </ion-item>
              </ion-list>
            </ion-content>
          </ion-modal>


          <!-- Modal Destination  -->
          <ion-modal trigger="selected-Destination" ref="modal">
            <ion-toolbar style="text-align: center;">
              ปลายทาง
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">ปิด</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-content>
              <ion-searchbar placeholder="ค้นหาจังหวัด/เมือง" @ionInput="handleInputDestination($event)"></ion-searchbar>
              <ion-list v-if="CheckInput != ''">
                <ion-item v-for="result in searchedCityDestination" button :key="result._id"
                  @click="InputDestination(result.Code, result.Name)">
                  <p>{{ result.Name }}</p>
                </ion-item>
              </ion-list>
            </ion-content>
          </ion-modal>

          <!-- Modal departDate  -->
          <ion-modal trigger="departDate" ref="modal" :initial-breakpoint="1" :breakpoints="[0, 1]"
            class="ion-modal-dete">
            <ion-toolbar style="text-align: center;">
              วันที่เดินทาง
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">ปิด</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <div class="block">
              <ion-content class="content">
                <ion-row>
                  <ion-col>
                    <ion-datetime presentation="date" :value="dateFormatValue(flight.departDate)"
                      @click="AddDete($event, 'departDate')">
                      <ion-buttons slot="buttons">
                        <ion-button color="primary" @click="AddData('depart')">ยืนยัน</ion-button>
                      </ion-buttons>
                    </ion-datetime>
                  </ion-col>
                </ion-row>
              </ion-content>
            </div>
          </ion-modal>

          <!-- Modal departDate  -->
          <ion-modal trigger="returnDate" ref="modal" :initial-breakpoint="1" :breakpoints="[0, 1]"
            class="ion-modal-dete">
            <ion-toolbar style="text-align: center;">
              วันที่เดินทาง
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">ปิด</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <div class="block">
              <ion-content class="content">
                <ion-row>
                  <ion-col>
                    <ion-datetime presentation="date" :highlighted-dates="highlightedDates"
                      @click="AddDete($event, 'returnDate')">
                      <ion-buttons slot="buttons">
                        <ion-button color="primary" @click="AddData('return')">ยืนยัน</ion-button>
                      </ion-buttons>
                    </ion-datetime>
                  </ion-col>
                </ion-row>
              </ion-content>
            </div>
          </ion-modal>

          <!-- Modal PassenGer  -->
          <ion-modal trigger="passenger" ref="modal" :initial-breakpoint="1" :breakpoints="[0, 1]" class="ion-modal-dete">
            <ion-toolbar style="text-align: center;">
              เลือกผู้โดยสาร
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">ปิด</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <div class="block-class">
              <ion-content class="content">
                <ion-row>
                  <ion-col style="color: black;">
                    <ion-item>
                      <ion-label>
                        <h3>ผู้ใหญ่</h3>
                        <p>อายุ 12 ปีขึ้นไป</p>
                      </ion-label>
                      <ion-button fill="outline" @click="flight.adult--"
                        :disabled="flight.adult === 0 ? true : false">-</ion-button>
                      <p style="margin: 5%;">{{ flight.adult }}</p>
                      <ion-button fill="outline" @click="flight.adult++">+</ion-button>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>เด็ก</h3>
                        <p>อายุ 2-11</p>
                      </ion-label>
                      <ion-button fill="outline" @click="flight.child--"
                        :disabled="flight.child === 0 ? true : false">-</ion-button>
                      <p style="margin: 5%;">{{ flight.child }}</p>
                      <ion-button fill="outline" @click="flight.child++">+</ion-button>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>ทารก</h3>
                        <p>ต่ำกว่า 2 ปี</p>
                      </ion-label>
                      <ion-button fill="outline" @click="flight.infant--"
                        :disabled="flight.infant === 0 ? true : false">-</ion-button>
                      <p style="margin: 5%;">{{ flight.infant }}</p>
                      <ion-button fill="outline" @click="flight.infant++">+</ion-button>
                    </ion-item>
                    <ion-button style="width: 99%;" @click="AddPassebGer()">ยืนยัน</ion-button>
                  </ion-col>
                </ion-row>
              </ion-content>
            </div>
          </ion-modal>
        </ion-col>
      </ion-row>
    </ion-content>

  </ion-page>
</template>
  
<script lang="ts">
import { UserService } from "@/services/user";
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonListHeader, IonCheckbox, IonItem, alertController, IonRow, IonCol,
  IonInput, IonSearchbar, loadingController, IonSelect, IonSelectOption, IonModal, IonButtons, modalController, IonDatetime, IonIcon
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { dayjs, toThaiDateString, dateFormatValue } from '@/services/fun';
import { flash, man } from "ionicons/icons";

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonList,
    IonListHeader,
    IonCheckbox,
    IonLabel,
    IonItem,
    IonRow,
    IonCol,
    IonInput,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonModal,
    IonButtons,
    IonDatetime,
    IonIcon
  },

  setup() {
    const city = [] as any;
    const country = [] as any;
    const searchedCityOrigin = ref(city);
    const searchedCityDestination = ref(city);
    const searchedItem = ref(country)
    const userservice = new UserService(null);
    const datetime = ref();
    const reset = () => datetime.value.$el.reset();
    return {
      alertController,
      dayjs,
      toThaiDateString,
      loadingController,
      userservice,
      country,
      searchedItem,
      modalController,
      searchedCityOrigin,
      searchedCityDestination,
      city,
      reset,
      dateFormatValue,
      man
    };
  },
  data() {
    return {
      loading: false,
      scanActive: false,
      flight: {
        tripType: 'R',
        originCode: '',
        destinationCode: '',
        svcClass: 'Y',
        directFlight: false,
        departDate: new Date() as any,
        returnDate: '' as any,
        adult: 1,
        child: 0,
        infant: 0,
        languageCode: 'th',
      },
      CheckInput: '',
      selectedCountry: '',
      dete1: '' as any,
      dete2: '' as any,
      checkformdate: '',
      passenger: '',
      highlightedDates: [
        {
          date: '',
          textColor: 'rgb(68, 10, 184)',
          backgroundColor: 'rgb(211, 200, 229)',
        },
        {
          date: '',
          textColor: 'rgb(68, 10, 184)',
          backgroundColor: 'rgb(211, 200, 229)',
        },
      ]
    }
  },
  methods: {
    AddData(Check: string) {
      if (Check === 'depart') {
        const d = new Date(dateFormatValue(this.dete1));
        this.flight.departDate = d
        this.highlightedDates[0].date = dateFormatValue(this.flight.departDate) as any
        modalController.dismiss();
      }
      if (Check === 'return') {
        const d = new Date(dateFormatValue(this.dete2));
        this.flight.returnDate = toThaiDateString(d)
        this.highlightedDates[1].date = dateFormatValue(this.flight.returnDate) as any
        modalController.dismiss();
      }
    },
    AddPassebGer() {
      if (this.flight.adult > 0 && this.flight.child > 0 && this.flight.infant > 0) {
        this.passenger = `ผู้ใหญ่ ${this.flight.adult} คน ,เด็ก ${this.flight.child} คน ,ทารก ${this.flight.infant} คน`
        console.log(this.passenger)
      } else
        if (this.flight.adult > 0 && this.flight.child > 0) {
          this.passenger = `ผู้ใหญ่ ${this.flight.adult} คน ,เด็ก ${this.flight.child} คน`
        } else
          if (this.flight.adult > 0) {
            this.passenger = `ผู้ใหญ่ ${this.flight.adult} คน`
          }
      modalController.dismiss();
    },
    AddDete(v: any, Check: string) {
      if (Check === 'departDate') {
        if (v.srcElement.activePartsClone) {
          const day = v.srcElement.activePartsClone.day;
          const month = v.srcElement.activePartsClone.month;
          const year = v.srcElement.activePartsClone.year;
          this.dete1 = [year, month, day];
        }
      } else if (Check === 'returnDate') {
        if (v.srcElement.activePartsClone) {
          const day = v.srcElement.activePartsClone.day;
          const month = v.srcElement.activePartsClone.month;
          const year = v.srcElement.activePartsClone.year;
          this.dete2 = [year, month, day];
        }
      }
    },
    CheckLanguage(Check: string) {
      this.flight.languageCode = Check
      this.loading = true;
      loadingController.create({
        message: 'กำลังโหลดข้อมูล....'
      }).then(a => {
        a.present().then(() => {
          this.highlightedDates[0].date = dateFormatValue(this.flight.departDate) as any
          this.userservice.GetCountry(this.flight.languageCode).then((result: any) => {
            console.log(result);
            if (result.message === 'successful') {
              this.loading = false;
              this.country = result.data;
            }
            if (!this.loading) {
              a.dismiss().then(() => console.log());
            }
          })
        });
      });
    },
    Check(Check: string) {
      this.flight.tripType = Check;
    },
    handleInput(event: any) {
      const query = event.target.value;
      this.CheckInput = query;
      this.searchedItem = this.country.filter((el: any) => el.Name.toLowerCase().indexOf(query.toLowerCase()) > -1)
    },
    handleInputOrigin(event: any) {
      const query = event.target.value;
      this.CheckInput = query;
      this.searchedCityOrigin = this.city.filter((el: any) => el.Name.toLowerCase().indexOf(query.toLowerCase()) > -1)
    },
    handleInputDestination(event: any) {
      const query = event.target.value;
      this.CheckInput = query;
      this.searchedCityDestination = this.city.filter((el: any) => el.Name.toLowerCase().indexOf(query.toLowerCase()) > -1)
    },
    close() {
      modalController.dismiss();
    },
    async InputCountry(Code: string, Name: string) {
      this.selectedCountry = Name
      modalController.dismiss();
      this.userservice.GetCountryCode(Code, this.flight.languageCode).then((result: any) => {
        console.log(result);
        if (result.message === 'successful') {
          this.loading = false;
          this.city = result.data;
        }
      })
    },
    async InputOrigin(Code: string, Name: string) {
      this.flight.originCode = Code
      modalController.dismiss();
    },
    async InputDestination(Code: string, Name: string) {
      this.flight.destinationCode = Code
      modalController.dismiss();
    },
    getData() {
      const data = {
        tripType: this.flight.tripType,
        originCode: this.flight.originCode,
        destinationCode: this.flight.destinationCode,
        svcClass: this.flight.svcClass,
        directFlight: this.flight.directFlight,
        departDate: dateFormatValue(this.flight.departDate),
        returnDate: this.flight.returnDate ? (dateFormatValue(this.dete2)) : '',
        adult: this.flight.adult,
        child: this.flight.child,
        infant: this.flight.infant,
        languageCode: this.flight.languageCode,
      }
      this.loading = true;
      loadingController.create({
        message: 'กำลังโหลดข้อมูล....'
      }).then(a => {
        a.present().then(() => {
          this.userservice.PostAocFlight(data).then((result: any) => {
            console.log(result);
            if (result.message === 'successful') {
              this.loading = false;
              this.$router.push({
                path: `/test2`,
                query: {
                  tripType: this.flight.tripType,
                  originCode: this.flight.originCode,
                  destinationCode: this.flight.destinationCode,
                  svcClass: this.flight.svcClass,
                  directFlight: this.flight.directFlight as any,
                  departDate: dateFormatValue(this.flight.departDate),
                  returnDate: this.flight.returnDate ? (dateFormatValue(this.dete2)) : '',
                  adult: this.flight.adult,
                  child: this.flight.child,
                  infant: this.flight.infant,
                  languageCode: this.flight.languageCode,
                }
              });
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
    this.loading = true;
    loadingController.create({
      message: 'กำลังโหลดข้อมูล....'
    }).then(a => {
      a.present().then(() => {
        this.highlightedDates[0].date = dateFormatValue(this.flight.departDate) as any
        this.userservice.GetCountry(this.flight.languageCode).then((result: any) => {
          console.log(result);
          if (result.message === 'successful') {
            this.loading = false;
            this.country = result.data;
            this.passenger = `ผู้ใหญ่ ${this.flight.adult} คน`
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
.color-main {
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
  border-radius: 20px;
}

.color-try {
  --background: rgb(255, 255, 255);
  color: gray;
}

ion-datetime {
  --background: #fcfcfc;
  --background-rgb: 255, 241, 242;
  color: black;
  border-radius: 16px;
  box-shadow: rgba(var(--ion-color-rose-rgb), 0.3) 0px 10px 15px -3px;
}

.block {
  width: 100%;
  height: 412px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.block-class {
  width: 100%;
  height: 275px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ion-modal-dete {
  --height: auto;
}

.content {
  --background: #ffffff;
}

.btn-search {
  width: 100%;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%) !important;
}
</style>