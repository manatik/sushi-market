import { IDefaultResponse } from '@common-types/IDefaultResponse.types'

export interface ICategoryResponse extends IDefaultResponse {
	categories: ICategory[]
}

export interface ICategory {
	article: string
	code: string
	hidden: boolean
	id: string
	name: string
	orderBy?: number | null
	dateCreated: string
	dateDeleted?: string | null
	dateUpdated?: string | null
}

export interface ICreateCategory extends Pick<ICategory, 'name' | 'article' | 'code'> {
	orderBy?: number | null
	hidden?: boolean | null
}

export interface IUpdateCategory extends Partial<ICreateCategory> {}
