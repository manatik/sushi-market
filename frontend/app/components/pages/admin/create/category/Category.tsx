import Input from '@components/ui/input/Input'
import Switch from '@components/ui/switch/Switch'
import * as Label from '@radix-ui/react-label'
import { CategoryService } from '@services/category.service'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategorySchema, ICategoryForm } from './category.types'
import styles from './category.style.module.scss'

const Category = () => {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors }
	} = useForm<ICategoryForm>({
		defaultValues: { orderBy: 1 },
		reValidateMode: 'onChange',
		resolver: zodResolver(CategorySchema)
	})

	const { mutate } = useMutation<void, AxiosError, ICategoryForm>(
		['category'],
		CategoryService.create
	)

	const onSubmit = (formData: any) => {
		mutate(formData)
	}

	return (
		<div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('name')}
					label={'Название'}
					error={errors.name?.message}
					type='text'
					id='name'
				/>

				<Input
					{...register('article')}
					label={'Артикул'}
					error={errors.article?.message}
					type='text'
					id='name'
				/>

				<Input
					{...register('code')}
					label={'Код'}
					error={errors.code?.message}
					type='text'
					id='name'
				/>

				<Input
					{...register('orderBy', { valueAsNumber: true })}
					label={'Позиция'}
					error={errors.orderBy?.message}
					type='number'
					id='name'
				/>

				<div className={styles.formField}>
					<Label.Root htmlFor={'hidden'} className={styles.formField__label}>
						Скрыть:
					</Label.Root>

					<Controller
						control={control}
						name={'hidden'}
						render={({ field }) => (
							<Switch id={'hidden'} onCheckedChange={e => field.onChange(e)} />
						)}
					/>
				</div>

				<div className={styles.formField}>
					<button className={styles.formField__button} disabled={!!Object.keys(errors).length}>
						Создать
					</button>
				</div>
			</form>
		</div>
	)
}

export default Category
