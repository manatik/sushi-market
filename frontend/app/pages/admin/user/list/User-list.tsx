import React, { FC } from 'react'

import { IUser } from '@common-types/user.types'

import UserItem from './User-item'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	users?: IUser[]
	isLoading: boolean
}

const UserList: FC<Props> = ({ isLoading, users }) => {
	if (isLoading) {
		return <div>loading...</div>
	}

	if (!users?.length) {
		return <div className={styles.cards}>Ничего не найдено</div>
	}

	return (
		<div className={styles.cards}>
			{users?.map(user => (
				<UserItem key={user.id} user={user} />
			))}
		</div>
	)
}

export default UserList
