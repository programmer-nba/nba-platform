<template>
    <ion-page>

    
    <ion-content :fullscreen="true">
        <div class="container" style="margin-bottom: 3rem;">
            <ion-grid>
                <ion-row>
                    <ion-col v-for="(item,index) in services" :key="index" size="4">
                        <ion-img class="service" alt="shoping" :src="`/images/counter_service/${item.productid}.png`"  @click="$router.push('detailproserm')"/>
                        {{ item.productid }}
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
    IonImg
 } from '@ionic/vue';
 import { CounterService } from "../../services/counterservices";
 import { ProSermService } from "../../model/proserm.interface";

import { defineComponent } from 'vue';

export default defineComponent({
    setup(){
        const counterService = new CounterService(null);
        return {counterService}
    },
    components: { IonPage, IonContent,IonGrid,IonRow,IonCol,IonImg },
    data(){
        return {
            services:[] as ProSermService[],
            loading:false
        }
    },
    async mounted(){
        await this.counterService.getProSermServices().then((result:any)=>{
            console.log(result);
            this.services = result.data;
        })
    }
})
</script>