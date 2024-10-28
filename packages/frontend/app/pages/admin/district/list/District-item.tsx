import classNames from 'classnames'
import { FC } from 'react'

import Card from '@components/ui/card/Card'

import { IDistrict } from '@common-types/district.types'

import { dateToFormatDate } from '@utils/utils'

import DistrictContextMenu from './District-context-menu'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	district: IDistrict
}

const DistrictItem: FC<Props> = ({ district }) => {
	return (
		<DistrictContextMenu district={district}>
			<Card>
				<Card.Header>
					<Card.Title title={district.name} />
				</Card.Header>

				<Card.Content>
					<Card.Item>
						<span>Точка продаж</span>
						<span
							className={classNames({
								[styles.card__emptyField]: !district.pointOfSale
							})}
						>
							{district.pointOfSale?.addressPointSale || 'не задана'}
						</span>
					</Card.Item>

					<Card.Item>
						<span>Мин. сум. заказа</span>
						<span>{district.minSumOrder}</span>
					</Card.Item>

					<Card.Item>
						<span>Сум. доставки</span>
						<span>{district.priceDelivery}</span>
					</Card.Item>

					<Card.Item>
						<span>Сум. бесп. доставки</span>
						<span>{district.priceFreeDelivery}</span>
					</Card.Item>
				</Card.Content>

				<Card.Content>
					<Card.Item justify={'end'} type={'secondary'}>
						{district.dateUpdated ? dateToFormatDate(district.dateUpdated) : 'Не обновлялся'}
					</Card.Item>
				</Card.Content>
			</Card>
		</DistrictContextMenu>
	)
}

export default DistrictItem
