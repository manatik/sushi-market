import { z } from 'zod'

export const SubCategorySchema = z.object({
	article: z.string().min(1, { message: 'Обязательное поле' }),
	name: z.string().min(1, { message: 'Обязательное поле' }),
	categoryId: z.string().min(1, { message: 'Обязательное поле' }),
	orderBy: z.number({ invalid_type_error: 'Ожидается число' }).optional(),
	hidden: z.boolean().optional()
})
