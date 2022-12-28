import { IDefaultResponse } from '@common-types/default-response.types'
import {
	ICreateSubCategory,
	ISubCategoryFilters,
	IUpdateSubCategory
} from '@common-types/sub-category.types'
import { axiosInstance } from '../api/axios'

const URLS = {
	all: 'sub-category',
	create: 'sub-category',
	update: 'sub-category',
	remove: 'sub-category'
}

export const SubCategoryService = {
	async all(filters?: ISubCategoryFilters) {
		const { data } = await axiosInstance.get(URLS.all, {
			params: { onlyHidden: filters?.onlyHidden, fc: filters?.categoryId, name: filters?.search }
		})
		return data
	},

	async byId() {},

	async create(dto: ICreateSubCategory) {
		const { data } = await axiosInstance.post<IDefaultResponse>(URLS.create, dto)
		return data
	},

	async update({ id, dto }: { id: string; dto: IUpdateSubCategory }) {
		const { data } = await axiosInstance.patch<IDefaultResponse>(`${URLS.update}/${id}`, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.remove}/${id}`)
		return data
	}
}
