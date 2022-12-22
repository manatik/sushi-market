import type { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import { IUserAuth } from '@common-types/user.types'
import type { ISignIn, ISignUp } from '@common-types/user.types'
import { axiosInstance } from '../api/axios'

const URLS = {
	singIn: 'auth/login',
	signUp: 'auth/register',
	refresh: 'auth/refresh',
	isAuth: 'auth/is-auth',
	logout: 'auth/logout'
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
	},

	async isAuth() {
		const { data } = await axiosInstance.get<IUserAuth>(URLS.isAuth)
		return data
	},

	async logout() {
		const { data } = await axiosInstance.get<IDefaultResponse>(URLS.logout)
		return data
	}
}
