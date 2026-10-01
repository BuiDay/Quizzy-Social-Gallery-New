import {IPaymentLink, IpaymentLinkInfomation } from "@/type";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";


interface IinitialState{
    paymentLink?:IPaymentLink
    paymentLinkInfomation?:IpaymentLinkInfomation
}

const initialState:IinitialState = {
    paymentLink:undefined,
    paymentLinkInfomation:undefined
};

const checkoutSilce = createSlice({
    name:"checkout",
    initialState,
    reducers:{
        createPaymentLink:(state, action:PayloadAction<any>)=>{
            state.paymentLink = action.payload.paymentLink;
        },
        getPaymentLinkInfomation:(state, action:PayloadAction<any>)=>{
            state.paymentLinkInfomation = action.payload.paymentLinkInfomation;
        },
    }
})

export const {createPaymentLink,getPaymentLinkInfomation} = checkoutSilce.actions
export default checkoutSilce.reducer