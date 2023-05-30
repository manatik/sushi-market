import React, { FC } from 'react'

import Loader from '@components/ui/loader/Loader'

import { IPromotion } from '@common-types/promotion.types'

import PromotionItem from './Promotion-item'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	promotions?: IPromotion[]
	isLoading: boolean
}

const PromotionList: FC<Props> = ({ isLoading, promotions }) => {
	if (isLoading) {
		return <Loader text={'Загрузка'} size={'large'} />
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
