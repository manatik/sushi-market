import { FC } from 'react'

import Loader from '@components/ui/loader/Loader'

import { IProduct } from '@common-types/product.types'

import ProductItem from './Product-item'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	products?: IProduct[]
	isLoading: boolean
}

const ProductList: FC<Props> = ({ isLoading, products }) => {
	if (isLoading) {
		return <Loader text={'Загрузка'} size={'large'} />
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
