import { z } from 'zod'

export const SignInSchema = z.object({
	phone: z
		.string()
		.min(1, { message: 'Обязательное поле' })
		.regex(/^[\+]7[0-9]{10}$/, { message: 'Номер должен быть формата +7ХХХХХХХХХХ' }),
	password: z
		.string()
		.min(1, { message: 'Обязательное поле' })
		.min(6, { message: 'Мин. 6 символов' })
})

export const SignUpSchema = SignInSchema.extend({
	firstname: z.string().min(1, { message: 'Обязательное поле' })
})
