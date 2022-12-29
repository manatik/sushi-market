import AdminSidebar from '@components/admin/sidebar/Sidebar'
import CurrentDate from '@components/ui/current-date/Current-date'
import UserAvatar from '@components/admin/user-info/User-avatar'
import { FC, PropsWithChildren } from 'react'
import styles from './layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<div className={styles.left}>
				<AdminSidebar />
			</div>

			<div className={styles.right}>
				<div className={styles.topLine}>
					<CurrentDate />
					<UserAvatar />
				</div>
				<div className={styles.center}>{children}</div>
				<div className={styles.bottomLine}>.</div>
			</div>
		</div>
	)
}

export default Layout
