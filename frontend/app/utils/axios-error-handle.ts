import { AxiosError } from 'axios'
import { NextRouter } from 'next/router'
import { toast } from 'react-toastify'

export const axiosErrorHandle = (e: unknown, router?: NextRouter) => {
	if (e instanceof AxiosError) {
		if (e.response?.data.isForbidden && router) {
			router.push('/login')
		}

		toast.error(e.response?.data.message)
	}
}
