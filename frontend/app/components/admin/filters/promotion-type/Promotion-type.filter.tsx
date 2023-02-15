import * as Label from '@radix-ui/react-label'
import React, { FC } from 'react'

import { useFilterContext } from '@components/admin/filters/Filters.context'
import Select from '@components/ui/select/Select'
import SelectItem from '@components/ui/select/SelectItem'

import { TranslatesTypePromotion } from '@common-types/promotion.types'

import styles from '@styles/admin/admin-page.style.module.scss'

const PromotionTypeFilter: FC = () => {
	const { filters, setFilters } = useFilterContext()

	const handleChangeCategory = (value: string) => {
		setFilters((prev: any) => ({ ...prev, promotionType: value }))
	}

	return (
		<div className={styles.controlsItem}>
			<Label.Root className={styles.controlsItem__label} htmlFor='promotion-types'>
				Типы акций
			</Label.Root>

			<Select
				id='promotion-types'
				placeholder={'Тип акции'}
				onChange={handleChangeCategory}
				value={filters.promotionType}
			>
				{Object.entries(TranslatesTypePromotion).map(([promotionType, translate]) => (
					<SelectItem key={promotionType} value={promotionType}>
						{translate}
					</SelectItem>
				))}
			</Select>
		</div>
	)
}

export default PromotionTypeFilter
