import { ISubCategoryFilters } from '@common-types/sub-category.types'
import SubCategoryList from '@components/pages/admin/sub-categories/Sub-category-list'
import Input from '@components/ui/input/Input'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Switch from '@components/ui/switch/Switch'
import { useCategories } from '@query-hooks/useCategories'
import { useSubCategories } from '@query-hooks/useSubCategories'
import * as Label from '@radix-ui/react-label'
import { ChangeEvent, useState } from 'react'
import styles from './sub-categories.style.module.scss'

const SubCategories = () => {
	const [filters, setFilters] = useState<ISubCategoryFilters>({
		categoryId: '',
		onlyHidden: false,
		search: ''
	})

	const { isLoading: isSubCategoriesLoading, data: subCategories } = useSubCategories(filters)
	const { isLoading: isCategoriesLoading, data: categories } = useCategories()

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setFilters(prev => ({ ...prev, search: event.target.value }))
	}

	const handleHidden = (value: boolean) => {
		setFilters(prev => ({ ...prev, onlyHidden: value }))
	}

	const handleChangeCategory = (value: string) => {
		setFilters(prev => ({ ...prev, categoryId: value }))
	}

	return (
		<div className={styles.subCategories}>
			<div className={styles.controls}>
				<div className={styles.filters}>
					<div className={styles.filters}>
						<Input label={'Поиск'} onChange={handleSearch} value={filters.search} />
					</div>

					<Label.Root className={styles.filters__label} htmlFor='categories'>
						Сортировать по
					</Label.Root>

					<div className={styles.filters}>
						<Select
							id='categories'
							placeholder={'Категории'}
							onChange={handleChangeCategory}
							value={filters.categoryId}
						>
							<SelectItem value={''}>Не выбрано</SelectItem>

							{categories?.map(category => (
								<SelectItem key={category.id} value={category.id}>
									{category.name}
								</SelectItem>
							))}
						</Select>
					</div>
				</div>
				<div className={styles.controls__hidden}>
					<Label.Root htmlFor='hidden'>Скрытые</Label.Root>

					<Switch id='hidden' onCheckedChange={handleHidden} checked={filters.onlyHidden} />
				</div>
			</div>

			<SubCategoryList
				isLoading={isSubCategoriesLoading || isCategoriesLoading}
				subCategories={subCategories}
			/>
		</div>
	)
}

export default SubCategories
