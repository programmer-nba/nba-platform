import { AuthData } from '@/model/auth.interface';
import { User } from '@/model/user.interface';
import axios from 'axios';
import { LocationQuery } from 'vue-router';



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

    //Get By Id History
    public async GetByIdHistory(Id: String) {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/money/history/${Id}`,
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
    public async GetPreorderById(Data: any) {
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
                console.log(error)

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

    //ById Report Withdraw
    public async GetByIdReprtWithdraw(Id: string) {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/withdraw/${Id}`,
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
    async checkMobileServices(Topup: LocationQuery) {
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
    async ConfirmMobileServices(Topup: LocationQuery) {
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
    async checkCardTopupServices(CardTopupService: LocationQuery) {
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
    async ConfirmCardTopupServices(CardTopupService: LocationQuery) {
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

    //GetById History Wallet
    public async GetByIdHistoryWallet(Id: String) {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/wallet/${Id}`,
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

    //Request Report Wallet
    public async GetByIdReprtWallet(Id: string) {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/wallet/${Id}`,
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


    //Check MobileBill
    async CheckMobileBill(MobileBill: any) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: MobileBill,
            url: `${this.baseUrl}/counter_service/mobile_bill/check`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

    //Get MobileBill
    async getMobileBill(MobileBill: any) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: MobileBill,
            url: `${this.baseUrl}/counter_service/mobile_bill/get-transaction`
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

    //Confirm MobileBill
    async ConfirmMobileBill(MobileBill: any) {
        let data = null;
        const request = {
            method: 'post',
            headers: {
                token: this.token
            },
            data: MobileBill,
            url: `${this.baseUrl}/counter_service/mobile_bill/confirm`
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

    //Check mobile services
    async CheckWalletServices(Wallet: LocationQuery) {
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
    async ConfirmekWalletServices(Wallet: LocationQuery) {
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
    async CheckQRCode(Data: LocationQuery) {
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
    async VerifyQRCode(Data: LocationQuery) {
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
    async ConfirmeQRCode(Data: LocationQuery) {
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

    // Get History Member
    public async GetHistoryWalletMember() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/wallet/history/memberhistory`,
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

    // Get Account Service
    public async GetAccountService() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/nbaservice/accountservice/list`,
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

    // Get Account Service
    public async GetByIdAccountService(ID: string) {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/nbaservice/accountservice/package/listbycate/${ID}`,
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

    // Get Facebook Service
    public async GetFaceBookService() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/nbaservice/facebookservice/list`,
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

    //Post Report Wallet
    public async PostFacebook(Data: any) {

        let data = null;

        const request = {
            method: 'post',
            data: Data,
            url: `${this.baseUrl}/nbaservice/facebookservice/order`,
            headers: {
                token: this.token
            }
        }

        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    }

    // Get WebSite Service
    public async GetWebSiteService() {

        let responseData = null;

        const request = {
            method: 'get',
            url: `${this.baseUrl}/nbaservice/websiteservice/list`,
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

    //Post WebSite
    public async PostWebSite(Data: any) {

        let data = null;

        const request = {
            method: 'post',
            data: Data,
            url: `${this.baseUrl}/nbaservice/websiteservice/order`,
            headers: {
                token: this.token
            }
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

    // Get Country
    public async GetCountry(language: string) {

        let data = null;

        const request = {
            method: 'get',
            url: `https://api.nbadigital.tech/v1/nba-hotel/aocflight/countrycode/${language}`,
            headers: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2lkIjoiNjQ3ODViY2FjYzVhNDU3NzA1MzFlNzFlIiwiY29tcGFueSI6Ik5CQSBEaWdpdGFsIDkxMTEiLCJzaWduYXR1cmUiOiIzMDQwMDIxZTFhNTFmMDMzZTA4ZTU4ZWEwYjEzNDU1MDI4YjQ4OWI5Y2FhY2MzODEyZGViODJlNGM4MWFjZDc5YzQ3MjAyMWUxNjQ5NTc3YjhlYTcyMDllZjU1Y2I5YjljNTJjM2UwYjdkMzUyMmU1MGE4M2ZlOGVmZTEzZDM5Yjk3NzgiLCJyb2xlIjoiQVBJUEFSVE5FUiIsImlhdCI6MTY4NTYwOTQxOH0.ZULfQIAp8oXtMXscNog_ZNMNtXhFBQDD7FxRbzevYCo'
            }
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    };

    
    // Get CountryCode
    public async GetCountryCode(Code: string,language: string) {

        let data = null;

        const request = {
            method: 'get',
            url: `https://api.nbadigital.tech/v1/nba-hotel/aocflight/citycode/${Code}?language=${language}`,
            headers: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2lkIjoiNjQ3ODViY2FjYzVhNDU3NzA1MzFlNzFlIiwiY29tcGFueSI6Ik5CQSBEaWdpdGFsIDkxMTEiLCJzaWduYXR1cmUiOiIzMDQwMDIxZTFhNTFmMDMzZTA4ZTU4ZWEwYjEzNDU1MDI4YjQ4OWI5Y2FhY2MzODEyZGViODJlNGM4MWFjZDc5YzQ3MjAyMWUxNjQ5NTc3YjhlYTcyMDllZjU1Y2I5YjljNTJjM2UwYjdkMzUyMmU1MGE4M2ZlOGVmZTEzZDM5Yjk3NzgiLCJyb2xlIjoiQVBJUEFSVE5FUiIsImlhdCI6MTY4NTYwOTQxOH0.ZULfQIAp8oXtMXscNog_ZNMNtXhFBQDD7FxRbzevYCo'
            }
        }
        await axios(request).then(response => {
            data = { message: 'successful', data: response.data }
        })
            .catch(error => {
                data = { message: 'failed', error: error.message, test: error.response.data }
            })

        return data;
    };

    // Post AocFlight
    public async PostAocFlight(Data: any) {

        let data = null;

        const request = {
            method: 'post',
            data: Data,
            url: `https://api.nbadigital.tech/v1/nba-hotel/aocflight/search`,
            headers: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2lkIjoiNjQ3ODViY2FjYzVhNDU3NzA1MzFlNzFlIiwiY29tcGFueSI6Ik5CQSBEaWdpdGFsIDkxMTEiLCJzaWduYXR1cmUiOiIzMDQwMDIxZTFhNTFmMDMzZTA4ZTU4ZWEwYjEzNDU1MDI4YjQ4OWI5Y2FhY2MzODEyZGViODJlNGM4MWFjZDc5YzQ3MjAyMWUxNjQ5NTc3YjhlYTcyMDllZjU1Y2I5YjljNTJjM2UwYjdkMzUyMmU1MGE4M2ZlOGVmZTEzZDM5Yjk3NzgiLCJyb2xlIjoiQVBJUEFSVE5FUiIsImlhdCI6MTY4NTYwOTQxOH0.ZULfQIAp8oXtMXscNog_ZNMNtXhFBQDD7FxRbzevYCo'
            }
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

