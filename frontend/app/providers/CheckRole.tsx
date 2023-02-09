import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren } from 'react'

import Loader from '@components/ui/loader/Loader'

import { AuthService } from '@services/auth.service'

import { TypeComponentAuthFields } from '@common-types/private-route.types'
import { IUserAuth } from '@common-types/user.types'

import { HOME_PATH, LOGIN_PATH } from '@utils/pages-paths'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({ children, Component: { isOnlyRoles } }) => {
	const router = useRouter()
	const {
		isLoading: authIsLoading,
		data: authData,
		error
	} = useQuery<IUserAuth, AxiosError<any>>(['auth'], AuthService.isAuth, {
		refetchInterval: 60000,
		staleTime: 60000,
		cacheTime: 60000
	})

	if (authIsLoading) {
		return <Loader />
	}

	if (error?.response?.status && error?.response?.status >= 401) {
		router.push(LOGIN_PATH)
		return null
	}

	if (
		isOnlyRoles?.length &&
		!authData?.roles.some(role => isOnlyRoles.includes(role.name)) &&
		router.pathname !== HOME_PATH
	) {
		router.replace(HOME_PATH)
	}

	if (authData?.isAuth) {
		return <>{children}</>
	}

	return null
}

export default CheckRole
