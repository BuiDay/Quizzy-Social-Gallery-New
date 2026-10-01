
import { apiSlice } from "../api/apiSlice";
import { getCouponByName } from "./couponSlice";

export const couponApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoupon: builder.mutation({
            query: (param) => ({
                url: `coupon/${param}`,
                method: "GET",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        getCouponByName({
                            coupon: result.data.coupon
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    }),

})


export const { useGetCouponMutation } = couponApi