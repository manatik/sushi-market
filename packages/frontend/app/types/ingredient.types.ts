import { IDefaultResponse } from '@common-types/default-response.types'

export interface IIngredientResponse extends IDefaultResponse {
	ingredients: IIngredient[]
}

export interface IIngredient {
	id: string
	name: string
	description?: string
	dateCreated: string
	dateDeleted: string | null
	dateUpdated: string | null
}

export interface ICreateIngredient extends Pick<IIngredient, 'name'> {
	description?: string
}

export interface IUpdateIngredient extends Partial<IIngredient> {}

export interface IIngredientFilters {
	search?: string
}
