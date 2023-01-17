import { IProductFilters } from '@common-types/product.types'
import Filters from '@components/admin/filters/Filters'
import ProductList from '@components/pages/admin/product/list/Product-list'
import Separator from '@components/ui/separator/Separator'
import { useProducts } from '@query-hooks/useProducts'
import styles from '@styles/admin/admin-page.style.module.scss'
import { useState } from 'react'

const Products = () => {
	const [filters, setFilters] = useState<IProductFilters>({})

	const { isLoading: isProductsLoading, data: products } = useProducts(filters)

	return (
		<div className={styles.adminPage}>
			<Filters onChange={filters => setFilters(filters)}>
				<Filters.Search />
				<Filters.Category />
				<Filters.SubCategory />
				<Filters.Hidden />
			</Filters>

			<Separator />

			<ProductList isLoading={isProductsLoading} products={products} />
		</div>
	)
}

export default Products
