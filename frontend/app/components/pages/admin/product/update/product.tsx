import * as Label from '@radix-ui/react-label'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Dialog from '@components/ui/dialog/Dialog'
import Input from '@components/ui/input/Input'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'

import { useCategories } from '@query-hooks/useCategories'
import { useUpdateProduct } from '@query-hooks/useProducts'
import { useSubCategories } from '@query-hooks/useSubCategories'

import { IProduct, IUpdateProduct } from '@common-types/product.types'

import styles from './product.style.module.scss'

interface Props {
	product: IProduct
	isOpen: boolean
	onClose: () => void
}

const UpdateProduct: FC<Props> = ({ product, isOpen, onClose }) => {
	const { mutate: updateProduct } = useUpdateProduct()
	const { isLoading: isCategoryLoading, data: categories } = useCategories()
	const { isLoading: isSubCategoryLoading, data: subCategories } = useSubCategories()

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isDirty }
	} = useForm<IUpdateProduct>({
		defaultValues: {
			...product
		}
	})

	const onSubmit = (formData: IUpdateProduct) => {
		updateProduct({ id: product.id, dto: formData })
	}

	if (isCategoryLoading || isSubCategoryLoading) {
		return <div>loading...</div>
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} position={'right'}>
			<div className={styles.product}>
				<h3 className={styles.product__title}>Обновление продукта</h3>

				<Separator />

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<section className={styles.formWithColumns}>
						<div className={styles.formWithColumns__columnFields}>
							<h3>Основные поля</h3>

							<Input {...register('name')} label={'Название'} error={errors.name?.message} type='text' />

							<Input {...register('article')} label={'Артикул'} error={errors.article?.message} type='text' />

							<Input
								{...register('price', { valueAsNumber: true })}
								label={'Цена'}
								error={errors.price?.message}
								type='number'
							/>
						</div>

						<div className={styles.formWithColumns__columnFields}>
							<h3>Необязательные поля</h3>

							<Controller
								control={control}
								name={'categoryId'}
								render={({ field }) => (
									<Select
										fullWidth
										onChange={field.onChange}
										value={field.value}
										disabled={!categories?.length}
										placeholder={categories?.length ? 'Выберите категорию' : 'Нет категорий'}
										error={errors.categoryId?.message}
									>
										{categories?.map(category => (
											<SelectItem key={category.id} value={category.id}>
												{category.name}
											</SelectItem>
										))}
									</Select>
								)}
							/>

							<Controller
								control={control}
								name={'subCategoryId'}
								render={({ field }) => (
									<Select
										fullWidth
										onChange={field.onChange}
										value={field.value}
										disabled={!subCategories?.length}
										placeholder={subCategories?.length ? 'Выб. подкатегорию' : 'Нет подкатегорий'}
										error={errors.subCategoryId?.message}
									>
										{subCategories?.map(subCategory => (
											<SelectItem key={subCategory.id} value={subCategory.id}>
												{subCategory.name}
											</SelectItem>
										))}
									</Select>
								)}
							/>

							<Input {...register('description')} label={'Описание'} error={errors.description?.message} type='text' />

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
									render={({ field }) => (
										<Switch id={'hidden'} onCheckedChange={field.onChange} checked={field.value} />
									)}
								/>
							</div>
						</div>

						<div className={styles.formWithColumns__columnFields}>
							<h3>Дополнительно</h3>

							<Input {...register('calories')} label={'Калории'} error={errors.calories?.message} type='text' />

							<Input {...register('proteins')} label={'Белки'} error={errors.proteins?.message} type='text' />

							<Input {...register('fats')} label={'Жиры'} error={errors.fats?.message} type='text' />

							<Input
								{...register('carbohydrates')}
								label={'Углеводы'}
								error={errors.carbohydrates?.message}
								type='text'
							/>

							<Input {...register('weight')} label={'Вес'} error={errors.weight?.message} type='text' />
						</div>
					</section>

					<div className={styles.formFooter}>
						<button className={styles.formFooter__button} disabled={!isDirty || !!Object.keys(errors).length}>
							Обновить
						</button>
					</div>
				</form>
			</div>
		</Dialog>
	)
}

export default UpdateProduct
