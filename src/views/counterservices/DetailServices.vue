<template>
    <ion-page>
        <ion-toolbar>
        <ion-buttons slot="start">
            <ion-button  @click="$router.push('/tabs/services')">
            <ion-icon style="color: white;" :icon="chevronBackOutline"></ion-icon>
            </ion-button>
            </ion-buttons>
            <ion-row>
                <div style="height: 45px;">
                <ion-title>จ่ายชำระ</ion-title>
                </div>
            </ion-row>
        </ion-toolbar>
    <ion-content :fullscreen="true">
        <div class="container" style="margin-bottom: 3rem;">
            <ion-grid>
                <ion-row>
                    <ion-col v-for="(item,index) in services" :key="index">
                        <!-- <ion-img class="service" alt="shoping" :src="`/images/counter_service/${item.productid}.png`"/>
                        {{ item.productid }} -->
                        <h5>{{ item.productname }}</h5>
                    </ion-col>
                </ion-row>
             
            </ion-grid>
        </div>
    </ion-content>
</ion-page>
</template>

<script lang="ts">
import {  
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonButton,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonTitle,
    loadingController
 } from '@ionic/vue';
 import { CounterService } from "../../services/counterservices";
 import { BarcodeService } from "@/model/counterservice.interface"
 import { chevronBackOutline } from 'ionicons/icons';

import { defineComponent } from 'vue';

export default defineComponent({
    setup(){
        const counterService = new CounterService(null);
        return {
            counterService,
            chevronBackOutline
        }
    },
    components: { IonPage, IonContent,IonGrid,IonRow,IonCol,IonImg,IonButton,
        IonToolbar,IonButtons,IonIcon,IonTitle
     },
    data(){
        return {
            services:[] as BarcodeService[],
            loading:false,
        }
    },
    async mounted(){
        // await this.counterService.getBarcodeServices().then((result:any)=>{
        //     if (result.data.status === true){
        //         this.services_test = result.data.filter((el: any) => el.productid == this.$route.params.id);
        //         this.services = result.data.data
        //         console.log(this.services)
        //     }
        // })
         this.loading = true;
        loadingController.create({
            message: 'กำลังโหลดข้อมูล....'
        }).then(a => {
            a.present().then(() => {
                this.counterService.getBarcodeServices().then((result: any) => {
                    console.log(result);
                    if (result.data.status === true) {
                        this.loading = false
                        this.services = result.data.data.filter((el: any) => el.productid == this.$route.params.id);
                    }
                    if (!this.loading) {
                        a.dismiss().then(() => console.log());
                    }
                })
            });
        });
    }
})
</script>

<style>
ion-toolbar{
  --background: rgb(255,1,162);
  --color: white;
  --background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%)  !important;
  }
  </style>