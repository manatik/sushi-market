import {
	ISignInForm,
	ISignResponse,
	ISignUpForm
} from '@components/pages/authorization/authorization.types'
import { axiosErrorHandle } from '@utils/axios-error-handle'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '../api/axios'

const URLS = {
	singIn: 'auth/login',
	signUp: 'auth/register'
}

export const AuthService = {
	async signIn(dto: ISignInForm) {
		try {
			const { data } = await axiosInstance.post<ISignInForm, AxiosResponse<ISignResponse>>(
				URLS.singIn,
				dto
			)
			return data
		} catch (e) {
			axiosErrorHandle(e)
		}
	},

	async signUp(dto: ISignUpForm) {
		const { data } = await axiosInstance.post<ISignUpForm, AxiosResponse<ISignResponse>>(
			URLS.signUp,
			dto
		)
		return data
	}
}
