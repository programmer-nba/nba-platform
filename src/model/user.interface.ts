export interface User {
    _id: string,
    card_number: string,
    name: string,
    tel: string,
    password: string,
    address: string,
    subdistrict: string,
    district: string,
    province: string,
    postcode: string,
    allsale: number,
    wallet: number,
    money: number,
    passcode: string,
    profile_image: string,
    happy_point: number,
    timestamp: string,
    status: boolean,
    __v: number,
    member_pin: string
    bank: {
        // name: string
        // number: string,
        // image: string,
        // status: boolean,
        // remark: string
    },
    iden: {
        // number: string,
        // image: string,
        // status: boolean,
        // remark: string
    },
    upline: {
        // lv1: string,
        // lv2: string,
        // lv3: string,
    },
}
