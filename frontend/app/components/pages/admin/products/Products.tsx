import { IProductFilters } from '@common-types/product.types'
import ProductList from '@components/pages/admin/products/Product-list'
import Input from '@components/ui/input/Input'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'
import Switch from '@components/ui/switch/Switch'
import { useCategories } from '@query-hooks/useCategories'
import { useProducts } from '@query-hooks/useProducts'
import { useSubCategories } from '@query-hooks/useSubCategories'
import * as Label from '@radix-ui/react-label'
import { ChangeEvent, useState } from 'react'
import styles from './products.style.module.scss'

const Products = () => {
	const [filters, setFilters] = useState<IProductFilters>({
		categoryId: '',
		onlyHidden: false,
		search: '',
		subCategoryId: ''
	})

	const { isLoading: isProductsLoading, data: products } = useProducts(filters)
	const { isLoading: isCategoriesLoading, data: categories } = useCategories()
	const { isLoading: isSubCategoriesLoading, data: subCategories } = useSubCategories()

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setFilters(prev => ({ ...prev, search: event.target.value }))
	}

	const handleHidden = (value: boolean) => {
		setFilters(prev => ({ ...prev, onlyHidden: value }))
	}

	const handleChangeCategory = (value: string) => {
		setFilters(prev => ({ ...prev, categoryId: value }))
	}

	const handleChangeSubCategory = (value: string) => {
		setFilters(prev => ({ ...prev, subCategoryId: value }))
	}

	return (
		<div className={styles.products}>
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

						<Select
							id='subCategories'
							placeholder='Подкатегории'
							onChange={handleChangeSubCategory}
							value={filters.subCategoryId}
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

					<Switch id='hidden' onCheckedChange={handleHidden} checked={filters.onlyHidden} />
				</div>
			</div>

			<ProductList
				isLoading={isProductsLoading || isCategoriesLoading || isSubCategoriesLoading}
				products={products}
			/>
		</div>
	)
}

export default Products
