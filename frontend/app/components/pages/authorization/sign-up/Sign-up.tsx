import { zodResolver } from '@hookform/resolvers/zod'
import * as Label from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { SignUpSchema } from '@components/pages/authorization/authorization.schema'
import ButtonLoading from '@components/ui/button-loading/Button-loading'
import Checkbox from '@components/ui/checkbox/Checkbox'
import Input from '@components/ui/input/Input'

import { AuthService } from '@services/auth.service'

import type { IDefaultResponse } from '@common-types/default-response.types'
import type { ISignUp } from '@common-types/user.types'

import styles from '../authorization.style.module.scss'
import type { ISignProps } from '../authorization.types'

const SignUp: FC<ISignProps> = ({ onSuccessSign }) => {
	const [isShowPassword, setIsShowPassword] = useState(false)
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<ISignUp>({
		resolver: zodResolver(SignUpSchema)
	})

	const { mutate: signUp, isLoading } = useMutation<IDefaultResponse, AxiosError<IDefaultResponse>, ISignUp>(
		['sign-up'],
		AuthService.signUp,
		{
			onSuccess(data) {
				onSuccessSign()
			},
			onError(error) {
				toast.error(error.response?.data.message)
			}
		}
	)

	const onSubmit = (formData: ISignUp) => {
		signUp(formData)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Input {...register('phone')} type={'tel'} label={'Номер телефона'} error={errors.phone?.message} />

			<Input {...register('firstname')} type={'text'} label={'Как вас называть?'} error={errors.firstname?.message} />

			<Input
				{...register('password')}
				type={isShowPassword ? 'text' : 'password'}
				label={'Пароль'}
				error={errors.password?.message}
			/>

			<div className={styles.formItem}>
				<Checkbox
					id='show-password'
					className={styles.formItem__checkbox}
					size={'medium'}
					onCheckedChange={value => setIsShowPassword(value as boolean)}
					checked={isShowPassword}
				/>

				<Label.Root htmlFor='show-password'>Показать пароль</Label.Root>
			</div>

			<div className={styles.formItem}>
				<ButtonLoading className={styles.formItem__button} isLoading={isLoading}>
					Зарегистрироваться
				</ButtonLoading>
			</div>
		</form>
	)
}

export default SignUp
