import axios from 'axios'
import * as process from 'process'

export const API_URL = `${process.env.API_URL}`

export const axiosInstance = axios.create({
	baseURL: API_URL
})

axiosInstance.interceptors.request.use(
	config => {
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
	error => {
		return Promise.reject(error)
	}
)
