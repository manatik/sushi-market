import { IIngredientFilters } from '@common-types/ingredient.types'
import IngredientList from '@components/pages/admin/ingredients/Ingredient-list'
import Input from '@components/ui/input/Input'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'
import { useDebounce } from '@hooks/useDebounce'
import { useIngredients } from '@query-hooks/useIngredients'
import * as Label from '@radix-ui/react-label'
import { ChangeEvent, useState } from 'react'
import styles from './ingredients.style.module.scss'

const Ingredients = () => {
	const [filters, setFilters] = useState<IIngredientFilters>({
		search: ''
	})
	const debouncedSearch = useDebounce(filters.search, 500)

	const { isLoading: isIngredientsLoading, data: ingredients } = useIngredients({
		search: debouncedSearch
	})

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setFilters(prev => ({ ...prev, search: event.target.value }))
	}

	return (
		<div className={styles.ingredients}>
			<div className={styles.controls}>
				<div className={styles.controlsItem}>
					<Input label={'Поиск'} color={'white'} onChange={handleSearch} value={filters.search} />
				</div>
			</div>

			<Separator />

			<IngredientList isLoading={isIngredientsLoading} ingredients={ingredients} />
		</div>
	)
}

export default Ingredients
