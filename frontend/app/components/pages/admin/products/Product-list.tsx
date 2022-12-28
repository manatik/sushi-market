import { IProduct } from '@common-types/product.types'
import ProductItem from '@components/pages/admin/products/Product-item'
import styles from './products.style.module.scss'
import { FC } from 'react'

interface Props {
	products?: IProduct[]
	isLoading: boolean
}

const ProductList: FC<Props> = ({ isLoading, products }) => {
	if (isLoading) {
		return <div>loading...</div>
	}

	if (!products?.length) {
		return <div className={styles.cards}>Ничего не найдено</div>
	}

	return (
		<div className={styles.cards}>
			{products?.map(product => (
				<ProductItem key={product.id} product={product} />
			))}
		</div>
	)
}

export default ProductList
