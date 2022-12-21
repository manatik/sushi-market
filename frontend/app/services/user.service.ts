import { UserInfoResponse } from '@common-types/user.types'
import { axiosInstance } from '../api/axios'

export const UserService = {
	async getInfo() {
		const { data } = await axiosInstance.get<UserInfoResponse>('user/info')
		return data
	},

	async create() {
		const { data } = await axiosInstance.post('user')
	}
}
