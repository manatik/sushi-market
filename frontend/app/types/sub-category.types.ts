import { ICategory } from '@common-types/category.types'
import { IDefaultResponse } from '@common-types/default-response.types'

export interface ISubCategoryResponse extends IDefaultResponse {
	subCategories: ISubCategory[]
}

export interface ISubCategory {
	article: string
	categoryId: string
	category: ICategory
	hidden: boolean
	id: string
	name: string
	orderBy: number | null
	dateCreated: string
	dateDeleted: string | null
	dateUpdated: string | null
}

export interface ICreateSubCategory extends Pick<ISubCategory, 'name' | 'article' | 'categoryId'> {
	orderBy?: number
	hidden?: boolean
}

export interface IUpdateSubCategory extends Partial<ISubCategory> {}

export interface ISubCategoryFilters {
	categoryId?: string
	search?: string
	onlyHidden?: boolean
}
