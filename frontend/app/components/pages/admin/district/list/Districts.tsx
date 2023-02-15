import { useState } from 'react'

import Filters from '@components/admin/filters/Filters'
import Separator from '@components/ui/separator/Separator'

import { useDistricts } from '@query-hooks/useDistricts'

import { IDistrictFilters } from '@common-types/district.types'

import DistrictList from './District-list'

import styles from '@styles/admin/admin-page.style.module.scss'

const Districts = () => {
	const [filters, setFilters] = useState<IDistrictFilters>({})

	const { isLoading: isDistrictsLoading, data: districts } = useDistricts(filters)

	return (
		<div className={styles.adminPage}>
			<Filters onChange={filters => setFilters(filters)}>
				<Filters.Search />
				<Filters.Hidden />
			</Filters>

			<Separator />

			<DistrictList isLoading={isDistrictsLoading} districts={districts} />
		</div>
	)
}

export default Districts
