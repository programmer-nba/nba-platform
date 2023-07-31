import axios from 'axios'

export class CounterService {

    context:any;
    baseUrl: string = import.meta.env.VITE_APP_API;
    token: string | null = localStorage.getItem('token')
    private token_test = import.meta.env.VITE_APP_SHOP_API_KEY;
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
                token: this.token
            },
            url:`${this.baseUrl}/counter_service/mobile_topup`
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
                token: this.token
            },
            url:`${this.baseUrl}/counter_service/nba_service`
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
                token: this.token
            },
            url:`${this.baseUrl}/counter_service/barcode_service`
        }
        await axios(request).then(response=>{
            data = response.data;
        })
        .catch(error => {
            data = error
        })

        return data;
    }

    // CardTopup 

    async getCardTopupServices(){
        let data=null;
        const request = {
            method:'get',
            headers:{
                token: this.token
            },
            url:`${this.baseUrl}/counter_service/card_topup`
        }
        await axios(request).then(response=>{
            data = response.data;
        })
        .catch(error => {
            data = error
        })
        return data;
    }
    
    //Proserm

    async getProSermServices(){
        let data=null;
        const request = {
            method:'get',
            headers:{
                'auth-token':this.token_test
            },
            url:`${this.shop_url}/api/cs/proserm`
        }
        await axios(request).then(response=>{
            data = response.data;
        })
        .catch(error => {
            data = error
        })
        return data;
    }

    // Keyservice

    async getKeyServices(){
        let data=null;
        const request = {
            method:'get',
            headers:{
                'auth-token':this.token_test
            },
            url:`${this.shop_url}/api/cs/key-in-service`
        }
        await axios(request).then(response=>{
            data = response.data;
        })
        .catch(error => {
            data = error
        })
        return data;
    }

    // Wallet

    async getWalletServices(){
        let data=null;
        const request = {
            method:'get',
            headers:{
                'auth-token':this.token_test
            },
            url:`${this.shop_url}/api/cs/wallet`
        }
        await axios(request).then(response=>{
            data = response.data;
        })
        .catch(error => {
            data = error
        })
        return data;
    }


    // Cash

    async getCashServices(){
        let data=null;
        const request = {
            method:'get',
            headers:{
                'auth-token':this.token_test
            },
            url:`${this.shop_url}/api/cs/cash-in`
        }
        await axios(request).then(response=>{
            data = response.data;
        })
        .catch(error => {
            data = error
        })
        return data;
    }
    
       // MoblieBill

       async getMoblieBill(){
        let data=null;
        const request = {
            method:'get',
            headers:{
                token: this.token
            },
            url:`${this.baseUrl}/counter_service/mobile_bill`
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
