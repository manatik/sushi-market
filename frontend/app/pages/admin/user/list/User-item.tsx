import classNames from 'classnames'
import { FC } from 'react'

import Card from '@components/ui/card/Card'

import { IUser } from '@common-types/user.types'

import { dateToFormatDate } from '@utils/utils'

import UserContextMenu from './User-context-menu'

import styles from '@styles/admin/admin-page.style.module.scss'

interface Props {
	user: IUser
}

const UserItem: FC<Props> = ({ user }) => {
	return (
		<UserContextMenu user={user}>
			<Card>
				<Card.Content>
					<Card.Item>
						<span>Имя</span>
						<span>{user.firstname}</span>
					</Card.Item>

					<Card.Item>
						<span>Фамилия</span>
						<span
							className={classNames({
								[styles.card__emptyField]: !user.lastname
							})}
						>
							{user.lastname || 'не задана'}
						</span>
					</Card.Item>

					<Card.Item>
						<span>Телефон</span>
						<span>{user.phone}</span>
					</Card.Item>

					<Card.Item>
						<span>E-mail</span>
						<span
							className={classNames({
								[styles.card__emptyField]: !user.email
							})}
						>
							{user.email || 'не задан'}
						</span>
					</Card.Item>

					<Card.Item>
						<span>Дата рождения</span>
						<span
							className={classNames({
								[styles.card__emptyField]: !user.birthdate
							})}
						>
							{user.birthdate || 'не задана'}
						</span>
					</Card.Item>

					<Card.Item>
						<span>Роли</span>
						<span
							className={classNames({
								[styles.card__emptyField]: !user.roles.length
							})}
						>
							{user.roles.map(role => role.name).join(', ') || 'нет ролей'}
						</span>
					</Card.Item>
				</Card.Content>

				<Card.Content>
					<Card.Item justify={'end'} type={'secondary'}>
						{user.dateUpdated ? dateToFormatDate(user.dateUpdated) : 'Не обновлялся'}
					</Card.Item>
				</Card.Content>
			</Card>
		</UserContextMenu>
	)
}

export default UserItem
