import { IDefaultResponse } from '@common-types/IDefaultResponse.types'

export interface ICategoryResponse extends IDefaultResponse {
	categories: ICategory[]
}

export interface ICategory {
	article: string
	code: string
	dateCreated: string
	dateDeleted: string | null
	dateUpdated: string | null
	hidden: boolean
	id: string
	name: string
	orderBy: number | null
}

export interface ICreateCategory extends Pick<ICategory, 'name' | 'article' | 'code'> {
	orderBy?: number
	hidden?: boolean
}

export interface IUpdateCategory extends Partial<ICreateCategory> {}