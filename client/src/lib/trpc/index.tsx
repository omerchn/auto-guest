import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { inferRouterInputs } from '@trpc/server'
import { createTRPCReact } from '@trpc/react-query'

// types
import type { AppRouter } from '../../../../server/src/router'

export const trpc = createTRPCReact<AppRouter>()

type RouterInput = inferRouterInputs<AppRouter>
export type OpenInput = RouterInput['open']

export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export function TrpcProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            retry: false,
          },
        },
      })
  )
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: apiUrl + '/trpc',
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
