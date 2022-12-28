import { IDefaultResponse } from '@common-types/default-response.types'
import {
	ICreatePromotion,
	IPromotion,
	IPromotionResponse,
	IUpdatePromotion
} from '@common-types/promotion.types'
import { axiosInstance } from '../api/axios'

const URLS = {
	all: 'promotion',
	byId: 'promotion',
	create: 'promotion',
	update: 'promotion',
	remove: 'promotion'
}

export const PromotionService = {
	async all() {
		const { data } = await axiosInstance.get<IPromotionResponse>(URLS.all)
		return data
	},

	async byId(id: string) {
		const { data } = await axiosInstance.get<IPromotionResponse<IPromotion>>(`${URLS.byId}/${id}`)
		return data
	},

	async create(dto: ICreatePromotion) {
		const { data } = await axiosInstance.post<IDefaultResponse>(URLS.create, dto)
		return data
	},

	async update(dto: IUpdatePromotion) {
		const { data } = await axiosInstance.patch<IDefaultResponse>(URLS.update, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.remove}/${id}`)
		return data
	}
}
