import classNames from 'classnames'
import { FC } from 'react'

import Card from '@components/ui/card/Card'

import { IPromotion, TranslatesTypePromotion } from '@common-types/promotion.types'

import { booleanYesOrNot, currencyFormatter, dateToFormatDate } from '@utils/utils'

import PromotionContextMenu from './Promotion-context.menu'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	promotion: IPromotion
}

const PromotionItem: FC<Props> = ({ promotion }) => {
	const calcDiscount = Math.trunc(100 - (promotion.price * 100) / promotion.oldPrice)

	return (
		<PromotionContextMenu promotion={promotion}>
			<Card>
				<Card.Header>
					<Card.Title title={promotion.name} subTitle={promotion.article} />
				</Card.Header>

				<Card.Content>
					<Card.Item>
						<span>Тип акции</span>
						<span>{TranslatesTypePromotion[promotion.typePromotion]}</span>
					</Card.Item>

					<Card.Item>
						<span>Старая цена</span>
						<span>{currencyFormatter(promotion.oldPrice)}</span>
					</Card.Item>

					<Card.Item>
						<span>Новая цена</span>
						<span>{currencyFormatter(promotion.price)}</span>
					</Card.Item>

					<Card.Item>
						<span>Cкидка</span>
						<span>{promotion.discount || calcDiscount} %</span>
					</Card.Item>

					<Card.Item>
						<span>Старт</span>
						<span>{dateToFormatDate(promotion.dateStart)}</span>
					</Card.Item>

					<Card.Item>
						<span>Окончание</span>
						<span>{dateToFormatDate(promotion.dateEnd)}</span>
					</Card.Item>

					<Card.Item>
						<span>Промокод</span>
						<span
							className={classNames({
								[styles.card__emptyField]: !promotion.promocode
							})}
						>
							{promotion.promocode || 'Не задан'}
						</span>
					</Card.Item>

					<Card.Item>
						<span>Одноразовая</span>
						<span>{booleanYesOrNot(promotion.isDisposable)}</span>
					</Card.Item>

					<Card.Item>
						<span>Кол-во продуктов</span>
						<span
							className={classNames({
								[styles.card__emptyField]: !promotion.products.length
							})}
						>
							{promotion.products.length}
						</span>
					</Card.Item>
				</Card.Content>

				<Card.Content>
					<Card.Item justify={'end'} type={'secondary'}>
						{promotion.dateUpdated ? dateToFormatDate(promotion.dateUpdated) : 'Не обновлялся'}
					</Card.Item>
				</Card.Content>
			</Card>
		</PromotionContextMenu>
	)
}

export default PromotionItem
