import { IProduct } from '@common-types/product.types'
import ProductContextMenu from '@components/pages/admin/products/Product-context.menu'
import Card from '@components/ui/card/Card'
import { dateToFormatDate } from '@utils/utils'
import React, { FC } from 'react'

interface Props {
	product: IProduct
}

const ProductItem: FC<Props> = ({ product }) => {
	return (
		<ProductContextMenu product={product}>
			<Card>
				<Card.Header>
					<Card.Title title={product.name} subTitle={product.article} />
				</Card.Header>

				<Card.Content>
					<Card.Item>
						<span>Категория</span>
						<span>{product.category.name}</span>
					</Card.Item>

					<Card.Item>
						<span>Подкатегория</span>
						<span>{product.subCategory.name}</span>
					</Card.Item>

					<Card.Item>
						<span>Цена</span>
						<span>
							{Intl.NumberFormat('ru-RU', {
								style: 'currency',
								currency: 'RUB',
								maximumFractionDigits: 0
							}).format(product.price)}
						</span>
					</Card.Item>

					<Card.Item>
						<span>Кол-во ингредиентов</span>
						<span>{product.ingredients.length}</span>
					</Card.Item>

					<Card.Item>
						<span>Позиция</span>
						<span>{product.orderBy}</span>
					</Card.Item>
				</Card.Content>

				<Card.Content>
					<Card.Item justify={'end'} type={'secondary'}>
						{product.dateUpdated ? dateToFormatDate(product.dateUpdated) : 'Не обновлялся'}
					</Card.Item>
				</Card.Content>
			</Card>
		</ProductContextMenu>
	)
}

export default ProductItem
