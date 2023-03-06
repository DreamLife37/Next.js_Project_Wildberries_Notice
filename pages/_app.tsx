import {Layout} from '@/app/components/layout/Layout'
import '@/styles/globals.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import type {AppProps} from 'next/app'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

export default function App({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>)
}
