import { ICategoryForm } from '@components/pages/admin/create/category/category.types'
import { axiosErrorHandle } from '@utils/axios-error-handle'
import { axiosInstance } from '../api/axios'

export const CategoryService = {
	async all() {
		try {
			const categories = await axiosInstance.get('category')
			console.log(categories)
		} catch (e) {
			axiosErrorHandle(e)
		}
	},

	async byId() {},

	async create(dto: ICategoryForm) {
		try {
			const res = await axiosInstance.post<ICategoryForm>('category', dto)
			console.log(res)
		} catch (e) {
			axiosErrorHandle(e)
		}
	},

	async update() {},

	async remove() {}
}
