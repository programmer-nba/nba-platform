import axios from 'axios'

export class CounterService {

    context:any;
    private token = import.meta.env.VITE_APP_SHOP_API_KEY;
    private shop_url = import.meta.env.VITE_APP_SHOP_API
    constructor(context:any){
        this.context = context
    }

    //get mobile services
    async getMobileServices(){
        let data=null;
        const request = {
            method:'get',
            headers:{
                'auth-token':this.token
            },
            url:`${this.shop_url}/api/cs/mobile-topup`
        }
        await axios(request).then(response=>{
            data = response.data;
        })
        .catch(error => {
            data = error
        })

        return data;
    }

    //service NBA
    
      async getNBAServices(){
        let data=null;
        const request = {
            method:'get',
            headers:{
                'auth-token':this.token
            },
            url:`${this.shop_url}/api/cs/nbaservice`
        }
        await axios(request).then(response=>{
            data = response.data;
        })
        .catch(error => {
            data = error
        })

        return data;
    }

      //Barcode service

           async getBarcodeServices(){
        let data=null;
        const request = {
            method:'get',
            headers:{
                'auth-token':this.token
            },
            url:`${this.shop_url}/api/cs/barcode-service`
        }
        await axios(request).then(response=>{
            data = response.data;
        })
        .catch(error => {
            data = error
        })

        return data;
    }

    
}
