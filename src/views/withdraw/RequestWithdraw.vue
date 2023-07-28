<template>
    <ion-item>
        <ion-input
            id="date" 
            v-model="date"
            type="month" 
            @change="chooseDate()"
            >
        </ion-input>
    </ion-item>
    <ion-list v-if="date_time.length !== 0" id="open-modal">
        <ion-item button :detail="false" v-for="item  in date_time" @click="openDailog(item._id,item.status,item.amount,item.charge,item.total,item.createdAt,item.ref)">
            <ion-label>                                                                     
                <h3>จำนวน <strong>{{  Number(item.amount).toFixed(2) }}</strong> บาท</h3>
                <p>อ้างอิง : {{ item.ref }} |  วันที่ {{ dateFormat(item.createdAt) }}</p>
            </ion-label>
                <p slot="end"><ion-icon v-if="item.status === 'โอนเรียบร้อย'" :icon="checkmarkCircle"  style="color: #4CBB17; font-size: 25px;"></ion-icon></p>
                <p slot="end"><ion-icon v-if="item.status === 'ยกเลิก'" :icon="closeCircle"  style="color: red; font-size: 25px;"></ion-icon></p>
                <p slot="end"><ion-icon v-if="item.status === 'รอดำเนินการ'" :icon="informationCircle"  style="color: #3880ff; font-size: 25px;"></ion-icon></p>
        </ion-item>
        <ion-modal  ref="modal" trigger="open-modal">
                <div>
                    <ion-toolbar class="toolbar">
                        <h4>รายละเอียด</h4>
                        <ion-button slot="end" fill="clear" @click="dismiss()">
                            <ion-icon style="color: white;"  :icon="close"></ion-icon>
                        </ion-button>
                        </ion-toolbar>
                        <ion-item lines="full">
                        <ion-row>
                            <ion-col size="12" style="padding-bottom: 0%;">
                                <h3><strong>อ้างอิง : {{ ref_code }}</strong></h3>
                                <p style="font-size: 14px; color: gray;">วันที่ทำรายการ {{ datetimeFormat(createdAt) }}</p>
                            </ion-col>
                            <ion-col size="11" style="padding: 0%;">
                                    <ion-card>
                                        <ion-text> สถานะ : </ion-text>
                                            <ion-chip v-if="status === 'รอดำเนินการ'" color="primary">{{ status }}</ion-chip>
                                            <ion-chip v-if="status === 'ยกเลิก'" color="danger">{{ status }}</ion-chip>
                                            <ion-chip v-if="status === 'โอนเรียบร้อย'" color="success">{{ status }}</ion-chip>
                                    </ion-card>
                            </ion-col>
                        </ion-row>
                    </ion-item>
                    <div style="padding-left: 5%;">
                        <p style="color: gray;">รายละเอียด</p>
                            <p>
                                <ion-text style="font-weight: bold;">ยอดถอน :</ion-text> {{ Number(amount).toFixed(2) }} บาท<br/>
                                <ion-text style="font-weight: bold;">ค่าธรรมเนียม :</ion-text> {{ Number(charge).toFixed(2) }} บาท<br/>
                                <ion-text style="font-weight: bold;">หักค่าคอมมิชั่นสะสม :</ion-text> {{ Number(total).toFixed(2) }} บาท<br/>
                                <ion-text style="font-weight: bold; font-size: 17px;">ยอดเข้าบัญชีสุทธิ : {{ Number(amount).toFixed(2) }} บาท</ion-text> 
                            </p>
                    </div>
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
    IonIcon,
    IonText,
    IonChip
 } from '@ionic/vue';
 import {  datetimeFormat,  dayjs, dateFormat } from '@/services/fun'
 import { UserService } from "@/services/user";
 import { Requestservice } from "@/model/request.interface";
import { defineComponent , ref } from 'vue';
import {  checkmarkCircle, close, closeCircle, informationCircle } from 'ionicons/icons';

export default defineComponent({
    setup(){
        const userservice = new UserService(null);
        return {
            userservice,
            close,
            informationCircle,
            closeCircle,
            checkmarkCircle,
            datetimeFormat,
            dayjs,
            dateFormat
        }
    },
    components: {IonPage, IonContent,IonGrid,IonRow,IonCol,IonImg,IonDatetime,
        IonDatetimeButton,IonModal,IonButton,IonInput,IonTextarea,IonCard,IonList,
        IonItem,IonLabel,IonToolbar,IonIcon,IonText,IonChip
    },
    data(){
        return {
            loading:false,
            history:[] as Requestservice[],
            amount: null,
            date_time:[''],
            date: dayjs(Date.now()).format('YYYY-MM'),
            ref_code: null,
            createdAt: null,
            status: null,
            charge: null,
            total: null,
            _id: null,
        }
    },
    methods : {
        openDailog(_id,status,amount,charge,total,createdAt,ref){
            this.ref_code = ref;
            this.status = status;
            this.amount = amount;
            this.charge = charge;
            this.total = total;
            this._id = _id;
            this.createdAt = createdAt;
        },
        chooseDate(){
            this.date_time = this.history.filter((el)=>dayjs(el.createdAt).format('YYYY-MM') === dayjs(this.date).format('YYYY-MM'));
        },
        dismiss() {
            this.$refs.modal.$el.dismiss();
        },
    },
    async mounted(){
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
    ion-card{
        border: 1px solid rgb(75, 75, 75);
        font-size: 15px;
        padding-left: 5%;
        padding-top: 2%;
        padding-bottom: 2%;
        width: 100%;
    }
</style>