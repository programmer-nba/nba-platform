<template>
    <ion-page>
        <ion-content>
            <div class="favarite px-1">
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-img class="service" alt="transfer" src="/images/icon_insurancetaxact/act.png"></ion-img>
                        </ion-col>
                        <ion-col>
                            <ion-img class="service" alt="transfer" src="/images/icon_insurancetaxact/tax.png"></ion-img>
                        </ion-col>
                        <ion-col>
                            <ion-img class="service" alt="transfer"
                                src="/images/icon_insurancetaxact/insurance.png"></ion-img>
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
    loadingController,
    IonButton
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonPage, IonContent, IonGrid, IonRow, IonCol, IonImg, IonButton },
    data() {
        return {
            services: '' as any,
            loading: false,
        }
    },
})
</script>