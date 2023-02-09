import { FC } from 'react'

import OrderButtons from '@components/admin/card-order-buttons/Order-buttons'
import CategoryContextMenu from '@components/pages/admin/category/list/Category-context-menu'
import Card from '@components/ui/card/Card'

import { useUpdateCategory } from '@query-hooks/useCategories'

import { ICategory } from '@common-types/category.types'

import { dateToFormatDate } from '@utils/utils'

interface Props {
	category: ICategory
}

const CategoryItem: FC<Props> = ({ category }) => {
	const { mutate: updateCategory } = useUpdateCategory({ isShowToast: false })

	const onPrevOrder = () => {
		if (category.orderBy > 1) {
			updateCategory({ id: category.id, dto: { orderBy: category?.orderBy - 1 } })
		}
	}

	const onNextOrder = () => {
		updateCategory({ id: category.id, dto: { orderBy: category?.orderBy + 1 } })
	}

	return (
		<CategoryContextMenu category={category}>
			<Card>
				<Card.Header>
					<Card.Title title={category.name} subTitle={category.article} />
					<OrderButtons onLeftArrow={onPrevOrder} onRightArrow={onNextOrder} />
				</Card.Header>

				<Card.Content>
					<Card.Item>
						<span>Код</span>
						<span>{category.code}</span>
					</Card.Item>

					<Card.Item>
						<span>Позиция</span>
						<span>{category.orderBy}</span>
					</Card.Item>
				</Card.Content>

				<Card.Content>
					<Card.Item justify={'end'} type={'secondary'}>
						{category.dateUpdated ? dateToFormatDate(category.dateUpdated) : 'Не обновлялась'}
					</Card.Item>
				</Card.Content>
			</Card>
		</CategoryContextMenu>
	)
}

export default CategoryItem
