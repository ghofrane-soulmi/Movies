<template>
    <ion-page>
      
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="search" href="/welcome">
            <ion-icon :icon="logoIonic" />
            <ion-label>Welcome Page</ion-label>
          </ion-tab-button>



          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="playCircle" />
            <ion-label>Movies</ion-label>
          </ion-tab-button>
  
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { logoIonic } from 'ionicons/icons';
  
    import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/vue';
  
    import { playCircle} from 'ionicons/icons';
  

  </script>