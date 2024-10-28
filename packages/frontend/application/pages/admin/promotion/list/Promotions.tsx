import { useState } from 'react'

import Filters from '@components/admin/filters/Filters'
import Separator from '@components/ui/separator/Separator'

import { usePromotions } from '@query-hooks/usePromotion'

import { IPromotionFilters } from '@common-types/promotion.types'

import PromotionList from './Promotion-list'

import styles from '@styles/admin/admin-page.style.module.scss'

const Promotions = () => {
	const [filters, setFilters] = useState<IPromotionFilters>({})

	const { isLoading: isPromotionsLoading, data: promotions } = usePromotions(filters)

	return (
		<div className={styles.adminPage}>
			<Filters onChange={filters => setFilters(filters)}>
				<Filters.Search />
				<Filters.PromotionType />
				<Filters.Hidden />
			</Filters>

			<Separator />

			<PromotionList isLoading={isPromotionsLoading} promotions={promotions} />
		</div>
	)
}

export default Promotions
