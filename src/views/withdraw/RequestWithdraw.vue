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

    <ion-list v-if="date_time !== 0">
        <ion-item button detail="false" v-for="(item , index) in history" :key="index">
            <ion-label>
                <h3>{{ item.ref }}</h3>
                <p>{{ item.updatedAt}}</p>
            </ion-label>
                <p slot="end" :class="(item.status === 'โอนเรียบร้อย' ? 'text-green' : 'text-red')"> 
                {{ (item.status === 'โอนเรียบร้อย' ? '+' : '-') }} {{ item.total }}</p>
        </ion-item>
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
 } from '@ionic/vue';
 import dayjs from 'dayjs'
 import { UserService } from "@/services/user";
 import { Requestservice } from "@/model/request.interface";
import { defineComponent , ref } from 'vue';

export default defineComponent({
    setup(){
        const userservice = new UserService(null);
        return {userservice}
    },
    components: { IonPage, IonContent,IonGrid,IonRow,IonCol,IonImg,IonDatetime,
        IonDatetimeButton,IonModal,IonButton,IonInput,IonTextarea,IonCard,IonList,
        IonItem,IonLabel
    },
    data(){
        return {
            loading:false,
            history:[] as Requestservice[],
            amount: null,
            date_time:[],
            date: dayjs(Date.now()).format('YYYY-MM')
        }
    },
    methods : {
        chooseDate(){
            this.date_time = this.history.filter((el)=>dayjs(el.createdAt).format('YYYY-MM') === dayjs(this.date).format('YYYY-MM'));
        }
    },
    async mounted(){
        //get me 
      await this.userservice.GetRequest().then((result:any | null)=>{
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
</style>