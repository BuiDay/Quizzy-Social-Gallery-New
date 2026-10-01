
import { ICoupon } from "@/type";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";


interface IinitialState{
    coupon?:ICoupon
}

const initialState:IinitialState = {
    coupon: undefined,
};

const couponSilce = createSlice({
    name:"coupon",
    initialState,
    reducers:{
        getCouponByName:(state, action:PayloadAction<any>)=>{
            state.coupon = action.payload.coupon;
        },
    }
})

export const {getCouponByName} = couponSilce.actions
export default couponSilce.reducer