<template>
  <ion-page>
    <!-- Aler data -->
    <ion-alert :is-open="isOpen" :header="flight.languageCode === 'th' ? 'แจ้งเตือน !' : 'Warn !'"
      :sub-header="sentmessage" :message="error_message" :buttons="alertButtons"
      @didDismiss="OpenAlert(false)"></ion-alert>

    <ion-header>
      <ion-toolbar>
        <ion-title>Test</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-row style="padding: 5%;">
        <ion-col size="12">
          <ion-button @click="Check('R')" value="R" :class="flight.tripType === 'R' ? 'color-main' : 'color-try'"
            shape="round">{{ (flight.languageCode === 'th' ? 'ไป-กลับ' : 'Round Trip') }}</ion-button>
          <ion-button @click="Check('O')" value="O" :class="flight.tripType === 'O' ? 'color-main' : 'color-try'"
            shape="round">{{ (flight.languageCode === 'th' ? 'เที่ยวเดียว' : 'One Way') }}</ion-button>
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
              <p>{{ (flight.languageCode === 'th' ? 'ประเทศ' : 'Country') }}</p>
              <div style="color: grey;" slot="end" id="selected-fruits" v-if="!selectedCountry">{{ (flight.languageCode
                === 'th' ? 'ยังไม่ได้เลือก' : 'Not Yet Selected') }}</div>
              <div slot="end" id="selected-fruits" v-if="selectedCountry">{{ selectedCountry }}</div>
            </ion-item>
          </ion-list>
          <ion-list :inset="true">
            <ion-item :button="true" :detail="false" id="selected-Origin">
              <p>{{ (flight.languageCode === 'th' ? 'ต้นทาง' : 'Origin') }}</p>
              <div style="color: grey;" slot="end" id="selected-fruits" v-if="!flight.originCode">{{ (flight.languageCode
                === 'th' ? 'ยังไม่ได้เลือก' : 'Not Yet Selected') }}</div>
              <div slot="end" id="selected-Origin" v-if="flight.originCode">{{ flight.originCode }}</div>
            </ion-item>
          </ion-list>
          <ion-list :inset="true">
            <ion-item :button="true" :detail="false" id="selected-Destination">
              <p>{{ (flight.languageCode === 'th' ? 'ปลายทาง' : 'Destination') }}</p>
              <div style="color: grey;" slot="end" id="selected-fruits" v-if="!flight.destinationCode">{{
                (flight.languageCode === 'th' ? 'ยังไม่ได้เลือก' : 'Not Yet Selected') }}
              </div>
              <div slot="end" id="selected-Destination" v-if="flight.destinationCode">{{ flight.destinationCode }}</div>
            </ion-item>
          </ion-list>
          <ion-list :inset="true">
            <ion-item :button="true" :detail="false" id="departDate">
              <p>{{ (flight.languageCode === 'th' ? 'วันที่ไป' : 'Date') }}</p>
              <div slot="end" id="departDate">{{ flight.languageCode === 'th' ? toThaiDateString(flight.departDate) :
                toEnDateString(flight.departDate) }}</div>
            </ion-item>
            <ion-item :button="true" :detail="false" id="returnDate" v-if="flight.tripType === 'R'">
              <p>{{ (flight.languageCode === 'th' ? 'วันที่กลับ' : 'Return Date') }}</p>
              <div slot="end" id="returnDate" v-if="!flight.returnDate">-</div>
              <div slot="end" id="returnDate" v-if="flight.returnDate">{{ flight.languageCode === 'th' ?
                toThaiDateString(flight.returnDate) :
                toEnDateString(flight.returnDate) }}</div>
            </ion-item>
          </ion-list>
          <ion-list :inset="true">
            <ion-item>
              <ion-select :label="(flight.languageCode === 'th' ? 'ชั้นโดยสาร' : 'Class')" v-model="flight.svcClass"
                :placeholder="flight.languageCode === 'th' ? 'ยังไม่ได้เลือก' : 'Not Yet Selected'" ok-text="ยืนยัน"
                cancel-text="ยกเลิก">
                <ion-select-option :value="'Y'">{{ flight.languageCode === 'th' ? 'ชั้นประหยัด' : 'Economy Class' }}
                </ion-select-option>
                <ion-select-option :value="'P'">{{ flight.languageCode === 'th' ? 'ชั้นประหยัดพรีเมียม' :
                  'PremiumEconomyClass' }}
                </ion-select-option>
                <ion-select-option :value="'C'">{{ flight.languageCode === 'th' ? 'ชั้นธุรกิจ' : 'Business Class' }}
                </ion-select-option>
                <ion-select-option :value="'F'">{{ flight.languageCode === 'th' ? 'ชั้นหนึ่ง' : 'First Class' }}
                </ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
          <ion-list :inset="true">
            <ion-item :button="true" :detail="false" id="passenger">
              <ion-label>
                <h2>{{ (flight.languageCode === 'th' ? 'ผู้โดยสาร' : 'Passenger') }}</h2>
                <p>{{ passenger }}</p>
              </ion-label>
              <ion-icon :icon="man" slot="end"></ion-icon>
            </ion-item>
          </ion-list>
          <ion-button class="btn-search" @click="getData()">{{ flight.languageCode === 'th' ? 'ค้นหา' : 'Search'
          }}</ion-button>

          <!-- Modal Country  -->
          <ion-modal trigger="select-fruits" ref="modal">
            <ion-toolbar style="text-align: center;">
              {{ (flight.languageCode === 'th' ? 'ประเทศ' : 'Country') }}
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">{{ flight.languageCode === 'th' ? 'ปิด' : 'Close'
                }}</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-content>
              <ion-searchbar :value="selectedCountry"
                :placeholder="flight.languageCode === 'th' ? 'ค้นหาประเทศ' : 'Country Search'"
                @ionInput="handleInput($event)"></ion-searchbar>
              <ion-list>
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
              {{ (flight.languageCode === 'th' ? 'ต้นทาง' : 'Origin') }}
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">{{ flight.languageCode === 'th' ? 'ปิด' : 'Close'
                }}</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-content>
              <ion-searchbar :value="selectedOrigin"
                :placeholder="flight.languageCode === 'th' ? 'ค้นหาจังหวัด/เมือง' : 'Search Province/City'"
                @ionInput="handleInputOrigin($event)"></ion-searchbar>
              <ion-list>
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
              {{ (flight.languageCode === 'th' ? 'ปลายทาง' : 'Destination') }}
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">{{ flight.languageCode === 'th' ? 'ปิด' : 'Close'
                }}</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-content>
              <ion-searchbar :value="selectedDestination"
                :placeholder="flight.languageCode === 'th' ? 'ค้นหาจังหวัด/เมือง' : 'Search Province/City'"
                @ionInput="handleInputDestination($event)"></ion-searchbar>
              <ion-list>
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
              {{ (flight.languageCode === 'th' ? 'วันที่ไป' : 'Date') }}
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">{{ flight.languageCode === 'th' ? 'ปิด' : 'Close'
                }}</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <div class="block">
              <ion-content class="content">
                <ion-row>
                  <ion-col>
                    <ion-datetime presentation="date" :locale="flight.languageCode === 'th' ? 'th-Th' : 'en-US'"
                      :value="dateFormatValue(flight.departDate)" @click="AddDete($event, 'departDate')"
                      :min="datetimeFormatLimit(DateNow)">
                      <ion-buttons slot="buttons">
                        <ion-button color="primary" @click="AddData('depart')">{{ flight.languageCode === 'th' ? 'ยืนยัน'
                          : 'Confirm' }}</ion-button>
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
              {{ (flight.languageCode === 'th' ? 'วันที่กลับ' : 'Return Date') }}
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">{{ flight.languageCode === 'th' ? 'ปิด' : 'Close'
                }}</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <div class="block">
              <ion-content class="content">
                <ion-row>
                  <ion-col>
                    <ion-datetime presentation="date" :highlighted-dates="highlightedDates"
                      :locale="flight.languageCode === 'th' ? 'th-Th' : 'en-US'" @click="AddDete($event, 'returnDate')"
                      :min="datetimeFormatLimit(flight.departDate)">
                      <ion-buttons slot="buttons">
                        <ion-button color="primary" @click="AddData('return')">{{ flight.languageCode === 'th' ? 'ยืนยัน'
                          : 'Confirm' }}</ion-button>
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
              {{ (flight.languageCode === 'th' ? 'เลือกผู้โดยสาร' : 'Pick a Passenger') }}
              <ion-buttons slot="end">
                <ion-button color="tertiary" @click="close()">{{ flight.languageCode === 'th' ? 'ปิด' : 'Close'
                }}</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <div class="block-class">
              <ion-content class="content">
                <ion-row>
                  <ion-col style="color: black;">
                    <ion-item>
                      <ion-label>
                        <h3>{{ (flight.languageCode === 'th' ? 'ผู้ใหญ่' : 'Adult') }}</h3>
                        <p>{{ flight.languageCode === 'th' ? 'อายุ 12 ปีขึ้นไป' : '12 Years Old or Older' }}</p>
                      </ion-label>
                      <ion-button fill="outline" @click="flight.adult--"
                        :disabled="flight.adult === 0 ? true : false">-</ion-button>
                      <p style="margin: 5%;">{{ flight.adult }}</p>
                      <ion-button fill="outline" @click="flight.adult++">+</ion-button>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>{{ (flight.languageCode === 'th' ? 'เด็ก' : 'Child') }}</h3>
                        <p>{{ flight.languageCode === 'th' ? 'อายุ 2-11' : 'Age 2-11' }}</p>
                      </ion-label>
                      <ion-button fill="outline" @click="flight.child--"
                        :disabled="flight.child === 0 ? true : false">-</ion-button>
                      <p style="margin: 5%;">{{ flight.child }}</p>
                      <ion-button fill="outline" @click="flight.child++">+</ion-button>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>{{ (flight.languageCode === 'th' ? 'ทารก' : 'Infant') }}</h3>
                        <p>{{ flight.languageCode === 'th' ? 'ต่ำกว่า 2 ปี' : 'Under 2 Years' }}</p>
                      </ion-label>
                      <ion-button fill="outline" @click="flight.infant--"
                        :disabled="flight.infant === 0 ? true : false">-</ion-button>
                      <p style="margin: 5%;">{{ flight.infant }}</p>
                      <ion-button fill="outline" @click="flight.infant++">+</ion-button>
                    </ion-item>
                    <ion-button style="width: 99%;" @click="AddPassebGer()">{{ flight.languageCode === 'th' ? 'ยืนยัน' :
                      'Confirm' }}</ion-button>
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
  IonInput, IonSearchbar, loadingController, IonSelect, IonSelectOption, IonModal, IonButtons, modalController, IonDatetime, IonIcon, IonAlert
} from '@ionic/vue';
import { Storage } from '@ionic/storage';
import { defineComponent, ref } from 'vue';
import { dayjs, toThaiDateString, dateFormatValue, toEnDateString, datetimeFormatLimit, getImage } from '@/services/fun';
import { man } from "ionicons/icons";

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
    IonIcon,
    IonAlert
  },

  setup() {
    const store = new Storage();
    const city = [] as any;
    const country = [] as any;
    const searchedCityOrigin = ref(city);
    const searchedCityDestination = ref(city);
    const searchedItem = ref(country) as any;
    const userservice = new UserService(null);
    const datetime = ref();
    const isOpen = ref(false);
    const alertButtons = [{ text: 'OK', role: 'confirm', handler: () => { }, },];
    const OpenAlert = (state: boolean) => {
      isOpen.value = state;
    };
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
      man,
      toEnDateString,
      datetimeFormatLimit,
      store,
      getImage,
      alertButtons,
      OpenAlert,
      isOpen
    };
  },
  async created() {
    await this.store.create();
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
      CodeCountry: '',
      CheckInput: '',
      selectedCountry: '',
      selectedOrigin: '',
      selectedDestination: '',
      dete1: new Date() as any,
      dete2: '' as any,
      checkformdate: '',
      passenger: '',
      DateNow: new Date as any,
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
      ],
      test: [] as any,
      error_message: '',
      sentmessage: '',
    }
  },
  methods: {
    AddData(Check: string) {
      if (Check === 'depart') {
        const d = new Date(dateFormatValue(this.dete1));
        this.flight.departDate = d
        this.flight.returnDate = ''
        this.highlightedDates[1].date = ''
        this.highlightedDates[0].date = dateFormatValue(this.flight.departDate) as any
        modalController.dismiss();
      }
      if (Check === 'return') {
        const d = new Date(dateFormatValue(this.dete2))
        this.flight.returnDate = d
        this.highlightedDates[1].date = dateFormatValue(this.flight.returnDate) as any
        modalController.dismiss();
      }
    },
    AddPassebGer() {
      const adult = this.flight.adult > 0 ? this.flight.languageCode === 'th' ? `ผู้ใหญ่ ${this.flight.adult} คน` : `Adult ${this.flight.adult} ` : '';
      const child = this.flight.child > 0 ? this.flight.languageCode === 'th' ? `,เด็ก ${this.flight.child} คน` : `,Child ${this.flight.child} ` : '';
      const infant = this.flight.infant > 0 ? this.flight.languageCode === 'th' ? `,ทารก ${this.flight.infant} คน` : `,Infant ${this.flight.infant} ` : '';
      this.passenger = `${adult} ${child} ${infant}`
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
          this.highlightedDates[1].date = '';
        }
      }
    },
    CheckLanguage(Check: string) {
      this.flight.languageCode = Check
      this.loading = true;
      loadingController.create({
        message: this.flight.languageCode === 'th' ? 'กำลังโหลดข้อมูล....' : 'Loading data....',
      }).then(a => {
        a.present().then(async () => {
          this.highlightedDates[0].date = dateFormatValue(this.flight.departDate) as any
          await this.userservice.GetCountry(this.flight.languageCode).then(async (result: any) => {
            console.log(result);
            if (result.message === 'successful') {
              this.loading = false;
              this.country = result.data;
              this.searchedItem = this.country.filter((el: any) => el.Name.toLowerCase().indexOf(this.CheckInput.toLowerCase()) > -1)
              if (this.selectedCountry) {
                this.selectedCountry = result.data.filter((el: any) => el.Code === this.CodeCountry)[0].Name;
                this.searchedItem = this.country.filter((el: any) => el.Name.toLowerCase().indexOf(this.selectedCountry.toLowerCase()) > -1)
                await this.userservice.GetCountryCode(this.CodeCountry, this.flight.languageCode).then((result: any) => {
                  console.log(result);
                  if (result.message === 'successful') {
                    this.loading = false;
                    this.city = result.data;
                    if (this.selectedOrigin) {
                      this.selectedOrigin = result.data.filter((el: any) => el.Code === this.flight.originCode)[0].Name;
                      this.searchedCityOrigin = this.city.filter((el: any) => el.Name.toLowerCase().indexOf(this.selectedOrigin.toLowerCase()) > -1)
                    }
                    if (this.selectedDestination) {
                      this.selectedDestination = result.data.filter((el: any) => el.Code === this.flight.destinationCode)[0].Name;
                      this.searchedCityDestination = this.city.filter((el: any) => el.Name.toLowerCase().indexOf(this.selectedDestination.toLowerCase()) > -1)
                    }
                  }
                })
              }
              const adult = this.flight.adult > 0 ? this.flight.languageCode === 'th' ? `ผู้ใหญ่ ${this.flight.adult} คน` : `Adult ${this.flight.adult} ` : '';
              const child = this.flight.child > 0 ? this.flight.languageCode === 'th' ? `,เด็ก ${this.flight.child} คน` : `,Child ${this.flight.child} ` : '';
              const infant = this.flight.infant > 0 ? this.flight.languageCode === 'th' ? `,ทารก ${this.flight.infant} คน` : `,Infant ${this.flight.infant} ` : '';
              this.passenger = `${adult} ${child} ${infant}`;
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
      this.selectedDestination = '';
    },
    handleInput(event: any) {
      this.CheckInput = event.target.value;
      this.searchedItem = this.country.filter((el: any) => el.Name.toLowerCase().indexOf(this.CheckInput.toLowerCase()) > -1)
      console.log(this.selectedCountry)
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
      this.searchedItem = this.country.filter((el: any) => el.Name.toLowerCase().indexOf(this.selectedCountry.toLowerCase()) > -1)
      if (this.selectedOrigin != '') {
        this.searchedCityOrigin = this.city.filter((el: any) => el.Code.toLowerCase().indexOf(this.flight.originCode.toLowerCase()) > -1)
      }
      if (this.searchedCityDestination != '') {
        this.searchedCityDestination = this.city.filter((el: any) => el.Code.toLowerCase().indexOf(this.flight.destinationCode.toLowerCase()) > -1)
      }
    },
    async InputCountry(Code: string, Name: string) {
      this.selectedCountry = Name;
      this.searchedItem = this.country.filter((el: any) => el.Name.toLowerCase().indexOf(Name.toLowerCase()) > -1);
      this.CodeCountry = Code;
      this.flight.originCode = '';
      this.searchedCityOrigin = '';
      this.selectedOrigin = '';
      this.flight.destinationCode = '';
      this.searchedCityDestination = '';
      this.selectedDestination = '';
      modalController.dismiss();
      this.userservice.GetCountryCode(this.CodeCountry, this.flight.languageCode).then((result: any) => {
        console.log(result);
        if (result.message === 'successful') {
          this.loading = false;
          this.city = result.data;
          this.searchedCityOrigin = this.city.filter((el: any) => el.Name.toLowerCase().indexOf(''.toLowerCase()) > -1)
        }
      })
    },
    async InputOrigin(Code: string, Name: string) {
      this.selectedOrigin = Name
      this.searchedCityOrigin = this.city.filter((el: any) => el.Name.toLowerCase().indexOf(Name.toLowerCase()) > -1)
      console.log(this.searchedCityOrigin)
      this.flight.originCode = Code
      this.flight.destinationCode = '';
      this.searchedCityDestination = this.city.filter((el: any) => el.Name.toLowerCase().indexOf(''.toLowerCase()) > -1)
      this.selectedDestination = '';
      modalController.dismiss();
    },
    async InputDestination(Code: string, Name: string) {
      this.selectedDestination = Name;
      this.flight.destinationCode = Code
      this.searchedCityDestination = this.city.filter((el: any) => el.Name.toLowerCase().indexOf(Name.toLowerCase()) > -1)
      modalController.dismiss();
    },
    async getData() {
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
      if (this.selectedCountry === '' || this.flight.originCode === '' || this.flight.destinationCode === '' || this.flight.returnDate === '') {
        this.isOpen = true;
        this.sentmessage = 'กรอกข้อมูลไม่ครบ';
        this.error_message = 'กรุณากรอก';
      } else  {
        this.store.set('DataSearched', data)
      this.$router.push({
        path: `/test2`,
      });
      }
    }
  },
  async mounted() {
    this.loading = true;
    loadingController.create({
      message: 'กำลังโหลดข้อมูล....'
    }).then(a => {
      a.present().then(async () => {
        this.highlightedDates[0].date = dateFormatValue(this.flight.departDate) as any
        await this.userservice.GetCountry(this.flight.languageCode).then((result: any) => {
          console.log(result);
          if (result.message === 'successful') {
            this.loading = false;
            this.country = result.data;
            this.searchedItem = this.country.filter((el: any) => el.Name.toLowerCase().indexOf(this.CheckInput.toLowerCase()) > -1)
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