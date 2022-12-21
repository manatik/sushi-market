import type { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import type { ISignIn, ISignUp } from '@common-types/user.types'
import { axiosInstance } from '../api/axios'

const URLS = {
	singIn: 'auth/login',
	signUp: 'auth/register',
	refresh: 'auth/refresh'
}

export const AuthService = {
	async signIn(dto: ISignIn) {
		const { data } = await axiosInstance.post<IDefaultResponse>(URLS.singIn, dto)
		return data
	},

	async signUp(dto: ISignUp) {
		const { data } = await axiosInstance.post<IDefaultResponse>(URLS.signUp, dto)
		return data
	},

	async refresh() {
		const { data } = await axiosInstance.get<IDefaultResponse>(URLS.refresh)
		return data
	}
}
