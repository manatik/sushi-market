import { z } from 'zod'

export const ProductSchema = z.object({
	name: z.string().min(1, { message: 'Обязательное поле' }),
	article: z.string().min(1, { message: 'Обязательное поле' }),
	price: z.number({ invalid_type_error: 'Введите число' }).min(1, { message: 'Обязательное поле' }),
	categoryId: z.string().optional(),
	subCategoryId: z.string().optional(),
	description: z.string().optional(),
	hidden: z.boolean().optional(),
	orderBy: z.number({ invalid_type_error: 'Введите число' }).optional(),
	calories: z.string().optional(),
	proteins: z.string().optional(),
	fats: z.string().optional(),
	carbohydrates: z.string().optional(),
	weight: z.string().optional()
})
