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
              <div class="avatar-user">

                <ion-avatar>
                  
                  <img alt="Silhouette of a person's head" src="/images/profile.f171d482.jpg" />
                  
                </ion-avatar>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-searchbar></ion-searchbar>
              <div class="progress-bar">
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <span class="label">All sell</span>
                    </ion-col>
                    <ion-col>
                      <div class="all-sell-point">

                        <span class="label">10,000/50,000</span>
                      </div>
                    </ion-col>
                    <ion-progress-bar color="light"/>
                  </ion-row>
                </ion-grid>
              </div>
            </ion-col>
          </ion-row>
          <div class="wallet">

          </div>
        </ion-grid>
        </div>
        <div class="uservice">
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-img class="service" alt="shoping" src="/images/shopping.083f7b88.png"/>
              </ion-col>
              <ion-col>
                <ion-img class="service" alt="shoping" src="/images/hotel.022dc7d3.png"/> 
              </ion-col>
              <ion-col>
                <ion-img class="service" alt="shoping" src="/images/hair_cut.5d4c5a7a.png"/>
              </ion-col>
              <ion-col>
                <ion-img class="service" alt="shoping" src="/images/massage.ba614d5c.png"/>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
        <div class="favarite px-1">
          <ion-grid>
            <ion-row>
              <ion-col><span class="label">บริการ</span></ion-col>
              <ion-col>
                <div class="flex justify-content-end">
                  
                  <span class="label">เพิ่มเติม...</span>
                </div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-img class="service" alt="shoping" src="/images/artwork.a2b8cd61.png"/>
              </ion-col>
              <ion-col>
                <ion-img class="service" alt="shoping" src="/images/counter.407258c6.png"/>
              </ion-col>
              <ion-col>
                <ion-img class="service" alt="shoping" src="/images/mobile_topup.16e3038c.png"/>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
    </ion-content>
  </ion-page>
</template>

<script  lang="ts">
import { UserService } from "@/services/user"
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent ,IonCol, IonGrid, IonRow , IonInput, IonAvatar, IonSearchbar ,IonProgressBar, IonImg} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
    components: { 
      IonPage, IonHeader, IonToolbar, IonTitle,
       IonContent ,IonCol, IonGrid, IonRow, 
       IonInput, IonAvatar, IonSearchbar,
       IonProgressBar,IonImg
      },
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
    --background: white;

  }

  ion-toolbar{
    background-color: rgba(0, 0, 0, 0.26);
  }

  ion-searchbar{
    --background: white;
  }

  ion-progress-bar{
    height: 0.5rem;
  }
  .progress-bar {
    padding: 1rem;
  }

  .all-sell-point{
    display: flex;
    width: 100%;
    justify-content: end;
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

 .avatar-user{
  display: flex;
  width: 100%;
  justify-content: end;
 }

 .label{
  font-size: small;

 }
.service{
  padding: 0.5rem;
}
</style>