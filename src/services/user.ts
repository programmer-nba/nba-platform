import axios from 'axios'
import { User } from '@/model/user.interface'
import { AuthData } from '@/model/auth.interface'



export class UserService {

    baseUrl: string = import.meta.env.VITE_APP_API;
    context: any
    user: User | undefined
    token: string | null = localStorage.getItem('token')

    constructor(context?: any) {
        this.context = context
    }

    //login
    public async Login(AuthData: AuthData) {

        let responseData = null

        const request = {
            method: 'post',
            url: `${this.baseUrl}/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: AuthData
        }

        await axios(request).then(data => {

            responseData = { message: 'Login successful', data: data.data }

        })
            .catch(error => {
                responseData = { message: 'Login failed', error: error.message }
            })

        return responseData;

    };

    //logout
    public async Logout(Data: null) {

        let responseData = null

        const request = {
            method: 'post',
            url: `${this.baseUrl}/logout`,
            headers: {
                token: this.token
            },
            data: Data
        }

        await axios(request).then(data => {

            responseData = { message: 'Logout successful', data: data.data }

        })
            .catch(error => {
                responseData = { message: 'Logout failed', error: error.message }
            })

        return responseData;

    };
    
      //CreatePin
      public async CreatePin(Pin: string) {

        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: ({
                "member_pin": Pin
            }),
            url: `${this.baseUrl}/member/create_pin`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    };

    //CreatePin
    public async CheckPin(Pin: string) {

        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: ({
                "member_pin": Pin
            }),
            url: `${this.baseUrl}/member/verify_member_pin`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
                console.log(error);
            })

        return data;
    };

    //check me
    public async GetMe() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/me`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

     //Get Notify
     public async GetNotify() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/notify`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

     //Put Notify
     public async PutNotify(ID: string) {

        let responseData = null;

        const request = {
            method: 'Put',
            url: `${this.baseUrl}/notify/${ID}`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

     //Delete Notify
     public async DeleteNotify(ID: string) {

        let responseData = null;

        const request = {
            method: 'delete',
            url: `${this.baseUrl}/notify/${ID}`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

     //Delete Notify
     public async DeleteAllNotify() {

        let responseData = null;

        const request = {
            method: 'delete',
            url: `${this.baseUrl}/notify`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

    //Get Mumber
    public async GetMumber() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/member/online_device`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

    //Delete Mumber
    public async DeleteMumber(ID: string) {

        let responseData = null;

        const request = {
            method: 'delete',
            url: `${this.baseUrl}/member/online_device/${ID}`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

    //Chang Password
    public async ChangPassword(Password: string) {

        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: ({
                "password": Password
            }),
            url: `${this.baseUrl}/member/change_password`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    };

    //Monney History
    public async GetHistory() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/money/history`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

    //Get ArtWork
    public async GetArtWork() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/artwork/category`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

    //Get ArtWork By ID
    public async GetArtWorkById(Id: String) {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/artwork/category/${Id}`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

    //Get Preorder By ID
    public async GetPreorderById(Data: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: Data,
            url: `${this.baseUrl}/artwork/create-preorder`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error, test: error.response.data }
                
            })

        return data;
    };

    //Request History
    public async GetRequest() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/withdraw`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

    //Check mobile services
    async checkMobileServices(Topup: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: Topup,
            url: `${this.baseUrl}/counter_service/mobile_topup/check`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

    //Confirm mobile services
    async ConfirmMobileServices(Topup: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: Topup,
            url: `${this.baseUrl}/counter_service/mobile_topup/confirm`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message }
            })

        return data;
    }

    //Check mobile services
    async checkCardTopupServices(CardTopupService: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: CardTopupService,
            url: `${this.baseUrl}/counter_service/card_topup/check`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

    //Confirm mobile services
    async ConfirmCardTopupServices(CardTopupService: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: CardTopupService,
            url: `${this.baseUrl}/counter_service/card_topup/confirm`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

    //Post Topup services
    async PostTopupServices(Formdata = new FormData) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            url: `${this.baseUrl}/wallet`,
            data: Formdata,
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

    //Post NBA Services
    async PostNBAServices(NBA = new FormData) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            url: `${this.baseUrl}/counter_service/nba_service/create-preorder`,
            data: NBA,
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

    //Request History Wallet
    public async GetHistoryWallet() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/wallet/history/in-out`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

    //Request Report Wallet
    public async GetReprtWallet() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/wallet`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            responseData = response.data;
        })
            .catch(error => {
                responseData = error
            })

        return responseData;
    };

    //Check mobile services
    async CheckWalletServices(Wallet: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: Wallet,
            url: `${this.baseUrl}/counter_service/wallet/check`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

    //Confirme mobile services
    async ConfirmekWalletServices(Wallet: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: Wallet,
            url: `${this.baseUrl}/counter_service/wallet/confirm`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

    //Post mobile services
    async PostkCommissions(Commissions: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: ({
                "amount": Commissions
            }),
            url: `${this.baseUrl}/withdraw`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

     //Check QR Code
     async CheckQRCode(Data: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: Data,
            url: `${this.baseUrl}/counter_service/barcode_service/check`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

      //Verify QR Code
      async VerifyQRCode(Data: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: Data,
            url: `${this.baseUrl}/counter_service/barcode_service/verify`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
                console.log(error)
            })

        return data;
    }

     //Confirme QR Code
     async ConfirmeQRCode(Data: String) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: Data,
            url: `${this.baseUrl}/counter_service/barcode_service/confirm`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
                console.log(error)
            })

        return data;
    }
}

