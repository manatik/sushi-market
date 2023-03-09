import { z } from 'zod'

export const UserSchema = z.object({
	firstname: z.string().min(1, { message: 'Обязательное поле' }),
	lastname: z.string().min(1, { message: 'Обязательное поле' }),
	password: z.string().min(1, { message: 'Обязательное поле' }).min(6, { message: 'Мин. 6 символов' }),
	email: z.string().email({ message: 'Невалидный E-mail' }).optional().or(z.literal('')),
	phone: z
		.string()
		.min(1, { message: 'Обязательное поле' })
		.regex(/^[\+]7[0-9]{10}$/, { message: 'Номер должен быть формата +7ХХХХХХХХХХ' }),
	birthdate: z.string().optional(),
	roles: z.string().optional()
})
