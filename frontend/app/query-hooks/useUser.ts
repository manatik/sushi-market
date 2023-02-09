import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { UserService } from '@services/user.service'

import type { IDefaultResponse } from '@common-types/default-response.types'
import type { IUser, UserResponse } from '@common-types/user.types'

export const useGetUser = () =>
	useQuery<UserResponse, AxiosError<IDefaultResponse>, IUser>(['user'], UserService.getInfo, {
		select: data => data.user
	})
