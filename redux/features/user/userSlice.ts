import { ICart, IOrder, IProduct } from "@/type";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";


interface IinitialState{
    orders?:IOrder[]
    products?:IProduct[]
}

const initialState:IinitialState = {
    orders: undefined,
    products:undefined
};

const orderSilce = createSlice({
    name:"order",
    initialState,
    reducers:{
        getAllOrder:(state, action:PayloadAction<any>)=>{
            state.orders = action.payload.orders;
        },
        getCollections:(state, action:PayloadAction<any>)=>{
            state.products = action.payload.products;
        },
    }
})

export const {getAllOrder,getCollections} = orderSilce.actions
export default orderSilce.reducer