import { IDefaultResponse } from '@common-types/default-response.types'
import { ICreatePointOfSale, IPointOfSaleFilters, IUpdatePointOfSale } from '@common-types/point-of-sale.types'
import { axiosInstance } from '@api/axios'

const URLS = {
	all: 'point-of-sale',
	create: 'point-of-sale',
	update: 'point-of-sale',
	remove: 'point-of-sale'
}

export const PointOfSaleService = {
	async all(filters?: IPointOfSaleFilters) {
		const { data } = await axiosInstance.get(URLS.all, {
			params: { name: filters?.search }
		})
		return data
	},

	async byId() {},

	async create(dto: ICreatePointOfSale) {
		const { data } = await axiosInstance.post<IDefaultResponse>(URLS.create, dto)
		return data
	},

	async update({ id, dto }: { id: string; dto: IUpdatePointOfSale }) {
		const { data } = await axiosInstance.patch<IDefaultResponse>(`${URLS.update}/${id}`, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.remove}/${id}`)
		return data
	}
}
