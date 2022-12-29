import { IIngredient } from '@common-types/ingredient.types'
import IngredientItem from '@components/pages/admin/ingredients/Ingredient-item'
import styles from '@styles/admin/admin-page.style.module.scss'
import React, { FC } from 'react'

interface Props {
	ingredients?: IIngredient[]
	isLoading: boolean
}

const IngredientList: FC<Props> = ({ isLoading, ingredients }) => {
	if (isLoading) {
		return <div>loading...</div>
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
