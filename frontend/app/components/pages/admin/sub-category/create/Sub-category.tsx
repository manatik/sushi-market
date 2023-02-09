import { zodResolver } from '@hookform/resolvers/zod'
import * as Label from '@radix-ui/react-label'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'

import { SubCategorySchema } from '@components/pages/admin/sub-category/create/sub-category.schema'
import Input from '@components/ui/input/Input'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'

import { useCategories } from '@query-hooks/useCategories'
import { useCreateSubCategory } from '@query-hooks/useSubCategories'

import { ICreateSubCategory } from '@common-types/sub-category.types'

import styles from './sub-category.style.module.scss'

const CreateSubCategory = () => {
	const router = useRouter()

	const { mutate: createSubCategory } = useCreateSubCategory()
	const { isLoading: isCategoriesLoading, data: categories } = useCategories()

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isValid },
		reset
	} = useForm<ICreateSubCategory>({
		resolver: zodResolver(SubCategorySchema),
		defaultValues: {
			orderBy: 1,
			categoryId: (router.query.categoryId as string) || ''
		}
	})

	const onSubmit = (formData: ICreateSubCategory) => {
		createSubCategory(formData, {
			onSuccess() {
				reset()
			}
		})
	}

	if (isCategoriesLoading) {
		return <div>loading...</div>
	}

	return (
		<div className={styles.subCategory}>
			<h3 className={styles.subCategory__title}>Создание подкатегории</h3>

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
					<button className={styles.formField__button} disabled={!isValid || !!Object.keys(errors).length}>
						Создать
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateSubCategory
