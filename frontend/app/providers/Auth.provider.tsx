import { TypeComponentAuthFields } from '@common-types/private-route.types'
import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
	ssr: false
})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({ children, Component }) => {
	return !Component.isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyUser: Component.isOnlyUser }}>{children}</DynamicCheckRole>
	)
}

export default AuthProvider
