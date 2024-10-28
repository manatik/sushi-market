import { useState } from 'react'

import Filters from '@components/admin/filters/Filters'
import Separator from '@components/ui/separator/Separator'

import { useUsers } from '@query-hooks/useUser'

import { IUserFilters } from '@common-types/user.types'

import UserList from './User-list'

import styles from '@styles/admin/admin-page.style.module.scss'

const Users = () => {
	const [filters, setFilters] = useState<IUserFilters>({})

	const { isLoading: isUsersLoading, data: users } = useUsers(filters)

	return (
		<div className={styles.adminPage}>
			<Filters onChange={filters => setFilters(filters)}>
				<Filters.Search />
				<Filters.Hidden text={'Заблокированные'} />
			</Filters>

			<Separator />

			<UserList isLoading={isUsersLoading} users={users} />
		</div>
	)
}

export default Users
