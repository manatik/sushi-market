import { IDefaultResponse } from '@common-types/default-response.types'
import { ICreateDistrict, IDistrictFilters, IUpdateDistrict } from '@common-types/district.types'
import { axiosInstance } from '@api/axios'

const URLS = {
	all: 'district',
	create: 'district',
	update: 'district',
	remove: 'district'
}

export const DistrictService = {
	async all(filters?: IDistrictFilters) {
		const { data } = await axiosInstance.get(URLS.all, {
			params: { name: filters?.search }
		})
		return data
	},

	async byId() {},

	async create(dto: ICreateDistrict) {
		const { data } = await axiosInstance.post<IDefaultResponse>(URLS.create, dto)
		return data
	},

	async update({ id, dto }: { id: string; dto: IUpdateDistrict }) {
		const { data } = await axiosInstance.patch<IDefaultResponse>(`${URLS.update}/${id}`, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.remove}/${id}`)
		return data
	}
}
