import type { ICreateCategory } from '@common-types/category.types'
import { IUpdateCategory } from '@common-types/category.types'
import { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import { axiosInstance } from '../api/axios'

const URLS = {
	all: 'category',
	create: 'category',
	update: 'category',
	remove: 'category'
}

export const CategoryService = {
	async all() {
		const { data } = await axiosInstance.get(URLS.all)
		return data
	},

	async byId() {},

	async create(dto: ICreateCategory) {
		const { data } = await axiosInstance.post<IDefaultResponse>(URLS.create, dto)
		return data
	},

	async update(dto: IUpdateCategory) {
		const { data } = await axiosInstance.patch<IDefaultResponse>(URLS.update, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.remove}/${id}`)
		return data
	}
}
