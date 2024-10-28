import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { UserService } from '@services/user.service'

import { UpdateQueryHook } from '@common-types/common.types'
import type { IDefaultResponse } from '@common-types/default-response.types'
import type { ICreateUser, IRole, IUpdateUser, IUser, UserResponse, UsersResponse } from '@common-types/user.types'
import { IUserFilters, RolesResponse } from '@common-types/user.types'

export const useGetUser = () =>
	useQuery<UserResponse, AxiosError<IDefaultResponse>, IUser>(['user'], UserService.getInfo, {
		select: data => data.user
	})

export const useUsers = (filters: IUserFilters) =>
	useQuery<UsersResponse, AxiosError<IDefaultResponse>, IUser[]>(['users', filters], () => UserService.all(filters), {
		select: data => data.users
	})

export const useRoles = () =>
	useQuery<RolesResponse, AxiosError<IDefaultResponse>, IRole[]>(['roles'], UserService.roles, {
		select: data => data.roles
	})

export const useCreateUser = () => {
	const queryClient = useQueryClient()

	return useMutation<UserResponse, AxiosError<IDefaultResponse>, ICreateUser>(['create-user'], UserService.create, {
		onSuccess(data) {
			queryClient.invalidateQueries({ queryKey: ['users'] })
			toast.success(data.message)
		},
		onError(error) {
			toast.error(
				<div>
					<p>{error.response?.data.message}</p>
					<p>{error.response?.data.error}</p>
				</div>
			)
		}
	})
}

export const useUpdateUser = ({ isShowToast }: UpdateQueryHook = { isShowToast: true }) => {
	const queryClient = useQueryClient()

	return useMutation<UserResponse, AxiosError<IDefaultResponse>, { id: string; dto: IUpdateUser }>(
		['update-user'],
		UserService.update,
		{
			onSuccess(data) {
				queryClient.invalidateQueries({ queryKey: ['users'] })

				if (isShowToast) {
					toast.success(data.message)
				}
			},
			onError(error) {
				toast.error(
					<div>
						<p>{error.response?.data.message}</p>
						<p>{error.response?.data.error}</p>
					</div>
				)
			}
		}
	)
}

export const useSoftRemoveUser = () => {
	const queryClient = useQueryClient()

	return useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, string>(['remove-user'], UserService.remove, {
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['users'] })
		}
	})
}
