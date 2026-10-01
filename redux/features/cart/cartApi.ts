
import { apiSlice } from "../api/apiSlice";
import { getCart } from "./cartSlice";
export const cartApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getCart:builder.mutation({
            query:()=>({
                url:"cart",
                method:"GET",
                credentials:"include" as const
            }),
            async onQueryStarted (arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        getCart({
                            cart:result.data.cart
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        addCart:builder.mutation({
            query:(cart)=>({
                url:"cart/add-cart",
                method:"POST",
                body:cart,
                credentials:"include" as const
            }),
        }),
        deleteCart:builder.mutation({
            query:()=>({
                url:"cart/delete-cart",
                method:"DELETE",
                credentials:"include" as const
            }),
        }),
    })
})


export const {useGetCartMutation, useAddCartMutation,useDeleteCartMutation} = cartApi