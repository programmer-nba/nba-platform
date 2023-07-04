<template>
    <ion-page>
     
      <ion-content :fullscreen="true">
      


          <ion-router-outlet />
  

      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage,IonContent,IonRouterOutlet } from '@ionic/vue';

  </script>