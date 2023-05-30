import { useState } from 'react'

import Filters from '@components/admin/filters/Filters'
import Separator from '@components/ui/separator/Separator'

import { useIngredients } from '@query-hooks/useIngredients'

import { IIngredientFilters } from '@common-types/ingredient.types'

import IngredientList from './Ingredient-list'

import styles from '@styles/admin/admin-page.style.module.scss'

const Ingredients = () => {
	const [filters, setFilters] = useState<IIngredientFilters>({})

	const { isLoading: isIngredientsLoading, data: ingredients } = useIngredients(filters)

	return (
		<div className={styles.adminPage}>
			<Filters onChange={filters => setFilters(filters)}>
				<Filters.Search />
			</Filters>

			<Separator />

			<IngredientList isLoading={isIngredientsLoading} ingredients={ingredients} />
		</div>
	)
}

export default Ingredients
