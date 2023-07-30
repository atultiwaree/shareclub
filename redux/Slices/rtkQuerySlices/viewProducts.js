import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';

export const viewProductsApi = createApi({
  reducerPath: 'viewProductsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shareclub.shridaan.com/api/v1/product',
  }),
  tagTypes: ['view'],
  endpoints: builder => ({
    viewCategoryProducts: builder.query({
      query: ({category, type, limits}) => ({
        timeout: 25000,
        // url: type
        //   ? `view/${category}?type=${type}&limits=${limits}`
        url: `view/${category}?limits=${limits}`,
      }),
      providesTags: ['view'],
    }),
  }),
});

export const {useViewCategoryProductsQuery} = viewProductsApi;
