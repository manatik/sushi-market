import { FC } from 'react'

import OrderButtons from '@components/admin/card-order-buttons/Order-buttons'
import Card from '@components/ui/card/Card'

import { useUpdateSubCategory } from '@query-hooks/useSubCategories'

import { ISubCategory } from '@common-types/sub-category.types'

import { dateToFormatDate } from '@utils/utils'

import SubCategoryContextMenu from './Sub-category-context-menu'

interface Props {
	subCategory: ISubCategory
}

const SubCategoryItem: FC<Props> = ({ subCategory }) => {
	const { mutate: updateSubCategory } = useUpdateSubCategory({ isShowToast: false })

	const onPrevOrder = () => {
		if (subCategory.orderBy > 1) {
			updateSubCategory({ id: subCategory.id, dto: { orderBy: subCategory?.orderBy - 1 } })
		}
	}

	const onNextOrder = () => {
		updateSubCategory({ id: subCategory.id, dto: { orderBy: subCategory?.orderBy + 1 } })
	}

	return (
		<SubCategoryContextMenu subCategory={subCategory}>
			<Card>
				<Card.Header>
					<Card.Title title={subCategory.name} subTitle={subCategory.article} />
					<OrderButtons onLeftArrow={onPrevOrder} onRightArrow={onNextOrder} />
				</Card.Header>

				<Card.Content>
					<Card.Item>
						<span>Категория</span>
						<span>{subCategory.category.name}</span>
					</Card.Item>

					<Card.Item>
						<span>Позиция</span>
						<span>{subCategory.orderBy}</span>
					</Card.Item>
				</Card.Content>

				<Card.Content>
					<Card.Item justify={'end'} type={'secondary'}>
						{subCategory.dateUpdated ? dateToFormatDate(subCategory.dateUpdated) : 'Не обновлялась'}
					</Card.Item>
				</Card.Content>
			</Card>
		</SubCategoryContextMenu>
	)
}

export default SubCategoryItem
