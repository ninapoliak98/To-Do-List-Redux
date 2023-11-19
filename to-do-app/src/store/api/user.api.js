import { api } from './api'

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation({
      query: (body) => ({
        url: 'users',
        method: "POST",
        body
      }),
      invalidatesTags: () => [{
        type: 'users',
      }]
    })
  })
})

export const { useCreateUserMutation } = userApi