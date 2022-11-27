import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../../../server/src/trpc'

export const trpc = createTRPCReact<AppRouter>()

// router types
type RouterInput = inferRouterInputs<AppRouter>
export type StartInput = RouterInput['start']

// Provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import { inferRouterInputs } from '@trpc/server'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'

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
