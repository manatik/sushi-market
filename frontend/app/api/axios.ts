import { AuthService } from '@services/auth.service'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const API_URL = `${process.env.API_URL}`

export const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true
})

axiosInstance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	response => {
		return response
	},
	async error => {
		const originalRequest = error.config

		if (error.response.status === 401) {
			try {
				await AuthService.refresh()
				return axiosInstance(originalRequest)
			} catch (e) {
				if (e instanceof AxiosError) {
					if (e.response?.status === 403) {
						error.response.data.isForbidden = true
						return Promise.reject(error)
					}
				}

				return Promise.reject(error)
			}
		}

		return Promise.reject(error)
	}
)
