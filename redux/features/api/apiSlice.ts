import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../auth/authSlice'

const baseQuery = fetchBaseQuery({ baseUrl: `https://quizzysocialgallery.com/api/v1` });

const baseQueryWithReauth = async (args:any, api:any, extraOptions:any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    const refreshResult = await baseQuery({
      url: 'refresh-token',
      method: 'GET',
      credentials: 'include' as const
    }, api, extraOptions);
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: () => ({
        url: 'get-user-by-id',
        method: 'GET',
        credentials: 'include' as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user
            })
          )
        } catch (error) {
          // console.log(error)
        }
      }
    }),
  })
})

export const { useLoadUserQuery} = apiSlice
