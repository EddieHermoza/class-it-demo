import { createApi } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@/config/env'
import { ReducerPath } from './constants/reducerPath.constants'
import { getBaseQuery } from './helpers/getBaseQuery'
import { TagTypes } from './constants/tagTypes.constants'
export const emptySavingApi = createApi({
  baseQuery: (args, api, extraOptions) =>
    getBaseQuery(args, { ...api, endpoint: API_URL }, extraOptions),

  endpoints: () => ({}),

  reducerPath: ReducerPath.api,

  tagTypes: [TagTypes.ClassRoom],

  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: 30,
})
