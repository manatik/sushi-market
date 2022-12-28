import type { ICreateCategory } from '@common-types/category.types'
import { ICategoryFilters, IUpdateCategory } from '@common-types/category.types'
import { IDefaultResponse } from '@common-types/default-response.types'
import { axiosInstance } from '../api/axios'

const URLS = {
	all: 'category',
	create: 'category',
	update: 'category',
	remove: 'category'
}

export const CategoryService = {
	async all(filters?: ICategoryFilters) {
		const { data } = await axiosInstance.get(URLS.all, {
			params: { onlyHidden: filters?.onlyHidden, name: filters?.search }
		})
		return data
	},

	async byId() {},

	async create(dto: ICreateCategory) {
		const { data } = await axiosInstance.post<IDefaultResponse>(URLS.create, dto)
		return data
	},

	async update({ id, dto }: { id: string; dto: IUpdateCategory }) {
		const { data } = await axiosInstance.patch<IDefaultResponse>(`${URLS.update}/${id}`, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.remove}/${id}`)
		return data
	}
}
