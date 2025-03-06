import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DefaultOptionType } from 'antd/es/cascader'
import { BaseOptionType } from 'antd/es/select'

export const brandsApi = createApi({
  reducerPath: 'brandsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  endpoints: (builder) => ({
    getBrands: builder.query<
      BaseOptionType[] | DefaultOptionType[] | undefined,
      void
    >({
      query: () => '/brands',
    }),
  }),
})

export const { useGetBrandsQuery } = brandsApi
