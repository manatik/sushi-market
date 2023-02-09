import { z } from 'zod'

export const PointOfSaleSchema = z.object({
	addressPointSale: z.string().min(1, { message: 'Обязательное поле' }),
	fpApiCode: z.string().optional(),
	city: z.string().min(1, { message: 'Обязательное поле' }),
	operatingModePointSale: z.string().min(1, { message: 'Обязательное поле' }),
	operatingModeDelivery: z.string().min(1, { message: 'Обязательное поле' })
})
