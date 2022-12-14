import { TypeComponentAuthFields } from '@common-types/private-route.types'
import Layout from '@components/admin/layout/Layout'
import AuthProvider from '@providers/Auth.provider'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface ComponentWithLayoutProps {
	nextProps: AppProps & TypeComponentAuthFields
}

const LayoutProvider: FC<ComponentWithLayoutProps> = ({ nextProps }) => {
	const router = useRouter()
	const isAdmin: boolean = router.pathname.includes('admin')
	const { Component, pageProps } = nextProps

	if (isAdmin) {
		return (
			<Layout>
				<AuthProvider Component={Component}>
					<Component {...pageProps} />
				</AuthProvider>
			</Layout>
		)
	}

	return <Component {...pageProps} />
}

export default LayoutProvider
