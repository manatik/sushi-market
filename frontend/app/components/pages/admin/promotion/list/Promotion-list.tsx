import { FC } from 'react'

import PromotionItem from '@components/pages/admin/promotion/list/Promotion-item'

import { IPromotion } from '@common-types/promotion.types'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	promotions?: IPromotion[]
	isLoading: boolean
}

const PromotionList: FC<Props> = ({ isLoading, promotions }) => {
	if (isLoading) {
		return <div>loading...</div>
	}

	if (!promotions?.length) {
		return <div className={styles.cards}>Ничего не найдено</div>
	}

	return (
		<div className={styles.cards}>
			{promotions?.map(promotion => (
				<PromotionItem key={promotion.id} promotion={promotion} />
			))}
		</div>
	)
}

export default PromotionList
