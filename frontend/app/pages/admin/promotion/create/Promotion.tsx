import { zodResolver } from '@hookform/resolvers/zod'
import * as Label from '@radix-ui/react-label'
import { Controller, useForm } from 'react-hook-form'

import Input from '@components/ui/input/Input'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'

import { useCreatePromotion } from '@query-hooks/usePromotion'

import { ICreatePromotion, TypePromotion } from '@common-types/promotion.types'

import { PromotionSchema } from './promotion.schema'
import styles from './promotion.style.module.scss'

const CreatePromotion = () => {
	const { mutate: createPromotion } = useCreatePromotion()

	const {
		handleSubmit,
		register,
		control,
		formState: { isValid, errors },
		reset
	} = useForm<ICreatePromotion>({
		resolver: zodResolver(PromotionSchema),
		defaultValues: {
			isDisposable: true,
			typePromotion: TypePromotion.PROMOTION,
			discount: 0,
			hidden: false
		}
	})

	const onSubmit = (formData: ICreatePromotion) => {
		createPromotion(formData, {
			onSuccess() {
				reset()
			}
		})
	}

	return (
		<div className={styles.promotion}>
			<h3 className={styles.promotion__title}>Создание акции</h3>

			<Separator />

			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<section className={styles.formWithColumns}>
					<div className={styles.formWithColumns__columnFields}>
						<h3>Основные поля</h3>

						<Input {...register('name')} label='Название' error={errors.name?.message} type='text' />

						<Input {...register('article')} label='Артикул' error={errors.article?.message} type='text' />

						<Controller
							control={control}
							name='typePromotion'
							render={({ field }) => (
								<Select
									fullWidth
									onChange={field.onChange}
									value={field.value}
									placeholder='Выберите тип Акции'
									error={errors.typePromotion?.message}
								>
									<SelectItem value={TypePromotion.COMBO}>Комбо-акция</SelectItem>
									<SelectItem value={TypePromotion.PROMOTION}>Акция</SelectItem>
								</Select>
							)}
						/>

						<Input
							{...register('oldPrice', { valueAsNumber: true })}
							label='Старая цена, ₽'
							error={errors.oldPrice?.message}
							type='number'
						/>

						<Input
							{...register('price', { valueAsNumber: true })}
							label='Новая цена, ₽'
							error={errors.price?.message}
							type='number'
						/>

						<Input {...register('dateStart')} label='Дата старта' error={errors.dateStart?.message} type='text' />

						<Input {...register('dateEnd')} label='Дата окончания' error={errors.dateEnd?.message} type='text' />
					</div>

					<div className={styles.formWithColumns__columnFields}>
						<h3>Необязательные поля</h3>

						<Input
							{...register('discount', { valueAsNumber: true })}
							label='Скидка, %'
							error={errors.discount?.message}
							type='number'
						/>

						<Input {...register('promocode')} label='Промокод' error={errors.promocode?.message} type='text' />

						<Input {...register('description')} label='Описание' error={errors.description?.message} type='text' />

						<div className={styles.formField}>
							<Label.Root htmlFor='isDisposable' className={styles.formField__label}>
								Одноразовая:
							</Label.Root>

							<Controller
								control={control}
								name={'isDisposable'}
								render={({ field }) => (
									<Switch id={'isDisposable'} onCheckedChange={field.onChange} checked={field.value} />
								)}
							/>
						</div>

						<div className={styles.formField}>
							<Label.Root htmlFor={'hidden'} className={styles.formField__label}>
								Скрыта:
							</Label.Root>

							<Controller
								control={control}
								name={'hidden'}
								render={({ field }) => <Switch id={'hidden'} onCheckedChange={field.onChange} checked={field.value} />}
							/>
						</div>
					</div>
				</section>

				<div className={styles.formFooter}>
					<button className={styles.formFooter__button} disabled={!isValid || !!Object.keys(errors).length}>
						Создать
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreatePromotion
