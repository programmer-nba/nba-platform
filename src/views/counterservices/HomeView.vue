<template>
    <ion-page>

    
    <ion-content :fullscreen="true">
        <div class="container" style="margin-bottom: 3rem;">
            <ion-grid>
                <ion-row>
                    <ion-col v-for="(item,index) in services" :key="index" size="4">
                        <ion-img class="service" alt="shoping" :src="`/images/counter_service/${item.productid}.png`"/>
                    <!-- <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/nba0001.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00001.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00002.png"/>
                    </ion-col>
                </ion-row>
      
                    
                    
                    <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00003.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00005.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00006.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00007.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00009.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00016.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00018 copy 55.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00018.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00021.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00023.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00024.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00025.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00030.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00031.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00032.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00039.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00040.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00041.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00042.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00043.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00061.png"/>
                        
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00045.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00046.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00051.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00055.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00057.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00058.png"/>
                    </ion-col>
                </ion-row> -->
                <!-- adafadfafaf -->
                <!-- <ion-row>
                        <ion-col>
                            <ion-img class="service" alt="shoping" src="/images/counter_service/p00062.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00063.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00064.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00066.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00067.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00069.png"/>
                    </ion-col>
                </ion-row>

                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00072.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00079.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00082.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00083.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00085.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00091.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00092.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00107.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00112.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00114.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00116.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00118.png"/>
                    </ion-col>
                </ion-row>


                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00123.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00124.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00125.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00126.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00129.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00130.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00131.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00136.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00143.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00145.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00149.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00155.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00157.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00158.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00159.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00160.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00161.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00162.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00163.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00164.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00166.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00167.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00168.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00169.png"/>
                    </ion-col>
                </ion-row>

                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00170.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00171.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00172.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00173.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00174.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00177.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00194.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00195.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00197.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00199.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00203.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00220.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00234.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00239.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00245.png"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00246.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00257.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00274.png"/>
                    </ion-col>
                </ion-row>

                <ion-row>
                        <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00302.png"/>
                    </ion-col>
                    <ion-col>
                        <ion-img class="service" alt="shoping" src="/images/counter_service/p00303.png"/>
                    </ion-col>
                    <ion-col>
                         -->
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
 import { BarcodeService } from "@/model/counterservice.interface"

import { defineComponent } from 'vue';

export default defineComponent({
    setup(){
        const counterService = new CounterService(null);
        return {counterService}
    },
    components: { IonPage, IonContent,IonGrid,IonRow,IonCol,IonImg },
    data(){
        return {
            services:[] as BarcodeService[],
            loading:false
        }
    },
    async mounted(){
        await this.counterService.getBarcodeServices().then((result:any)=>{
            console.log(result);
            this.services = result.data;
        })
    }
})
</script>