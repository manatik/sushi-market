import { FC } from 'react'

import PointOfSaleContextMenu from '@components/pages/admin/point-of-sale/list/Point-of-sale-context-menu'
import Card from '@components/ui/card/Card'

import { IPointOfSale } from '@common-types/point-of-sale.types'

import { dateToFormatDate } from '@utils/utils'

interface Props {
	pointOfSale: IPointOfSale
}

const IngredientItem: FC<Props> = ({ pointOfSale }) => {
	return (
		<PointOfSaleContextMenu pointOfSale={pointOfSale}>
			<Card>
				<Card.Content>
					<Card.Item>
						<span>Город</span>
						<span>{pointOfSale.city}</span>
					</Card.Item>

					<Card.Item>
						<span>Время работы</span>
						<span>{pointOfSale.operatingModePointSale}</span>
					</Card.Item>

					<Card.Item>
						<span>Время работы доставки</span>
						<span>{pointOfSale.operatingModeDelivery}</span>
					</Card.Item>

					<Card.Item>
						<span>Фронтпад код</span>
						<span>{pointOfSale.fpApiCode}</span>
					</Card.Item>
				</Card.Content>

				<Card.Content>
					<Card.Item justify={'end'} type={'secondary'}>
						{pointOfSale.dateUpdated ? dateToFormatDate(pointOfSale.dateUpdated) : 'Не обновлялся'}
					</Card.Item>
				</Card.Content>
			</Card>
		</PointOfSaleContextMenu>
	)
}

export default IngredientItem
