import { IProduct } from "@/type";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";


interface IinitialState{
    products?:IProduct[]
    thinkingDesign?:[
        {
            name:string,
            path:string,
            attachedLink:[
                {
                    title:string,
                    link:string
                }
            ]
        }
    ],
    product?:IProduct
}

const initialState:IinitialState = {
    products: undefined,
};

const authSilce = createSlice({
    name:"product",
    initialState,
    reducers:{
        getAllProducts:(state, action:PayloadAction<any>)=>{
            state.products = action.payload.products;
        },
        getThinkingDesign:(state, action:PayloadAction<any>)=>{
            state.thinkingDesign = action.payload.thinkingDesign;
        },
        getProduct:(state, action:PayloadAction<any>)=>{
            state.product = action.payload.product;
        },
    }
})

export const {getAllProducts,getThinkingDesign,getProduct} = authSilce.actions
export default authSilce.reducer