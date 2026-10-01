import { string } from "zod"

export interface ISignUp {
    name: string,
    email: string
    password: string
}

export interface ISignUpResponse {
    success: boolean,
    message: string
    activationToken: string
}

export interface ICart {
    _id: string,
    products: [
        {
            product: IProduct,
            count: number,
            price: number,
        }
    ],
    productsTotal: number,
    cartTotal: number,
}

export interface IProduct {
    _id: string
    name?: string,
    thumnail?: string,
    description?: string,
    price?: number,
    category?: string,
    url?: string,
    charge?:string,
    discount?:IDiscount,
    isShow?:boolean,
    isCombo?:boolean,
    comboInclude?:string[]
    descriptionLink?:string,
    instructionLink?:string,
    lauchStatus?:boolean,
    urlUpdate?:string,
}

export interface IDiscount{
    name?:string,
    expiry?:Date,
    discountPrice?:number,
    productCount?: number,
    productCountCurrent?: number,
}


export interface IUser {
    courses?: [],
    email?: string,
    isVerified?: boolean,
    name?: string,
    role?: string,
    _id?: string,
    avatar?: {
        public_id: string,
        url: string
    },
    products?: string[]
}


export interface IPaymentLink{
    checkoutUrl?:string,
}


export interface ICoupon{
    _id: string
    name:string
    discount: number,
}

export interface IpaymentLinkInfomation{
    id?: string
    orderCode: number,
    amount: number,
    amountPaid: number,
    amountRemaining: number,
    status: string,
    createdAt: string,
    transactions: [],
}
export interface IOrder{
    payment_info: {
        status: string,
        description: string,
        amount: number,
        product: {
            name: string,
            category: string
        }
    },
    _id: string,
    codeOrder: number,
    createdAt: any,
}