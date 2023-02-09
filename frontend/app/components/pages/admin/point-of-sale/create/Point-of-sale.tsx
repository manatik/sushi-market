import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Input from '@components/ui/input/Input'
import Separator from '@components/ui/separator/Separator'

import { useCreatePointOfSale } from '@query-hooks/usePointsOfSale'

import { ICreatePointOfSale } from '@common-types/point-of-sale.types'

import { PointOfSaleSchema } from './point-of-sale.schema'
import styles from './point-of-sale.style.module.scss'

const CreatePointOfSale = () => {
	const { mutate: createPointOfSale } = useCreatePointOfSale()

	const {
		handleSubmit,
		register,
		formState: { errors, isValid },
		reset
	} = useForm<ICreatePointOfSale>({
		resolver: zodResolver(PointOfSaleSchema)
	})

	const onSubmit = (formData: ICreatePointOfSale) => {
		createPointOfSale(formData, {
			onSuccess() {
				reset()
			}
		})
	}

	return (
		<div className={styles.pointOfSale}>
			<h3 className={styles.pointOfSale__title}>Создание точки продаж</h3>

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
						Создать
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreatePointOfSale
