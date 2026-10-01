"use client"
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/apiSlice'
import authSlice from './features/auth/authSlice'
import productSlice from './features/product/productSlice'
import cartSlice from './features/cart/cartSlice'
import checkoutSlice from './features/checkout/checkoutSlice'
import userSlice from './features/user/userSlice'
import couponSlice from './features/coupon/couponSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    product:productSlice,
    cart:cartSlice,
    checkout:checkoutSlice,
    user:userSlice,
    coupon:couponSlice
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

const initializeApp = async () => {
  // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }))
  await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}

initializeApp()

export type RootState = ReturnType<typeof store.getState>
