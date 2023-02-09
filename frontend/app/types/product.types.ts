import { SelectOption } from '@components/ui/multi-select/Multi-select'

import { ICategory } from '@common-types/category.types'
import { IDefaultResponse } from '@common-types/default-response.types'
import { IIngredient } from '@common-types/ingredient.types'
import { ISubCategory } from '@common-types/sub-category.types'

export interface IProductResponse<T = IProduct[]> extends IDefaultResponse {
	products: T
}

export interface IProduct {
	id: string
	article: string
	name: string
	price: number
	categoryId?: string
	category?: ICategory
	subCategoryId?: string
	subCategory?: ISubCategory
	ingredients: IIngredient[]
	description?: string
	hidden?: boolean
	orderBy: number
	calories?: string
	proteins?: string
	fats?: string
	carbohydrates?: string
	weight?: string
	dateCreated: string
	dateDeleted: string | null
	dateUpdated: string | null
}

export interface ICreateProduct
	extends Omit<IProduct, 'dateCreated' | 'dateUpdated' | 'dateDeleted' | 'orderBy' | 'hidden' | 'ingredients'> {
	orderBy?: number
	hidden?: boolean
}

export interface IUpdateProduct extends Partial<IProduct> {}

export interface IProductFilters {
	categoryId?: string
	subCategoryId?: string
	onlyHidden?: boolean
	search?: string
}
