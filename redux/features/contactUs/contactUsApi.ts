
import { apiSlice } from "../api/apiSlice";

export const contactUsApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createContactUs:builder.mutation({
            query:(body)=>({
                url:"contactus",
                method:"POST",
                body
            }),
            
        }),
    })
})


export const {useCreateContactUsMutation} = contactUsApi