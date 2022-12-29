import HoverCard from '@components/ui/hover-card/Hover-card'
import Link from '@components/ui/link/Link'
import { useGetUser } from '@query-hooks/useUser'
import { ChevronDownIcon, PersonIcon } from '@radix-ui/react-icons'
import { AuthService } from '@services/auth.service'
import { HOME_PATH, USER_PROFILE_EDIT_PATH, USER_PROFILE_PATH } from '@utils/pages-paths'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import styles from './user-avatar.style.module.scss'

const UserAvatar: FC = () => {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const { isLoading, data: user } = useGetUser()

	const firstname = isLoading ? 'Загрузка...' : user?.firstname

	const onLogout = async () => {
		await AuthService.logout()
		await router.replace(HOME_PATH)
	}

	return (
		<div onClick={() => setIsOpen(true)}>
			<HoverCard
				open={isOpen}
				onOpenChange={open => {
					setIsOpen(open)
				}}
				openDelay={200}
				closeDelay={500}
			>
				<HoverCard.Title className={styles.user}>
					<div className={styles.avatar}>
						<PersonIcon className={styles.avatar__icon} />
					</div>

					<span className={styles.user__label}>{firstname}</span>

					<ChevronDownIcon />
				</HoverCard.Title>

				<HoverCard.Content className={styles.content}>
					<Link className={styles.content__item} href={USER_PROFILE_PATH}>
						Информация
					</Link>
					<Link className={styles.content__item} href={USER_PROFILE_EDIT_PATH}>
						Редактировать
					</Link>
					<span className={styles.content__item} onClick={onLogout}>
						Выйти
					</span>
				</HoverCard.Content>
			</HoverCard>
		</div>
	)
}

export default UserAvatar
