import { IDefaultResponse } from '@common-types/default-response.types'

export interface IPromotionResponse<T = IPromotion[]> extends IDefaultResponse {
	promotions: T
}

export interface IPromotion {
	id: string
	article: string
	name: string
	typePromotion: TypePromotion
	price: number
	oldPrice: number
	dateStart: string
	dateEnd: string
	discount: number
	promocode: string | null
	isDisposable: boolean
	description: string | null
	dateCreated: string
	dateDeleted: string | null
	dateUpdated: string | null
}

export enum TypePromotion {
	COMBO = 'combo',
	PROMOTION = 'promo'
}

export interface ICreatePromotion
	extends Omit<
		IPromotion,
		| 'dateCreated'
		| 'dateDeleted'
		| 'dateUpdated'
		| 'discount'
		| 'description'
		| 'promocode'
		| 'isDisposable'
	> {
	discount?: number
	description?: string
	promocode?: string
	isDisposable?: boolean
	hidden: boolean
}

export interface IUpdatePromotion extends Partial<IPromotion> {}
