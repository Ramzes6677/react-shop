import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DefaultOptionType } from "antd/es/cascader";
import { BaseOptionType } from "antd/es/select";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<
      BaseOptionType[] | DefaultOptionType[] | undefined,
      void
    >({
      query: () => "/brands",
    }),
  }),
});

export const { useGetPostsQuery } = apiSlice;
