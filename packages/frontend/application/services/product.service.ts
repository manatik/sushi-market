import { axiosInstance } from '@api/axios'

import { IDefaultResponse } from '@common-types/default-response.types'
import {
	ICreateProduct,
	IProduct,
	IProductFilters,
	IProductResponse,
	IUpdateProduct
} from '@common-types/product.types'

const URLS = {
	all: 'product',
	byId: 'product',
	create: 'product',
	update: 'product',
	remove: 'product',
	setIngredients: 'product/ingredients',
	addPhotos: 'product/photos',
	removePhoto: 'product/photos'
} as const

export const ProductService = {
	async all(filters?: IProductFilters) {
		const { data } = await axiosInstance.get<IProductResponse>(URLS.all, {
			params: {
				onlyHidden: filters?.onlyHidden,
				name: filters?.search,
				fc: filters?.categoryId,
				fsc: filters?.subCategoryId
			}
		})
		return data
	},

	async byId(id: string) {
		const { data } = await axiosInstance.get<IProductResponse<IProduct>>(`${URLS.byId}/${id}`)
		return data
	},

	async create(dto: ICreateProduct) {
		const { data } = await axiosInstance.post<IDefaultResponse>(URLS.create, dto)
		return data
	},

	async update({ id, dto }: { id: string; dto: IUpdateProduct }) {
		const { data } = await axiosInstance.patch<IDefaultResponse>(`${URLS.update}/${id}`, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.remove}/${id}`)
		return data
	},

	async addPhotos({ id, dto }: { id: string; dto: any }) {
		const { data } = await axiosInstance.post<IDefaultResponse>(`${URLS.addPhotos}/${id}`, dto)
		return data
	},

	async removePhoto({ id, photoId }: { id: string; photoId: string }) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.removePhoto}/${id}`, { params: { photoId } })
		return data
	},

	async setIngredients({ id, ingredients }: { id: string; ingredients: string[] }) {
		const { data } = await axiosInstance.post<IDefaultResponse>(`${URLS.setIngredients}/${id}`, { ingredients })
		return data
	}
}
