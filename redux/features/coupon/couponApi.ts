import { apiSlice } from "../api/apiSlice";
import {
    clearCoupon,
    getCouponByName
} from "./couponSlice";

type GetCouponParams =
    | string
    | {
        couponName: string;
        productId?: string;
    };

export const couponApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoupon: builder.mutation({
            query: (param: GetCouponParams) => {
                /*
                 * Backward compatible:
                 * - getCouponByName("SALE10")
                 * - getCouponByName({
                 *     couponName: "SALE10",
                 *     productId: "PRODUCT_ID"
                 *   })
                 */
                const couponName =
                    typeof param === "string"
                        ? param
                        : param.couponName;

                const productId =
                    typeof param === "string"
                        ? undefined
                        : param.productId;

                const queryString =
                    productId
                        ? `?productId=${encodeURIComponent(productId)}`
                        : "";

                return {
                    url: `coupon/${encodeURIComponent(couponName)}${queryString}`,
                    method: "GET",
                };
            },

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                /*
                 * Xóa coupon cũ trước khi lookup để tránh Redux
                 * giữ mã của lần apply trước.
                 */
                dispatch(clearCoupon());

                try {
                    const result = await queryFulfilled;

                    dispatch(
                        getCouponByName({
                            coupon: result.data.coupon
                        })
                    );
                } catch (error) {
                    dispatch(clearCoupon());
                    console.log(error);
                }
            }
        }),
    }),
})


export const { useGetCouponMutation } = couponApi
