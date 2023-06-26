import axios from 'axios'
import {User} from '@/model/user.interface'
import { AuthData } from '@/model/auth.interface'


export class UserService{

    baseUrl:string = import.meta.env.VITE_APP_API;
    context:any
    user:User | undefined
    token:string | null = localStorage.getItem('token') 

    constructor(context:any){
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

}

