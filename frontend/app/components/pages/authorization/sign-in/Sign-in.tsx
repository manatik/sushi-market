import type { IDefaultResponse } from '@common-types/default-response.types'
import type { ISignIn } from '@common-types/user.types'
import { SignInSchema } from '@components/pages/authorization/authorization.schema'
import ButtonLoading from '@components/ui/button-loading/Button-loading'
import Checkbox from '@components/ui/checkbox/Checkbox'
import Input from '@components/ui/input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Label from '@radix-ui/react-label'
import { AuthService } from '@services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styles from '../authorization.style.module.scss'
import type { ISignProps } from '../authorization.types'

const SignIn: FC<ISignProps> = ({ onSuccessSign }) => {
	const [isShowPassword, setIsShowPassword] = useState(false)

	const { mutate: signIn, isLoading } = useMutation<
		IDefaultResponse,
		AxiosError<IDefaultResponse>,
		ISignIn
	>(['sign-in'], AuthService.signIn, {
		onSuccess() {
			onSuccessSign()
		},
		onError(error) {
			toast.error(error.response?.data.message)
		}
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ISignIn>({
		defaultValues: {
			phone: '+7'
		},
		resolver: zodResolver(SignInSchema)
	})

	const onSubmit = (formData: ISignIn) => {
		signIn(formData)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Input
				{...register('phone')}
				type={'tel'}
				label={'Номер телефона'}
				error={errors.phone?.message}
			/>

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
					Войти
				</ButtonLoading>
			</div>
		</form>
	)
}

export default SignIn
