import { TypeComponentAuthFields } from '@common-types/private-route.types'
import AuthProvider from '@providers/Auth.provider'
import LayoutProvider from '@providers/Layout.provider'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'

import 'react-toastify/dist/ReactToastify.css'
import '@styles/global.css'

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
				<AuthProvider Component={props.Component}>
					<LayoutProvider nextProps={props} />
				</AuthProvider>
			</QueryClientProvider>
		</RecoilRoot>
	)
}

export default App
