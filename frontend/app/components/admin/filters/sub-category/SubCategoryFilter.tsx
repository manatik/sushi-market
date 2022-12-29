import { useFilterContext } from '@components/admin/filters/Filters.context'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import { useSubCategories } from '@query-hooks/useSubCategories'
import * as Label from '@radix-ui/react-label'
import styles from '@styles/admin/admin-page.style.module.scss'
import { FC } from 'react'

const SubCategoryFilter: FC = () => {
	const { isLoading: isSubCategoriesLoading, data: subCategories } = useSubCategories()

	const { filters, setFilters } = useFilterContext()

	const handleChangeSubCategory = (value: string) => {
		setFilters((prev: any) => ({ ...prev, subCategoryId: value }))
	}

	if (isSubCategoriesLoading) {
		return <div>loading...</div>
	}

	return (
		<div className={styles.controlsItem}>
			<Label.Root className={styles.controlsItem__label} htmlFor='categories'>
				Фильтр подкатегорий
			</Label.Root>

			<Select
				id='subCategories'
				placeholder='Подкатегории'
				onChange={handleChangeSubCategory}
				value={filters.subCategoryId}
			>
				{subCategories?.map(subCategory => (
					<SelectItem key={subCategory.id} value={subCategory.id}>
						{subCategory.name}
					</SelectItem>
				))}
			</Select>
		</div>
	)
}

export default SubCategoryFilter
