import * as Label from '@radix-ui/react-label'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Dialog from '@components/ui/dialog/Dialog'
import Input from '@components/ui/input/Input'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'

import { useUpdateCategory } from '@query-hooks/useCategories'

import { ICategory, IUpdateCategory } from '@common-types/category.types'

import styles from './category.style.module.scss'

interface Props {
	category: ICategory
	isOpen: boolean
	onClose: () => void
}

const UpdateCategory: FC<Props> = ({ category, isOpen, onClose }) => {
	const { mutate: updateCategory } = useUpdateCategory()

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isDirty }
	} = useForm<IUpdateCategory>({
		defaultValues: { ...category, hidden: !!category.dateDeleted }
	})

	const onSubmit = (formData: IUpdateCategory) => {
		updateCategory({ id: category.id, dto: formData })
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} position={'right'}>
			<div className={styles.category}>
				<h3 className={styles.category__title}>Обновление категории</h3>

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
						<button className={styles.formField__button} disabled={!isDirty || !!Object.keys(errors).length}>
							Обновить
						</button>
					</div>
				</form>
			</div>
		</Dialog>
	)
}

export default UpdateCategory
