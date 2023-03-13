import { axiosInstance } from '@api/axios'

import { IDefaultResponse } from '@common-types/default-response.types'
import {
	ICreateUser,
	IUpdateUser,
	IUserFilters,
	RolesResponse,
	UserResponse,
	UsersResponse
} from '@common-types/user.types'

export const UserService = {
	async all(filters: IUserFilters) {
		const { data } = await axiosInstance.get<UsersResponse>('user/all', {
			params: { onlyHidden: filters?.onlyHidden, name: filters?.search }
		})
		return data
	},

	async roles() {
		const { data } = await axiosInstance.get<RolesResponse>('role')
		return data
	},

	async getInfo() {
		const { data } = await axiosInstance.get<UserResponse>('user/info')
		return data
	},

	async create(dto: ICreateUser) {
		const { data } = await axiosInstance.post<UserResponse>('user', dto)
		return data
	},

	async update({ id, dto }: { id: string; dto: IUpdateUser }) {
		const { data } = await axiosInstance.patch<UserResponse>(`user/${id}`, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`user/${id}`)
		return data
	}
}
