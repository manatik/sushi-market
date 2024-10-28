import { z } from 'zod'

export const PromotionSchema = z.object({
	article: z.string().min(1, { message: 'Обязательное поле' }),
	name: z.string().min(1, { message: 'Обязательное поле' }),
	typePromotion: z.string().min(1, { message: 'Обязательное поле' }),
	price: z
		.number({ invalid_type_error: 'Ожидается число' })
		.int({ message: 'Целое число' })
		.min(1, { message: 'Обязательное поле' }),
	oldPrice: z
		.number({ invalid_type_error: 'Ожидается число' })
		.int({ message: 'Целое число' })
		.min(1, { message: 'Обязательное поле' }),
	dateStart: z.string().min(1, { message: 'Обязательное поле' }),
	dateEnd: z.string().min(1, { message: 'Обязательное поле' }),
	discount: z.number().int().min(0).max(100).optional(),
	promocode: z.string().optional(),
	hidden: z.boolean().optional(),
	isDisposable: z.boolean().optional(),
	description: z.string().optional()
})
