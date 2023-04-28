import { useState } from 'react'

import MenuList from '@components/menu/Menu-list'
import Loader from '@components/ui/loader/Loader'

import { useCategories } from '@query-hooks/useCategories'
import { useSubCategories } from '@query-hooks/useSubCategories'

import type { ICategory } from '@common-types/category.types'

import styles from './menu.style.module.scss'

const Menu = () => {
	const { data: categories = [], isLoading: isCategoryLoading } = useCategories()
	const { data: subCategories = [], isLoading: isSubCategoryLoading } = useSubCategories()
	const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined)

	const onSelectCategory = (name: string) => {
		const category = categories.find(category => category.name === name)
		setSelectedCategory(prev => (prev?.id === category?.id ? undefined : category))
	}

	if (isCategoryLoading || isSubCategoryLoading) {
		return <Loader direction={'horizontal'} text={'Подгружаем категории'} />
	}

	return (
		<div className={styles.main}>
			<MenuList items={categories?.map(category => category.name)} onClick={onSelectCategory} />

			{selectedCategory && (
				<MenuList
					items={subCategories
						?.filter(subCategory => subCategory.categoryId === selectedCategory?.id)
						.map(subCategory => subCategory.name)}
				/>
			)}
		</div>
	)
}

export default Menu
