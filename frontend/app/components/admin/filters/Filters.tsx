import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { FiltersContext, FiltersObject } from '@components/admin/filters/Filters.context'
import CategoryFilter from '@components/admin/filters/category/CategoryFilter'
import HiddenFilter from '@components/admin/filters/hidden/HiddenFilter'
import SearchFilter from '@components/admin/filters/search/SearchFilter'
import SubCategoryFilter from '@components/admin/filters/sub-category/SubCategoryFilter'

import styles from '@styles/admin/admin-page.style.module.scss'

interface DotNotation {
	Category: typeof CategoryFilter
	SubCategory: typeof SubCategoryFilter
	Search: typeof SearchFilter
	Hidden: typeof HiddenFilter
}

interface Props {
	onChange: (filters: FiltersObject) => void
}

const Filters: FC<PropsWithChildren<Props>> & DotNotation = ({ children, onChange }) => {
	const [filters, setFilters] = useState<FiltersObject>({})

	useEffect(() => {
		onChange(filters)
	}, [filters, onChange])

	return (
		<FiltersContext.Provider value={{ setFilters, filters }}>
			<div className={styles.controls}>{children}</div>
		</FiltersContext.Provider>
	)
}

Filters.Category = CategoryFilter
Filters.SubCategory = SubCategoryFilter
Filters.Search = SearchFilter
Filters.Hidden = HiddenFilter

export default Filters
