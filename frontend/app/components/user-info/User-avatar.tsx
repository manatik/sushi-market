import HoverCard from '@components/ui/hover-card/Hover-card'
import Link from '@components/ui/link/Link'
import { IUserAvatarProps } from '@components/user-info/user-avatar.types'
import { ChevronDownIcon, PersonIcon } from '@radix-ui/react-icons'
import { FC, useState } from 'react'
import styles from './user-avatar.style.module.scss'

const UserAvatar: FC<IUserAvatarProps> = ({ firstname }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div onClick={() => setIsOpen(true)}>
			<HoverCard open={isOpen} onOpenChange={open => setIsOpen(open)}>
				<HoverCard.Title className={styles.user}>
					<div className={styles.avatar}>
						<PersonIcon className={styles.avatar__icon} />
					</div>

					<span className={styles.user__label}>{firstname}</span>

					<ChevronDownIcon />
				</HoverCard.Title>

				<HoverCard.Content className={styles.content}>
					<Link className={styles.content__item} href={'/user/profile'}>
						Информация
					</Link>
					<Link className={styles.content__item} href={'/user/profile/edit'}>
						Редактировать
					</Link>
					<Link className={styles.content__item} href={'/'}>
						Выйти
					</Link>
				</HoverCard.Content>
			</HoverCard>
		</div>
	)
}

export default UserAvatar
