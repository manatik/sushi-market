import { TypeComponentAuthFields } from '@common-types/private-route.interface'
import AuthProvider from '@providers/Auth.provider'
import '@styles/global.css'
import LayoutProvider from '@providers/Layout.provider'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()

type TypeAppProps = AppProps & TypeComponentAuthFields

function App(props: TypeAppProps) {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<AuthProvider Component={props.Component}>
					<LayoutProvider nextProps={props} />
				</AuthProvider>
			</QueryClientProvider>
		</RecoilRoot>
	)
}

export default App
