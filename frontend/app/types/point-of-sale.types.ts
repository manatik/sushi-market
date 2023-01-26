import { IDefaultResponse } from '@common-types/default-response.types'

export interface IPointOfSaleResponse extends IDefaultResponse {
	pointsOfSale: IPointOfSale[]
}

export interface IPointOfSale {
	id: string
	addressPointSale: string
	fpApiCode?: string | null
	city: string
	operatingModePointSale: string
	operatingModeDelivery: string
	dateCreated?: string | null
	dateUpdated?: string | null
	dateDeleted?: string | null
}

export interface ICreatePointOfSale extends Omit<IPointOfSale, 'id' | 'dateCreated' | 'dateDeleted' | 'dateUpdated'> {}

export interface IUpdatePointOfSale extends Partial<IPointOfSale> {}

export interface IPointOfSaleFilters {
	search?: string
}
