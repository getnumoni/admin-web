'use client'

import { Toaster } from '@/components/ui/sonner'
import { TanstackProviderProps } from '@/lib/types'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { useState } from 'react'

const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const [queryClient] = useState(() => new QueryClient({}))

  return (

    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>

  )
}

export default TanstackProvider
