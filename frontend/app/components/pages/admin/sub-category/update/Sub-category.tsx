import { ISubCategory, IUpdateSubCategory } from '@common-types/sub-category.types'
import Dialog from '@components/ui/dialog/Dialog'
import Input from '@components/ui/input/Input'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'
import { useCategories } from '@query-hooks/useCategories'
import { useUpdateSubCategory } from '@query-hooks/useSubCategories'
import * as Label from '@radix-ui/react-label'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from './sub-category.style.module.scss'

interface Props {
	subCategory: ISubCategory
	isOpen: boolean
	onClose: () => void
}

const UpdateSubCategory: FC<Props> = ({ subCategory, onClose, isOpen }) => {
	const { isLoading: isCategoriesLoading, data: categories } = useCategories()
	const { mutate: updateSubCategory } = useUpdateSubCategory()

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isDirty }
	} = useForm<IUpdateSubCategory>({
		defaultValues: {
			...subCategory,
			hidden: !!subCategory.dateDeleted
		}
	})

	const onSubmit = (formData: IUpdateSubCategory) => {
		updateSubCategory({ id: subCategory.id, dto: formData })
	}

	if (isCategoriesLoading) {
		return <div>loading...</div>
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} position={'right'}>
			<div className={styles.subCategory}>
				<h3 className={styles.subCategory__title}>Обновление подкатегории</h3>

				<Separator />

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Input {...register('name')} label={'Название'} error={errors.name?.message} type='text' />

					<Input {...register('article')} label={'Артикул'} error={errors.article?.message} type='text' />

					<Controller
						control={control}
						name={'categoryId'}
						render={({ field }) => (
							<Select
								onChange={field.onChange}
								placeholder='Выберите категорию'
								error={errors.categoryId?.message}
								value={field.value}
								fullWidth
							>
								{categories?.map(category => (
									<SelectItem key={category.id} value={category.id}>
										{category.name}
									</SelectItem>
								))}
							</Select>
						)}
					/>

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

export default UpdateSubCategory
