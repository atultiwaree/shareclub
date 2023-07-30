import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';

export const singleProductDetailApi = createApi({
  reducerPath: 'singleProductDetailApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shareclub.shridaan.com/api/v1/product',
  }),

  endpoints: builder => ({
    getSingleProductDetail: builder.query({
      query: productId => ({
        url: `/singledetails/${productId}`,
      }),
    }),
  }),
});

export const {useGetSingleProductDetailQuery} = singleProductDetailApi;
