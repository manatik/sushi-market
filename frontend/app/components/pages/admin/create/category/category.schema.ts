import { z } from 'zod'

export const CategorySchema = z.object({
	name: z.string().min(1, { message: 'Обязательное поле' }),
	article: z.string().min(1, { message: 'Обязательное поле' }),
	code: z.string().min(1, { message: 'Обязательное поле' }),
	orderBy: z.number({ invalid_type_error: 'Ожидается число' }).optional(),
	hidden: z.boolean().optional()
})
