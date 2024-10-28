import { FC, PropsWithChildren } from 'react'

import ContextMenu from '@components/ui/context-menu/Context-menu'
import Separator from '@components/ui/separator/Separator'

import { useSoftRemoveUser } from '@query-hooks/useUser'

import { IUser } from '@common-types/user.types'

import useConfirm from '@hooks/useConfirm'
import { useContextMenu } from '@hooks/useContextMenu'

import UpdateUser from '../update/user'

interface Props extends PropsWithChildren {
	user: IUser
}

const UserContextMenu: FC<Props> = ({ children, user }) => {
	const { Dialog, onConfirm } = useConfirm(
		'Вы уверены?',
		<div>
			<b>
				Заблокировать пользователя - {user.lastname} {user.firstname}?
			</b>
		</div>
	)

	const { ContextActions, action, handleAction, selectedItem } = useContextMenu<IUser>()
	const { mutate: removeUser } = useSoftRemoveUser()

	const onRemove = async () => {
		const isConfirmed = await onConfirm()

		if (isConfirmed) {
			removeUser(user.id)
		}
	}

	return (
		<>
			<Dialog />

			{selectedItem && action === ContextActions.EDIT && (
				<UpdateUser user={selectedItem} isOpen={!!selectedItem} onClose={handleAction} />
			)}

			<ContextMenu>
				<ContextMenu.Title>{children}</ContextMenu.Title>

				<ContextMenu.Content>
					<ContextMenu.Item onClick={() => handleAction(user, ContextActions.DETAILS)}>Подробнее</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={() => handleAction(user, ContextActions.EDIT)}>Редактировать</ContextMenu.Item>

					<Separator />

					<ContextMenu.Item onClick={onRemove}>Заблокировать</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</>
	)
}

export default UserContextMenu
