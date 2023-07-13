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
                      <span class="label">All sale</span>
                    </ion-col>
                    <ion-col>
                      <div class="all-sell-point">

                        <span class="label">{{Number(user?.allsale).toFixed(0)}}/50,000</span>
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
                <ion-img class="service" alt="artwork" src="/images/icon_menu/artwork.png"/>
              </ion-col>
              <ion-col>
           
           

                  <ion-img class="service" alt="services" src="/images/icon_menu/counter.png" @click="$router.push('/tabs/services')"/>
            
            
              
              </ion-col>
              <ion-col>
                  <ion-img class="service" alt="topup" src="/images/icon_menu/mobile_topup.png" @click="$router.push('/tabs/topups')"/>
                </ion-col>
                
            
            </ion-row>
            <ion-row>
              <ion-col>
                  <ion-img class="service" alt="transfer" src="/images/icon_menu/transfer.png" @click="$router.push('/tabs/nbaservices')"/>
                </ion-col>
                <ion-col>
                  <ion-img class="service" alt="transfer" src="/images/icon_menu/cardtopup.png" @click="$router.push('/tabs/cardtopup')"/> 
                </ion-col>
                <ion-col>
                  <ion-img class="service" alt="transfer" src="/images/icon_menu/proserm.png" @click="$router.push('/tabs/proserm')"/> 
                </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                  <ion-img class="service" alt="transfer" src="/images/icon_menu/keyservice.png" @click="$router.push('/tabs/keyservice')"/>
                </ion-col>
                <ion-col>
                  <ion-img class="service" alt="transfer" src="/images/icon_menu/wallet.png" @click="$router.push('/tabs/wallet')"/>
                </ion-col>
                <ion-col>
                  <ion-img class="service" alt="transfer" src="/images/icon_menu/cash.png" @click="$router.push('/tabs/cash')"/>
                </ion-col>
            </ion-row>
             
          </ion-grid>
        </div>
    </ion-content>
  </ion-page>
</template>

<script  lang="ts">
import { Storage } from '@ionic/storage';
import { UserService } from "@/services/user";
import  CounterServicePage  from "@/views/CounterServicePage.vue";
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent ,
  IonCol, IonGrid, IonRow , IonInput, IonAvatar, IonSearchbar ,IonProgressBar, IonImg,IonNav

} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
    components: { 
      IonPage, IonHeader, IonToolbar, IonTitle,
       IonContent ,IonCol, IonGrid, IonRow, 
       IonInput, IonAvatar, IonSearchbar,
       IonProgressBar,IonImg,IonNav
      },
    setup() {
      const store = new Storage();
      const userservice = new UserService(null);
      return {
        userservice,
        store
      }
    },
    
    async created() {
      await this.store.create();
    },
    data(){
      return {
        user: null,
        servicePage:CounterServicePage

      }
    },
    async mounted(){
      //get me 
      await this.userservice.GetMe().then(async(result:any | null)=>{
        console.log(result);
        if(result.status=== true){
          this.user = result.data;
          await this.store.set('user', result.data);
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
    background: linear-gradient(85deg, #600f6f 0%, #cb1c8d 100%)  !important;
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
  padding: 0.2rem;
}
</style>