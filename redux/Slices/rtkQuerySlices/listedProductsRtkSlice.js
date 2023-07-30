import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';

export const getlistedProductsApi = createApi({
  reducerPath: 'getlistedProductsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shareclub.shridaan.com/api/v1/product',
  }),
  tagTypes: ['listdelist'],
  endpoints: builder => ({
    getAllListedProducts: builder.query({
      query: ({userId, userToken}) => ({
        timeout: 25000,
        url: `myproducts/${userId}`,
        headers: {
          'Content-Type': 'application/json',
          token: userToken,
        },
      }),
      providesTags: ['listdelist'],
    }),
    delistProduct: builder.mutation({
      query: ({productId, userId, userToken}) => ({
        url: `delist/${userId}?productId=${productId}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: userToken,
        },
      }),
      invalidatesTags: ['listdelist'],
    }),
  }),
});

export const {useGetAllListedProductsQuery, useDelistProductMutation} =
  getlistedProductsApi;
