import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

import Dialog from '@components/ui/dialog/Dialog'
import Input from '@components/ui/input/Input'
import Separator from '@components/ui/separator/Separator'

import { useUpdatePointOfSale } from '@query-hooks/usePointsOfSale'

import { ICreatePointOfSale, IPointOfSale } from '@common-types/point-of-sale.types'

import styles from './point-of-sale.style.module.scss'

interface Props {
	pointOfSale: IPointOfSale
	isOpen: boolean
	onClose: () => void
}

const UpdatePointOfSale: FC<Props> = ({ onClose, pointOfSale, isOpen }) => {
	const { mutate: updatePointOfSale } = useUpdatePointOfSale()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<ICreatePointOfSale>({
		defaultValues: {
			...pointOfSale
		}
	})

	const onSubmit = (formData: ICreatePointOfSale) => {
		updatePointOfSale({ id: pointOfSale.id, dto: formData })
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} position={'right'}>
			<div className={styles.pointOfSale}>
				<h3 className={styles.pointOfSale__title}>Обновление точки продаж</h3>

				<Separator />

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Input
						{...register('addressPointSale')}
						label={'Адрес точки продаж'}
						error={errors.addressPointSale?.message}
						type='text'
					/>

					<Input {...register('city')} label={'Город'} error={errors.city?.message} type='text' />

					<Input
						{...register('operatingModePointSale')}
						label={'Время работы точки продаж'}
						error={errors.operatingModePointSale?.message}
						type='text'
					/>

					<Input
						{...register('operatingModeDelivery')}
						label={'Время работы доставки'}
						error={errors.operatingModeDelivery?.message}
						type='text'
					/>

					<Input
						{...register('fpApiCode')}
						label={'Код FrontPad'}
						error={errors.operatingModeDelivery?.message}
						type='text'
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

export default UpdatePointOfSale
