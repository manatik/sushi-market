import { TypeComponentAuthFields } from '@common-types/private-route.interface'
import AuthProvider from '@providers/AuthProvider'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()

type TypeAppProps = AppProps & TypeComponentAuthFields

function App({ Component, pageProps }: TypeAppProps) {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<AuthProvider Component={Component}>
					<Component {...pageProps} />
				</AuthProvider>
			</QueryClientProvider>
		</RecoilRoot>
	)
}

export default App
