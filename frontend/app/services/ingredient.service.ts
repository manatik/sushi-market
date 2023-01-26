import { IDefaultResponse } from '@common-types/default-response.types'
import { ICreateIngredient, IIngredientFilters, IUpdateIngredient } from '@common-types/ingredient.types'
import { axiosInstance } from '@api/axios'

const URLS = {
	all: 'ingredient',
	create: 'ingredient',
	update: 'ingredient',
	remove: 'ingredient'
}

export const IngredientService = {
	async all(filters?: IIngredientFilters) {
		const { data } = await axiosInstance.get(URLS.all, { params: { name: filters?.search } })
		return data
	},

	async byId() {},

	async create(dto: ICreateIngredient) {
		const { data } = await axiosInstance.post<IDefaultResponse>(URLS.create, dto)
		return data
	},

	async update({ id, dto }: { id: string; dto: IUpdateIngredient }) {
		const { data } = await axiosInstance.patch<IDefaultResponse>(`${URLS.update}/${id}`, dto)
		return data
	},

	async remove(id: string) {
		const { data } = await axiosInstance.delete<IDefaultResponse>(`${URLS.remove}/${id}`)
		return data
	}
}
