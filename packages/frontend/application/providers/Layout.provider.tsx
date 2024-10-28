import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import AdminLayout from '@components/admin/layout/Layout'

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
			<AdminLayout>
				<Component {...pageProps} />
			</AdminLayout>
		)
	}

	return <Component {...pageProps} />
}

export default LayoutProvider
