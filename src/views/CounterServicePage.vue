<template>
  <ion-page>

    <ion-content>



      <ion-router-outlet />


    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonContent, IonRouterOutlet } from '@ionic/vue';

</script>

<style scoped>
ion-content {
  --background: rgba(0, 0, 0, 0);
}
</style>