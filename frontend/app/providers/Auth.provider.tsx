import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'

import { TypeComponentAuthFields } from '@common-types/private-route.types'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
	ssr: false
})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({ children, Component }) => {
	if (!Component.isOnlyRoles?.length) {
		return <>{children}</>
	}

	return <DynamicCheckRole Component={{ isOnlyRoles: Component.isOnlyRoles }}>{children}</DynamicCheckRole>
}

export default AuthProvider
