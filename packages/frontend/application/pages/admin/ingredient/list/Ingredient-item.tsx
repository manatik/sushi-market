import { FC } from 'react'

import Card from '@components/ui/card/Card'

import { IIngredient } from '@common-types/ingredient.types'

import { dateToFormatDate } from '@utils/utils'

import IngredientContextMenu from './Ingredient-context-menu'

interface Props {
	ingredient: IIngredient
}

const IngredientItem: FC<Props> = ({ ingredient }) => {
	return (
		<IngredientContextMenu ingredient={ingredient}>
			<Card>
				<Card.Header>
					<Card.Title title={ingredient.name} />
				</Card.Header>

				<Card.Content>
					<Card.Item>
						<span>Описание</span>
						<span>{ingredient.description}</span>
					</Card.Item>
				</Card.Content>

				<Card.Content>
					<Card.Item justify={'end'} type={'secondary'}>
						{ingredient.dateUpdated ? dateToFormatDate(ingredient.dateUpdated) : 'Не обновлялся'}
					</Card.Item>
				</Card.Content>
			</Card>
		</IngredientContextMenu>
	)
}

export default IngredientItem
