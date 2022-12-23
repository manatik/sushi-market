import { IDefaultResponse } from '@common-types/IDefaultResponse.types'

export interface IProductResponse extends IDefaultResponse {
	products: IProduct[]
}

export interface IProduct {
	article: string
	name: string
	price: number
	categoryId?: string
	subCategoryId?: string
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
	extends Omit<IProduct, 'dateCreated' | 'dateUpdated' | 'dateDeleted' | 'orderBy' | 'hidden'> {
	orderBy?: number
	hidden?: boolean
}

export interface IUpdateProduct extends Partial<ICreateProduct> {}
