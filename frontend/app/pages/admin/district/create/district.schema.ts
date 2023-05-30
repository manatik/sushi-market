import { z } from 'zod'

export const DistrictSchema = z.object({
	name: z.string().min(1, { message: 'Обязательное поле' }),
	pointSaleId: z.string().optional(),
	minSumOrder: z.number({ invalid_type_error: 'Введите число' }).int().min(1, { message: 'Обязательное поле' }),
	priceDelivery: z.number({ invalid_type_error: 'Введите число' }).int().min(1, { message: 'Обязательное поле' }),
	priceFreeDelivery: z.number({ invalid_type_error: 'Введите число' }).int().min(1, { message: 'Обязательное поле' })
})
