import axios, { InternalAxiosRequestConfig } from 'axios'
import * as process from 'process'

import { AuthService } from '@services/auth.service'

export const API_URL = process.env.API_URL || ''
export const STATIC_URL = process.env.STATIC_URL || ''

export const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true
})

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
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
				return Promise.reject(e)
			}
		}

		return Promise.reject(error)
	}
)
