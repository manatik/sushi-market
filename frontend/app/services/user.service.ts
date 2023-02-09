import { axiosInstance } from '@api/axios'

import { UserResponse } from '@common-types/user.types'

export const UserService = {
	async getInfo() {
		const { data } = await axiosInstance.get<UserResponse>('user/info')
		return data
	},

	async create() {
		const { data } = await axiosInstance.post('user')
	}
}
