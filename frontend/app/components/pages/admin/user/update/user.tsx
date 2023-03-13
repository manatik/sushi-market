import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Dialog from '@components/ui/dialog/Dialog'
import Input from '@components/ui/input/Input'
import Loader from '@components/ui/loader/Loader'
import MultiSelect from '@components/ui/multi-select/Multi-select'
import { MultiSelectOption } from '@components/ui/multi-select/types'
import Separator from '@components/ui/separator/Separator'

import { useRoles, useUpdateUser } from '@query-hooks/useUser'

import { IUpdateUser, IUser } from '@common-types/user.types'

import { UserSchema } from './user.schema'
import styles from './user.style.module.scss'

interface Props {
	user: IUser
	isOpen: boolean
	onClose: () => void
}

const UpdateUser: FC<Props> = ({ onClose, isOpen, user }) => {
	const { mutate: updateUser } = useUpdateUser({ isShowToast: true })
	const { data: roles = [], isLoading: isRolesLoading } = useRoles()

	console.log(user)
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isValid, isDirty }
	} = useForm<IUpdateUser>({
		mode: 'all',
		resolver: zodResolver(UserSchema),
		defaultValues: {
			...user,
			roles: user.roles.map(role => role.id)
		}
	})

	const rolesOptions: MultiSelectOption[] = roles.map(role => ({ value: role.id, label: role.name }))

	const onSubmit = (formData: IUpdateUser) => {
		updateUser({ id: user.id, dto: formData })
	}

	if (isRolesLoading) {
		return (
			<Dialog isOpen={isOpen} onClose={onClose} position={'right'}>
				<Loader text={'Загрузка'} />
			</Dialog>
		)
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

					<Controller
						name={'roles'}
						control={control}
						render={({ field }) => (
							<MultiSelect {...field} options={rolesOptions} defaultValue={field.value} placeholder={'Роли'} />
						)}
					/>

					<div className={styles.formField}>
						<button
							className={styles.formField__button}
							disabled={!isValid || !isDirty || !!Object.keys(errors).length}
						>
							Обновить
						</button>
					</div>
				</form>
			</div>
		</Dialog>
	)
}

export default UpdateUser
