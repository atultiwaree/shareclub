import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';

export const searchProdcutApi = createApi({
  reducerPath: 'searchProdcutApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shareclub.shridaan.com/api/v1/product/',
  }),

  tagTypes: ['doggy'],

  endpoints: builder => ({
    getSearchedProducts: builder.query({
      query: ({searchedText}) => {
        console.log('Input', searchedText);
        return {url: `search/${searchedText}`};
      },
      providesTags: ['doggy'],
    }),
  }),
});

export const {useLazyGetSearchedProductsQuery} = searchProdcutApi;
