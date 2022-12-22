import { TypeComponentAuthFields } from '@common-types/private-route.types'
import LayoutProvider from '@providers/Layout.provider'
import '@styles/global.css'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false
		}
	}
})

type TypeAppProps = AppProps & TypeComponentAuthFields

function App(props: TypeAppProps) {
	return (
		<RecoilRoot>
			<ToastContainer />
			<QueryClientProvider client={queryClient}>
				<LayoutProvider nextProps={props} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</RecoilRoot>
	)
}

export default App
