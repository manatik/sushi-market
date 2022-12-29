import { IDefaultResponse } from '@common-types/default-response.types'
import { IUser, UserResponse } from '@common-types/user.types'
import { UserService } from '@services/user.service'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useGetUser = () =>
	useQuery<UserResponse, AxiosError<IDefaultResponse>, IUser>(['user'], UserService.getInfo, {
		select: data => data.user
	})
