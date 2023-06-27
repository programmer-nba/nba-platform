<template>


    <ion-content
    :fullscreen="true"
    class="primary"
    >

    <div class="login-container">

        
        <ion-grid>
            <ion-row class="ion-justify-content-center">
                <ion-col >
                    <ion-img
                    class="img-logo"
                    src="/images/logo-platform.jpg"
                    alt="platefrom logo"
                    
                    ></ion-img>
                    
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center">
                <ion-col class="login">
                    <ion-label>ชื่อผู้ใช้</ion-label>
                    <ion-input v-model="user.tel" placeholder="เบอร์โทรศัพท์" :clear-input="true" ></ion-input>
                    <ion-label>รหัสผ่าน</ion-label>
                    <ion-input v-model="user.password" :type="see_password"  placeholder="รหัสผ่าน" :clear-input="true"></ion-input>
                    <p><small style="color:rgb(196, 196, 196)" @click="seePassword">ดูรหัสผ่าน</small></p>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <ion-button fill="solid" @click="Login">
                        <ion-icon slot="start" :icon="personOutline"></ion-icon>
                        เข้าสู่ระบบ
                    </ion-button>
                </ion-col>
        </ion-row>
    </ion-grid>
    
    
</div>
    
    
</ion-content>
</template>

<script lang="ts">
import axios from "axios";
import  { UserService } from "@/services/user";
import { IonIcon, IonText,IonCol, IonGrid, IonInput, IonRow,IonImg,IonButton,IonLabel,IonContent  } from '@ionic/vue';
  import {  personOutline } from 'ionicons/icons';
  import { warning } from 'ionicons/icons';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { IonIcon, IonText,IonCol, IonGrid, IonInput, IonRow,IonImg,IonLabel,IonButton, IonContent},
    setup() {
   
        const userservice = new UserService(null)


      return {
        warning,personOutline,userservice
      };
    },
    data(){
        return {
            user:{
              tel:'',
              password:'',
              ip_address:'',

            },
            see_password:'password',
        }
    },
    async created(){
      const ip = await axios.get('https://api.ipify.org/?format=json');
      this.user.ip_address = ip.data.ip;

    },
    methods:{
        async Login(){
            //login
            console.log(this.user);
            await this.userservice.Login(this.user).then((result:any)=>{
             
                
                if(result.message ==='Login successful'){
                   console.log('result',result.data);
                   localStorage.setItem('token',result.data.token);
                   this.$router.push('/tabs/home')
                }
             
            })
        },
        seePassword(){
         if(this.see_password==='password'){
            this.see_password = 'text';
         }else{
          this.see_password = 'password'
         }

         }
        
    }

  });
</script>

<style scoped>
  ion-content {
    --background: var(--ion-color-primary);
    --color: #fff;
    justify-content: center;
    align-items: center;
  }

  .login-container{
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }

  ion-grid{
    align-self: center;
  }
 
  ion-col {

    color: #fff;
    text-align: center;
  }
 .img-logo{
     margin:auto;
    display:flex;
    justify-content: center;
    width:50%;
 }
 .login{
    padding: 3rem;
    text-align: start;
 }
</style>