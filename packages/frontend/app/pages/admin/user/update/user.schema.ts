import { z } from 'zod'

export const UserSchema = z.object({
	firstname: z.string().min(1, { message: 'Обязательное поле' }),
	lastname: z.string().min(1, { message: 'Обязательное поле' }),
	email: z.string().email({ message: 'Невалидный E-mail' }).optional().or(z.literal('')).or(z.null()),
	phone: z
		.string()
		.min(1, { message: 'Обязательное поле' })
		.regex(/^[\+]7[0-9]{10}$/, { message: 'Номер должен быть формата +7ХХХХХХХХХХ' }),
	birthdate: z.string().or(z.null()).optional(),
	roles: z.array(z.string()).optional()
})
