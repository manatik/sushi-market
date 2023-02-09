import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { IngredientSchema } from '@components/pages/admin/ingredient/create/ingredient.schema'
import Input from '@components/ui/input/Input'
import Separator from '@components/ui/separator/Separator'

import { useCreateIngredient } from '@query-hooks/useIngredients'

import { ICreateIngredient } from '@common-types/ingredient.types'

import styles from './ingredient.style.module.scss'

const CreateIngredient = () => {
	const { mutate: createIngredient } = useCreateIngredient()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset
	} = useForm<ICreateIngredient>({
		resolver: zodResolver(IngredientSchema)
	})

	const onSubmit = (formData: ICreateIngredient) => {
		createIngredient(formData, {
			onSuccess() {
				reset()
			}
		})
	}

	return (
		<div className={styles.ingredient}>
			<h3 className={styles.ingredientTitle}>
				<span className={styles.ingredientTitle__label}>Создание ингредиента</span>
			</h3>

			<Separator />

			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input {...register('name')} label={'Название'} error={errors.name?.message} type='text' />

				<Input {...register('description')} label={'Описание'} error={errors.description?.message} type='text' />

				<div className={styles.formField}>
					<button className={styles.formField__button} disabled={!isValid || !!Object.keys(errors).length}>
						Создать
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateIngredient
