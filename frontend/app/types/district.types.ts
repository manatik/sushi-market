import { IDefaultResponse } from '@common-types/default-response.types'

export interface IDistrictResponse extends IDefaultResponse {
	districts: IDistrict[]
}

export interface IDistrict {
	id: string
	name: string
	pointSaleId?: string | null
	minSumOrder: number
	priceDelivery: number
	priceFreeDelivery: number
	dateCreated: string
	dateDeleted?: string | null
	dateUpdated?: string | null
}

export interface ICreateDistrict extends Omit<IDistrict, 'id' | 'dateCreated' | 'dateDeleted' | 'dateUpdated'> {}

export interface IUpdateDistrict extends Partial<IDistrict> {}

export interface IDistrictFilters {
	search?: string
}
