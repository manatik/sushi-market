import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Dialog from '@components/ui/dialog/Dialog'
import Input from '@components/ui/input/Input'
import Separator from '@components/ui/separator/Separator'

import { useUpdateIngredient } from '@query-hooks/useIngredients'

import { ICreateIngredient, IIngredient } from '@common-types/ingredient.types'

import styles from './ingredient.style.module.scss'

interface Props {
	ingredient: IIngredient
	isOpen: boolean
	onClose: () => void
}

const UpdateIngredient: FC<Props> = ({ ingredient, onClose, isOpen }) => {
	const { mutate: updateIngredient } = useUpdateIngredient()

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty }
	} = useForm<ICreateIngredient>({
		defaultValues: {
			...ingredient
		}
	})

	const onSubmit = (formData: ICreateIngredient) => {
		updateIngredient({ id: ingredient.id, dto: formData })
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose} position={'right'}>
			<div className={styles.ingredient}>
				<h3 className={styles.ingredient__title}>Обновление ингредиента</h3>

				<Separator />

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Input {...register('name')} label={'Название'} error={errors.name?.message} type='text' />

					<Input {...register('description')} label={'Описание'} error={errors.description?.message} type='text' />

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

export default UpdateIngredient
