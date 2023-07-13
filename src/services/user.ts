import axios from 'axios'
import {User} from '@/model/user.interface'
import { AuthData } from '@/model/auth.interface'
import { Topup } from '@/model/topup.interface'


export class UserService{

    baseUrl:string = import.meta.env.VITE_APP_API;
    context:any
    user:User | undefined
    topup:Topup | undefined
    token:string | null = localStorage.getItem('token') 

    constructor(context?:any){
        this.context= context
    }

    //login
   public async Login(AuthData:AuthData){

        let responseData = null

        const request = {
            method: 'post',
            url: `${this.baseUrl}/login`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : AuthData
        }

        await axios(request).then(data=>{

            responseData = {message:'Login successful',data:data.data}
          
        })
        .catch(error=>{
            responseData = {message:'Login failed',error:error.message}
        })

        return responseData;

    };

    //check me
   public async GetMe(){

        let responseData = null;

        const request = {
            method:'get',
            url: `${this.baseUrl}/me`,
            headers:{
                token : this.token
            }
        }

        await axios(request).then(response => {
            responseData=response.data;
        })
        .catch(error=>{
            responseData = error
        })

        return responseData;
    };

    //Monney History
    public async GetHistory(){

        let responseData = null;

        const request = {
            method:'get',
            url: `${this.baseUrl}/money/history`,
            headers:{
                token : this.token
            }
        }

        await axios(request).then(response => {
            responseData=response.data;
        })
        .catch(error=>{
            responseData = error
        })

        return responseData;
    };

    //Request History
    public async GetRequest(){

        let responseData = null;

        const request = {
            method:'get',
            url: `${this.baseUrl}/withdraw`,
            headers:{
                token : this.token
            }
        }

        await axios(request).then(response => {
            responseData=response.data;
        })
        .catch(error=>{
            responseData = error
        })

        return responseData;
    };

    //Check mobile services
     async checkMobileServices(Topup:Topup){
        let data = null;
        const request = {
            method:'post',
            headers:{
                token : this.token
            },
            data : Topup,
            url:`${this.baseUrl}/counter_service/mobile_topup/check`
        }
        await axios(request).then(response=>{
            data = {message: 'successful',data:response.data}
        })
        .catch(error => {
            data = {message: 'failed',error:error.message}
        })

        return data;
    }

    //Confirm mobile services
    async ConfirmMobileServices(Topup:Topup){
        let data = null;
        const request = {
            method:'post',
            headers:{
                token : this.token
            },
            data : Topup,
            url:`${this.baseUrl}/counter_service/mobile_topup/confirm`
        }
        await axios(request).then(response=>{
            data = {message: 'successful',data:response.data}
        })
        .catch(error => {
            data = {message: 'failed',error:error.message}
        })

        return data;
    }
}

