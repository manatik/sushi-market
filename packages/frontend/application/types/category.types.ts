import { IDefaultResponse } from '@common-types/default-response.types'

export interface ICategoryResponse extends IDefaultResponse {
	categories: ICategory[]
}

export interface ICategory {
	article: string
	code: string
	hidden: boolean
	products: any[]
	id: string
	name: string
	orderBy: number
	dateCreated: string
	dateDeleted?: string | null
	dateUpdated?: string | null
}

export interface ICreateCategory extends Pick<ICategory, 'name' | 'article' | 'code'> {
	orderBy?: number
	hidden?: boolean
}

export interface IUpdateCategory extends Partial<ICategory> {}

export interface ICategoryFilters {
	onlyHidden?: boolean
	search?: string
}
