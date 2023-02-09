import { useState } from 'react'

import Filters from '@components/admin/filters/Filters'
import SubCategoryList from '@components/pages/admin/sub-category/list/Sub-category-list'
import Separator from '@components/ui/separator/Separator'

import { useSubCategories } from '@query-hooks/useSubCategories'

import { ISubCategoryFilters } from '@common-types/sub-category.types'

import styles from '@styles/admin/admin-page.style.module.scss'

const SubCategories = () => {
	const [filters, setFilters] = useState<ISubCategoryFilters>({})

	const { isLoading: isSubCategoriesLoading, data: subCategories } = useSubCategories(filters)

	return (
		<div className={styles.adminPage}>
			<Filters onChange={filters => setFilters(filters)}>
				<Filters.Search />
				<Filters.Category />
				<Filters.Hidden />
			</Filters>

			<Separator />

			<SubCategoryList isLoading={isSubCategoriesLoading} subCategories={subCategories} />
		</div>
	)
}

export default SubCategories
