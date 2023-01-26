import { FC } from 'react'
import { useFilterContext } from '@components/admin/filters/Filters.context'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import { useCategories } from '@query-hooks/useCategories'
import * as Label from '@radix-ui/react-label'
import styles from '@styles/admin/admin-page.style.module.scss'

const CategoryFilter: FC = () => {
	const { isLoading: isCategoriesLoading, data: categories } = useCategories()
	const { filters, setFilters } = useFilterContext()

	const handleChangeCategory = (value: string) => {
		setFilters((prev: any) => ({ ...prev, categoryId: value }))
	}

	if (isCategoriesLoading) {
		return <div>loading...</div>
	}

	return (
		<div className={styles.controlsItem}>
			<Label.Root className={styles.controlsItem__label} htmlFor='categories'>
				Фильтр категорий
			</Label.Root>

			<Select id='categories' placeholder={'Категории'} onChange={handleChangeCategory} value={filters.categoryId}>
				{categories?.map(category => (
					<SelectItem key={category.id} value={category.id}>
						{category.name}
					</SelectItem>
				))}
			</Select>
		</div>
	)
}

export default CategoryFilter
