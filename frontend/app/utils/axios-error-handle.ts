import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const axiosErrorHandle = (e: unknown) => {
	if (e instanceof AxiosError) {
		toast.error(e.response?.data.message)
	}
}
