import ProductItem from '@components/products/Product-item'
import Loader from '@components/ui/loader/Loader'

import { useCategories } from '@query-hooks/useCategories'
import { useProducts } from '@query-hooks/useProducts'

import { productsGroupByCategory } from '@utils/utils'

import styles from './products.style.module.scss'

const Products = () => {
	const { data: categories = [], isLoading: isCategoryLoading } = useCategories()
	const { data: products = [], isLoading: isProductsLoading } = useProducts()
	const productsByCategory = productsGroupByCategory(categories, products)

	if (isProductsLoading || isCategoryLoading) {
		return <Loader />
	}

	return (
		<div className={styles.main}>
			{productsByCategory.map(([categoryName, products]) => (
				<div className={styles.categoryProducts} key={categoryName}>
					<span className={styles.categoryName}>{categoryName}</span>

					<div className={styles.products}>
						{products?.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default Products
