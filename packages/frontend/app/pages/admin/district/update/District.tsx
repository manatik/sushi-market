import React, { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Dialog from '@components/ui/dialog/Dialog'
import Input from '@components/ui/input/Input'
import Loader from '@components/ui/loader/Loader'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Separator from '@components/ui/separator/Separator'

import { useUpdateDistrict } from '@query-hooks/useDistricts'
import { usePointsOfSale } from '@query-hooks/usePointsOfSale'

import { IDistrict, IUpdateDistrict } from '@common-types/district.types'

import styles from './district.style.module.scss'

interface Props {
	district: IDistrict
	isOpen: boolean
	onClose: () => void
}

const UpdateDistrict: FC<Props> = ({ district, onClose, isOpen }) => {
	const { mutate: updateDistrict } = useUpdateDistrict()
	const { data: pointsOfSale, isLoading: isPsLoading } = usePointsOfSale()

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isValid }
	} = useForm<IUpdateDistrict>({
		defaultValues: { ...district, hidden: !!district.dateDeleted }
	})

	const onSubmit = (formData: IUpdateDistrict) => {
		updateDistrict({ id: district.id, dto: formData })
	}

	if (isPsLoading) {
		return (
			<Dialog isOpen={isOpen} onClose={onClose} position={'right'}>
				<Loader text={'Загрузка'} size={'large'} />
			</Dialog>
		)
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} position={'right'}>
			<div className={styles.district}>
				<h3 className={styles.district__title}>Обновление района</h3>

				<Separator />

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Input {...register('name')} label={'Название'} error={errors.name?.message} type='text' />

					<Input
						{...register('minSumOrder', { valueAsNumber: true })}
						label={'Минимальная сумма заказа'}
						error={errors.minSumOrder?.message}
						type='number'
					/>

					<Input
						{...register('priceFreeDelivery', { valueAsNumber: true })}
						label={'Стоимость для бесплатной доставки'}
						error={errors.priceFreeDelivery?.message}
						type='number'
					/>

					<Input
						{...register('priceDelivery', { valueAsNumber: true })}
						label={'Стоимость доставки'}
						error={errors.priceDelivery?.message}
						type='number'
					/>

					<Controller
						control={control}
						name={'pointSaleId'}
						render={({ field }) => (
							<Select
								onChange={field.onChange}
								placeholder='Выберите точку продаж'
								error={errors.pointSaleId?.message}
								fullWidth
							>
								{pointsOfSale?.map(pointOfSale => (
									<SelectItem key={pointOfSale.id} value={pointOfSale.id}>
										{pointOfSale.addressPointSale}
									</SelectItem>
								))}
							</Select>
						)}
					/>

					<div className={styles.formField}>
						<button className={styles.formField__button} disabled={!isValid || !!Object.keys(errors).length}>
							Обновить
						</button>
					</div>
				</form>
			</div>
		</Dialog>
	)
}

export default UpdateDistrict
