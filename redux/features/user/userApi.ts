
import { apiSlice } from "../api/apiSlice";
import { getAllOrder, getCollections } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllOrder:builder.mutation({
            query:()=>({
                url:"get-orders",
                method:"GET",
                credentials:"include" as const
            }),
            async onQueryStarted (arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        getAllOrder({
                            orders:result.data.orders
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getCollections:builder.mutation({
            query:()=>({
                url:"get-collections",
                method:"GET",
                credentials:"include" as const
            }),
            async onQueryStarted (arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        getCollections({
                            products:result.data.products
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        createReview:builder.mutation({
            query:(body)=>({
                url:"review",
                method:"POST",
                credentials:"include" as const,
                body
            }),
        }),
    })
})


export const {useGetAllOrderMutation, useCreateReviewMutation, useGetCollectionsMutation} = userApi