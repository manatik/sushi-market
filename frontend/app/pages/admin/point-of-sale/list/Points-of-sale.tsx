import { useState } from 'react'

import Filters from '@components/admin/filters/Filters'
import Separator from '@components/ui/separator/Separator'

import { usePointsOfSale } from '@query-hooks/usePointsOfSale'

import { IPointOfSaleFilters } from '@common-types/point-of-sale.types'

import PointOfSaleList from './Point-of-sale-list'

import styles from '@styles/admin/admin-page.style.module.scss'

const PointsOfSale = () => {
	const [filters, setFilters] = useState<IPointOfSaleFilters>({})

	const { isLoading: isPointsOfSaleLoading, data: pointsOfSale } = usePointsOfSale(filters)

	return (
		<div className={styles.adminPage}>
			<Filters onChange={filters => setFilters(filters)}>
				<Filters.Search />
			</Filters>

			<Separator />

			<PointOfSaleList isLoading={isPointsOfSaleLoading} pointsOfSale={pointsOfSale} />
		</div>
	)
}

export default PointsOfSale
