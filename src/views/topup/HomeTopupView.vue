<template>
    <ion-page>

        <ion-content :fullscreen="true">
            <div class="container" style="margin-bottom: 3rem;">
                
                <ion-row v-if="loading === true">
                    <ion-col v-for="(item,index) in topup" :key="index" size="4">
                        <ion-img class="service" alt="shoping" :src="`/images/counter_service/${item.productid}.png`"/>
                        {{ item.productid }}
                    </ion-col>

                </ion-row>
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
import { defineComponent } from 'vue';
import { CounterService } from "../../services/counterservices";
import { Topup } from '../../model/topup.interface';

export default defineComponent({
    setup(){
        const counterservices = new CounterService(null);
      
        return {
            counterservices
        }
    },
    components: { IonPage,IonContent,IonGrid,IonRow,IonCol,IonImg },
    data(){
        return {
            topup:[] as Topup[],
            display:{
                colunm:3
            },
            loading:false
        }
    },
    async mounted(){
        await this.counterservices.getMobileServices().then((result:any)=>{
            console.log(result);
            this.loading = false;
            if(result.status === true){
                this.topup = result.data;
                this.loading = true;
            }
        })
    }
})
</script>