<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp,  IonButtons,  IonRouterOutlet, useBackButton, useIonRouter } from '@ionic/vue';
import { defineComponent,  } from 'vue';

export default defineComponent({
  setup() {
    return {
      useBackButton, useIonRouter,
    }
  },
  components: {
    IonApp, IonRouterOutlet
  },
  data() {

  },
  async created() {
    useBackButton(10, () => {
      console.log('ไม่สามารถใช้งานได้')
    });
  }
});
</script>