
import { apiSlice } from "../api/apiSlice";
import { createPaymentLink, getPaymentLinkInfomation } from "./checkoutSlice";

export const checkoutApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createPaymentLink:builder.mutation({
            query:(data)=>({
                url:"checkout/create-link-payment",
                method:"POST",
                body:data,
                credentials:"include" as const
            }),
            async onQueryStarted (arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        createPaymentLink({
                            paymentLink:result.data.paymentLinkRes
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        paymentFree:builder.mutation({
            query:(data)=>({
                url:"checkout/payment-free",
                method:"POST",
                body:data,
                credentials:"include" as const
            }),
        }),
        checkPaymentLinkInfomation:builder.mutation({
            query:(query)=>({
                url:"checkout/get-payment-link-infomation",
                method:"GET",
                params:query,
                credentials:"include" as const
            }),
            async onQueryStarted (arg,{queryFulfilled,dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        getPaymentLinkInfomation({
                            paymentLinkInfomation:result.data.paymentLink
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        checkPaid:builder.mutation({
            query:(body)=>({
                url:"checkout/check-paid",
                method:"POST",
                body,
                credentials:"include" as const
            })
        }),
    })
})


export const {useCreatePaymentLinkMutation, useCheckPaymentLinkInfomationMutation,useCheckPaidMutation,usePaymentFreeMutation} = checkoutApi