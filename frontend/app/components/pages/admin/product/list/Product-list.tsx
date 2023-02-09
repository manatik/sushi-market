import { FC } from 'react'

import ProductItem from '@components/pages/admin/product/list/Product-item'

import { IProduct } from '@common-types/product.types'

import styles from '@styles/admin/admin-page.style.module.scss'

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
