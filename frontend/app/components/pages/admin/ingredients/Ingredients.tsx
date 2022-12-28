import IngredientItem from '@components/pages/admin/ingredients/Ingredient-item'
import Switch from '@components/ui/switch/Switch'
import { useIngredients } from '@query-hooks/useIngredients'
import * as Label from '@radix-ui/react-label'
import { useState } from 'react'
import styles from './ingredients.style.module.scss'

const Ingredients = () => {
	const { isLoading, data: ingredients } = useIngredients()

	if (isLoading) {
		return <div>loading...</div>
	}

	return (
		<div className={styles.ingredients}>
			<div className={styles.controls}></div>

			<div className={styles.cards}>
				{ingredients?.map(ingredient => (
					<IngredientItem key={ingredient.id} ingredient={ingredient} />
				))}
			</div>
		</div>
	)
}

export default Ingredients
