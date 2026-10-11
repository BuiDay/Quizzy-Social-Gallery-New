import { ICoupon } from "@/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IinitialState {
    coupon?: ICoupon
}

const initialState: IinitialState = {
    coupon: undefined,
};

const couponSilce = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        getCouponByName: (
            state,
            action: PayloadAction<{ coupon: ICoupon }>
        ) => {
            state.coupon = action.payload.coupon;
        },

        clearCoupon: (state) => {
            state.coupon = undefined;
        },
    }
})

export const {
    getCouponByName,
    clearCoupon
} = couponSilce.actions

export default couponSilce.reducer
