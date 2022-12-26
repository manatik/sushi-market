import { ICreateProduct } from '@common-types/product.types'
import { ProductSchema } from '@components/pages/admin/create/product/product.schema'
import Input from '@components/ui/input/Input'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCategories } from '@query-hooks/useCategories'
import { useCreateProduct } from '@query-hooks/useProducts'
import { useSubCategories } from '@query-hooks/useSubCategories'
import * as Label from '@radix-ui/react-label'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import styles from './product.style.module.scss'

const CreateProduct = () => {
	const router = useRouter()

	const { mutate } = useCreateProduct()
	const { isLoading: isCategoryLoading, data: categories } = useCategories()
	const { isLoading: isSubCategoryLoading, data: subCategories } = useSubCategories()

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isDirty }
	} = useForm<ICreateProduct>({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			categoryId: router.query?.categoryId as string,
			subCategoryId: router.query?.subCategoryId as string,
			orderBy: 1
		}
	})

	const onSubmit = (formData: ICreateProduct) => mutate(formData)

	if (isCategoryLoading || isSubCategoryLoading) {
		return <div>loading...</div>
	}

	return (
		<div className={styles.product}>
			<h3 className={styles.product__title}>Создание продукта</h3>

			<Separator />

			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<section className={styles.formWithColumns}>
					<div className={styles.formWithColumns__columnFields}>
						<h3>Основные поля</h3>

						<Input
							{...register('name')}
							label={'Название'}
							error={errors.name?.message}
							type='text'
						/>

						<Input
							{...register('article')}
							label={'Артикул'}
							error={errors.article?.message}
							type='text'
						/>

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
									placeholder='Выберите категорию'
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
									placeholder='Выб. подкатегорию'
								>
									{subCategories?.map(subCategory => (
										<SelectItem key={subCategory.id} value={subCategory.id}>
											{subCategory.name}
										</SelectItem>
									))}
								</Select>
							)}
						/>

						<Input
							{...register('description')}
							label={'Описание'}
							error={errors.description?.message}
							type='text'
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
								render={({ field }) => (
									<Switch id={'hidden'} onCheckedChange={field.onChange} checked={field.value} />
								)}
							/>
						</div>
					</div>

					<div className={styles.formWithColumns__columnFields}>
						<h3>Дополнительно</h3>

						<Input
							{...register('calories')}
							label={'Калории'}
							error={errors.calories?.message}
							type='text'
						/>

						<Input
							{...register('proteins')}
							label={'Белки'}
							error={errors.proteins?.message}
							type='text'
						/>

						<Input {...register('fats')} label={'Жиры'} error={errors.fats?.message} type='text' />

						<Input
							{...register('carbohydrates')}
							label={'Углеводы'}
							error={errors.carbohydrates?.message}
							type='text'
						/>

						<Input
							{...register('weight')}
							label={'Вес'}
							error={errors.weight?.message}
							type='text'
						/>
					</div>
				</section>

				<div className={styles.formFooter}>
					<button
						className={styles.formFooter__button}
						disabled={!isDirty || !!Object.keys(errors).length}
					>
						Создать
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateProduct
