import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { FC } from 'react'

import Layout from '@components/admin/layout/Layout'

import AuthProvider from '@providers/Auth.provider'

import { TypeComponentAuthFields } from '@common-types/private-route.types'

interface ComponentWithLayoutProps {
	nextProps: AppProps & TypeComponentAuthFields
}

const LayoutProvider: FC<ComponentWithLayoutProps> = ({ nextProps }) => {
	const router = useRouter()
	const isAdmin: boolean = router.pathname.includes('admin')
	const { Component, pageProps } = nextProps

	if (isAdmin) {
		return (
			<AuthProvider Component={Component}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		)
	}

	return <Component {...pageProps} />
}

export default LayoutProvider
