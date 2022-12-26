import { IDefaultResponse } from '@common-types/IDefaultResponse.types'
import {
	ICreateProduct,
	IProduct,
	IProductResponse,
	IUpdateProduct
} from '@common-types/product.types'
import { axiosInstance } from '../api/axios'

const URLS = {
	all: 'product',
	byId: 'product',
	create: 'product',
	update: 'product',
	remove: 'product'
}

export const ProductService = {
	async all() {
		const { data } = await axiosInstance.get<IProductResponse>(URLS.all)
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

	async update(dto: IUpdateProduct) {
		const { data } = await axiosInstance.patch<IDefaultResponse>(URLS.update, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.remove}/${id}`)
		return data
	}
}