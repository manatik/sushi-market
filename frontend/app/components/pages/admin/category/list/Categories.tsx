import { useState } from 'react'

import Filters from '@components/admin/filters/Filters'
import CategoryList from '@components/pages/admin/category/list/Category-list'
import Separator from '@components/ui/separator/Separator'

import { useCategories } from '@query-hooks/useCategories'

import { ICategoryFilters } from '@common-types/category.types'

import styles from '@styles/admin/admin-page.style.module.scss'

const Categories = () => {
	const [filters, setFilters] = useState<ICategoryFilters>({})

	const { isLoading: isCategoriesLoading, data: categories } = useCategories(filters)

	return (
		<div className={styles.adminPage}>
			<Filters onChange={filters => setFilters(filters)}>
				<Filters.Search />
				<Filters.Hidden />
			</Filters>

			<Separator />

			<CategoryList isLoading={isCategoriesLoading} categories={categories} />
		</div>
	)
}

export default Categories
