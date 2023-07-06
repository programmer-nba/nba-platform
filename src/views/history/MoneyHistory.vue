<template>
    <ion-item>
        <ion-input
            id="date" 
            v-model="date"
            type="month" 
            @change="chooseDate()"
            >
        </ion-input>
        <ion-popover trigger="date" size="cover">
        <ion-datetime
            presentation="month-year"
            :show-default-buttons="true"
            v-model="date" 
        ></ion-datetime>
        </ion-popover>
    </ion-item>

    <ion-list v-if="date_time !== 0"  id="open-custom-dialog">
        <ion-item button :detail="false" v-for="(item, index) in history" @click="openDailog(item._id,item.amount)">
            <ion-label>
                <h5>{{ index }}</h5>
                <h3>{{ item.name }}</h3>
                <p>{{ item.timestamp}}</p>
            </ion-label>
                <p slot="end" :class="(item.type === 'เข้า' ? 'text-green' : 'text-red')"> 
                {{ (item.type === 'เข้า' ? '+' : '-') }} {{ item.total }}</p>
               
        </ion-item>
        <ion-modal  id="example-modal" ref="modal" trigger="open-custom-dialog" >
                    <div class="wrapper">
                        <ion-toolbar class="toolbar">
                           <h4>รายละเอียด</h4>
                           <ion-button slot="end" fill="clear"> 
                                <ion-icon  size="small" :icon="close"></ion-icon>
                            </ion-button>
                        </ion-toolbar>

                        <ion-item :button="true" :detail="false">
                            <ion-label>{{ amount_test }}</ion-label>
                        </ion-item>
                    </div>
                </ion-modal>
    </ion-list>
    
        <div v-else class="text-center">
            <p><em>--ไม่มีรายการแจ้งเติมเงิน--</em></p>
        </div>
</template>

<script lang="ts">
import {  
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonButton,
    IonLabel,
    IonInput,
    IonTextarea,
    IonCard,
    IonList,
    IonItem,
    IonToolbar,
    IonIcon
 } from '@ionic/vue';
 import dayjs from 'dayjs'
 import { UserService } from "@/services/user";
 import { Historyservice } from "@/model/history.interface";
import { defineComponent , ref } from 'vue';
import {  listOutline, timerOutline, close } from 'ionicons/icons';

export default defineComponent({
    setup(){
        const userservice = new UserService(null);
        return {
            userservice,
            listOutline,
            close
        }
    },
    components: { IonPage, IonContent,IonGrid,IonRow,IonCol,IonImg,IonDatetime,
        IonDatetimeButton,IonModal,IonButton,IonInput,IonTextarea,IonCard,IonList,
        IonItem,IonLabel,IonToolbar,IonIcon
    },
    data(){
        return {
            loading:false,
            history:[] as Historyservice[],
            amount: null,
            date_time:[],
            dialog: false,
            id_dialog : null,
            id:null,
            amount_test: null,
            date: dayjs(Date.now()).format('YYYY-MM')
        }
    },
    methods : {
        chooseDate(){
            this.date_time = this.history.filter((el)=>dayjs(el.createdAt).format('YYYY-MM') === dayjs(this.date).format('YYYY-MM'));
        },
        openDailog(_id,amount){
            this.id = _id;
            this.amount_test = amount;
        },

    },
    async mounted(){
        //get me 
      await this.userservice.GetHistory().then((result:any | null)=>{
        console.log(result);
          this.history = result.data.reverse();
          this.chooseDate();
      })
      },
})
</script>

<style>
    .text-green{
        color: rgb(5, 168, 5);
    }
    .text-red {
        color: red;
    }.text-center{
        text-align: center;
        justify-content: center;
    }
    ion-modal#example-modal {
    --width: fit-content;
    --min-width: 90%;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  }

  ion-modal#example-modal h1 {
    margin: 20px 20px 10px 20px;
  }

  ion-modal#example-modal ion-icon {
    margin-right: 6px;

    width: 48px;
    height: 48px;

    padding: 4px 0;

    color: #aaaaaa;
  }
  .toolbar{
    color: white;
    --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%)  !important;
  }
</style>