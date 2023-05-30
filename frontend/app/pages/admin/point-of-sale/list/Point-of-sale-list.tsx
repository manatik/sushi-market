import React, { FC } from 'react'

import Loader from '@components/ui/loader/Loader'

import { IPointOfSale } from '@common-types/point-of-sale.types'

import PointOfSaleItem from './Point-of-sale-item'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	pointsOfSale?: IPointOfSale[]
	isLoading: boolean
}

const IngredientList: FC<Props> = ({ isLoading, pointsOfSale }) => {
	if (isLoading) {
		return <Loader text={'Загрузка'} size={'large'} />
	}

	if (!pointsOfSale?.length) {
		return <div className={styles.cards}>Ничего не найдено</div>
	}

	return (
		<div className={styles.cards}>
			{pointsOfSale?.map(pointOfSale => (
				<PointOfSaleItem key={pointOfSale.id} pointOfSale={pointOfSale} />
			))}
		</div>
	)
}

export default IngredientList
