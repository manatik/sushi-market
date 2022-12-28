import { ISubCategoryFilters } from '@common-types/sub-category.types'
import SubCategoryList from '@components/pages/admin/sub-categories/Sub-category-list'
import Input from '@components/ui/input/Input'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Separator from '@components/ui/separator/Separator'
import Switch from '@components/ui/switch/Switch'
import { useDebounce } from '@hooks/useDebounce'
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
	const debouncedSearch = useDebounce(filters.search, 500)

	const { isLoading: isSubCategoriesLoading, data: subCategories } = useSubCategories({
		...filters,
		search: debouncedSearch
	})
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
				<Input label={'Поиск'} color={'white'} onChange={handleSearch} value={filters.search} />

				<div className={styles.controlsItem}>
					<Label.Root className={styles.controlsItem__label} htmlFor='categories'>
						Фильтр категорий
					</Label.Root>

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

				<div className={styles.controls__hidden}>
					<Label.Root htmlFor='hidden'>Скрытые</Label.Root>

					<Switch id='hidden' onCheckedChange={handleHidden} checked={filters.onlyHidden} />
				</div>
			</div>

			<Separator />

			<SubCategoryList
				isLoading={isSubCategoriesLoading || isCategoriesLoading}
				subCategories={subCategories}
			/>
		</div>
	)
}

export default SubCategories
