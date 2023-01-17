import { ICategory } from '@common-types/category.types'
import CategoryContextMenu from '@components/pages/admin/category/list/Category-context-menu'
import Card from '@components/ui/card/Card'
import { dateToFormatDate } from '@utils/utils'
import { FC } from 'react'

interface Props {
	category: ICategory
}

const CategoryItem: FC<Props> = ({ category }) => {
	return (
		<CategoryContextMenu category={category}>
			<Card>
				<Card.Header>
					<Card.Title title={category.name} subTitle={category.article} />
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
