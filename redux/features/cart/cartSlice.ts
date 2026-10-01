import { ICart } from "@/type";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";


interface IinitialState{
    cart?:ICart
}

const initialState:IinitialState = {
    cart: undefined,
};

const cartilce = createSlice({
    name:"cart",
    initialState,
    reducers:{
        getCart:(state, action:PayloadAction<any>)=>{
            state.cart = action.payload.cart;
        },
    }
})

export const {getCart} = cartilce.actions
export default cartilce.reducer