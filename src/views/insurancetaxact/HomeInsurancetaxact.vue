<template>
    <ion-page>
        <ion-content>
            
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonCol, IonGrid, IonRow, IonInput, IonAvatar, IonSearchbar, IonProgressBar, IonImg, IonNav,
    loadingController, IonButton, IonRange, IonText, IonIcon, IonBadge, IonModal, IonButtons,
    IonItem, IonList, IonLabel, IonToast, IonFooter

} from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle,
        IonContent, IonCol, IonGrid, IonRow,
        IonInput, IonAvatar, IonSearchbar,
        IonProgressBar, IonImg, IonNav, IonButton,
        IonRange, IonText, IonIcon, IonBadge, IonModal,
        IonButtons, IonItem, IonList, IonLabel, IonToast,
        IonFooter
    },
})
</script>