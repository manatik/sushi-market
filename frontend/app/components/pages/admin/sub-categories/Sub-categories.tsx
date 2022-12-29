import { ISubCategoryFilters } from '@common-types/sub-category.types'
import Filters from '@components/admin/filters/Filters'
import SubCategoryList from '@components/pages/admin/sub-categories/Sub-category-list'
import Separator from '@components/ui/separator/Separator'
import { useSubCategories } from '@query-hooks/useSubCategories'
import styles from '@styles/admin/admin-page.style.module.scss'
import { useState } from 'react'

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
