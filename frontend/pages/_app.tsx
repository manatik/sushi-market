import { TypeComponentAuthFields } from '@common-types/private-route.types'
import LayoutProvider from '@providers/Layout.provider'

import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { isDev } from '@utils/env'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'

import '@styles/global.css'
import 'react-toastify/dist/ReactToastify.css'

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
