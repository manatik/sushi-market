import * as Label from '@radix-ui/react-label'
import React, { FC } from 'react'

import { useFilterContext } from '@components/admin/filters/Filters.context'
import Switch from '@components/ui/switch/Switch'

import styles from '@styles/admin/admin-page.style.module.scss'

const HiddenFilter: FC<{ text?: string }> = ({ text }) => {
	const { filters, setFilters } = useFilterContext()

	const handleHidden = (value: boolean) => {
		setFilters((prev: any) => ({ ...prev, onlyHidden: value }))
	}

	return (
		<div className={styles.controls__hidden}>
			<Label.Root htmlFor='hidden'>{text || 'Скрытые'}</Label.Root>
			<Switch id='hidden' onCheckedChange={handleHidden} checked={filters.onlyHidden} />
		</div>
	)
}

export default HiddenFilter
