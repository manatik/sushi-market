import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'

import Input from '@components/ui/input/Input'
import Loader from '@components/ui/loader/Loader'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Separator from '@components/ui/separator/Separator'

import { useCreateDistrict } from '@query-hooks/useDistricts'
import { usePointsOfSale } from '@query-hooks/usePointsOfSale'

import { ICreateDistrict } from '@common-types/district.types'

import { DistrictSchema } from './district.schema'
import styles from './district.style.module.scss'

const CreateDistrict = () => {
	const router = useRouter()
	const { mutate: createDistrict } = useCreateDistrict()
	const { data: pointsOfSale, isLoading: isPsLoading } = usePointsOfSale()

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isValid },
		reset
	} = useForm<ICreateDistrict>({
		resolver: zodResolver(DistrictSchema),
		defaultValues: {
			pointSaleId: router.query?.pointOfSaleId as string
		}
	})

	const onSubmit = (formData: ICreateDistrict) => {
		createDistrict(formData, {
			onSuccess() {
				reset()
			}
		})
	}

	if (isPsLoading) {
		return <Loader text={'Загрузка'} size={'large'} />
	}

	return (
		<div className={styles.district}>
			<h3 className={styles.district__title}>Создание Района</h3>

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
							value={field.value}
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
						Создать
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateDistrict
