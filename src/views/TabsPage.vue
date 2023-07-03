<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="services" href="/tabs/services">
          <ion-icon aria-hidden="true" :icon="bagHandleOutline" />
          <ion-label>Services</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="history" href="/tabs/history">
          <ion-icon aria-hidden="true" :icon="ribbonOutline" />
          <ion-label>History</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="user" href="/tabs/user">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>User</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { homeOutline, personOutline, ribbonOutline,bagHandleOutline } from 'ionicons/icons';
</script>
