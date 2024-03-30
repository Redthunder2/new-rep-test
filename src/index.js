/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()
const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
<QueryClientProvider client={queryClient}>
    <App client={queryClient} />
</QueryClientProvider>
)
