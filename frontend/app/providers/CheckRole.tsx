import { TypeComponentAuthFields } from '@common-types/private-route.types'
import { IUserAuth } from '@common-types/user.types'
import { AuthService } from '@services/auth.service'
import { useQuery } from '@tanstack/react-query'
import { HOME_PATH, LOGIN_PATH } from '@utils/pages-paths'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren } from 'react'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component: { isOnlyRoles }
}) => {
	const router = useRouter()
	const {
		isLoading: authIsLoading,
		data: authData,
		error
	} = useQuery<IUserAuth, AxiosError<any>>(['auth'], AuthService.isAuth, {
		cacheTime: 0,
		staleTime: 0,
		refetchInterval: 30000
	})

	if (authIsLoading) {
		return <div>loading...</div>
	}

	if (error?.response?.status === 401) {
		router.pathname !== HOME_PATH && router.push(LOGIN_PATH)
	}

	if (isOnlyRoles?.length && !authData?.roles.some(role => isOnlyRoles.includes(role.name))) {
		router.pathname !== HOME_PATH && router.replace(HOME_PATH)
	}

	if (authData?.isAuth) {
		return <>{children}</>
	}

	return null
}

export default CheckRole
