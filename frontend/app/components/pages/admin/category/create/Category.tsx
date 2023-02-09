import { zodResolver } from '@hookform/resolvers/zod'
import * as Label from '@radix-ui/react-label'
import { Controller, useForm } from 'react-hook-form'

import Input from '@components/ui/input/Input'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'

import { useCreateCategory } from '@query-hooks/useCategories'

import type { ICreateCategory } from '@common-types/category.types'

import { CategorySchema } from './category.schema'
import styles from './category.style.module.scss'

const CreateCategory = () => {
	const { mutate: createCategory } = useCreateCategory()

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isValid },
		reset
	} = useForm<ICreateCategory>({
		defaultValues: { orderBy: 1 },
		resolver: zodResolver(CategorySchema)
	})

	const onSubmit = (formData: ICreateCategory) => {
		createCategory(formData, {
			onSuccess() {
				reset()
			}
		})
	}

	return (
		<div className={styles.category}>
			<h3 className={styles.category__title}>Создание категории</h3>

			<Separator />

			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input {...register('name')} label={'Название'} error={errors.name?.message} type='text' />

				<Input {...register('article')} label={'Артикул'} error={errors.article?.message} type='text' />

				<Input {...register('code')} label={'Код'} error={errors.code?.message} type='text' />

				<Input
					{...register('orderBy', { valueAsNumber: true })}
					label={'Позиция'}
					error={errors.orderBy?.message}
					type='number'
				/>

				<div className={styles.formField}>
					<Label.Root htmlFor={'hidden'} className={styles.formField__label}>
						Скрыть:
					</Label.Root>

					<Controller
						control={control}
						name={'hidden'}
						render={({ field }) => <Switch id={'hidden'} onCheckedChange={field.onChange} checked={field.value} />}
					/>
				</div>

				<div className={styles.formField}>
					<button className={styles.formField__button} disabled={!isValid || !!Object.keys(errors).length}>
						Создать
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateCategory
