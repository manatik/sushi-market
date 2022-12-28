import ProductItem from '@components/pages/admin/products/Product-item'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Switch from '@components/ui/switch/Switch'
import { useCategories } from '@query-hooks/useCategories'
import { useProducts } from '@query-hooks/useProducts'
import { useSubCategories } from '@query-hooks/useSubCategories'
import * as Label from '@radix-ui/react-label'
import { useState } from 'react'
import styles from './products.style.module.scss'

const Products = () => {
	const [isOnlyHidden, setIsOnlyHidden] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [selectedSubCategory, setSelectedSubCategory] = useState<string>('')

	const { isLoading: isProductsLoading, data: products } = useProducts(isOnlyHidden, {
		subCategoryId: selectedSubCategory,
		categoryId: selectedCategory
	})
	const { isLoading: isCategoriesLoading, data: categories } = useCategories()
	const { isLoading: isSubCategoriesLoading, data: subCategories } = useSubCategories()

	if (isProductsLoading || isCategoriesLoading || isSubCategoriesLoading) {
		return <div>loading...</div>
	}

	return (
		<div className={styles.products}>
			<div className={styles.controls}>
				<div className={styles.filters}>
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

						<Select
							id='subCategories'
							placeholder='Подкатегории'
							onChange={id => setSelectedSubCategory(id)}
							value={selectedSubCategory}
						>
							<SelectItem value={''}>Не выбрано</SelectItem>

							{subCategories?.map(subCategory => (
								<SelectItem key={subCategory.id} value={subCategory.id}>
									{subCategory.name}
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

			<div className={styles.cards}>
				{products?.map(product => (
					<ProductItem key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}

export default Products
