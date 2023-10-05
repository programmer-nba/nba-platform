<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="history" href="/tabs/history">
          <ion-icon aria-hidden="true" :icon="ribbonOutline" />
          <ion-label>History</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="user" @click="chenHref()">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>User</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar, IonTabButton, IonTabs, IonLabel, IonItem, IonContent,
  IonIcon, IonPage, IonRouterOutlet, IonSegmentButton, IonSegment
} from '@ionic/vue';
import { homeOutline, personOutline, ribbonOutline, bagHandleOutline, home } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    IonPage, IonTabButton, IonTabs, IonRouterOutlet, IonContent,
    IonIcon, IonLabel, IonTabBar, IonItem, IonSegmentButton, IonSegment
  },
  setup() {
    const setOpen = ref()
    return {
      homeOutline,
      personOutline,
      ribbonOutline,
      bagHandleOutline,
    }
  },
  data() {
    return {
      data: 'user',
    }
  },
  methods: {
    chenHref() {
      this.$router.push({
        path: 'user',
        query: {
          query: 'user'
        }
      });
    },
  }
})
</script>

<style scoped></style>
