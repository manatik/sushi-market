import { FC } from 'react'

import { IProduct } from '@common-types/product.types'

import { currencyFormatter } from '@utils/utils'

import styles from './product-item.style.module.scss'

interface Props {
	product: IProduct
}

const ProductItem: FC<Props> = ({ product }) => {
	return (
		<div className={styles.main}>
			<div className={styles.image}>картинка</div>

			<div className={styles.title}>{product.name}</div>

			<div className={styles.ingredients}>
				{product.ingredients.map(ingredient => (
					<span className={styles.ingredient} key={ingredient.id}>
						{ingredient.name}
					</span>
				))}
			</div>

			<div className={styles.price}>{currencyFormatter(product.price)}</div>
		</div>
	)
}

export default ProductItem
