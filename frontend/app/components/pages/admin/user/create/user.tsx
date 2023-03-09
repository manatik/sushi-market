import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { UserSchema } from '@components/pages/admin/user/create/user.schema'
import Input from '@components/ui/input/Input'
import Separator from '@components/ui/separator/Separator'

import { useCreateUser } from '@query-hooks/useUser'

import { ICreateUser } from '@common-types/user.types'

import styles from './user.style.module.scss'

const CreateUser = () => {
	const { mutate: createUser } = useCreateUser()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset
	} = useForm<ICreateUser>({
		mode: 'onBlur',
		resolver: zodResolver(UserSchema),
		defaultValues: {
			roles: undefined
		}
	})

	const onSubmit = (formData: ICreateUser) => {
		createUser(formData, {
			onSuccess() {
				reset()
			}
		})
	}

	console.log(errors, isValid)

	return (
		<div className={styles.user}>
			<h3 className={styles.userTitle}>
				<span className={styles.userTitle__label}>Создание пользователя</span>
			</h3>

			<Separator />

			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('firstname')}
					label={'Имя'}
					error={errors.firstname?.message}
					type='text'
					autoComplete={'given-name'}
				/>

				<Input
					{...register('lastname')}
					label={'Фамилия'}
					error={errors.lastname?.message}
					type='text'
					autoComplete={'family-name'}
				/>

				<Input {...register('birthdate')} label={'Дата рождения'} error={errors.birthdate?.message} type='text' />

				<Input {...register('email')} label={'E-mail'} error={errors.email?.message} type='email' />

				<Input {...register('phone')} label={'Номер телефона'} error={errors.phone?.message} type='tel' />

				<Input {...register('password')} label={'Пароль'} error={errors.password?.message} type='password' />

				<div className={styles.formField}>
					<button className={styles.formField__button} disabled={!isValid || !!Object.keys(errors).length}>
						Создать
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateUser
