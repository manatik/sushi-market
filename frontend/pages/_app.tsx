import '@styles/global.css'
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'

import LayoutProvider from '@providers/Layout.provider'

import { TypeComponentAuthFields } from '@common-types/private-route.types'

import { isDev } from '@utils/env'

type TypeAppProps = AppProps<{ dehydratedState: DehydratedState }> & TypeComponentAuthFields

function App(props: TypeAppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: false
					}
				}
			})
	)

	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<ToastContainer position={'top-center'} autoClose={1500} />

				<Hydrate state={props.pageProps.dehydratedState}>
					<LayoutProvider nextProps={props} />
				</Hydrate>

				{isDev && <ReactQueryDevtools initialIsOpen={false} />}
			</QueryClientProvider>
		</RecoilRoot>
	)
}

export default App
