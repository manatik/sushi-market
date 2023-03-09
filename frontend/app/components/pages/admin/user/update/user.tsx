import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

import Dialog from '@components/ui/dialog/Dialog'
import Input from '@components/ui/input/Input'
import Separator from '@components/ui/separator/Separator'

import { useUpdateUser } from '@query-hooks/useUser'

import { IUpdateUser, IUser } from '@common-types/user.types'

import styles from './user.style.module.scss'

interface Props {
	user: IUser
	isOpen: boolean
	onClose: () => void
}

const UpdateUser: FC<Props> = ({ onClose, isOpen, user }) => {
	const { mutate: updateUser } = useUpdateUser()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<IUpdateUser>({
		defaultValues: {
			...user,
			roles: undefined
		}
	})

	const onSubmit = (formData: IUpdateUser) => {
		updateUser({ id: user.id, dto: formData })
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} position={'right'}>
			<div className={styles.user}>
				<h3 className={styles.userTitle}>
					<span className={styles.userTitle__label}>Обновление пользователя</span>
				</h3>

				<Separator />

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Input {...register('firstname')} label={'Имя'} error={errors.firstname?.message} type='text' />
					<Input {...register('lastname')} label={'Фамилия'} error={errors.lastname?.message} type='text' />
					<Input {...register('birthdate')} label={'Дата рождения'} error={errors.birthdate?.message} type='text' />
					<Input {...register('email')} label={'E-mail'} error={errors.email?.message} type='text' />
					<Input {...register('phone')} label={'Номер телефона'} error={errors.phone?.message} type='text' />

					<div className={styles.formField}>
						<button className={styles.formField__button} disabled={!isValid || !!Object.keys(errors).length}>
							Обновить
						</button>
					</div>
				</form>
			</div>
		</Dialog>
	)
}

export default UpdateUser
