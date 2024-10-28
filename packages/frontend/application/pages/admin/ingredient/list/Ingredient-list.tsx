import React, { FC } from 'react'

import Loader from '@components/ui/loader/Loader'

import { IIngredient } from '@common-types/ingredient.types'

import IngredientItem from './Ingredient-item'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	ingredients?: IIngredient[]
	isLoading: boolean
}

const IngredientList: FC<Props> = ({ isLoading, ingredients }) => {
	if (isLoading) {
		return <Loader text={'Загрузка'} size={'large'} />
	}

	if (!ingredients?.length) {
		return <div className={styles.cards}>Ничего не найдено</div>
	}

	return (
		<div className={styles.cards}>
			{ingredients?.map(ingredient => (
				<IngredientItem key={ingredient.id} ingredient={ingredient} />
			))}
		</div>
	)
}

export default IngredientList
