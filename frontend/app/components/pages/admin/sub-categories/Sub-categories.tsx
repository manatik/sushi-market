import SubCategoryList from '@components/pages/admin/sub-categories/Sub-category-list'
import SubCategoryItem from '@components/pages/admin/sub-categories/Sub-category-item'
import Input from '@components/ui/input/Input'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Switch from '@components/ui/switch/Switch'
import { useCategories } from '@query-hooks/useCategories'
import { useSubCategories } from '@query-hooks/useSubCategories'
import * as Label from '@radix-ui/react-label'
import { useState } from 'react'
import styles from './sub-categories.style.module.scss'

const SubCategories = () => {
	const [isOnlyHidden, setIsOnlyHidden] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [search, setSearch] = useState('')

	const { isLoading: isSubCategoriesLoading, data: subCategories } = useSubCategories(
		isOnlyHidden,
		{
			categoryId: selectedCategory,
			search
		}
	)
	const { isLoading: isCategoriesLoading, data: categories } = useCategories()

	return (
		<div className={styles.subCategories}>
			<div className={styles.controls}>
				<div className={styles.filters}>
					<div className={styles.filters}>
						<Input label={'Поиск'} onChange={e => setSearch(e.target.value)} value={search} />
					</div>

					<Label.Root className={styles.filters__label} htmlFor='categories'>
						Сортировать по
					</Label.Root>

					<div className={styles.filters}>
						<Select
							id='categories'
							placeholder={'Категории'}
							onChange={id => setSelectedCategory(id)}
							value={selectedCategory}
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

					<Switch
						id='hidden'
						onCheckedChange={checked => setIsOnlyHidden(checked)}
						checked={isOnlyHidden}
					/>
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
