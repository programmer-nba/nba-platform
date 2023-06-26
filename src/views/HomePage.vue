<template>
  <ion-page>
      <ion-content>
        <div class="user-detail">
        <ion-grid>
          <ion-row>
            <ion-col>
              <span>สวัสดี</span>
              <p>{{ user?.name }}</p>

            </ion-col>
            <ion-col>
              <ion-avatar>
              <img alt="Silhouette of a person's head" src="/images/profile.f171d482.jpg" />
            </ion-avatar>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-input/>
            </ion-col>
          </ion-row>
        </ion-grid>
        </div>
    </ion-content>
  </ion-page>
</template>

<script  lang="ts">
import { UserService } from "@/services/user"
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent ,IonCol, IonGrid, IonRow , IonInput, IonAvatar} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent ,IonCol, IonGrid, IonRow, IonInput, IonAvatar},
    setup() {
      const userservice = new UserService(null);
      return {
        userservice
      }
    },
    data(){
      return {
        user:null

      }
    },
    async mounted(){
      //get me 
      await this.userservice.GetMe().then((result:any | null)=>{
        console.log(result);
        if(result.status=== true){
          this.user = result.data;
        }

      })
    },
    
})
</script>

<style scoped>
  ion-content {
    --background: var(--ion-color-primary);

  }

  ion-toolbar{
    background-color: rgba(0, 0, 0, 0.26);
  }

  .user-detail{
    display:flex;
    color:white;
    width: 100%;
    padding: 1rem;
    background: rgb(255,1,162);
background: linear-gradient(222deg, rgba(255,1,162,1) 0%, rgba(190,5,143,1) 37%, rgba(117,9,121,1) 100%);
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
  }

  .img-profile{
    max-width: 50px;
  }
</style>