import { ICategoryFilters } from '@common-types/category.types'
import CategoryList from '@components/pages/admin/categories/Category-list'
import Input from '@components/ui/input/Input'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'
import { useDebounce } from '@hooks/useDebounce'
import { useCategories } from '@query-hooks/useCategories'
import * as Label from '@radix-ui/react-label'
import { ChangeEvent, useState } from 'react'
import styles from './categories.style.module.scss'

const Categories = () => {
	const [filters, setFilters] = useState<ICategoryFilters>({
		onlyHidden: false,
		search: ''
	})
	const debouncedSearch = useDebounce(filters.search, 500)

	const { isLoading: isCategoriesLoading, data: categories } = useCategories({
		...filters,
		search: debouncedSearch
	})

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setFilters(prev => ({ ...prev, search: event.target.value }))
	}

	const handleHidden = (value: boolean) => {
		setFilters(prev => ({ ...prev, onlyHidden: value }))
	}

	return (
		<div className={styles.categories}>
			<div className={styles.controls}>
				<div className={styles.controlsItem}>
					<Input label={'Поиск'} color={'white'} onChange={handleSearch} value={filters.search} />
				</div>

				<div className={styles.controls__hidden}>
					<Label.Root htmlFor='hidden'>Скрытые</Label.Root>

					<Switch id='hidden' onCheckedChange={handleHidden} checked={filters.onlyHidden} />
				</div>
			</div>

			<Separator />

			<CategoryList isLoading={isCategoriesLoading} categories={categories} />
		</div>
	)
}

export default Categories
