import { ISubCategory } from '@common-types/sub-category.types'
import SubCategoryContextMenu from '@components/pages/admin/sub-category/list/Sub-category-context-menu'
import Card from '@components/ui/card/Card'
import { dateToFormatDate } from '@utils/utils'
import { FC } from 'react'

interface Props {
	subCategory: ISubCategory
}

const SubCategoryItem: FC<Props> = ({ subCategory }) => {
	return (
		<SubCategoryContextMenu subCategory={subCategory}>
			<Card>
				<Card.Header>
					<Card.Title title={subCategory.name} subTitle={subCategory.article} />
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
