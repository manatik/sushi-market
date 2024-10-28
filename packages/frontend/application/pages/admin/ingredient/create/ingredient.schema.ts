import { z } from 'zod'

export const IngredientSchema = z.object({
	name: z.string().min(1, { message: 'Обязательное поле' }),
	description: z.string().optional()
})
