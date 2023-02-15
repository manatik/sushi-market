import { FC } from 'react'

import { IDistrict } from '@common-types/district.types'

import DistrictItem from './District-item'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	districts?: IDistrict[]
	isLoading: boolean
}

const DistrictList: FC<Props> = ({ isLoading, districts }) => {
	if (isLoading) {
		return <div>loading...</div>
	}

	if (!districts?.length) {
		return <div className={styles.cards}>Ничего не найдено</div>
	}

	return (
		<div className={styles.cards}>
			{districts?.map(district => (
				<DistrictItem key={district.id} district={district} />
			))}
		</div>
	)
}

export default DistrictList
