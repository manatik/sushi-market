import Input from '@components/ui/input/Input'
import Switch from '@components/ui/switch/Switch'
import * as Label from '@radix-ui/react-label'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from './category.style.module.scss'

interface Form {
	name: string
	article: string
	code: string
	orderBy: number
	hidden: boolean
}
const Category = () => {
	const { handleSubmit, register, control } = useForm<Form>({})

	const onSubmit = (formData: any) => {
		console.log(formData)
	}

	return (
		<div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('name', { required: true })}
					label={'Название'}
					error={''}
					type='text'
					id='name'
				/>
				<Input
					{...register('article', { required: true })}
					label={'Артикул'}
					error={''}
					type='text'
					id='name'
				/>
				<Input
					{...register('code', { required: true })}
					label={'Код'}
					error={''}
					type='text'
					id='name'
				/>
				<Input {...register('orderBy')} label={'Позиция'} error={''} type='text' id='name' />

				<div className={styles.formField}>
					<Label.Root htmlFor={'hidden'} className={styles.formField__label}>
						Скрыть:
					</Label.Root>

					<Controller
						control={control}
						name={'hidden'}
						render={({ field }) => (
							<Switch id={'hidden'} onCheckedChange={e => field.onChange(e)} />
						)}
					/>
				</div>

				<div className={styles.formField}>
					<button className={styles.formField__button}>Создать</button>
				</div>
			</form>
		</div>
	)
}

export default Category
