
import { headers } from "next/headers";
import { apiSlice } from "../api/apiSlice";
import { getAllProducts, getProduct, getThinkingDesign } from "./productSlice";
export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAll: builder.mutation({
            query: (query) => ({
                url: "product/get-all",
                method: "GET",
                params: query
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        getAllProducts({
                            products: result.data.products
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getById: builder.mutation({
            query: (id) => ({
                url: `product/${id}`,
                method: "GET",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        getProduct({
                            product: result.data.product
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getThinkingDesign: builder.mutation<any, any>({
            query(page) {
                try {
                    return {
                        url: `product/get-thinking/${page}`,
                        method: "GET",
                        responseHandler: async (response:any) => window.URL.createObjectURL(await response.blob()),
                        cache: "no-cache",
                        credentials: 'include' as const
                    };
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        getSocialMediaBeginner: builder.mutation<any, any>({
            query(page) {
                try {
                    return {
                        url: `product/get-social-media-beginner/${page}`,
                        method: "GET",
                        responseHandler: async (response:any) => window.URL.createObjectURL(await response.blob()),
                        cache: "no-cache",
                        credentials: 'include' as const
                    };
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        getIdeasHacking: builder.mutation<any, any>({
            query(page) {
                try {
                    return {
                        url: `product/ideas-hacking/${page}`,
                        method: "GET",
                        responseHandler: async (response:any) => window.URL.createObjectURL(await response.blob()),
                        cache: "no-cache",
                        credentials: 'include' as const
                    };
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        getSocialMedia: builder.mutation<any, any>({
            query(body) {
                try {
                    return {
                        url: `product/get-social-media/${body.currentPage}/${body.forderName}/${body.productId}`,
                        method: "GET",
                        responseHandler: async (response:any) =>window.URL.createObjectURL(await response.blob()),
                        cache: "no-cache",
                        credentials: 'include' as const
                    };
                } catch (error) {
                    console.log(error)
                }
            },
        }),
    }),

})


export const { useGetAllMutation, useGetThinkingDesignMutation, useGetByIdMutation, useGetSocialMediaMutation,useGetSocialMediaBeginnerMutation,useGetIdeasHackingMutation} = productApi