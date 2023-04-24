import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AuthorizationRequest,
  AuthorizationResponse,
} from '../models/User/auth';
import { SignUpRequest, SignUpResponse } from '../models/User/signUp';

import { kkBaseQueryWithReAuth } from '../utils/api';

export const KKAPI = createApi({
  reducerPath: 'KK_REDUCER',
  baseQuery: kkBaseQueryWithReAuth,
  tagTypes: ['Kid', 'Kids', 'Team', 'Teams'],
  keepUnusedDataFor: 30,
  endpoints: (build) => ({
    login: build.mutation<AuthorizationResponse, AuthorizationRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'post',
        body: credentials,
      }),
    }),

    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      query: (params) => ({
        url: '/auth/signUp',
        method: 'post',
        body: params,
      }),
    }),

    // getKids: build.query<GetKidsResponse, unknown>({
    //   query: () => ({
    //     url: '/kid/getAll',
    //   }),
    //   providesTags: (result) => {
    //     return result
    //       ? [
    //           ...result.map(({ id }) => ({
    //             type: 'Kid' as const,
    //             id,
    //           })),
    //           'Kids',
    //         ]
    //       : ['Kids'];
    //   },
    // }),

    // getTeams: build.query<GetTeamsResponse, unknown>({
    //   query: () => ({
    //     url: '/team/get',
    //   }),
    //   providesTags: (result) => {
    //     return result
    //       ? [
    //           ...result.map(({ id }) => ({
    //             type: 'Team' as const,
    //             id,
    //           })),
    //           'Teams',
    //         ]
    //       : ['Teams'];
    //   },
    // }),

    // getKid: build.query<GetKidResponse, GetKidRequest>({
    //   query: (params) => ({
    //     url: '/kid/get',
    //     params,
    //   }),
    //   providesTags: (result) => (result ? ['Kid'] : []),
    // }),

    // addKid: build.mutation<AddKidResponse, AddKidRequest>({
    //   query: (params) => ({
    //     url: '/kid/add',
    //     method: 'post',
    //     body: params,
    //   }),
    //   invalidatesTags: (result, error, arg) =>
    //     error ? [] : [{ type: 'Kid' }, 'Kids'],
    // }),

    // editKid: build.mutation<EditKidResponse, EditKidRequest>({
    //   query: (params) => ({
    //     url: '/kid/edit',
    //     method: 'put',
    //     body: params,
    //   }),
    //   invalidatesTags: (result, error, arg) =>
    //     error ? [] : [{ type: 'Kid' }, 'Kids'],
    // }),

    // deleteKid: build.mutation<unknown, DeleteKidRequest>({
    //   query: (params) => ({
    //     url: '/kid/delete',
    //     method: 'delete',
    //     params,
    //   }),
    //   invalidatesTags: (result, error, arg) =>
    //     error ? [] : [{ type: 'Kid' }, 'Kids'],
    // }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = KKAPI;
