import { axiosInstance } from '@api/axios'

import { IDefaultResponse } from '@common-types/default-response.types'
import {
	ICreatePromotion,
	IPromotion,
	IPromotionFilters,
	IPromotionResponse,
	IUpdatePromotion
} from '@common-types/promotion.types'

const URLS = {
	all: 'promotion',
	byId: 'promotion',
	create: 'promotion',
	update: 'promotion',
	remove: 'promotion'
}

export const PromotionService = {
	async all(filters?: IPromotionFilters) {
		const { data } = await axiosInstance.get<IPromotionResponse>(URLS.all, {
			params: {
				onlyHidden: filters?.onlyHidden,
				name: filters?.search,
				promotionType: filters?.promotionType
			}
		})
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

	async update({ id, dto }: { id: string; dto: IUpdatePromotion }) {
		const { data } = await axiosInstance.patch<IDefaultResponse>(`${URLS.update}/${id}`, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.remove}/${id}`)
		return data
	}
}
